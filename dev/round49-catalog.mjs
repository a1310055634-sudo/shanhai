/**
 * G49 图鉴画卷化验收(无头 Chrome + CDP)。
 *
 * 断言:目录卡间距留白放大(computed gap=36)/全部词条页 artPanel 非空
 * (无配图词条不留白洞,逐页通查)/九尾狐 onError 回退不破版(坏 src→回退 SVG 仍满幅)/
 * 引文区呼吸生效(artNote 间距 18)/1440+390 零横溢/控制台零异常。
 * 前置:preview 在 http://localhost:4173。运行:node dev/round49-catalog.mjs
 */
import { mkdtempSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { tmpdir } from 'node:os'
import { spawn } from 'node:child_process'

const PORT = 9353
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

const CATALOG = `(() => {
  const g = document.querySelector('[class*="grid"]')
  const cards = document.querySelectorAll('a[href^="/catalog/"]')
  return {
    gap: getComputedStyle(g).columnGap,
    cards: cards.length,
    slugs: [...cards].map((a) => a.getAttribute('href').replace('/catalog/', '')),
    ovf: document.documentElement.scrollWidth === document.documentElement.clientWidth,
  }
})()`

const ENTITY = `(() => {
  const panel = document.querySelector('[class*="artPanel"]')
  const note = document.querySelector('[class*="artNote"]')
  const img = panel ? panel.querySelector('img') : null
  const r = panel ? panel.getBoundingClientRect() : null
  return {
    kids: panel ? panel.children.length : 0,
    hasImg: !!img,
    imgSrc: img ? (img.currentSrc || img.src).split('/').pop().slice(0, 30) : null,
    panelH: r ? Math.round(r.height) : 0,
    noteGap: note ? getComputedStyle(note).marginTop : null,
    ovf: document.documentElement.scrollWidth === document.documentElement.clientWidth,
  }
})()`

async function main() {
  const profile = mkdtempSync(join(tmpdir(), 'g49-chrome-'))
  const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--hide-scrollbars',
    '--force-device-scale-factor=1', 'about:blank'], { stdio: 'ignore' })
  let cdp
  try {
    cdp = await connect()
    await cdp.send('Page.enable')
    await cdp.send('Runtime.enable')
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })

    await cdp.send('Page.navigate', { url: `${BASE}/catalog` })
    await sleep(1600)
    const cat = await cdp.eval(CATALOG)
    check('目录卡间距=36px(留白放大)', cat.gap === '36px', `gap=${cat.gap}`)
    check('目录 1440 零横溢', cat.ovf)
    check('词条卡非空', cat.cards >= 12, `cards=${cat.cards}`)

    // 逐词条通查:artPanel 非空(无配图词条不留白洞)
    const empty = []
    for (const slug of cat.slugs) {
      await cdp.send('Page.navigate', { url: `${BASE}/catalog/${slug}` })
      await sleep(950)
      const e = await cdp.eval(ENTITY)
      if (!e.kids || e.panelH < 80) empty.push(`${slug}(kids=${e.kids},h=${e.panelH})`)
    }
    check('全部词条 artPanel 非空(不留白洞)', empty.length === 0, `checked=${cat.slugs.length} empty=${JSON.stringify(empty)}`)

    // onError 回退不破版:九尾狐版画坏 src → 回退原创 SVG
    await cdp.send('Page.navigate', { url: `${BASE}/catalog/jiuweihu` })
    await sleep(1400)
    const before = await cdp.eval(ENTITY)
    await cdp.eval(`(() => {
      const img = document.querySelector('[class*="artPanel"] img')
      if (img) { img.src = 'data:image/png;base64,BROKEN' }
    })()`)
    await sleep(700)
    const after = await cdp.eval(ENTITY)
    check('onError 回退:面板仍非空且满幅(不破版)', after.kids > 0 && after.panelH > 100,
      `before=${JSON.stringify({ kids: before.kids, h: before.panelH, src: before.imgSrc })} after=${JSON.stringify({ kids: after.kids, h: after.panelH, src: after.imgSrc })}`)
    check('引文区呼吸生效(artNote 间距 18)', after.noteGap === '18px', `gap=${after.noteGap}`)
    check('1440 零横溢(详情页)', after.ovf)

    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: false })
    await cdp.send('Page.navigate', { url: `${BASE}/catalog` })
    await sleep(1300)
    const c390 = await cdp.eval(CATALOG)
    check('目录 390 零横溢', c390.ovf)
    check('控制台零异常', cdp.events.filter((e) => e.method === 'Runtime.exceptionThrown').length === 0)

    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
    await cdp.send('Page.navigate', { url: `${BASE}/catalog` })
    await sleep(1400)
    await cdp.shot(join(OUT, 'catalog-qing-1440.png'))
  } finally {
    chrome.kill()
  }

  const fails = results.filter((r) => !r.ok).length
  console.log(`\n${results.length - fails}/${results.length} 通过`)
  writeFileSync(join(dirname(fileURLToPath(import.meta.url)), 'round49-results.json'), JSON.stringify(results, null, 2))
  process.exit(fails ? 1 : 0)
}

main()
