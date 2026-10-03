// G62 验收:15 词条通查(有图/待补/演绎三态)+零溢出+截图
import { spawn } from 'node:child_process'
import { writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PORT = 9349
const BASE = 'http://localhost:4173'
const OUT = 'D:/zcode/workspace/default/shanhai/dev/'

// 期望态:scans=主位图数;tag: base=基础签/pending=待补签/null=无签(原创演绎)
const EXPECT = {
  changyou: { scans: 1, tag: null },
  dijiang: { scans: 0, tag: 'pending' },
  fenghuang: { scans: 0, tag: 'pending' },
  huahuai: { scans: 1, tag: null },
  jingwei: { scans: 1, tag: 'base' },
  jiuweihu: { scans: 1, tag: 'base' },
  kui: { scans: 0, tag: 'pending' },
  lushu: { scans: 2, tag: 'base' },
  luwu: { scans: 0, tag: 'pending' },
  wenyaoyu: { scans: 0, tag: 'pending' },
  xingxing: { scans: 0, tag: 'pending' },
  yinglong: { scans: 0, tag: 'pending' },
  yingzhao: { scans: 0, tag: 'pending' },
  zhi: { scans: 0, tag: null },
  zhuyin: { scans: 0, tag: 'pending' },
}
const SLUGS = Object.keys(EXPECT)
const BASE_TAG = '站内转描 · 据古今图书集成'

const EVAL = `(() => {
  const q = (s) => document.querySelector(s)
  const qa = (s) => [...document.querySelectorAll(s)]
  const mounts = qa('[class*="classicMounts"] > figure')
  const scanImgs = mounts.map((f) => f.querySelector('img')).filter(Boolean)
  const tag = q('[class*="artPanelTag"]')
  return {
    h1: !!q('h1'),
    scanCount: scanImgs.length,
    lazyWhLoaded: scanImgs.every((i) => i.getAttribute('loading') === 'lazy' && i.getAttribute('width') && i.getAttribute('height') && i.naturalWidth > 0),
    tagText: tag ? tag.textContent : null,
    tagTitle: tag ? !!tag.getAttribute('title') : null,
    panelNonEmpty: (() => { const p = q('[class*="artPanel"]'); return !!(p && (p.querySelector('svg') || p.querySelector('img'))) })(),
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
  }
})()`

function launch() {
  const profile = mkdtempSync(join(tmpdir(), 'shanhai-g62-'))
  const child = spawn(CHROME, [
    '--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    '--no-first-run', '--disable-gpu', '--window-size=1440,900', 'about:blank',
  ], { stdio: 'ignore' })
  return { child, profile }
}
async function getTarget() {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`)
      const page = (await res.json()).find((t) => t.type === 'page' && t.webSocketDebuggerUrl)
      if (page) return page
    } catch {}
    await new Promise((r) => setTimeout(r, 250))
  }
  throw new Error('no page target')
}
function connect(wsUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl)
    let id = 0
    const pending = new Map()
    ws.onopen = () => resolve({
      send(method, params = {}) {
        return new Promise((res2, rej2) => {
          const mid = ++id
          pending.set(mid, { res2, rej2 })
          ws.send(JSON.stringify({ id: mid, method, params }))
        })
      },
      close() { ws.close() },
    })
    ws.onmessage = (m) => {
      const msg = JSON.parse(m.data)
      if (msg.id && pending.has(msg.id)) {
        const p = pending.get(msg.id)
        pending.delete(msg.id)
        msg.error ? p.rej2(new Error(JSON.stringify(msg.error))) : p.res2(msg.result)
      }
    }
    ws.onerror = reject
  })
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const { child, profile } = launch()
const results = []
try {
  const target = await getTarget()
  const cdp = await connect(target.webSocketDebuggerUrl)
  await cdp.send('Page.enable')

  async function visit(slug, w, h, theme, shot) {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 700 })
    await cdp.send('Page.navigate', { url: `${BASE}/catalog/${slug}` })
    await sleep(2300)
    await cdp.send('Runtime.evaluate', { expression: `try{localStorage.setItem('shanhai-theme','${theme}')}catch(e){}; location.reload()`, awaitPromise: false })
    await sleep(2500)
    const r = await cdp.send('Runtime.evaluate', { expression: EVAL, returnByValue: true })
    const v = r.result.value
    const exp = EXPECT[slug]
    const tagOk = exp.tag === null
      ? v.tagText === null
      : exp.tag === 'base'
        ? v.tagText !== null && v.tagText.startsWith(BASE_TAG) && !v.tagText.includes('刻本古图待补') && v.tagTitle === true
        : v.tagText !== null && v.tagText.startsWith(BASE_TAG) && v.tagText.includes('刻本古图待补') && v.tagTitle === true
    const checks = {
      h1: v.h1 === true,
      scanCount: v.scanCount === exp.scans,
      lazyWhLoaded: exp.scans === 0 ? true : v.lazyWhLoaded,
      tag: tagOk,
      panelNonEmpty: v.panelNonEmpty,
      noOverflow: v.scrollW <= v.clientW + 1,
    }
    results.push({ slug, w, theme, values: v, checks, pass: Object.values(checks).every(Boolean) })
    if (shot) {
      const s = await cdp.send('Page.captureScreenshot', { format: 'png' })
      writeFileSync(OUT + shot, Buffer.from(s.data, 'base64'))
    }
    console.log(slug, `${w}`, theme, '=>', Object.values(checks).every(Boolean) ? 'PASS' : 'FAIL ' + JSON.stringify(checks))
  }

  for (const slug of SLUGS) await visit(slug, 1440, 900, 'deng', null)
  await visit('jingwei', 390, 844, 'deng', 'g62-jingwei-deng-390.png')
  await visit('jingwei', 1440, 900, 'deng', 'g62-jingwei-deng-1440.png')
  await visit('fenghuang', 390, 844, 'qing', 'g62-fenghuang-qing-390.png')
  cdp.close()
} finally {
  try { child.kill() } catch {}
  setTimeout(() => { try { rmSync(profile, { recursive: true, force: true }) } catch {} }, 1500)
}
writeFileSync(OUT + 'round62-results.json', JSON.stringify(results, null, 2))
const fails = results.filter((r) => !r.pass)
console.log('TOTAL', results.length, 'FAIL', fails.length)
process.exitCode = fails.length ? 1 : 0
