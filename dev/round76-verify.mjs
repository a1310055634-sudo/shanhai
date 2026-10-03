// G76 验收:凤皇郭注已在屏实证+图赞纵深 claim+丹穴关联+计数
import { spawn } from 'node:child_process'
import { writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PORT = 9379
const BASE = 'http://localhost:4173'
const OUT = 'D:/zcode/workspace/default/shanhai/dev/'

// A2 原文区零改动:fenghuang.ts 仅 laterReception/尾部追加,originalText 行零删改
const diff = execSync('git diff -U0 -- src/data/entities/fenghuang.ts', { cwd: 'D:/zcode/workspace/default/shanhai', encoding: 'utf8' })
const delOriginal = diff.split('\n').filter((l) => l.startsWith('-') && l.includes('originalText')).length
const delGuopu = diff.split('\n').filter((l) => l.startsWith('-') && (l.includes('漢時鳳鳥數出') || l.includes('guoPuNotes'))).length
console.log('FINGERPRINT delOriginal=', delOriginal, 'delGuopu=', delGuopu)

const EVAL = `(() => {
  const q = (s) => document.querySelector(s)
  const qa = (s) => [...document.querySelectorAll(s)]
  const b = document.body.textContent
  const details = qa('details')
  details.forEach((d) => { d.open = true })
  const allText = document.body.textContent
  const reception = qa('[class*="reception"], [class*="later"]').map((e) => e.textContent).join('|')
  return {
    h1: !!q('h1'),
    name: q('h1')?.textContent ?? null,
    guopuHan: details.length > 0 && (qa('details').map((d) => d.textContent).join('|')).includes('漢時鳳鳥數出，高五六尺，五采'),
    guopuGuangya: (qa('details').map((d) => d.textContent).join('|')).includes('《廣雅》云：鳳，雞頭、鷰頷、蛇頸、龜背、魚尾。雌曰凰，雄曰鳳'),
    zan1: allText.includes('鳳皇靈鳥') && allText.includes('八象其體') && allText.includes('五德其文'),
    zan2: allText.includes('鳳出丹穴'),
    danxueLink: b.includes('丹穴之山') || !!qa('a[href*="danxue"]').length,
    claimsArchive: allText.includes('yilei-leiju-juan99-feng') || allText.includes('艺文类聚') || allText.includes('藝文類聚'),
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
  }
})()`

function launch() {
  const profile = mkdtempSync(join(tmpdir(), 'shanhai-g76-'))
  const child = spawn(CHROME, [
    '--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    '--no-first-run', '--disable-gpu', '--window-size=1440,900', 'about:blank',
  ], { stdio: 'ignore' })
  return { child, profile }
}
async function getTarget() {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`)
      const page = (await res.json()).find((t) => t.type === 'page' && t.webSocketDebuggerUrl)
      if (page) return page
    } catch {}
    await new Promise((r) => setTimeout(r, 250))
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
      close() { ws.close() },
    })
    ws.onmessage = (m) => {
      const msg = JSON.parse(m.data)
      if (msg.id && pending.has(msg.id)) {
        const p = pending.get(msg.id)
        pending.delete(msg.id)
        msg.error ? p.rej2(new Error(JSON.stringify(msg.error))) : p.res2(msg.result)
      }
    }
    ws.onerror = reject
  })
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const { child, profile } = launch()
const out = { entity: null, home: null, pass: false }
try {
  const target = await getTarget()
  const cdp = await connect(target.webSocketDebuggerUrl)
  await cdp.send('Page.enable')

  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
  await cdp.send('Page.navigate', { url: BASE + '/catalog/fenghuang' })
  await sleep(2600)
  let r = await cdp.send('Runtime.evaluate', { expression: EVAL, returnByValue: true })
  const v = r.result.value
  const checks = {
    h1: v.h1 === true && v.name === '凤皇',
    guopuOnSite: v.guopuHan === true && v.guopuGuangya === true,
    zanClaims: v.zan1 === true && v.zan2 === true,
    danxue: v.danxueLink === true,
    noOverflow: v.scrollW <= v.clientW + 1,
  }
  out.entity = { values: v, checks }
  console.log('FENGHUANG', JSON.stringify(checks))
  const s = await cdp.send('Page.captureScreenshot', { format: 'png' })
  writeFileSync(OUT + 'g76-fenghuang-deng-1440.png', Buffer.from(s.data, 'base64'))

  await cdp.send('Page.navigate', { url: BASE + '/' })
  await sleep(2500)
  r = await cdp.send('Runtime.evaluate', { expression: `(() => { const dts=[...document.querySelectorAll('dt,dd')].map(e=>e.textContent); const i=dts.indexOf('条目已核验'); return i>=0?dts[i+1]:null })()`, returnByValue: true })
  out.home = { verified: r.result.value }
  console.log('HOME verified =', r.result.value)
  cdp.close()
} finally {
  try { child.kill() } catch {}
  setTimeout(() => { try { rmSync(profile, { recursive: true, force: true }) } catch {} }, 1500)
}
const allPass =
  Object.values(out.entity?.checks ?? {}).every(Boolean) &&
  delOriginal === 0 && delGuopu === 0 &&
  out.home?.verified === '12'
out.pass = allPass
out.fingerprint = { delOriginal, delGuopu }
writeFileSync(OUT + 'round76-results.json', JSON.stringify(out, null, 2))
console.log('G76', allPass ? 'ALL PASS' : 'FAIL')
process.exitCode = allPass ? 0 : 1
