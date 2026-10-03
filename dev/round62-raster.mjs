// G62:三才图会精卫 svg → jpg 栅格化(无头 Chrome 渲染+截图,ffmpeg 转 jpg 由外层做)
import { spawn } from 'node:child_process'
import { writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PORT = 9347
const W = 1010
const H = 1400
const SVG = 'D:/zcode/workspace/default/shanhai/src/assets/classic-art/jingwei-sancaituhui.svg'
const OUT = 'D:/zcode/workspace/default/shanhai/dev/g62-jingwei-raster.png'

const profile = mkdtempSync(join(tmpdir(), 'shanhai-g62-'))
const child = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
  '--no-first-run', '--disable-gpu', `--window-size=${W},${H}`, 'about:blank',
], { stdio: 'ignore' })

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
async function getTarget() {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`)
      const page = (await res.json()).find((t) => t.type === 'page' && t.webSocketDebuggerUrl)
      if (page) return page
    } catch {}
    await sleep(250)
  }
  throw new Error('no page target')
}
function connect(wsUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl)
    let id = 0
    const pending = new Map()
    ws.onopen = () => resolve({ send(method, params = {}) { return new Promise((res2, rej2) => { const mid = ++id; pending.set(mid, { res2, rej2 }); ws.send(JSON.stringify({ id: mid, method, params })) }) }, close() { ws.close() } })
    ws.onmessage = (m) => {
      const msg = JSON.parse(m.data)
      if (msg.id && pending.has(msg.id)) { const p = pending.get(msg.id); pending.delete(msg.id); msg.error ? p.rej2(new Error(JSON.stringify(msg.error))) : p.res2(msg.result) }
    }
    ws.onerror = reject
  })
}

try {
  const target = await getTarget()
  const cdp = await connect(target.webSocketDebuggerUrl)
  await cdp.send('Page.enable')
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false })
  const fileUrl = 'file:///' + SVG.replace(/\\/g, '/')
  await cdp.send('Page.navigate', { url: fileUrl })
  await sleep(2000)
  // svg 直开时是文档根(viewBox 320x444 mm→CSS 尺寸由浏览器定);显式钉成目标像素,白底(木刻件非透明呈现)
  await cdp.send('Runtime.evaluate', { expression: `(() => { const r = document.documentElement; r.style.width='${W}px'; r.style.height='${H}px'; r.style.background='#fff'; document.body && (document.body.style.margin='0'); return 'ok' })()`, returnByValue: true })
  await sleep(600)
  const shot = await cdp.send('Page.captureScreenshot', { format: 'png' })
  writeFileSync(OUT, Buffer.from(shot.data, 'base64'))
  console.log('RASTER_OK', OUT)
  cdp.close()
} finally {
  try { child.kill() } catch {}
  setTimeout(() => { try { rmSync(profile, { recursive: true, force: true }) } catch {} }, 1500)
}
