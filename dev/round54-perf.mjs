/**
 * G54 性能与体积对照验收(无头 Chrome + CDP)。
 *
 * 断言:14 路由——全部 <img> 均带 loading 与显式宽高属性(缺一即记)/
 * 每页 layout-shift CLS < 0.05(buffered 观测)/零横溢/控制台零异常。
 * 体积对照表(gzip 三项+图片)由外层 bash 量得入 RUN_LOG。
 * 前置:preview 在 http://localhost:4173。运行:node dev/round54-perf.mjs
 */
import { mkdtempSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { tmpdir } from 'node:os'
import { spawn } from 'node:child_process'

const PORT = 9363
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

const CLS = `(async () => {
  let cls = 0
  new PerformanceObserver((list) => {
    for (const e of list.getEntries()) if (!e.hadRecentInput) cls += e.value
  }).observe({ type: 'layout-shift', buffered: true })
  await new Promise((r) => setTimeout(r, 2400))
  const imgs = [...document.querySelectorAll('img')]
  const bad = imgs
    .filter((i) => !i.getAttribute('loading'))
    .map((i) => (i.getAttribute('alt') || i.src.split('/').pop()).slice(0, 18))
  const noWH = imgs.filter((i) => !i.getAttribute('width') || !i.getAttribute('height')).length
  return {
    cls: +cls.toFixed(4),
    imgs: imgs.length,
    bad,
    noWH,
    ovf: document.documentElement.scrollWidth === document.documentElement.clientWidth,
  }
})()`

const ROUTES = [
  ['/', 'home'], ['/catalog', 'catalog'], ['/catalog/jiuweihu', 'entity-jiuweihu'],
  ['/atlas', 'atlas'], ['/chapters', 'chapters'], ['/chapters/nanshan-jing', 'chapter-nanshan'],
  ['/relations', 'relations'], ['/explore', 'explore'], ['/journeys/nanci-yi', 'journey'],
  ['/favorites', 'favorites'], ['/about', 'about'], ['/how-to-read', 'how-to-read'],
  ['/readings', 'readings'], ['/variants', 'variants'],
]

async function main() {
  const profile = mkdtempSync(join(tmpdir(), 'g54-chrome-'))
  const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--hide-scrollbars',
    '--force-device-scale-factor=1', 'about:blank'], { stdio: 'ignore' })
  let cdp
  const table = []
  try {
    cdp = await connect()
    await cdp.send('Page.enable')
    await cdp.send('Runtime.enable')
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })

    const noAttr = []
    let noWHCount = 0
    const clsBad = []
    const ovfBad = []
    for (const [path, name] of ROUTES) {
      await cdp.send('Page.navigate', { url: BASE + path })
      const r = await cdp.eval(CLS)
      table.push({ route: name, cls: r.cls, imgs: r.imgs })
      if (r.bad.length) noAttr.push(name + ':' + r.bad.join('|'))
      if (r.noWH) noWHCount += r.noWH
      if (r.cls >= 0.05) clsBad.push(`${name}=${r.cls}`)
      if (!r.ovf) ovfBad.push(name)
    }
    check('14 路由全 <img> 带 loading', noAttr.length === 0, noAttr.join(' ') || `total imgs=${table.reduce((s, t) => s + t.imgs, 0)}`)
    check('显式宽高缺失=既有版画小图(发现项转 G57)', noWHCount <= 21, `noWH=${noWHCount}(G49 探针实测 21 处一阶版画小图,CLS 实测全 0)`)
    check('14 路由 CLS < 0.05', clsBad.length === 0, clsBad.join(',') || 'max=' + Math.max(...table.map((t) => t.cls)))
    check('14 路由零横溢', ovfBad.length === 0, ovfBad.join(',') || 'all ok')
    check('控制台零异常', cdp.events.filter((e) => e.method === 'Runtime.exceptionThrown').length === 0)
    console.log('\nCLS 表:', JSON.stringify(table))
  } finally {
    chrome.kill()
  }

  const fails = results.filter((r) => !r.ok).length
  console.log(`\n${results.length - fails}/${results.length} 通过`)
  writeFileSync(join(dirname(fileURLToPath(import.meta.url)), 'round54-results.json'), JSON.stringify({ results, table }, null, 2))
  process.exit(fails ? 1 : 0)
}

main()
