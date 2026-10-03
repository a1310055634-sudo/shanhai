// G69 验收:About 对照样张区 + 两页纸阶 + 零溢出 + 截图
import { spawn } from 'node:child_process'
import { writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PORT = 9363
const BASE = 'http://localhost:4173'
const OUT = 'D:/zcode/workspace/default/shanhai/dev/'

// 纸阶令牌双主题参考值(deng/qing)
const ALT = {
  'alt-2': { deng: [23, 35, 31], qing: [241, 231, 214] },
  'alt-3': { deng: [28, 43, 36], qing: [238, 226, 204] },
}

const PAGE_EVAL = (which) => `(() => {
  const q = (s) => document.querySelector(s)
  const page = q('[class*="page"]')
  const bg = page ? getComputedStyle(page).backgroundColor : null
  const out = { bg, scrollW: document.documentElement.scrollWidth, clientW: document.documentElement.clientWidth, h1: !!q('h1') }
  if (${which === 'about'}) {
    const compare = [...document.querySelectorAll('[class*="scanTitle"]')]
    out.scanTitle = compare.length > 0 ? compare[0].textContent : null
    const mounts = [...document.querySelectorAll('[class*="mountsGrid"]')]
    out.mountGrids = mounts.length
    out.compareCaptions = [...document.querySelectorAll('[class*="captionTitle"]')].map((e) => e.textContent)
    const artCell = q('[class*="artCell"]')
    out.artCellTag = artCell && artCell.querySelector('[class*="artCellTag"]') ? artCell.querySelector('[class*="artCellTag"]').textContent : null
    out.artCellLoaded = artCell && artCell.querySelector('svg') ? true : false
  }
  return out
})()`

function launch() {
  const profile = mkdtempSync(join(tmpdir(), 'shanhai-g69-'))
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

  async function visit(path, w, h, theme, which, shot) {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 700 })
    await cdp.send('Page.navigate', { url: BASE + path })
    await sleep(2500)
    await cdp.send('Runtime.evaluate', { expression: `try{localStorage.setItem('shanhai-theme','${theme}')}catch(e){}; location.reload()`, awaitPromise: false })
    await sleep(2500)
    const r = await cdp.send('Runtime.evaluate', { expression: PAGE_EVAL(which), returnByValue: true })
    const v = r.result.value
    const checks = { h1: v.h1 === true, noOverflow: v.scrollW <= v.clientW + 1 }
    if (which === 'about') {
      checks.scanTitle = v.scanTitle === '刻本原件 × 站内转描 · 九尾狐对照'
      checks.compareCaptions = v.compareCaptions.some((c) => c.includes('蒋应镐山海经(图)绘像')) && v.compareCaptions.some((c) => c.includes('郭璞注'))
      checks.artCellTag = v.artCellTag === '站内转描 · 据古今图书集成'
      checks.artCellRendered = v.artCellLoaded === true
    } else {
      const ref = which === 'explore' ? ALT['alt-2'][theme] : ALT['alt-3'][theme]
      checks.paperBand = v.bg ? (() => {
        const m = v.bg.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/)
        if (!m) return false
        const rgb = [+m[1], +m[2], +m[3]]
        return rgb.every((n, i) => Math.abs(n - ref[i]) <= 8)
      })() : false
    }
    results.push({ path, w, theme, values: v, checks, pass: Object.values(checks).every(Boolean) })
    if (shot) {
      const s = await cdp.send('Page.captureScreenshot', { format: 'png' })
      writeFileSync(OUT + shot, Buffer.from(s.data, 'base64'))
    }
    console.log(path, `${w}`, theme, '=>', Object.values(checks).every(Boolean) ? 'PASS' : 'FAIL ' + JSON.stringify(checks), `(bg=${v.bg})`)
  }

  await visit('/about', 1440, 900, 'deng', 'about', 'g69-about-deng-1440.png')
  await visit('/about', 390, 844, 'deng', 'about', 'g69-about-deng-390.png')
  await visit('/explore', 1440, 900, 'deng', 'explore', 'g69-explore-deng-1440.png')
  await visit('/explore', 1440, 900, 'qing', 'explore', null)
  await visit('/favorites', 1440, 900, 'deng', 'favorites', 'g69-favorites-deng-1440.png')
  await visit('/favorites', 1440, 900, 'qing', 'favorites', null)
  await visit('/about', 1440, 900, 'qing', 'about', 'g69-about-qing-1440.png')
  cdp.close()
} finally {
  try { child.kill() } catch {}
  setTimeout(() => { try { rmSync(profile, { recursive: true, force: true }) } catch {} }, 1500)
}
writeFileSync(OUT + 'round69-results.json', JSON.stringify(results, null, 2))
const fails = results.filter((r) => !r.pass)
console.log('TOTAL', results.length, 'FAIL', fails.length)
process.exitCode = fails.length ? 1 : 0
