// G83 v2: 在 mw-parser-output 区域内按文档序抽题头(h2/h3)与正文段(<p>),生成 B1 存档原料
import { readFileSync, writeFileSync } from 'node:fs'

function mainRegion(html) {
  let h = html.replace(/<style[\s\S]*?<\/style>/g, '').replace(/<script[\s\S]*?<\/script>/g, '')
  const a = h.indexOf('mw-parser-output')
  const b = h.indexOf('printfooter')
  const c = h.indexOf('catlinks')
  const end = [b, c].filter(x => x > a).sort((m, n) => m - n)[0] ?? h.length
  if (a < 0) throw new Error('mw-parser-output 未命中')
  return h.slice(a, end > 0 ? end : h.length)
}

function tokens(region) {
  const out = []
  const re = /<(h[23])[^>]*>([\s\S]*?)<\/\1>|<p[^>]*>([\s\S]*?)<\/p>/g
  let m
  const clean = s => s
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .trim()
  while ((m = re.exec(region))) {
    if (m[2] !== undefined) out.push({ t: 'h', s: clean(m[2]) })
    else {
      const s = clean(m[3])
      if (s) out.push({ t: 'p', s })
    }
  }
  return out
}

// —— 南山经:从题头「南次三經」起取到末尾 ——
const nsToks = tokens(mainRegion(readFileSync('dev/round83-nanshan.html', 'utf8')))
const k3 = nsToks.findIndex(x => x.t === 'h' && x.s.replace(/\[编辑|\]/g, '').includes('南次三經'))
if (k3 < 0) throw new Error('南次三經题头未命中')
const ns3 = nsToks.slice(k3).filter(x => x.t === 'p')

// —— 西山经:从题头「西山經」起取到题头「西次二經」前 ——
const xsToks = tokens(mainRegion(readFileSync('dev/round83-xishan.html', 'utf8')))
const kxs = xsToks.findIndex(x => x.t === 'h' && x.s.replace(/\[编辑|\]/g, '').includes('西山經'))
const k2x = xsToks.findIndex((x, k) => k > kxs && x.t === 'h' && x.s.replace(/\[编辑|\]/g, '').includes('西次二經'))
if (kxs < 0 || k2x < 0) throw new Error(`西山锚点未命中 kxs=${kxs} k2x=${k2x}`)
const xs1 = xsToks.slice(kxs, k2x).filter(x => x.t === 'p')

console.log('=== 南次三经段 段落数:', ns3.length)
ns3.forEach((x, k) => console.log(`[ns3-${String(k).padStart(2, '0')}]`, x.s.slice(0, 52)))
console.log('=== 西山首段 段落数:', xs1.length)
xs1.forEach((x, k) => console.log(`[xs1-${String(k).padStart(2, '0')}]`, x.s.slice(0, 52)))

writeFileSync('dev/round83-ns3.txt', ns3.map(x => x.s).join('\n'), 'utf8')
writeFileSync('dev/round83-xs1.txt', xs1.map(x => x.s).join('\n'), 'utf8')
console.log('已写 dev/round83-ns3.txt / dev/round83-xs1.txt')
