/**
 * G38 二阶终验 · 回归矩阵与收官取证(无头 Chrome + CDP)。
 *
 * 覆盖:14 路由渲染/溢出/触控矩阵、八站深链、无效参数、进度恢复、抽屉开合、
 * 锚点偏移、控制台清零、GALLERY_FINAL2/ 收官截图。
 * 不新增任何功能,只做验证与取证。
 *
 * 前置:preview 在 http://localhost:4173。运行:node dev/round38-final.mjs
 */
import { writeFileSync, mkdirSync, mkdtempSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { tmpdir } from 'node:os'
import { spawn, execSync } from 'node:child_process'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const BASE = 'http://localhost:4173'
const PORT = 9338
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const OUT = join(root, 'GALLERY_FINAL2')
mkdirSync(OUT, { recursive: true })

const HEAD = execSync('git rev-parse --short HEAD', { cwd: root }).toString().trim()
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
  errors() {
    return this.events.filter(
      (e) => e.method === 'Runtime.exceptionThrown' ||
        (e.method === 'Runtime.consoleAPICalled' && e.params.type === 'error'),
    )
  }
}

const PROBE = `(() => {
  const de = document.documentElement
  // 祖先若横向滚动(auto/scroll)或裁剪(hidden/clip),其内部超界元素不产生页面滚动
  const clipped = (el) => { let n = el.parentElement
    while (n && n !== document.body) { const ox = getComputedStyle(n).overflowX
      if (ox === 'auto' || ox === 'scroll' || ox === 'hidden' || ox === 'clip') return true
      n = n.parentElement } return false }
  const over = []
  for (const el of document.querySelectorAll('body *')) {
    if (el.ownerSVGElement) continue
    const r = el.getBoundingClientRect()
    if (r.width > 0 && (r.right > de.clientWidth + 1 || r.left < -1) && !clipped(el))
      over.push((typeof el.className === 'string' ? el.className.split(' ')[0] : el.tagName) + ':' + Math.round(r.right))
  }
  const all = [...document.querySelectorAll('a,button')].filter(e => e.getBoundingClientRect().height > 0)
  const inline = all.filter(a => a.tagName === 'A' && a.parentElement?.tagName === 'P' && a.parentElement.textContent.trim().length > a.textContent.trim().length + 4)
  const controls = all.filter(a => !inline.includes(a))
  return {
    h1: document.querySelector('h1')?.textContent.trim() ?? '',
    scrollW: de.scrollWidth, clientW: de.clientWidth, over: [...new Set(over)].slice(0, 5),
    minTap: controls.length ? Math.min(...controls.map(a => a.getBoundingClientRect().height)) : 0,
  }
})()`

const ROUTES = [
  ['/', 'home'], ['/catalog', 'catalog'], ['/catalog/jiuweihu', 'entity-jiuweihu'],
  ['/atlas', 'atlas'], ['/chapters', 'chapters'], ['/chapters/nanshan-jing', 'chapter-nanshan'],
  ['/relations', 'relations'], ['/explore', 'explore'], ['/journeys/nanci-yi', 'journey'],
  ['/favorites', 'favorites'], ['/about', 'about'], ['/how-to-read', 'how-to-read'],
  ['/readings', 'readings'], ['/variants', 'variants'],
]

const STATIONS = ['loc-zhaoyao', 'loc-tangting', 'loc-yuanyi', 'loc-chuyang', 'loc-danyuan', 'loc-jishan', 'loc-qingqiu', 'loc-jiwei']

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
  const profile = mkdtempSync(join(tmpdir(), 'g38-chrome-'))
  const matrix = []
  const m390 = []
  const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--hide-scrollbars',
    '--force-device-scale-factor=1', 'about:blank'], { stdio: 'ignore' })
  let cdp
  try {
    cdp = await connect()
    await cdp.send('Page.enable')
    await cdp.send('Runtime.enable')

    const go = async (path, { width = 1440, height = 900, settle = 850 } = {}) => {
      await cdp.send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false })
      const before = cdp.events.length
      await cdp.send('Page.navigate', { url: BASE + path })
      await cdp.waitLoad()
      await sleep(settle)
      return cdp.events.slice(before)
    }

    // ============ 1. 路由回归矩阵(1440 + 390)
    const matrix = []
    let matrixErr = 0
    for (const [route, name] of ROUTES) {
      const ev = await go(route)
      const p = await cdp.eval(PROBE)
      const errs = ev.filter((e) => e.method === 'Runtime.exceptionThrown' || (e.method === 'Runtime.consoleAPICalled' && e.params.type === 'error'))
      matrixErr += errs.length
      const shot = await cdp.send('Page.captureScreenshot', {})
      writeFileSync(join(OUT, `final-1440-${name}.png`), Buffer.from(shot.data, 'base64'))
      matrix.push({ route, h1: p.h1, scrollW: p.scrollW, clientW: p.clientW, over: p.over, ok1440: p.scrollW <= p.clientW + 1 && p.over.length === 0, errs: errs.length })
    }
    check('14 路由 1440 渲染有 h1', matrix.every((m) => m.h1.length > 0), matrix.filter((m) => !m.h1).map((m) => m.route).join(' '))
    check('14 路由 1440 零横溢', matrix.every((m) => m.ok1440), JSON.stringify(matrix.filter((m) => !m.ok1440)))
    check('14 路由控制台清零', matrixErr === 0, `累计 ${matrixErr} 条`)

    for (const [route] of ROUTES) {
      await go(route, { width: 390, height: 844, settle: 700 })
      const p = await cdp.eval(PROBE)
      m390.push({ route, ok: p.scrollW <= p.clientW + 1 && p.over.length === 0, minTap: Math.round(p.minTap), scrollW: p.scrollW, clientW: p.clientW, over: p.over })
    }
    check('14 路由 390 零横溢', m390.every((m) => m.ok), JSON.stringify(m390.filter((m) => !m.ok)))
    check('14 路由 390 触控档控件 ≥44px', m390.every((m) => m.minTap >= 44), m390.map((m) => `${m.route}=${m.minTap}`).join(' '))

    // ============ 2. 八站深链
    const deep = []
    for (const id of STATIONS) {
      await go(`/journeys/nanci-yi?station=${id}`)
      const r = await cdp.eval(`(() => {
        const hrefs = [...document.querySelectorAll('a')].map(a => a.getAttribute('href') || '')
        const self = hrefs.filter(h => h.includes('station='))
        return { count: self.length, hasSelf: self.some(h => h.includes('station=${id}')), text: document.body.innerText.length }
      })()`)
      deep.push({ id, ...r })
    }
    check(
      '八站深链 ?station= 全部被页面采纳(回链自证)',
      deep.every((d) => d.hasSelf),
      deep.map((d) => `${d.id}:${d.hasSelf ? 'ok' : 'NO'}`).join(' '),
    )

    // ============ 3. 无效参数
    const inv = {}
    await go('/catalog/__no_such_entity__')
    inv.entityText = await cdp.eval(`document.body.innerText.includes('此条尚未收录')`)
    await go('/chapters/__no_such_chapter__')
    inv.chapterText = await cdp.eval(`document.body.innerText.includes('尚未录入') || document.body.innerText.includes('尚未开放')`)
    await go('/journeys/__no_such_route__')
    inv.route404 = await cdp.eval(`!!document.querySelector('h1') && !document.body.innerText.includes('南次一经') || document.body.innerText.includes('404') || document.body.innerText.includes('未找到')`)
    await go('/journeys/nanci-yi?station=__bogus__')
    const bogusProbe = await cdp.eval(PROBE)
    inv.bogusOk = bogusProbe.h1.length > 0 && bogusProbe.scrollW <= bogusProbe.clientW + 1
    check('无效 slug:词条页给出「此条尚未收录」', inv.entityText === true, String(inv.entityText))
    check('无效 slug:篇章页给出未录入说明', inv.chapterText === true, String(inv.chapterText))
    check('无效 slug:行旅页走 404/未找到分支不崩', inv.route404 === true, String(inv.route404))
    check('无效 ?station= 参数不崩且不横溢', inv.bogusOk === true, String(inv.bogusOk))

    // ============ 4. 进度恢复
    await go('/journeys/nanci-yi')
    await cdp.eval(`(() => { try { localStorage.setItem('shanhai:journey-progress','loc-chuyang') } catch(e){} return 1 })()`)
    await go('/journeys/nanci-yi')
    const resume = await cdp.eval(`(() => {
      const a = [...document.querySelectorAll('a')].map(x => x.getAttribute('href') || '').filter(h => h.includes('station='))
      return { has: a.some(h => h.includes('loc-chuyang')), list: a.slice(0, 3) }
    })()`)
    check('行旅进度恢复:写入进度后重载指向该站', resume.has === true, JSON.stringify(resume.list))

    await go('/chapters/nanshan-jing')
    await sleep(700)
    const hist = await cdp.eval(`(() => { try { return localStorage.getItem('shanhai:reading') || '' } catch(e){ return '' } })()`)
    await go('/favorites')
    const favText = await cdp.eval(`document.body.innerText`)
    check('阅读历史落盘(实体 slug)', hist.includes('jiuweihu') || hist.includes('nanshan'), hist.slice(0, 80))
    check('收藏页恢复阅读历史', favText.includes('九尾狐') || favText.includes('最近'), favText.slice(0, 80))

    // ============ 5. 抽屉开合(JournalEvidence 由 JournalScene 在行旅页渲染)
    await go('/journeys/nanci-yi')
    const drawer = await cdp.eval(`(() => {
      const btn = [...document.querySelectorAll('button')].find(b => b.textContent.includes('看原文与出处'))
      if (!btn) return { found: false }
      btn.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      const dlg = document.querySelector('[role="dialog"][aria-modal="true"]')
      const closeBtn = [...document.querySelectorAll('button')].find(b => b.getAttribute('aria-label') === '关闭原文与出处')
      return { found: true, opened: !!dlg, hasClose: !!closeBtn }
    })()`)
    await sleep(300)
    const afterOpen = await cdp.eval(`(() => {
      const closeBtn = [...document.querySelectorAll('button')].find(b => b.getAttribute('aria-label') === '关闭原文与出处')
      const dlg = document.querySelector('[role="dialog"][aria-modal="true"]')
      if (closeBtn) closeBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      return { opened: !!dlg, hasClose: !!closeBtn }
    })()`)
    await sleep(300)
    const afterClose = await cdp.eval(`!!document.querySelector('[role="dialog"][aria-modal="true"]')`)
    check('证据抽屉可开/可关且带 aria-modal', drawer.found && afterOpen.opened && !afterClose, JSON.stringify({ found: drawer.found, openedAfter300ms: afterOpen.opened, hasClose: afterOpen.hasClose, stillOpenAfterClose: afterClose }))

    // ============ 6. 锚点偏移(scroll-margin-top:124px;须先在古卷页)
    await go('/chapters/nanshan-jing')
    const anchors = await cdp.eval(`(() => {
      const segs = [...document.querySelectorAll('[data-seg-id]')].map(e => e.id).filter(Boolean)
      return segs.slice(0, 4)
    })()`)
    check('古卷页存在锚点段(抽样前提)', anchors.length >= 3, `取到 ${anchors.length} 个:${anchors.join(' ')}`)
    const anchorRes = []
    for (const id of anchors) {
      const r = await cdp.eval(`(() => {
        const el = document.getElementById(${JSON.stringify(id)})
        if (!el) return { id, ok: false, why: 'missing' }
        history.replaceState(null, '', '#' + el.id)
        el.scrollIntoView()
        const cs = getComputedStyle(el)
        const top = el.getBoundingClientRect().top
        return { id: el.id, top: Math.round(top), margin: cs.scrollMarginTop, ok: true }
      })()`)
      anchorRes.push(r)
    }
    const anchorBad = anchorRes.filter((a) => !a.ok || a.margin !== '124px' || Math.abs(a.top - 124) > 3)
    check(
      `锚点抽样 ${anchorRes.length} 个:scroll-margin-top=124px 且落位一致`,
      anchorRes.length >= 3 && anchorBad.length === 0,
      JSON.stringify(anchorRes.length < 3 ? { why: '抽样不足,不判通过', anchorRes } : anchorBad.length ? anchorBad : anchorRes.map((a) => `${a.id}=${a.top}`)),
    )

    // ============ 7. 收尾截图(390 + 目录页)
    await go('/', { width: 390, height: 844 })
    writeFileSync(join(OUT, 'final-390-home.png'), Buffer.from((await cdp.send('Page.captureScreenshot', {})).data, 'base64'))
    await go('/chapters/nanshan-jing', { width: 390, height: 844 })
    writeFileSync(join(OUT, 'final-390-chapter.png'), Buffer.from((await cdp.send('Page.captureScreenshot', {})).data, 'base64'))
    await go('/relations', { width: 390, height: 844 })
    writeFileSync(join(OUT, 'final-390-relations.png'), Buffer.from((await cdp.send('Page.captureScreenshot', {})).data, 'base64'))

    // ============ 8. 构建版本戳
    const stamp = await cdp.eval(`[...document.querySelectorAll('footer p')].map(p=>p.textContent).find(t=>t.includes('校讫记')) ?? ''`)
    check(`页脚版本戳 = HEAD(${HEAD})`, stamp.includes(HEAD), stamp.trim())
  } finally {
    try { chrome.kill() } catch { /* ignore */ }
  }
  const failed = results.filter((r) => !r.ok)
  console.log(`\n== 合计 ${results.length} 项,通过 ${results.length - failed.length},失败 ${failed.length} ==`)
  if (failed.length) console.log(JSON.stringify(failed, null, 1))
  writeFileSync(join(OUT, 'final-assertions.json'), JSON.stringify({ head: HEAD, results, matrix }, null, 2))
  process.exit(failed.length ? 1 : 0)
}

main().catch((e) => { console.error('脚本异常:', e); process.exit(1) })
