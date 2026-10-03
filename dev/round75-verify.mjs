// G75 验收:词条批(蛊雕/䍺) —— 词条页断言/徽章/主位图/计数/零溢出
import { spawn } from 'node:child_process'
import { writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PORT = 9377
const BASE = 'http://localhost:4173'
const OUT = 'D:/zcode/workspace/default/shanhai/dev/'

const ENTITY_EVAL = `(() => {
  const q = (s) => document.querySelector(s)
  const qa = (s) => [...document.querySelectorAll(s)]
  const b = document.body.textContent
  const mounts = qa('[class*="classicMounts"] > figure')
  const scanImg = mounts[0] ? mounts[0].querySelector('img') : null
  const citeText = q('[class*="cite"] [class*="text"]')
  const citeClone = citeText ? (() => { const c = citeText.cloneNode(true); c.querySelectorAll('rt').forEach((r) => r.remove()); return c.textContent })() : null
  return {
    h1: !!q('h1'),
    name: q('h1') ? q('h1').textContent : null,
    badge: b.includes('待考证'),
    scanCount: mounts.length,
    scanLoaded: scanImg ? scanImg.naturalWidth > 0 : null,
    scanAlt: scanImg ? scanImg.getAttribute('alt') : null,
    citationVerbatim: citeClone,
    hasVarText: b.includes('一作'),
    artPanelFallback: !!q('[class*="artPanel"]'),
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
  }
})()`

const HOME_EVAL = `(() => {
  const dts = [...document.querySelectorAll('dt,dd')].map((e) => e.textContent)
  const i = dts.indexOf('条目已核验')
  const total = dts.indexOf('条目总数')
  return { verified: i >= 0 ? dts[i + 1] : null, total: total >= 0 ? dts[total + 1] : null }
})()`

const CATALOG_EVAL = `(() => {
  const links = [...document.querySelectorAll('a[href^="/catalog/"]')].map((a) => a.getAttribute('href'))
  return { hasGudiao: links.includes('/catalog/gudiao'), hasXun: links.includes('/catalog/xun') }
})()`

function launch() {
  const profile = mkdtempSync(join(tmpdir(), 'shanhai-g75-'))
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
const out = { gudiao: null, xun: null, home: null, catalog: null, pass: false }
try {
  const target = await getTarget()
  const cdp = await connect(target.webSocketDebuggerUrl)
  await cdp.send('Page.enable')

  async function go(path, w, h) {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 700 })
    await cdp.send('Page.navigate', { url: BASE + path })
    await sleep(2500)
  }

  await go('/catalog/gudiao', 1440, 900)
  let r = await cdp.send('Runtime.evaluate', { expression: ENTITY_EVAL, returnByValue: true })
  const gd = r.result.value
  const gdChecks = {
    name: gd.name === '蛊雕',
    badge: gd.badge === true,
    scanMain: gd.scanCount === 1 && gd.scanLoaded === true,
    scanAlt: String(gd.scanAlt).includes('蛊雕') && String(gd.scanAlt).includes('古今图书集成'),
    citation: gd.citationVerbatim === '水有兽焉，名曰蛊雕，其状如雕而有角，其音如婴儿之音，是食人。',
    varText: gd.hasVarText === true,
    artPanel: gd.artPanelFallback === true,
    noOverflow: gd.scrollW <= gd.clientW + 1,
  }
  out.gudiao = { values: gd, checks: gdChecks }
  console.log('GUDIAO', JSON.stringify(gdChecks))
  const s1 = await cdp.send('Page.captureScreenshot', { format: 'png' })
  writeFileSync(OUT + 'g75-gudiao-deng-1440.png', Buffer.from(s1.data, 'base64'))

  await go('/catalog/xun', 1440, 900)
  r = await cdp.send('Runtime.evaluate', { expression: ENTITY_EVAL, returnByValue: true })
  const xn = r.result.value
  const xnChecks = {
    name: xn.name === '䍺',
    badge: xn.badge === true,
    noScan: xn.scanCount === 0,
    citation: String(xn.citationVerbatim).includes('其状如羊而无口，不可杀也，其名曰䍺'),
    artPanelFallback: xn.artPanelFallback === true,
    noOverflow: xn.scrollW <= xn.clientW + 1,
  }
  out.xun = { values: xn, checks: xnChecks }
  console.log('XUN', JSON.stringify(xnChecks))
  const s2 = await cdp.send('Page.captureScreenshot', { format: 'png' })
  writeFileSync(OUT + 'g75-xun-deng-1440.png', Buffer.from(s2.data, 'base64'))

  await go('/', 1440, 900)
  r = await cdp.send('Runtime.evaluate', { expression: HOME_EVAL, returnByValue: true })
  out.home = r.result.value
  console.log('HOME', JSON.stringify(r.result.value))

  await go('/catalog', 1440, 900)
  r = await cdp.send('Runtime.evaluate', { expression: CATALOG_EVAL, returnByValue: true })
  out.catalog = r.result.value
  console.log('CATALOG', JSON.stringify(r.result.value))
  cdp.close()
} finally {
  try { child.kill() } catch {}
  setTimeout(() => { try { rmSync(profile, { recursive: true, force: true }) } catch {} }, 1500)
}

const allPass =
  Object.values(out.gudiao?.checks ?? {}).every(Boolean) &&
  Object.values(out.xun?.checks ?? {}).every(Boolean) &&
  out.home?.verified === '12' &&
  out.catalog?.hasGudiao === true &&
  out.catalog?.hasXun === true
out.pass = allPass
writeFileSync(OUT + 'round75-results.json', JSON.stringify(out, null, 2))
console.log('G75', allPass ? 'ALL PASS' : 'FAIL', '| verified =', out.home?.verified)
process.exitCode = allPass ? 0 : 1
