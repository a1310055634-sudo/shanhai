// G95 验收:全站搜索 Ctrl+K(双向计数/键盘全流程/对比度/溢出)
import { spawn, spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const BASE = 'http://localhost:4183'
const preview = spawn('npx', ['vite', 'preview', '--port', '4183', '--strictPort'], { cwd: 'D:/zcode/workspace/default/shanhai', stdio: 'ignore', shell: true })
async function waitPreview() { for (let i = 0; i < 60; i++) { try { const r = await fetch(BASE + '/'); if (r.ok) return } catch {} ; await new Promise(r => setTimeout(r, 250)) } throw new Error('preview 未就绪') }
const profile = mkdtempSync(join(tmpdir(), 'shanhai-g95-'))
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

  await goto(cdp, '/', `document.querySelectorAll('dt').length>0?1:0`)

  // A1 页脚入口打开
  await evalOn(cdp, `(()=>{const btn=[...document.querySelectorAll('button')].find(b=>b.textContent.includes('全站检索'));btn?.click();return btn?1:0})()`)
  let opened = await evalOn(cdp, `document.querySelector('[data-search-veil]')?1:0`)
  rec('A1a 页脚「全站检索」打开浮层', opened === 1, `open=${opened}`)

  // A2 输入「昆」分组计数双向断言
  await evalOn(cdp, `(()=>{const i=document.querySelector('[role="combobox"]');const st=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set;st.call(i,'昆');i.dispatchEvent(new Event('input',{bubbles:true}));return 1})()`)
  await new Promise(r => setTimeout(r, 300))
  const ui = await evalOn(cdp, `(()=>{
    const titles=[...document.querySelectorAll('[class*="groupTitle"]')].map(x=>x.textContent.trim())
    const opts=[...document.querySelectorAll('[role="option"]')].map(x=>x.textContent.trim())
    return { titles, opts: opts.length, sample: opts.slice(0,3) }
  })()`)
  // 数据源侧预计算(node 域)
  const fs = await import('node:fs')
  const loc = fs.readFileSync('D:/zcode/workspace/default/shanhai/src/data/locations.ts', 'utf8')
  const names = [...loc.matchAll(/canonicalName: '([^']+)'/g)].map(m => m[1])
  const expMountains = names.filter(n => n.includes('昆')).length
  rec('A2a 「昆」山川组=数据源预计算', JSON.stringify(ui.titles).includes(`山川 · ${expMountains}`), `UI=[${ui.titles.join(';')}] 期望山川=${expMountains}`)
  rec('A2b 昆仑之丘命中', ui.sample.some(s => s.includes('昆仑之丘')), JSON.stringify(ui.sample))

  // A3 词条组:「方」→毕方
  await evalOn(cdp, `(()=>{const i=document.querySelector('[role="combobox"]');const st=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set;st.call(i,'方');i.dispatchEvent(new Event('input',{bubbles:true}));return 1})()`)
  await new Promise(r => setTimeout(r, 300))
  const ui2 = await evalOn(cdp, `(()=>{
    const titles=[...document.querySelectorAll('[class*="groupTitle"]')].map(x=>x.textContent.trim())
    const opts=[...document.querySelectorAll('[role="option"]')].map(x=>x.textContent.trim())
    return { titles, sample: opts.slice(0,4) }
  })()`)
  rec('A3 「方」命中毕方(词条组)', ui2.sample.some(s => s.includes('毕方')), JSON.stringify(ui2))

  // A4 键盘:↓ 选 + Enter 跳转
  await evalOn(cdp, `(()=>{const i=document.querySelector('[role="combobox"]');const st=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set;st.call(i,'钦原');i.dispatchEvent(new Event('input',{bubbles:true}));return 1})()`)
  await new Promise(r => setTimeout(r, 300))
  // ↓ 到钦原(第一项即钦原?「钦原」命中词条组第一)
  await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowDown', code: 'ArrowDown', windowsVirtualKeyCode: 40 })
  await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'ArrowDown', code: 'ArrowDown', windowsVirtualKeyCode: 40 })
  await new Promise(r => setTimeout(r, 150))
  await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 })
  await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 })
  await new Promise(r => setTimeout(r, 1200))
  const nav = await evalOn(cdp, `location.pathname + '|' + document.body.textContent.slice(0,200).includes('钦原')`)
  rec('A4 Enter 跳转词条页', String(nav).includes('/catalog/qinyuan'), `${nav}`)

  // A5 Esc 关+Ctrl+K 开+焦点归还
  await evalOn(cdp, `(()=>{window.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}));return 1})()`)
  await new Promise(r => setTimeout(r, 200))
  const closed = await evalOn(cdp, `document.querySelector('[data-search-veil]')?0:1`)
  await evalOn(cdp, `(()=>{window.dispatchEvent(new KeyboardEvent('keydown',{key:'k',ctrlKey:true}));return 1})()`)
  await new Promise(r => setTimeout(r, 200))
  const reopened = await evalOn(cdp, `document.querySelector('[data-search-veil]')?1:0`)
  rec('A5 Esc 关/Ctrl+K 开', closed === 1 && reopened === 1, `closed=${closed} reopen=${reopened}`)

  // A6 对比度抽样(输入文字与分组标题 vs 面板底)
  const contrast = await evalOn(cdp, `(()=>{
    function lum(rgb){const m=rgb.match(/\\d+(\\.\\d+)?/g).map(Number);const f=v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)};return 0.2126*f(m[0])+0.7152*f(m[1])+0.0722*f(m[2])}
    function ratio(fg,bg){const l1=lum(fg),l2=lum(bg);return (Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05)}
    const input=document.querySelector('[role="combobox"]')
    const panel=document.querySelector('[role="dialog"]')
    const title=document.querySelector('[class*="groupTitle"]')
    if(!input||!panel) return {err:'no node'}
    const iC=getComputedStyle(input).color, pB=getComputedStyle(panel).backgroundColor, tC=title?getComputedStyle(title).color:null
    return { input: ratio(iC,pB).toFixed(2), title: tC?ratio(tC,pB).toFixed(2):null }
  })()`)
  rec('A6 对比度 input/title ≥4.5', Number(contrast.input) >= 4.5 && (!contrast.title || Number(contrast.title) >= 4.5), JSON.stringify(contrast))

  // A7 双视口零溢出(1440+390)
  for (const [w, h, tag] of [[1440, 900, '1440'], [390, 844, '390']]) {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: tag === '390' })
    await goto(cdp, '/', `document.querySelectorAll('dt').length>0?1:0`)
    await evalOn(cdp, `(()=>{window.dispatchEvent(new KeyboardEvent('keydown',{key:'k',ctrlKey:true}));return 1})()`)
    await evalOn(cdp, `(()=>{const i=document.querySelector('[class*="input"]');if(i){i.value='方';i.dispatchEvent(new Event('input',{bubbles:true}))}return 1})()`)
    await new Promise(r => setTimeout(r, 300))
    const ov = await evalOn(cdp, `document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1 ? 0 : 1`)
    rec(`A7[${tag}] 零溢出`, ov === 0, `ov=${ov}`)
  }
  await cdp.send('Emulation.clearDeviceMetricsOverride')

  // A8 首页 12
  await goto(cdp, '/', `document.querySelectorAll('dt').length>0?1:0`)
  const home = await evalOn(cdp, `(()=>{const dt=[...document.querySelectorAll('dt')].find(x=>x.textContent.includes('条目已核验'));return dt?dt.nextElementSibling.textContent.trim():null})()`)
  rec('A8 首页条目已核验=12', home === '12', `dd=${home}`)

  await cdp.close()
} catch (e) { rec('EXCEPTION', false, String(e)) }

writeFileSync('dev/round95-results.json', JSON.stringify(results, null, 2), 'utf8')
const pass = results.filter(r => r.pass).length
console.log(`\n${pass}/${results.length} PASS`)
try { spawnSync('taskkill', ['/PID', String(chrome.pid), '/T', '/F'], { stdio: 'ignore' }) } catch {}
try { spawnSync('taskkill', ['/PID', String(preview.pid), '/T', '/F'], { stdio: 'ignore' }) } catch {}
rmSync(profile, { recursive: true, force: true })
process.exit(pass === results.length ? 0 : 1)
