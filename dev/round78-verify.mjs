// G78 验收:古卷页六字 ruby + 音表页可达
import { spawn } from 'node:child_process'
import { writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PORT = 9385
const profile = mkdtempSync(join(tmpdir(), 'g78-'))
const child = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
  '--no-first-run', '--disable-gpu', '--window-size=1440,900', 'about:blank',
], { stdio: 'ignore' })
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
async function target() {
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/list`)
      const p = (await r.json()).find((t) => t.type === 'page' && t.webSocketDebuggerUrl)
      if (p) return p
    } catch {}
    await new Promise((r) => setTimeout(r, 250))
  }
  throw new Error('no page target')
}
function conn(u) {
  return new Promise((res, rej) => {
    const ws = new WebSocket(u)
    let id = 0
    const pend = new Map()
    ws.onopen = () => res({
      send: (m, pr = {}) => new Promise((r2, j2) => { const mid = ++id; pend.set(mid, { r2, j2 }); ws.send(JSON.stringify({ id: mid, method: m, params: pr })) }),
      close() { ws.close() },
    })
    ws.onmessage = (mv) => {
      const msg = JSON.parse(mv.data)
      if (msg.id && pend.has(msg.id)) {
        const p = pend.get(msg.id)
        pend.delete(msg.id)
        msg.error ? p.j2(new Error(JSON.stringify(msg.error))) : p.r2(msg.result)
      }
    }
    ws.onerror = rej
  })
}

const expr = `JSON.stringify((() => {
  const qa = (s) => [...document.querySelectorAll(s)]
  const rubies = qa('ruby').map((r) => r.textContent)
  const has = (k) => rubies.some((t) => t.startsWith(k))
  return {
    hasYan: has('棪'), hasCun: has('踆'), hasFang: has('汸'), hasYu: has('淯'), hasXu: has('糈'), hasChi: has('鸱'),
    segAlive: qa('[class*="segment"]').length,
    sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth,
  }
})())`

const expr2 = `JSON.stringify((() => {
  const b = document.body.textContent
  return {
    entries: b.includes('音注') || b.includes('训释'),
    sample: b.includes('棪') && b.includes('鸱') && b.includes('糈'),
    ov: document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
  }
})())`

const t = await target()
const c = await conn(t.webSocketDebuggerUrl)
await c.send('Page.enable')
await c.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
await c.send('Page.navigate', { url: 'http://localhost:4173/chapters/nanshan-jing' })
await sleep(2800)
let r = await c.send('Runtime.evaluate', { expression: expr, returnByValue: true })
const ch = JSON.parse(r.result.value)
console.log('CHAPTER', JSON.stringify(ch))
const chapterPass = ch.hasYan && ch.hasCun && ch.hasFang && ch.hasYu && ch.hasXu && ch.hasChi && ch.segAlive >= 17 && ch.sw <= ch.cw + 1
await c.send('Page.navigate', { url: 'http://localhost:4173/readings' })
await sleep(2600)
r = await c.send('Runtime.evaluate', { expression: expr2, returnByValue: true })
const rd = JSON.parse(r.result.value)
console.log('READINGS', JSON.stringify(rd))
const s = await c.send('Page.captureScreenshot', { format: 'png' })
writeFileSync('D:/zcode/workspace/default/shanhai/dev/g78-readings-deng-1440.png', Buffer.from(s.data, 'base64'))
const pass = chapterPass && rd.sample && rd.ov
console.log('G78', pass ? 'ALL PASS' : 'FAIL')
c.close()
process.exitCode = pass ? 0 : 1
