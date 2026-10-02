/**
 * G43 誊抄机验收(无头 Chrome + CDP)。
 *
 * 断言:正常路径逐字显形且容器宽高零跳变(预锁生效)/压平(reduced-motion)直出全文
 * 逐字相等/光标 keyframe 全站恰 1 枚/aria-label 全文/组件不可聚焦/390 零横溢。
 * 前置:preview 在 http://localhost:4173。运行:node dev/round43-transcriber.mjs
 */
import { mkdtempSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { tmpdir } from 'node:os'
import { spawn } from 'node:child_process'

const PORT = 9341
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const BASE = 'http://localhost:4173'
const FULL = '循古卷而行，访群山、诸神、异兽与远方之国。'

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

const SAMPLE = `(() => {
  const root = document.querySelector('[data-transcriber]')
  if (!root) return null
  const r = root.getBoundingClientRect()
  return { w: +r.width.toFixed(2), h: +r.height.toFixed(2), state: root.getAttribute('data-transcriber') }
})()`

async function main() {
  const profile = mkdtempSync(join(tmpdir(), 'g43-chrome-'))
  const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--hide-scrollbars',
    '--force-device-scale-factor=1', 'about:blank'], { stdio: 'ignore' })
  let cdp
  try {
    cdp = await connect()
    await cdp.send('Page.enable')
    await cdp.send('Runtime.enable')

    // ── 1) 正常路径:1440,打开即采样(打字进行中) ──
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
    await cdp.send('Page.navigate', { url: `${BASE}/` })
    await sleep(900)
    const samples = []
    for (let i = 0; i < 10; i++) {
      const s = await cdp.eval(SAMPLE)
      if (s) samples.push(s)
      await sleep(140)
    }
    const widths = new Set(samples.map((s) => s.w))
    const heights = new Set(samples.map((s) => s.h))
    check('打字中途容器宽度零跳变', widths.size === 1, `samples=${samples.length} widths=[${[...widths]}]`)
    check('打字中途容器高度零跳变(预锁生效)', heights.size === 1, `heights=[${[...heights]}]`)
    check('采样覆盖打字进行态', samples.some((s) => s.state === 'typing'), `states=${[...new Set(samples.map((s) => s.state))]}`)

    // 等打完(20 字 × 70ms ≈ 1.4s,已过采样期)
    let done = false
    for (let i = 0; i < 40; i++) {
      const s = await cdp.eval(`document.querySelector('[data-transcriber]')?.getAttribute('data-transcriber')`)
      if (s === 'done') { done = true; break }
      await sleep(150)
    }
    check('打字完成态到达', done)

    const final = await cdp.eval(`(() => {
      const root = document.querySelector('[data-transcriber]')
      const typed = root.children[1] || root.children[0]
      const caret = root.querySelectorAll('[class*="caret"]').length
      let kf = 0
      for (const ss of document.styleSheets) {
        try { for (const r of ss.cssRules) if (r instanceof CSSKeyframesRule && /caret-blink/.test(r.name)) kf++ } catch (e) {}
      }
      return {
        label: root.getAttribute('aria-label'),
        typedText: typed.textContent,
        caretNow: caret,
        keyframes: kf,
        tabindex: root.getAttribute('tabindex'),
      }
    })()`)
    check('全文逐字相等', final.typedText === FULL, JSON.stringify(final.typedText))
    check('aria-label=全文', final.label === FULL)
    check('完成后光标移除', final.caretNow === 0, `caret=${final.caretNow}`)
    check('光标 keyframe 恰 1 枚(CSSOM)', final.keyframes === 1, `kf=${final.keyframes}`)
    check('组件不可聚焦(无 tabindex)', final.tabindex === null)
    check('零横溢 1440', await cdp.eval(`document.documentElement.scrollWidth === document.documentElement.clientWidth`))

    // ── 2) 压平路径:prefers-reduced-motion=reduce ──
    await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
    await cdp.send('Page.navigate', { url: `${BASE}/` })
    await sleep(400)
    const reduced = await cdp.eval(`(() => {
      const root = document.querySelector('[data-transcriber]')
      if (!root) return null
      const r = root.getBoundingClientRect()
      return {
        state: root.getAttribute('data-transcriber'),
        text: (root.children[1] || root.children[0] || root).textContent,
        caret: root.querySelectorAll('[class*="caret"]').length,
        w: +r.width.toFixed(2), h: +r.height.toFixed(2),
      }
    })()`)
    check('压平直出全文(400ms 内即 done 且逐字相等)', !!reduced && reduced.state === 'done' && reduced.text === FULL,
      reduced ? `state=${reduced.state} len=${reduced.text.length}` : 'no root')
    check('压平不渲染光标', reduced && reduced.caret === 0)
    const r2 = await cdp.eval(SAMPLE)
    check('压平路径宽高亦恒定', r2 && r2.w === reduced.w && r2.h === reduced.h)

    // ── 3) 390 档零横溢 ──
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: false })
    await cdp.send('Page.navigate', { url: `${BASE}/` })
    await sleep(2600)
    check('零横溢 390', await cdp.eval(`document.documentElement.scrollWidth === document.documentElement.clientWidth`))
    check('控制台零异常', cdp.events.filter((e) => e.method === 'Runtime.exceptionThrown').length === 0)
  } finally {
    chrome.kill()
  }

  const fails = results.filter((r) => !r.ok).length
  console.log(`\n${results.length - fails}/${results.length} 通过`)
  const { writeFileSync } = await import('node:fs')
  writeFileSync(join(dirname(fileURLToPath(import.meta.url)), 'round43-results.json'), JSON.stringify(results, null, 2))
  process.exit(fails ? 1 : 0)
}

main()
