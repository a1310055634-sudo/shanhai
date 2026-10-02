/**
 * G45 纸阶系统验收(无头 Chrome + CDP)。
 *
 * 断言:六值令牌双主题解析/应用区块底色=对应档(首页 intro、古卷篇组×5、探索三区块)/
 * 相邻区块档位互异(无断档)/正文对每档对比度 ≥4.5:1(灯下+晴窗实测)/
 * 14 路由双主题零横溢/控制台零异常。
 * 前置:preview 在 http://localhost:4173。运行:node dev/round45-paperbands.mjs
 */
import { mkdtempSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { tmpdir } from 'node:os'
import { spawn } from 'node:child_process'

const PORT = 9345
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
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.text)
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

const ROUTES = [
  ['/', 'home'], ['/catalog', 'catalog'], ['/catalog/jiuweihu', 'entity-jiuweihu'],
  ['/atlas', 'atlas'], ['/chapters', 'chapters'], ['/chapters/nanshan-jing', 'chapter-nanshan'],
  ['/relations', 'relations'], ['/explore', 'explore'], ['/journeys/nanci-yi', 'journey'],
  ['/favorites', 'favorites'], ['/about', 'about'], ['/how-to-read', 'how-to-read'],
  ['/readings', 'readings'], ['/variants', 'variants'],
]

const CONTRAST = `(() => {
  const cs = getComputedStyle(document.documentElement)
  const toRgb = (str) => {
    let s = String(str).trim()
    if (s[0] === '#') {
      const h = s.slice(1)
      const n = h.length === 3 ? h.split('').map((ch) => ch + ch).join('') : h
      return [parseInt(n.slice(0, 2), 16), parseInt(n.slice(2, 4), 16), parseInt(n.slice(4, 6), 16)]
    }
    return s.match(/\\d+(\\.\\d+)?/g).map(Number)
  }
  const lum = (rgbStr) => {
    const m = toRgb(rgbStr)
    const f = (v) => { const c = v / 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4) }
    return 0.2126 * f(m[0]) + 0.7152 * f(m[1]) + 0.0722 * f(m[2])
  }
  const ratio = (a, b) => { const l1 = Math.max(a, b), l2 = Math.min(a, b); return (l1 + 0.05) / (l2 + 0.05) }
  const tiers = [1, 2, 3].map((i) => cs.getPropertyValue('--page-alt-' + i).trim())
  const body = getComputedStyle(document.body).color
  const lb = lum(body)
  const out = { tiers, body, ratios: tiers.map((t) => +ratio(lb, lum(t)).toFixed(2)) }
  return out
})()`

const APPLIED = `(() => {
  const cs = (el) => getComputedStyle(el).backgroundColor
  const sec = (sel, i) => document.querySelectorAll(sel)[i || 0]
  const pick = (el) => el ? cs(el) : null
  const groups = [...document.querySelectorAll('section[class*="group"]')]
  return {
    homeIntro: location.pathname === '/' ? pick(document.querySelector('section[class*="intro"]')) : null,
    groups: location.pathname === '/chapters' ? groups.map(cs) : null,
    explore: location.pathname === '/explore' ? {
      card1: pick(document.querySelector('section[class*="tier1"]')),
      card2: pick(document.querySelector('section[class*="tier2"]')),
      journey: pick(document.querySelector('section[class*="journey"]')),
    } : null,
  }
})()`

async function main() {
  const profile = mkdtempSync(join(tmpdir(), 'g45-chrome-'))
  const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--hide-scrollbars',
    '--force-device-scale-factor=1', 'about:blank'], { stdio: 'ignore' })
  let cdp
  const report = {}
  try {
    cdp = await connect()
    await cdp.send('Page.enable')
    await cdp.send('Runtime.enable')
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })

    for (const [theme, key] of [['deng', 'deng'], ['qing', 'qing']]) {
      await cdp.send('Page.navigate', { url: `${BASE}/` })
      await sleep(900)
      await cdp.eval(`localStorage.setItem('shanhai-theme', '${theme}')`)
      await cdp.send('Page.navigate', { url: `${BASE}/` })
      await sleep(1200)
      const c = await cdp.eval(CONTRAST)
      report[key] = c
      check(`[${key}] 六值令牌解析`, c.tiers.every((t) => t && !t.includes('var(')), JSON.stringify(c.tiers))
      check(`[${key}] 正文对三档 ≥4.5:1`, c.ratios.every((r) => r >= 4.5), `body ${c.body} → ${JSON.stringify(c.ratios)}`)

      // 应用区块底色=对应档 + 相邻互异
      await cdp.send('Page.navigate', { url: `${BASE}/` })
      await sleep(1100)
      const home = await cdp.eval(APPLIED)
      await cdp.send('Page.navigate', { url: `${BASE}/chapters` })
      await sleep(1100)
      const chapters = await cdp.eval(APPLIED)
      await cdp.send('Page.navigate', { url: `${BASE}/explore` })
      await sleep(1100)
      const explore = await cdp.eval(APPLIED)
      const rgb = (t) => {
        let s = t.trim(), r, g, b
        if (s.startsWith('#')) {
          const h = s.slice(1)
          r = parseInt(h.slice(0, 2), 16); g = parseInt(h.slice(2, 4), 16); b = parseInt(h.slice(4, 6), 16)
        } else {
          ;[r, g, b] = s.split(',').map((x) => parseInt(x.trim(), 10))
        }
        return 'rgb(' + r + ', ' + g + ', ' + b + ')'
      }
      const tiersRgb = c.tiers.map(rgb)
      if (key === 'deng') {
        check('[deng] 首页 intro=一档', home.homeIntro === tiersRgb[0], `${home.homeIntro}`)
        check('[deng] 篇组五节档位 1/2/3/1/2', JSON.stringify(chapters.groups) === JSON.stringify([tiersRgb[0], tiersRgb[1], tiersRgb[2], tiersRgb[0], tiersRgb[1]]), JSON.stringify(chapters.groups))
        check('[deng] 篇组相邻互异(无断档)', chapters.groups.every((g, i) => i === 0 || g !== chapters.groups[i - 1]))
        check('[deng] 探索三区块 1/2/3', explore.explore.card1 === tiersRgb[0] && explore.explore.card2 === tiersRgb[1] && explore.explore.journey === tiersRgb[2], JSON.stringify(explore) + ' vs ' + JSON.stringify(tiersRgb))
      } else {
        check('[qing] 首页 intro=一档', home.homeIntro === tiersRgb[0], `${home.homeIntro}`)
        check('[qing] 篇组相邻互异(无断档)', chapters.groups.every((g, i) => i === 0 || g !== chapters.groups[i - 1]), JSON.stringify(chapters.groups))
        check('[qing] 探索三区块 1/2/3', explore.explore.card1 === tiersRgb[0] && explore.explore.card2 === tiersRgb[1] && explore.explore.journey === tiersRgb[2], JSON.stringify(explore) + ' vs ' + JSON.stringify(tiersRgb))
      }

      // 14 路由扫:零横溢 + 控制台净
      let ovfBad = []
      for (const [path, name] of ROUTES) {
        await cdp.send('Page.navigate', { url: BASE + path })
        await sleep(900)
        const ok = await cdp.eval(`document.documentElement.scrollWidth === document.documentElement.clientWidth`)
        if (!ok) ovfBad.push(name)
      }
      check(`[${key}] 14 路由零横溢`, ovfBad.length === 0, ovfBad.join(',') || 'all ok')
      check(`[${key}] 控制台零异常`, cdp.events.filter((e) => e.method === 'Runtime.exceptionThrown').length === 0)
      cdp.events = []
    }
  } finally {
    chrome.kill()
  }

  const fails = results.filter((r) => !r.ok).length
  console.log(`\n${results.length - fails}/${results.length} 通过`)
  writeFileSync(join(dirname(fileURLToPath(import.meta.url)), 'round45-results.json'), JSON.stringify({ results, report }, null, 2))
  process.exit(fails ? 1 : 0)
}

main()
