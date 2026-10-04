// G89: 西次一经前五段四源比对(B1 西山档×B2 wikitext×artedu bookv_2×袁本)
import { readFileSync, writeFileSync } from 'node:fs'

const NORM = [['於','于'],['鬛','鬣'],['裊','枭'],['雛','鶵'],['磢','磢']]
const norm = s => { let o=s; for(const[a,b] of NORM) o=o.split(a).join(b); return o }
const strip = s => s.replace(/[，。、；：「」『』《》\s．·]/g, '')

const b1 = readFileSync('EDITION_EVIDENCE/wikisource-xishan1-b1-20261005.txt','utf8').split('\n').filter(l=>/^\[L\d+\]/.test(l))
const b1Body = l => l.replace(/^\[L\d+\]\s*/,'').replace(/〈[^〉]*〉/g,'').replace(/(.)一作「.」/g,'$1')

const b2 = readFileSync('EDITION_EVIDENCE/wikisource-xishan1-guopu-20261005.txt','utf8').split('\n')
const b2Body = l => l.replace(/　+/g,'').replace(/\{\{\*\|([^}]*)\}\}/g,'').replace(/\{\{另\|(.*?)\|.*?\}\}/g,'$1').trim()

// artedu bookv_2(西山经页)
const html = readFileSync('dev/round89-artedu-2.html','utf8')
let txt = html.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<style[\s\S]*?<\/style>/g,'').replace(/<br\s*\/?>/gi,'\n').replace(/<[^>]+>/g,'\n')
const a0 = txt.indexOf('西山經華山之首')
const a1 = txt.indexOf('西次二經')
const srcLines = txt.slice(a0, a1>0?a1:undefined).split('\n').map(s=>s.trim()).filter(Boolean)

// 袁本(殆知阁):西山经卷二
const yb = readFileSync('dev/round84-daizhige-shanhaijing.txt','utf8')
const y0 = yb.indexOf('西山经华山之首')>=0 ? yb.indexOf('西山经华山之首') : yb.indexOf('钱来之山')

const segs = [
  { id:'qianlai',  b1:'L01', srcAnchor:/西山經華山之首|曰錢來之山/, ybA:'西山经华山之首，曰钱来之山', ybB:'西四十五里' },
  { id:'songguo',  b1:'L02', srcAnchor:/曰松果之山/, ybA:'西四十五里，曰松果之山', ybB:'又西六十里' },
  { id:'taihua',   b1:'L03', srcAnchor:/曰太華之山/, ybA:'又西六十里，曰太华之山', ybB:'又西八十里' },
  { id:'xiaohua',  b1:'L04', srcAnchor:/曰小華之山/, ybA:'又西八十里，曰小华之山', ybB:'又西八十里，曰符禺之山' },
  { id:'fuyu',     b1:'L05', srcAnchor:/曰符禺之山/, ybA:'又西八十里，曰符禺之山', ybB:'又西六十里' },
]

const out = []
for (const g of segs) {
  const b1Seg = b1Body(b1.find(l=>l.startsWith(`[${g.b1}]`)))
  const bi = b2.findIndex(l=>l.includes(b1Seg.slice(3,12)))
  const b2Seg = bi>=0 ? b2Body(b2[bi]) : '(B2 未命中)'
  const si = srcLines.findIndex(l=>g.srcAnchor.test(l))
  const ei = srcLines.findIndex((l,j)=>j>si && /又西|西四十五|西次二經/.test(l))
  const srcSeg = srcLines.slice(si, ei>si?ei:si+1).join('')
  const yi = yb.indexOf(g.ybA, y0)
  const yj = yb.indexOf(g.ybB, yi)
  const ybSeg = yi>=0 ? yb.slice(yi, yj>yi?yj:yi+150).replace(/\d+/g,'').replace(/　+/g,'') : '(袁本未命中)'

  const cmp = (A,B) => { const a=norm(strip(A)), b=norm(strip(B)); if(a===b) return null; let i=0; while(i<Math.min(a.length,b.length)&&a[i]===b[i])i++; return `@${i} A「${a.slice(Math.max(0,i-6),i+12)}」B「${b.slice(Math.max(0,i-6),i+12)}」(${a.length}/${b.length})` }
  out.push({ seg:g.id, lens:[strip(b1Seg).length,strip(b2Seg).length,strip(srcSeg).length,strip(ybSeg).length],
    b1b2:cmp(b1Seg,b2Seg), b1art:cmp(b1Seg,srcSeg), b1yb:cmp(b1Seg,ybSeg), b1Plain:b1Seg })
}
for (const r of out) {
  console.log(`\n### ${r.seg} (len=${r.lens.join('/')})`)
  console.log('  B1×B2    :', r.b1b2 ?? '✓')
  console.log('  B1×artedu:', r.b1art ?? '✓')
  console.log('  B1×袁本  :', r.b1yb ?? '✓')
  console.log('  B1:', r.b1Plain)
}
writeFileSync('dev/round89-compare-results.json', JSON.stringify(out,null,2),'utf8')
