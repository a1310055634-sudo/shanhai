// G86: 南次三经前四段四源比对(B1 存档×B2 存档×arteducation×袁本)
import { readFileSync, writeFileSync } from 'node:fs'

const NORM = [['於','于'],['鹹','咸'],['蟲','虫'],['汎','泛'],['勃','渤'],['欄','栏']]
const norm = s => { let o=s; for(const[a,b] of NORM) o=o.split(a).join(b); return o }
const strip = s => s.replace(/[，。、；：「」『』《》\s．·]/g, '')

// B1 三经档剥注
const b1 = readFileSync('EDITION_EVIDENCE/wikisource-nanshan3-b1-20261005.txt','utf8')
  .split('\n').filter(l=>/^\[L\d+\]/.test(l))
const b1Body = l => l.replace(/^\[L\d+\]\s*/,'').replace(/〈[^〉]*〉/g,'').replace(/(.)一作「.」/g,'$1')

// B2 存档三经行(全文行,剥 {{*|…}} 与 {{另|A|B}})
const b2 = readFileSync('EDITION_EVIDENCE/wikisource-nanshan1-guopu-20261002.txt','utf8').split('\n')
const b2Body = l => l.replace(/　+/g,'').replace(/\{\{\*\|([^}]*)\}\}/g,'').replace(/\{\{另\|(.)\|.\}\}/g,'$1').trim()

// artedu 正文(HTML 已在库)
const html = readFileSync('dev/round84-artedu-1.html','utf8')
let txt = html.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<style[\s\S]*?<\/style>/g,'')
  .replace(/<br\s*\/?>/gi,'\n').replace(/<[^>]+>/g,'\n')
const a0 = txt.indexOf('南次三山之首'), a1 = txt.indexOf('右南經之山志')
const srcLines = txt.slice(a0, a1>0?a1:undefined).split('\n').map(s=>s.trim()).filter(Boolean)

// 袁本(殆知阁,简体)
const yb = readFileSync('dev/round84-daizhige-shanhaijing.txt','utf8')
// 简转繁最小对照(仅比对用,只覆盖本四段用字)
const s2t = {'祷':'禱','过':'過','鸟':'鳥','状':'狀','鵁':'鵁','首':'首','号':'號','泿':'泿','于':'於','发':'發','无':'無','猿':'猿','泛':'汎','凯':'凱','风':'風','谷':'谷','遗':'遺'}

const segs = [
  { id:'tianyu',   b1:'L01', b2line:72, srcAnchor:/曰天虞之山/, ybA:'南次三经之首，曰天虞之山', ybB:'东五百里，曰祷过之山' },
  { id:'daoguo',   b1:'L02', b2line:74, srcAnchor:/曰禱過之山/, ybA:'东五百里，曰祷过之山', ybB:'又东五百里，曰丹穴之山' },
  { id:'fashuang', b1:'L04', b2line:78, srcAnchor:/曰發爽之山/, ybA:'又东五百里，曰发爽之山', ybB:'又东四百里，至于旄山之尾' },
  { id:'maoshan',  b1:'L05', b2line:80, srcAnchor:/旄山之尾/,   ybA:'又东四百里，至于旄山之尾', ybB:'又东四百里，至于非山之首' },
]

const out = []
for (const g of segs) {
  const b1Seg = b1Body(b1.find(l=>l.startsWith(`[${g.b1}]`)))
  const b2Seg = b2Body(b2[g.b2line-1])
  // artedu 切段
  const si = srcLines.findIndex(l=>g.srcAnchor.test(l))
  const ei = srcLines.findIndex((l,j)=>j>si && /又東|南次三山之首|曰丹穴/.test(l))
  const srcSeg = srcLines.slice(si, ei>0?ei:si+1).join('')
  // 袁本切段(简体,转繁比对仅作仲裁参照——逐字比对在简体域做:把 B1 转简对照)
  const yi = yb.indexOf(g.ybA)
  const yj = yb.indexOf(g.ybB, yi)
  const ybSeg = yb.slice(yi, yj>yi?yj:yi+120).replace(/\d+/g,'').replace(/　+/g,'')

  const cmp = (A, B) => {
    const a = norm(strip(A)), b = norm(strip(B))
    if (a === b) return null
    let i=0; while(i<Math.min(a.length,b.length)&&a[i]===b[i])i++
    return `@${i} A「${a.slice(Math.max(0,i-8),i+14)}」B「${b.slice(Math.max(0,i-8),i+14)}」(${a.length}/${b.length})`
  }
  out.push({
    seg: g.id,
    b1_vs_b2: cmp(b1Seg, b2Seg),
    b1_vs_artedu: cmp(b1Seg, srcSeg),
    b1_vs_yuanben: cmp(b1Seg, ybSeg),
    lens: [strip(b1Seg).length, strip(b2Seg).length, strip(srcSeg).length, strip(ybSeg).length],
    b1Plain: b1Seg,
  })
}
for (const r of out) {
  console.log(`\n### ${r.seg} (len B1/B2/artedu/袁=${r.lens.join('/')})`)
  console.log('  B1×B2    :', r.b1_vs_b2 ?? '✓一致')
  console.log('  B1×artedu:', r.b1_vs_artedu ?? '✓一致')
  console.log('  B1×袁本  :', r.b1_vs_yuanben ?? '✓一致')
  console.log('  B1 正文  :', r.b1Plain)
}
writeFileSync('dev/round86-compare-results.json', JSON.stringify(out,null,2),'utf8')
console.log('\n已写 dev/round86-compare-results.json')
