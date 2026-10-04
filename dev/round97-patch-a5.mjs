// 补丁:round97-verify.mjs 的 A5 段替换为 G70 正版两遍法采样器
import { readFileSync, writeFileSync } from 'node:fs'

const p = 'dev/round97-verify.mjs'
const lines = readFileSync(p, 'utf8').split('\n')
// 定位:A5 注释行起,至 rec(`A5 对比度... 行止
const start = lines.findIndex(l => l.includes('A5 对比度全站复跑(18 路由'))
const end = lines.findIndex(l => l.includes("rec(`A5 对比度全站复跑"))
if (start < 0 || end < 0 || end < start) throw new Error('A5 段定位失败 ' + start + ',' + end)

const newSeg = [
  "  // A5 对比度全站复跑(G70 正版两遍法采样器,18 路由×双主题×12 样本)",
  "  const src70 = readFileSync('D:/zcode/workspace/default/shanhai/dev/round70-walk.mjs', 'utf8')",
  "  const m70 = src70.match(/const CONTRAST_EVAL = `([\\s\\S]*)`/)",
  "  if (!m70) throw new Error('CONTRAST_EVAL 提取失败')",
  "  const expr70 = m70[1]",
  '  let totalSamples = 0, totalFails = 0',
  '  const failDetail = []',
  "  for (const theme of ['deng', 'qing']) {",
  '    for (const path of ALL_ROUTES) {',
  "      await goto(cdp, path, `document.body.textContent.length>200?1:0`)",
  '      await evalOn(cdp, `document.documentElement.setAttribute(\'data-theme\',\'${theme}\');document.querySelectorAll(\'*\').forEach(el=>{el.style.transition=\'none\'});1`)',
  '      const r = await evalOn(cdp, expr70)',
  '      totalSamples += r.sampled',
  '      totalFails += r.fails.length',
  '      if (r.fails.length) failDetail.push({ theme, path, fails: r.fails })',
  '    }',
  '  }',
  '  rec(`A5 对比度全站复跑: ${totalSamples} 采样,失败 ${totalFails}`, totalFails === 0, failDetail.length ? JSON.stringify(failDetail.slice(0, 3)) : `零失败(G70 两遍法,两主题×18 路由)`)',
]

const out = [...lines.slice(0, start), ...newSeg, ...lines.slice(end + 1)]
writeFileSync(p, out.join('\n'), 'utf8')
console.log('A5 段已替换为 G70 正版采样器,新行数', out.length)
