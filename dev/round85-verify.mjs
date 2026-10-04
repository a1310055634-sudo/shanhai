// G85 验收:咸陰之山录山闭环(17/17)
// A1 古卷新段逐字+陈旧文案清偿 A2 Atlas 34 节点/方印 34/零重叠双档
// A3 DistanceTable 咸陰行+闭环文案+7110 A4 首页 12 A5 LineageMap 零重叠双档 A6 疑15 勘误上屏
import { spawn, spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const CDP_PORT = 9337
const BASE = 'http://localhost:4183'

const preview = spawn('npx', ['vite', 'preview', '--port', '4183', '--strictPort'], {
  cwd: 'D:/zcode/workspace/default/shanhai', stdio: 'ignore', shell: true,
})
async function waitPreview() {
  for (let i = 0; i < 60; i++) {
    try { const r = await fetch(BASE + '/'); if (r.ok) return } catch {}
    await new Promise(r => setTimeout(r, 250))
  }
  throw new Error('preview 未就绪')
}
const profile = mkdtempSync(join(tmpdir(), 'shanhai-g85-'))
const chrome = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${CDP_PORT}`, `--user-data-dir=${profile}`,
  '--no-first-run', '--disable-gpu', '--window-size=420,900', 'about:blank',
], { stdio: 'ignore' })

async function getPage() {
  for (let i = 0; i < 40; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json/list`)).json()
      const page = list.find(t => t.type === 'page' && t.webSocketDebuggerUrl)
      if (page) return page
    } catch {}
    await new Promise(r => setTimeout(r, 250))
  }
  throw new Error('no page target')
}
function connect(wsUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl)
    let id = 0
    const pending = new Map()
    ws.onopen = () => resolve({
      send(method, params = {}) {
        return new Promise((res2, rej2) => {
          const mid = ++id
          pending.set(mid, { res2, rej2 })
          ws.send(JSON.stringify({ id: mid, method, params }))
        })
      },
      close() { try { ws.close() } catch {} },
    })
    ws.onmessage = ev => {
      const msg = JSON.parse(ev.data)
      if (msg.id && pending.has(msg.id)) {
        const { res2, rej2 } = pending.get(msg.id)
        pending.delete(msg.id)
        msg.error ? rej2(new Error(JSON.stringify(msg.error))) : res2(msg.result)
      }
    }
    ws.onerror = reject
  })
}

const results = []
const rec = (name, pass, detail) => { results.push({ name, pass, detail }); console.log(`${pass ? 'PASS' : 'FAIL'} ${name}  ${detail}`) }
async function evalOn(cdp, expr) {
  const r = await cdp.send('Runtime.evaluate', { expression: expr, returnByValue: true })
  if (r.exceptionDetails) throw new Error('eval 异常: ' + JSON.stringify(r.exceptionDetails).slice(0, 200))
  return r.result?.value
}
async function goto(cdp, path, needle, maxMs = 12000) {
  await cdp.send('Page.navigate', { url: BASE + path })
  const t0 = Date.now()
  while (Date.now() - t0 < maxMs) {
    if (await evalOn(cdp, needle)) return
    await new Promise(r => setTimeout(r, 300))
  }
  throw new Error('轮询超时: ' + path)
}

try {
  await waitPreview()
  const page = await getPage()
  const cdp = await connect(page.webSocketDebuggerUrl)
  await cdp.send('Page.enable')
  await cdp.send('Runtime.enable')

  // A1 古卷页
  await goto(cdp, '/chapters/nanshan-jing', `document.body.textContent.includes('咸阴之山')?1:0`)
  const ch = await evalOn(cdp, `(()=>{
    const t=document.body.textContent
    return {
      seg: t.includes('又东五百里，曰咸阴之山，无草木，无水。'),
      gapGone: !t.includes('里距两源互异(B1「四百里」'),
      note17: t.includes('十七山已全录'),
      tongji: t.includes('凡十七山'),
    }
  })()`)
  rec('A1a 咸陰新段逐字上屏', ch.seg, JSON.stringify(ch))
  rec('A1b 旧 gap 悬置文案已清', ch.gapGone, `gapGone=${ch.gapGone}`)
  rec('A1c 篇末注 17/17 闭环文案', ch.note17 && ch.tongji, `note=${ch.note17} tongji=${ch.tongji}`)

  // A2 Atlas 双档:方印 34 + 零重叠
  for (const [w, h, tag] of [[1440, 900, '1440'], [390, 844, '390']]) {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: tag === '390' })
    await goto(cdp, '/atlas', `document.querySelectorAll('svg [role="button"]').length>=34?1:0`)
    const a = await evalOn(cdp, `(()=>{
      const dots=[...document.querySelectorAll('svg rect')].filter(r=>(r.getAttribute('class')||'').includes('nodeDot'))
      const texts=[...document.querySelectorAll('svg text')]
      let overlap=0
      for(let i=0;i<texts.length;i++)for(let j=i+1;j<texts.length;j++){
        const a=texts[i].getBoundingClientRect(),b=texts[j].getBoundingClientRect()
        if(a.left<b.right&&b.left<a.right&&a.top<b.bottom&&b.top<a.bottom)overlap++
      }
      return { dots: dots.length, texts: texts.length, overlap }
    })()`)
    rec(`A2[${tag}] 方印=34`, a.dots === 34, `dots=${a.dots}`)
    rec(`A2[${tag}] SVG 文本零重叠`, a.overlap === 0, `texts=${a.texts} overlap=${a.overlap}`)
  }
  await cdp.send('Emulation.clearDeviceMetricsOverride')

  // A3 DistanceTable(古卷页内;A2 结束后在 /atlas,须先导航回古卷页)
  await goto(cdp, '/chapters/nanshan-jing', `document.body.textContent.includes('咸阴之山')?1:0`)
  const dt = await evalOn(cdp, `(()=>{
    const t=document.body.textContent
    return { row: t.includes('咸阴之山') && t.includes('图鉴有载'), closed: t.includes('十七山已全录'), sum: t.includes('7110'), gap90: t.includes('90') }
  })()`)
  rec('A3a 里距表咸陰行在', dt.row, JSON.stringify(dt))
  rec('A3b 存疑区闭环态+7110', dt.closed && dt.sum, `closed=${dt.closed} sum=${dt.sum}`)

  // A4 首页
  await goto(cdp, '/', `document.querySelectorAll('dt').length>0?1:0`)
  const home = await evalOn(cdp, `(()=>{const dt=[...document.querySelectorAll('dt')].find(x=>x.textContent.includes('条目已核验'));return dt?dt.nextElementSibling.textContent.trim():null})()`)
  rec('A4 首页条目已核验=12', home === '12', `dd=${home}`)

  // A5 LineageMap 零重叠双档(RelationsPage)
  for (const [w, h, tag] of [[1440, 900, '1440'], [390, 844, '390']]) {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: tag === '390' })
    await goto(cdp, '/relations', `document.querySelectorAll('svg text').length>=50?1:0`)
    const lm = await evalOn(cdp, `(()=>{
      const texts=[...document.querySelectorAll('svg text')]
      let overlap=0
      for(let i=0;i<texts.length;i++)for(let j=i+1;j<texts.length;j++){
        const a=texts[i].getBoundingClientRect(),b=texts[j].getBoundingClientRect()
        if(a.left<b.right&&b.left<a.right&&a.top<b.bottom&&b.top<a.bottom)overlap++
      }
      return { texts: texts.length, overlap }
    })()`)
    rec(`A5[${tag}] LineageMap 零重叠`, lm.overlap === 0, `texts=${lm.texts} overlap=${lm.overlap}`)
  }
  await cdp.send('Emulation.clearDeviceMetricsOverride')

  // A6 variants 疑15 勘误
  await goto(cdp, '/variants', `document.body.textContent.includes('疑15')||document.body.textContent.includes('勘误')?1:0`)
  const va = await evalOn(cdp, `(()=>{
    const t=document.body.textContent
    return { erratum: t.includes('勘误定谳'), four: t.includes('四源'), gone: !t.includes('两源互异(四百里/五百里)') }
  })()`)
  rec('A6 疑15 勘误定谳上屏', va.erratum && va.four && va.gone, JSON.stringify(va))

  await cdp.close()
} catch (e) {
  rec('EXCEPTION', false, String(e))
}

writeFileSync('dev/round85-results.json', JSON.stringify(results, null, 2), 'utf8')
const pass = results.filter(r => r.pass).length
console.log(`\n${pass}/${results.length} PASS`)
try { spawnSync('taskkill', ['/PID', String(chrome.pid), '/T', '/F'], { stdio: 'ignore' }) } catch {}
try { spawnSync('taskkill', ['/PID', String(preview.pid), '/T', '/F'], { stdio: 'ignore' }) } catch {}
rmSync(profile, { recursive: true, force: true })
process.exit(pass === results.length ? 0 : 1)
