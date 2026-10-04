// G101 轻验收:纹样收口+待图复查(档案/纹样数/首页 12)
import { spawn, spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync, readFileSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const BASE = 'http://localhost:4183'
const preview = spawn('npx', ['vite', 'preview', '--port', '4183', '--strictPort'], { cwd: 'D:/zcode/workspace/default/shanhai', stdio: 'ignore', shell: true })
async function waitPreview() { for (let i = 0; i < 60; i++) { try { const r = await fetch(BASE + '/'); if (r.ok) return } catch {} ; await new Promise(r => setTimeout(r, 250)) } throw new Error('preview 未就绪') }
const profile = mkdtempSync(join(tmpdir(), 'shanhai-g101-'))
const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=9337', `--user-data-dir=${profile}`, '--no-first-run', '--disable-gpu', '--window-size=420,900', 'about:blank'], { stdio: 'ignore' })
async function getPage() { for (let i = 0; i < 40; i++) { try { const l = await (await fetch('http://127.0.0.1:9337/json/list')).json(); const p = l.find(t => t.type === 'page' && t.webSocketDebuggerUrl); if (p) return p } catch {} ; await new Promise(r => setTimeout(r, 250)) } throw new Error('no page') }
function connect(wsUrl) { return new Promise((resolve, reject) => { const ws = new WebSocket(wsUrl); let id = 0; const pend = new Map(); ws.onopen = () => resolve({ send(m, pa = {}) { return new Promise((r2, j2) => { const mid = ++id; pend.set(mid, { r2, j2 }); ws.send(JSON.stringify({ id: mid, method: m, params: pa })) }) }, close() { try { ws.close() } catch {} } }); ws.onmessage = ev => { const g = JSON.parse(ev.data); if (g.id && pend.has(g.id)) { const { r2, j2 } = pend.get(g.id); pend.delete(g.id); g.error ? j2(new Error(JSON.stringify(g.error))) : r2(g.result) } }; ws.onerror = reject }) }
const results = []
const rec = (n, p, d) => { results.push({ name: n, pass: p, detail: d }); console.log(`${p ? 'PASS' : 'FAIL'} ${n}  ${d}`) }
async function evalOn(cdp, e) { const r = await cdp.send('Runtime.evaluate', { expression: e, returnByValue: true }); if (r.exceptionDetails) throw new Error('eval: ' + JSON.stringify(r.exceptionDetails).slice(0, 150)); return r.result?.value }
async function goto(cdp, path, needle, maxMs = 15000) { await cdp.send('Page.navigate', { url: BASE + path }); const t0 = Date.now(); while (Date.now() - t0 < maxMs) { if (await evalOn(cdp, needle)) return; await new Promise(r => setTimeout(r, 300)) } throw new Error('超时 ' + path) }

try {
  // A1 复查档案在档+逐格结论
  const recheck = JSON.parse(readFileSync('D:/zcode/workspace/default/shanhai/dev/round101-recheck.json', 'utf8'))
  const keys = Object.keys(recheck.results)
  const noNew = keys.filter(k => (recheck.results[k].usable || '') === '无' || (recheck.results[k].err || '').includes('429')).length
  rec(`A1 复查档案在档(${keys.length} 兽,其中 ${noNew} 兽无可用/受限)`, keys.length === 13, `keys=${keys.length}`)
  rec('A2 纹样新增 0(检索组件无 SVG 纹样)', !existsSync('D:/zcode/workspace/default/shanhai/src/components/search/SearchOverlay.module.css') || !readFileSync('D:/zcode/workspace/default/shanhai/src/components/search/SearchOverlay.module.css', 'utf8').includes('feTurbulence'), 'feTurbulence=0')

  await waitPreview()
  const page = await getPage(); const cdp = await connect(page.webSocketDebuggerUrl)
  await cdp.send('Page.enable'); await cdp.send('Runtime.enable')

  // A3 检索浮层不回归(搜索仍可用)+待图占位在(陆吾词条)
  await goto(cdp, '/', `document.querySelectorAll('dt').length>0?1:0`)
  await evalOn(cdp, `(()=>{window.dispatchEvent(new KeyboardEvent('keydown',{key:'k',ctrlKey:true}));return 1})()`)
  const overlay = await evalOn(cdp, `document.querySelector('[data-search-veil]')?1:0`)
  await evalOn(cdp, `(()=>{window.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}));return 1})()`)
  rec('A3 搜索浮层不回归', overlay === 1, `open=${overlay}`)
  await goto(cdp, '/catalog/luwu', `document.body.textContent.includes('陆吾')?1:0`)
  const wait = await evalOn(cdp, `document.body.textContent.includes('刻本古图待补')?1:0`)
  rec('A4 陆吾词条待图占位在', wait === 1, `on=${wait}`)

  // A5 首页 12
  await goto(cdp, '/', `document.querySelectorAll('dt').length>0?1:0`)
  const home = await evalOn(cdp, `(()=>{const dt=[...document.querySelectorAll('dt')].find(x=>x.textContent.includes('条目已核验'));return dt?dt.nextElementSibling.textContent.trim():null})()`)
  rec('A5 首页条目已核验=12', home === '12', `dd=${home}`)

  await cdp.close()
} catch (e) { rec('EXCEPTION', false, String(e)) }

writeFileSync('dev/round101-results.json', JSON.stringify(results, null, 2), 'utf8')
const pass = results.filter(r => r.pass).length
console.log(`\n${pass}/${results.length} PASS`)
try { spawnSync('taskkill', ['/PID', String(chrome.pid), '/T', '/F'], { stdio: 'ignore' }) } catch {}
try { spawnSync('taskkill', ['/PID', String(preview.pid), '/T', '/F'], { stdio: 'ignore' }) } catch {}
rmSync(profile, { recursive: true, force: true })
process.exit(pass === results.length ? 0 : 1)
