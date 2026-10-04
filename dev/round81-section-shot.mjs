// G81 补证:异文页「站内引文异文标注」节定点截图(首屏截不到该节)
import { spawn } from 'node:child_process'
import { writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
const BASE = 'http://localhost:4173'
const PORT = 9397
const profile = mkdtempSync(join(tmpdir(), 'g81sec-'))
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function conn(u) {
  return new Promise((res, rej) => {
    const ws = new WebSocket(u)
    let id = 0
    const pend = new Map()
    ws.onopen = () => res({
      send: (m, pr = {}) => new Promise((r2, j2) => { const mid = ++id; pend.set(mid, { r2, j2 }); ws.send(JSON.stringify({ id: mid, method: m, params: pr })) }),
      close() { try { ws.close() } catch {} },
    })
    ws.onmessage = (mv) => {
      const msg = JSON.parse(mv.data)
      if (msg.id && pend.has(msg.id)) {
        const p = pend.get(msg.id); pend.delete(msg.id)
        msg.error ? p.j2(new Error(JSON.stringify(msg.error))) : p.r2(msg.result)
      }
    }
    ws.onerror = rej
  })
}

const child = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
  '--no-first-run', '--no-default-browser-check', '--hide-scrollbars',
  '--window-size=1440,900', 'about:blank',
], { stdio: 'ignore' })

try {
  let target = null
  for (let i = 0; i < 40 && !target; i++) {
    await sleep(500)
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/list`)
      const list = await r.json()
      target = list.find((t) => t.type === 'page')
    } catch {}
  }
  if (!target) throw new Error('no page target')
  const c = await conn(target.webSocketDebuggerUrl)
  await c.send('Page.enable')
  await c.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
  await c.send('Page.navigate', { url: `${BASE}/variants` })
  await sleep(3000)

  // 滚到「站内引文异文标注」节并回读其位置,确认真的截到了
  const pos = await c.send('Runtime.evaluate', {
    expression: `JSON.stringify((()=>{
      const h=[...document.querySelectorAll('h2,h3,div')].find(e=>e.textContent.trim()==='站内引文异文标注');
      if(!h) return {found:false};
      h.scrollIntoView({block:'start'});
      window.scrollBy(0,-80);
      return {found:true, y:Math.round(window.scrollY), total:document.querySelectorAll('[data-site-variant]').length};
    })())`,
    returnByValue: true,
  })
  console.log('scroll', pos.result.value)
  await sleep(700)
  const s = await c.send('Page.captureScreenshot', { format: 'png' })
  writeFileSync('D:/zcode/workspace/default/shanhai/dev/g81-variants-section-1440.png', Buffer.from(s.data, 'base64'))
  console.log('shot saved')
} finally {
  try { child.kill() } catch {}
  setTimeout(() => { try { rmSync(profile, { recursive: true, force: true }) } catch {}; process.exit(0) }, 900)
}
