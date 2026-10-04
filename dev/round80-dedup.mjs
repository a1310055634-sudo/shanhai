// G80 去重:删除本轮重复追加的「彙證」条(上轮已有更细版本),保留 cross-ref
import fs from 'node:fs'

for (const f of ['gudiao', 'xun']) {
  const p = 'D:/zcode/workspace/default/shanhai/src/data/entities/' + f + '.ts'
  let s = fs.readFileSync(p, 'utf8')
  const marker = "era: '清·吳任臣《山海經廣注》彙證"
  if (s.split(marker).length - 1 !== 1) { console.error('GUARD marker', f); process.exit(1) }
  const mStart = s.indexOf(marker)
  // 回溯到该条目的块头 "    {"
  const braceOpen = s.lastIndexOf('    {\n      era:', mStart)
  if (braceOpen < 0) { console.error('GUARD braceOpen', f); process.exit(1) }
  // 找块尾:从 mStart 起第一个 "\n    },"
  const mEndRel = s.indexOf('\n    },', mStart)
  if (mEndRel < 0) { console.error('GUARD mEnd', f); process.exit(1) }
  const mEnd = mEndRel + '\n    },'.length
  // 连同前导逗号一起删(块头前应有 ",\n")
  let start = braceOpen
  if (s[braceOpen - 1] === ',') start = braceOpen - 1
  s = s.slice(0, start) + s.slice(mEnd)
  // 顺带清可能遗留的空洞
  s = s.split(',\r\n,').join(',').split(',\n,').join(',').split(',,').join(',')
  fs.writeFileSync(p, s)
  console.log('DEDUPED', f)
}
