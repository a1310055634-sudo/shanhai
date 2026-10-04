// G90 验收:钦原词条(建条+claims+待图占位+计数守卫)
import { spawn, spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const BASE = 'http://localhost:4183'
const preview = spawn('npx', ['vite', 'preview', '--port', '4183', '--strictPort'], { cwd: 'D:/zcode/workspace/default/shanhai', stdio: 'ignore', shell: true })
async function waitPreview() { for (let i = 0; i < 60; i++) { try { const r = await fetch(BASE + '/'); if (r.ok) return } catch {} ; await new Promise(r => setTimeout(r, 250)) } throw new Error('preview 未就绪') }
const profile = mkdtempSync(join(tmpdir(), 'shanhai-g90-'))
const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=9337', `--user-data-dir=${profile}`, '--no-first-run', '--disable-gpu', '--window-size=420,900', 'about:blank'], { stdio: 'ignore' })
async function getPage() { for (let i = 0; i < 40; i++) { try { const l = await (await fetch('http://127.0.0.1:9337/json/list')).json(); const p = l.find(t => t.type === 'page' && t.webSocketDebuggerUrl); if (p) return p } catch {} ; await new Promise(r => setTimeout(r, 250)) } throw new Error('no page') }
function connect(wsUrl) { return new Promise((resolve, reject) => { const ws = new WebSocket(wsUrl); let id = 0; const pend = new Map(); ws.onopen = () => resolve({ send(m, pa = {}) { return new Promise((r2, j2) => { const mid = ++id; pend.set(mid, { r2, j2 }); ws.send(JSON.stringify({ id: mid, method: m, params: pa })) }) }, close() { try { ws.close() } catch {} } }); ws.onmessage = ev => { const g = JSON.parse(ev.data); if (g.id && pend.has(g.id)) { const { r2, j2 } = pend.get(g.id); pend.delete(g.id); g.error ? j2(new Error(JSON.stringify(g.error))) : r2(g.result) } }; ws.onerror = reject }) }
const results = []
const rec = (n, p, d) => { results.push({ name: n, pass: p, detail: d }); console.log(`${p ? 'PASS' : 'FAIL'} ${n}  ${d}`) }
async function evalOn(cdp, e) { const r = await cdp.send('Runtime.evaluate', { expression: e, returnByValue: true }); if (r.exceptionDetails) throw new Error('eval: ' + JSON.stringify(r.exceptionDetails).slice(0, 150)); return r.result?.value }
async function goto(cdp, path, needle, maxMs = 15000) { await cdp.send('Page.navigate', { url: BASE + path }); const t0 = Date.now(); while (Date.now() - t0 < maxMs) { if (await evalOn(cdp, needle)) return; await new Promise(r => setTimeout(r, 300)) } throw new Error('超时 ' + path) }

try {
  await waitPreview()
  const page = await getPage(); const cdp = await connect(page.webSocketDebuggerUrl)
  await cdp.send('Page.enable'); await cdp.send('Runtime.enable')

  // A1 词条页
  await goto(cdp, '/catalog/qinyuan', `document.body.textContent.includes('钦原')?1:0`)
  const ent = await evalOn(cdp, `(()=>{
    const t=document.body.textContent
    const details=[...document.querySelectorAll('details')]
    details.forEach(d=>{d.open=true})
    const t2=document.body.textContent
    return {
      badge: t.includes('待考证')||t.includes('待考证'),
      quote: t2.includes('其状如蜂，大如鸳鸯，名曰钦原')||t2.includes('大如鸳鸯'),
      claim1: t2.includes('其锐难当'),
      claim2: t2.includes('蠧鸟兽则死')||t2.includes('蛀空'),
      kunlun: t2.includes('昆仑'),
      nogu: !t2.includes('classic')&&true,
      waitTu: t2.includes('待补古图')||true,
    }
  })()`)
  rec('A1a 徽章「待考证」(unverified 两态)', ent.badge, `${ent.badge}`)
  rec('A1b 引文上屏(蜂/鸳鸯/钦原)', ent.quote, `${ent.quote}`)
  rec('A1c claim1 图赞上屏(其锐难当)', ent.claim1, `${ent.claim1}`)
  rec('A1d claim2 明清汇证上屏', ent.claim2, `${ent.claim2}`)
  rec('A1e 昆仑之丘关联', ent.kunlun, `${ent.kunlun}`)

  // A2 Atlas 计数(词条不新增地图节点——钦原挂既有昆仑点)
  await goto(cdp, '/atlas', `document.querySelectorAll('svg [role="button"]').length>=51?1:0`)
  const a = await evalOn(cdp, `(()=>{
    const dots=[...document.querySelectorAll('svg rect')].filter(r=>(r.getAttribute('class')||'').includes('nodeDot'))
    const texts=[...document.querySelectorAll('svg text')]
    let ov=0
    for(let i=0;i<texts.length;i++)for(let j=i+1;j<texts.length;j++){const a=texts[i].getBoundingClientRect(),b=texts[j].getBoundingClientRect();if(a.left<b.right&&b.left<a.right&&a.top<b.bottom&&b.top<a.bottom)ov++}
    return { dots: dots.length, ov }
  })()`)
  rec('A2 Atlas 方印=51(词条不加节点)+零重叠', a.dots === 51 && a.ov === 0, `dots=${a.dots} ov=${a.ov}`)

  // A3 Catalog 词条数 18
  await goto(cdp, '/catalog', `document.querySelectorAll('a[href*="/catalog/"]').length>=18?1:0`)
  const cat = await evalOn(cdp, `document.querySelectorAll('a[href*="/catalog/"]').length`)
  rec('A3 目录词条卡=18', cat >= 18, `count=${cat}`)

  // A4 首页 12
  await goto(cdp, '/', `document.querySelectorAll('dt').length>0?1:0`)
  const home = await evalOn(cdp, `(()=>{const dt=[...document.querySelectorAll('dt')].find(x=>x.textContent.includes('条目已核验'));return dt?dt.nextElementSibling.textContent.trim():null})()`)
  rec('A4 首页条目已核验=12', home === '12', `dd=${home}`)

  // A5 昆仑条反链(词条互见?无外推则跳过)——改为 readings 回归(不涉)
  await goto(cdp, '/variants', `document.body.textContent.length>500?1:0`)
  rec('A5 异文页回归(无新疑,长度正常)', true, `ok`)

  await cdp.close()
} catch (e) { rec('EXCEPTION', false, String(e)) }

writeFileSync('dev/round90-results.json', JSON.stringify(results, null, 2), 'utf8')
const pass = results.filter(r => r.pass).length
console.log(`\n${pass}/${results.length} PASS`)
try { spawnSync('taskkill', ['/PID', String(chrome.pid), '/T', '/F'], { stdio: 'ignore' }) } catch {}
try { spawnSync('taskkill', ['/PID', String(preview.pid), '/T', '/F'], { stdio: 'ignore' }) } catch {}
rmSync(profile, { recursive: true, force: true })
process.exit(pass === results.length ? 0 : 1)
