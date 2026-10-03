// G68 验收:favicon 200+link / 渐隐带两主题色值 / console 零新增 / 截图
import { spawn } from 'node:child_process'
import { writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PORT = 9361
const BASE = 'http://localhost:4173'
const OUT = 'D:/zcode/workspace/default/shanhai/dev/'

function launch() {
  const profile = mkdtempSync(join(tmpdir(), 'shanhai-g68-'))
  const child = spawn(CHROME, [
    '--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    '--no-first-run', '--disable-gpu', '--window-size=390,844', 'about:blank',
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
    const errors = []
    ws.onopen = () => resolve({
      send(method, params = {}) {
        return new Promise((res2, rej2) => {
          const mid = ++id
          pending.set(mid, { res2, rej2 })
          ws.send(JSON.stringify({ id: mid, method, params }))
        })
      },
      errors,
      close() { ws.close() },
    })
    ws.onmessage = (m) => {
      const msg = JSON.parse(m.data)
      if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
        errors.push(String(msg.params.args?.[0]?.value ?? msg.params.args?.[0]?.description ?? 'console-error').slice(0, 120))
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        errors.push(String(msg.params.exceptionDetails?.exception?.description ?? msg.params.exceptionDetails?.text ?? 'exception').slice(0, 120))
      }
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

const NAV_EVAL = `(() => {
  const nav = document.querySelector('[class*="fadeRight"], [class*="fadeLeft"]')
  const after = nav ? getComputedStyle(nav, '::after') : null
  return {
    fadeRight: nav ? String(nav.className).includes('fadeRight') : false,
    afterBg: after ? after.backgroundImage.slice(0, 100) : null,
    icon: !!document.querySelector('link[rel="icon"]'),
    iconHref: document.querySelector('link[rel="icon"]')?.getAttribute('href') ?? null,
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
  }
})()`

const results = { nav: [], consoleErrors: [], faviconHttp: null }
const { child, profile } = launch()
try {
  const target = await getTarget()
  const cdp = await connect(target.webSocketDebuggerUrl)
  await cdp.send('Page.enable')
  await cdp.send('Runtime.enable')

  async function visit(w, h, theme, shot) {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 700 })
    await cdp.send('Page.navigate', { url: BASE + '/' })
    await sleep(2300)
    await cdp.send('Runtime.evaluate', { expression: `try{localStorage.setItem('shanhai-theme','${theme}')}catch(e){}; location.reload()`, awaitPromise: false })
    await sleep(2600)
    const r = await cdp.send('Runtime.evaluate', { expression: NAV_EVAL, returnByValue: true })
    const v = r.result.value
    v.noOverflow = v.scrollW <= v.clientW + 1
    results.nav.push({ w, theme, ...v })
    if (shot) {
      const s = await cdp.send('Page.captureScreenshot', { format: 'png' })
      writeFileSync(OUT + shot, Buffer.from(s.data, 'base64'))
    }
    console.log(`${w}`, theme, '=>', JSON.stringify(v))
  }

  await visit(390, 844, 'qing', 'g68-home-qing-390.png')
  await visit(390, 844, 'deng', 'g68-home-deng-390.png')
  // console 错误: / 与 /catalog 各一次(两主题已顺带覆盖首页)
  for (const p of ['/', '/catalog']) {
    await cdp.send('Page.navigate', { url: BASE + p })
    await sleep(2600)
  }
  results.consoleErrors = cdp.errors
  cdp.close()
} finally {
  try { child.kill() } catch {}
  setTimeout(() => { try { rmSync(profile, { recursive: true, force: true }) } catch {} }, 1500)
}

// favicon HTTP:build 产物直接 curl
const { execSync } = await import('node:child_process')
let http = 0
try {
  http = Number(execSync(`curl -s -o /dev/null -w "%{http_code}" ${BASE}/favicon.svg`, { encoding: 'utf8' }).trim())
} catch {}
results.faviconHttp = http

const qing = results.nav.find((n) => n.theme === 'qing')
const deng = results.nav.find((n) => n.theme === 'deng')
const checks = {
  faviconHttp200: http === 200,
  iconLinkInDom: results.nav.every((n) => n.icon === true && n.iconHref === '/favicon.svg'),
  qingFadeVeil: qing && qing.afterBg.includes('221, 208, 180'),
  dengFadeUnchanged: deng && deng.afterBg.includes('13, 19, 17'),
  consoleClean: results.consoleErrors.length === 0,
  overflowOk: results.nav.every((n) => n.noOverflow),
}
writeFileSync(OUT + 'round68-results.json', JSON.stringify({ ...results, checks }, null, 2))
console.log('CHECKS', JSON.stringify(checks), '| consoleErrors', JSON.stringify(results.consoleErrors))
process.exitCode = Object.values(checks).every(Boolean) ? 0 : 1
