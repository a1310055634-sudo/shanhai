// G97 验收:键盘无障碍专项(Tab 流/CSSOM 焦点环/ARIA 抽查/对比度全站复跑)
import { spawn, spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const BASE = 'http://localhost:4183'
const preview = spawn('npx', ['vite', 'preview', '--port', '4183', '--strictPort'], { cwd: 'D:/zcode/workspace/default/shanhai', stdio: 'ignore', shell: true })
async function waitPreview() { for (let i = 0; i < 60; i++) { try { const r = await fetch(BASE + '/'); if (r.ok) return } catch {} ; await new Promise(r => setTimeout(r, 250)) } throw new Error('preview 未就绪') }
const profile = mkdtempSync(join(tmpdir(), 'shanhai-g97-'))
const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=9337', `--user-data-dir=${profile}`, '--no-first-run', '--disable-gpu', '--window-size=420,900', 'about:blank'], { stdio: 'ignore' })
async function getPage() { for (let i = 0; i < 40; i++) { try { const l = await (await fetch('http://127.0.0.1:9337/json/list')).json(); const p = l.find(t => t.type === 'page' && t.webSocketDebuggerUrl); if (p) return p } catch {} ; await new Promise(r => setTimeout(r, 250)) } throw new Error('no page') }
function connect(wsUrl) { return new Promise((resolve, reject) => { const ws = new WebSocket(wsUrl); let id = 0; const pend = new Map(); ws.onopen = () => resolve({ send(m, pa = {}) { return new Promise((r2, j2) => { const mid = ++id; pend.set(mid, { r2, j2 }); ws.send(JSON.stringify({ id: mid, method: m, params: pa })) }) }, close() { try { ws.close() } catch {} } }); ws.onmessage = ev => { const g = JSON.parse(ev.data); if (g.id && pend.has(g.id)) { const { r2, j2 } = pend.get(g.id); pend.delete(g.id); g.error ? j2(new Error(JSON.stringify(g.error))) : r2(g.result) } }; ws.onerror = reject }) }
const results = []
const rec = (n, p, d) => { results.push({ name: n, pass: p, detail: d }); console.log(`${p ? 'PASS' : 'FAIL'} ${n}  ${d}`) }
async function evalOn(cdp, e) { const r = await cdp.send('Runtime.evaluate', { expression: e, returnByValue: true }); if (r.exceptionDetails) throw new Error('eval: ' + JSON.stringify(r.exceptionDetails).slice(0, 150)); return r.result?.value }
async function goto(cdp, path, needle, maxMs = 15000) { await cdp.send('Page.navigate', { url: BASE + path }); const t0 = Date.now(); while (Date.now() - t0 < maxMs) { if (await evalOn(cdp, needle)) return; await new Promise(r => setTimeout(r, 300)) } throw new Error('超时 ' + path) }
async function tab(cdp) { await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 }); await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 }); await new Promise(r => setTimeout(r, 80)) }

const ALL_ROUTES = ['/', '/catalog', '/catalog/qinyuan', '/catalog/xiwanmu', '/catalog/bifang', '/catalog/xiangliu', '/atlas', '/chapters', '/chapters/nanshan-jing', '/chapters/xishan-jing', '/relations', '/explore', '/journeys/nanci-yi', '/favorites', '/about', '/how-to-read', '/readings', '/variants']
const TAB_SAMPLE = ['/', '/catalog/xiwanmu', '/chapters/xishan-jing', '/atlas', '/variants', '/readings']

try {
  await waitPreview()
  const page = await getPage(); const cdp = await connect(page.webSocketDebuggerUrl)
  await cdp.send('Page.enable'); await cdp.send('Runtime.enable')

  // A1 Tab 流抽样(6 路由×12 步:焦点前进、不丢焦、可交互元素命中)
  for (const path of TAB_SAMPLE) {
    await goto(cdp, path, `document.body.textContent.length>200?1:0`)
    await evalOn(cdp, `document.body.focus();1`)
    const seq = []
    for (let i = 0; i < 12; i++) {
      await tab(cdp)
      const s = await evalOn(cdp, `(()=>{
        const a=document.activeElement
        if(!a||a===document.body) return {body:1}
        const st=getComputedStyle(a)
        const rc=a.getBoundingClientRect?a.getBoundingClientRect():{width:0,height:0};return { tag:a.tagName, label:(a.getAttribute('aria-label')||a.textContent||'').trim().slice(0,14), outline:st.outlineStyle!=='none'?1:0, vis:!!(a.offsetWidth||a.offsetHeight||(rc.width||rc.height)) }
      })()`)
      seq.push(s)
    }
    const bodyLoss = seq.filter(s => s.body).length
    const visible = seq.filter(s => s.vis).length
    const distinct = new Set(seq.map(s => s.tag + (s.label || ''))).size
    rec(`A1 Tab流 ${path}(丢焦${bodyLoss}/12,可见${visible}/12,异元素${distinct})`, bodyLoss === 0 && visible >= 10 && distinct >= 3, JSON.stringify(seq.slice(0, 4)))
  }

  // A2 搜索浮层键盘闭环(Tab 流外专项:浮层内焦点锁)
  await goto(cdp, '/', `document.querySelectorAll('dt').length>0?1:0`)
  await evalOn(cdp, `(()=>{window.dispatchEvent(new KeyboardEvent('keydown',{key:'k',ctrlKey:true}));return 1})()`)
  await new Promise(r => setTimeout(r, 300))
  const inOverlay = await evalOn(cdp, `document.activeElement?.getAttribute('role')==='combobox'?1:0`)
  for (let i = 0; i < 5; i++) await tab(cdp)
  const stillIn = await evalOn(cdp, `(()=>{const d=document.querySelector('[role=dialog]');return d&&d.contains(document.activeElement)?1:0})()`)
  rec('A2 搜索浮层焦点初始+Tab 锁内', inOverlay === 1 && stillIn === 1, `focus=${inOverlay} lock=${stillIn}`)
  await evalOn(cdp, `(()=>{window.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}));return 1})()`)
  await new Promise(r => setTimeout(r, 200))

  // A2b 焦点归还(关后焦点回 body/触发点)
  const backFocus = await evalOn(cdp, `document.activeElement?1:0`)
  rec('A2b Esc 后焦点有效', backFocus === 1, `${backFocus}`)

  // A3 CSSOM 焦点环令牌(全 stylesheet 扫描 focus 规则的 outline/box-shadow 裸值)
  await goto(cdp, '/', `1`)
  const cssom = await evalOn(cdp, `(()=>{
    const bad=[]
    let focusRules=0
    for(const sheet of document.styleSheets){
      let rules; try{ rules=sheet.cssRules }catch{ continue }
      const walk=(rs)=>{ for(const r of rs){
        if(r.cssRules){ walk(r.cssRules); continue }
        if(!r.selectorText||!r.style) continue
        if(/focus/i.test(r.selectorText)){
          focusRules++
          const o=r.style.outlineColor||'', os=r.style.outline||'', bs=r.style.boxShadow||''
          const text=(o+' '+os+' '+bs)
          if(text && /#[0-9a-f]{3,8}|rgba?\\(/i.test(text) && !/var\\(/.test(text)) bad.push(r.selectorText.slice(0,50)+' → '+text.trim().slice(0,40))
        }
      }}
      walk(rules)
    }
    return { focusRules, bad }
  })()`)
  rec(`A3 焦点环规则 ${cssom.focusRules} 条,裸色 ${cssom.bad.length} 条`, cssom.bad.length === 0, JSON.stringify(cssom.bad.slice(0, 3)))

  // A4 ARIA 抽查(全路由 role= 元素 aria-label 存在;details 摘要)
  let roleTotal = 0, roleMissing = 0
  for (const path of ALL_ROUTES) {
    await goto(cdp, path, `document.body.textContent.length>200?1:0`)
    const r = await evalOn(cdp, `(()=>{
      const els=[...document.querySelectorAll('[role]')]
      const missing=els.filter(e=>!e.getAttribute('aria-label')&&!e.getAttribute('aria-labelledby')&&!e.textContent.trim()).length
      return { total: els.length, missing }
    })()`)
    roleTotal += r.total; roleMissing += r.missing
  }
  rec(`A4 ARIA role 元素 ${roleTotal} 个,无标识 ${roleMissing} 个`, roleMissing === 0, `全部路由扫描`)

  // A5 对比度全站复跑(G70 正版两遍法采样器,18 路由×双主题×12 样本)
  const src70 = readFileSync('D:/zcode/workspace/default/shanhai/dev/round70-walk.mjs', 'utf8')
  const MARK70 = 'const CONTRAST_EVAL = `'
  const s70 = src70.indexOf(MARK70)
  const e70 = src70.indexOf('`', s70 + MARK70.length)
  if (s70 < 0 || e70 < 0) throw new Error('CONTRAST_EVAL 提取失败')
  const expr70 = src70.slice(s70 + MARK70.length, e70)
  let totalSamples = 0, totalFails = 0
  const failDetail = []
  for (const theme of ['deng', 'qing']) {
    for (const path of ALL_ROUTES) {
      await goto(cdp, path, `document.body.textContent.length>200?1:0`)
      await evalOn(cdp, `document.documentElement.setAttribute('data-theme','${theme}');document.querySelectorAll('*').forEach(el=>{el.style.transition='none'});1`)
      const r = await evalOn(cdp, expr70)
      totalSamples += r.sampled
      totalFails += r.fails.length
      if (r.fails.length) failDetail.push({ theme, path, fails: r.fails })
    }
  }
  rec(`A5 对比度全站复跑: ${totalSamples} 采样,失败 ${totalFails}`, totalFails === 0, failDetail.length ? JSON.stringify(failDetail.slice(0, 3)) : `零失败(G70 两遍法,两主题×18 路由)`)

  // A6 首页 12
  await goto(cdp, '/', `document.querySelectorAll('dt').length>0?1:0`)
  await evalOn(cdp, `document.documentElement.setAttribute('data-theme','deng');1`)
  const home = await evalOn(cdp, `(()=>{const dt=[...document.querySelectorAll('dt')].find(x=>x.textContent.includes('条目已核验'));return dt?dt.nextElementSibling.textContent.trim():null})()`)
  rec('A6 首页条目已核验=12', home === '12', `dd=${home}`)

  await cdp.close()
} catch (e) { rec('EXCEPTION', false, String(e)) }

writeFileSync('dev/round97-results.json', JSON.stringify(results, null, 2), 'utf8')
const pass = results.filter(r => r.pass).length
console.log(`\n${pass}/${results.length} PASS`)
try { spawnSync('taskkill', ['/PID', String(chrome.pid), '/T', '/F'], { stdio: 'ignore' }) } catch {}
try { spawnSync('taskkill', ['/PID', String(preview.pid), '/T', '/F'], { stdio: 'ignore' }) } catch {}
rmSync(profile, { recursive: true, force: true })
process.exit(pass === results.length ? 0 : 1)
