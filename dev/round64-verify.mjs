// G64 验收:地图古意化 —— 文本零重叠(两档)/印章两态计数/图例上屏/对比度/截图
import { spawn } from 'node:child_process'
import { writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PORT = 9353
const BASE = 'http://localhost:4173'
const OUT = 'D:/zcode/workspace/default/shanhai/dev/'

const EVAL = `(() => {
  const q = (s) => document.querySelector(s)
  const qa = (s) => [...document.querySelectorAll(s)]
  const svg = q('svg')
  const texts = qa('svg text')
  const rects = texts.map((t) => t.getBoundingClientRect())
  let overlaps = 0
  for (let i = 0; i < rects.length; i++) {
    for (let j = i + 1; j < rects.length; j++) {
      const a = rects[i], b = rects[j]
      const ix = Math.min(a.right, b.right) - Math.max(a.left, b.left)
      const iy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)
      if (ix > 1 && iy > 1) overlaps += 1
    }
  }
  const seals = qa('svg rect[fill="var(--cinnabar)"]').filter((r) => { const w = r.getAttribute('width'); return w === '12' })
  const rings = qa('svg circle[stroke-dasharray="3 2"]')
  const svgLegend = texts.some((t) => t.textContent.includes('朱砂方印 = 已核验'))
  const htmlLegend = qa('[class*="legendItem"]').map((e) => e.textContent)
  const lum = (r,g,b) => { const a=[r,g,b].map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)});return 0.2126*a[0]+0.7152*a[1]+0.0722*a[2] }
  const parse = (s) => { const m=s.match(/rgba?\\(([\\d.]+),\\s*([\\d.]+),\\s*([\\d.]+)(?:,\\s*([\\d.]+))?\\)/);return m?{r:+m[1],g:+m[2],b:+m[3],a:m[4]===undefined?1:+m[4]}:null }
  const effBg = (el) => { let e=el,cr={r:255,g:255,b:255,a:1};while(e&&e!==document.documentElement){const c=parse(getComputedStyle(e).backgroundColor);if(c&&c.a>0){if(c.a>=1)return c;const a=c.a;cr={r:Math.round(c.r*a+cr.r*(1-a)),g:Math.round(c.g*a+cr.g*(1-a)),b:Math.round(c.b*a+cr.b*(1-a)),a:1};}e=e.parentElement}return cr }
  const contrastOf = (el) => { const fg=parse(getComputedStyle(el).color);if(!fg)return null;const bg=effBg(el);const L1=lum(fg.r,fg.g,fg.b),L2=lum(bg.r,bg.g,bg.b);return +((Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05)).toFixed(2) }
  const legendEl = q('[class*="legendItem"]')
  return {
    h1: !!q('h1'),
    textCount: texts.length,
    overlaps,
    seals: seals.length,
    rings: rings.length,
    svgLegend,
    htmlLegendHasSeal: htmlLegend.some((t) => t.includes('朱砂方印')),
    htmlLegendHasRing: htmlLegend.some((t) => t.includes('虚线墨圈')),
    legendContrast: legendEl ? contrastOf(legendEl) : null,
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
  }
})()`

function launch() {
  const profile = mkdtempSync(join(tmpdir(), 'shanhai-g64-'))
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
    await cdp.send('Page.navigate', { url: `${BASE}/atlas` })
    await sleep(2300)
    await cdp.send('Runtime.evaluate', { expression: `try{localStorage.setItem('shanhai-theme','${theme}')}catch(e){}; location.reload()`, awaitPromise: false })
    await sleep(2600)
    const r = await cdp.send('Runtime.evaluate', { expression: EVAL, returnByValue: true })
    const v = r.result.value
    const checks = {
      h1: v.h1 === true,
      noTextOverlap: v.overlaps === 0,
      sealRingCounts: v.seals === 17 && v.rings === 6,
      legends: v.svgLegend === true && v.htmlLegendHasSeal === true && v.htmlLegendHasRing === true,
      contrast: v.legendContrast === null || v.legendContrast >= 4.5,
      noOverflow: v.scrollW <= v.clientW + 1,
    }
    results.push({ w, h, theme, values: v, checks, pass: Object.values(checks).every(Boolean) })
    if (shot) {
      const s = await cdp.send('Page.captureScreenshot', { format: 'png' })
      writeFileSync(OUT + shot, Buffer.from(s.data, 'base64'))
    }
    console.log(`${w}`, theme, '=>', Object.values(checks).every(Boolean) ? 'PASS' : 'FAIL ' + JSON.stringify(checks), `(texts=${v.textCount} seals=${v.seals} rings=${v.rings} contrast=${v.legendContrast})`)
  }

  await visit(1440, 900, 'deng', 'g64-atlas-deng-1440.png')
  await visit(1440, 900, 'qing', 'g64-atlas-qing-1440.png')
  await visit(390, 844, 'deng', 'g64-atlas-deng-390.png')
  cdp.close()
} finally {
  try { child.kill() } catch {}
  setTimeout(() => { try { rmSync(profile, { recursive: true, force: true }) } catch {} }, 1500)
}
writeFileSync(OUT + 'round64-results.json', JSON.stringify(results, null, 2))
const fails = results.filter((r) => !r.pass)
console.log('TOTAL', results.length, 'FAIL', fails.length)
process.exitCode = fails.length ? 1 : 0
