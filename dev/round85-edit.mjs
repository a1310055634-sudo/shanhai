// G85: 咸陰之山录山七件套联动(倒序替换防序号污染,唯一锚+计数守卫)
import { readFileSync, writeFileSync } from 'node:fs'

function edit(p, pairs) {
  let s = readFileSync(p, 'utf8')
  for (const [oldStr, newStr, expect = 1] of pairs) {
    const c = s.split(oldStr).length - 1
    if (c !== expect) throw new Error(`${p} 锚计数 ${c}≠${expect}: ${oldStr.slice(0, 50)}…`)
    s = s.split(oldStr).join(newStr)
  }
  writeFileSync(p, s, 'utf8')
  console.log('OK', p, `(${pairs.length} 处)`)
}

// —— 1. locations.ts(倒序:16→17 起) ——
edit('src/data/locations.ts', [
  // 漆吳 16→17
  ["    section: '南次二经第十六山(末录;第十七山咸陰之山悬置见疑15)',",
   "    section: '南次二经第十七山(末录;全经十七山录毕,G85 咸陰闭环)',", 1],
  ['    sourceOrder: 16,', '    sourceOrder: 17,', 1],
  // 鹿吳 15→16
  ["    section: '南次二经第十五山',", "    section: '南次二经第十六山',", 1],
  ['    sourceOrder: 15,', '    sourceOrder: 16,', 1],
  // 區吳 14→15
  ["    section: '南次二经第十四山',", "    section: '南次二经第十五山',", 1],
  ['    sourceOrder: 14,', '    sourceOrder: 15,', 1],
  // 虖勺 13→14
  ["    section: '南次二经第十三山',", "    section: '南次二经第十四山',", 1],
  ['    sourceOrder: 13,', '    sourceOrder: 14,', 1],
  // 洵山 12→13 + 链改
  ["    section: '南次二经第十二山',", "    section: '南次二经第十三山',", 1],
  ['    sourceOrder: 12,', '    sourceOrder: 13,', 1],
  ["    previousLocationId: 'loc-pugou',", "    previousLocationId: 'loc-xianyin',", 1],
  // 僕勾 next → 咸陰
  ["    nextLocationId: 'loc-xunshan', // G73:洵山建站",
   "    nextLocationId: 'loc-xianyin', // G85:咸陰建站(闭环第十七山)", 1],
  // 插入咸陰块(锚=洵山块注释开头,唯一)
  [`  {
    // G73:南次二经第十二山(2026-10-04 经底本B1 存档 L13×B2 第58行两源净化正文`,
   `  {
    // G85:南次二经第十二山(2026-10-05 四源对读后录入:B1 存档 L12×B2 第56行×
    // arteducation 排印本×袁珂校注本,四源全作「五百里」;维基文库页面修订史核查
    // 2026-02-21 后零编辑,确证 G72「B1 四百里」为当时误记,勘误见疑15 与
    // EDITION_AUDIT 三之补12)。无郭注(B2 该行无注)。
    id: 'loc-xianyin',
    canonicalName: '咸阴之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次二经',
    sourceOrder: 12,
    previousLocationId: 'loc-pugou',
    nextLocationId: 'loc-xunshan',
    sourceDirection: '又东',
    sourceDistance: '五百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东五百里，曰咸阴之山，无草木，无水。',
        chapter: '南山经',
        section: '南次二经第十二山',
        sourceEdition:
          '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)、维基文库四库本郭璞注(B2)、arteducation.com.tw 繁体排印本与袁珂《山海经校注》本(殆知阁)四源对读逐字一致(G85);勘误史见 variantText 与疑15',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText:
          '里距数字勘误记录(疑15,G85 定谳):G72(2026-10-03)曾记「B1 四百里/B2 五百里两源互异」并悬置;G85 四源对读——B1 存档(2026-10-02 抓取)L12、B2 第 56 行、arteducation 排印本、袁珂校注本全作「又东五百里」,且维基文库页面修订史(API 实查)显示 2026-02-21 后零编辑——G72「四百里」系当时误读误记(「四百」与「五百」等字长,字节对账不可见,当时未存档页面快照)。本站从四源一致作「五百里」,疑15 转勘误记录存档。',
        verificationNote:
          '2026-10-05 建站核验(G85):四源正文逐字一致(B1 存档 L12 行/B2 存档第 56 行/arteducation bookv_1 页/袁本殆知阁档;「鹹/咸」为异形白名单对);上屏为简体逐字转换(東→东/陰→阴/無→无,对照见 EDITION_AUDIT.md 三之补12)。段无郭注(B2 该行无注)。',
        verifiedAt: '2026-10-05',
      },
    ],
    mapPosition: { x: 79.5, y: 91, region: '南山经' }, // G85:仆勾(77,92.6)/洵山(81.5,89.5)之间尾列中档,线性预解+实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G73:南次二经第十二山(2026-10-04 经底本B1 存档 L13×B2 第58行两源净化正文`, 1],
])

// —— 2. distances.ts(倒序) ——
edit('src/data/distances.ts', [
  ["  { order: 16, name: '漆吴之山', locationId: 'loc-qiwu', li: 500 },",
   "  { order: 17, name: '漆吴之山', locationId: 'loc-qiwu', li: 500 },", 1],
  ["  { order: 15, name: '鹿吴之山', locationId: 'loc-luwu', li: 500 },",
   "  { order: 16, name: '鹿吴之山', locationId: 'loc-luwu', li: 500 },", 1],
  ["  { order: 14, name: '区吴之山', locationId: 'loc-quwu', li: 500 },",
   "  { order: 15, name: '区吴之山', locationId: 'loc-quwu', li: 500 },", 1],
  ["  { order: 13, name: '虖勺之山', locationId: 'loc-hushao', li: 400 },",
   "  { order: 14, name: '虖勺之山', locationId: 'loc-hushao', li: 400 },", 1],
  ["  { order: 12, name: '洵山', locationId: 'loc-xunshan', li: 400 },",
   "  { order: 12, name: '咸阴之山', locationId: 'loc-xianyin', li: 500 },\n  { order: 13, name: '洵山', locationId: 'loc-xunshan', li: 400 },", 1],
])

// —— 3. DistanceTable.tsx 存疑区闭环化 ——
edit('src/components/DistanceTable.tsx', [
  [`                <li>
                  篇末作「凡{cnNum(summary.mountainsInText)}山」;底本B1页面南次二经实列十七山
                  (自柜山至漆吴之山),与篇末数合——底本A未核,实列计数不预判。
                </li>`,
   `                <li>
                  篇末作「凡{cnNum(summary.mountainsInText)}山」;底本B1页面南次二经实列十七山
                  (自柜山至漆吴之山),与篇末数合——四源对读已核(G84/G85),实列计数与篇末数相合。
                </li>`, 1],
  [`                <li>
                  本站已录{cnNum(summary.countedMountains)}山逐段相加 {summary.sum} 里,篇末作{' '}
                  {summary.totalInText} 里——尚缺{cnNum(summary.mountainsInText - summary.countedMountains)}山
                  (咸陰之山,B1「四百里」与B2「五百里」两源互异、正文未达逐字一致门槛,按红线不录,见疑15),
                  相加校核缺口 {cnNum(Math.abs(summary.delta))} 里如实待续,不凑行。
                </li>`,
   `                <li>
                  十七山已全录(G85 咸陰之山经四源对读录入,勘误见疑15):逐段相加 {summary.sum} 里,篇末作{' '}
                  {summary.totalInText} 里——相差 {cnNum(Math.abs(summary.delta))} 里,缺口所指文献未明,如实存疑不裁决。
                </li>`, 1],
])

// —— 4. variants.ts 疑15 勘误定谳 ——
edit('src/data/variants.ts', [
  [`    topic: '咸陰之山里距两源互异(四百里/五百里)',
    evidence: '底本 B1 存档 L12 行作「又東四百里,曰咸陰之山」;底本 B2 存档第 56 行作「又東五百里,曰咸陰之山」。正文里距数字两源互异,逐字一致门槛未达。',
    handling: '咸陰之山本轮不录正文(不凑数),gap 注如实;待底本 A 照录后三源对读裁决。G72 新增。',`,
   `    topic: '咸陰之山里距勘误定谳(四源一致作「五百里」;G72「四百里」系误记)',
    evidence: 'G85(2026-10-05)四源对读:B1 存档 L12 行、B2 存档第 56 行、arteducation 繁体排印本、袁珂《山海经校注》本(殆知阁档)全作「又東五百里,曰咸陰之山,無草木,無水」;维基文库页面修订史(API 实查)显示 2026-02-21 后零编辑。G72(2026-10-03)所记「B1 四百里」系当时误读误记——「四百」与「五百」等字长,字节对账不可见,当时未存档页面快照。',
    handling: 'G85 录山闭环:正文从四源一致作「五百里」,recordStatus=verified(逐字一致+异形白名单「鹹/咸」),南次二经 17/17 全录;勘误史存档于 EDITION_AUDIT 三之补12 与 round84/85 源存档。G72 悬置裁决按当时证据合规,本条为诚实勘误,不改历史 RUN_LOG。',`, 1],
])

console.log('全部编辑完成')
