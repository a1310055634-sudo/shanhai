/**
 * G37 微交互总审计 · 程序化 CSS 扫描(只读)
 *
 * 扫描 src/**\/*.css,报告:
 *  1) transition / animation 声明中的**裸值时长**(未走 --duration-* 令牌);
 *  2) 裸值缓动关键字(ease / ease-in / ease-out / ease-in-out / linear,未走 --ease-*);
 *  3) 时长的去重分布(检查 duration 阶梯是否收敛);
 *  4) @keyframes 定义与引用是否一一对应(引用了不存在的 keyframes 即报错);
 *  5) reduced-motion 压平规则的覆盖面(base.css 是否对 *,*::before,*::after 全量压平)。
 *
 * 运行:node dev/round37-audit.mjs   (存在裸值 → 退出码 1)
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, relative } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(root, 'src')

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (name.endsWith('.css')) out.push(p)
  }
  return out
}

const files = walk(SRC).sort()
const TIME = /\b\d*\.?\d+(ms|s)\b/gu
const EASE = /\b(ease-in-out|ease-in|ease-out|ease|linear)\b/gu
const DECL = /(^|[;{\s])(transition|animation)(-duration|-timing-function|-delay|-property)?\s*:\s*([^;}]*)/gu

const findings = []
const durations = new Map()
const keyframes = new Map()
const usedKeyframes = new Map()

/** 去掉注释,保留换行以维持行号 */
const stripComments = (s) => s.replace(/\/\*[\s\S]*?\*\//gu, (m) => m.replace(/[^\n]/gu, ' '))

for (const abs of files) {
  const rel = relative(root, abs).replace(/\\/gu, '/')
  const isTokenFile = rel.endsWith('styles/tokens.css')
  const css = stripComments(readFileSync(abs, 'utf8'))
  const lineOf = (idx) => css.slice(0, idx).split('\n').length

  // @keyframes 定义
  for (const m of css.matchAll(/@keyframes\s+([\w-]+)/gu)) {
    keyframes.set(m[1], rel)
  }

  let m
  DECL.lastIndex = 0
  while ((m = DECL.exec(css))) {
    const prop = m[2] + (m[3] ?? '')
    const value = (m[4] ?? '').trim()
    const line = lineOf(m.index)
    if (!value) continue

    // 令牌定义文件本身只统计阶梯,不做裸值判定
    if (!isTokenFile) {
      // 先剔除 var(--...) 引用:令牌名里含 ease/duration 字样,不剔除会误报
      // (如 var(--ease-soft) 会被 \bease\b 命中)
      const bare = value.replace(/var\([^)]*\)/gu, '')
      const times = [...bare.matchAll(TIME)].map((t) => t[0])
      const eases = [...bare.matchAll(EASE)].map((e) => e[0])
      const isNone = /^none\b/u.test(value)
      if (times.length && !isNone) {
        findings.push({ rel, line, prop, value, kind: '裸值时长', detail: times.join(' ') })
      }
      if (eases.length && !isNone) {
        findings.push({ rel, line, prop, value, kind: '裸值缓动', detail: eases.join(' ') })
      }
    }

    // 时长分布(含令牌文件)
    for (const t of value.matchAll(/var\(--duration-([\w-]+)\)/gu)) {
      durations.set(`--duration-${t[1]}`, (durations.get(`--duration-${t[1]}`) ?? 0) + 1)
    }
    for (const t of value.matchAll(TIME)) {
      durations.set(`raw:${t[0]}`, (durations.get(`raw:${t[0]}`) ?? 0) + 1)
    }
  }

  // animation 引用的 keyframes 名
  for (const m2 of css.matchAll(/animation(?:-name)?\s*:\s*([^;}]*)/gu)) {
    const first = m2[1].trim().split(/\s+/u)[0]
    if (first && !/^(none|var\()/u.test(first)) {
      usedKeyframes.set(first, rel)
    }
  }
}

console.log(`== 扫描 ${files.length} 个 CSS 文件 ==\n`)

console.log('== 1/2. 裸值明细(时长为空表示该项已走令牌)==')
if (findings.length === 0) {
  console.log('  零裸值 ✅')
} else {
  for (const f of findings) {
    console.log(`  ${f.rel}:${f.line}  [${f.kind}] ${f.prop}: ${f.value}`)
  }
}

console.log('\n== 3. 时长阶梯使用分布 ==')
for (const [k, v] of [...durations.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${v.toString().padStart(3)} 次  ${k}`)
}

console.log('\n== 4. @keyframes 定义/引用对应 ==')
const defined = [...keyframes.keys()].sort()
console.log(`  定义 ${defined.length} 个:${defined.join(', ')}`)
const dangling = [...usedKeyframes.keys()].filter((k) => !keyframes.has(k))
console.log(`  引用未定义:${dangling.length === 0 ? '无 ✅' : dangling.join(', ')}`)

console.log('\n== 5. reduced-motion 压平覆盖面(base.css)==')
const base = stripComments(readFileSync(join(SRC, 'styles/base.css'), 'utf8'))
const block = /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{([\s\S]*)\}\s*$/u.exec(base)?.[1] ?? ''
const need = ['animation-duration', 'animation-iteration-count', 'transition-duration']
for (const n of need) {
  const has = block.includes(n) && block.includes('!important')
  console.log(`  ${has ? '有' : '缺'} ${n} !important`)
}
const universal = /\*\s*,/u.test(block) && block.includes('*::before') && block.includes('*::after')
console.log(`  ${universal ? '有' : '缺'} 通用选择器覆盖 *, *::before, *::after`)

console.log('\n== 6. 动效令牌是否有死令牌(定义未被任何组件引用)==')
const tokenCss = stripComments(readFileSync(join(SRC, 'styles/tokens.css'), 'utf8'))
const definedMotion = [...tokenCss.matchAll(/(--(?:duration|ease)-[\w-]+)\s*:/gu)].map((m) => m[1])
const usedMotion = new Set()
for (const abs of files) {
  const rel = relative(root, abs).replace(/\\/gu, '/')
  if (rel.endsWith('styles/tokens.css')) continue
  const css = stripComments(readFileSync(abs, 'utf8'))
  for (const m of css.matchAll(/var\((--(?:duration|ease)-[\w-]+)\)/gu)) usedMotion.add(m[1])
}
const dead = definedMotion.filter((t) => !usedMotion.has(t))
console.log(`  定义 ${definedMotion.length} 个动效令牌,组件引用 ${usedMotion.size} 个`)
console.log(`  死令牌:${dead.length === 0 ? '无 ✅' : dead.join(', ') + '(定义未被引用)'}`)

const fail =
  findings.length > 0 ||
  dangling.length > 0 ||
  !universal ||
  need.some((n) => !block.includes(n))
console.log(`\n== 结论:${fail ? 'FAIL(存在裸值或覆盖缺口)' : 'PASS(零裸值;死令牌另行登记,不计失败)'} ==`)
process.exit(fail ? 1 : 0)
