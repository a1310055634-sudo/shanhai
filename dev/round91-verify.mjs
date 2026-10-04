// G91 验收:章莪之山+毕方词条
import { spawn, spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const BASE = 'http://localhost:4183'
const preview = spawn('npx', ['vite', 'preview', '--port', '4183', '--strictPort'], { cwd: 'D:/zcode/workspace/default/shanhai', stdio: 'ignore', shell: true })
async function waitPreview() { for (let i = 0; i < 60; i++) { try { const r = await fetch(BASE + '/'); if (r.ok) return } catch {} ; await new Promise(r => setTimeout(r, 250)) } throw new Error('preview 未就绪') }
const profile = mkdtempSync(join(tmpdir(), 'shanhai-g91-'))
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

  // A1 古卷西山页:章莪段逐字(剥 rt)
  await goto(cdp, '/chapters/xishan-jing', `document.body.textContent.includes('章莪之山')?1:0`)
  const ch = await evalOn(cdp, `(()=>{
    const clone=document.body.cloneNode(true); clone.querySelectorAll('rt').forEach(x=>x.remove()); const plain=clone.textContent
    return {
      alive: plain.length>800,
      seg: plain.includes('又西二百八十里，曰章莪之山，无草木，多瑶碧。'),
      bifang: plain.includes('名曰毕方，其鸣自叫也，见则其邑有讹火。'),
      zheng: plain.includes('其名如狰'),
      gap: plain.includes('西次三经余山'),
    }
  })()`)
  rec('A1a 白屏探针', ch.alive, `${ch.alive}`)
  rec('A1b 章莪段逐字', ch.seg, `${ch.seg}`)
  rec('A1c 毕方句逐字', ch.bifang, `${ch.bifang}`)
  rec('A1d 狰转写在', ch.zheng, `${ch.zheng}`)
  rec('A1e 三经 gap 注', ch.gap, `${ch.gap}`)

  // A2 词条页
  await goto(cdp, '/catalog/bifang', `document.body.textContent.includes('毕方')?1:0`)
  const ent = await evalOn(cdp, `(()=>{
    const details=[...document.querySelectorAll('details')]; details.forEach(d=>{d.open=true})
    const t=document.body.textContent
    return {
      badge: t.includes('待考证'),
      quote: t.includes('赤文青质而白喙，名曰毕方'),
      omen: t.includes('见则其邑有讹火')||t.includes('怪火之灾'),
      c1: t.includes('木生毕方'),
      c2: t.includes('火之精曰必方')||t.includes('必方'),
      c3: t.includes('离精是炳')||t.includes('离精'),
      c4: t.includes('逐毕方文')||t.includes('柳宗元'),
      xue: t.includes('两足一翼')||t.includes('薛综'),
    }
  })()`)
  rec('A2a 徽章两态', ent.badge, `${ent.badge}`)
  rec('A2b 引文上屏', ent.quote, `${ent.quote}`)
  rec('A2c omens 讹火上屏', ent.omen, `${ent.omen}`)
  rec('A2d claim 淮南子', ent.c1, `${ent.c1}`)
  rec('A2e claim 白泽图', ent.c2, `${ent.c2}`)
  rec('A2f claim 图赞', ent.c3, `${ent.c3}`)
  rec('A2g claim 柳宗元', ent.c4, `${ent.c4}`)
  rec('A2h 薛综异说并存', ent.xue, `${ent.xue}`)

  // A3 Atlas 52 + A4 首页 + A5 catalog 19
  await goto(cdp, '/atlas', `document.querySelectorAll('svg [role="button"]').length>=52?1:0`)
  const a = await evalOn(cdp, `(()=>{
    const dots=[...document.querySelectorAll('svg rect')].filter(r=>(r.getAttribute('class')||'').includes('nodeDot'))
    const texts=[...document.querySelectorAll('svg text')]
    let ov=0
    for(let i=0;i<texts.length;i++)for(let j=i+1;j<texts.length;j++){const a=texts[i].getBoundingClientRect(),b=texts[j].getBoundingClientRect();if(a.left<b.right&&b.left<a.right&&a.top<b.bottom&&b.top<a.bottom)ov++}
    return { dots: dots.length, ov }
  })()`)
  rec('A3 Atlas 方印=52+零重叠', a.dots === 52 && a.ov === 0, `dots=${a.dots} ov=${a.ov}`)
  await goto(cdp, '/', `document.querySelectorAll('dt').length>0?1:0`)
  const home = await evalOn(cdp, `(()=>{const dt=[...document.querySelectorAll('dt')].find(x=>x.textContent.includes('条目已核验'));return dt?dt.nextElementSibling.textContent.trim():null})()`)
  rec('A4 首页条目已核验=12', home === '12', `dd=${home}`)
  await goto(cdp, '/catalog', `document.querySelectorAll('a[href*="/catalog/"]').length>=19?1:0`)
  const cat = await evalOn(cdp, `document.querySelectorAll('a[href*="/catalog/"]').length`)
  rec('A5 目录词条卡=19', cat >= 19, `count=${cat}`)

  await cdp.close()
} catch (e) { rec('EXCEPTION', false, String(e)) }

writeFileSync('dev/round91-results.json', JSON.stringify(results, null, 2), 'utf8')
const pass = results.filter(r => r.pass).length
console.log(`\n${pass}/${results.length} PASS`)
try { spawnSync('taskkill', ['/PID', String(chrome.pid), '/T', '/F'], { stdio: 'ignore' }) } catch {}
try { spawnSync('taskkill', ['/PID', String(preview.pid), '/T', '/F'], { stdio: 'ignore' }) } catch {}
rmSync(profile, { recursive: true, force: true })
process.exit(pass === results.length ? 0 : 1)
