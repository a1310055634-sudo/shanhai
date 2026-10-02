/**
 * G36 浏览器实测(无头 Chrome + CDP 直连,复用 G35 建的最小 CDP 客户端写法)。
 * 断言:三个受影响词条页的「后世流变」claim 渲染完整(句/引文/篇名/链接/存档)、
 * 引文从渲染结果回查存档、390 零横溢、双主题对比度、触控目标、主导航未动、控制台零异常。
 *
 * 前置:preview 在 http://localhost:4173。运行:node dev/round36-browser.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { tmpdir } from 'node:os'
import { spawn } from 'node:child_process'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const BASE = 'http://localhost:4173'
const PORT = 9336
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const SHOT_DIR = join(root, 'GALLERY_BASELINES')
mkdirSync(SHOT_DIR, { recursive: true })

const archive = readFileSync(join(root, 'EDITION_EVIDENCE/liubian-guji-20261002.md'), 'utf8')
const norm = (s) => s.replace(/\s+/gu, '')
const nArch = norm(archive)

const results = []
const check = (name, ok, detail = '') => {
  results.push({ name, ok, detail })
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`)
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
  async waitLoad(timeout = 15000) {
    const t0 = Date.now()
    while (Date.now() - t0 < timeout) {
      if (this.events.some((e) => e.method === 'Page.loadEventFired')) {
        this.events = this.events.filter((e) => e.method !== 'Page.loadEventFired')
        return true
      }
      await sleep(60)
    }
    return false
  }
}

const OVERFLOW = `(() => {
  const de = document.documentElement
  const inScroller = (el) => { let n = el.parentElement
    while (n && n !== document.body) { const ox = getComputedStyle(n).overflowX
      if (ox === 'auto' || ox === 'scroll') return true; n = n.parentElement } return false }
  const over = []
  for (const el of document.querySelectorAll('body *')) {
    // SVG 内部图元(ellipse/path/g…)的几何包围盒可超出 svg 视口,不产生页面滚动,按既有口径排除
    if (el.ownerSVGElement) continue
    const r = el.getBoundingClientRect()
    if (r.width > 0 && (r.right > de.clientWidth + 1 || r.left < -1) && !inScroller(el))
      over.push((typeof el.className === 'string' ? el.className.split(' ')[0] : el.tagName) + ':' + Math.round(r.right))
  }
  return { scrollW: de.scrollWidth, clientW: de.clientWidth, over: [...new Set(over)].slice(0, 6) }
})()`

const CLAIM_PROBE = `(() => {
  const claims = [...document.querySelectorAll('[data-claim]')]
  return claims.map(c => {
    const link = c.querySelector('a')
    const q = c.querySelector('[data-quote]')
    return {
      title: c.dataset.claim,
      quote: q ? q.dataset.quote : '',
      quoteRendered: q ? q.textContent.trim() : '',
      hasLink: !!link,
      href: link?.getAttribute('href') ?? '',
      target: link?.getAttribute('target') ?? '',
      rel: link?.getAttribute('rel') ?? '',
      linkH: link ? Math.round(link.getBoundingClientRect().height) : 0,
      hasArchive: /存档\\s*EDITION_EVIDENCE/.test(c.textContent),
    }
  })
})()`

const TAP = `(() => {
  const all = [...document.querySelectorAll('a,button')].filter(e => e.getBoundingClientRect().height > 0)
  const inline = all.filter(a => a.tagName === 'A' && a.parentElement?.tagName === 'P' && a.parentElement.textContent.trim().length > a.textContent.trim().length + 4)
  const controls = all.filter(a => !inline.includes(a))
  return {
    inline: inline.length,
    min: controls.length ? Math.min(...controls.map(a => a.getBoundingClientRect().height)) : 0,
    small: controls.map(a => ({ h: Math.round(a.getBoundingClientRect().height), t: a.textContent.trim().slice(0, 14), c: (typeof a.className === 'string' ? a.className.split(' ')[0] : a.tagName) })).filter(x => x.h < 44),
  }
})()`

/**
 * 对比度:色彩逐层 alpha 合成。
 * 关键修正(round36):合成必须自**最底层向上**叠加——(v*a + base*(1-a))。
 * round35 的写法把半透明层与底层的顺序写反,导致宣纸内衬(--paper-veil 等)被算成深底,
 * 误报一批 2.29:1 的假失败;本轮修正后 round35 的对比度断言一并复跑复核。
 */
const CONTRAST = `(() => {
  const lum = (c) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4) }
    return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]) }
  const parse = (s) => { const m = s.match(/rgba?\\(([^)]+)\\)/); if (!m) return null
    const p = m[1].split(',').map(Number); return { c: [p[0], p[1], p[2]], a: p.length > 3 ? p[3] : 1 } }
  const bgOf = (el) => {
    const layers = []
    let node = el
    while (node && node !== document.documentElement.parentNode) {
      const cs = getComputedStyle(node)
      let s = cs.backgroundColor
      if (cs.backgroundImage && cs.backgroundImage !== 'none') s = cs.backgroundImage.match(/rgba?\\([^)]+\\)/)?.[0] ?? s
      const p = parse(s)
      if (p && p.a > 0) layers.push(p)
      if (p && p.a >= 1) break
      node = node.parentElement
    }
    let base = [255, 255, 255]
    for (let i = layers.length - 1; i >= 0; i--) {
      const L = layers[i]
      base = L.c.map((v, k) => v * L.a + base[k] * (1 - L.a))
    }
    return base
  }
  const ratio = (f, b) => { const a = lum(f) + 0.05, b2 = lum(b) + 0.05; return a > b2 ? a / b2 : b2 / a }
  const ownText = (el) => [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())
  const out = []; let seal = 0
  for (const el of document.querySelectorAll('body *')) {
    if (!ownText(el)) continue
    const cs = getComputedStyle(el)
    if (cs.visibility === 'hidden' || cs.display === 'none') continue
    const fg = parse(cs.color); if (!fg) continue
    const size = parseFloat(cs.fontSize)
    const need = size >= 24 || (size >= 18.66 && parseInt(cs.fontWeight) >= 700) ? 3 : 4.5
    const r = ratio(fg.c, bgOf(el))
    if (r < need) { const cls = typeof el.className === 'string' ? el.className.split(' ')[0] : ''
      if (cls.includes('Seal') || cls.includes('seal')) { seal++; continue }
      out.push({ t: [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join('').trim().slice(0, 12), r: Math.round(r * 100) / 100, need, el: el.tagName + '.' + cls }) }
  }
  return { fails: out, seal } })()`

const PAGES = [
  { path: '/catalog/jiuweihu', claims: 2, name: '九尾狐' },
  { path: '/catalog/kui', claims: 1, name: '夔' },
  { path: '/catalog/jingwei', claims: 1, name: '精卫' },
]

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

async function main() {
  const profile = mkdtempSync(join(tmpdir(), 'g36-chrome-'))
  const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--hide-scrollbars',
    '--force-device-scale-factor=1', 'about:blank'], { stdio: 'ignore' })
  let cdp
  try {
    cdp = await connect()
    await cdp.send('Page.enable')
    await cdp.send('Runtime.enable')
    const go = async (path, { width = 1440, height = 900, theme = 'deng', settle = 900 } = {}) => {
      await cdp.send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false })
      // 首帧可能是 about:blank,其上访问 localStorage 会抛 SecurityError,故包 try
      await cdp.eval(`(() => { try { localStorage.removeItem('shanhai-theme') } catch (e) {} return 1 })()`)
      await cdp.send('Page.navigate', { url: BASE + '/' })
      await cdp.waitLoad()
      await cdp.eval(`(() => { try { localStorage.setItem('shanhai-theme','${theme}') } catch (e) {} return 1 })()`)
      await cdp.send('Page.navigate', { url: BASE + path })
      await cdp.waitLoad()
      await sleep(settle)
    }

    let renderedQuotes = []
    for (const p of PAGES) {
      await go(p.path)
      const claims = await cdp.eval(CLAIM_PROBE)
      check(`${p.name} 页 claim 数 = ${p.claims}`, claims.length === p.claims, String(claims.length))
      const bad = claims.filter((c) => !c.title || !c.quote || !c.hasLink || !c.hasArchive)
      check(`${p.name} claim 五要素齐备(句/引文/篇名/链接/存档)`, bad.length === 0, JSON.stringify(bad).slice(0, 200))
      const badLink = claims.filter((c) => !c.href.startsWith('https://zh.wikisource.org/') || c.target !== '_blank' || !c.rel.includes('noreferrer'))
      check(`${p.name} 链接指向维基文库且新窗+noreferrer`, badLink.length === 0, JSON.stringify(badLink.map((c) => c.href)).slice(0, 160))
      const small = claims.filter((c) => c.linkH < 44)
      check(`${p.name} claim 链接触控 ≥44px`, small.length === 0, JSON.stringify(small.map((c) => c.linkH)))
      renderedQuotes.push(...claims.map((c) => ({ ...c, page: p.name })))
      const ov = await cdp.eval(OVERFLOW)
      check(`${p.name} 1440 零横溢`, ov.scrollW <= ov.clientW + 1 && ov.over.length === 0, JSON.stringify(ov))
    }

    // 渲染出的引文逐段回查存档(省略号分段)
    const segs = renderedQuotes.flatMap((c) => c.quote.split('……').map(norm).filter(Boolean))
    const miss = segs.filter((s) => !nArch.includes(s))
    check(`渲染引文逐字回查存档(${segs.length} 段)`, miss.length === 0, JSON.stringify(miss.map((s) => s.slice(0, 24))))

    // 390 档 + 双主题
    await go('/catalog/jiuweihu', { width: 390, height: 844 })
    const ov390 = await cdp.eval(OVERFLOW)
    check('九尾狐 390 零横溢', ov390.scrollW <= ov390.clientW + 1 && ov390.over.length === 0, JSON.stringify(ov390))
    const tap390 = await cdp.eval(TAP)
    check('九尾狐 390 触控档控件 ≥44px', Math.round(tap390.min) >= 44, `min=${tap390.min.toFixed(2)} 句内豁免 ${tap390.inline} 不足者 ${JSON.stringify(tap390.small)}`)
    const shot390 = await cdp.send('Page.captureScreenshot', {})
    writeFileSync(join(SHOT_DIR, 'g36-jiuweihu-390.png'), Buffer.from(shot390.data, 'base64'))

    for (const theme of ['deng', 'qing']) {
      await go('/catalog/jiuweihu', { theme })
      await cdp.eval(`(() => { const s=document.createElement('style'); s.textContent='*{transition:none !important;animation:none !important}'; document.head.appendChild(s); return true })()`)
      await sleep(200)
      const c = await cdp.eval(CONTRAST)
      check(`九尾狐 ${theme === 'qing' ? '晴窗' : '灯下'} 对比度(印章豁免 ${c.seal})`, c.fails.length === 0, JSON.stringify(c.fails).slice(0, 260))
      if (theme === 'deng') {
        await cdp.eval(`document.querySelector('#sec-reception').scrollIntoView({block:'start'})`)
        await sleep(350)
        const s = await cdp.send('Page.captureScreenshot', {})
        writeFileSync(join(SHOT_DIR, 'g36-jiuweihu-1440-reception.png'), Buffer.from(s.data, 'base64'))
        const s2 = await cdp.send('Page.captureScreenshot', {})
        writeFileSync(join(SHOT_DIR, `g36-jiuweihu-1440-${theme}.png`), Buffer.from(s2.data, 'base64'))
      }
    }

    await go('/catalog/kui')
    const kTap = await cdp.eval(TAP)
    // 1440 为指针档:按 G35 已记口径取 WCAG 2.5.8 AA(≥24px);≥44px 触控档见 390 断言
    check('夔 1440 档控件 ≥24px(WCAG 2.5.8 AA)', kTap.min >= 24, `min=${Math.round(kTap.min)} 不足者 ${JSON.stringify(kTap.small).slice(0, 200)}`)
    await cdp.eval(`document.querySelector('#sec-reception').scrollIntoView({block:'start'})`)
    await sleep(350)
    const sK = await cdp.send('Page.captureScreenshot', {})
    writeFileSync(join(SHOT_DIR, 'g36-kui-1440-reception.png'), Buffer.from(sK.data, 'base64'))

    // 主导航:词条页内另有 <header>(插画区),故只取 DOM 中第一个 header(应用顶栏)
    const nav = await cdp.eval(`[...(document.querySelector('header')?.querySelectorAll('a') ?? [])].map(a=>a.textContent.trim()).filter(Boolean)`)
    const words = ['卷首', '异兽', '山川', '古卷', '谱系', '探索', '收藏']
    check('主导航七词未动', words.every((w) => nav.includes(w)) && nav.length === 8, JSON.stringify(nav))

    const errs = cdp.events.filter((e) => e.method === 'Runtime.exceptionThrown' || (e.method === 'Runtime.consoleAPICalled' && e.params.type === 'error'))
    check('全程无未捕获异常', errs.length === 0, String(errs.length))
  } finally {
    try { chrome.kill() } catch { /* ignore */ }
  }
  const failed = results.filter((r) => !r.ok)
  console.log(`\n== 合计 ${results.length} 项,通过 ${results.length - failed.length},失败 ${failed.length} ==`)
  if (failed.length) console.log(JSON.stringify(failed, null, 1))
  writeFileSync(join(SHOT_DIR, 'g36-assertions.json'), JSON.stringify(results, null, 2))
  process.exit(failed.length ? 1 : 0)
}

main().catch((e) => { console.error('脚本异常:', e); process.exit(1) })
