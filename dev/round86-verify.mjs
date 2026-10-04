// G86 验收:南次三经扩录一(天虞/禱過/發爽/旄山尾)
import { spawn, spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const BASE = 'http://localhost:4183'
const preview = spawn('npx', ['vite', 'preview', '--port', '4183', '--strictPort'], {
  cwd: 'D:/zcode/workspace/default/shanhai', stdio: 'ignore', shell: true,
})
async function waitPreview() {
  for (let i = 0; i < 60; i++) { try { const r = await fetch(BASE + '/'); if (r.ok) return } catch {} ; await new Promise(r => setTimeout(r, 250)) }
  throw new Error('preview 未就绪')
}
const profile = mkdtempSync(join(tmpdir(), 'shanhai-g86-'))
const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=9337', `--user-data-dir=${profile}`, '--no-first-run', '--disable-gpu', '--window-size=420,900', 'about:blank'], { stdio: 'ignore' })
async function getPage() {
  for (let i = 0; i < 40; i++) {
    try { const l = await (await fetch('http://127.0.0.1:9337/json/list')).json(); const p = l.find(t => t.type === 'page' && t.webSocketDebuggerUrl); if (p) return p } catch {}
    await new Promise(r => setTimeout(r, 250))
  }
  throw new Error('no page target')
}
function connect(wsUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl); let id = 0; const pending = new Map()
    ws.onopen = () => resolve({ send(m, pa = {}) { return new Promise((res2, rej2) => { const mid = ++id; pending.set(mid, { res2, rej2 }); ws.send(JSON.stringify({ id: mid, method: m, params: pa })) }) }, close() { try { ws.close() } catch {} } })
    ws.onmessage = ev => { const g = JSON.parse(ev.data); if (g.id && pending.has(g.id)) { const { res2, rej2 } = pending.get(g.id); pending.delete(g.id); g.error ? rej2(new Error(JSON.stringify(g.error))) : res2(g.result) } }
    ws.onerror = reject
  })
}
const results = []
const rec = (n, p, d) => { results.push({ name: n, pass: p, detail: d }); console.log(`${p ? 'PASS' : 'FAIL'} ${n}  ${d}`) }
async function evalOn(cdp, e) { const r = await cdp.send('Runtime.evaluate', { expression: e, returnByValue: true }); if (r.exceptionDetails) throw new Error('eval: ' + JSON.stringify(r.exceptionDetails).slice(0, 150)); return r.result?.value }
async function goto(cdp, path, needle, maxMs = 12000) {
  await cdp.send('Page.navigate', { url: BASE + path })
  const t0 = Date.now()
  while (Date.now() - t0 < maxMs) { if (await evalOn(cdp, needle)) return; await new Promise(r => setTimeout(r, 300)) }
  throw new Error('轮询超时 ' + path)
}

try {
  await waitPreview()
  const page = await getPage(); const cdp = await connect(page.webSocketDebuggerUrl)
  await cdp.send('Page.enable'); await cdp.send('Runtime.enable')

  // A1 古卷页:四新段逐字+白屏探针+gap 态
  await goto(cdp, '/chapters/nanshan-jing', `document.body.textContent.includes('天虞之山')?1:0`)
  const ch = await evalOn(cdp, `(()=>{
    const t=document.body.textContent
    // 剥 rt 取正文层(ruby 断言口径)
    const clone=document.body.cloneNode(true)
    clone.querySelectorAll('rt').forEach(x=>x.remove())
    const plain=clone.textContent
    return {
      alive: t.length>3000,
      tianyu: plain.includes('南次三经之首，曰天虞之山，其下多水，不可以上。'),
      daoguo: plain.includes('其名曰瞿如，其鸣自号也。泿水出焉') && plain.includes('食者不肿，可以已痔。'),
      fashuang: plain.includes('又东五百里，曰发爽之山，无草木，多水，多白猿。汎水出焉，而南流注于渤海。'),
      maoshan: plain.includes('又东四百里，至于旄山之尾，其南有谷，曰育遗，多怪鸟，凯风自是出。'),
      oldGapGone: !plain.includes('天虞之山、祷过之山段待录入'),
      newGap: plain.includes('非山之首、阳夹、灌湘'),
      yinRuby: t.includes('泿'),
    }
  })()`)
  rec('A1a 白屏探针(正文>3000 字符)', ch.alive, `len ok=${ch.alive}`)
  rec('A1b 天虞段逐字', ch.tianyu, `${ch.tianyu}`)
  rec('A1c 禱過段逐字(含泿水句)', ch.daoguo, `${ch.daoguo}`)
  rec('A1d 發爽段逐字(汎原形)', ch.fashuang, `${ch.fashuang}`)
  rec('A1e 旄山尾段逐字', ch.maoshan, `${ch.maoshan}`)
  rec('A1f 旧 gap 清/新 gap 在', ch.oldGapGone && ch.newGap, `old=${ch.oldGapGone} new=${ch.newGap}`)

  // A2 Atlas 双档
  for (const [w, h, tag] of [[1440, 900, '1440'], [390, 844, '390']]) {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: tag === '390' })
    await goto(cdp, '/atlas', `document.querySelectorAll('svg [role="button"]').length>=38?1:0`)
    const a = await evalOn(cdp, `(()=>{
      const dots=[...document.querySelectorAll('svg rect')].filter(r=>(r.getAttribute('class')||'').includes('nodeDot'))
      const texts=[...document.querySelectorAll('svg text')]
      let ov=0
      for(let i=0;i<texts.length;i++)for(let j=i+1;j<texts.length;j++){const a=texts[i].getBoundingClientRect(),b=texts[j].getBoundingClientRect();if(a.left<b.right&&b.left<a.right&&a.top<b.bottom&&b.top<a.bottom)ov++}
      return { dots: dots.length, texts: texts.length, ov }
    })()`)
    rec(`A2[${tag}] 方印=38`, a.dots === 38, `dots=${a.dots}`)
    rec(`A2[${tag}] 零重叠`, a.ov === 0, `texts=${a.texts} ov=${a.ov}`)
  }
  await cdp.send('Emulation.clearDeviceMetricsOverride')

  // A3 variants 疑18/19/20
  await goto(cdp, '/variants', `document.body.textContent.includes('疑18')?1:0`)
  const va = await evalOn(cdp, `(()=>{const t=document.body.textContent;return { d18:t.includes('白首'), d19:t.includes('發爽'), d20:t.includes('育遺'), n:t.match(/疑1[89]|疑20/g)?.length }})()`)
  rec('A3 疑18/19/20 上屏', va.d18 && va.d19 && va.d20 && va.n >= 3, JSON.stringify(va))

  // A4 首页 12 + A5 readings 泿行
  await goto(cdp, '/', `document.querySelectorAll('dt').length>0?1:0`)
  const home = await evalOn(cdp, `(()=>{const dt=[...document.querySelectorAll('dt')].find(x=>x.textContent.includes('条目已核验'));return dt?dt.nextElementSibling.textContent.trim():null})()`)
  rec('A4 首页条目已核验=12', home === '12', `dd=${home}`)
  await goto(cdp, '/readings', `document.body.textContent.includes('泿')?1:0`)
  const rd = await evalOn(cdp, `document.body.textContent.includes('音銀')||document.body.textContent.includes('音银')?1:0`)
  rec('A5 音表泿行(yín,郭注音銀)', rd === 1, `on=${rd}`)

  await cdp.close()
} catch (e) { rec('EXCEPTION', false, String(e)) }

writeFileSync('dev/round86-results.json', JSON.stringify(results, null, 2), 'utf8')
const pass = results.filter(r => r.pass).length
console.log(`\n${pass}/${results.length} PASS`)
try { spawnSync('taskkill', ['/PID', String(chrome.pid), '/T', '/F'], { stdio: 'ignore' }) } catch {}
try { spawnSync('taskkill', ['/PID', String(preview.pid), '/T', '/F'], { stdio: 'ignore' }) } catch {}
rmSync(profile, { recursive: true, force: true })
process.exit(pass === results.length ? 0 : 1)
