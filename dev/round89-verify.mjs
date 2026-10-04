// G89 验收:西次一经开篇(新章文本+5 loc+代理对 GLOSSARY 白屏探针)
import { spawn, spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const BASE = 'http://localhost:4183'
const preview = spawn('npx', ['vite', 'preview', '--port', '4183', '--strictPort'], { cwd: 'D:/zcode/workspace/default/shanhai', stdio: 'ignore', shell: true })
async function waitPreview() { for (let i = 0; i < 60; i++) { try { const r = await fetch(BASE + '/'); if (r.ok) return } catch {} ; await new Promise(r => setTimeout(r, 250)) } throw new Error('preview 未就绪') }
const profile = mkdtempSync(join(tmpdir(), 'shanhai-g89-'))
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

  // A1 古卷西山经页(新路由;代理对白屏探针=本页 GLOSSARY 含 𦢊/𧔥)
  await goto(cdp, '/chapters/xishan-jing', `document.body.textContent.includes('钱来之山')?1:0`)
  const ch = await evalOn(cdp, `(()=>{
    const clone=document.body.cloneNode(true); clone.querySelectorAll('rt').forEach(x=>x.remove()); const plain=clone.textContent
    const t=document.body.textContent
    return {
      alive: plain.length>800,
      qianlai: plain.includes('西山经华山之首，曰钱来之山，其上多松，其下多洗石。'),
      songguo: plain.includes('其名曰䳋渠，其状如山鸡，黑身赤足，可以已𦢊。'),
      taihua: plain.includes('有蛇焉，名曰肥𧔥，六足四翼，见则天下大旱。'),
      xiaohua: plain.includes('其阳多㻬琈之玉，鸟多赤鷩'),
      fuyu: plain.includes('其鸟多鴖，其状如翠而赤喙，可以御火。'),
      tongji: plain.includes('凡十九山，二千九百五十七里'),
      gap: plain.includes('羭次之山以下十四山待后续阶段'),
      rubyProxy: t.includes('𦢊') && t.includes('𧔥'),
    }
  })()`)
  rec('A1a 白屏探针(西山页,代理对 GLOSSARY)', ch.alive, `plain>800=${ch.alive}`)
  rec('A1b 錢來段逐字', ch.qianlai, `${ch.qianlai}`)
  rec('A1c 松果段逐字(𦢊)', ch.songguo, `${ch.songguo}`)
  rec('A1d 太華段逐字(肥𧔥)', ch.taihua, `${ch.taihua}`)
  rec('A1e 小華段逐字(㻬琈/鷩)', ch.xiaohua, `${ch.xiaohua}`)
  rec('A1f 符禺段逐字', ch.fuyu, `${ch.fuyu}`)
  rec('A1g 篇末照录+gap', ch.tongji && ch.gap, `tongji=${ch.tongji} gap=${ch.gap}`)
  rec('A1h 代理对字上屏(𦢊/𧔥)', ch.rubyProxy, `${ch.rubyProxy}`)

  // A2 Atlas 双档
  for (const [w, h, tag] of [[1440, 900, '1440'], [390, 844, '390']]) {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: tag === '390' })
    await goto(cdp, '/atlas', `document.querySelectorAll('svg [role="button"]').length>=51?1:0`)
    const a = await evalOn(cdp, `(()=>{
      const dots=[...document.querySelectorAll('svg rect')].filter(r=>(r.getAttribute('class')||'').includes('nodeDot'))
      const texts=[...document.querySelectorAll('svg text')]
      let ov=0
      for(let i=0;i<texts.length;i++)for(let j=i+1;j<texts.length;j++){const a=texts[i].getBoundingClientRect(),b=texts[j].getBoundingClientRect();if(a.left<b.right&&b.left<a.right&&a.top<b.bottom&&b.top<a.bottom)ov++}
      return { dots: dots.length, texts: texts.length, ov }
    })()`)
    rec(`A2[${tag}] 方印=51`, a.dots === 51, `dots=${a.dots}`)
    rec(`A2[${tag}] 零重叠`, a.ov === 0, `texts=${a.texts} ov=${a.ov}`)
  }
  await cdp.send('Emulation.clearDeviceMetricsOverride')

  // A3 ChaptersPage 西山经在列 + A4 首页 + A5 readings
  await goto(cdp, '/chapters', `document.body.textContent.includes('西山经')?1:0`)
  const cp = await evalOn(cdp, `document.querySelector('a[href*="xishan-jing"]')?1:0`)
  rec('A3 章目录西山经入口', cp === 1, `on=${cp}`)
  await goto(cdp, '/', `document.querySelectorAll('dt').length>0?1:0`)
  const home = await evalOn(cdp, `(()=>{const dt=[...document.querySelectorAll('dt')].find(x=>x.textContent.includes('条目已核验'));return dt?dt.nextElementSibling.textContent.trim():null})()`)
  rec('A4 首页条目已核验=12', home === '12', `dd=${home}`)
  await goto(cdp, '/readings', `document.body.textContent.includes('羬')?1:0`)
  const rd = await evalOn(cdp, `document.body.textContent.includes('音針')||document.body.textContent.includes('音针')?1:0`)
  rec('A5 音表羬行(zhēn)', rd === 1, `on=${rd}`)

  await cdp.close()
} catch (e) { rec('EXCEPTION', false, String(e)) }

writeFileSync('dev/round89-results.json', JSON.stringify(results, null, 2), 'utf8')
const pass = results.filter(r => r.pass).length
console.log(`\n${pass}/${results.length} PASS`)
try { spawnSync('taskkill', ['/PID', String(chrome.pid), '/T', '/F'], { stdio: 'ignore' }) } catch {}
try { spawnSync('taskkill', ['/PID', String(preview.pid), '/T', '/F'], { stdio: 'ignore' }) } catch {}
rmSync(profile, { recursive: true, force: true })
process.exit(pass === results.length ? 0 : 1)
