// G66 首页模块卡裸色归零:逐一映射令牌/色距混合,带计数守卫
import { readFileSync, writeFileSync } from 'node:fs'

const DIR = 'D:/zcode/workspace/default/shanhai/src/components/home/'
const CM = (t, p) => `color-mix(in srgb, var(${t}) ${p}%, transparent)`

// [file, oldLine(不含缩进), newLine(不含缩进), expect]
const EDITS = [
  ['AtlasPreview.module.css', 'border-bottom: 1px solid rgba(177, 139, 86, 0.45);', 'border-bottom: 1px solid var(--border-normal);', 1],
  ['ChapterIndex.module.css', 'border-top: 1px solid rgba(177, 139, 86, 0.35);', 'border-top: 1px solid var(--border-normal);', 1],
  ['ChapterIndex.module.css', 'border-bottom: 1px solid rgba(177, 139, 86, 0.45);', 'border-bottom: 1px solid var(--border-normal);', 1],
  ['TodayBeast.module.css', 'border: 1px solid rgba(165, 135, 91, 0.32);', 'border: 1px solid var(--border-normal);', 1],
  ['TodayBeast.module.css', 'outline: 1px solid rgba(165, 135, 91, 0.16);', 'outline: 1px solid var(--border-weak);', 1],
  ['TodayBeast.module.css', 'border: 1px solid rgba(167, 71, 56, 0.32);', `border: 1px solid ${CM('--cinnabar', 32)};`, 1],
  ['TodayBeast.module.css', 'outline: 1px solid rgba(167, 71, 56, 0.16);', `outline: 1px solid ${CM('--cinnabar', 16)};`, 1],
  ['TodayBeast.module.css', 'background: #b85545;', 'background: color-mix(in srgb, var(--cinnabar) 80%, var(--on-canvas-bright));', 1],
  ['TodayBeast.module.css', 'border-left: 1px solid rgba(143, 150, 141, 0.2);', `border-left: 1px solid ${CM('--on-canvas-muted', 20)};`, 1],
  ['TodayBeast.module.css', 'border: 1px solid rgba(177, 139, 86, 0.6);', 'border: 1px solid var(--border-strong);', 1],
  ['TodayBeast.module.css', 'border-top: 1px solid rgba(143, 150, 141, 0.2);', `border-top: 1px solid ${CM('--on-canvas-muted', 20)};`, 1],
  ['ExplorePaths.module.css', 'border: 1px solid rgba(165, 135, 91, 0.32);', 'border: 1px solid var(--border-normal);', 1],
  ['ExplorePaths.module.css', 'outline: 1px solid rgba(165, 135, 91, 0.16);', 'outline: 1px solid var(--border-weak);', 1],
  ['ExplorePaths.module.css', 'border-color: rgba(165, 135, 91, 0.6);', 'border-color: var(--border-strong);', 1],
  ['ExplorePaths.module.css', 'border: 1px solid rgba(177, 139, 86, 0.5);', 'border: 1px solid var(--border-strong);', 1],
  ['SourcePromise.module.css', 'border: 1px solid rgba(167, 71, 56, 0.55);', `border: 1px solid ${CM('--cinnabar', 55)};`, 1],
  ['SourcePromise.module.css', 'background: linear-gradient(to right, rgba(167, 71, 56, 0.5), rgba(167, 71, 56, 0.06));', `background: linear-gradient(to right, ${CM('--cinnabar', 50)}, ${CM('--cinnabar', 6)});`, 1],
  ['SourcePromise.module.css', 'border-top: 1px solid rgba(38, 48, 43, 0.18);', `border-top: 1px solid ${CM('--paper-ink', 18)};`, 1],
  ['SourcePromise.module.css', 'border-bottom: 1px solid rgba(167, 71, 56, 0.45);', `border-bottom: 1px solid ${CM('--cinnabar', 45)};`, 1],
]

let applied = 0
for (const [file, oldL, newL, expect] of EDITS) {
  const p = DIR + file
  const src = readFileSync(p, 'utf8')
  const n = src.split('\n').filter((l) => l.trim() === oldL).length
  if (n !== expect) {
    console.error(`GUARD FAIL ${file}: "${oldL.slice(0, 50)}" found ${n}, expect ${expect}`)
    process.exit(1)
  }
  const out = src.split('\n').map((l) => (l.trim() === oldL ? l.replace(oldL, newL) : l)).join('\n')
  writeFileSync(p, out)
  applied += 1
}

// 复读断言:home/*.module.css 零裸色
let left = 0
for (const f of ['AtlasPreview', 'ChapterIndex', 'TodayBeast', 'ExplorePaths', 'SourcePromise']) {
  const src = readFileSync(DIR + f + '.module.css', 'utf8')
  const m = src.match(/#[0-9a-fA-F]{3,8}\b|rgba?\(/g)
  if (m) { left += m.length; console.error('LEFT', f, m.length) }
}
console.log('APPLIED', applied, '| BARE LEFT', left)
process.exitCode = left === 0 && applied === EDITS.length ? 0 : 1
