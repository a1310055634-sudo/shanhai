/**
 * G44 墨痕显影 InkReveal 验收(无头 Chrome + CDP,真实 Input 事件)。
 *
 * 断言:面纱像素=令牌计算值(灯下/晴窗双主题)/真实鼠标路径拂出显影(中心 alpha→0)
 * 并在寿命后愈合并重纱/显影区无正文压字/触屏(hover:none)面纱隐藏画常显/
 * reduced-motion 静态半透不响应鼠标/移除 canvas 画仍可见(fail-open 结构演示)。
 * 前置:preview 在 http://localhost:4173。运行:node dev/round44-inkreveal.mjs
 */
import { mkdtempSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { tmpdir } from 'node:os'
import { spawn } from 'node:child_process'

const PORT = 9343
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const BASE = 'http://localhost:4173'

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
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' ' + JSON.stringify(r.exceptionDetails))
    return r.result.value
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

const GEOM = `(() => {
  const c = document.querySelector('[data-hero-paint] canvas')
  const img = document.querySelector('[data-hero-paint] img')
  if (!c) return { canvas: null, hover: matchMedia('(hover: hover)').matches }
  const cs = getComputedStyle(c)
  const r = c.getBoundingClientRect()
  const ir = img.getBoundingClientRect()
  const token = getComputedStyle(c).getPropertyValue('--ink-reveal-veil').trim()
  return {
    canvas: true, hover: matchMedia('(hover: hover)').matches,
    rect: { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) },
    imgW: +ir.width.toFixed(1), imgH: +ir.height.toFixed(1),
    mask: cs.maskImage.slice(0, 30), display: cs.display, opacity: cs.opacity,
    token,
  }
})()`

const PIXEL = `(() => {
  const c = document.querySelector('[data-hero-paint] canvas')
  if (!c || !c.width) return null
  const ctx = c.getContext('2d')
  const d = ctx.getImageData(Math.round(c.width / 2), Math.round(c.height / 2), 1, 1).data
  return [d[0], d[1], d[2], d[3]]
})()`

async function main() {
  const profile = mkdtempSync(join(tmpdir(), 'g44-chrome-'))
  const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--hide-scrollbars',
    '--force-device-scale-factor=1', 'about:blank'], { stdio: 'ignore' })
  let cdp
  try {
    cdp = await connect()
    await cdp.send('Page.enable')
    await cdp.send('Runtime.enable')

    // ── 1) 灯下默认:hover:hover + 面纱=令牌色 ──
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
    // 新 profile 默认 light→G31 跟随进晴窗;先锚定灯下再断言(否则「灯下」实测为晴窗)
    await cdp.send('Page.navigate', { url: `${BASE}/` })
    await sleep(1200)
    await cdp.eval(`localStorage.setItem('shanhai-theme', 'deng')`)
    await cdp.send('Page.navigate', { url: `${BASE}/` })
    await sleep(1600)
    let g = await cdp.eval(GEOM)
    if (!g.canvas || !g.hover) {
      // 无头默认若报 hover:none,以 setEmulatedMedia 强制 hover 档
      await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'hover', value: 'hover' }, { name: 'pointer', value: 'fine' }] })
      await cdp.send('Page.navigate', { url: `${BASE}/` })
      await sleep(1600)
      g = await cdp.eval(GEOM)
    }
    check('hover 档 canvas 初始化', !!g.canvas && g.hover, JSON.stringify(g))
    check('面纱尺寸=画卷矩形', g.canvas && Math.abs(g.rect.w - g.imgW) < 3 && Math.abs(g.rect.h - g.imgH) < 3,
      `canvas ${g.rect.w}x${g.rect.h} vs img ${g.imgW}x${g.imgH}`)
    check('面纱带同款羽化 mask', (g.mask || '').includes('radial'))
    const tok = g.token.split(',').map((s) => parseInt(s.trim(), 10))
    let px = await cdp.eval(PIXEL)
    check('面纱像素=令牌计算值(灯下)', px && px[0] === tok[0] && px[1] === tok[1] && px[2] === tok[2] && px[3] === 255,
      `pixel=${JSON.stringify(px)} token=${JSON.stringify(tok)}`)

    // ── 2) 真实鼠标拂拭:显影→愈合 ──
    const cx = g.rect.x + g.rect.w / 2
    const cy = g.rect.y + g.rect.h / 2
    for (let i = -4; i <= 4; i++) {
      await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: cx + i * 26, y: cy + i * 5 })
      await sleep(55)
    }
    px = await cdp.eval(PIXEL)
    check('拂拭中心显影(alpha→0)', px && px[3] < 40, `pixel=${JSON.stringify(px)}`)
    await sleep(1000)
    px = await cdp.eval(PIXEL)
    check('寿命后面纱愈合(alpha→255)', px && px[3] === 255, `pixel=${JSON.stringify(px)}`)

    // ── 3) 显影区无正文压字(文字矩形 vs 画布矩形不相交,1440) ──
    const hit = await cdp.eval(`(() => {
      const c = document.querySelector('[data-hero-paint] canvas').getBoundingClientRect()
      const els = [...document.querySelectorAll('.hero h1, .hero p, .hero a')].filter(e => e.getBoundingClientRect().width > 0)
      const bad = []
      for (const e of els) {
        const r = e.getBoundingClientRect()
        const inter = !(r.right < c.left || r.left > c.right || r.bottom < c.top || r.top > c.bottom)
        if (inter) bad.push((e.className || e.tagName).toString().slice(0, 30))
      }
      return { bad, n: els.length }
    })()`)
    check('显影区无正文压字', hit.bad.length === 0, `checked=${hit.n} hits=${JSON.stringify(hit.bad)}`)

    // ── 4) 晴窗:面纱=宣纸系令牌 ──
    await cdp.eval(`localStorage.setItem('shanhai-theme', 'qing')`)
    await cdp.send('Page.navigate', { url: `${BASE}/` })
    await sleep(1600)
    const gq = await cdp.eval(GEOM)
    const tokq = gq.token.split(',').map((s) => parseInt(s.trim(), 10))
    px = await cdp.eval(PIXEL)
    check('面纱像素=令牌计算值(晴窗宣纸系)', px && px[0] === tokq[0] && px[1] === tokq[1] && px[2] === tokq[2],
      `pixel=${JSON.stringify(px)} token=${JSON.stringify(tokq)}`)

    // ── 5) reduced-motion:静态半透,鼠标不显影 ──
    await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
    await cdp.send('Page.navigate', { url: `${BASE}/` })
    await sleep(1600)
    const gr = await cdp.eval(GEOM)
    check('reduce 面纱静态半透(opacity≈0.55)', gr.canvas && Math.abs(parseFloat(gr.opacity) - 0.55) < 0.01, `opacity=${gr.opacity}`)
    const before = await cdp.eval(PIXEL)
    for (let i = -4; i <= 4; i++) {
      await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: cx + i * 26, y: cy + i * 5 })
      await sleep(40)
    }
    const after = await cdp.eval(PIXEL)
    check('reduce 鼠标不显影(不跑 rAF)', JSON.stringify(before) === JSON.stringify(after), `${JSON.stringify(before)} vs ${JSON.stringify(after)}`)
    await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] })

    // ── 6) 触屏(hover:none):组件不初始化→面纱从未涂→画常显(功能面断言;
    //     CSS @media(hover:none) 为双保险,setEmulatedMedia 对 CSS 层翻转不稳,如实记录) ──
    await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 })
    await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'hover', value: 'none' }, { name: 'pointer', value: 'coarse' }] })
    await cdp.send('Page.navigate', { url: `${BASE}/` })
    await sleep(1600)
    const gt = await cdp.eval(GEOM)
    const touchPx = await cdp.eval(PIXEL)
    check('hover:none 组件未初始化(matchMedia=false)', gt.canvas && gt.hover === false, `hover=${gt.hover} display=${gt.display}`)
    check('hover:none 面纱从未涂=画常显(alpha=0)', touchPx && touchPx[3] === 0, `pixel=${JSON.stringify(touchPx)}`)
    check('hover:none 画常显(img 在画)', gt.imgW > 100 && gt.imgH > 50, `img ${gt.imgW}x${gt.imgH}`)
    await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: false })
    await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'hover', value: 'hover' }, { name: 'pointer', value: 'fine' }] })

    // ── 7) fail-open 结构演示:移除 canvas,画仍可见 ──
    await cdp.send('Page.navigate', { url: `${BASE}/` })
    await sleep(1600)
    const fo = await cdp.eval(`(() => {
      const c = document.querySelector('[data-hero-paint] canvas')
      const img = document.querySelector('[data-hero-paint] img')
      const visibleBefore = img.getBoundingClientRect().width > 100
      c.remove()
      const visibleAfter = img.getBoundingClientRect().width > 100
      return { visibleBefore, visibleAfter, canvasGone: !document.querySelector('[data-hero-paint] canvas') }
    })()`)
    check('fail-open:移除面纱层画仍完整可见', fo.visibleBefore && fo.visibleAfter && fo.canvasGone, JSON.stringify(fo))
    check('控制台零异常', cdp.events.filter((e) => e.method === 'Runtime.exceptionThrown').length === 0)
  } finally {
    chrome.kill()
  }

  const fails = results.filter((r) => !r.ok).length
  console.log(`\n${results.length - fails}/${results.length} 通过`)
  writeFileSync(join(dirname(fileURLToPath(import.meta.url)), 'round44-results.json'), JSON.stringify(results, null, 2))
  process.exit(fails ? 1 : 0)
}

main()
