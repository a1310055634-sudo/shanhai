// G72 验收:夷山/僕勾扩录 —— 逐字/章符/gap/地图零重叠/计数/里距
import { spawn } from 'node:child_process'
import { writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PORT = 9373
const BASE = 'http://localhost:4173'
const OUT = 'D:/zcode/workspace/default/shanhai/dev/'

const EXPECT = {
  quwu: '又东五百里，曰区吴之山，无草木，多沙石。鹿水出焉，而南流注于滂水。',
  luwu: '又东五百里，曰鹿吴之山，上无草木，多金石。泽更之水出焉，而南流注于滂水。水有兽焉，名曰蛊雕，其状如雕而有角，其音如婴儿之音，是食人。',
  qiwu: '东五百里，曰漆吴之山，无草木，多博石，无玉。处于东海，望丘山，其光载出载入，是惟日次。',
}

const CHAPTER_EVAL = `(() => {
  const q = (s) => document.querySelector(s)
  const qa = (s) => [...document.querySelectorAll(s)]
  const segText = (id) => {
    const el = q('#' + id)
    if (!el) return null
    const t = el.querySelector('[class*="text"]')
    if (!t) return null
    const clone = t.cloneNode(true)
    clone.querySelectorAll('rt').forEach((r) => r.remove())
    return clone.textContent
  }
  const tags = qa('[class*="sectionTag"]').map((t) => ({ seg: t.closest('[id]')?.id ?? '', before: getComputedStyle(t, '::before').content || '' }))
  const gaps = qa('[class*="gapMark"]').map((g) => g.textContent)
  return {
    h1: !!q('h1'),
    quwu: segText('seg-ns2-quwu-shan'),
    luwu: segText('seg-ns2-luwu-shan'),
    qiwu: segText('seg-ns2-qiwu-shan'),
    marks: ['seg-ns2-quwu-shan', 'seg-ns2-luwu-shan', 'seg-ns2-qiwu-shan'].every((id) =>
      tags.some((t) => t.seg === id && t.before.includes('其') && t.before.includes('cjk-ideographic'))),
    gapUpdated: gaps.some((g) => g.includes('咸陰之山里距两源互异')),
    segCount: qa('[class*="segment"]').length,
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
  }
})()`

const ATLAS_EVAL = `(() => {
  const qa = (s) => [...document.querySelectorAll(s)]
  const texts = qa('svg text')
  const rects = texts.map((t) => t.getBoundingClientRect())
  let overlaps = 0
  const pairs = []
  for (let i = 0; i < rects.length; i++) {
    for (let j = i + 1; j < rects.length; j++) {
      const a = rects[i], b = rects[j]
      const ix = Math.min(a.right, b.right) - Math.max(a.left, b.left)
      const iy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)
      if (ix > 1 && iy > 1) { overlaps += 1; pairs.push(texts[i].textContent + '<>' + texts[j].textContent) }
    }
  }
  const names = texts.map((t) => t.textContent)
  const seals = qa('svg rect[fill="var(--cinnabar)"]').filter((r) => r.getAttribute('width') === '12').length
  const rings = qa('svg circle[stroke-dasharray="3 2"]').length
  return {
    overlaps, pairs, seals, rings,
    hasNew: ['区吴之山', '鹿吴之山', '漆吴之山'].every((n) => names.includes(n)),
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
  }
})()`

const HOME_EVAL = `(() => {
  const dts = [...document.querySelectorAll('dt,dd')].map((e) => e.textContent)
  const i = dts.indexOf('条目已核验')
  return { verified: i >= 0 ? dts[i + 1] : null }
})()`

const DT_EVAL = `(() => {
  const b = document.body.textContent
  return { quwuRow: b.includes('区吴之山'), luwuRow: b.includes('鹿吴之山'), qiwuRow: b.includes('漆吴之山'), closedLoop: b.includes('7,200') || b.includes('7200') || b.includes('七千二百里') }
})()`

function launch() {
  const profile = mkdtempSync(join(tmpdir(), 'shanhai-g72-'))
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
const out = { chapter: null, atlas: null, atlas390: null, home: null, dt: null, pass: false }
try {
  const target = await getTarget()
  const cdp = await connect(target.webSocketDebuggerUrl)
  await cdp.send('Page.enable')

  async function go(path, w, h, theme) {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 700 })
    await cdp.send('Page.navigate', { url: BASE + path })
    await sleep(2400)
    await cdp.send('Runtime.evaluate', { expression: `try{localStorage.setItem('shanhai-theme','${theme}')}catch(e){}; location.reload()`, awaitPromise: false })
    await sleep(2600)
  }

  await go('/chapters/nanshan-jing', 1440, 900, 'deng')
  let r = await cdp.send('Runtime.evaluate', { expression: CHAPTER_EVAL, returnByValue: true })
  const ch = r.result.value
  const chChecks = {
    quwuVerbatim: ch.quwu === EXPECT.quwu,
    luwuVerbatim: ch.luwu === EXPECT.luwu,
    qiwuVerbatim: ch.qiwu === EXPECT.qiwu,
    marks: ch.marks,
    gapUpdated: ch.gapUpdated,
    annotateAlive: ch.h1 === true && ch.segCount >= 17,
    noOverflow: ch.scrollW <= ch.clientW + 1,
  }
  out.chapter = { values: ch, checks: chChecks }
  console.log('CHAPTER', JSON.stringify(chChecks))
  const s1 = await cdp.send('Page.captureScreenshot', { format: 'png' })
  writeFileSync(OUT + 'g74-chapter-deng-1440.png', Buffer.from(s1.data, 'base64'))

  await go('/atlas', 1440, 900, 'deng')
  r = await cdp.send('Runtime.evaluate', { expression: ATLAS_EVAL, returnByValue: true })
  const at = r.result.value
  const atChecks = { newNodes: at.hasNew, sealsOk: at.seals === 17, ringsOk: at.rings === 16, noOverlap: at.overlaps === 0, noOverflow: at.scrollW <= at.clientW + 1 }
  out.atlas = { values: at, checks: atChecks }
  console.log('ATLAS', JSON.stringify(atChecks), `(seals=${at.seals} rings=${at.rings} ov=${at.overlaps}) pairs=${JSON.stringify(at.pairs)}`)
  const s2 = await cdp.send('Page.captureScreenshot', { format: 'png' })
  writeFileSync(OUT + 'g74-atlas-deng-1440.png', Buffer.from(s2.data, 'base64'))

  await go('/atlas', 390, 844, 'deng')
  r = await cdp.send('Runtime.evaluate', { expression: ATLAS_EVAL, returnByValue: true })
  out.atlas390 = { overlaps: r.result.value.overlaps, pass: r.result.value.overlaps === 0 }
  console.log('ATLAS390 ov', r.result.value.overlaps)

  await go('/', 1440, 900, 'deng')
  r = await cdp.send('Runtime.evaluate', { expression: HOME_EVAL, returnByValue: true })
  out.home = r.result.value
  console.log('HOME verified =', r.result.value.verified)

  await go('/chapters/nanshan-jing', 1440, 900, 'deng')
  r = await cdp.send('Runtime.evaluate', { expression: DT_EVAL, returnByValue: true })
  out.dt = r.result.value
  console.log('DT', JSON.stringify(r.result.value))
  cdp.close()
} finally {
  try { child.kill() } catch {}
  setTimeout(() => { try { rmSync(profile, { recursive: true, force: true }) } catch {} }, 1500)
}

const allPass =
  Object.values(out.chapter?.checks ?? {}).every(Boolean) &&
  Object.values(out.atlas?.checks ?? {}).every(Boolean) &&
  out.atlas390?.pass &&
  out.home?.verified === '12' &&
  Object.values(out.dt ?? {}).every(Boolean)
out.pass = allPass
writeFileSync(OUT + 'round74-results.json', JSON.stringify(out, null, 2))
console.log('G72', allPass ? 'ALL PASS' : 'FAIL', '| verified =', out.home?.verified)
process.exitCode = allPass ? 0 : 1
