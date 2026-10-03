// G59 古图源侦察:Commons API 串行查询,产出 dev/round59-results.json
// 口径:15 词条(12 版画兽+3 无图兽)x 候选刻本;许可仅收 PD/CC0;同源(古今图书集成)如实标注
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

const BEASTS = [
  { slug: 'jiuweihu', zh: '九尾狐', en: 'nine-tailed fox', extra: 'Shanhaijing' },
  { slug: 'xingxing', zh: '狌狌', en: 'xingxing', extra: 'ape Shanhaijing' },
  { slug: 'lushu', zh: '鹿蜀', en: 'lushu', extra: 'Shanhaijing' },
  { slug: 'fenghuang', zh: '凤皇', en: 'fenghuang bird', extra: 'Shanhaijing phoenix' },
  { slug: 'yinglong', zh: '应龙', en: 'Yinglong', extra: 'winged dragon Shanhaijing' },
  { slug: 'zhuyin', zh: '烛龙', en: 'Zhulong', extra: 'torch dragon Shanhaijing' },
  { slug: 'luwu', zh: '陆吾', en: 'Luwu', extra: 'Shanhaijing' },
  { slug: 'wenyaoyu', zh: '文鳐鱼', en: 'wenyaoyu', extra: 'flying fish Shanhaijing' },
  { slug: 'dijiang', zh: '帝江', en: 'Dijiang', extra: 'Hundun Shanhaijing' },
  { slug: 'kui', zh: '夔', en: 'Kui', extra: 'one-legged ox Shanhaijing' },
  { slug: 'yingzhao', zh: '英招', en: 'Yingzhao', extra: 'Shanhaijing' },
  { slug: 'jingwei', zh: '精卫', en: 'Jingwei', extra: 'bird fill sea' },
  { slug: 'changyou', zh: '长右', en: 'Changyou', extra: 'Shanhaijing beast' },
  { slug: 'huahuai', zh: '猾褢', en: 'Huahuai', extra: 'Shanhaijing' },
  { slug: 'zhi', zh: '彘', en: 'Zhi', extra: 'pig Shanhaijing' },
]

const CATEGORIES = [
  'Category:Shan Hai Jing',
  'Category:Shanhaijing',
  'Category:Classic of Mountains and Seas',
  'Category:Gujin Tushu Jicheng',
  'Category:Shan hai jing',
]

const EDITION_RULES = [
  { key: 'gujin', label: '古今图书集成(同源现有转描)', kw: ['古今圖書集成', '古今图书集成', 'Gujin Tushu', '古圖書'] },
  { key: 'jiang', label: '蒋应镐绘本', kw: ['蔣應鎬', '蒋应镐', 'Jiang Yingke', '繪像', '绘像'] },
  { key: 'wu', label: '吴任臣广注', kw: ['吳任臣', '吴任臣', 'Wu Renchen', '廣注', '广注'] },
  { key: 'wang', label: '汪绂山海经存', kw: ['汪紱', '汪绂', 'Wang Fu', '山海經存', '山海经存'] },
  { key: 'kaiki', label: '怪奇鸟兽图卷', kw: ['怪奇', 'Kaiki'] },
]
const SHJ_KW = ['山海經', '山海经', 'Shanhaijing', 'Shan Hai Jing', 'Classic of Mountains']
const LICENSE_OK = /public domain|cc0|pd-old|pd-china|pd-art|pd-scan|no restrictions/i

function classify(title, meta) {
  const hay = [title, meta.description, meta.artist, meta.credit].filter(Boolean).join(' \n ')
  for (const r of EDITION_RULES) {
    if (r.kw.some((k) => hay.includes(k))) return { edition: r.label, isShj: true }
  }
  const isShj = SHJ_KW.some((k) => hay.includes(k))
  return { edition: isShj ? '其它山海经图' : '非山海经主题', isShj }
}

async function imageInfo(titles) {
  const out = []
  for (let i = 0; i < titles.length; i += 20) {
    const batch = titles.slice(i, i + 20)
    const r = await api({
      action: 'query', prop: 'imageinfo', titles: batch.join('|'),
      iiprop: 'size|mime|url|extmetadata',
      iiextmetadatafilter: 'LicenseShortName|Artist|ImageDescription|Credit|DateTimeOriginal',
    })
    await sleep(350)
    if (r.__error || !r.query) continue
    const pages = Object.values(r.query.pages || {})
    for (const p of pages) {
      if (!p.imageinfo || !p.imageinfo.length) continue
      const ii = p.imageinfo[0]
      const em = ii.extmetadata || {}
      const pick = (k) => (em[k] && em[k].value ? String(em[k].value).replace(/<[^>]*>/g, '').slice(0, 220) : '')
      const meta = {
        description: pick('ImageDescription'),
        artist: pick('Artist'),
        credit: pick('Credit'),
      }
      const license = pick('LicenseShortName') || 'unknown'
      const { edition, isShj } = classify(p.title, meta)
      const long = Math.max(ii.width || 0, ii.height || 0)
      const raster = ['image/jpeg', 'image/png', 'image/tiff'].includes(ii.mime)
      const licenseOk = LICENSE_OK.test(license)
      let verdict = '不可拉'
      if (licenseOk && raster && long >= 400) verdict = '可拉'
      else if (!licenseOk && /unknown|©|copyright|cc-by(-sa)?\s*3|\bcc-by-sa 4/i.test(license) === false && license === 'unknown') verdict = '待议'
      out.push({
        title: p.title, url: ii.url, w: ii.width, h: ii.height, mime: ii.mime,
        license, edition, isShj, verdict,
        desc: meta.description.slice(0, 120),
      })
    }
  }
  return out
}

const results = { generatedAt: new Date().toISOString(), calls: 0, categories: [], beasts: [], summary: {} }
const seen = new Set()

for (const cat of CATEGORIES) {
  const r = await api({ action: 'query', list: 'categorymembers', cmtitle: cat, cmlimit: 300, cmtype: 'file|subcat' })
  await sleep(350)
  const members = (r.query && r.query.categorymembers) || []
  results.categories.push({ cat, count: members.length, members: members.map((m) => m.title).slice(0, 80) })
  for (const m of members) if (m.ns === 6) seen.add(m.title)
}

for (const b of BEASTS) {
  const queries = [`${b.zh} 山海经`, `${b.en} ${b.extra}`]
  const titles = new Set()
  for (const q of queries) {
    const r = await api({ action: 'query', list: 'search', srsearch: q, srnamespace: 6, srlimit: 15 })
    await sleep(350)
    for (const s of (r.query && r.query.search) || []) titles.add(s.title)
  }
  for (const t of seen) if (t.includes(b.zh) || t.toLowerCase().includes(b.en.toLowerCase())) titles.add(t)
  const list = [...titles].slice(0, 20)
  const infos = list.length ? await imageInfo(list) : []
  const shj = infos.filter((x) => x.isShj)
  const okPull = infos.filter((x) => x.verdict === '可拉')
  results.beasts.push({
    slug: b.slug, zh: b.zh, candidates: infos.length,
    okPull: okPull.length,
    editions: [...new Set(shj.map((x) => x.edition))],
    top: infos.slice(0, 10),
  })
  await sleep(300)
}

results.calls = calls
const totalOk = results.beasts.reduce((s, b) => s + b.okPull, 0)
results.summary = {
  totalOkPull: totalOk,
  beastsWithOk: results.beasts.filter((b) => b.okPull > 0).map((b) => `${b.zh}:${b.okPull}`),
  beastsEmpty: results.beasts.filter((b) => b.okPull === 0).map((b) => b.zh),
}
const fs = await import('node:fs')
fs.writeFileSync('D:/zcode/workspace/default/shanhai/dev/round59-results.json', JSON.stringify(results, null, 2))
console.log('CALLS', calls)
console.log('SUMMARY', JSON.stringify(results.summary))
