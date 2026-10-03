// G65 验收:长卷装裱补全 —— 引首题签/跋尾印/裱边收头 + 对比度 + 零溢出 + 截图
import { spawn } from 'node:child_process'
import { writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PORT = 9355
const BASE = 'http://localhost:4173'
const OUT = 'D:/zcode/workspace/default/shanhai/dev/'

const EVAL = `(() => {
  const q = (s) => document.querySelector(s)
  const qa = (s) => [...document.querySelectorAll(s)]
  const wrap = q('nav[class*="railWrap"]')
  const tag = q('[class*="frontTag"]')
  const colo = q('[class*="endColophon"]')
  const seal = q('[class*="colophonSeal"]')
  const lum = (r,g,b) => { const a=[r,g,b].map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)});return 0.2126*a[0]+0.7152*a[1]+0.0722*a[2] }
  const parse = (s) => { const m=s.match(/rgba?\\(([\\d.]+),\\s*([\\d.]+),\\s*([\\d.]+)(?:,\\s*([\\d.]+))?\\)/);return m?{r:+m[1],g:+m[2],b:+m[3],a:m[4]===undefined?1:+m[4]}:null }
  const RE = /rgba?\\(([\\d.]+),\\s*([\\d.]+),\\s*([\\d.]+)(?:,\\s*([\\d.]+))?\\)/g
  const effBg = (el) => {
    // 两遍法:①由内向外收集半透明层(渐变取最不利最暗色标,G32 规则),直到首个不透明基底
    // ②以基底为底,按绘制序(外→内)逆序叠加半透明层——单遍白底初始化会把累积层丢掉(初跑假红根因)
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
      base = {
        r: Math.round(s.r * s.a + base.r * (1 - s.a)),
        g: Math.round(s.g * s.a + base.g * (1 - s.a)),
        b: Math.round(s.b * s.a + base.b * (1 - s.a)),
        a: 1,
      }
    }
    return base
  }
  const contrastOf = (el) => { const fg=parse(getComputedStyle(el).color);if(!fg)return null;const bg=effBg(el);const L1=lum(fg.r,fg.g,fg.b),L2=lum(bg.r,bg.g,bg.b);return +((Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05)).toFixed(2) }
  const cs = wrap ? getComputedStyle(wrap, '::before') : null
  const sealRect = seal ? seal.getBoundingClientRect() : null
  const rail = q('[class*="rail"]')
  const firstLink = rail ? rail.querySelector('a') : null
  // 题签/跋尾不遮站格:取首末站链接 rect,确认与签/跋矩形不相交(桌面档)
  const linkRects = rail ? [...rail.querySelectorAll('a,span[class*="railStop"]')].map((e) => e.getBoundingClientRect()) : []
  const rectHit = (a, b) => a && b && Math.min(a.right, b.right) - Math.max(a.left, b.left) > 2 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 2
  const tagCovers = tag && linkRects.some((r) => rectHit(tag.getBoundingClientRect(), r))
  const coloCovers = seal && linkRects.some((r) => rectHit(seal.getBoundingClientRect(), r))
  return {
    h1: !!q('h1'),
    tagText: tag ? tag.textContent : null,
    tagVertical: tag ? getComputedStyle(tag).writingMode : null,
    tagHidden: tag ? tag.getAttribute('aria-hidden') : null,
    coloHidden: colo ? colo.getAttribute('aria-hidden') : null,
    sealText: seal ? seal.textContent : null,
    sealSize: sealRect ? Math.round(sealRect.width) + 'x' + Math.round(sealRect.height) : null,
    sealContrast: seal ? contrastOf(seal) : null,
    coloContrast: colo ? contrastOf(q('[class*="colophonText"]')) : null,
    mountBar: cs ? cs.content + '|' + cs.backgroundColor : null,
    railLinks: rail ? rail.querySelectorAll('a').length : 0,
    tagCovers, coloCovers,
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
  }
})()`

function launch() {
  const profile = mkdtempSync(join(tmpdir(), 'shanhai-g65-'))
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
    await cdp.send('Page.navigate', { url: `${BASE}/journeys/nanci-yi` })
    await sleep(2300)
    await cdp.send('Runtime.evaluate', { expression: `try{localStorage.setItem('shanhai-theme','${theme}')}catch(e){}; location.reload()`, awaitPromise: false })
    await sleep(2500)
    const r = await cdp.send('Runtime.evaluate', { expression: EVAL, returnByValue: true })
    const v = r.result.value
    const desktop = w >= 700
    const checks = {
      h1: v.h1 === true,
      tag: v.tagText === '山海行旅' && v.tagHidden === 'true',
      colo: v.coloHidden === 'true' && v.sealText === '山海',
      sealSizeOk: v.sealSize === '28x28',
      vertical: desktop ? String(v.tagVertical).includes('vertical') : !String(v.tagVertical).includes('vertical'),
      noCover: desktop ? v.tagCovers === false && v.coloCovers === false : true,
      contrast: (v.sealContrast === null || v.sealContrast >= 4.5) && (v.coloContrast === null || v.coloContrast >= 4.5),
      mountBar: typeof v.mountBar === 'string' && v.mountBar.includes('49, 84, 90'),
      railLinks: v.railLinks === 8,
      noOverflow: v.scrollW <= v.clientW + 1,
    }
    results.push({ w, h, theme, values: v, checks, pass: Object.values(checks).every(Boolean) })
    if (shot) {
      const s = await cdp.send('Page.captureScreenshot', { format: 'png' })
      writeFileSync(OUT + shot, Buffer.from(s.data, 'base64'))
    }
    console.log(`${w}`, theme, '=>', Object.values(checks).every(Boolean) ? 'PASS' : 'FAIL ' + JSON.stringify(checks))
  }

  await visit(1440, 900, 'deng', 'g65-journey-deng-1440.png')
  await visit(1440, 900, 'qing', 'g65-journey-qing-1440.png')
  await visit(390, 844, 'deng', 'g65-journey-deng-390.png')
  cdp.close()
} finally {
  try { child.kill() } catch {}
  setTimeout(() => { try { rmSync(profile, { recursive: true, force: true }) } catch {} }, 1500)
}
writeFileSync(OUT + 'round65-results.json', JSON.stringify(results, null, 2))
const fails = results.filter((r) => !r.pass)
console.log('TOTAL', results.length, 'FAIL', fails.length)
process.exitCode = fails.length ? 1 : 0
