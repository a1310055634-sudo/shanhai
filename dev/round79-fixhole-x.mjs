// G79:xingxing 稀疏数组空洞清理(CRLF 变体 ',\r,')——重写版
import fs from 'node:fs'

const targetFile = 'D:/zcode/workspace/default/shanhai/src/data/entities/xingxing.ts'
let srcTxt = fs.readFileSync(targetFile, 'utf8')
const needle = ',\r,'
const cnt = srcTxt.split(needle).length - 1
if (cnt !== 1) { console.error('GUARD', cnt); process.exit(1) }
srcTxt = srcTxt.split(needle).join(',')
fs.writeFileSync(targetFile, srcTxt)
console.log('HOLE(CRLF) FIXED')
