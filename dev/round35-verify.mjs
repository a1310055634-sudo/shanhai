/**
 * G35 证据核验脚本(难字音表 / 异文校勘页)
 *
 * 只读:不写任何数据文件。用途——
 *  1) 把「郭璞注音注」候选逐条回查 EDITION_EVIDENCE 存档,报告是否逐字命中及所在行号;
 *  2) 从 src/data 抽取站内已上屏原文(chapterTexts.text / locations.originalText /
 *     entities citations),报告候选字是否确实出现在站内原文中;
 *  3) 对 A 源(ctext 存档)做用字计数,为异文页「柢/祗」「䨼/雘」提供逐字证据。
 *
 * 运行:node dev/round35-verify.mjs
 */
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (p) => readFileSync(join(root, p), 'utf8')

const guopu = read('EDITION_EVIDENCE/wikisource-nanshan1-guopu-20261002.txt')
const b1 = read('EDITION_EVIDENCE/wikisource-nanshan1-b1-20261002.txt')
const ctext = read('EDITION_EVIDENCE/ctext-nanci1-20260927.txt')

const guopuLines = guopu.split(/\r?\n/)
const lineOf = (needle) => {
  const hits = []
  guopuLines.forEach((l, i) => {
    if (l.includes(needle)) hits.push(i + 1)
  })
  return hits
}

/** 站内已上屏原文语料(仅原文层字段;注/释义/策展字段不入) */
function siteCorpus() {
  const out = []
  const files = ['chapterTexts.ts', 'locations.ts', 'distances.ts']
  for (const f of readdirSync(join(root, 'src/data/entities'))) {
    if (f.endsWith('.ts')) files.push('entities/' + f)
  }
  for (const f of files) {
    const src = read('src/data/' + f)
    const patterns = [/text:\s*'([^'\n]*)'/g, /originalText:\s*'([^'\n]*)'/g]
    for (const re of patterns) {
      let m
      while ((m = re.exec(src))) if (m[1]) out.push({ file: f, text: m[1] })
    }
  }
  return out
}

const corpus = siteCorpus()
const corpusAll = corpus.map((c) => c.text).join('\n')

/** 候选:郭璞注音注(逐字片段须与存档完全一致,脚本负责回查) */
const NOTE_CANDIDATES = [
  { char: '禺', quote: '禺字音遇', where: '南次一经·招摇之山段(其状如禺)' },
  { char: '棪', quote: '其子似柰而赤，可食，音剡', where: '南次一经·堂庭之山段(多棪木)' },
  { char: '杻', quote: '音紐', where: '南次一经·杻阳之山(曰杻陽之山)' },
  { char: '柢', quote: '音蔕', where: '南次一经·柢山(又東三百里柢山)' },
  { char: '鯥', quote: '音六', where: '南次一经·柢山段(其名曰鯥)' },
  { char: '亶', quote: '亶音蟬', where: '南次一经·亶爰之山(曰亶爰之山)' },
  { char: '雘', quote: '雘，黝屬，音瓠', where: '南次一经·青丘之山(其陰多青雘)' },
  { char: '踆', quote: '踆，古蹲字。言臨海上音存。', where: '南次一经·箕尾之山(其尾踆於東海)' },
  { char: '汸', quote: '音芳', where: '南次一经·箕尾之山(汸水出焉)' },
  { char: '淯', quote: '音育', where: '南次一经·箕尾之山(南流注於淯)' },
  { char: '糈', quote: '糈，祀神之米，名先呂反。', where: '南次一经·篇末祠礼(糈用稌米)' },
  { char: '菅', quote: '菅，茅屬也。音間', where: '南次一经·篇末祠礼(白菅為席)' },
  { char: '柜', quote: '音矩', where: '南次二经·柜山(曰柜山)' },
  { char: '鴟', quote: '鴟音處脂反', where: '南次二经·柜山段(其狀如鴟而人手)' },
  { char: '鴸', quote: '音株', where: '南次二经·柜山段(其名曰鴸)' },
  { char: '褢', quote: '滑懷兩音', where: '南次二经·尧光之山段(其名曰猾褢)' },
  { char: '鮆', quote: '一名刀魚，音祚啓反', where: '南次二经·浮玉之山段(其中多鮆魚)' },
  { char: '𨴯', quote: '音涿', where: '南次二经·成山(𨴯水出焉)' },
  { char: '虖', quote: '虖，音呼。', where: '南次二经·成山(南流注於虖勺)' },
  { char: '湨', quote: '音鵙', where: '南次二经·会稽之山(南流注於湨)' },
]

console.log('== 1. 郭璞注音注逐字回查(底本B 存档 wikisource-nanshan1-guopu-20261002.txt)==')
const rows = []
for (const c of NOTE_CANDIDATES) {
  const hits = lineOf(c.quote)
  const inSite = corpusAll.includes(c.char)
  rows.push({ ...c, line: hits[0] ?? null, hits: hits.length, inSite })
  console.log(
    `${hits.length ? '命中' : '缺失'}  ${c.char}  L${hits[0] ?? '-'}  站内原文:${inSite ? '有' : '无'}  「${c.quote}」`,
  )
}
const miss = rows.filter((r) => r.hits !== 1)
console.log(`-- 逐字命中且唯一:${rows.filter((r) => r.hits === 1).length}/${rows.length};异常:${miss.length}`)
if (miss.length) console.log(JSON.stringify(miss, null, 2))

console.log('\n== 2. 站内已上屏原文语料统计 ==')
console.log(`原文串 ${corpus.length} 条,合计 ${corpusAll.length} 字`)

console.log('\n== 3. 本站 ruby 注音层(GLOSSARY)对照 ==')
const gsrc = read('src/data/chapterTexts.ts')
const gblock = gsrc.slice(gsrc.indexOf('export const GLOSSARY'))
const gchars = [...gblock.matchAll(/^\s{2}(\S+?):\s*\{/gmu)].map((m) => m[1])
console.log(`GLOSSARY ${gchars.length} 字:${gchars.join(' ')}`)
for (const ch of gchars) {
  if (!corpusAll.includes(ch)) console.log(`  ! GLOSSARY 字「${ch}」未出现在站内原文语料`)
}

console.log('\n== 4. A 源(ctext 存档)用字计数:柢/祗 与 䨼/雘 ==')
for (const ch of ['柢', '祗', '䨼', '雘', '堂', '常']) {
  const n = [...ctext].filter((x) => x === ch).length
  console.log(`  ${ch} : ${n}`)
}
console.log('  A 源柢山句片段:', /[^\u0000-\u007f]{0,6}(祗|柢)[^\u0000-\u007f]{0,10}/.exec(ctext)?.[0])

console.log('\n== 6. 无音注候选:全存档出现位置与注文片段(证明「底本无音注」而非臆断)==')
const NO_NOTE = ['䧿', '狌', '䨼', '詨', '橛', '痹', '鬛', '斲', '繇', '蝮', '瘗', '猨']
for (const ch of NO_NOTE) {
  const occ = []
  guopuLines.forEach((l, i) => {
    let idx = l.indexOf(ch)
    while (idx !== -1) {
      // 摘该字后 40 字,看是否落在 {{*|…}} 注文内
      occ.push({ line: i + 1, ctx: l.slice(Math.max(0, idx - 12), idx + 34) })
      idx = l.indexOf(ch, idx + 1)
    }
  })
  const withSound = occ.filter((o) => /音|反|讀|读/.test(o.ctx))
  console.log(`  ${ch} 出现 ${occ.length} 处;上下文含「音/反/讀」者 ${withSound.length} 处`)
  for (const o of occ.slice(0, 3)) console.log(`      L${o.line} …${o.ctx}…`)
}

console.log('\n== 7. 音表候选:站内原文出现处(供「出现处」列)+ 异文页证据回查 ==')
const ALL = [...NOTE_CANDIDATES.map((c) => c.char), ...NO_NOTE]
for (const ch of ALL) {
  const hits = corpus.filter((c) => c.text.includes(ch))
  console.log(`  ${ch} → ${hits.length ? hits.map((h) => `${h.file}:${h.text.slice(0, 26)}`).join(' | ') : '(站内原文无)'}`)
}
console.log('\n-- 异文页证据 --')
console.log('  差2 A源句:', /[^。]{0,8}祗山[^。]{0,12}/.exec(ctext)?.[0])
console.log('  差2 B源句:', guopuLines[19].slice(0, 40))
console.log('  差4 A源堂:', /[^。]{0,10}堂庭[^。]{0,8}/.exec(ctext)?.[0])
console.log('  差4 B源另注:', /\{\{另\|堂\|常\}\}/.test(guopuLines[13]) ? 'L14 命中 {{另|堂|常}}' : '未命中')
console.log('  差3 A源:', /[^。]{0,10}青䨼[^。]{0,6}/.exec(ctext)?.[0])
console.log('  B1 存档行数:', b1.split(/\r?\n/).length)

console.log('\n== 5. JSON(供录入 readings.ts 使用)==')
console.log(JSON.stringify(rows.filter((r) => r.inSite), null, 1))
