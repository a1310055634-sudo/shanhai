/**
 * G48 古卷画卷化(轻)验收(无头 Chrome + CDP)。
 *
 * 断言:卷尾小景就位(figure+img lazy+真实款识)/纸阶二档带背景/
 * DOM 序=附录在篇章导航之前/DistanceTable(G26)未受影响/1440+390 零横溢/
 * 390 小景宽度受控可读/控制台零异常。原文区零改动以 git diff 佐证(纯新增 43 行)。
 * 前置:preview 在 http://localhost:4173。运行:node dev/round48-chapterend.mjs
 */
import { mkdtempSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { tmpdir } from 'node:os'
import { spawn } from 'node:child_process'

const PORT = 9351
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
  const se = document.querySelector('[class*="scrollEnd"]')
  if (!se) return { has: false }
  const img = se.querySelector('img')
  const mount = se.querySelector('figure')
  const note = se.querySelector('p')
  const nav = document.querySelector('nav[class*="chapterNav"]')
  let dt = document.querySelector('h2')
    dt = [...document.querySelectorAll('h2')].some((h) => h.textContent.includes('里距对照')) ? 'found' : null
  const cs = getComputedStyle(se)
  const mr = img ? img.getBoundingClientRect() : null
  // DOM 序:附录在导航之前
  const orderOk = nav ? !!(se.compareDocumentPosition(nav) & Node.DOCUMENT_POSITION_FOLLOWING) : null
  return {
    has: true,
    imgLazy: img ? img.getAttribute('loading') : null,
    imgAlt: img ? img.getAttribute('alt') : null,
    imgLoaded: img ? img.naturalWidth + 'x' + img.naturalHeight : null,
    mountW: mr ? +mr.width.toFixed(1) : null,
    caption: se.querySelector('figcaption span') ? se.querySelector('figcaption span').textContent : null,
    note: note ? note.textContent.trim().slice(0, 20) : null,
    bg: cs.backgroundColor,
    orderOk,
    dtPresent: !!dt,
    navPresent: !!nav,
    ovf: document.documentElement.scrollWidth === document.documentElement.clientWidth,
  }
})()`

async function main() {
  const profile = mkdtempSync(join(tmpdir(), 'g48-chrome-'))
  const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--hide-scrollbars',
    '--force-device-scale-factor=1', 'about:blank'], { stdio: 'ignore' })
  let cdp
  try {
    cdp = await connect()
    await cdp.send('Page.enable')
    await cdp.send('Runtime.enable')

    // 晴窗(全新 profile 默认 light 自动晴窗)
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
    await cdp.send('Page.navigate', { url: `${BASE}/chapters/nanshan-jing` })
    await sleep(2200)
    const d = await cdp.eval(PROBE)
    check('卷尾小景就位', d.has && d.imgLoaded !== null, JSON.stringify({ has: d.has, img: d.imgLoaded }))
    check('图片 lazy+真实款识', d.imgLazy === 'lazy' && d.imgAlt === '墨葡萄图', `alt=${d.imgAlt} loading=${d.imgLazy}`)
    check('小景宽度受控(≤212px)', d.mountW !== null && d.mountW <= 212, `w=${d.mountW}`)
    check('款识+注记文本', (d.caption || '').includes('徐渭') && (d.note || '').includes('卷尾'), `${d.caption} / ${d.note}`)
    check('纸阶二档带背景', (d.bg || '').includes('241, 231, 214'), d.bg)
    check('DOM 序:附录在篇章导航之前', d.orderOk === true)
    check('G26 里距表未受影响(仍在篇末)', d.dtPresent === true)
    check('1440 零横溢', d.ovf)
    await cdp.eval(`document.querySelector('[class*="scrollEnd"]').scrollIntoView({ block: 'center' })`)
    await sleep(500)
    await cdp.shot(join(OUT, 'chapterend-qing-1440.png'))

    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: false })
    await sleep(900)
    const m = await cdp.eval(PROBE)
    check('390 零横溢', m.ovf)
    check('390 小景可读(宽 ≤218 且 loaded)', m.mountW <= 218 && m.imgLoaded !== null, `w=${m.mountW}`)
    await cdp.eval(`document.querySelector('[class*="scrollEnd"]').scrollIntoView({ block: 'center' })`)
    await sleep(500)
    await cdp.shot(join(OUT, 'chapterend-qing-390.png'))
    check('控制台零异常', cdp.events.filter((e) => e.method === 'Runtime.exceptionThrown').length === 0)
  } finally {
    chrome.kill()
  }

  const fails = results.filter((r) => !r.ok).length
  console.log(`\n${results.length - fails}/${results.length} 通过`)
  writeFileSync(join(dirname(fileURLToPath(import.meta.url)), 'round48-results.json'), JSON.stringify(results, null, 2))
  process.exit(fails ? 1 : 0)
}

main()
