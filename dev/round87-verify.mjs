// G87 验收:南次三经扩录二(非山首/陽夾/灌湘/雞山)
import { spawn, spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const BASE = 'http://localhost:4183'
const preview = spawn('npx', ['vite', 'preview', '--port', '4183', '--strictPort'], { cwd: 'D:/zcode/workspace/default/shanhai', stdio: 'ignore', shell: true })
async function waitPreview() { for (let i = 0; i < 60; i++) { try { const r = await fetch(BASE + '/'); if (r.ok) return } catch {} ; await new Promise(r => setTimeout(r, 250)) } throw new Error('preview 未就绪') }
const profile = mkdtempSync(join(tmpdir(), 'shanhai-g87-'))
const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=9337', `--user-data-dir=${profile}`, '--no-first-run', '--disable-gpu', '--window-size=420,900', 'about:blank'], { stdio: 'ignore' })
async function getPage() { for (let i = 0; i < 40; i++) { try { const l = await (await fetch('http://127.0.0.1:9337/json/list')).json(); const p = l.find(t => t.type === 'page' && t.webSocketDebuggerUrl); if (p) return p } catch {} ; await new Promise(r => setTimeout(r, 250)) } throw new Error('no page') }
function connect(wsUrl) { return new Promise((resolve, reject) => { const ws = new WebSocket(wsUrl); let id = 0; const pend = new Map(); ws.onopen = () => resolve({ send(m, pa = {}) { return new Promise((r2, j2) => { const mid = ++id; pend.set(mid, { r2, j2 }); ws.send(JSON.stringify({ id: mid, method: m, params: pa })) }) }, close() { try { ws.close() } catch {} } }); ws.onmessage = ev => { const g = JSON.parse(ev.data); if (g.id && pend.has(g.id)) { const { r2, j2 } = pend.get(g.id); pend.delete(g.id); g.error ? j2(new Error(JSON.stringify(g.error))) : r2(g.result) } }; ws.onerror = reject }) }
const results = []
const rec = (n, p, d) => { results.push({ name: n, pass: p, detail: d }); console.log(`${p ? 'PASS' : 'FAIL'} ${n}  ${d}`) }
async function evalOn(cdp, e) { const r = await cdp.send('Runtime.evaluate', { expression: e, returnByValue: true }); if (r.exceptionDetails) throw new Error('eval: ' + JSON.stringify(r.exceptionDetails).slice(0, 150)); return r.result?.value }
async function goto(cdp, path, needle, maxMs = 12000) { await cdp.send('Page.navigate', { url: BASE + path }); const t0 = Date.now(); while (Date.now() - t0 < maxMs) { if (await evalOn(cdp, needle)) return; await new Promise(r => setTimeout(r, 300)) } throw new Error('超时 ' + path) }

try {
  await waitPreview()
  const page = await getPage(); const cdp = await connect(page.webSocketDebuggerUrl)
  await cdp.send('Page.enable'); await cdp.send('Runtime.enable')

  await goto(cdp, '/chapters/nanshan-jing', `document.body.textContent.includes('阳夹之山')?1:0`)
  const ch = await evalOn(cdp, `(()=>{
    const clone=document.body.cloneNode(true); clone.querySelectorAll('rt').forEach(x=>x.remove()); const plain=clone.textContent
    const t=document.body.textContent
    return {
      alive: t.length>3000,
      feishan: plain.includes('又东四百里，至于非山之首，其上多金玉，无水，其下多蝮虫。'),
      yangjia: plain.includes('又东五百里，曰阳夹之山，无草木，多水。'),
      guanxiang: plain.includes('又东五百里，曰灌湘之山，上多木，无草；多怪鸟，无兽。'),
      jishan: plain.includes('又东五百里，曰鸡山，其上多金，其下多丹雘。黑水山焉') && plain.includes('其中有鱄鱼'),
      gapOld: !plain.includes('非山之首、阳夹、灌湘、鸡山'),
      gapNew: plain.includes('令丘、仑者、禺稿、南禺诸段待录入'),
      zhuanRuby: t.includes('鱄'),
    }
  })()`)
  rec('A1a 白屏探针', ch.alive, `${ch.alive}`)
  rec('A1b 非山首段逐字', ch.feishan, `${ch.feishan}`)
  rec('A1c 陽夾段逐字', ch.yangjia, `${ch.yangjia}`)
  rec('A1d 灌湘段逐字', ch.guanxiang, `${ch.guanxiang}`)
  rec('A1e 雞山段逐字(黑水山焉+鱄鱼)', ch.jishan, `${ch.jishan}`)
  rec('A1f 旧 gap 清/新 gap 在', ch.gapOld && ch.gapNew, `old=${ch.gapOld} new=${ch.gapNew}`)

  for (const [w, h, tag] of [[1440, 900, '1440'], [390, 844, '390']]) {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: tag === '390' })
    await goto(cdp, '/atlas', `document.querySelectorAll('svg [role="button"]').length>=42?1:0`)
    const a = await evalOn(cdp, `(()=>{
      const dots=[...document.querySelectorAll('svg rect')].filter(r=>(r.getAttribute('class')||'').includes('nodeDot'))
      const texts=[...document.querySelectorAll('svg text')]
      let ov=0
      for(let i=0;i<texts.length;i++)for(let j=i+1;j<texts.length;j++){const a=texts[i].getBoundingClientRect(),b=texts[j].getBoundingClientRect();if(a.left<b.right&&b.left<a.right&&a.top<b.bottom&&b.top<a.bottom)ov++}
      return { dots: dots.length, texts: texts.length, ov }
    })()`)
    rec(`A2[${tag}] 方印=42`, a.dots === 42, `dots=${a.dots}`)
    rec(`A2[${tag}] 零重叠`, a.ov === 0, `texts=${a.texts} ov=${a.ov}`)
  }
  await cdp.send('Emulation.clearDeviceMetricsOverride')

  await goto(cdp, '/variants', `document.body.textContent.includes('疑22')?1:0`)
  const va = await evalOn(cdp, `(()=>{const t=document.body.textContent;return { d21:t.includes('灌湖射之山'), d22:t.includes('黑水山焉')||t.includes('两案相持') }})()`)
  rec('A3 疑21/22 上屏', va.d21 && va.d22, JSON.stringify(va))

  await goto(cdp, '/', `document.querySelectorAll('dt').length>0?1:0`)
  const home = await evalOn(cdp, `(()=>{const dt=[...document.querySelectorAll('dt')].find(x=>x.textContent.includes('条目已核验'));return dt?dt.nextElementSibling.textContent.trim():null})()`)
  rec('A4 首页条目已核验=12', home === '12', `dd=${home}`)
  await goto(cdp, '/readings', `document.body.textContent.includes('鱄')?1:0`)
  const rd = await evalOn(cdp, `document.body.textContent.includes('團')||document.body.textContent.includes('团')?1:0`)
  rec('A5 音表鱄行(tuán)', rd === 1, `on=${rd}`)

  await cdp.close()
} catch (e) { rec('EXCEPTION', false, String(e)) }

writeFileSync('dev/round87-results.json', JSON.stringify(results, null, 2), 'utf8')
const pass = results.filter(r => r.pass).length
console.log(`\n${pass}/${results.length} PASS`)
try { spawnSync('taskkill', ['/PID', String(chrome.pid), '/T', '/F'], { stdio: 'ignore' }) } catch {}
try { spawnSync('taskkill', ['/PID', String(preview.pid), '/T', '/F'], { stdio: 'ignore' }) } catch {}
rmSync(profile, { recursive: true, force: true })
process.exit(pass === results.length ? 0 : 1)
