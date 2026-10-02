/**
 * G37 一次性补丁:按审计清单给 390 触控档不足的控件补 44px 命中高度。
 * 逐文件在末尾追加 @media (max-width: 768px) 块(与 R17 页脚链接同一手法),
 * 不动桌面档版式。运行:node dev/round37-patch.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const PATCHES = [
  ['src/components/Hero.module.css', ['.scrollCue'], '首页下引指示(↓向下开卷)'],
  ['src/components/home/AtlasPreview.module.css', ['.moreLink'], '山川预览「展开山川地域 →」'],
  ['src/components/home/ChapterIndex.module.css', ['.name', '.moreLink'], '卷目篇章名链接 ×18 + 「查看完整篇章目录 →」'],
  ['src/pages/RelationsPage.module.css', ['.name a', '.related a'], '谱系详表 A[H2] ×15 与 A[LI] ×56'],
  ['src/pages/EntityDetailPage.module.css', ['.relatedLink', '.randomBtn'], '词条页「← 上一篇」等 4 处 + 「随机翻一卷」'],
  ['src/pages/ExplorePage.module.css', ['.journeyEnter', '.stationLink'], '探索页「进入行旅 →」+ 站点链接 ×4'],
  ['src/pages/ChaptersPage.module.css', ['.nameLink'], '篇章目录名链接'],
  ['src/pages/FavoritesPage.module.css', ['.historyName'], '收藏页阅读历史名链接'],
  ['src/pages/AboutPage.module.css', ['.statusLink'], 'About 页「查看图鉴/古卷 →」×2'],
  ['src/pages/ChapterPage.module.css', ['.navLink'], '古卷页「返回篇章目录」'],
]

const MARK = '/* G37 微交互总审计:390 触控档补 44px 命中高度'

for (const [rel, sels, why] of PATCHES) {
  const p = join(root, rel)
  const src = readFileSync(p, 'utf8')
  if (src.includes(MARK)) {
    console.log('SKIP(已打)', rel)
    continue
  }
  const block = `

${MARK}(${why})。桌面档版式不动,仅在 ≤768px 生效。 */
@media (max-width: 768px) {
${sels
  .map(
    (s) => `  ${s} {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
  }`,
  )
  .join('\n\n')}
}
`
  writeFileSync(p, src.replace(/\s*$/u, '') + block)
  console.log('OK  ', rel, '←', sels.join(', '))
}
