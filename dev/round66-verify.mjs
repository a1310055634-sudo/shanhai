// G66 验收:纸卡翻转 —— 卡面色值两主题断言 + 卡内文字对比度 + 三视口零溢出 + 新增行零裸色
import { spawn, execSync } from 'node:child_process'
import { writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PORT = 9357
const BASE = 'http://localhost:4173'
const OUT = 'D:/zcode/workspace/default/shanhai/dev/'

// A1:新增 CSS 行零裸色(EntityCard + home 五件,git diff added 行)
const diffFiles = [
  'src/components/EntityCard.module.css',
  'src/components/home/AtlasPreview.module.css',
  'src/components/home/ChapterIndex.module.css',
  'src/components/home/TodayBeast.module.css',
  'src/components/home/ExplorePaths.module.css',
  'src/components/home/SourcePromise.module.css',
]
let bareAdded = 0
for (const f of diffFiles) {
  const d = execSync(`git diff -- ${f}`, { cwd: 'D:/zcode/workspace/default/shanhai', encoding: 'utf8' })
  for (const line of d.split('\n')) {
    if (line.startsWith('+') && !line.startsWith('+++') && /#[0-9a-fA-F]{3,8}\b|rgba?\(/.test(line)) {
      bareAdded += 1
      console.error('BARE ADDED', f, line.slice(0, 90))
    }
  }
}
console.log('BARE_ADDED', bareAdded)

const EVAL = `(() => {
  const q = (s) => document.querySelector(s)
  const qa = (s) => [...document.querySelectorAll(s)]
  const card = q('article[class*="card"]')
  const cs = card ? getComputedStyle(card) : null
  const name = card ? card.querySelector('[class*="nameRow"] [class*="name"]') : null
  const type = card ? card.querySelector('[class*="type"]') : null
  const meta = card ? card.querySelector('[class*="meta"]') : null
  const status = card ? card.querySelector('[class*="status"]') : null
  const lum = (r,g,b) => { const a=[r,g,b].map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)});return 0.2126*a[0]+0.7152*a[1]+0.0722*a[2] }
  const parse = (s) => { const m=s.match(/rgba?\\(([\\d.]+),\\s*([\\d.]+),\\s*([\\d.]+)(?:,\\s*([\\d.]+))?\\)/);return m?{r:+m[1],g:+m[2],b:+m[3],a:m[4]===undefined?1:+m[4]}:null }
  const cOn = (el, bg) => { const fg=parse(getComputedStyle(el).color);if(!fg)return null;const L1=lum(fg.r,fg.g,fg.b),L2=lum(bg.r,bg.g,bg.b);return +((Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05)).toFixed(2) }
  const cardBg = cs ? parse(cs.backgroundColor) : null
  return {
    cardCount: qa('article[class*="card"]').length,
    cardBg: cardBg ? cardBg.r + ',' + cardBg.g + ',' + cardBg.b : null,
    nameContrast: name && cardBg ? cOn(name, cardBg) : null,
    typeContrast: type && cardBg ? cOn(type, cardBg) : null,
    metaContrast: meta && cardBg ? cOn(meta, cardBg) : null,
    statusContrast: status && cardBg ? cOn(status, cardBg) : null,
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
    h1: !!q('h1'),
  }
})()`

const HOME_EVAL = `(() => ({
  h1: !!document.querySelector('h1'),
  journeyEntry: !!document.querySelector('[class*="journeyEntry"]'),
  scrollW: document.documentElement.scrollWidth,
  clientW: document.documentElement.clientWidth,
}))()`

function launch() {
  const profile = mkdtempSync(join(tmpdir(), 'shanhai-g66-'))
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

const THEME_BG = { deng: [244, 236, 223], qing: [247, 241, 227] } // --surface-paper 双主题实测近似值

const { child, profile } = launch()
const results = []
try {
  const target = await getTarget()
  const cdp = await connect(target.webSocketDebuggerUrl)
  await cdp.send('Page.enable')

  async function visit(path, w, h, theme, shot) {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 700 })
    await cdp.send('Page.navigate', { url: BASE + path })
    await sleep(2300)
    await cdp.send('Runtime.evaluate', { expression: `try{localStorage.setItem('shanhai-theme','${theme}')}catch(e){}; location.reload()`, awaitPromise: false })
    await sleep(2500)
    const isHome = path === '/'
    const r = await cdp.send('Runtime.evaluate', { expression: isHome ? HOME_EVAL : EVAL, returnByValue: true })
    const v = r.result.value
    let checks
    if (isHome) {
      checks = { h1: v.h1 === true, journeyEntry: v.journeyEntry === true, noOverflow: v.scrollW <= v.clientW + 1 }
    } else {
      const exp = THEME_BG[theme]
      const bgOk = v.cardBg ? v.cardBg.split(',').map(Number).every((n, i) => Math.abs(n - exp[i]) <= 6) : false
      const cOk = [v.nameContrast, v.typeContrast, v.metaContrast, v.statusContrast].filter((n) => n !== null).every((n) => n >= 4.5)
      checks = {
        cardPresent: v.cardCount > 0,
        bgOk,
        contrast: cOk,
        noOverflow: v.scrollW <= v.clientW + 1,
        h1: v.h1 === true,
      }
    }
    results.push({ path, w, theme, values: v, checks, pass: Object.values(checks).every(Boolean) })
    if (shot) {
      const s = await cdp.send('Page.captureScreenshot', { format: 'png' })
      writeFileSync(OUT + shot, Buffer.from(s.data, 'base64'))
    }
    console.log(path, `${w}`, theme, '=>', Object.values(checks).every(Boolean) ? 'PASS' : 'FAIL ' + JSON.stringify(checks), `(bg=${v.cardBg} c=${v.nameContrast}/${v.typeContrast}/${v.metaContrast}/${v.statusContrast} n=${v.cardCount})`)
  }

  await visit('/catalog', 1440, 900, 'deng', 'g66-catalog-deng-1440.png')
  await visit('/catalog', 1440, 900, 'qing', 'g66-catalog-qing-1440.png')
  await visit('/catalog', 390, 844, 'deng', 'g66-catalog-deng-390.png')
  await visit('/', 1440, 900, 'deng', 'g66-home-deng-1440.png')
  await visit('/', 768, 900, 'deng', null)
  await visit('/catalog', 768, 900, 'deng', null)
  cdp.close()
} finally {
  try { child.kill() } catch {}
  setTimeout(() => { try { rmSync(profile, { recursive: true, force: true }) } catch {} }, 1500)
}
writeFileSync(OUT + 'round66-results.json', JSON.stringify({ bareAdded, results }, null, 2))
const fails = results.filter((r) => !r.pass)
console.log('BARE_ADDED', bareAdded, '| TOTAL', results.length, 'FAIL', fails.length)
process.exitCode = fails.length || bareAdded ? 1 : 0
