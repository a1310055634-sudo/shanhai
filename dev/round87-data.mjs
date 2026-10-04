// G87: 南次三经扩录二(非山首/陽夾/灌湘/雞山)——数据联动(锚选块边界,gn 双引号串)
import { readFileSync, writeFileSync } from 'node:fs'

function edit(p, pairs) {
  let s = readFileSync(p, 'utf8')
  for (const [oldStr, newStr, expect = 1] of pairs) {
    const c = s.split(oldStr).length - 1
    if (c !== expect) throw new Error(`${p} 锚计数 ${c}≠${expect}: ${oldStr.slice(0, 60)}…`)
    s = s.split(oldStr).join(newStr)
  }
  writeFileSync(p, s, 'utf8')
  console.log('OK', p, `(${pairs.length} 处)`)
}

const SRC_ED = `'通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)、维基文库四库本郭璞注(B2)、arteducation.com.tw 繁体排印本与袁珂《山海经校注》本(殆知阁)四源对读(G87;B1×B2 逐字一致为录入门槛,第三四源差异见 variantText/疑点表)'`
const vn = (b1l, b2l) => `2026-10-05 建站核验(G87):四源对读,B1×B2 正文逐字一致(B1 三经档 ${b1l}/B2 存档第 ${b2l} 行)为录入门槛;arteducation/袁本正文同(差异登记疑点);上屏为简体逐字转换(雞→鸡/鮒→鲋/陽→阳 等,对照表见 EDITION_AUDIT.md 三之补14),注文保持繁体未转简。山无词条,郭注存档 citations 不上屏词条页(G71 先例设计内)。`

// —— 1. chapterTexts.ts ——
edit('src/data/chapterTexts.ts', [
  [`    {
      id: 'seg-ns3-gap-feishan-end',
      kind: 'gap',
      section: '南次三经',
      note: '非山之首、阳夹、灌湘、鸡山、令丘、仑者、禺稿、南禺诸段待录入(G87—G88)',
    },`,
   `    {
      // G87:非山之首段(B1 三经档 L06×B2 第82行,逐字一致;无郭注无异文)。
      id: 'seg-ns3-feishan-shou',
      kind: 'text',
      section: '南次三经',
      text: '又东四百里，至于非山之首，其上多金玉，无水，其下多蝮虫。',
      relatedLocationIds: ['loc-feishan'],
    },
    {
      // G87:陽夾之山段(B1 三经档 L07×B2 第84行,逐字一致;无郭注)。
      id: 'seg-ns3-yangjia-shan',
      kind: 'text',
      section: '南次三经',
      text: '又东五百里，曰阳夹之山，无草木，多水。',
      relatedLocationIds: ['loc-yangjia'],
    },
    {
      // G87:灌湘之山段(B1 三经档 L08×B2 第86行)。异文「灌湘之山一作灌湖射之山」
      // 两源同记=疑21。
      id: 'seg-ns3-guanxiang-shan',
      kind: 'text',
      section: '南次三经',
      text: '又东五百里，曰灌湘之山，上多木，无草；多怪鸟，无兽。',
      relatedLocationIds: ['loc-guanxiang'],
    },
    {
      // G87:雞山段(B1 三经档 L09×B2 第88行)。郭注 2 条存档 citations;「黑水山焉」
      // 两源同、arteducation/袁本作「出焉」两案相持=疑22,从底本 B 系照录不校改。
      id: 'seg-ns3-jishan-shan',
      kind: 'text',
      section: '南次三经',
      text: '又东五百里，曰鸡山，其上多金，其下多丹雘。黑水山焉，而南流注于海。其中有鱄鱼，其状如鲋而彘毛，其音如豚，见则天下大旱。',
      relatedLocationIds: ['loc-jishan'],
    },
    {
      id: 'seg-ns3-gap-lingqiu-end',
      kind: 'gap',
      section: '南次三经',
      note: '令丘、仑者、禺稿、南禺诸段待录入(G88)+篇末总述与全线里距闭环',
    },`],
  // GLOSSARY +鱄
  [`  泿: { pinyin: 'yín', hint: '郭注「音銀」;泿水,水名' },`,
   `  泿: { pinyin: 'yín', hint: '郭注「音銀」;泿水,水名' },
  鱄: { pinyin: 'tuán', hint: '郭注「音團扇之團」;鱼名,见则天下大旱' },`],
])

// —— 2. locations.ts:旄山尾补 next + 块边界插入 4 loc ——
edit('src/data/locations.ts', [
  // 旄山尾补 next(锚其 mapPosition 行,块内唯一)
  [`    mapPosition: { x: 82.5, y: 81, region: '南山经' }, // G86:發爽之东锯齿低档,实测裁决
    modernHypotheses: [],`,
   `    nextLocationId: 'loc-feishan', // G87:非山首建站
    mapPosition: { x: 82.5, y: 81, region: '南山经' }, // G86:發爽之东锯齿低档,实测裁决
    modernHypotheses: [],`],
  // 块边界插入:锚=天山块开始(三经四块插其前)
  [`  {
    id: 'loc-tianshan',`,
   `  {
    // G87:南次三经第六山(非山之首,B1 三经档 L06×B2 第82行;「至於…之首」句式;
    // 无郭注无异文)。
    id: 'loc-feishan',
    canonicalName: '非山之首',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次三经',
    sourceOrder: 6,
    previousLocationId: 'loc-maoshan',
    nextLocationId: 'loc-yangjia',
    sourceDirection: '又东',
    sourceDistance: '四百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东四百里，至于非山之首，其上多金玉，无水，其下多蝮虫。',
        chapter: '南山经',
        section: '南次三经第六山(非山之首)',
        sourceEdition: ${SRC_ED},
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText: '无页面自带异文;四源正文一致(G87)。',
        verificationNote: ${JSON.stringify(vn('L06', '82'))},
        verifiedAt: '2026-10-05',
      },
    ],
    mapPosition: { x: 86.5, y: 78, region: '南山经' }, // G87:三经带续排(旄山尾 82.5,81 之东),实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G87:南次三经第七山(B1 三经档 L07×B2 第84行;无郭注)。
    id: 'loc-yangjia',
    canonicalName: '阳夹之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次三经',
    sourceOrder: 7,
    previousLocationId: 'loc-feishan',
    nextLocationId: 'loc-guanxiang',
    sourceDirection: '又东',
    sourceDistance: '五百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东五百里，曰阳夹之山，无草木，多水。',
        chapter: '南山经',
        section: '南次三经第七山',
        sourceEdition: ${SRC_ED},
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText: '无页面自带异文;四源正文一致(G87)。',
        verificationNote: ${JSON.stringify(vn('L07', '84'))},
        verifiedAt: '2026-10-05',
      },
    ],
    mapPosition: { x: 90, y: 81.5, region: '南山经' }, // G87:三经带锯齿,实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G87:南次三经第八山(B1 三经档 L08×B2 第86行;疑21 异文)。
    id: 'loc-guanxiang',
    canonicalName: '灌湘之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次三经',
    sourceOrder: 8,
    previousLocationId: 'loc-yangjia',
    nextLocationId: 'loc-jishan',
    sourceDirection: '又东',
    sourceDistance: '五百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东五百里，曰灌湘之山，上多木，无草；多怪鸟，无兽。',
        chapter: '南山经',
        section: '南次三经第八山',
        sourceEdition: ${SRC_ED},
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText: '「灌湘之山」:底本B1页面自带异文标注「灌湘之山一作「灌湖射之山」」;底本B2四库本同记{{另|灌湘之山|灌湖射之山}}(存档第 86 行)。两源正文均作「灌湘之山」。本站从两源正文,异文登记疑21;arteducation/袁本正文亦作「灌湘之山」。',
        verificationNote: ${JSON.stringify(vn('L08', '86'))},
        verifiedAt: '2026-10-05',
      },
    ],
    mapPosition: { x: 93.5, y: 78, region: '南山经' }, // G87:三经带锯齿,实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G87:南次三经第九山(B1 三经档 L09×B2 第88行;郭注 2 条;疑22「黑水山焉」两案)。
    id: 'loc-jishan',
    canonicalName: '鸡山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次三经',
    sourceOrder: 9,
    previousLocationId: 'loc-guanxiang',
    sourceDirection: '又东',
    sourceDistance: '五百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东五百里，曰鸡山，其上多金，其下多丹雘。黑水山焉，而南流注于海。其中有鱄鱼，其状如鲋而彘毛，其音如豚，见则天下大旱。',
        chapter: '南山经',
        section: '南次三经第九山',
        guoPuNotes: [
          { attach: '丹雘', text: '雘，赤色者，或曰臒，美丹也。見《尚書》，音尺蠖之蠖' },
          { attach: '鱄魚', text: '音團扇之團' },
        ],
        sourceEdition: ${SRC_ED},
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText: '「黑水山焉」:底本B1/B2 两源正文均作「山焉」(B1 三经档 L09/B2 存档第 88 行);arteducation 排印本与袁珂校注本(郝懿行笺疏系统)均作「黑水出焉」——两案相持,本站从底本 B 系照录「山焉」,登记疑22(「山」疑「出」形讹),不校改。G87 新增。',
        verificationNote: ${JSON.stringify(vn('L09', '88'))},
        verifiedAt: '2026-10-05',
      },
    ],
    mapPosition: { x: 97, y: 81.5, region: '南山经' }, // G87:三经带东缘,实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    id: 'loc-tianshan',`],
])

// —— 3. readings.ts:SOUND +鱄行 ——
edit('src/data/readings.ts', [
  [`  {
    char: '泿',`,
   `  {
    char: '鱄',
    layer: 'ruby',
    quote: '音團扇之團',
    line: 88,
    basis: 'sound',
    where: '南次三经·鸡山段「其中有鱄鱼」',
    note: '本站注音层标 tuán,与郭注直音字「團」同读。G87 增补。',
  },
  {
    char: '泿',`],
])

// —— 4. variants.ts:疑21/22 + 头注释 ——
edit('src/data/variants.ts', [
  [`    id: '疑20',`,
   `    id: '疑21',
    topic: '灌湘之山「灌湘」/「灌湖射之山」异文',
    evidence: '底本 B1 页面自带异文标注「灌湘之山一作「灌湖射之山」」;底本 B2 四库本郭璞注同记{{另|灌湘之山|灌湖射之山}}(存档第 86 行)。两源正文均作「灌湘之山」。',
    handling: '正文从两源共用「灌湘之山」,异文照录于 loc-guanxiang variantText 与本表;arteducation/袁本正文亦同。G87 新增。',
    state: '已照录',
  },
  {
    id: '疑22',
    topic: '雞山「黑水山焉」/「黑水出焉」两案相持',
    evidence: '底本 B1 三经档 L09 与 B2 存档第 88 行正文均作「黑水山焉」;arteducation 排印本与袁珂校注本(郝懿行笺疏系统)均作「黑水出焉」——2:2 相持,「山」疑「出」形讹。',
    handling: '本站从底本 B 系(B1×B2 逐字一致)照录「山焉」上屏,异文两案照录于 loc-jishan variantText 与本表,不校改。G87 新增。',
    state: '不裁决',
  },
  {
    id: '疑20',`],
  ['二、疑点登记(疑1—疑20)', '二、疑点登记(疑1—疑22)'],
])
console.log('G87 数据联动完成')
