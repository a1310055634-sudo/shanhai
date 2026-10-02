/**
 * G53 微动效令牌收口验收(无头 Chrome + CDP)。
 *
 * 断言:prefers-reduced-motion 下全站压平生效(hero 氛围动画时长=0.01ms 压平令牌、
 * 运行中动画归零)/誊抄光标 reduce 不渲染/正常路径 caret 动画=令牌链
 * (caret-blink × --duration-caret × --ease-ambient)/控制台零异常。
 * 审计输出已留档 dev/round53-audit-output.txt(零裸值 PASS;--duration-char
 * 为 JS 消费型令牌,审计另行登记不计失败)。
 * 前置:preview 在 http://localhost:4173。运行:node dev/round53-token.mjs
 */
import { mkdtempSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { tmpdir } from 'node:os'
import { spawn } from 'node:child_process'

const PORT = 9361
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

const ANIMS = `(() => {
  const els = [...document.querySelectorAll('*')]
  const durations = new Set()
  let running = 0
  for (const el of els) {
    const cs = getComputedStyle(el)
    if (cs.animationName && cs.animationName !== 'none') {
      durations.add(cs.animationDuration)
      durations.add(cs.animationName + ':' + cs.animationDuration)
    }
  }
  running = document.getAnimations ? document.getAnimations().length : -1
  return { durations: [...durations].slice(0, 10), running }
})()`

const CARET = `(() => {
  const root = document.querySelector('[data-transcriber]')
  if (!root) return { root: false }
  const caret = root.querySelectorAll('[class*="caret"]').length
  let dur = null, name = null, ease = null
  const c = root.querySelector('[class*="caret"]')
  if (c) { const cs = getComputedStyle(c); dur = cs.animationDuration; name = cs.animationName; ease = cs.animationTimingFunction }
  return { root: true, state: root.getAttribute('data-transcriber'), caret, dur, name, ease }
})()`

async function main() {
  const profile = mkdtempSync(join(tmpdir(), 'g53-chrome-'))
  const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--hide-scrollbars',
    '--force-device-scale-factor=1', 'about:blank'], { stdio: 'ignore' })
  let cdp
  try {
    cdp = await connect()
    await cdp.send('Page.enable')
    await cdp.send('Runtime.enable')
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })

    // ── 正常路径:caret 动画=令牌链 ──
    await cdp.send('Page.navigate', { url: `${BASE}/` })
    await sleep(700)
    const c1 = await cdp.eval(CARET)
    check('正常路径 caret=caret-blink×--duration-caret', c1.caret === 1 && c1.name.includes('caret-blink') && c1.dur === '1.1s',
      JSON.stringify({ name: c1.name, dur: c1.dur, ease: (c1.ease || '').slice(0, 24) }))

    // ── reduce:全站压平 ──
    await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
    await cdp.send('Page.navigate', { url: `${BASE}/` })
    await sleep(1800)
    const a = await cdp.eval(ANIMS)
    const toMs = (x) => {
      if (x === 'none') return 0
      const m = x.match(/([\d.e-]+)(ms|s)/)
      if (!m) return -1
      return parseFloat(m[1]) * (m[2] === 's' ? 1000 : 1)
    }
    const flat = a.durations.length > 0 && a.durations.every((x) => toMs(x) <= 0.02)
    check('reduce 全站动画压平(0.01ms 压平令牌)', a.durations.length > 0 && flat, JSON.stringify(a.durations))
    check('reduce 运行中动画归零', a.running === 0, `getAnimations=${a.running}`)
    const c2 = await cdp.eval(CARET)
    check('reduce 誊抄光标不渲染', c2.root && c2.caret === 0 && c2.state === 'done', `state=${c2.state} caret=${c2.caret}`)
    check('控制台零异常', cdp.events.filter((e) => e.method === 'Runtime.exceptionThrown').length === 0)
  } finally {
    chrome.kill()
  }

  const fails = results.filter((r) => !r.ok).length
  console.log(`\n${results.length - fails}/${results.length} 通过`)
  writeFileSync(join(dirname(fileURLToPath(import.meta.url)), 'round53-results.json'), JSON.stringify(results, null, 2))
  process.exit(fails ? 1 : 0)
}

main()
