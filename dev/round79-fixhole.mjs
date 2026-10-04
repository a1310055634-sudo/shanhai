// G77/G79 数据修补:稀疏数组空洞清理
import fs from 'node:fs'

const p = 'D:/zcode/workspace/default/shanhai/src/data/entities/jiuweihu.ts'
let s = fs.readFileSync(p, 'utf8')
const needle = ',,'
const before = s.split(needle).length - 1
if (before !== 1) { console.error('GUARD', before); process.exit(1) }
s = s.split(needle).join(',')
fs.writeFileSync(p, s)
console.log('HOLE FIXED')
