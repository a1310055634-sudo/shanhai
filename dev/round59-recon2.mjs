// G59 侦察二轮:全量拉取 Category:Shan Hai Jing 文件,按文件名规范映射 15 词条
// 命名实况:'Shahaijing-chongzhen(1628–1644)-nanshanjing1-fol5b-ninetailfox.jpg'(蒋应镐崇祯本)
//          'Wang fu(1895)-shanhaijingcun1-fol6a-lushu.jpg'(汪绂山海经存)
import { readFileSync, writeFileSync } from 'node:fs'

const API = 'https://commons.wikimedia.org/w/api.php'
const HEADERS = { 'User-Agent': 'shanhai-archive-recon/1.0 (local art-source research)' }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
let calls = 0
async function api(params) {
  const url = new URL(API)
  params.format = 'json'
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v))
  for (let i = 0; i < 4; i++) {
    try {
      const res = await fetch(url, { headers: HEADERS })
      if (res.status === 429) { await sleep(1500 * (i + 1)); continue }
      if (!res.ok) throw new Error('HTTP ' + res.status)
      calls += 1
      return await res.json()
    } catch (e) {
      if (i === 3) return { __error: String(e) }
      await sleep(700)
    }
  }
  return { __error: 'rate limited' }
}

// 词条 → 文件名英文兽名候选(folio 命名词表,大小写不敏感,includes 匹配)
const BEAST_TOKENS = {
  jiuweihu: ['ninetailfox', 'nine-tailed-fox', 'nine-tailedfox', 'jiuweihu', 'huli'],
  xingxing: ['xingxing', 'ape', 'shenghang'],
  lushu: ['lushu'],
  fenghuang: ['phoenix', 'fenghuang', 'feng-huang'],
  yinglong: ['yinglong', 'wingeddragon', 'winged-dragon'],
  zhuyin: ['zhulong', 'zhuyin', 'torchdragon', 'torch-dragon'],
  luwu: ['luwu'],
  wenyaoyu: ['wenyaoyu', 'wenyao', 'flyingfish', 'flying-fish'],
  dijiang: ['dijiang', 'hundun'],
  kui: ['kui'],
  yingzhao: ['yingzhao'],
  jingwei: ['jingwei'],
  changyou: ['changyou'],
  huahuai: ['huahuai'],
  zhi: ['pig'],
}

function editionOf(title) {
  const t = title.toLowerCase()
  if (t.includes('chongzhen') || t.includes('shahaijing')) return '蒋应镐绘本(崇祯刊本扫描)'
  if (t.includes('wang fu') || t.includes('shanhaijingcun')) return '汪绂山海经存(1895 石印本扫描)'
  if (t.includes('gujin') || t.includes('tushu')) return '古今图书集成(同源现有转描)'
  return '其它'
}

async function allMembers() {
  const out = []
  let cont = undefined
  do {
    const params = { action: 'query', list: 'categorymembers', cmtitle: 'Category:Shan Hai Jing', cmlimit: 500, cmtype: 'file' }
    if (cont) params.cmcontinue = cont
    const r = await api(params)
    await sleep(350)
    if (r.__error || !r.query) break
    for (const m of r.query.categorymembers || []) out.push(m.title)
    cont = r.continue && r.continue.cmcontinue
  } while (cont)
  return out
}

const members = await allMembers()
const bySlug = {}
for (const k of Object.keys(BEAST_TOKENS)) bySlug[k] = []
const unmatched = []

const infos = []
for (let i = 0; i < members.length; i += 20) {
  const batch = members.slice(i, i + 20)
  const r = await api({
    action: 'query', prop: 'imageinfo', titles: batch.join('|'),
    iiprop: 'size|mime|url|extmetadata',
    iiextmetadatafilter: 'LicenseShortName|Artist|ImageDescription|DateTimeOriginal',
  })
  await sleep(350)
  if (r.__error || !r.query) continue
  for (const p of Object.values(r.query.pages || {})) {
    if (!p.imageinfo || !p.imageinfo.length) continue
    const ii = p.imageinfo[0]
    const em = ii.extmetadata || {}
    const pick = (k) => (em[k] && em[k].value ? String(em[k].value).replace(/<[^>]*>/g, '').slice(0, 200) : '')
    infos.push({
      title: p.title, url: ii.url, w: ii.width, h: ii.height, mime: ii.mime,
      license: pick('LicenseShortName') || 'unknown',
      edition: editionOf(p.title),
      desc: pick('ImageDescription').slice(0, 120),
    })
  }
}

const LICENSE_OK = /public domain|cc0|pd-old|pd-china|pd-art|pd-scan|no restrictions/i
for (const f of infos) {
  const lower = f.title.toLowerCase()
  const slug = Object.keys(BEAST_TOKENS).find((k) => BEAST_TOKENS[k].some((tok) => lower.includes(tok)))
  const rec = { ...f, verdict: LICENSE_OK.test(f.license) && f.mime !== 'image/svg+xml' && Math.max(f.w, f.h) >= 400 ? '可拉' : '待议' }
  if (slug) bySlug[slug].push(rec)
  else unmatched.push(rec)
}

const summary = {}
for (const [slug, list] of Object.entries(bySlug)) {
  const ok = list.filter((x) => x.verdict === '可拉')
  summary[slug] = { total: list.length, okPull: ok.length, editions: [...new Set(list.map((x) => x.edition))] }
}
const out = {
  generatedAt: new Date().toISOString(), calls,
  categoryTotal: members.length, matched: members.length - unmatched.length, unmatched: unmatched.length,
  summary, bySlug, unmatchedFiles: unmatched.map((x) => x.title).slice(0, 60),
}
writeFileSync('D:/zcode/workspace/default/shanhai/dev/round59-recon2.json', JSON.stringify(out, null, 2))
console.log('CALLS', calls, '| category files', members.length, '| matched', members.length - unmatched.length)
console.log(JSON.stringify(summary, null, 1))
