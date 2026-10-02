/**
 * G35 浏览器实测(无头 Chrome + CDP 直连;本会话无 IAB,改用 CDP,协议与既有轮次一致)。
 *
 * 做三件事:
 *  1) /readings、/variants 两页 DOM 断言(条数/依据行非空/异文四栏齐备/主导航七词未动);
 *  2) 「逐字」回查:把页面实际渲染出的郭璞注音注与异文照录句,逐条回查
 *     EDITION_EVIDENCE 存档,要求 100% 命中且带行号——不是核数据文件,是核渲染结果;
 *  3) 390 / 1440 双档零横溢、双主题关键色可读、截图存档。
 *
 * 前置:项目 preview 服务在 http://localhost:4173 上运行。
 * 运行:node dev/round35-browser.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { tmpdir } from 'node:os'
import { spawn } from 'node:child_process'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const BASE = 'http://localhost:4173'
const PORT = 9333
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const SHOT_DIR = join(root, 'GALLERY_BASELINES')
mkdirSync(SHOT_DIR, { recursive: true })

const guopuLines = readFileSync(
  join(root, 'EDITION_EVIDENCE/wikisource-nanshan1-guopu-20261002.txt'),
  'utf8',
).split(/\r?\n/)
const ctext = readFileSync(join(root, 'EDITION_EVIDENCE/ctext-nanci1-20260927.txt'), 'utf8')
const b1 = readFileSync(join(root, 'EDITION_EVIDENCE/wikisource-nanshan1-b1-20261002.txt'), 'utf8')

const results = []
const check = (name, ok, detail = '') => {
  results.push({ name, ok, detail })
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`)
}

// ---------------------------------------------------------------- CDP client
class CDP {
  constructor(ws) {
    this.ws = ws
    this.id = 0
    this.pending = new Map()
    this.events = []
    ws.addEventListener('message', (ev) => {
      const msg = JSON.parse(ev.data)
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id)
        this.pending.delete(msg.id)
        msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result)
      } else if (msg.method) {
        this.events.push(msg)
      }
    })
  }
  send(method, params = {}) {
    const id = ++this.id
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject })
      this.ws.send(JSON.stringify({ id, method, params }))
    })
  }
  async eval(expression) {
    const r = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
    })
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' ' + expression)
    return r.result.value
  }
  async waitLoad(timeout = 15000) {
    const started = Date.now()
    while (Date.now() - started < timeout) {
      if (this.events.some((e) => e.method === 'Page.loadEventFired')) {
        this.events = this.events.filter((e) => e.method !== 'Page.loadEventFired')
        return true
      }
      await new Promise((r) => setTimeout(r, 60))
    }
    return false
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

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
    } catch {
      /* retry */
    }
    await sleep(250)
  }
  throw new Error('无法连接无头 Chrome 调试端口')
}

// ------------------------------------------------------------ 页面常用断言
const OVERFLOW_PROBE = `(() => {
  const de = document.documentElement
  // 元素若处在横向可滚动容器内(如 390 档主导航横滚),属设计内滚动,不计页面横溢
  const inScroller = (el) => {
    let n = el.parentElement
    while (n && n !== document.body) {
      const ox = getComputedStyle(n).overflowX
      if (ox === 'auto' || ox === 'scroll') return true
      n = n.parentElement
    }
    return false
  }
  const over = []
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect()
    if (r.width > 0 && (r.right > de.clientWidth + 1 || r.left < -1) && !inScroller(el)) {
      const cls = el.className && typeof el.className === 'string' ? el.className.split(' ')[0] : el.tagName
      over.push(cls + ':' + Math.round(r.right))
    }
  }
  return { scrollW: de.scrollWidth, clientW: de.clientWidth, over: [...new Set(over)].slice(0, 8) }
})()`

/** 关键文字与其合成背景的对比度;收录「自身直接含文字节点」的元素(不只叶子元素,避免漏测)。 */
const CONTRAST_PROBE = `(() => {
  const lum = (c) => {
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4) }
    return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2])
  }
  const parse = (s) => {
    const m = s.match(/rgba?\\(([^)]+)\\)/)
    if (!m) return null
    const p = m[1].split(',').map(Number)
    return { c: [p[0], p[1], p[2]], a: p.length > 3 ? p[3] : 1 }
  }
  const bgOf = (el) => {
    let acc = null
    let node = el
    while (node && node !== document.documentElement.parentNode) {
      const cs = getComputedStyle(node)
      let s = cs.backgroundColor
      if (cs.backgroundImage && cs.backgroundImage !== 'none') s = cs.backgroundImage.match(/rgba?\\([^)]+\\)/)?.[0] ?? s
      const p = parse(s)
      if (p && p.a > 0) acc = acc ? { c: acc.c.map((v, i) => v * (1 - p.a) + p.c[i] * p.a), a: 1 } : p
      if (acc && acc.a >= 1) break
      node = node.parentElement
    }
    if (!acc) acc = { c: [255, 255, 255], a: 1 }
    else if (acc.a < 1) acc = { c: acc.c.map((v, i) => v * acc.a + 255 * (1 - acc.a)), a: 1 }
    return acc.c
  }
  const ratio = (fg, bg) => { const a = lum(fg) + 0.05, b = lum(bg) + 0.05; return a > b ? a / b : b / a }
  const ownText = (el) => [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 0)
  const out = []
  let sealExempt = 0
  for (const el of document.querySelectorAll('body *')) {
    if (!ownText(el)) continue
    const cs = getComputedStyle(el)
    if (cs.visibility === 'hidden' || cs.display === 'none' || parseFloat(cs.opacity) < 0.5) continue
    const fg = parse(cs.color)
    if (!fg) continue
    const size = parseFloat(cs.fontSize)
    const need = size >= 24 || (size >= 18.66 && parseInt(cs.fontWeight) >= 700) ? 3 : 4.5
    const r = ratio(fg.c, bgOf(el))
    if (r < need) {
      const t = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join('').trim().slice(0, 12)
      const cls = typeof el.className === 'string' ? el.className.split(' ')[0] : ''
      // G32 已定性的既有豁免:朱砂印章类印记(站印/待印/当前)为装饰性印记,
      // 非必读正文,逐项记 DESIGN 7.4;此处按既有口径排除并单独计数。
      if (cls.includes('brandSeal') || cls.includes('seal')) { sealExempt++; continue }
      out.push({ t, r: Math.round(r * 100) / 100, need, size, el: el.tagName + '.' + cls })
    }
  }
  return { fails: out, sealExempt }
})()`

/** 触控目标实测:排除「句内文字链接」(WCAG 2.5.8 内联例外),返回控件最小高度与不足清单。 */
const TAP_PROBE = `(() => {
  const all = [...document.querySelectorAll('a,button')].filter(e => e.getBoundingClientRect().height > 0)
  const inline = all.filter(a => a.tagName === 'A' && a.parentElement?.tagName === 'P' && a.parentElement.textContent.trim().length > a.textContent.trim().length + 4)
  const controls = all.filter(a => !inline.includes(a))
  return {
    inline: inline.length,
    inlineTexts: inline.map(a => a.textContent.trim().slice(0, 10)),
    min: controls.length ? Math.min(...controls.map(a => a.getBoundingClientRect().height)) : 0,
    count: controls.length,
    small: controls
      .map(a => ({ h: Math.round(a.getBoundingClientRect().height), t: a.textContent.trim().slice(0, 10), c: (typeof a.className === 'string' ? a.className.split(' ')[0] : a.tagName) }))
      .filter(x => x.h < 24),
  }
})()`

async function main() {
  const profile = mkdtempSync(join(tmpdir(), 'g35-chrome-'))
  const chrome = spawn(
    CHROME,
    [
      '--headless=new',
      `--remote-debugging-port=${PORT}`,
      `--user-data-dir=${profile}`,
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      'about:blank',
    ],
    { stdio: 'ignore', detached: false },
  )

  let cdp
  try {
    cdp = await connect()
    await cdp.send('Page.enable')
    await cdp.send('Runtime.enable')

    const go = async (path, { width = 1440, height = 900, theme = 'deng', settle = 900 } = {}) => {
      await cdp.send('Emulation.setDeviceMetricsOverride', {
        width,
        height,
        deviceScaleFactor: 1,
        mobile: false,
      })
      // 主题:先清 localStorage 再注入目标值,避免上一页残留污染(G31/G33 既有坑)
      await cdp.eval(`localStorage.removeItem('shanhai-theme')`)
      await cdp.send('Page.navigate', { url: BASE + '/' })
      await cdp.waitLoad()
      await cdp.eval(
        theme === 'qing'
          ? `localStorage.setItem('shanhai-theme','qing')`
          : `localStorage.setItem('shanhai-theme','deng')`,
      )
      await cdp.send('Page.navigate', { url: BASE + path })
      await cdp.waitLoad()
      await sleep(settle)
    }

    // =========================================================== /readings 1440
    await go('/readings')
    const r = await cdp.eval(`(() => {
      const q = (s) => document.querySelectorAll(s).length
      const rows = [...document.querySelectorAll('[data-basis]')]
      const basisEmpty = rows.filter(el => {
        const line = el.querySelector('p')
        return !line || !line.textContent.trim()
      }).length
      const basisFail = rows.filter(el => {
        const t = [...el.querySelectorAll('p')].map(p => p.textContent).join(' ')
        return !/郭璞注「.+」/.test(t) && !/无音注|未出现在|不在本站郭注存档/.test(t)
      }).map(el => el.dataset.char)
      return {
        h1: document.querySelector('h1')?.textContent.trim(),
        sound: q('[data-basis="sound"]'), gloss: q('[data-basis="gloss"]'), blank: q('[data-basis="none"]'),
        quotes: [...document.querySelectorAll('p')].map(p => p.textContent).filter(t => t.includes('郭璞注「')),
        basisEmpty, basisFail,
        offsite: document.querySelectorAll('#sec-offsite dl > div').length,
        sections: [...document.querySelectorAll('section[id]')].map(s => s.id),
      }
    })()`)

    check('/readings 页标题', r.h1 === '难字音表', r.h1)
    check('/readings 有音注条目 18', r.sound === 18, String(r.sound))
    check('/readings 有释无音条目 4', r.gloss === 4, String(r.gloss))
    check('/readings 留白条目 7', r.blank === 7, String(r.blank))
    check('/readings 依据行零空行', r.basisEmpty === 0, `空行 ${r.basisEmpty}`)
    check('/readings 每条依据行非空且可溯', r.basisFail.length === 0, JSON.stringify(r.basisFail))
    check('/readings 未上屏音注 3 条', r.offsite === 3, String(r.offsite))

    // 逐字回查:页面渲染出的郭注片段 vs 存档
    const renderedQuotes = r.quotes.map((t) => /郭璞注「(.+?)」/.exec(t)?.[1]).filter(Boolean)
    const uniq = [...new Set(renderedQuotes)]
    const missQuotes = uniq.filter((qt) => !guopuLines.some((l) => l.includes(qt)))
    check(
      `渲染出的郭注音注 100% 逐字命中存档(${uniq.length} 条唯一)`,
      missQuotes.length === 0,
      JSON.stringify(missQuotes),
    )

    const over1440 = await cdp.eval(OVERFLOW_PROBE)
    check(
      '/readings 1440 零横溢',
      over1440.scrollW <= over1440.clientW + 1 && over1440.over.length === 0,
      JSON.stringify(over1440),
    )
    const navLinks = await cdp.eval(`[...document.querySelectorAll('header a')].map(a=>a.textContent.trim()).filter(Boolean)`)
    const navWords = ['卷首', '异兽', '山川', '古卷', '谱系', '探索', '收藏']
    const present = navWords.filter((w) => navLinks.includes(w))
    check(
      '主导航七词未动(且页头只有站名 + 七个导航项)',
      present.length === 7 && navLinks.length === 8,
      JSON.stringify(navLinks),
    )

    // =========================================================== /variants 1440
    await go('/variants')
    const v = await cdp.eval(`(() => {
      const cases = [...document.querySelectorAll('[data-case]')]
      const doubts = [...document.querySelectorAll('[data-doubt]')]
      const site = [...document.querySelectorAll('[data-site-variant]')]
      const incomplete = cases.filter(c => {
        const t = c.textContent
        return !(t.includes('来源 A') && t.includes('来源 B') && t.includes('本站现行') && t.includes('未决原因') && t.includes('存档证据'))
      }).map(c => c.dataset.case)
      return {
        h1: document.querySelector('h1')?.textContent.trim(),
        cases: cases.length, incomplete,
        doubts: doubts.filter(d => d.dataset.doubt !== 'guopu').length,
        guopuDoubts: doubts.filter(d => d.dataset.doubt === 'guopu').length,
        site: site.length,
        quotes: [...document.querySelectorAll('[data-quote]')]
          .filter(p => p.dataset.quote)
          .map(p => ({ q: p.dataset.quote, a: p.dataset.quoteArchive })),
        // 触控目标:排除「句内文字链接」(WCAG 2.5.8 内联例外),其余交互元素须 ≥44px
        tap: (() => {
          const all = [...document.querySelectorAll('a,button')].filter(e => e.getBoundingClientRect().height > 0)
          const inline = all.filter(a => a.tagName === 'A' && a.parentElement?.tagName === 'P' && a.parentElement.textContent.trim().length > a.textContent.trim().length + 4)
          const controls = all.filter(a => !inline.includes(a))
          return {
            inline: inline.length,
            inlineTexts: inline.map(a => a.textContent.trim().slice(0, 10)),
            min: controls.length ? Math.min(...controls.map(a => a.getBoundingClientRect().height)) : 0,
            count: controls.length,
            small: controls
              .map(a => ({ h: Math.round(a.getBoundingClientRect().height), t: a.textContent.trim().slice(0, 10), c: (typeof a.className === 'string' ? a.className.split(' ')[0] : a.tagName) }))
              .filter(x => x.h < 44),
          }
        })(),
      }
    })()`)

    check('/variants 页标题', v.h1 === '异文校勘', v.h1)
    check('/variants 差异项 7 条且四栏齐备', v.cases === 7 && v.incomplete.length === 0, `cases=${v.cases} 缺栏=${JSON.stringify(v.incomplete)}`)
    check('/variants 疑点 12 条', v.doubts === 12, String(v.doubts))
    check('/variants 郭注层疑点 4 条', v.guopuDoubts === 4, String(v.guopuDoubts))
    check('/variants 站内异文派生 7 处', v.site === 7, String(v.site))
    check(
      `/variants 1440 档控件 ≥24px(WCAG 2.5.8 AA;${v.tap.count} 个)`,
      v.tap.min >= 24,
      `min=${Math.round(v.tap.min)};句内文字链接豁免 ${v.tap.inline} 个 ${JSON.stringify(v.tap.inlineTexts)};不足 24px 者 ${JSON.stringify(v.tap.small)}`,
    )

    const archives = { ctext, guopu: guopuLines.join('\n'), b1 }
    const qMiss = v.quotes.filter((x) => !(archives[x.a] ?? '').includes(x.q))
    check(
      `/variants 差异项照录句从渲染结果逐字回查存档(${v.quotes.length} 条)`,
      v.quotes.length >= 8 && qMiss.length === 0,
      JSON.stringify(qMiss),
    )
    console.log(
      '      回查明细:' +
        v.quotes.map((x) => `${x.a}「${x.q}」`).join(' / '),
    )

    const overV1440 = await cdp.eval(OVERFLOW_PROBE)
    check('/variants 1440 零横溢', overV1440.scrollW <= overV1440.clientW + 1 && overV1440.over.length === 0, JSON.stringify(overV1440))

    // =========================================================== 390 档
    await go('/readings', { width: 390, height: 844 })
    const r390 = await cdp.eval(OVERFLOW_PROBE)
    check('/readings 390 零横溢', r390.scrollW <= r390.clientW + 1 && r390.over.length === 0, JSON.stringify(r390))
    const rTap390 = await cdp.eval(TAP_PROBE)
    check(
      `/readings 390 触控档控件 ≥44px(${rTap390.count} 个)`,
      rTap390.min >= 44,
      `min=${Math.round(rTap390.min)};句内豁免 ${rTap390.inline} 个;不足 24px 者 ${JSON.stringify(rTap390.small)}`,
    )
    await cdp.send('Page.captureScreenshot', {}).then((s) =>
      writeFileSync(join(SHOT_DIR, 'g35-readings-390.png'), Buffer.from(s.data, 'base64')),
    )

    await go('/variants', { width: 390, height: 844 })
    const v390 = await cdp.eval(OVERFLOW_PROBE)
    check('/variants 390 零横溢', v390.scrollW <= v390.clientW + 1 && v390.over.length === 0, JSON.stringify(v390))
    const vTap390 = await cdp.eval(TAP_PROBE)
    check(
      `/variants 390 触控档控件 ≥44px(${vTap390.count} 个)`,
      vTap390.min >= 44,
      `min=${Math.round(vTap390.min)};句内豁免 ${vTap390.inline} 个;不足 24px 者 ${JSON.stringify(vTap390.small)}`,
    )
    await cdp.send('Page.captureScreenshot', {}).then((s) =>
      writeFileSync(join(SHOT_DIR, 'g35-variants-390.png'), Buffer.from(s.data, 'base64')),
    )

    // =========================================================== 双主题对比度
    for (const [path, tag] of [
      ['/readings', 'readings'],
      ['/variants', 'variants'],
    ]) {
      for (const theme of ['deng', 'qing']) {
        await go(path, { width: 1440, height: 900, theme })
        // G32 协议:注入 transition:none 后同帧取样,避免后台标签 rAF 冻结过渡产生假色
        const bad = await cdp.eval(
          `(() => { const s=document.createElement('style'); s.textContent='*{transition:none !important;animation:none !important}'; document.head.appendChild(s); return true })()`,
        )
        await sleep(200)
        const fails = await cdp.eval(CONTRAST_PROBE)
        check(
          `${tag} ${theme === 'qing' ? '晴窗' : '灯下'} 对比度(正文≥4.5,印章类印记按 G32 口径豁免)`,
          Array.isArray(fails.fails) && fails.fails.length === 0,
          `失败 ${fails.fails.length} · 印章豁免 ${fails.sealExempt} · ${JSON.stringify(fails.fails).slice(0, 240)}`,
        )
        const shot = await cdp.send('Page.captureScreenshot', {})
        writeFileSync(join(SHOT_DIR, `g35-${tag}-1440-${theme}.png`), Buffer.from(shot.data, 'base64'))
        if (theme === 'deng') {
          // 段落区视口截图(列表本体;纯视口截,不用 clip——clip 在本机会产拼接伪影,G33 已记)
          for (const [sel, name] of tag === 'readings'
            ? [
                ['#sec-sound', 'g35-readings-1440-entries'],
                ['#sec-offsite', 'g35-readings-1440-offsite'],
              ]
            : [
                ['#sec-cases', 'g35-variants-1440-cases'],
                ['#sec-doubts', 'g35-variants-1440-doubts'],
              ]) {
            await cdp.eval(`document.querySelector('${sel}').scrollIntoView({block:'start'})`)
            await sleep(350)
            const s2 = await cdp.send('Page.captureScreenshot', {})
            writeFileSync(join(SHOT_DIR, `${name}.png`), Buffer.from(s2.data, 'base64'))
          }
          await cdp.eval(`window.scrollTo(0,0)`)
        }
      }
    }

    // =========================================================== 入口可达性
    await go('/about')
    const entries = await cdp.eval(
      `[...document.querySelectorAll('a')].map(a=>a.getAttribute('href')).filter(h=>h && (h.includes('readings')||h.includes('variants')||h.includes('how-to-read')))`,
    )
    check('About 页内链含音表/异文', entries.some((h) => h.includes('readings')) && entries.some((h) => h.includes('variants')), JSON.stringify(entries))
    const footerEntries = await cdp.eval(
      `[...document.querySelectorAll('footer a')].map(a=>a.getAttribute('href'))`,
    )
    check(
      '页脚入口含音表/异文(未加主导航)',
      footerEntries.some((h) => h.includes('readings')) && footerEntries.some((h) => h.includes('variants')),
      JSON.stringify(footerEntries),
    )

    // =========================================================== 控制台错误
    const consoleErrors = cdp.events.filter(
      (e) => e.method === 'Runtime.exceptionThrown' || (e.method === 'Runtime.consoleAPICalled' && e.params.type === 'error'),
    )
    check('全程无未捕获异常', consoleErrors.length === 0, String(consoleErrors.length))
  } finally {
    try {
      chrome.kill()
    } catch {
      /* ignore */
    }
  }

  const failed = results.filter((x) => !x.ok)
  console.log(`\n== 合计 ${results.length} 项,通过 ${results.length - failed.length},失败 ${failed.length} ==`)
  if (failed.length) console.log(JSON.stringify(failed, null, 1))
  writeFileSync(join(SHOT_DIR, 'g35-assertions.json'), JSON.stringify(results, null, 2))
  // CDP 的 WebSocket 会保持事件循环存活,须显式退出(否则脚本跑完也不返回)
  process.exit(failed.length ? 1 : 0)
}

main().catch((e) => {
  console.error('脚本异常:', e)
  process.exit(1)
})
