/**
 * G52 宋体标题层实验验收(无头 Chrome + CDP)。
 *
 * 断言:全站 CSS 零 @font-face(无远程字体)/区块大题 H1 computed=宋体展示栈
 * (--font-display)/字距 0.02em 档/双主题颜色随令牌/平台实际命中字体记录。
 * 前置:preview 在 http://localhost:4173。运行:node dev/round52-serif.mjs
 */
import { mkdtempSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { tmpdir } from 'node:os'
import { spawn } from 'node:child_process'

const PORT = 9359
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const BASE = 'http://localhost:4173'

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

const H1 = `(() => {
  const el = document.querySelector('h1')
  if (!el) return null
  const cs = getComputedStyle(el)
  const fonts = cs.fontFamily.split(',').map((s) => s.trim().replace(/['"]/g, ''))
  let hit = 'fallback'
  for (const f of fonts) { try { if (document.fonts.check('500 ' + cs.fontSize + ' "' + f + '"', el.textContent)) { hit = f; break } } catch (e) {} }
  const ff = [...document.styleSheets].reduce((n, ss) => { try { return n + [...ss.cssRules].filter((r) => r instanceof CSSFontFaceRule).length } catch (e) { return n } }, 0)
  return {
    text: el.textContent.trim().slice(0, 10),
    family: cs.fontFamily.slice(0, 44),
    hit, size: cs.fontSize, weight: cs.fontWeight, letter: cs.letterSpacing,
    fontFace: ff,
    ovf: document.documentElement.scrollWidth === document.documentElement.clientWidth,
  }
})()`

async function main() {
  const profile = mkdtempSync(join(tmpdir(), 'g52-chrome-'))
  const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--hide-scrollbars',
    '--force-device-scale-factor=1', 'about:blank'], { stdio: 'ignore' })
  let cdp
  try {
    cdp = await connect()
    await cdp.send('Page.enable')
    await cdp.send('Runtime.enable')
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
    await cdp.send('Page.navigate', { url: `${BASE}/readings` })
    await sleep(1800)

    for (const theme of ['deng', 'qing']) {
      await cdp.eval(`localStorage.setItem('shanhai-theme', '${theme}')`)
      await cdp.send('Page.navigate', { url: `${BASE}/readings` })
      await sleep(1500)
      const h = await cdp.eval(H1)
      check(`[${theme}] 大题=宋体展示栈`, h && h.family.startsWith('"Songti SC"'), h ? h.family : 'no h1')
      check(`[${theme}] 平台命中字体(实测记录)`, !!h, `hit=${h && h.hit} size=${h && h.size} weight=${h && h.weight}`)
      const ls = h ? parseFloat(h.letter) : 0
      const size = h ? parseFloat(h.size) : 1
      check(`[${theme}] 字距 0.02em 档`, Math.abs(ls / size - 0.02) < 0.005, `letter=${h && h.letter} @ ${h && h.size}`)
      check(`[${theme}] 全站零 @font-face`, h && h.fontFace === 0, `rules=${h && h.fontFace}`)
      check(`[${theme}] 零横溢`, h && h.ovf)
    }
    check('控制台零异常', cdp.events.filter((e) => e.method === 'Runtime.exceptionThrown').length === 0)
  } finally {
    chrome.kill()
  }

  const fails = results.filter((r) => !r.ok).length
  console.log(`\n${results.length - fails}/${results.length} 通过`)
  writeFileSync(join(dirname(fileURLToPath(import.meta.url)), 'round52-results.json'), JSON.stringify(results, null, 2))
  process.exit(fails ? 1 : 0)
}

main()
