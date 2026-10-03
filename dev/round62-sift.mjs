// G62 顺带:三才图会家族 112 张过筛山经兽名 + WDL4447 元数据鉴定
const API = 'https://commons.wikimedia.org/w/api.php'
const H = { 'User-Agent': 'shanhai-archive-recon/1.0' }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
let calls = 0
async function api(p) {
  const u = new URL(API)
  p.format = 'json'
  for (const [k, v] of Object.entries(p)) u.searchParams.set(k, v)
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(u, { headers: H })
      if (r.status === 429) { await sleep(1200); continue }
      calls++
      return await r.json()
    } catch (e) { await sleep(600) }
  }
  return { __error: 1 }
}
async function enumPrefix(p) {
  const out = []
  let cont
  do {
    const params = { action: 'query', list: 'allimages', aiprefix: p, ailimit: 500 }
    if (cont) params.aicontinue = cont
    const r = await api(params)
    await sleep(300)
    if (!r.query) break
    for (const m of r.query.allimages || []) out.push(m.name.replace(/_/g, ' '))
    cont = r.continue && r.continue.aicontinue
  } while (cont)
  return out
}
const TOKENS = {
  '狌狌': ['猩猩'], '九尾狐': ['九尾狐'], '鹿蜀': ['鹿蜀'], '凤皇': ['鳳凰', '凤皇'],
  '应龙': ['應龍', '应龙'], '烛龙': ['燭龍', '燭陰'], '陆吾': ['陸吾'], '文鳐鱼': ['文鰩'],
  '帝江': ['帝江'], '夔': ['夔'], '英招': ['英招'], '精卫': ['精衛'], '浑敦': ['渾敦', '渾沌'],
  '毕方': ['畢方'], '蛊雕': ['蠱雕'], '赤鱬': ['赤鱬'], '猾褢': ['猾褢'], '长右': ['長右'],
  '彘': ['彘'], '鴸鸟': ['鴸'], '狸力': ['貍力'],
}
const files = await enumPrefix('三才圖會')
console.log('sancai total', files.length)
const hits = {}
for (const f of files) {
  for (const [k, toks] of Object.entries(TOKENS)) {
    if (toks.some((t) => f.includes(t))) { (hits[k] = hits[k] || []).push('File:' + f) }
  }
}
for (const [k, v] of Object.entries(hits)) console.log('HIT', k, '=>', v.join(' , '))
if (!Object.keys(hits).length) console.log('NO HITS')
const wdl = await api({
  action: 'query', prop: 'imageinfo', titles: 'File:Illustrated Classic of Mountains and Seas WDL4447.jpg',
  iiprop: 'size|mime|url|extmetadata',
  iiextmetadatafilter: 'LicenseShortName|Artist|ImageDescription|Credit',
})
console.log('WDL4447', JSON.stringify({
  size: wdl.query && (() => { const p = Object.values(wdl.query.pages)[0]; const ii = p.imageinfo && p.imageinfo[0]; if (!ii) return null; const em = ii.extmetadata || {}; const pick = (k) => (em[k] && em[k].value ? String(em[k].value).replace(/<[^>]*>/g, '').slice(0, 260) : ''); return { w: ii.width, h: ii.height, license: pick('LicenseShortName'), desc: pick('ImageDescription'), credit: pick('Credit'), url: ii.url } })(),
}))
console.log('CALLS', calls)
