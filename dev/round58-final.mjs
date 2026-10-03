/**
 * G58 收官截图(无头 Chrome + CDP):final-* 入 GALLERY_FINAL3/。
 * 1440 档 14 路由 × 灯下/晴窗 + 390 档 4 页 + 768 档 2 页 = 34 张;
 * 附 final-assertions.json(HEAD 戳/路由渲染/零横溢抽查/画卷要素)。
 * 前置:preview 在 http://localhost:4173 且已按当前 HEAD rebuild。
 * 运行:node dev/round58-final.mjs
 */
import { mkdtempSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { tmpdir } from 'node:os'
import { spawn, execSync } from 'node:child_process'

const PORT = 9367
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const BASE = 'http://localhost:4173'
const OUT = 'GALLERY_FINAL3'

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

const ROUTES = [
  ['/', 'home'], ['/catalog', 'catalog'], ['/catalog/jiuweihu', 'entity-jiuweihu'],
  ['/atlas', 'atlas'], ['/chapters', 'chapters'], ['/chapters/nanshan-jing', 'chapter-nanshan'],
  ['/relations', 'relations'], ['/explore', 'explore'], ['/journeys/nanci-yi', 'journey'],
  ['/favorites', 'favorites'], ['/about', 'about'], ['/how-to-read', 'how-to-read'],
  ['/readings', 'readings'], ['/variants', 'variants'],
]

async function main() {
  const root = join(dirname(fileURLToPath(import.meta.url)), '..')
  const HEAD = execSync('git rev-parse --short HEAD', { cwd: root }).toString().trim()
  const profile = mkdtempSync(join(tmpdir(), 'g58-chrome-'))
  const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--hide-scrollbars',
    '--force-device-scale-factor=1', 'about:blank'], { stdio: 'ignore' })
  let cdp
  const assertions = { head: HEAD, shots: 0, routesH1: 0, ovfBad: [], paintOk: null }
  try {
    cdp = await connect()
    await cdp.send('Page.enable')
    await cdp.send('Runtime.enable')

    // 晴窗(新 profile 默认 light 自动晴窗)1440 全路由
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
    await cdp.send('Page.navigate', { url: `${BASE}/` })
    await sleep(900)
    await cdp.eval(`localStorage.setItem('shanhai-theme', 'qing')`)
    for (const [path, name] of ROUTES) {
      await cdp.send('Page.navigate', { url: BASE + path })
      await sleep(path === '/journeys/nanci-yi' ? 2000 : 1250)
      const h1 = await cdp.eval(`!!document.querySelector('h1')`)
      if (h1) assertions.routesH1++
      if (!await cdp.eval(`document.documentElement.scrollWidth === document.documentElement.clientWidth`)) assertions.ovfBad.push('qing:' + name)
      await cdp.shot(join(root, OUT, `final-${name}-qing.png`))
      assertions.shots++
    }
    // 灯下 1440 全路由
    await cdp.eval(`localStorage.setItem('shanhai-theme', 'deng')`)
    for (const [path, name] of ROUTES) {
      await cdp.send('Page.navigate', { url: BASE + path })
      await sleep(path === '/journeys/nanci-yi' ? 2000 : 1250)
      if (!await cdp.eval(`document.documentElement.scrollWidth === document.documentElement.clientWidth`)) assertions.ovfBad.push('deng:' + name)
      await cdp.shot(join(root, OUT, `final-${name}-deng.png`))
      assertions.shots++
    }
    // 390 档(晴窗)4 页 + 768 档 2 页(补 G57 顺延项:晴窗 390 真图、641—900 档)
    await cdp.eval(`localStorage.setItem('shanhai-theme', 'qing')`)
    for (const [w, h, path, name] of [
      [390, 844, '/', 'home'], [390, 844, '/chapters', 'chapters'],
      [390, 844, '/readings', 'readings'], [390, 844, '/about', 'about'],
      [768, 900, '/', 'home'], [768, 900, '/journeys/nanci-yi', 'journey'],
    ]) {
      await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: false })
      await cdp.send('Page.navigate', { url: BASE + path })
      await sleep(1500)
      await cdp.shot(join(root, OUT, `final-${name}-${w}.png`))
      assertions.shots++
    }
    // 画卷要素(晴窗 home)
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
    await cdp.send('Page.navigate', { url: `${BASE}/` })
    await sleep(1800)
    assertions.paintOk = await cdp.eval(`(() => {
      const img = document.querySelector('[data-hero-paint] img')
      return !!img && img.naturalWidth === 1600 && !!document.querySelector('[data-transcriber]')
    })()`)

    // 版本戳(应为当前 HEAD)
    assertions.footerStamp = await cdp.eval(`(() => {
      const el = [...document.querySelectorAll('*')].find((e) => /校讫记/.test(e.textContent || '') && e.children.length === 0)
      return el ? el.textContent.trim() : null
    })()`)
    assertions.stampOk = (assertions.footerStamp || '').includes(HEAD)

    writeFileSync(join(root, OUT, 'final-assertions.json'), JSON.stringify({ ...assertions, generatedBy: 'dev/round58-final.mjs' }, null, 2))
    console.log(`final shots=${assertions.shots} routesH1=${assertions.routesH1}/28 stamp=${assertions.stampOk ? HEAD : 'MISMATCH'} paint=${assertions.paintOk} ovfBad=${assertions.ovfBad.length}`)
  } finally {
    chrome.kill()
  }
}

main()
