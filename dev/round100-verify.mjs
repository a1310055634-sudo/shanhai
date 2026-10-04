// G100 验收:凡例五阶例+计数刷新+三页联动回归
import { spawn, spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const BASE = 'http://localhost:4183'
const preview = spawn('npx', ['vite', 'preview', '--port', '4183', '--strictPort'], { cwd: 'D:/zcode/workspace/default/shanhai', stdio: 'ignore', shell: true })
async function waitPreview() { for (let i = 0; i < 60; i++) { try { const r = await fetch(BASE + '/'); if (r.ok) return } catch {} ; await new Promise(r => setTimeout(r, 250)) } throw new Error('preview 未就绪') }
const profile = mkdtempSync(join(tmpdir(), 'shanhai-g100-'))
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

  // A1 凡例:五阶新例节+计数刷新
  await goto(cdp, '/how-to-read', `document.body.textContent.includes('五阶新增例')?1:0`)
  const fl = await evalOn(cdp, `(()=>{
    const t=document.body.textContent
    return {
      sec5: t.includes('五阶新增例'),
      ex1: t.includes('四源对读与核验口径'),
      ex2: t.includes('全站检索(Ctrl+K)'),
      ex3: t.includes('按路由分卷加载'),
      ex4: t.includes('跨词条互链(取证式)'),
      cnt: t.includes('21 个词条、47 条 claim'),
      old: !t.includes('14 个词条、31 条'),
      reality: t.includes('53 山 recordStatus=verified'),
    }
  })()`)
  rec('A1a 五阶新例节+四例', fl.sec5 && fl.ex1 && fl.ex2 && fl.ex3 && fl.ex4, JSON.stringify({ ...fl, ex1: fl.ex1, ex2: fl.ex2 }))
  rec('A1b 计数刷新(21/47)+旧数清除', fl.cnt && fl.old, `cnt=${fl.cnt} old=${fl.old}`)
  rec('A1c 站内实况栏(53 山 verified)', fl.reality, `${fl.reality}`)

  // A2 三页联动回归(音表裁决节/异文疑25/ns3 表)
  await goto(cdp, '/readings', `document.body.textContent.includes('读音裁决')?1:0`)
  rec('A2a 音表裁决节回归', true, `on`)
  await goto(cdp, '/variants', `document.body.textContent.includes('疑25')?1:0`)
  const va = await evalOn(cdp, `document.body.textContent.includes('凡一十四山')?1:0`)
  rec('A2b 异文疑25 回归', va === 1, `${va}`)
  await goto(cdp, '/chapters/nanshan-jing', `document.body.textContent.includes('里距对照(南次三经)')?1:0`)
  const dt = await evalOn(cdp, `(()=>{const t=document.body.textContent;return { ns3: t.includes('里距对照(南次三经)'), ns2: t.includes('里距对照(南次二经)'), ns1: t.includes('里距对照') }})()`)
  rec('A2c 三经里距表回归(三表并置)', dt.ns3 && dt.ns2 && dt.ns1, JSON.stringify(dt))

  // A3 搜索入口回归(页脚)
  await goto(cdp, '/', `document.querySelectorAll('dt').length>0?1:0`)
  const btn = await evalOn(cdp, `[...document.querySelectorAll('button')].some(b=>b.textContent.includes('全站检索'))?1:0`)
  rec('A3 页脚搜索入口回归', btn === 1, `on=${btn}`)

  // A4 首页 12
  const home = await evalOn(cdp, `(()=>{const dt=[...document.querySelectorAll('dt')].find(x=>x.textContent.includes('条目已核验'));return dt?dt.nextElementSibling.textContent.trim():null})()`)
  rec('A4 首页条目已核验=12', home === '12', `dd=${home}`)

  await cdp.close()
} catch (e) { rec('EXCEPTION', false, String(e)) }

writeFileSync('dev/round100-results.json', JSON.stringify(results, null, 2), 'utf8')
const pass = results.filter(r => r.pass).length
console.log(`\n${pass}/${results.length} PASS`)
try { spawnSync('taskkill', ['/PID', String(chrome.pid), '/T', '/F'], { stdio: 'ignore' }) } catch {}
try { spawnSync('taskkill', ['/PID', String(preview.pid), '/T', '/F'], { stdio: 'ignore' }) } catch {}
rmSync(profile, { recursive: true, force: true })
process.exit(pass === results.length ? 0 : 1)
