/**
 * G36 证据核验脚本(后世流变 claims)
 *
 * 只读。做三件事:
 *  1) 把各词条 laterReception[].claims 的 quote 逐字回查项目内存档
 *     EDITION_EVIDENCE/liubian-guji-20261002.md —— 要求每段逐字命中;
 *     quote 内以「……」标示省略时按段分别回查(省略号两侧各自逐字);
 *  2) 在线复核:重新抓取 claim 的 sourceUrl,确认引文仍在公开页面中(网络不可用时如实标 SKIP);
 *  3) 反查「新增句 100% 有来源」:任何 claim 若 quote/篇名/链接/存档缺一即报错。
 *
 * 运行:node dev/round36-verify.mjs
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { readdirSync } from 'node:fs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (p) => readFileSync(join(root, p), 'utf8')

const archive = read('EDITION_EVIDENCE/liubian-guji-20261002.md')
/** 空白归一:诗行断行、全角空格不影响逐字比对 */
const norm = (s) => s.replace(/\s+/gu, '')

const ENTITY_DIR = join(root, 'src/data/entities')
const files = readdirSync(ENTITY_DIR).filter((f) => f.endsWith('.ts') && f !== 'index.ts')

/** 从 TS 源里粗取 claims(逐字段正则;只读校验用,不做类型求值) */
function claimsOf(src) {
  const out = []
  const claimBlocks = src.split(/\{\s*\n\s*text:/u)
  for (const block of claimBlocks) {
    const title = /sourceTitle:\s*'([^']+)'/u.exec(block)
    const url = /sourceUrl:\s*\n?\s*'([^']+)'/u.exec(block)
    const quote = /quote:\s*\n?\s*'([^']+)'/u.exec(block)
    const arch = /archive:\s*'([^']+)'/u.exec(block)
    if (title || quote) out.push({ title: title?.[1], url: url?.[1], quote: quote?.[1], archive: arch?.[1] })
  }
  return out
}

console.log('== 1. claims 字段完整性(逐句注篇名与链接)==')
let total = 0
const all = []
for (const f of files) {
  const src = read('src/data/entities/' + f)
  if (!src.includes('claims:')) continue
  const claims = claimsOf(src)
  for (const c of claims) {
    total++
    const missing = ['title', 'url', 'quote', 'archive'].filter((k) => !c[k])
    console.log(
      `  ${missing.length ? '缺字段' : 'OK  '} ${f}  ${missing.length ? missing.join(',') : c.title}`,
    )
    all.push({ file: f, ...c, missing })
  }
}
const incomplete = all.filter((c) => c.missing.length)
console.log(`-- claims 合计 ${total} 条;字段缺失 ${incomplete.length} 条`)

console.log('\n== 2. 引文逐字回查项目存档(EDITION_EVIDENCE/liubian-guji-20261002.md)==')
const nArch = norm(archive)
let segTotal = 0
let segMiss = 0
for (const c of all) {
  if (!c.quote) continue
  const segs = c.quote.split('……').map(norm).filter(Boolean)
  const miss = segs.filter((s) => !nArch.includes(s))
  segTotal += segs.length
  segMiss += miss.length
  console.log(
    `  ${miss.length ? 'MISS' : 'HIT '} ${c.file}  段 ${segs.length}  省略号分段${c.quote.includes('……') ? '有' : '无'}`,
  )
  for (const m of miss) console.log(`       ! 未命中:「${m.slice(0, 40)}…」`)
}
console.log(`-- 引文分段合计 ${segTotal} 段;未命中 ${segMiss} 段`)

console.log('\n== 3. 在线复核(重新抓 sourceUrl,确认引文仍在公开页面)==')
for (const c of all) {
  if (!c.url || !c.quote) continue
  try {
    const res = await fetch(c.url, { headers: { 'User-Agent': 'shanhai-archive-verify/1.0' } })
    const html = await res.text()
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gu, '')
      .replace(/<style[\s\S]*?<\/style>/gu, '')
      .replace(/<[^>]+>/gu, '')
    const nText = norm(text)
    const segs = c.quote.split('……').map(norm).filter(Boolean)
    const miss = segs.filter((s) => !nText.includes(s))
    console.log(
      `  ${res.ok ? (miss.length ? 'MISS' : 'HIT ') : 'HTTP' + res.status} ${c.title?.slice(0, 28)}  (${miss.length} 段未命中)`,
    )
  } catch (e) {
    console.log(`  SKIP ${c.title?.slice(0, 28)}  网络不可用:${String(e).slice(0, 60)}`)
  }
}

console.log('\n== 4. 结论 ==')
console.log(
  `claims ${total} 条 / 字段缺失 ${incomplete.length} / 引文分段未命中 ${segMiss} → ${
    incomplete.length === 0 && segMiss === 0 ? 'PASS' : 'FAIL'
  }`,
)
process.exit(incomplete.length === 0 && segMiss === 0 ? 0 : 1)
