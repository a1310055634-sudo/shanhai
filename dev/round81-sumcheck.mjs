// G81 自查:程序化复算南次二经已录里距总和(不经页面,直接核数据源)
import { readFileSync } from 'node:fs'

const src = readFileSync('src/data/distances.ts', 'utf8')
const block = src.slice(src.indexOf('const NS2_ROWS'), src.indexOf('const ROWS_BY_CLASSIC'))
const rows = [...block.matchAll(/name:\s*'([^']+)'[\s\S]{0,80}?li:\s*(null|\d+)/g)].map((m) => [m[1], m[2]])

console.log('已录山行数 =', rows.length)
let sum = 0
for (const [n, d] of rows) {
  if (d !== 'null') sum += Number(d)
  console.log('  ', n, '=', d === 'null' ? '(经首,无里距)' : d + ' 里')
}
console.log('---')
console.log('sum =', sum)
console.log('篇末 totalInText = 7200(经文「七千二百里」)')
console.log('缺口 =', 7200 - sum, '里')
