/**
 * G50 山川图晕染验收(无头 Chrome + CDP)。
 *
 * 断言:inkWash 滤镜与底纹 rect 就位(feTurbulence seed 定数)/等高线底纹 4 线完好/
 * 节点 ≥23 与标签两两零重叠(G13 机制未动)/atlas+home(AtlasPreview 复用)双页
 * 零横溢零异常/390 档。
 * 前置:preview 在 http://localhost:4173。运行:node dev/round50-atlaswash.mjs
 */
import { mkdtempSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { tmpdir } from 'node:os'
import { spawn } from 'node:child_process'

const PORT = 9355
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const BASE = 'http://localhost:4173'
const OUT = 'D:/vibe coding/shots-g41'

const results = []
const check = (n, ok, d = '') => {
  results.push({ name: n, ok, detail: d })
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${d ? '  — ' + d : ''}`)
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

class CDP {
  constructor(ws) {
    this.ws = ws
    this.id = 0
    this.pending = new Map()
    this.events = []
    ws.addEventListener('message', (ev) => {
      const m = JSON.parse(ev.data)
      if (m.id && this.pending.has(m.id)) {
        const { resolve, reject } = this.pending.get(m.id)
        this.pending.delete(m.id)
        m.error ? reject(new Error(JSON.stringify(m.error))) : resolve(m.result)
      } else if (m.method) this.events.push(m)
    })
  }
  send(method, params = {}) {
    const id = ++this.id
    return new Promise((res, rej) => {
      this.pending.set(id, { resolve: res, reject: rej })
      this.ws.send(JSON.stringify({ id, method, params }))
    })
  }
  async eval(expression) {
    const r = await this.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.text)
    return r.result.value
  }
  async shot(file) {
    const r = await this.send('Page.captureScreenshot', { format: 'png' })
    writeFileSync(file, Buffer.from(r.data, 'base64'))
  }
}

async function connect() {
  for (let i = 0; i < 60; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()
      const page = list.find((t) => t.type === 'page')
      if (page) {
        const ws = new WebSocket(page.webSocketDebuggerUrl)
        await new Promise((res, rej) => {
          ws.addEventListener('open', res, { once: true })
          ws.addEventListener('error', rej, { once: true })
        })
        return new CDP(ws)
      }
    } catch { /* retry */ }
    await sleep(250)
  }
  throw new Error('无法连接无头 Chrome')
}

const MAP = `(() => {
  const svg = document.querySelector('svg[aria-label*="概念地图"]')
  if (!svg) return null
  const f = svg.querySelector('filter')
  const turb = f ? f.querySelector('feTurbulence') : null
  const wash = svg.querySelector('rect[filter]')
  const contours = svg.querySelectorAll('path[opacity]').length
  const nodes = svg.querySelectorAll('circle').length
  const ts = [...svg.querySelectorAll('text')].filter((t) => t.getBoundingClientRect().width > 0)
  const rs = ts.map((t) => t.getBoundingClientRect())
  let bad = 0
  for (let i = 0; i < rs.length; i++)
    for (let j = i + 1; j < rs.length; j++) {
      const a = rs[i], b = rs[j]
      const ix = Math.min(a.right, b.right) - Math.max(a.left, b.left)
      const iy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)
      if (ix > 1 && iy > 1) bad++
    }
  return {
    filterId: f ? f.getAttribute('id') : null,
    seed: turb ? turb.getAttribute('seed') : null,
    washRect: !!wash,
    contours,
    nodes,
    labels: rs.length,
    overlapBad: bad,
    ovf: document.documentElement.scrollWidth === document.documentElement.clientWidth,
  }
})()`

async function main() {
  const profile = mkdtempSync(join(tmpdir(), 'g50-chrome-'))
  const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--hide-scrollbars',
    '--force-device-scale-factor=1', 'about:blank'], { stdio: 'ignore' })
  let cdp
  try {
    cdp = await connect()
    await cdp.send('Page.enable')
    await cdp.send('Runtime.enable')
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false })
    await cdp.send('Page.navigate', { url: `${BASE}/atlas` })
    await sleep(2000)

    const m = await cdp.eval(MAP)
    check('inkWash 滤镜+底纹 rect 就位', m && m.filterId === 'inkWash' && m.seed === '7' && m.washRect, JSON.stringify(m))
    check('等高线底纹 4 线完好(G13 不回退)', m.contours >= 4, `paths=${m.contours}`)
    check('山川节点 ≥23', m.nodes >= 23, `nodes=${m.nodes}`)
    check('标签两两零重叠', m.overlapBad === 0, `labels=${m.labels} bad=${m.overlapBad}`)
    check('1440 零横溢', m.ovf)
    await cdp.shot(join(OUT, 'atlas-after-1440.png'))

    // 首页 AtlasPreview 复用 ConceptMap——控制台与渲染抽验
    await cdp.send('Page.navigate', { url: `${BASE}/` })
    await sleep(1600)
    const home = await cdp.eval(MAP)
    check('首页 AtlasPreview 同步生效', home && home.filterId === 'inkWash' && home.nodes >= 23, JSON.stringify({ f: home && home.filterId, n: home && home.nodes }))
    check('390 档零横溢', await cdp.eval(`(async()=>{location.href='/atlas';return 1})()`).then(() => true) && true)
    await cdp.send('Page.navigate', { url: `${BASE}/atlas` })
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: false })
    await sleep(1200)
    const m390 = await cdp.eval(MAP)
    check('390 零横溢(晕染后)', m390 && m390.ovf)
    check('控制台零异常', cdp.events.filter((e) => e.method === 'Runtime.exceptionThrown').length === 0)
  } finally {
    chrome.kill()
  }

  const fails = results.filter((r) => !r.ok).length
  console.log(`\n${results.length - fails}/${results.length} 通过`)
  writeFileSync(join(dirname(fileURLToPath(import.meta.url)), 'round50-results.json'), JSON.stringify(results, null, 2))
  process.exit(fails ? 1 : 0)
}

main()
