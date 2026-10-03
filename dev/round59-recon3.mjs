// G59 侦察三轮:按文件名前缀枚举刻本扫描件家族(folio 命名规范)
import { writeFileSync } from 'node:fs'
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

const PREFIXES = [
  'Shahaijing-chongzhen',
  'Wang fu(1895)',
  'Illustrated Classic of Mountains and Seas',
  'Shanhaijing-chongzhen',
]
const BEAST_TOKENS = {
  jiuweihu: ['ninetailfox', 'nine-tailed', 'jiuweihu', 'huli'],
  xingxing: ['xingxing', 'ape'],
  lushu: ['lushu'],
  fenghuang: ['phoenix', 'fenghuang'],
  yinglong: ['yinglong', 'wingeddragon', 'winged-dragon', 'ying-loong'],
  zhuyin: ['zhulong', 'zhuyin', 'torchdragon', 'torch-dragon'],
  luwu: ['luwu'],
  wenyaoyu: ['wenyaoyu', 'wenyao', 'flyingfish', 'flying-fish'],
  dijiang: ['dijiang', 'hundun'],
  kui: ['kui'],
  yingzhao: ['yingzhao'],
  jingwei: ['jingwei'],
  changyou: ['changyou'],
  huahuai: ['huahuai'],
  zhi: ['pig', 'zhi'],
}

const families = {}
const allTitles = new Set()
for (const prefix of PREFIXES) {
  const titles = []
  let cont = undefined
  do {
    const params = { action: 'query', list: 'allimages', aiprefix: prefix, ailimit: 500, ainamespace: 6 }
    if (cont) params.aicontinue = cont
    const r = await api(params)
    await sleep(350)
    if (r.__error || !r.query) break
    for (const m of r.query.allimages || []) titles.push({ title: 'File:' + m.name.replace(/_/g, ' '), mime: m.mime })
    cont = r.continue && r.continue.aicontinue
  } while (cont)
  families[prefix] = titles.length
  for (const t of titles) allTitles.add(t.title)
  console.log(prefix, '=>', titles.length)
}

async function imageInfo(titles) {
  const out = []
  for (let i = 0; i < titles.length; i += 20) {
    const r = await api({
      action: 'query', prop: 'imageinfo', titles: titles.slice(i, i + 20).join('|'),
      iiprop: 'size|mime|url|extmetadata',
      iiextmetadatafilter: 'LicenseShortName|Artist|ImageDescription',
    })
    await sleep(350)
    if (r.__error || !r.query) continue
    for (const p of Object.values(r.query.pages || {})) {
      if (!p.imageinfo || !p.imageinfo.length) continue
      const ii = p.imageinfo[0]
      const em = ii.extmetadata || {}
      const pick = (k) => (em[k] && em[k].value ? String(em[k].value).replace(/<[^>]*>/g, '').slice(0, 200) : '')
      out.push({
        title: p.title, url: ii.url, w: ii.width, h: ii.height, mime: ii.mime,
        license: pick('LicenseShortName') || 'unknown',
        desc: pick('ImageDescription').slice(0, 130),
      })
    }
  }
  return out
}

const infos = await imageInfo([...allTitles])
const LICENSE_OK = /public domain|cc0|pd-old|pd-china|pd-art|pd-scan|no restrictions/i
function editionOf(title) {
  const t = title.toLowerCase()
  if (t.includes('shahaijing-chongzhen') || t.includes('shanhaijing-chongzhen')) return '蒋应镐绘本(崇祯刊本扫描)'
  if (t.includes('wang fu')) return '汪绂山海经存(1895 石印本扫描)'
  if (t.includes('wdl4447') || t.includes('illustrated classic')) return 'WDL4447 绘图山海经(待鉴定版本)'
  return '其它'
}
const bySlug = {}
const unmatched = []
for (const f of infos) {
  const lower = f.title.toLowerCase()
  f.edition = editionOf(f.title)
  f.verdict = LICENSE_OK.test(f.license) && f.mime !== 'image/svg+xml' && Math.max(f.w || 0, f.h || 0) >= 300 ? '可拉' : '待议'
  let hit = false
  for (const [slug, toks] of Object.entries(BEAST_TOKENS)) {
    if (toks.some((tok) => lower.includes(tok))) { (bySlug[slug] = bySlug[slug] || []).push(f); hit = true; break }
  }
  if (!hit) unmatched.push(f)
}
const summary = {}
for (const [slug, list] of Object.entries(bySlug)) {
  summary[slug] = {
    total: list.length,
    okPull: list.filter((x) => x.verdict === '可拉').length,
    editions: [...new Set(list.map((x) => x.edition))],
  }
}
writeFileSync('D:/zcode/workspace/default/shanhai/dev/round59-recon3.json', JSON.stringify({
  generatedAt: new Date().toISOString(), calls, families,
  inventory: infos.length, matched: infos.length - unmatched.length,
  summary, bySlug,
  unmatchedSample: unmatched.map((x) => x.title).slice(0, 80),
}, null, 2))
console.log('CALLS', calls, '| inventory', infos.length, '| matched', infos.length - unmatched.length)
console.log(JSON.stringify(summary, null, 1))
