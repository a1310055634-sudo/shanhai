// G79 验收:狌狌/九尾狐纵深 —— 新段上屏/引文逐字/计数/零溢出
import { spawn } from 'node:child_process'
import { writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PORT = 9387

function launch() {
  const profile = mkdtempSync(join(tmpdir(), 'shanhai-g79-'))
  const child = spawn(CHROME, [
    '--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    '--no-first-run', '--disable-gpu', '--window-size=1440,900', 'about:blank',
  ], { stdio: 'ignore' })
  return { child, profile }
}
async function getTarget() {
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
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const CASES = [
  ['/catalog/xingxing', ['猩猩能言', '不離飛鳥', '都郭生生', '染齒于酒']],
  ['/catalog/jiuweihu', ['德至鳥獸,則狐九尾', '璣星得,則狐九尾', '白狐九尾見信都', '不中蠱毒']],
]

const profile = mkdtempSync(join(tmpdir(), 'shanhai-g79-'))
const child = launch()
const out = []
try {
  const t = await getTarget()
  const c = await conn(t.webSocketDebuggerUrl)
  await c.send('Page.enable')
  let pass = 0
  for (const [path, needles] of CASES) {
    await c.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
    await c.send('Page.navigate', { url: 'http://localhost:4173' + path })
    await sleep(2700)
    const expr = 'JSON.stringify((()=>{const b=document.body.textContent;return{needles:' + JSON.stringify(needles) + '.map(n=>b.includes(n)),verified:b.includes("已核验"),ov:document.documentElement.scrollWidth<=document.documentElement.clientWidth+1}})())'
    const r = await c.send('Runtime.evaluate', { expression: expr, returnByValue: true })
    const v = JSON.parse(r.result.value)
    const ok = v.needles.every(Boolean) && v.verified && v.ov
    out.push({ path, values: v, pass: ok })
    console.log(path, ok ? 'PASS' : 'FAIL ' + JSON.stringify(v))
    const s = await c.send('Page.captureScreenshot', { format: 'png' })
    writeFileSync('D:/zcode/workspace/default/shanhai/dev/g79-' + path.split('/').pop() + '-deng-1440.png', Buffer.from(s.data, 'base64'))
  }
  await c.send('Page.navigate', { url: 'http://localhost:4173/' })
  await sleep(2500)
  const h = await c.send('Runtime.evaluate', { expression: '(() => { const d=[...document.querySelectorAll("dt,dd")].map(e=>e.textContent); const i=d.indexOf("条目已核验"); return d[i+1] })()', returnByValue: true })
  console.log('HOME verified =', h.result.value)
  c.close()
  const allOk = out.every((o) => o.pass) && h.result.value === '12'
  console.log('G79', allOk ? 'ALL PASS' : 'FAIL', '| verified =', h.result.value)
  writeFileSync('D:/zcode/workspace/default/shanhai/dev/round79-results.json', JSON.stringify({ out, home: h.result.value }, null, 2))
  process.exitCode = allOk && h.result.value === '12' ? 0 : 1
} finally {
  try { child.kill() } catch {}
  setTimeout(() => { try { rmSync(profile, { recursive: true, force: true }) } catch {} }, 1500)
}
