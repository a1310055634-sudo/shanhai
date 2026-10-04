// G84: ctext 换源回核——B1(维基文库呈现态)×B2(四库本,已净化一致)×arteducation(台湾繁体排印本)
// 比对口径:去标点、剥〈〉郭注夹注与「X一作「Y」」页自带异文标注;异形字对白名单归一化(逐处列出,不隐藏);
// 判定:零实义差异=可升 verified;真差异(脱增字/用字误)=维持 unverified 记档。
import { readFileSync, writeFileSync } from 'node:fs'

// —— 1. arteducation 正文抽取 ——
const html = readFileSync('dev/round84-artedu-1.html', 'utf8')
let txt = html
  .replace(/<script[\s\S]*?<\/script>/g, '')
  .replace(/<style[\s\S]*?<\/style>/g, '')
  .replace(/<br\s*\/?>/gi, '\n')
  .replace(/<[^>]+>/g, '\n')
  .replace(/&nbsp;/g, ' ')
const a0 = txt.indexOf('南山經之首曰鵲山')
const a1 = txt.indexOf('南次三山之首')
if (a0 < 0 || a1 < 0) throw new Error(`artedu 正文锚未命中 a0=${a0} a1=${a1}`)
const src = txt.slice(a0, a1)
const srcLines = src.split('\n').map(s => s.trim()).filter(Boolean)

// —— 2. B1 二经档剥注 ——
const b1raw = readFileSync('EDITION_EVIDENCE/wikisource-nanshan1-b1-20261002.txt', 'utf8')
  .split('\n').filter(l => /^\[L\d+\]/.test(l))
function b1Body(line) {
  let s = line.replace(/^\[L\d+\]\s*/, '')
  s = s.replace(/〈[^〉]*〉/g, '')          // 郭注夹注
  s = s.replace(/(.)一作「.」/g, '$1')       // 页自带异文标注,保留正字
  return s
}

// —— 3. 归一化(异形字对白名单,逐处登记) ——
const NORM = [
  ['於', '于'], ['櫃', '柜'], ['餘', '余'], ['僕', '仆'],
  ['蟲', '虫'], ['𣬈', '毗'], ['鹹', '咸'], ['歎', '叹'], ['鬛', '鬣'], ['斲', '斫'],
]
function norm(s) {
  let out = s, log = []
  for (const [a, b] of NORM) {
    for (const ch of s) if (ch === a) log.push(`${a}→${b}`)
  }
  for (const [a, b] of NORM) out = out.split(a).join(b)
  return { out, log }
}
const strip = s => s.replace(/[，。、；：「」『』《》\s]/g, '')

// —— 4. 切段比对(16 山+篇末;咸陰无站内条目,不比对) ——
const anchors = [
  ['loc-guishan', /曰櫃山/], ['loc-changyou', /曰長右之山/], ['loc-yaoguang', /曰堯光之山/],
  ['loc-yushan', /曰羽山/], ['loc-qufu', /曰瞿父之山/], ['loc-juyu', /曰句余之山/],
  ['loc-fuyu', /曰浮玉之山/], ['loc-chengshan', /曰成山/], ['loc-kuaiji', /曰會稽之山/],
  ['loc-yishan', /曰夷山/], ['loc-pugou', /曰仆勾之山/], ['_xianyin', /曰鹹陰之山/], ['loc-xunshan', /曰洵山/],
  ['loc-hushao', /曰虖勺之山/], ['loc-quwu', /曰區吳之山/], ['loc-luwu', /曰鹿吳之山/],
  ['loc-qiwu', /曰漆吳之山/], ['tongji', /凡南次二山之首/],
]
const b1map = { 'loc-guishan': 1, 'loc-changyou': 2, 'loc-yaoguang': 3, 'loc-yushan': 4, 'loc-qufu': 5, 'loc-juyu': 6, 'loc-fuyu': 7, 'loc-chengshan': 8, 'loc-kuaiji': 9, 'loc-yishan': 10, 'loc-pugou': 11, 'loc-xunshan': 13, 'loc-hushao': 14, 'loc-quwu': 15, 'loc-luwu': 16, 'loc-qiwu': 17, tongji: 18 }

const results = []
for (let k = 0; k < anchors.length; k++) {
  const [id, re] = anchors[k]
  const sIdx = srcLines.findIndex(l => re.test(l))
  const eIdx = k + 1 < anchors.length
    ? srcLines.findIndex((l, j) => j > sIdx && anchors[k + 1][1].test(l))
    : (() => { const x = srcLines.findIndex((l, j) => j > sIdx && /南次三山之首/.test(l)); return x >= 0 ? x : srcLines.length })()
  if (sIdx < 0 || eIdx < 0) { results.push({ id, error: `锚未命中 s=${sIdx} e=${eIdx}` }); continue }
  if (id.startsWith('_')) { results.push({ id, skip: true }); continue }
  const srcSeg = srcLines.slice(sIdx, eIdx).join('')
  const b1Seg = b1Body(b1raw.find(l => l.startsWith(`[L${String(b1map[id]).padStart(2, '0')}]`) || (id === 'tongji' && l.startsWith('[L18]'))))
  const nA = norm(strip(b1Seg)), nB = norm(strip(srcSeg))
  const A = nA.out, B = nB.out
  const diffs = []
  if (A !== B) {
    // 逐字符找第一处分差并扩展上下文
    let i = 0
    while (i < Math.min(A.length, B.length) && A[i] === B[i]) i++
    const ctxA = A.slice(Math.max(0, i - 8), i + 12)
    const ctxB = B.slice(Math.max(0, i - 8), i + 12)
    diffs.push({ at: i, b1: ctxA, src: ctxB, b1FullLen: A.length, srcFullLen: B.length })
  }
  results.push({
    id,
    b1Chars: A.length, srcChars: B.length,
    normApplied: [...new Set([...nA.log, ...nB.log])],
    equal: A === B,
    diffs,
  })
}

for (const r of results) {
  if (r.error) { console.log(r.id, 'ERROR', r.error); continue }
  if (r.skip) { console.log('(切分锚跳过)', r.id); continue }
  console.log(`${r.equal ? '✓一致' : '✗差异'} ${r.id}  B1=${r.b1Chars} 源=${r.srcChars}${r.normApplied.length ? '  异形:' + r.normApplied.join(',') : ''}`)
  for (const d of r.diffs) console.log(`   首处差异@${d.at}: B1「${d.b1}」vs 源「${d.src}」(全长 ${d.b1FullLen}/${d.srcFullLen})`)
}
writeFileSync('dev/round84-compare-results.json', JSON.stringify(results, null, 2), 'utf8')
console.log('已写 dev/round84-compare-results.json')
