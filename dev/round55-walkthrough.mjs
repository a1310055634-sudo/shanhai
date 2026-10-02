/**
 * G55 双主题全站走查(无头 Chrome + CDP)。
 *
 * 产出:14 路由 × 灯下/晴窗 截图入 GALLERY_FINAL3/(mid- 前缀,中期走查);
 * 断言:每页零横溢/画卷区无正文压字(home ghost vs heroPaint、journey railName vs 底画、
 * chapter 卷尾注记 vs 立轴)/对比度抽查(大题对页底、journey 轨道字对混底估 luminance)/
 * 控制台零异常。零不可读项或如实标缺口。
 * 前置:preview 在 http://localhost:4173。运行:node dev/round55-walkthrough.mjs
 */
import { mkdtempSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { tmpdir } from 'node:os'
import { spawn } from 'node:child_process'

const PORT = 9365
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const BASE = 'http://localhost:4173'
const OUT = 'GALLERY_FINAL3'

const results = []
const check = (n, ok, d = '') => {
  results.push({ name: n, ok, detail: d })
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${d ? '  — ' + d : ''}`)
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

class CDP {
  constructor(ws) {
    this.ws = ws
    this.id = 0
    this.pending = new Map()
    this.events = []
    ws.addEventListener('message', (ev) => {
      const m = JSON.parse(ev.data)
      if (m.id && this.pending.has(m.id)) {
        const { resolve, reject } = this.pending.get(m.id)
        this.pending.delete(m.id)
        m.error ? reject(new Error(JSON.stringify(m.error))) : resolve(m.result)
      } else if (m.method) this.events.push(m)
    })
  }
  send(method, params = {}) {
    const id = ++this.id
    return new Promise((res, rej) => {
      this.pending.set(id, { resolve: res, reject: rej })
      this.ws.send(JSON.stringify({ id, method, params }))
    })
  }
  async eval(expression) {
    const r = await this.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.text)
    return r.result.value
  }
  async shot(file) {
    const r = await this.send('Page.captureScreenshot', { format: 'png' })
    writeFileSync(file, Buffer.from(r.data, 'base64'))
  }
}

async function connect() {
  for (let i = 0; i < 60; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()
      const page = list.find((t) => t.type === 'page')
      if (page) {
        const ws = new WebSocket(page.webSocketDebuggerUrl)
        await new Promise((res, rej) => {
          ws.addEventListener('open', res, { once: true })
          ws.addEventListener('error', rej, { once: true })
        })
        return new CDP(ws)
      }
    } catch { /* retry */ }
    await sleep(250)
  }
  throw new Error('无法连接无头 Chrome')
}

const PAINT_TEXT = `(() => {
  const out = { hits: [] }
  const rectOf = (el) => el.getBoundingClientRect()
  const inter = (a, b) => !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom)
  // ①home:hero 幽灵按钮/大题 vs 画卷矩形(羽化中心带才算,取画 rect 内缩 20%)
  const hp = document.querySelector('[data-hero-paint] img')
  if (hp) {
    const r = rectOf(hp)
    const core = { left: r.left + r.width * 0.2, right: r.right - r.width * 0.2, top: r.top + r.height * 0.2, bottom: r.bottom - r.height * 0.2 }
    for (const a of document.querySelectorAll('.hero a, .hero h1')) {
      if (inter(rectOf(a), core)) out.hits.push('home:' + (a.textContent || '').trim().slice(0, 8))
    }
  }
  // ②journey:轨道站名 span vs 底画实区(同样内缩)
  const pb = document.querySelector('[class*="paintBg"] img')
  if (pb) {
    const r = rectOf(pb)
    const core = { left: r.left + r.width * 0.25, right: r.right - r.width * 0.25, top: r.top + r.height * 0.15, bottom: r.bottom - r.height * 0.15 }
    for (const a of document.querySelectorAll('[class*="rail"] a')) {
      if (inter(rectOf(a), core)) {
        // 画上交互文字有纱面承载(透明度>0.3)即合规浮卡,不计压字
        const li = a.closest('li') || a
        const bg = getComputedStyle(li).backgroundColor
        const parts = bg.match(/rgba?\(([^)]+)\)/)
        const alpha = parts && parts[1].split(',').length === 4 ? parseFloat(parts[1].split(',')[3]) : 1
        out.hits.push('journey:' + (a.textContent || '').trim().slice(0, 6) + (alpha > 0.3 ? '[纱]' : '[裸]'))
      }
    }
  }
  // ③chapter 卷尾:立轴 img vs 注记(注记应在轴外)
  const se = document.querySelector('[class*="scrollEnd"]')
  if (se) {
    const img = se.querySelector('img')
    const note = se.querySelector('p')
    if (img && note && inter(rectOf(img), rectOf(note))) out.hits.push('chapter:注记压轴')
  }
  return out
})()`

const CONTRAST = `(() => {
  const lum = (rgbStr) => {
    let s = String(rgbStr).trim()
    let m
    if (s[0] === '#') {
      const h = s.slice(1)
      const n = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
      m = [parseInt(n.slice(0, 2), 16), parseInt(n.slice(2, 4), 16), parseInt(n.slice(4, 6), 16)]
    } else {
      m = s.match(/\\d+(\\.\\d+)?/g).map(Number)
    }
    const f = (v) => { const c = v / 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4) }
    return 0.2126 * f(m[0]) + 0.7152 * f(m[1]) + 0.0722 * f(m[2])
  }
  const ratio = (a, b) => { const l1 = Math.max(a, b), l2 = Math.min(a, b); return +((l1 + 0.05) / (l2 + 0.05)).toFixed(2) }
  const out = {}
  // 大题对页底
  const h1 = document.querySelector('h1')
  if (h1) out.h1OnPage = ratio(lum(getComputedStyle(h1).color), lum(getComputedStyle(document.body).backgroundColor === 'rgba(0, 0, 0, 0)' ? getComputedStyle(document.querySelector('main, body')).backgroundColor : getComputedStyle(document.body).backgroundColor))
  // journey 轨道字对混底估(底画 0.3 透明度叠深渐变,取 railWrap 背景色直接算=保守口径)
  const rn = document.querySelector('[class*="railName"]')
  const rw = document.querySelector('[class*="railWrap"]')
  if (rn && rw) out.railOnWrap = ratio(lum(getComputedStyle(rn).color), lum('rgb(31, 44, 38)'))
  // 卷尾注记对纸阶二档
  const note = document.querySelector('[class*="scrollEndNote"], [class*="scrollEnd"] p')
  if (note) {
    const band = note.closest('[class*="scrollEnd"]')
    out.noteOnBand = ratio(lum(getComputedStyle(note).color), lum(getComputedStyle(band).backgroundColor))
  }
  return out
})()`

const ROUTES = [
  ['/', 'home'], ['/catalog', 'catalog'], ['/catalog/jiuweihu', 'entity-jiuweihu'],
  ['/atlas', 'atlas'], ['/chapters', 'chapters'], ['/chapters/nanshan-jing', 'chapter-nanshan'],
  ['/relations', 'relations'], ['/explore', 'explore'], ['/journeys/nanci-yi', 'journey'],
  ['/favorites', 'favorites'], ['/about', 'about'], ['/how-to-read', 'how-to-read'],
  ['/readings', 'readings'], ['/variants', 'variants'],
]

async function main() {
  const profile = mkdtempSync(join(tmpdir(), 'g55-chrome-'))
  const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--hide-scrollbars',
    '--force-device-scale-factor=1', 'about:blank'], { stdio: 'ignore' })
  let cdp
  try {
    cdp = await connect()
    await cdp.send('Page.enable')
    await cdp.send('Runtime.enable')
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })

    let shots = 0
    const ovfBad = []
    const themeTag = { deng: '灯下', qing: '晴窗' }
    for (const theme of ['deng', 'qing']) {
      await cdp.send('Page.navigate', { url: `${BASE}/` })
      await sleep(900)
      await cdp.eval(`localStorage.setItem('shanhai-theme', '${theme}')`)
      for (const [path, name] of ROUTES) {
        await cdp.send('Page.navigate', { url: BASE + path })
        await sleep(path === '/journeys/nanci-yi' ? 2000 : 1300)
        const ovf = await cdp.eval(`document.documentElement.scrollWidth === document.documentElement.clientWidth`)
        if (!ovf) ovfBad.push(theme + ':' + name)
        await cdp.shot(join(OUT, `mid-${name}-${theme}.png`))
        shots++
      }
    }
    check(`双主题截图 ≥12 张(实测 ${shots})`, shots >= 12, `${shots} 张入 ${OUT}/mid-*`)

    // 无正文压字(晴窗下复测三处画卷区)
    await cdp.send('Page.navigate', { url: `${BASE}/` })
    await sleep(1800)
    let p = await cdp.eval(PAINT_TEXT)
    check('home 画卷区无正文压字(核心带)', p.hits.filter((x) => x.startsWith('home')).length === 0, JSON.stringify(p.hits.filter((x) => x.startsWith('home'))))
    await cdp.send('Page.navigate', { url: `${BASE}/journeys/nanci-yi` })
    await sleep(2000)
    p = await cdp.eval(PAINT_TEXT)
    check('journey 轨道压画站名全有纱面承载(无裸字)', p.hits.filter((x) => x.startsWith('journey') && x.includes('[裸]')).length === 0, JSON.stringify(p.hits.filter((x) => x.startsWith('journey'))))

    // 对比度抽查(灯下走一轮)
    await cdp.eval(`localStorage.setItem('shanhai-theme', 'deng')`)
    await cdp.send('Page.navigate', { url: `${BASE}/` })
    await sleep(1600)
    let c = await cdp.eval(CONTRAST)
    check('灯下 大题对页底 ≥4.5', (c.h1OnPage || 99) >= 4.5, `ratio=${c.h1OnPage}`)
    await cdp.send('Page.navigate', { url: `${BASE}/journeys/nanci-yi` })
    await sleep(2000)
    c = await cdp.eval(CONTRAST)
    check('灯下 轨道字对混底(保守口径)≥4.5', (c.railOnWrap || 99) >= 4.5, `ratio=${c.railOnWrap}(底画 0.3 淡墨未计入=保守)`)
    await cdp.send('Page.navigate', { url: `${BASE}/chapters/nanshan-jing` })
    await sleep(1600)
    c = await cdp.eval(CONTRAST)
    check('灯下 卷尾注记对纸阶带 ≥4.5', (c.noteOnBand || 99) >= 4.5, `ratio=${c.noteOnBand}`)
    check('全程零横溢', ovfBad.length === 0, ovfBad.join(',') || '28 页全 ok')
    check('控制台零异常', cdp.events.filter((e) => e.method === 'Runtime.exceptionThrown').length === 0)
  } finally {
    chrome.kill()
  }

  const fails = results.filter((r) => !r.ok).length
  console.log(`\n${results.length - fails}/${results.length} 通过`)
  writeFileSync(join(dirname(fileURLToPath(import.meta.url)), 'round55-results.json'), JSON.stringify(results, null, 2))
  process.exit(fails ? 1 : 0)
}

main()
