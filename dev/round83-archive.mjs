// G83: 从剥标原料生成两份正式 B1 存档(带档头说明与 [Lnn] 行号)
import { readFileSync, writeFileSync } from 'node:fs'

const ns3 = readFileSync('dev/round83-ns3.txt', 'utf8').split('\n').filter(Boolean)
const xs1 = readFileSync('dev/round83-xs1.txt', 'utf8').split('\n').filter(Boolean)

// PD 模板噪音行过滤(世界公有领域声明)
const isNoise = s => s.includes('公有领域') || s.includes('Public domain')
const ns3Body = ns3.filter(s => !isNoise(s))
const xs1Body = xs1.filter(s => !isNoise(s))

// 三经:L00 题头,L01..=13 段正文,L14 篇末,L15 右南經总记
const ns3Lines = [
  '[L00] 南次三經',
  ...ns3Body.map((s, i) => `[L${String(i + 1).padStart(2, '0')}] ${s}`),
]

// 西山:L00 题头(页面呈现态把「西山經」三字混入首段,原样保留于 L01),L01..=19 山,L20 篇末
const xs1Lines = [
  '[L00] 西山經',
  ...xs1Body.map((s, i) => `[L${String(i + 1).padStart(2, '0')}] ${s}`),
]

const header3 = `# B1 存档 · 中文维基文库《山海經/南山經》南次三经段(呈现态文本,2026-10-05 抓取,G83)

> 来源 URL: https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93
> 抓取方式: curl 呈现态 HTML(121236 字节,与 2026-10-02 B1 二经档抓取量逐字节一致=页面未变动)→ 剥标签取 mw-parser-output 内「南次三經」题头起至篇末(剥 style/script 块防 CSS 残片混入)。
> 〈〉内为郭璞注夹注;「X一作「Y」」为页面自带异文标注——均非正文(P02 政策),审计时逐行可对照。
> 行号 [L00]—[L15]: L01—L13=13 个正文段(篇末总述计「凡一十四山」——旄山之尾/非山之首两个「至於」句式段的计山口径与段数差一,如实照录不校改,G86 录山时以段为单位); L14=篇末总述; L15=「右南經之山志,大小凡四十山,萬六千三百八十里」=南山经全线总记(G88 全线里距闭环的总账锚)。
> 丹穴之山[L03]已在站内(loc-danxue,G01 既有);天虞以下余 12 段为 G86—G88 扩录对象。

`

const headerX = `# B1 存档 · 中文维基文库《山海經/西山經》西次一经段(呈现态文本,2026-10-05 抓取,G83)

> 来源 URL: https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E8%A5%BF%E5%B1%B1%E7%B6%93
> 抓取方式: curl 呈现态 HTML(152870 字节)→ 剥标签取 mw-parser-output 内「西山經」题头起至「西次二經」题头前(剥 style/script 块)。
> 〈〉内为郭璞注夹注;「X一作「Y」」为页面自带异文标注——均非正文(P02 政策)。
> 页面呈现态把题头「西山經」三字混排进首段(L01 行首),原样照录不剥离。
> 行号 [L00]—[L20]: L01—L19=19 山(錢來/松果/太華/小華/符禺/石脆/英山/竹山/浮山/羭次/時山/南山/大時/嶓冢/天帝/臯塗/黃山/翠山/騩山); L20=篇末总述(凡十九山,二千九百五十七里)。
> B2(四库本郭注)西山段尚未建档,G89 开工前补拉;本档供 G89 西次一经开篇(首 4—5 山)与后续阶段扩录。

`

writeFileSync('EDITION_EVIDENCE/wikisource-nanshan3-b1-20261005.txt', header3 + ns3Lines.join('\n') + '\n', 'utf8')
writeFileSync('EDITION_EVIDENCE/wikisource-xishan1-b1-20261005.txt', headerX + xs1Lines.join('\n') + '\n', 'utf8')
console.log('ns3 行数:', ns3Lines.length, '/ xs1 行数:', xs1Lines.length)
console.log('已写 EDITION_EVIDENCE/wikisource-nanshan3-b1-20261005.txt + wikisource-xishan1-b1-20261005.txt')
