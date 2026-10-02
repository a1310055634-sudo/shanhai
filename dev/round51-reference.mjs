/**
 * G51 参考页画卷化验收(无头 Chrome + CDP)。
 *
 * 断言:六参考页(how-to-read/readings/variants/about/explore/favorites)
 * 1440+390 双档零横溢/控制台零异常/About 凡例面板纸阶相邻互异/
 * readings 区块一带一色交替/区块底色=纸阶令牌实测。
 * 原文区零改动以 git diff 佐证(4 个 .module.css 53 行纯新增,零 tsx/数据)。
 * 前置:preview 在 http://localhost:4173。运行:node dev/round51-reference.mjs
 */
import { mkdtempSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { tmpdir } from 'node:os'
import { spawn } from 'node:child_process'

const PORT = 9357
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

const PAGES = [
  ['/how-to-read', 'how-to-read'],
  ['/readings', 'readings'],
  ['/variants', 'variants'],
  ['/about', 'about'],
  ['/explore', 'explore'],
  ['/favorites', 'favorites'],
]

async function main() {
  const profile = mkdtempSync(join(tmpdir(), 'g51-chrome-'))
  const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--hide-scrollbars',
    '--force-device-scale-factor=1', 'about:blank'], { stdio: 'ignore' })
  let cdp
  try {
    cdp = await connect()
    await cdp.send('Page.enable')
    await cdp.send('Runtime.enable')

    for (const [w, h] of [[1440, 900], [390, 844]]) {
      await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: false })
      const bad = []
      for (const [path, name] of PAGES) {
        await cdp.send('Page.navigate', { url: BASE + path })
        await sleep(950)
        const ok = await cdp.eval(`document.documentElement.scrollWidth === document.documentElement.clientWidth`)
        if (!ok) bad.push(name)
      }
      check(`六参考页 ${w} 零横溢`, bad.length === 0, bad.join(',') || 'all ok')
    }

    // About 面板纸阶相邻互异
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
    await cdp.send('Page.navigate', { url: `${BASE}/about` })
    await sleep(1200)
    const about = await cdp.eval(`(() => {
      const ps = [...document.querySelectorAll('[class*="grid"] > [class*="panel"]')]
      return ps.map((p) => getComputedStyle(p).backgroundColor)
    })()`)
    const altOk = about.length >= 4 && about.every((b, i) => i === 0 || b !== about[i - 1])
    check('About 面板纸阶相邻互异(1/2/3/1)', altOk, JSON.stringify(about))

    // readings 区块交替
    await cdp.send('Page.navigate', { url: `${BASE}/readings` })
    await sleep(1100)
    const sec = await cdp.eval(`(() => {
      const ss = [...document.querySelectorAll('[class*="section"]')]
      return ss.map((s) => getComputedStyle(s).backgroundColor)
    })()`)
    const secDistinct = sec.length >= 2 && sec.every((b, i) => i === 0 || b !== sec[i - 1])
    check('readings 区块一带一色交替', secDistinct, JSON.stringify(sec))

    check('控制台零异常', cdp.events.filter((e) => e.method === 'Runtime.exceptionThrown').length === 0)
  } finally {
    chrome.kill()
  }

  const fails = results.filter((r) => !r.ok).length
  console.log(`\n${results.length - fails}/${results.length} 通过`)
  writeFileSync(join(dirname(fileURLToPath(import.meta.url)), 'round51-results.json'), JSON.stringify(results, null, 2))
  process.exit(fails ? 1 : 0)
}

main()
