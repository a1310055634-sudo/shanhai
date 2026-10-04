// G84: locations.ts 16 处 unverified→verified(行号+向上 id 双校验,带计数守卫)
import { readFileSync, writeFileSync } from 'node:fs'

const targets = [
  [548, 'loc-guishan'], [582, 'loc-changyou'], [616, 'loc-yaoguang'], [661, 'loc-yushan'],
  [701, 'loc-qufu'], [740, 'loc-juyu'], [789, 'loc-fuyu'], [843, 'loc-chengshan'],
  [893, 'loc-kuaiji'], [926, 'loc-yishan'], [961, 'loc-pugou'], [1019, 'loc-xunshan'],
  [1066, 'loc-hushao'], [1099, 'loc-quwu'], [1135, 'loc-luwu'], [1182, 'loc-qiwu'],
]
const p = 'src/data/locations.ts'
const lines = readFileSync(p, 'utf8').split('\n')
let changed = 0
for (const [ln, id] of targets) {
  const line = lines[ln - 1]
  if (!/recordStatus:\s*'unverified'/.test(line)) throw new Error(`${id} 行 ${ln} 不是 unverified: ${line}`)
  // 向上找 id 校验
  let found = null
  for (let j = ln - 1; j > Math.max(0, ln - 60); j--) {
    const m = lines[j - 1].match(/id:\s*'(loc-[^']+)'/)
    if (m) { found = m[1]; break }
  }
  if (found !== id) throw new Error(`${id} 行 ${ln} 向上校验得 ${found},不匹配`)
  lines[ln - 1] = line.replace("'unverified'", "'verified'")
  changed++
}
if (changed !== 16) throw new Error(`预期 16 处,实改 ${changed}`)
writeFileSync(p, lines.join('\n'), 'utf8')
console.log(`已升级 ${changed} 处`)
// 复核:全文件 unverified 剩余数
const after = readFileSync(p, 'utf8')
const uv = (after.match(/recordStatus:\s*'unverified'/g) || []).length
const v = (after.match(/recordStatus:\s*'verified'/g) || []).length
console.log(`复核:unverified=${uv} verified=${v}(应 0/33)`)
