// G96 验收:页脚触控 44px+390 全路由走查+渐隐带复查
import { spawn, spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const BASE = 'http://localhost:4183'
const preview = spawn('npx', ['vite', 'preview', '--port', '4183', '--strictPort'], { cwd: 'D:/zcode/workspace/default/shanhai', stdio: 'ignore', shell: true })
async function waitPreview() { for (let i = 0; i < 60; i++) { try { const r = await fetch(BASE + '/'); if (r.ok) return } catch {} ; await new Promise(r => setTimeout(r, 250)) } throw new Error('preview 未就绪') }
const profile = mkdtempSync(join(tmpdir(), 'shanhai-g96-'))
const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=9337', `--user-data-dir=${profile}`, '--no-first-run', '--disable-gpu', '--window-size=420,900', 'about:blank'], { stdio: 'ignore' })
async function getPage() { for (let i = 0; i < 40; i++) { try { const l = await (await fetch('http://127.0.0.1:9337/json/list')).json(); const p = l.find(t => t.type === 'page' && t.webSocketDebuggerUrl); if (p) return p } catch {} ; await new Promise(r => setTimeout(r, 250)) } throw new Error('no page') }
function connect(wsUrl) { return new Promise((resolve, reject) => { const ws = new WebSocket(wsUrl); let id = 0; const pend = new Map(); ws.onopen = () => resolve({ send(m, pa = {}) { return new Promise((r2, j2) => { const mid = ++id; pend.set(mid, { r2, j2 }); ws.send(JSON.stringify({ id: mid, method: m, params: pa })) }) }, close() { try { ws.close() } catch {} } }); ws.onmessage = ev => { const g = JSON.parse(ev.data); if (g.id && pend.has(g.id)) { const { r2, j2 } = pend.get(g.id); pend.delete(g.id); g.error ? j2(new Error(JSON.stringify(g.error))) : r2(g.result) } }; ws.onerror = reject }) }
const results = []
const rec = (n, p, d) => { results.push({ name: n, pass: p, detail: d }); console.log(`${p ? 'PASS' : 'FAIL'} ${n}  ${d}`) }
async function evalOn(cdp, e) { const r = await cdp.send('Runtime.evaluate', { expression: e, returnByValue: true }); if (r.exceptionDetails) throw new Error('eval: ' + JSON.stringify(r.exceptionDetails).slice(0, 150)); return r.result?.value }
async function goto(cdp, path, needle, maxMs = 15000) { await cdp.send('Page.navigate', { url: BASE + path }); const t0 = Date.now(); while (Date.now() - t0 < maxMs) { if (await evalOn(cdp, needle)) return; await new Promise(r => setTimeout(r, 300)) } throw new Error('超时 ' + path) }

const ROUTES = ['/', '/catalog', '/catalog/qinyuan', '/catalog/xiwanmu', '/catalog/bifang', '/catalog/xiangliu', '/atlas', '/chapters', '/chapters/nanshan-jing', '/chapters/xishan-jing', '/relations', '/explore', '/journeys/nanci-yi', '/favorites', '/about', '/how-to-read', '/readings', '/variants']

try {
  await waitPreview()
  const page = await getPage(); const cdp = await connect(page.webSocketDebuggerUrl)
  await cdp.send('Page.enable'); await cdp.send('Runtime.enable')

  // A1 页脚触控区 ≥44px(双主题双视口抽样)
  for (const [w, h, theme, tag] of [[1440, 900, 'deng', '1440灯下'], [390, 844, 'deng', '390灯下'], [390, 844, 'qing', '390晴窗']]) {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: tag.startsWith('390') })
    await goto(cdp, '/', `document.querySelectorAll('dt').length>0?1:0`)
    if (theme === 'qing') { await evalOn(cdp, `localStorage.setItem('shanhai-theme','qing');location.reload();1`) ; await new Promise(r => setTimeout(r, 1500)) }
    const heights = await evalOn(cdp, `(()=>{
      const links=[...document.querySelectorAll('footer a, footer button')]
      return links.map(a=>Math.round(a.getBoundingClientRect().height))
    })()`)
    const minH = Math.min(...heights)
    rec(`A1[${tag}] 页脚触控全部 ≥44px(n=${heights.length})`, minH >= 44, `min=${minH} ${JSON.stringify(heights)}`)
    if (theme === 'qing') await evalOn(cdp, `localStorage.setItem('shanhai-theme','deng');location.reload();1`), await new Promise(r => setTimeout(r, 1200))
  }
  await cdp.send('Emulation.clearDeviceMetricsOverride')

  // A3 390 全路由零横溢
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true })
  let ok = 0
  for (const path of ROUTES) {
    await goto(cdp, path, `document.body.textContent.length>100?1:0`)
    const ov = await evalOn(cdp, `document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1 ? 0 : 1`)
    if (ov === 0) ok++
    else console.log(`  ${path} 横溢!`)
  }
  rec(`A3 390 全路由零横溢(${ok}/${ROUTES.length})`, ok === ROUTES.length, `ok=${ok}`)

  // A4 晴窗渐隐带复查(G68 修复未复发:fade 元素+晴窗渐变在)
  await goto(cdp, '/', `document.querySelectorAll('dt').length>0?1:0`)
  await evalOn(cdp, `localStorage.setItem('shanhai-theme','qing');location.reload();1`)
  await new Promise(r => setTimeout(r, 1500))
  const fade = await evalOn(cdp, `(()=>{
    const fades=[...document.querySelectorAll('[class*="fade"]')]
    // 渐变在伪元素上(G68 修法:fadeLeft/fadeRight 双伪元素渐变),本体 backgroundImage=none 属正常
    const withGrad=fades.filter(f=>{
      const b=getComputedStyle(f).backgroundImage
      const bf=getComputedStyle(f,'::before').backgroundImage
      const af=getComputedStyle(f,'::after').backgroundImage
      return b.includes('gradient')||bf.includes('gradient')||af.includes('gradient')
    })
    return { total: fades.length, grad: withGrad.length, sample: withGrad[0]?getComputedStyle(withGrad[0],'::before').backgroundImage.slice(0,60):null }
  })()`)
  rec('A4 晴窗导航渐隐带(G68 修复未复发,渐变载体在)', fade.grad >= 1, JSON.stringify(fade))

  await cdp.send('Emulation.clearDeviceMetricsOverride')

  // A5 首页 12
  await goto(cdp, '/', `document.querySelectorAll('dt').length>0?1:0`)
  const home = await evalOn(cdp, `(()=>{const dt=[...document.querySelectorAll('dt')].find(x=>x.textContent.includes('条目已核验'));return dt?dt.nextElementSibling.textContent.trim():null})()`)
  rec('A5 首页条目已核验=12', home === '12', `dd=${home}`)

  await cdp.close()
} catch (e) { rec('EXCEPTION', false, String(e)) }

writeFileSync('dev/round96-results.json', JSON.stringify(results, null, 2), 'utf8')
const pass = results.filter(r => r.pass).length
console.log(`\n${pass}/${results.length} PASS`)
try { spawnSync('taskkill', ['/PID', String(chrome.pid), '/T', '/F'], { stdio: 'ignore' }) } catch {}
try { spawnSync('taskkill', ['/PID', String(preview.pid), '/T', '/F'], { stdio: 'ignore' }) } catch {}
rmSync(profile, { recursive: true, force: true })
process.exit(pass === results.length ? 0 : 1)
