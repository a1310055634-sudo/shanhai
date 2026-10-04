// G84 验收:16 山升 verified 后的页面实况断言(出货产物,vite preview 4183 自拉自清)
// A1 首页「条目已核验」=12(词条计数,五阶恒定) A2 Atlas 方印=33/节点=33
// A3 古卷 DistanceTable 不再出现「待核 · 不设站」 A4 changyou 词条「待考证」徽章仍在(词条未动)
import { spawn, spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const CDP_PORT = 9337
const PREVIEW_PORT = 4183
const BASE = `http://localhost:${PREVIEW_PORT}`

// —— 起 preview ——
const preview = spawn('npx', ['vite', 'preview', '--port', String(PREVIEW_PORT), '--strictPort'], {
  cwd: 'D:/zcode/workspace/default/shanhai', stdio: 'ignore', shell: true,
})
async function waitPreview() {
  for (let i = 0; i < 60; i++) {
    try { const r = await fetch(BASE + '/'); if (r.ok) return } catch {}
    await new Promise(r => setTimeout(r, 250))
  }
  throw new Error('preview 未就绪')
}

// —— 起 Chrome ——
const profile = mkdtempSync(join(tmpdir(), 'shanhai-g84-'))
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
function rec(name, pass, detail) { results.push({ name, pass, detail }); console.log(`${pass ? 'PASS' : 'FAIL'} ${name}  ${detail}`) }

async function evalOn(cdp, expr) {
  const r = await cdp.send('Runtime.evaluate', { expression: expr, returnByValue: true })
  return r.result?.value
}
async function goto(cdp, url, needleExpr, maxMs = 12000) {
  await cdp.send('Page.navigate', { url })
  const t0 = Date.now()
  while (Date.now() - t0 < maxMs) {
    const v = await evalOn(cdp, needleExpr)
    if (v) return
    await new Promise(r => setTimeout(r, 300))
  }
  throw new Error('页面关键计数轮询超时: ' + url)
}

try {
  await waitPreview()
  const page = await getPage()
  const cdp = await connect(page.webSocketDebuggerUrl)
  await cdp.send('Page.enable')
  await cdp.send('Runtime.enable')

  // A1 首页:条目已核验=12 + 画卷节点轮询
  await goto(cdp, BASE + '/', `(()=>{const dd=document.querySelector('dd');return document.body.textContent.length>200?1:0})()`)
  const home = await evalOn(cdp, `(()=>{
    const dts=[...document.querySelectorAll('dt')]
    const dt=dts.find(x=>x.textContent.includes('条目已核验'))
    return { verified: dt? dt.nextElementSibling?.textContent.trim() : null }
  })()`)
  rec('A1 首页条目已核验=12', home.verified === '12', `dd=${home.verified}`)

  // A2 Atlas:方印 33/节点 33
  await goto(cdp, BASE + '/atlas', `document.querySelectorAll('svg rect.nodeDot, svg [class*="nodeDot"]').length>=30?1:(document.querySelectorAll('svg rect').length>20?1:0)`)
  const atlas = await evalOn(cdp, `(()=>{
    const dots=[...document.querySelectorAll('svg rect')].filter(r=>(r.getAttribute('class')||'').includes('nodeDot')||getComputedStyle(r).fill.includes('167, 71, 56'))
    const labels=[...document.querySelectorAll('svg [role="button"]')]
    const dashed=[...document.querySelectorAll('svg circle')].filter(c=>c.getAttribute('stroke-dasharray'))
    return { seals: dots.length, labels: labels.length, dashed: dashed.length }
  })()`)
  rec('A2a Atlas 方印=33', atlas.seals === 33, `seals=${atlas.seals}`)
  rec('A2b Atlas 节点=33', atlas.labels === 33, `role=button 节点=${atlas.labels}`)
  rec('A2c Atlas 虚线圈=0(图例示例除外)', atlas.dashed <= 1, `dashCircle=${atlas.dashed}`)

  // A3 古卷南山经:DistanceTable 零「待核 · 不设站」+ 16 行徽章态
  await goto(cdp, BASE + '/chapters/nanshan-jing', `document.body.textContent.includes('行旅第')||document.body.textContent.includes('图鉴有载')?1:0`)
  const ch = await evalOn(cdp, `(()=>{
    const t=document.body.textContent
    return { pendingBadge: (t.match(/待核 · 不设站/g)||[]).length, loaded: (t.match(/图鉴有载/g)||[]).length, hasTable: t.includes('凡十七山')||t.includes('七千二百里') }
  })()`)
  rec('A3a 里距表「待核·不设站」=1(柢山既有一经缺口,非二经)', ch.pendingBadge === 1, `count=${ch.pendingBadge}`)
  rec('A3b 里距表「图鉴有载」≥16', ch.loaded >= 16, `count=${ch.loaded}`)
  rec('A3c 篇末总述在屏', !!ch.hasTable, `has=${ch.hasTable}`)

  // A4 词条 changyou:徽章仍在(词条未动)
  await goto(cdp, BASE + '/catalog/changyou', `document.body.textContent.includes('待考证')?1:0`)
  const ent = await evalOn(cdp, `({badge: document.body.textContent.includes('异兽 · 待考证')||document.body.textContent.includes('待考证')})`)
  rec('A4 changyou 词条待考证徽章在', !!ent.badge, `badge=${ent.badge}`)

  await cdp.close()
} catch (e) {
  rec('EXCEPTION', false, String(e))
}

writeFileSync('dev/round84-results.json', JSON.stringify(results, null, 2), 'utf8')
const pass = results.filter(r => r.pass).length
console.log(`\n${pass}/${results.length} PASS`)
// 清理自拉进程(不碰 4173/其它进程)
try { spawnSync('taskkill', ['/PID', String(chrome.pid), '/T', '/F'], { stdio: 'ignore' }) } catch {}
try { spawnSync('taskkill', ['/PID', String(preview.pid), '/T', '/F'], { stdio: 'ignore' }) } catch {}
rmSync(profile, { recursive: true, force: true })
process.exit(pass === results.length ? 0 : 1)
