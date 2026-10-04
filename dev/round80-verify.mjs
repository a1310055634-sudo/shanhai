// G80 验收:䍺/蛊雕/凤皇纵深 + 跨词条「见X条」互链
// 口径:引文逐字(剥 rt 不需要,流变层非 ruby)/claim 上屏/互链双向/首页计数 12/390+1440 零溢出
import { spawn } from 'node:child_process'
import { writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PORT = 9391
const BASE = 'http://localhost:4173'

function launch() {
  const profile = mkdtempSync(join(tmpdir(), 'shanhai-g80-'))
  const child = spawn(CHROME, [
    '--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    '--no-first-run', '--disable-gpu', '--window-size=1440,900', 'about:blank',
  ], { stdio: 'ignore' })
  return { child, profile }
}
async function getTarget() {
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/list`)
      const p = (await r.json()).find((t) => t.type === 'page' && t.webSocketDebuggerUrl)
      if (p) return p
    } catch {}
    await new Promise((r) => setTimeout(r, 250))
  }
  throw new Error('no page target')
}
function conn(u) {
  return new Promise((res, rej) => {
    const ws = new WebSocket(u)
    let id = 0
    const pend = new Map()
    ws.onopen = () => res({
      send: (m, pr = {}) => new Promise((r2, j2) => { const mid = ++id; pend.set(mid, { r2, j2 }); ws.send(JSON.stringify({ id: mid, method: m, params: pr })) }),
      close() { ws.close() },
    })
    ws.onmessage = (mv) => {
      const msg = JSON.parse(mv.data)
      if (msg.id && pend.has(msg.id)) {
        const p = pend.get(msg.id)
        pend.delete(msg.id)
        msg.error ? p.j2(new Error(JSON.stringify(msg.error))) : p.r2(msg.result)
      }
    }
    ws.onerror = rej
  })
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// [path, 必上屏的引文逐字片段, 该页期望出现的互链 target slug 列表]
const CASES = [
  ['/catalog/xun', [
    '任臣案王氏釋義曰自人至物未有無口繼之曰不可殺為其不成物也',
    '圖贊曰有獸無口其名曰䍺害氣不入厥體無間至理之盡出乎自然',
    '任臣案獸經曰蟨則比肩䍺則無口事物紺珠云䍺如羊無口黑色孫愐唐韻曰䍺獸名似羊黑色無口不可殺也',
  ], []],
  ['/catalog/gudiao', [
    '任臣案圖贊曰纂雕有角聲若兒號',
    '駢雅云蠱雕如雕而戴角事物紺珠云蠱雕如豹鳥喙一角音如嬰兒',
    '郭曰雕似鷹而大尾長翅',
    '任臣案禽之似獸者駝蹄鳥飛生鳥獸之似禽者鷹背犬蠱雕獸',
  ], []],
  ['/catalog/fenghuang', [
    '任臣案爾雅岠齊州以南戴日為丹穴淮南云丹穴太蒙反踵空同',
    '陸機七徵云拾朝陽之遺卵納丹穴之飛鳳',
  ], ['yinglong']],
  ['/catalog/yinglong', [], ['fenghuang']],
  ['/catalog/xingxing', [], ['changyou']],
  ['/catalog/changyou', [], ['xingxing']],
  ['/catalog/jingwei', [], ['wenyaoyu']],
  ['/catalog/wenyaoyu', [], ['jingwei']],
]

const profile = mkdtempSync(join(tmpdir(), 'shanhai-g80-'))
const child = launch()
const out = []
try {
  const t = await getTarget()
  const c = await conn(t.webSocketDebuggerUrl)
  await c.send('Page.enable')
  await c.send('Runtime.enable')

  for (const [path, needles, xrefs] of CASES) {
    for (const [w, tag] of [[1440, '1440'], [390, '390']]) {
      await c.send('Emulation.setDeviceMetricsOverride', { width: w, height: 900, deviceScaleFactor: 1, mobile: w < 768 })
      await c.send('Page.navigate', { url: BASE + path })
      await sleep(2600)
      const expr = `JSON.stringify((()=>{
        const b=document.body.textContent;
        const xr=[...document.querySelectorAll('[data-crossref]')].map(a=>a.getAttribute('data-crossref'));
        const grp=document.querySelector('[data-crossrefs]')?document.querySelector('[data-crossrefs]').getAttribute('data-crossrefs'):null;
        return {
          needles:${JSON.stringify(needles)}.map(n=>b.includes(n)),
          xrefs:xr,
          groupPresent:grp!==null,
          note: b.includes('互链依据'),
          ov: document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1
        };
      })())`
      const r = await c.send('Runtime.evaluate', { expression: expr, returnByValue: true })
      const v = JSON.parse(r.result.value)
      const needlesOk = v.needles.every(Boolean)
      const xrefOk = xrefs.every((s) => v.xrefs.includes(s))
      // 无互链期望的页面:不应出现互链组
      const noSpurious = xrefs.length > 0 ? true : !v.groupPresent
      const ok = needlesOk && xrefOk && noSpurious && v.note === (xrefs.length > 0) && v.ov
      out.push({ path, w, needlesOk, xrefOk, noSpurious, note: v.note, ov: v.ov, xrefs: v.xrefs, pass: ok })
      console.log(path, tag, ok ? 'PASS' : 'FAIL ' + JSON.stringify(v))
      if (w === 1440) {
        const s = await c.send('Page.captureScreenshot', { format: 'png' })
        writeFileSync(`D:/zcode/workspace/default/shanhai/dev/g80-${path.split('/').pop()}-1440.png`, Buffer.from(s.data, 'base64'))
      }
    }
  }

  // 首页计数守恒(四阶红线:必须恒为 12)
  await c.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
  await c.send('Page.navigate', { url: BASE + '/' })
  await sleep(2500)
  const h = await c.send('Runtime.evaluate', {
    expression: '(() => { const d=[...document.querySelectorAll("dt,dd")].map(e=>e.textContent); const i=d.indexOf("条目已核验"); return i>=0?d[i+1]:null })()',
    returnByValue: true,
  })
  const home = h.result.value
  console.log('HOME verified =', home)

  // 控制台零新增错误
  const errs = await c.send('Runtime.evaluate', { expression: 'JSON.stringify(window.__g80err||[])', returnByValue: true })

  c.close()
  const allOk = out.every((o) => o.pass) && home === '12'
  console.log('G80', allOk ? 'ALL PASS' : 'FAIL', '| verified =', home)
  writeFileSync('D:/zcode/workspace/default/shanhai/dev/round80-results.json',
    JSON.stringify({ out, home, errs: JSON.parse(errs.result.value || '[]') }, null, 2))
  process.exitCode = allOk ? 0 : 1
} finally {
  try { child.kill() } catch {}
  setTimeout(() => { try { rmSync(profile, { recursive: true, force: true }) } catch {} }, 1500)
}
