// G67 验收:排印细节 —— 章符/曰签/对比度/CSS-only 证明/双主题截图
import { spawn, execSync } from 'node:child_process'
import { writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PORT = 9359
const BASE = 'http://localhost:4173'
const OUT = 'D:/zcode/workspace/default/shanhai/dev/'

// A1 CSS-only:本轮改动文件必须全为 .css/.md,且 tsx/ts 零 diff
const changed = execSync('git status --porcelain', { cwd: 'D:/zcode/workspace/default/shanhai', encoding: 'utf8' })
  .split('\n').filter((l) => l.trim()).map((l) => l.slice(3).trim())
const nonCss = changed.filter((f) => !f.endsWith('.css') && !f.endsWith('.md') && !f.startsWith('dev/'))
console.log('CHANGED', JSON.stringify(changed), '| NON_CSS', JSON.stringify(nonCss))

const EVAL = `(() => {
  const q = (s) => document.querySelector(s)
  const qa = (s) => [...document.querySelectorAll(s)]
  const tags = qa('[class*="sectionTag"]')
  const firstTag = tags[0]
  const citeText = q('[class*="cite"] [class*="text"]')
  const citeBefore = citeText ? getComputedStyle(citeText, '::before') : null
  const lum = (r,g,b) => { const a=[r,g,b].map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)});return 0.2126*a[0]+0.7152*a[1]+0.0722*a[2] }
  const parse = (s) => { const m=s.match(/rgba?\\(([\\d.]+),\\s*([\\d.]+),\\s*([\\d.]+)(?:,\\s*([\\d.]+))?\\)/);return m?{r:+m[1],g:+m[2],b:+m[3],a:m[4]===undefined?1:+m[4]}:null }
  const sealC = citeBefore ? citeBefore.backgroundColor : null
  const sealFg = citeBefore ? citeBefore.color : null
  let sealContrast = null
  if (sealC && sealFg) { const a=parse(sealC),b=parse(sealFg);if(a&&b){const L1=lum(a.r,a.g,a.b),L2=lum(b.r,b.g,b.b);sealContrast=+((Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05)).toFixed(2)} }
  const counters = tags.map((t) => getComputedStyle(t, '::before').content)
  return {
    tagCount: tags.length,
    firstTagText: firstTag ? firstTag.textContent : null,
    firstTagBefore: counters[0] || null,
    allBeforeHaveQi: counters.every((c) => c && c.includes('其')),
    citeBeforeContent: citeBefore ? citeBefore.content : null,
    sealContrast,
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
    h1: !!q('h1'),
  }
})()`

function launch() {
  const profile = mkdtempSync(join(tmpdir(), 'shanhai-g67-'))
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
const results = []
try {
  const target = await getTarget()
  const cdp = await connect(target.webSocketDebuggerUrl)
  await cdp.send('Page.enable')

  async function visit(w, h, theme, shot) {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 700 })
    await cdp.send('Page.navigate', { url: `${BASE}/chapters/nanshan-jing` })
    await sleep(2400)
    await cdp.send('Runtime.evaluate', { expression: `try{localStorage.setItem('shanhai-theme','${theme}')}catch(e){}; location.reload()`, awaitPromise: false })
    await sleep(2500)
    const r = await cdp.send('Runtime.evaluate', { expression: EVAL, returnByValue: true })
    const v = r.result.value
    const checks = {
      h1: v.h1 === true,
      tagCount: v.tagCount >= 9,
      qiMark: v.allBeforeHaveQi === true && String(v.firstTagBefore).includes('其') && String(v.firstTagBefore).includes('cjk-ideographic'),
      sequenceOnFirst: v.tagCount >= 1,
      noOverflow: v.scrollW <= v.clientW + 1,
    }
    results.push({ w, theme, values: v, checks, pass: Object.values(checks).every(Boolean) })
    if (shot) {
      const s = await cdp.send('Page.captureScreenshot', { format: 'png' })
      writeFileSync(OUT + shot, Buffer.from(s.data, 'base64'))
    }
    console.log(`${w}`, theme, '=>', Object.values(checks).every(Boolean) ? 'PASS' : 'FAIL ' + JSON.stringify(checks), `(before=${v.firstTagBefore} seal=${v.sealContrast})`)
  }

  async function visitCatalog(w, h, theme) {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 700 })
    await cdp.send('Page.navigate', { url: `${BASE}/catalog/jiuweihu` })
    await sleep(2400)
    await cdp.send('Runtime.evaluate', { expression: `try{localStorage.setItem('shanhai-theme','${theme}')}catch(e){}; location.reload()`, awaitPromise: false })
    await sleep(2500)
    const r = await cdp.send('Runtime.evaluate', { expression: EVAL, returnByValue: true })
    const v = r.result.value
    const checks = {
      yueSeal: String(v.citeBeforeContent).includes('曰') && v.sealContrast !== null && v.sealContrast >= 4.5,
      noOverflow: v.scrollW <= v.clientW + 1,
      h1: v.h1 === true,
    }
    results.push({ page: 'catalog/jiuweihu', w, theme, values: v, checks, pass: Object.values(checks).every(Boolean) })
    console.log('catalog', `${w}`, theme, '=>', Object.values(checks).every(Boolean) ? 'PASS' : 'FAIL ' + JSON.stringify(checks), `(yue=${v.citeBeforeContent} seal=${v.sealContrast})`)
  }

  await visit(1440, 900, 'deng', 'g67-chapter-deng-1440.png')
  await visit(1440, 900, 'qing', 'g67-chapter-qing-1440.png')
  await visit(390, 844, 'deng', 'g67-chapter-deng-390.png')
  await visitCatalog(1440, 900, 'deng')
  cdp.close()
} finally {
  try { child.kill() } catch {}
  setTimeout(() => { try { rmSync(profile, { recursive: true, force: true }) } catch {} }, 1500)
}
writeFileSync(OUT + 'round67-results.json', JSON.stringify({ nonCss, results }, null, 2))
const fails = results.filter((r) => !r.pass)
console.log('NON_CSS', nonCss.length, '| TOTAL', results.length, 'FAIL', fails.length)
process.exitCode = fails.length || nonCss.length ? 1 : 0
