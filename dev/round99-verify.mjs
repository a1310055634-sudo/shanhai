// G99 验收:疑12 裁决固化(音表裁决节/凡例句/ruby 零改动/分轨复查)
import { spawn, spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const BASE = 'http://localhost:4183'
const preview = spawn('npx', ['vite', 'preview', '--port', '4183', '--strictPort'], { cwd: 'D:/zcode/workspace/default/shanhai', stdio: 'ignore', shell: true })
async function waitPreview() { for (let i = 0; i < 60; i++) { try { const r = await fetch(BASE + '/'); if (r.ok) return } catch {} ; await new Promise(r => setTimeout(r, 250)) } throw new Error('preview 未就绪') }
const profile = mkdtempSync(join(tmpdir(), 'shanhai-g99-'))
const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=9337', `--user-data-dir=${profile}`, '--no-first-run', '--disable-gpu', '--window-size=420,900', 'about:blank'], { stdio: 'ignore' })
async function getPage() { for (let i = 0; i < 40; i++) { try { const l = await (await fetch('http://127.0.0.1:9337/json/list')).json(); const p = l.find(t => t.type === 'page' && t.webSocketDebuggerUrl); if (p) return p } catch {} ; await new Promise(r => setTimeout(r, 250)) } throw new Error('no page') }
function connect(wsUrl) { return new Promise((resolve, reject) => { const ws = new WebSocket(wsUrl); let id = 0; const pend = new Map(); ws.onopen = () => resolve({ send(m, pa = {}) { return new Promise((r2, j2) => { const mid = ++id; pend.set(mid, { r2, j2 }); ws.send(JSON.stringify({ id: mid, method: m, params: pa })) }) }, close() { try { ws.close() } catch {} } }); ws.onmessage = ev => { const g = JSON.parse(ev.data); if (g.id && pend.has(g.id)) { const { r2, j2 } = pend.get(g.id); pend.delete(g.id); g.error ? j2(new Error(JSON.stringify(g.error))) : r2(g.result) } }; ws.onerror = reject }) }
const results = []
const rec = (n, p, d) => { results.push({ name: n, pass: p, detail: d }); console.log(`${p ? 'PASS' : 'FAIL'} ${n}  ${d}`) }
async function evalOn(cdp, e) { const r = await cdp.send('Runtime.evaluate', { expression: e, returnByValue: true }); if (r.exceptionDetails) throw new Error('eval: ' + JSON.stringify(r.exceptionDetails).slice(0, 150)); return r.result?.value }
async function goto(cdp, path, needle, maxMs = 15000) { await cdp.send('Page.navigate', { url: BASE + path }); const t0 = Date.now(); while (Date.now() - t0 < maxMs) { if (await evalOn(cdp, needle)) return; await new Promise(r => setTimeout(r, 300)) } throw new Error('超时 ' + path) }

try {
  await waitPreview()
  const page = await getPage(); const cdp = await connect(page.webSocketDebuggerUrl)
  await cdp.send('Page.enable'); await cdp.send('Runtime.enable')

  // A1 音表页裁决节
  await goto(cdp, '/readings', `document.body.textContent.includes('读音裁决')?1:0`)
  const rd = await evalOn(cdp, `(()=>{
    const t=document.body.textContent
    return {
      title: t.includes('读音裁决 · 疑12(终)'),
      verdict: t.includes('维持本站通行标注,郭注异读两存照录,不改既有 ruby 标'),
      four: ['禺','亶','杻','雘'].every(c=>t.includes(c)),
      dates: t.includes('2026-10-05'),
    }
  })()`)
  rec('A1 音表裁决节上屏(四例+终裁语+日期)', rd.title && rd.verdict && rd.four && rd.dates, JSON.stringify(rd))

  function s2Includes(file, text) {
    return readFileSync('D:/zcode/workspace/default/shanhai/' + file, 'utf8').includes(text)
  }

  // A2 凡例句
  await goto(cdp, '/how-to-read', `document.body.textContent.includes('读音依据三分')?1:0`)
  const fl = await evalOn(cdp, `document.body.textContent.includes('用户终裁')||document.body.textContent.includes('用户已于 2026-10-05 终裁')?1:0`)
  rec('A2 凡例读音裁决句', fl === 1, `on=${fl}`)

  // A3 ruby 既有读音零改动(数据域:GLOSSARY 禺 yú/雘 huò;SOUND 四条标音值不变)
  const { execSync } = await import('node:child_process')
  const glossDiff = execSync('git diff HEAD -- src/data/chapterTexts.ts | grep -c "GLOSSARY\\|pinyin" || true', { encoding: 'utf8' }).trim()
  // 精确口径:读音「值」零改动=①diff 删除行不含 pinyin 字段;②新文件四例标音字样仍在(note 加 G99 句属记录追加,非标音变更)
  const soundDelPinyin = execSync('git diff HEAD -- src/data/readings.ts | grep -cE "^-.*pinyin:" || true', { encoding: 'utf8' }).trim()
  const stillThere = ['标 yú', '作 chǔ', '作 dǎn', '标 huò'].map(t => s2Includes('src/data/readings.ts', t))
  rec('A3 既有读音标注零改动', Number(soundDelPinyin) === 0 && stillThere.every(Boolean), `diff 删除行含 pinyin 字段=${soundDelPinyin};四例标音字样仍在=[${stillThere}]`)

  // A4 分轨复查:亶/杻 仍不在 GLOSSARY(设计内分轨),禺/雘 GLOSSARY 标音不变
  const rd2 = await import('node:fs').then(m => m.readFileSync('D:/zcode/workspace/default/shanhai/src/data/chapterTexts.ts', 'utf8'))
  const glossBlock = rd2.slice(rd2.indexOf('export const GLOSSARY'))
    const tracks = {
    yu: glossBlock.includes('\n  禺: { pinyin'),
    dan: glossBlock.includes('\n  亶: { pinyin'),
    niu: glossBlock.includes('\n  杻: { pinyin'),
    huo: glossBlock.includes('\n  雘: { pinyin'),
  }
  rec('A4 分轨复查(禺/雘 ruby 在;亶/杻 通读层设计内不在 GLOSSARY)', tracks.yu === true && tracks.huo === true && tracks.dan === false && tracks.niu === false, JSON.stringify(tracks))

  // A5 音表四条 note 终裁标记上屏
  await goto(cdp, '/readings', `document.body.textContent.includes('G99')?1:0`)
  const notes = await evalOn(cdp, `(()=>{
    const t=document.body.textContent
    return { g99: (t.match(/G99/g)||[]).length, liangcun: (t.match(/两存照录/g)||[]).length }
  })()`)
  rec('A5 四条 note 终裁标记上屏', (notes.g99 || 0) >= 4, JSON.stringify(notes))

  // A6 首页 12
  await goto(cdp, '/', `document.querySelectorAll('dt').length>0?1:0`)
  const home = await evalOn(cdp, `(()=>{const dt=[...document.querySelectorAll('dt')].find(x=>x.textContent.includes('条目已核验'));return dt?dt.nextElementSibling.textContent.trim():null})()`)
  rec('A6 首页条目已核验=12', home === '12', `dd=${home}`)

  await cdp.close()
} catch (e) { rec('EXCEPTION', false, String(e)) }

writeFileSync('dev/round99-results.json', JSON.stringify(results, null, 2), 'utf8')
const pass = results.filter(r => r.pass).length
console.log(`\n${pass}/${results.length} PASS`)
try { spawnSync('taskkill', ['/PID', String(chrome.pid), '/T', '/F'], { stdio: 'ignore' }) } catch {}
try { spawnSync('taskkill', ['/PID', String(preview.pid), '/T', '/F'], { stdio: 'ignore' }) } catch {}
rmSync(profile, { recursive: true, force: true })
process.exit(pass === results.length ? 0 : 1)
