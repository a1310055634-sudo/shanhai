// G63 验收:指纹(加法式证明)+八站两两可辨复跑+质感层在场+双主题截图
import { spawn, execSync } from 'node:child_process'
import { writeFileSync, readFileSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PORT = 9351
const BASE = 'http://localhost:4173'
const OUT = 'D:/zcode/workspace/default/shanhai/dev/'
const FILE = 'src/components/journal/SceneLayers.tsx'
const STATIONS = [
  'loc-zhaoyao', 'loc-tangting', 'loc-yuanyi', 'loc-chuyang',
  'loc-danyuan', 'loc-jishan', 'loc-qingqiu', 'loc-jiwei',
]

// ── A2 指纹:加法式证明(零删除行+旧内容行全保留) ──
const oldSrc = execSync(`git show HEAD:${FILE}`, { cwd: 'D:/zcode/workspace/default/shanhai', encoding: 'utf8' })
const newSrc = readFileSync('D:/zcode/workspace/default/shanhai/' + FILE, 'utf8')
const numstat = execSync(`git diff --numstat -- ${FILE}`, { cwd: 'D:/zcode/workspace/default/shanhai', encoding: 'utf8' })
const deleted = Number(numstat.split('\t')[1] ?? '0')
const oldLines = new Set(oldSrc.split('\n').map((l) => l.trim()).filter((l) => l.length > 0))
const newLines = new Set(newSrc.split('\n').map((l) => l.trim()))
let missing = 0
for (const l of oldLines) if (!newLines.has(l)) missing += 1
const fingerprint = { deletedLines: deleted, missingOldLines: missing, pass: deleted === 0 && missing === 0 }
console.log('FINGERPRINT', JSON.stringify(fingerprint))

function launch() {
  const profile = mkdtempSync(join(tmpdir(), 'shanhai-g63-'))
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

const EVAL = `(() => {
  const svg = document.querySelector('[class*="scene"]')
  if (!svg) return { scene: false }
  const paths = [...svg.querySelectorAll('path')]
  const fills = paths.map((p) => p.getAttribute('fill'))
  const far = paths[0]
  const depthRect = !!svg.querySelector('rect[fill^="url(#g63depth"]')
  const washRect = !!svg.querySelector('rect[filter^="url(#inkWash"]')
  return {
    scene: true,
    fills: fills.join('|'),
    farD: (far && far.getAttribute('d') || '').slice(0, 140),
    nearFill: paths[2] ? paths[2].getAttribute('fill') : null,
    depthRect, washRect,
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
    h1: !!document.querySelector('h1'),
  }
})()`

const { child, profile } = launch()
const results = []
try {
  const target = await getTarget()
  const cdp = await connect(target.webSocketDebuggerUrl)
  await cdp.send('Page.enable')

  async function visit(station, w, h, theme, shot) {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 700 })
    await cdp.send('Page.navigate', { url: `${BASE}/journeys/nanci-yi?station=${station}` })
    await sleep(2300)
    await cdp.send('Runtime.evaluate', { expression: `try{localStorage.setItem('shanhai-theme','${theme}')}catch(e){}; location.reload()`, awaitPromise: false })
    await sleep(2400)
    const r = await cdp.send('Runtime.evaluate', { expression: EVAL, returnByValue: true })
    const v = r.result.value
    v.station = station
    v.noOverflow = v.scrollW <= v.clientW + 1
    results.push(v)
    if (shot) {
      const s = await cdp.send('Page.captureScreenshot', { format: 'png' })
      writeFileSync(OUT + shot, Buffer.from(s.data, 'base64'))
    }
    console.log(station, `${w}`, theme, '=> scene:', v.scene, 'depth:', v.depthRect, 'wash:', v.washRect, 'overflow:', !v.noOverflow ? 'FAIL' : 'ok')
  }

  for (const st of STATIONS) await visit(st, 1440, 900, 'deng', null)
  await visit('loc-zhaoyao', 1440, 900, 'qing', 'g63-journey-qing-1440.png')
  await visit('loc-zhaoyao', 1440, 900, 'deng', 'g63-journey-deng-1440.png')
  await visit('loc-jiwei', 390, 844, 'deng', 'g63-journey-deng-390.png')
  cdp.close()
} finally {
  try { child.kill() } catch {}
  setTimeout(() => { try { rmSync(profile, { recursive: true, force: true }) } catch {} }, 1500)
}

// A1 两两可辨:八站本体(前 8 个样本;后续为同站复测截图,签名天然相同不参与)
const sigs = results.slice(0, STATIONS.length).map((r) => `${r.fills}::${r.farD}`)
const uniq = new Set(sigs)
const pairwiseDistinct = uniq.size === sigs.length
const overlaysAll = results.filter((r) => r.station).every((r) => r.depthRect && r.washRect)
const allOverflowOk = results.every((r) => r.noOverflow)
writeFileSync(OUT + 'round63-results.json', JSON.stringify({ fingerprint, pairwiseDistinct, sigCount: sigs.length, uniq: uniq.size, overlaysAll, allOverflowOk, results }, null, 2))
console.log('PAIRWISE_DISTINCT', pairwiseDistinct, `(${uniq.size}/${sigs.length})`)
console.log('OVERLAYS_ALL', overlaysAll, '| OVERFLOW_OK', allOverflowOk)
const pass = fingerprint.pass && pairwiseDistinct && overlaysAll && allOverflowOk
console.log('G63', pass ? 'ALL PASS' : 'FAIL')
process.exitCode = pass ? 0 : 1
