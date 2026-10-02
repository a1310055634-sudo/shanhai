/**
 * G37 运行时实测(无头 Chrome + CDP):微交互令牌在浏览器里的实际取值、
 * reduced-motion 压平是否真生效、全 13 路由触控目标抽测、控制台零异常。
 *
 * 前置:preview 在 http://localhost:4173。运行:node dev/round37-browser.mjs
 */
import { writeFileSync, mkdirSync, mkdtempSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { tmpdir } from 'node:os'
import { spawn } from 'node:child_process'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const BASE = 'http://localhost:4173'
const PORT = 9337
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const SHOT_DIR = join(root, 'GALLERY_BASELINES')
mkdirSync(SHOT_DIR, { recursive: true })

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
  async waitLoad(t = 15000) {
    const t0 = Date.now()
    while (Date.now() - t0 < t) {
      if (this.events.some((e) => e.method === 'Page.loadEventFired')) {
        this.events = this.events.filter((e) => e.method !== 'Page.loadEventFired')
        return true
      }
      await sleep(60)
    }
    return false
  }
}

/** 页面内全部「有动效」元素的实测时长;另统计仍带裸值时长的元素(应为 0)。 */
const MOTION_PROBE = `(() => {
  const out = { transitions: 0, animations: 0, samples: [], raw: [] }
  const seen = new Set()
  for (const el of document.querySelectorAll('body *')) {
    const cs = getComputedStyle(el)
    const td = cs.transitionDuration
    const ad = cs.animationDuration
    if (td && td !== '0s' && !seen.has(el)) { out.transitions++; seen.add(el) }
    if (ad && ad !== '0s') {
      out.animations++
      const name = cs.animationName
      if (name && name !== 'none' && out.samples.length < 12) {
        out.samples.push({ name, dur: ad, ease: cs.animationTimingFunction, iter: cs.animationIterationCount })
      }
    }
  }
  // 抽验代表元素的过渡时长(走令牌应得到 0.2s)
  const cta = document.querySelector('a[class*="entryCard"], a[class*="exploreCard"], main a')
  out.ctaDuration = cta ? getComputedStyle(cta).transitionDuration : null
  return out
})()`

const TAP = `(() => {
  const all = [...document.querySelectorAll('a,button')].filter(e => e.getBoundingClientRect().height > 0)
  const inline = all.filter(a => a.tagName === 'A' && a.parentElement?.tagName === 'P' && a.parentElement.textContent.trim().length > a.textContent.trim().length + 4)
  const controls = all.filter(a => !inline.includes(a))
  return {
    count: controls.length,
    inline: inline.length,
    min: controls.length ? Math.min(...controls.map(a => a.getBoundingClientRect().height)) : 0,
    under44: controls.map(a => ({
      h: Math.round(a.getBoundingClientRect().height * 10) / 10,
      t: a.textContent.trim().slice(0, 16),
      c: (typeof a.className === 'string' && a.className ? a.className.split(' ')[0] : a.tagName),
      p: a.parentElement ? a.parentElement.tagName : '',
    })).filter(x => x.h < 44),
  }
})()`

const ROUTES = [
  '/', '/catalog', '/catalog/jiuweihu', '/atlas', '/chapters', '/chapters/nanshan-jing',
  '/relations', '/explore', '/journeys/nanci-yi', '/favorites', '/about', '/how-to-read',
  '/readings', '/variants',
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
  const profile = mkdtempSync(join(tmpdir(), 'g37-chrome-'))
  const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--hide-scrollbars',
    '--force-device-scale-factor=1', 'about:blank'], { stdio: 'ignore' })
  let cdp
  try {
    cdp = await connect()
    await cdp.send('Page.enable')
    await cdp.send('Runtime.enable')

    const go = async (path, { width = 1440, height = 900, settle = 900 } = {}) => {
      await cdp.send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false })
      await cdp.send('Page.navigate', { url: BASE + path })
      await cdp.waitLoad()
      await sleep(settle)
    }

    // ---------- 1. 令牌在运行时的实际取值
    await go('/')
    const motion = await cdp.eval(MOTION_PROBE)
    check('首页存在过渡元素(动效未被误删)', motion.transitions > 0, `过渡元素 ${motion.transitions} 个`)
    // 允许的动画时长集合 = 令牌值(揭示 0.72s / 抽屉 0.32s / 氛围 2.8s·84s·118s·7s)
    const TOKEN_DURS = ['0.32s', '0.72s', '2.8s', '84s', '118s', '7s']
    const AMBIENT = ['_cue-breathe', 'cue-breathe', '_drift', 'drift', '_twinkle', 'twinkle']
    const durBad = motion.samples.filter((s) => !TOKEN_DURS.includes(s.dur))
    check(
      '运行时动画时长全部落在令牌档',
      durBad.length === 0,
      motion.samples.map((s) => `${s.name}:${s.dur}`).join(' ') || '(无)',
    )
    const easeBad = motion.samples.filter((s) => {
      const isAmbient = AMBIENT.some((k) => s.name.includes(k))
      return isAmbient ? s.ease !== 'ease-in-out' : s.ease !== 'cubic-bezier(0.25, 0.1, 0.25, 1)'
    })
    check(
      '运行时缓动:氛围组=ease-in-out(--ease-ambient),其余=--ease-soft',
      easeBad.length === 0,
      easeBad.map((s) => `${s.name}:${s.ease}`).join(' ') || '(全部符合)',
    )

    // ---------- 2. reduced-motion 真实压平
    await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
    await go('/')
    const flat = await cdp.eval(`(() => {
      const vals = new Set(); let animated = 0
      for (const el of document.querySelectorAll('body *')) {
        const cs = getComputedStyle(el)
        if (cs.animationName && cs.animationName !== 'none') { animated++; vals.add(cs.animationDuration) }
        if (cs.transitionDuration !== '0s') vals.add(cs.transitionDuration)
      }
      return { vals: [...vals], animated }
    })()`)
    check(
      'reduced-motion:压平后全站时长仅剩 1e-05s',
      flat.vals.every((v) => v === '1e-05s' || v === '0.00001s'),
      `取值集合 ${JSON.stringify(flat.vals)} · 带动画元素 ${flat.animated}`,
    )
    const shotReduce = await cdp.send('Page.captureScreenshot', {})
    writeFileSync(join(SHOT_DIR, 'g37-home-reduced-motion.png'), Buffer.from(shotReduce.data, 'base64'))
    await cdp.send('Emulation.setEmulatedMedia', { features: [] })

    // ---------- 3. 全 14 路由 390 触控抽测(逐路由清单,供遗留清单化)
    let worst = { route: '', min: 999, under: [] }
    const perRoute = []
    const inventory = []
    for (const r of ROUTES) {
      await go(r, { width: 390, height: 844, settle: 700 })
      const t = await cdp.eval(TAP)
      perRoute.push({ route: r, min: Math.round(t.min), count: t.count, under44: t.under44.length })
      inventory.push({ route: r, count: t.count, under44: t.under44 })
      if (t.min < worst.min) worst = { route: r, min: t.min, under: t.under44 }
    }
    console.log('      390 档逐路由控件最小高度:' + perRoute.map((p) => `${p.route}=${p.min}`).join(' '))
    const totalUnder = inventory.reduce((s, i) => s + i.under44.length, 0)
    const byClass = new Map()
    for (const i of inventory) {
      for (const u of i.under44) {
        const k = `${u.c}[${u.p}]`
        const cur = byClass.get(k) ?? { n: 0, min: 999, sample: u.t }
        byClass.set(k, { n: cur.n + 1, min: Math.min(cur.min, u.h), sample: cur.n ? cur.sample : u.t })
      }
    }
    const grouped = [...byClass.entries()].sort((a, b) => a[1].min - b[1].min)
    console.log(`      390 档 <44px 控件合计 ${totalUnder} 个,按类归并 ${grouped.length} 类:`)
    for (const [k, v] of grouped) console.log(`        ${String(v.min).padStart(5)}px ×${v.n}  ${k}  如「${v.sample}」`)
    writeFileSync(join(root, 'TOUCH-TARGET-AUDIT-G37.json'), JSON.stringify({ perRoute, inventory, grouped: grouped.map(([k, v]) => ({ key: k, ...v })) }, null, 2))
    check(
      `全 ${ROUTES.length} 路由 390 档控件 ≥44px`,
      perRoute.every((p) => p.min >= 44),
      `最小 ${Math.round(worst.min)}px @ ${worst.route};合计 ${totalUnder} 个不足,已按类归并为 ${grouped.length} 类写入 TOUCH-TARGET-AUDIT-G37.json`,
    )

    // ---------- 3b. 舆图新增命中区不得覆盖邻近交互节点(防回归)
    await go('/atlas', { width: 390, height: 844, settle: 800 })
    const mapOverlap = await cdp.eval(`(() => {
      const link = [...document.querySelectorAll('svg a')].find(a => a.textContent.includes('进入山海行旅'))
      if (!link) return { found: false }
      const r = link.getBoundingClientRect()
      const hit = { x: r.x, y: r.y, w: r.width, h: r.height }
      const others = [...document.querySelectorAll('svg a, svg [tabindex]')].filter(e => e !== link)
      const clash = []
      for (const o of others) {
        const b = o.getBoundingClientRect()
        if (b.width === 0 || b.height === 0) continue
        const ix = Math.max(0, Math.min(r.right, b.right) - Math.max(r.left, b.left))
        const iy = Math.max(0, Math.min(r.bottom, b.bottom) - Math.max(r.top, b.top))
        if (ix > 0.5 && iy > 0.5) clash.push({ t: o.textContent.trim().slice(0, 10), ix: Math.round(ix), iy: Math.round(iy) })
      }
      return { found: true, hit, clash, others: others.length }
    })()`)
    check(
      '舆图行旅链接命中区 ≥44px 且不覆盖其他交互节点',
      mapOverlap.found && mapOverlap.hit.h >= 44 && mapOverlap.clash.length === 0,
      JSON.stringify(mapOverlap).slice(0, 260),
    )

    // ---------- 4. 首页 390 截图 + 控制台
    await go('/', { width: 390, height: 844 })
    const s = await cdp.send('Page.captureScreenshot', {})
    writeFileSync(join(SHOT_DIR, 'g37-home-390.png'), Buffer.from(s.data, 'base64'))

    const errs = cdp.events.filter((e) => e.method === 'Runtime.exceptionThrown' || (e.method === 'Runtime.consoleAPICalled' && e.params.type === 'error'))
    check('全程无未捕获异常', errs.length === 0, String(errs.length))
  } finally {
    try { chrome.kill() } catch { /* ignore */ }
  }
  const failed = results.filter((r) => !r.ok)
  console.log(`\n== 合计 ${results.length} 项,通过 ${results.length - failed.length},失败 ${failed.length} ==`)
  if (failed.length) console.log(JSON.stringify(failed, null, 1))
  writeFileSync(join(SHOT_DIR, 'g37-assertions.json'), JSON.stringify(results, null, 2))
  process.exit(failed.length ? 1 : 0)
}

main().catch((e) => { console.error('脚本异常:', e); process.exit(1) })
