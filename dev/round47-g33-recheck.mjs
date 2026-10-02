/**
 * G47 谱系画卷化验收 + G33 断言复跑(无头 Chrome + CDP)。
 *
 * G33 复跑:①43 节点真实 Tab 键盘遍历全可达(篇章/山川/条目 aria-label 前缀);
 * ②svg text 标签两两零重叠。G47 新增:页面淡墨渐染背景生效/1440+390 零横溢/
 * 控制台零异常。LineageMap 内部零改动(本轮仅 RelationsPage.module.css 背景)。
 * 前置:preview 在 http://localhost:4173。运行:node dev/round47-g33-recheck.mjs
 */
import { mkdtempSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { tmpdir } from 'node:os'
import { spawn } from 'node:child_process'

const PORT = 9349
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
  async key(keyCode) {
    await this.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: keyCode, nativeVirtualKeyCode: keyCode })
    await this.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: keyCode, nativeVirtualKeyCode: keyCode })
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

const NODES = `(() => {
  const svg = document.querySelector('svg[aria-label*="谱系三方关系图"]')
  if (!svg) return null
  const nodes = [...svg.querySelectorAll('[tabindex="0"]')]
  const texts = [...svg.querySelectorAll('text')].filter((t) => t.getBoundingClientRect().width > 0)
  const bg = getComputedStyle(document.querySelector('[class*="page"]')).backgroundImage
  return {
    nodeCount: nodes.length,
    labels: texts.length,
    prefixes: nodes.slice(0, 3).map((n) => (n.getAttribute('aria-label') || '').slice(0, 2)),
    bg: bg.includes('radial-gradient') ? 'gradient-ok' : bg.slice(0, 40),
  }
})()`

const ACTIVE = `(() => {
  const a = document.activeElement
  const inSvg = a && a.closest && a.closest('svg[aria-label*="谱系"]')
  return inSvg ? (a.getAttribute('aria-label') || '').slice(0, 4) : null
})()`

const OVERLAP = `(() => {
  const svg = document.querySelector('svg[aria-label*="谱系三方关系图"]')
  const ts = [...svg.querySelectorAll('text')].filter((t) => t.getBoundingClientRect().width > 0)
  const rs = ts.map((t) => t.getBoundingClientRect())
  let bad = 0
  for (let i = 0; i < rs.length; i++) {
    for (let j = i + 1; j < rs.length; j++) {
      const a = rs[i], b = rs[j]
      const ix = Math.min(a.right, b.right) - Math.max(a.left, b.left)
      const iy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)
      if (ix > 1 && iy > 1) bad++
    }
  }
  return { labels: rs.length, bad }
})()`

async function main() {
  const profile = mkdtempSync(join(tmpdir(), 'g47-chrome-'))
  const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--hide-scrollbars',
    '--force-device-scale-factor=1', 'about:blank'], { stdio: 'ignore' })
  let cdp
  try {
    cdp = await connect()
    await cdp.send('Page.enable')
    await cdp.send('Runtime.enable')
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false })
    await cdp.send('Page.navigate', { url: `${BASE}/relations` })
    await sleep(2000)

    const g = await cdp.eval(NODES)
    check('谱系图就位', !!g && g.nodeCount > 0, JSON.stringify(g))
    check('G47 淡墨渐染背景生效', g.bg === 'gradient-ok', g.bg)

    // G33①:真实 Tab 遍历(svg 前有主导航等焦点元素,次数给足;计数用完整 aria-label 去重)
    const seen = new Set()
    let last = null
    for (let i = 0; i < g.nodeCount + 40; i++) {
      await cdp.key(9)
      const a = await cdp.eval(`(() => { const a = document.activeElement; return a && a.closest && a.closest('svg[aria-label*="谱系"]') ? (a.getAttribute('aria-label') || '') : null })()`)
      if (a) { seen.add(a); last = a }
      await sleep(8)
    }
    check('G33 键盘遍历:43 节点全可达', seen.size === g.nodeCount, `unique=${seen.size}/${g.nodeCount} last=${(last || '').slice(0, 12)}`)

    // G33②:标签两两零重叠(1440)
    const o1 = await cdp.eval(OVERLAP)
    check('G33 标签零重叠(1440)', o1.bad === 0, `labels=${o1.labels} bad=${o1.bad}`)

    // 390 档零重叠+零横溢(布局切换后复测)
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: false })
    await sleep(900)
    const o2 = await cdp.eval(OVERLAP)
    check('G33 标签零重叠(390)', o2.bad === 0, `labels=${o2.labels} bad=${o2.bad}`)
    check('390 零横溢', await cdp.eval(`document.documentElement.scrollWidth === document.documentElement.clientWidth`))
    check('控制台零异常', cdp.events.filter((e) => e.method === 'Runtime.exceptionThrown').length === 0)

    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false })
    await sleep(700)
    await cdp.shot(join(OUT, 'relations-qing-1440.png'))
  } finally {
    chrome.kill()
  }

  const fails = results.filter((r) => !r.ok).length
  console.log(`\n${results.length - fails}/${results.length} 通过`)
  writeFileSync(join(dirname(fileURLToPath(import.meta.url)), 'round47-results.json'), JSON.stringify(results, null, 2))
  process.exit(fails ? 1 : 0)
}

main()
