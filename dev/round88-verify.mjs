// G88 验收:南次三经收官(四段+篇末+总记+ns3 里距表)
import { spawn, spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const BASE = 'http://localhost:4183'
const preview = spawn('npx', ['vite', 'preview', '--port', '4183', '--strictPort'], { cwd: 'D:/zcode/workspace/default/shanhai', stdio: 'ignore', shell: true })
async function waitPreview() { for (let i = 0; i < 60; i++) { try { const r = await fetch(BASE + '/'); if (r.ok) return } catch {} ; await new Promise(r => setTimeout(r, 250)) } throw new Error('preview 未就绪') }
const profile = mkdtempSync(join(tmpdir(), 'shanhai-g88-'))
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

  await goto(cdp, '/chapters/nanshan-jing', `document.body.textContent.includes('南禺之山')?1:0`)
  const ch = await evalOn(cdp, `(()=>{
    const clone=document.body.cloneNode(true); clone.querySelectorAll('rt').forEach(x=>x.remove()); const plain=clone.textContent
    const t=document.body.textContent
    return {
      alive: t.length>3000,
      lingqiu: plain.includes('其名曰顒，其鸣自号也，见则天下大旱。'),
      lunzhe: plain.includes('其名曰白䓘，可以血玉。'),
      yugao: plain.includes('又东五百八十里，曰禺槀之山，多怪兽，多大蛇。'),
      nanyu: plain.includes('有凤皇、鹓雏。'),
      tongji: plain.includes('凡一十四山，六千五百三十里'),
      zongji: plain.includes('大小凡四十山，万六千三百八十里'),
      gapOld: !plain.includes('令丘、仑者、禺稿、南禺诸段待录入'),
      ns3table: t.includes('里距对照(南次三经)'),
      ns3doubt: t.includes('三段篇末合计 41 山 16680 里'),
    }
  })()`)
  rec('A1a 白屏探针', ch.alive, `${ch.alive}`)
  rec('A1b 令丘段逐字', ch.lingqiu, `${ch.lingqiu}`)
  rec('A1c 侖者段逐字(白䓘)', ch.lunzhe, `${ch.lunzhe}`)
  rec('A1d 禺槀段逐字', ch.yugao, `${ch.yugao}`)
  rec('A1e 南禺段逐字(鹓雏)', ch.nanyu, `${ch.nanyu}`)
  rec('A1f 篇末+总记照录', ch.tongji && ch.zongji, `tongji=${ch.tongji} zongji=${ch.zongji}`)
  rec('A1g 旧 gap 清', ch.gapOld, `${ch.gapOld}`)
  rec('A1h ns3 里距表+存疑区', ch.ns3table && ch.ns3doubt, `table=${ch.ns3table} doubt=${ch.ns3doubt}`)

  for (const [w, h, tag] of [[1440, 900, '1440'], [390, 844, '390']]) {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: tag === '390' })
    await goto(cdp, '/atlas', `document.querySelectorAll('svg [role="button"]').length>=46?1:0`)
    const a = await evalOn(cdp, `(()=>{
      const dots=[...document.querySelectorAll('svg rect')].filter(r=>(r.getAttribute('class')||'').includes('nodeDot'))
      const texts=[...document.querySelectorAll('svg text')]
      let ov=0
      for(let i=0;i<texts.length;i++)for(let j=i+1;j<texts.length;j++){const a=texts[i].getBoundingClientRect(),b=texts[j].getBoundingClientRect();if(a.left<b.right&&b.left<a.right&&a.top<b.bottom&&b.top<a.bottom)ov++}
      return { dots: dots.length, texts: texts.length, ov }
    })()`)
    rec(`A2[${tag}] 方印=46`, a.dots === 46, `dots=${a.dots}`)
    rec(`A2[${tag}] 零重叠`, a.ov === 0, `texts=${a.texts} ov=${a.ov}`)
  }
  await cdp.send('Emulation.clearDeviceMetricsOverride')

  await goto(cdp, '/variants', `document.body.textContent.includes('疑25')?1:0`)
  const va = await evalOn(cdp, `(()=>{const t=document.body.textContent;return { d23:t.includes('白咎'), d24:t.includes('禺稿'), d25:t.includes('凡一十四山') }})()`)
  rec('A3 疑23/24/25 上屏', va.d23 && va.d24 && va.d25, JSON.stringify(va))

  await goto(cdp, '/', `document.querySelectorAll('dt').length>0?1:0`)
  const home = await evalOn(cdp, `(()=>{const dt=[...document.querySelectorAll('dt')].find(x=>x.textContent.includes('条目已核验'));return dt?dt.nextElementSibling.textContent.trim():null})()`)
  rec('A4 首页条目已核验=12', home === '12', `dd=${home}`)
  await goto(cdp, '/readings', `document.body.textContent.includes('顒')?1:0`)
  const rd = await evalOn(cdp, `document.body.textContent.includes('音羔')?1:0`)
  rec('A5 音表顒/䓘行', rd === 1, `on=${rd}`)

  await cdp.close()
} catch (e) { rec('EXCEPTION', false, String(e)) }

writeFileSync('dev/round88-results.json', JSON.stringify(results, null, 2), 'utf8')
const pass = results.filter(r => r.pass).length
console.log(`\n${pass}/${results.length} PASS`)
try { spawnSync('taskkill', ['/PID', String(chrome.pid), '/T', '/F'], { stdio: 'ignore' }) } catch {}
try { spawnSync('taskkill', ['/PID', String(preview.pid), '/T', '/F'], { stdio: 'ignore' }) } catch {}
rmSync(profile, { recursive: true, force: true })
process.exit(pass === results.length ? 0 : 1)
