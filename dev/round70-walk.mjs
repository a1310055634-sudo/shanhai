// G70 美术线中期走查:14 路由双主题截图(GALLERY_ART4/)+对比度全站扫描+体积决算
import { spawn, execSync } from 'node:child_process'
import { writeFileSync, readFileSync, readdirSync, statSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PORT = 9365
const BASE = 'http://localhost:4173'
const REPO = 'D:/zcode/workspace/default/shanhai/'
const ART4 = REPO + 'GALLERY_ART4/'
mkdirSync(ART4, { recursive: true })

const ROUTES = [
  '/', '/catalog', '/catalog/jiuweihu', '/atlas', '/chapters', '/chapters/nanshan-jing',
  '/relations', '/explore', '/journeys/nanci-yi', '/favorites', '/about',
  '/how-to-read', '/readings', '/variants',
]

function launch() {
  const profile = mkdtempSync(join(tmpdir(), 'shanhai-g70-'))
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

// 对比度采样:可见无子元素文本节点,两遍法有效底(G68 升级版),阈值 4.5
const CONTRAST_EVAL = `(() => {
  const lum = (r,g,b) => { const a=[r,g,b].map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)});return 0.2126*a[0]+0.7152*a[1]+0.0722*a[2] }
  const parse = (s) => { const m=s.match(/rgba?\\(([\\d.]+),\\s*([\\d.]+),\\s*([\\d.]+)(?:,\\s*([\\d.]+))?\\)/);return m?{r:+m[1],g:+m[2],b:+m[3],a:m[4]===undefined?1:+m[4]}:null }
  const RE = /rgba?\\(([\\d.]+),\\s*([\\d.]+),\\s*([\\d.]+)(?:,\\s*([\\d.]+))?\\)/g
  const effBg = (el) => {
    const layers = []
    let e = el
    let base = null
    while (e && e !== document.documentElement) {
      const cs = getComputedStyle(e)
      let c = cs.backgroundColor !== 'transparent' ? parse(cs.backgroundColor) : null
      const bi = cs.backgroundImage
      if (bi && bi !== 'none') {
        RE.lastIndex = 0
        let best = null
        for (const m of bi.matchAll(RE)) {
          const cc = { r: +m[1], g: +m[2], b: +m[3], a: m[4] === undefined ? 1 : +m[4] }
          if (!best || cc.r + cc.g + cc.b < best.r + best.g + best.b) best = cc
        }
        if (best) c = best
      }
      if (c) {
        if (c.a >= 1) { base = c; break }
        if (c.a > 0) layers.push(c)
      }
      e = e.parentElement
    }
    if (!base) base = { r: 255, g: 255, b: 255, a: 1 }
    for (let i = layers.length - 1; i >= 0; i--) {
      const s = layers[i]
      base = { r: Math.round(s.r*s.a + base.r*(1-s.a)), g: Math.round(s.g*s.a + base.g*(1-s.a)), b: Math.round(s.b*s.a + base.b*(1-s.a)), a: 1 }
    }
    return base
  }
  const els = [...document.querySelectorAll('h1,h2,h3,p,a,button,li,dt,dd,summary')]
    .filter((el) => el.childElementCount === 0 && el.textContent.trim().length > 1)
  const seen = new Set()
  const samples = []
  for (const el of els) {
    const r = el.getBoundingClientRect()
    if (r.width < 4 || r.height < 4) continue
    const key = el.tagName + ':' + el.textContent.trim().slice(0, 20)
    if (seen.has(key)) continue
    seen.add(key)
    samples.push(el)
    if (samples.length >= 12) break
  }
  const fails = []
  for (const el of samples) {
    const fg = parse(getComputedStyle(el).color)
    if (!fg) continue
    const bg = effBg(el)
    const L1 = lum(fg.r, fg.g, fg.b), L2 = lum(bg.r, bg.g, bg.b)
    const c = +((Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)).toFixed(2)
    if (c < 4.5) fails.push({ tag: el.tagName, text: el.textContent.trim().slice(0, 24), c })
  }
  return { sampled: samples.length, fails }
})()`

const { child, profile } = launch()
const results = []
try {
  const target = await getTarget()
  const cdp = await connect(target.webSocketDebuggerUrl)
  await cdp.send('Page.enable')

  const slugName = (p) => (p === '/' ? 'home' : p.replaceAll('/', '_').replace(/^_/, ''))
let idx = 0
  for (const route of ROUTES) {
    idx += 1
    const name = slugName(route)
    for (const [w, h, theme, vp] of [[1440, 900, 'deng', '1440'], [1440, 900, 'qing', '1440'], [390, 844, 'deng', '390']]) {
      await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 700 })
      await cdp.send('Page.navigate', { url: BASE + route })
      await sleep(2200)
      await cdp.send('Runtime.evaluate', { expression: `try{localStorage.setItem('shanhai-theme','${theme}')}catch(e){}; location.reload()`, awaitPromise: false })
      await sleep(2200)
      const shot = await cdp.send('Page.captureScreenshot', { format: 'png' })
      writeFileSync(join(ART4, `${String(idx).padStart(2, '0')}-${name}-${theme}-${vp}.png`), Buffer.from(shot.data, 'base64'))
      if (vp === '1440') {
        const r = await cdp.send('Runtime.evaluate', { expression: CONTRAST_EVAL, returnByValue: true })
        const v = r.result.value
        results.push({ route, theme, sampled: v.sampled, fails: v.fails, pass: v.fails.length === 0 })
        console.log(route, theme, 'contrast', v.sampled, 'samples, fails:', v.fails.length, v.fails.length ? JSON.stringify(v.fails) : '')
      }
    }
  }
  cdp.close()
} finally {
  try { child.kill() } catch {}
  setTimeout(() => { try { rmSync(profile, { recursive: true, force: true }) } catch {} }, 1500)
}

// 体积决算
const distAssets = REPO + 'dist/assets/'
let jpg = 0
for (const f of readdirSync(distAssets)) if (/\.(jpg|png|webp|svg)$/i.test(f)) jpg += statSync(distAssets + f).size
const jsFile = readdirSync(distAssets).find((f) => f.endsWith('.js'))
const cssFile = readdirSync(distAssets).find((f) => f.endsWith('.css'))
const jsKB = (statSync(distAssets + jsFile).size / 1024).toFixed(2)
const cssKB = (statSync(distAssets + cssFile).size / 1024).toFixed(2)
const jsGz = Number(execSync(`gzip -c "${distAssets}${jsFile}" | wc -c`).toString().trim())
const cssGz = Number(execSync(`gzip -c "${distAssets}${cssFile}" | wc -c`).toString().trim())
const volume = {
  js: { rawKB: jsKB, gzipKB: (jsGz / 1024).toFixed(2) },
  css: { rawKB: cssKB, gzipKB: (cssGz / 1024).toFixed(2) },
  imagesBytes: jpg,
  baseline: { js: '577.10/179.99', css: '123.24/21.73', paintings: 1065665 },
}
console.log('VOLUME', JSON.stringify(volume))
writeFileSync(REPO + 'dev/round70-results.json', JSON.stringify({ results, volume, shots: ROUTES.length * 3 }, null, 2))
const fails = results.filter((r) => !r.pass)
console.log('ROUTES', results.length, 'CONTRAST_FAIL_ROUTES', fails.length)
process.exitCode = fails.length ? 1 : 0
