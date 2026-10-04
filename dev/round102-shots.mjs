// G102 收官截图:18 路由×双主题 1440 + 核心页 390 灯下 → GALLERY_FINAL5/
import { spawn, spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const BASE = 'http://localhost:4183'
const OUT = 'D:/zcode/workspace/default/shanhai/GALLERY_FINAL5/'
mkdirSync(OUT, { recursive: true })
const preview = spawn('npx', ['vite', 'preview', '--port', '4183', '--strictPort'], { cwd: 'D:/zcode/workspace/default/shanhai', stdio: 'ignore', shell: true })
async function waitPreview() { for (let i = 0; i < 60; i++) { try { const r = await fetch(BASE + '/'); if (r.ok) return } catch {} ; await new Promise(r => setTimeout(r, 250)) } throw new Error('preview 未就绪') }
const profile = mkdtempSync(join(tmpdir(), 'shanhai-g102-'))
const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=9337', `--user-data-dir=${profile}`, '--no-first-run', '--disable-gpu', '--window-size=1440,900', 'about:blank'], { stdio: 'ignore' })
async function getPage() { for (let i = 0; i < 40; i++) { try { const l = await (await fetch('http://127.0.0.1:9337/json/list')).json(); const p = l.find(t => t.type === 'page' && t.webSocketDebuggerUrl); if (p) return p } catch {} ; await new Promise(r => setTimeout(r, 250)) } throw new Error('no page') }
function connect(wsUrl) { return new Promise((resolve, reject) => { const ws = new WebSocket(wsUrl); let id = 0; const pend = new Map(); ws.onopen = () => resolve({ send(m, pa = {}) { return new Promise((r2, j2) => { const mid = ++id; pend.set(mid, { r2, j2 }); ws.send(JSON.stringify({ id: mid, method: m, params: pa })) }) }, close() { try { ws.close() } catch {} } }); ws.onmessage = ev => { const g = JSON.parse(ev.data); if (g.id && pend.has(g.id)) { const { r2, j2 } = pend.get(g.id); pend.delete(g.id); g.error ? j2(new Error(JSON.stringify(g.error))) : r2(g.result) } }; ws.onerror = reject }) }
async function evalOn(cdp, e) { const r = await cdp.send('Runtime.evaluate', { expression: e, returnByValue: true }); return r.result?.value }
async function goto(cdp, path, maxMs = 12000) { await cdp.send('Page.navigate', { url: BASE + path }); const t0 = Date.now(); while (Date.now() - t0 < maxMs) { if (await evalOn(cdp, 'document.readyState')) return; await new Promise(r => setTimeout(r, 250)) } }
async function shot(cdp, name) {
  const r = await cdp.send('Page.captureScreenshot', { format: 'png' })
  writeFileSync(OUT + name, Buffer.from(r.data, 'base64'))
  console.log('SHOT', name)
}

const ROUTES = [
  ['/', 'home'], ['/catalog', 'catalog'], ['/catalog/qinyuan', 'ent-qinyuan'],
  ['/catalog/bifang', 'ent-bifang'], ['/catalog/xiwanmu', 'ent-xiwanmu'], ['/catalog/xiangliu', 'ent-xiangliu'],
  ['/catalog/luwu', 'ent-luwu'], ['/atlas', 'atlas'], ['/chapters', 'chapters'],
  ['/chapters/nanshan-jing', 'ch-nanshan'], ['/chapters/xishan-jing', 'ch-xishan'],
  ['/relations', 'relations'], ['/explore', 'explore'], ['/journeys/nanci-yi', 'journey'],
  ['/favorites', 'favorites'], ['/about', 'about'], ['/how-to-read', 'howtoread'],
  ['/readings', 'readings'], ['/variants', 'variants'],
]
const THEME390 = [['/', 'home'], ['/chapters/xishan-jing', 'ch-xishan'], ['/catalog/xiwanmu', 'ent-xiwanmu'], ['/readings', 'readings'], ['/variants', 'variants'], ['/atlas', 'atlas']]

import('node:fs').then(async (fs) => {
  try {
    await waitPreview()
    const page = await getPage(); const cdp = await connect(page.webSocketDebuggerUrl)
    await cdp.send('Page.enable')
    for (const [theme, suffix] of [['deng', 'deng'], ['qing', 'qing']]) {
      for (const [path, name] of ROUTES) {
        await goto(cdp, path, 12000)
        await evalOn(cdp, `document.documentElement.setAttribute('data-theme','${theme}');document.querySelectorAll('*').forEach(el=>{el.style.transition='none'});1`)
        await new Promise(r => setTimeout(r, 350))
        await shot(cdp, `final5-${name}-${suffix}-1440.png`)
      }
    }
    // 390 灯下抽样(6 页)
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true })
    for (const [path, name] of THEME390) {
      await goto(cdp, path, 12000)
      await evalOn(cdp, `document.documentElement.setAttribute('data-theme','deng');document.querySelectorAll('*').forEach(el=>{el.style.transition='none'});1`)
      await new Promise(r => setTimeout(r, 350))
      await shot(cdp, `final5-${name}-deng-390.png`)
    }
    await cdp.send('Emulation.clearDeviceMetricsOverride')
    await cdp.close()
    console.log('全部截图完成')
  } catch (e) { console.log('ERR', String(e).slice(0, 120)) }
  try { spawnSync('taskkill', ['/PID', String(chrome.pid), '/T', '/F'], { stdio: 'ignore' }) } catch {}
  try { spawnSync('taskkill', ['/PID', String(preview.pid), '/T', '/F'], { stdio: 'ignore' }) } catch {}
  rmSync(profile, { recursive: true, force: true })
  process.exit(0)
})
