// G61 验收:词条页古图×转描并陈 —— 断言+对比度+零溢出+截图
import { spawn } from 'node:child_process'
import { writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PORT = 9343
const BASE = 'http://localhost:4173'
const OUT = 'D:/zcode/workspace/default/shanhai/dev/'

const PAGES = [
  { slug: 'jiuweihu', scans: 1, editions: ['蒋应镐山海经(图)绘像 · 明崇祯刊本'], tag: true },
  { slug: 'lushu', scans: 2, editions: ['蒋应镐山海经(图)绘像 · 明崇祯刊本', '汪绂山海经存 · 清光绪二十一年石印本'], tag: true },
  { slug: 'huahuai', scans: 1, editions: ['蒋应镐山海经(图)绘像 · 明崇祯刊本'], tag: false },
  { slug: 'changyou', scans: 1, editions: ['蒋应镐山海经(图)绘像 · 明崇祯刊本'], tag: false },
  { slug: 'fenghuang', scans: 0, editions: [], tag: true },
  { slug: 'zhi', scans: 0, editions: [], tag: false },
]

const EVAL = `(() => {
  const q = (s) => document.querySelector(s)
  const qa = (s) => [...document.querySelectorAll(s)]
  const mounts = qa('[class*="classicMounts"] > figure')
  const scanImgs = mounts.map((f) => f.querySelector('img')).filter(Boolean)
  const caption = mounts.map((f) => { const c = f.querySelector('[class*="caption"]'); return c ? c.textContent : '' })
  const tag = q('[class*="artPanelTag"]')
  const lum = (r,g,b) => { const a=[r,g,b].map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)});return 0.2126*a[0]+0.7152*a[1]+0.0722*a[2] }
  const parse = (s) => { const m=s.match(/rgba?\\(([\\d.]+),\\s*([\\d.]+),\\s*([\\d.]+)(?:,\\s*([\\d.]+))?\\)/);return m?{r:+m[1],g:+m[2],b:+m[3],a:m[4]===undefined?1:+m[4]}:null }
  const effBg = (el) => { let e=el,cr={r:255,g:255,b:255,a:1};while(e&&e!==document.documentElement){const c=parse(getComputedStyle(e).backgroundColor);if(c&&c.a>0){if(c.a>=1)return c;const a=c.a;cr={r:Math.round(c.r*a+cr.r*(1-a)),g:Math.round(c.g*a+cr.g*(1-a)),b:Math.round(c.b*a+cr.b*(1-a)),a:1};}e=e.parentElement}return cr }
  const contrastOf = (el) => { const fg=parse(getComputedStyle(el).color);if(!fg)return null;const bg=effBg(el);const L1=lum(fg.r,fg.g,fg.b),L2=lum(bg.r,bg.g,bg.b);return +((Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05)).toFixed(2) }
  const interactiveInMounts = mounts.reduce((n,f)=>n+f.querySelectorAll('a,button,[tabindex]').length,0)
  return {
    h1: !!q('h1'),
    scanCount: scanImgs.length,
    lazy: scanImgs.every((i)=>i.getAttribute('loading')==='lazy'),
    whAttrs: scanImgs.every((i)=>i.getAttribute('width')&&i.getAttribute('height')),
    loaded: scanImgs.every((i)=>i.naturalWidth>0),
    captions: caption,
    tagText: tag ? tag.textContent : null,
    tagInteractiveFree: interactiveInMounts===0,
    captionContrast: mounts[0] ? contrastOf(mounts[0].querySelector('[class*="captionTitle"]')) : null,
    tagContrast: tag ? contrastOf(tag) : null,
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
    vw: innerWidth,
  }
})()`

function launch() {
  const profile = mkdtempSync(join(tmpdir(), 'shanhai-g61-'))
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

  async function visit(slug, w, h, theme, shot) {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 700 })
    await cdp.send('Page.navigate', { url: `${BASE}/catalog/${slug}` })
    await sleep(2400)
    await cdp.send('Runtime.evaluate', { expression: `try{localStorage.setItem('shanhai-theme','${theme}')}catch(e){}; location.reload()`, awaitPromise: false })
    await sleep(2600)
    const r = await cdp.send('Runtime.evaluate', { expression: EVAL, returnByValue: true })
    const v = r.result.value
    const checks = {
      h1: v.h1 === true,
      scanCount: v.scanCount === PAGES.find((p) => p.slug === slug).scans,
      lazyWhLoaded: v.lazy && v.whAttrs && v.loaded,
      editions: PAGES.find((p) => p.slug === slug).editions.every((e) => v.captions.some((c) => c.includes(e))),
      tag: PAGES.find((p) => p.slug === slug).tag ? v.tagText !== null && v.tagText.includes('站内转描 · 据古今图书集成') : v.tagText === null,
      noInteractiveInMounts: v.tagInteractiveFree,
      contrast: (v.captionContrast === null || v.captionContrast >= 4.5) && (v.tagContrast === null || v.tagContrast >= 4.5),
      noOverflow: v.scrollW <= v.clientW + 1,
    }
    results.push({ slug, w, h, theme, values: v, checks, pass: Object.values(checks).every(Boolean) })
    if (shot) {
      const s = await cdp.send('Page.captureScreenshot', { format: 'png' })
      writeFileSync(OUT + shot, Buffer.from(s.data, 'base64'))
    }
    console.log(slug, `${w}x${h}`, theme, '=>', Object.values(checks).every(Boolean) ? 'PASS' : 'FAIL ' + JSON.stringify(checks))
  }

  await visit('jiuweihu', 1440, 900, 'deng', 'g61-jiuweihu-deng-1440.png')
  await visit('jiuweihu', 1440, 900, 'qing', 'g61-jiuweihu-qing-1440.png')
  await visit('lushu', 1440, 900, 'deng', 'g61-lushu-deng-1440.png')
  await visit('lushu', 390, 844, 'deng', 'g61-lushu-deng-390.png')
  await visit('huahuai', 1440, 900, 'deng', null)
  await visit('changyou', 1440, 900, 'deng', null)
  await visit('jiuweihu', 390, 844, 'deng', 'g61-jiuweihu-deng-390.png')
  await visit('fenghuang', 1440, 900, 'deng', null)
  await visit('zhi', 1440, 900, 'deng', null)
  cdp.close()
} finally {
  try { child.kill() } catch {}
  setTimeout(() => { try { rmSync(profile, { recursive: true, force: true }) } catch {} }, 1500)
}
writeFileSync(OUT + 'round61-results.json', JSON.stringify(results, null, 2))
const fails = results.filter((r) => !r.pass)
console.log('TOTAL', results.length, 'FAIL', fails.length)
process.exitCode = fails.length ? 1 : 0
