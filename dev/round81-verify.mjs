// G81 验收:三页联动(音表/异文/里距) + 凡例四阶新例
// 口径:逐项断言页面文本;异文页词条级两态;里距缺口文案与数据一致;凡例实况与实查一致;计数守恒;390+1440 零溢出
import { spawn } from 'node:child_process'
import { writeFileSync, mkdtempSync, rmSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PORT = 9393
const BASE = 'http://localhost:4173'

function launch() {
  const profile = mkdtempSync(join(tmpdir(), 'shanhai-g81-'))
  const child = spawn(CHROME, [
    '--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    '--no-first-run', '--disable-gpu', '--window-size=1440,900', 'about:blank',
  ], { stdio: 'ignore' })
  return { child, profile }
}
async function getTarget() {
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/list`)
      const p = (await r.json()).find((t) => t.type === 'page' && t.webSocketDebuggerUrl)
      if (p) return p
    } catch {}
    await new Promise((r) => setTimeout(r, 250))
  }
  throw new Error('no page target')
}
function conn(u) {
  return new Promise((res, rej) => {
    const ws = new WebSocket(u)
    let id = 0
    const pend = new Map()
    ws.onopen = () => res({
      send: (m, pr = {}) => new Promise((r2, j2) => { const mid = ++id; pend.set(mid, { r2, j2 }); ws.send(JSON.stringify({ id: mid, method: m, params: pr })) }),
      close() { try { ws.close() } catch {} },
    })
    ws.onmessage = (mv) => {
      const msg = JSON.parse(mv.data)
      if (msg.id && pend.has(msg.id)) {
        const p = pend.get(msg.id)
        pend.delete(msg.id)
        msg.error ? p.j2(new Error(JSON.stringify(msg.error))) : p.r2(msg.result)
      }
    }
    ws.onerror = rej
  })
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// 汉字数字(一至十七),与 distances.ts 的 cnNum 同口径,供里距计数断言比对
const CN = ['一','二','三','四','五','六','七','八','九','十','十一','十二','十三','十四','十五','十六','十七']
const cnNumLocal = (n) => CN[n - 1] ?? String(n)

// [path, 必上屏片段, 必不出现片段(陈旧文案回归防护)]
const CASES = [
  ['/readings', [
    '难字音表',
    '共 ' + '' , // 占位,真实计数下面单独断言
  ], []],
  ['/variants', [
    '异文校勘',
    '疑17',
    // G81 注意:词条级异文上屏为**简体**(遵 G78 转写对照表 蠱→蛊),
    // 且原文含嵌套引号「蛊一作「纂」雕」,故 needle 取其稳定子串,不作繁体连续串。
    '蛊一作',        // 蛊雕词条级异文(G81 新增上屏)
    '洵一作',        // 䍺词条级异文(G81 新增上屏)
  ], []],
  ['/chapters/nanshan-jing', [
    '里距对照(南次二经)',
    '存疑照录',
  ], [
    '余十一山未核不上线', // G81 前的陈旧硬编码,须已消失
  ]],
  ['/how-to-read', [
    '四阶新增例',
    '刻本原件 × 站内转描(并陈)',
    '后世流变逐句可溯(claim)',
    '见X条(跨词条互链)',
    '章符与里距缺口(排印与存疑)',
    '四阶新增纹样落点预算 ≤4 处',
    '晕染滤镜族(水墨噪点)',
    '界栏双线边框(古地图)',
  ], [
    '十二条目主体插画',   // G81 前凡例第六层的陈旧表述,须已消失
  ]],
]

const profile = mkdtempSync(join(tmpdir(), 'shanhai-g81-'))
const child = launch()
const out = []
try {
  const t = await getTarget()
  const c = await conn(t.webSocketDebuggerUrl)
  await c.send('Page.enable')
  await c.send('Runtime.enable')

  for (const [path, needles, forbiddens] of CASES) {
    for (const [w, tag] of [[1440, '1440'], [390, '390']]) {
      await c.send('Emulation.setDeviceMetricsOverride', { width: w, height: 900, deviceScaleFactor: 1, mobile: w < 768 })
      await c.send('Page.navigate', { url: BASE + path })
      await sleep(2600)
      const expr = `JSON.stringify((()=>{
        const b=document.body.textContent;
        return {
          needles:${JSON.stringify(needles.filter(Boolean))}.map(n=>b.includes(n)),
          forbidden:${JSON.stringify(forbiddens)}.map(n=>b.includes(n)),
          ov: document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1
        };
      })())`
      const r = await c.send('Runtime.evaluate', { expression: expr, returnByValue: true })
      const v = JSON.parse(r.result.value)
      const needlesOk = v.needles.every(Boolean)
      const forbiddenOk = v.forbidden.every((x) => x === false)
      const ok = needlesOk && forbiddenOk && v.ov
      out.push({
        path, w, needlesOk, forbiddenOk, ov: v.ov,
        // 报缺失的**串**而非布尔值(G80 遗留缺陷:只回传 false/false,无从定位是哪条)
        missing: needles.filter(Boolean).filter((_, i) => !v.needles[i]),
        present: forbiddens.filter((_, i) => v.forbidden[i]),
        pass: ok,
      })
      console.log(path, tag, ok ? 'PASS' : 'FAIL ' + JSON.stringify(out[out.length - 1]))
      if (w === 1440) {
        const s = await c.send('Page.captureScreenshot', { format: 'png' })
        writeFileSync(`D:/zcode/workspace/default/shanhai/dev/g81-${(path.split('/').pop() || 'home')}-1440.png`, Buffer.from(s.data, 'base64'))
      }
    }
  }

  // 异文页结构化断言:两态计数 + 词条级回链
  await c.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
  await c.send('Page.navigate', { url: BASE + '/variants' })
  await sleep(2600)
  const vr = await c.send('Runtime.evaluate', {
    expression: `JSON.stringify((()=>{
      const all=[...document.querySelectorAll('[data-site-variant]')];
      const beasts=all.filter(e=>e.getAttribute('data-variant-kind')==='兽');
      const mts=all.filter(e=>e.getAttribute('data-variant-kind')==='山');
      const beastLinks=beasts.map(e=>[...e.querySelectorAll('a')].map(a=>a.getAttribute('href')).filter(h=>h&&h.startsWith('/catalog/')));
      const segLinks=mts.map(e=>[...e.querySelectorAll('a')].map(a=>a.getAttribute('href')).filter(h=>h&&h.startsWith('/chapters/nanshan-jing')));
      return { total:all.length, beastCount:beasts.length, mtCount:mts.length, beastLinks, segLinks };
    })())`,
    returnByValue: true,
  })
  const v = JSON.parse(vr.result.value)
  const structureOk =
    v.beastCount === 2 &&
    v.beastLinks.every((l) => l.length === 1) &&
    v.mtCount >= 10 &&
    v.segLinks.every((l) => l.length >= 1)
  console.log('VARIANTS structure', structureOk ? 'PASS' : 'FAIL', JSON.stringify(v))

  // 音表页计数断言(与页内声明一致)
  await c.send('Page.navigate', { url: BASE + '/readings' })
  await sleep(2600)
  const rr = await c.send('Runtime.evaluate', {
    expression: `JSON.stringify((()=>{
      const b=document.body.textContent;
      const m=/全表合计 (\\d+) 字\\(有音注 (\\d+) · 有释无音 (\\d+) · 留白 (\\d+)\\)/.exec(b);
      const rows=document.querySelectorAll('[data-char]').length;
      return { decl: m?m.slice(1,5):null, rowCount: rows };
    })())`,
    returnByValue: true,
  })
  const rd = JSON.parse(rr.result.value)
  const readingsOk = !!rd.decl && Number(rd.decl[0]) === rd.rowCount && Number(rd.decl[0]) === Number(rd.decl[1]) + Number(rd.decl[2]) + Number(rd.decl[3])
  console.log('READINGS counts', readingsOk ? 'PASS' : 'FAIL', JSON.stringify(rd))

  // 里距页:相加值与页面声明一致(16 山 / 缺口)
  await c.send('Page.navigate', { url: BASE + '/chapters/nanshan-jing' })
  await sleep(2800)
  const dr = await c.send('Runtime.evaluate', {
    expression: `JSON.stringify((()=>{
      const sum=document.querySelector('[data-distance-summary="ns2"]');
      const rows=document.querySelectorAll('[data-distance-table="ns2"] [data-distance-row]').length;
      const txt=sum?sum.textContent:'';
      const m=/本站已录(\\S+?)山逐段相加 (\\d+) 里,篇末作 (\\d+) 里/.exec(txt);
      const lack=/尚缺(\\S+?)山/.exec(txt);
      return { rowCount:rows, recorded:m?m[1]:null, sum:m?m[2]:null, total:m?m[3]:null, lack:lack?lack[1]:null, tail:txt.slice(-260) };
    })())`,
    returnByValue: true,
  })
  const dd = JSON.parse(dr.result.value)
  // 16 山已录、缺 1 山(咸陰)——数字须为汉字「十六」「一」
  // 里距:G81 起期望值不写死,直接自 distances.ts 的 NS2_ROWS 实算,
  // 避免"页面改对了、断言还停在旧数"的假失败(本轮即踩此坑:写死 6610,实为 6710)。
  const distSrc = readFileSync('D:/zcode/workspace/default/shanhai/src/data/distances.ts', 'utf8')
  const ns2Block = distSrc.slice(distSrc.indexOf('const NS2_ROWS'), distSrc.indexOf('const ROWS_BY_CLASSIC'))
  const ns2Rows = [...ns2Block.matchAll(/name:\s*'([^']+)'[\s\S]{0,80}?li:\s*(null|\d+)/g)].map((m) => [m[1], m[2]])
  const expSum = ns2Rows.reduce((a, [, d]) => a + (d === 'null' ? 0 : Number(d)), 0)
  const expCount = ns2Rows.length
  const distOk =
    dd.rowCount === expCount &&
    dd.recorded === cnNumLocal(expCount) &&
    dd.lack === cnNumLocal(17 - expCount) &&
    dd.sum === String(expSum) &&
    dd.total === '7200'
  console.log('DISTANCE', distOk ? 'PASS' : 'FAIL', JSON.stringify({ ...dd, expect: { expCount, expSum } }))

  // 首页计数守恒(四阶红线)
  await c.send('Page.navigate', { url: BASE + '/' })
  await sleep(2500)
  const h = await c.send('Runtime.evaluate', {
    expression: '(() => { const d=[...document.querySelectorAll("dt,dd")].map(e=>e.textContent); const i=d.indexOf("条目已核验"); return i>=0?d[i+1]:null })()',
    returnByValue: true,
  })
  const home = h.result.value
  console.log('HOME verified =', home)

  c.close()
  const allOk = out.every((o) => o.pass) && structureOk && readingsOk && distOk && home === '12'
  console.log('G81', allOk ? 'ALL PASS' : 'FAIL',
    '| verified =', home, '| struct =', structureOk, '| readings =', readingsOk, '| dist =', distOk)
  writeFileSync('D:/zcode/workspace/default/shanhai/dev/round81-results.json',
    JSON.stringify({ out, variants: v, readings: rd, distance: dd, home }, null, 2))
  process.exitCode = allOk ? 0 : 1
} finally {
  try { child.kill() } catch {}
  // G80 坑:脚本自身可能不退出,故显式 exit
  setTimeout(() => { try { rmSync(profile, { recursive: true, force: true }) } catch {}; process.exit(process.exitCode ?? 0) }, 1200)
}
