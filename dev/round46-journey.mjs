/**
 * G46 行旅画卷化验收(无头 Chrome + CDP)。
 *
 * 断言:长卷底画就位(lazy/mask/opacity 0.3)/九位轨道 9 停靠齐全/
 * 768 档 G23 第 5 格修复不回退(站名字块单行 ≤20px)/390 触控档控件 ≥44px/
 * 页内图片全部 lazy(懒加载不退化)/sceneBand 场景带完好(柢山雾感机制未动)。
 * 前置:preview 在 http://localhost:4173。运行:node dev/round46-journey.mjs
 */
import { mkdtempSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { tmpdir } from 'node:os'
import { spawn } from 'node:child_process'

const PORT = 9347
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

const PROBE = `(() => {
  const stops = [...document.querySelectorAll('nav[aria-label="南次一经九位置路线导航"] li')]
  const names = stops.map((li) => {
    const n = li.querySelector('[class*="railName"]')
    return n ? +n.getBoundingClientRect().height.toFixed(1) : null
  })
  const pb = document.querySelector('[data-hero-paint], [class*="paintBg"]')
  const pbImg = pb ? pb.querySelector('img') : null
  const pbCs = pbImg ? getComputedStyle(pbImg) : null
  const imgs = [...document.querySelectorAll('img')]
  const scene = document.querySelector('[class*="sceneBand"]')
  return {
    stopCount: stops.length,
    nameHeights: names,
    paint: pbImg ? {
      loading: pbImg.getAttribute('loading'),
      opacity: pbCs.opacity,
      mask: (pbCs.maskImage || '').slice(0, 26),
      rect: Math.round(pbImg.getBoundingClientRect().width) + 'x' + Math.round(pbImg.getBoundingClientRect().height),
    } : null,
    eagerImgs: imgs.filter((i) => i.getAttribute('loading') !== 'lazy').length,
    totalImgs: imgs.length,
    sceneBand: !!scene,
    sceneSvg: scene ? scene.querySelectorAll('svg').length : 0,
    ovf: document.documentElement.scrollWidth === document.documentElement.clientWidth,
  }
})()`

const TAP = `(() => {
  const ctr = [...document.querySelectorAll('a, button')].filter((e) => {
    const r = e.getBoundingClientRect()
    if (r.width === 0) return false
    let n = e.parentElement
    while (n && n !== document.body) {
      const ox = getComputedStyle(n).overflowX
      if (ox === 'auto' || ox === 'scroll' || ox === 'hidden' || ox === 'clip') return false
      n = n.parentElement
    }
    return true
  })
  // G37 口径:段内行内文字链接按 WCAG 2.5.8 内联例外排除并单独计数(与 round38 终验探针一致)
  const inline = ctr.filter((a) => a.tagName === 'A' && a.parentElement && a.parentElement.tagName === 'P' && a.parentElement.textContent.trim().length > a.textContent.trim().length + 4)
  const controls = ctr.filter((e) => !inline.includes(e))
  const h = controls.map((e) => +e.getBoundingClientRect().height.toFixed(1))
  const small = controls.map((e, i) => ({ h: h[i], cls: (e.className || e.tagName).toString().slice(0, 44) }))
    .filter((x) => x.h < 44)
  return { n: controls.length, min: h.length ? Math.min(...h) : 0, inline: inline.length, small: small.slice(0, 6) }
})()`

async function main() {
  const profile = mkdtempSync(join(tmpdir(), 'g46-chrome-'))
  const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--hide-scrollbars',
    '--force-device-scale-factor=1', 'about:blank'], { stdio: 'ignore' })
  let cdp
  try {
    cdp = await connect()
    await cdp.send('Page.enable')
    await cdp.send('Runtime.enable')

    // ── 1440 桌面档 ──
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
    await cdp.send('Page.navigate', { url: `${BASE}/journeys/nanci-yi` })
    await sleep(2200)
    const d = await cdp.eval(PROBE)
    check('底画就位(lazy+mask+opacity 0.3)', !!d.paint && d.paint.loading === 'lazy' && d.paint.mask.includes('radial') && parseFloat(d.paint.opacity) < 0.35, JSON.stringify(d.paint))
    check('九位停靠齐全', d.stopCount === 9, `stops=${d.stopCount}`)
    check('sceneBand 场景带完好(雾感机制未动)', d.sceneBand && d.sceneSvg > 0, `svg=${d.sceneSvg}`)
    check('懒加载不退化(全页无 eager 图)', d.eagerImgs === 0, `imgs=${d.totalImgs} eager=${d.eagerImgs}`)
    check('1440 零横溢', d.ovf)

    // ── 768 档:G23 第 5 格不回退 ──
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 768, height: 900, deviceScaleFactor: 1, mobile: false })
    await sleep(900)
    const m = await cdp.eval(PROBE)
    const maxH = Math.max(...m.nameHeights.filter((x) => x !== null))
    check('768 站名字块全部单行(≤20px,第 5 格不回退)', m.nameHeights.length === 9 && maxH <= 20, `heights=${JSON.stringify(m.nameHeights)} max=${maxH}`)
    check('768 零横溢', m.ovf)
    await cdp.shot(join(OUT, 'journey-qing-768.png'))

    // ── 390 档:触控抽测 + 截图 ──
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: false })
    await sleep(900)
    const t = await cdp.eval(TAP)
    check('390 触控抽测 ≥44px', t.n > 0 && t.min >= 44, `controls=${t.n} min=${t.min} small=${JSON.stringify(t.small)}`)
    const p390 = await cdp.eval(PROBE)
    check('390 零横溢', p390.ovf)
    await cdp.shot(join(OUT, 'journey-qing-390.png'))
    check('控制台零异常', cdp.events.filter((e) => e.method === 'Runtime.exceptionThrown').length === 0)
  } finally {
    chrome.kill()
  }

  const fails = results.filter((r) => !r.ok).length
  console.log(`\n${results.length - fails}/${results.length} 通过`)
  writeFileSync(join(dirname(fileURLToPath(import.meta.url)), 'round46-results.json'), JSON.stringify(results, null, 2))
  process.exit(fails ? 1 : 0)
}

main()
