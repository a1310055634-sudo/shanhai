// G88: 南次三经扩录三(令丘/侖者/禺槀/南禺)+篇末总述+总记+distances ns3 扩展
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

const SRC_ED = `'通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)、维基文库四库本郭璞注(B2)、arteducation.com.tw 繁体排印本与袁珂《山海经校注》本(殆知阁)四源对读(G88;B1×B2 逐字一致为录入门槛,第三四源差异见 variantText/疑点表)'`
const vn = (b1l, b2l) => `2026-10-05 建站核验(G88):四源对读,B1×B2 正文逐字一致(B1 三经档 ${b1l}/B2 存档第 ${b2l} 行)为录入门槛;arteducation/袁本正文同(差异登记疑点);上屏为简体逐字转换(雞→鸡/鮒→鲋/梟→枭/侖→仑/飴→饴/餓→饿 等,对照表见 EDITION_AUDIT.md 三之补15),注文保持繁体未转简。山无词条,郭注存档 citations 不上屏词条页(G71 先例设计内)。`

// —— 1. chapterTexts.ts ——
edit('src/data/chapterTexts.ts', [
  [`    {
      id: 'seg-ns3-gap-lingqiu-end',
      kind: 'gap',
      section: '南次三经',
      note: '令丘、仑者、禺稿、南禺诸段待录入(G88)+篇末总述与全线里距闭环',
    },`,
   `    {
      // G88:令丘之山段(B1 三经档 L10×B2 第90行)。郭注 2 条存档;顒郭注「音娬」、
      // 袁本引作「音娱」(yú),形讹照录从音娱。
      id: 'seg-ns3-lingqiu-shan',
      kind: 'text',
      section: '南次三经',
      text: '又东四百里，曰令丘之山，无草木，多火。其南有谷焉，曰中谷，条风自是出。有鸟焉，其状如枭，人面四目而有耳，其名曰顒，其鸣自号也，见则天下大旱。',
      relatedLocationIds: ['loc-lingqiu'],
    },
    {
      // G88:侖者之山段(B1 三经档 L11×B2 第92行)。郭注 2 条存档(侖者音/白䓘音羔);
      // 「穀」底本原形照录(全局 ruby 会误注「中谷/育遗」之谷,不转写);袁本作「白咎」
      // 独异=疑23;袁本「禺稿」与诸本「槁」=疑24。
      id: 'seg-ns3-lunzhe-shan',
      kind: 'text',
      section: '南次三经',
      text: '又东三百七十里，曰仑者之山，其上多金玉，其下多青雘。有木焉，其状如穀而赤理其汗如漆，其味如饴，食者不饥，可以释劳，其名曰白䓘，可以血玉。',
      relatedLocationIds: ['loc-lunzhe'],
    },
    {
      // G88:禺槀之山段(B1 三经档 L12×B2 第94行)。袁本正文作「禺稿」、其珂案引诸本
      // 作「槁」——三写法并存=疑24,站内从 B1×B2×artedu「槀」。
      id: 'seg-ns3-yugao-shan',
      kind: 'text',
      section: '南次三经',
      text: '又东五百八十里，曰禺槀之山，多怪兽，多大蛇。',
      relatedLocationIds: ['loc-yugao'],
    },
    {
      // G88:南禺之山段(B1 三经档 L13×B2 第96行)。郭注 1 条(鵷鶵亦鳳屬)存档。
      id: 'seg-ns3-nanyu-shan',
      kind: 'text',
      section: '南次三经',
      text: '又东五百八十里，曰南禺之山，其上多金玉，其下多水。有穴焉，水出辄入，夏乃出，冬则闭。佐水出焉，而东南流注于海，有凤皇、鹓雏。',
      relatedLocationIds: ['loc-nanyu'],
    },
    {
      // G88:南次三经篇末总述(B1 三经档 L14×B2 第98行,逐字一致;剥〈祈,請禱也〉注)。
      // 「凡一十四山」与实段 13 段计山口径差=疑25(四源同口径,如实照录)。
      id: 'seg-ns3-tongji',
      kind: 'text',
      section: '南次三经',
      text: '凡南次三经之首，自天虞之山以至南禺之山，凡一十四山，六千五百三十里。其神皆龙身而人面。其祠皆一白狗祈，糈用稌。',
      relatedLocationIds: [],
    },
    {
      // G88:南山经全线总记(B1 三经档 L15,四源同;总记 40 山 16380 里 vs 三段篇末
      // 合计 41 山 16680 里,计数口径差=疑25 关联,如实照录不裁决)。
      id: 'seg-ns3-zongji',
      kind: 'text',
      section: '南次三经',
      text: '右南经之山志，大小凡四十山，万六千三百八十里。',
      relatedLocationIds: [],
    },`],
  // GLOSSARY +顒/䓘
  [`  鱄: { pinyin: 'tuán', hint: '郭注「音團扇之團」;鱼名,见则天下大旱' },`,
   `  鱄: { pinyin: 'tuán', hint: '郭注「音團扇之團」;鱼名,见则天下大旱' },
  顒: { pinyin: 'yú', hint: '郭注「音娬」,袁本引作「音娱」(yú),从音娱,娬 疑形讹照录' },
  䓘: { pinyin: 'gāo', hint: '郭注「音羔」;或作睪蘇,草名' },`],
])

// —— 2. locations.ts ——
edit('src/data/locations.ts', [
  [`    nextLocationId: 'loc-feishan', // G87:非山首建站`,
   `    nextLocationId: 'loc-lingqiu', // G88:令丘建站(非山首之前 G87 已转接)`],
  [`  {
    id: 'loc-tianshan',`,
   `  {
    // G88:南次三经第十山(B1 三经档 L10×B2 第90行;郭注 2 条;顒郭音「音娬」袁本
    // 引「音娱」形讹照录从音娱)。
    id: 'loc-lingqiu',
    canonicalName: '令丘之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次三经',
    sourceOrder: 10,
    previousLocationId: 'loc-jishan3',
    nextLocationId: 'loc-lunzhe',
    sourceDirection: '又东',
    sourceDistance: '四百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东四百里，曰令丘之山，无草木，多火。其南有谷焉，曰中谷，条风自是出。有鸟焉，其状如枭，人面四目而有耳，其名曰顒，其鸣自号也，见则天下大旱。',
        chapter: '南山经',
        section: '南次三经第十山',
        guoPuNotes: [
          { attach: '條風自是出', text: '東北風爲條風。《記》曰：條風至，出輕繋，督逋畱' },
          { attach: '其名曰顒', text: '音娬' },
        ],
        sourceEdition: ${SRC_ED},
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText: '「音娬」:B1/B2 郭注均作「音娬」,袁珂校注本引郭注作「音娱」(yú)——「娬」疑「娱」形讹,注文照录「音娬」原形,本站注音层从「音娱」标 yú。梟/裊(arteducation)为异体白名单对。',
        verificationNote: ${JSON.stringify(vn('L10', '90'))},
        verifiedAt: '2026-10-05',
      },
    ],
    mapPosition: { x: 60, y: 71.5, region: '南山经' }, // G88:三经带回折第二层(西起),实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G88:南次三经第十一山(B1 三经档 L11×B2 第92行;郭注 2 条;白䓘 袁本独异作
    // 「白咎」=疑23;「穀」底本原形照录)。
    id: 'loc-lunzhe',
    canonicalName: '仑者之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次三经',
    sourceOrder: 11,
    previousLocationId: 'loc-lingqiu',
    nextLocationId: 'loc-yugao',
    sourceDirection: '又东',
    sourceDistance: '三百七十里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东三百七十里，曰仑者之山，其上多金玉，其下多青雘。有木焉，其状如穀而赤理其汗如漆，其味如饴，食者不饥，可以释劳，其名曰白䓘，可以血玉。',
        chapter: '南山经',
        section: '南次三经第十一山',
        guoPuNotes: [
          { attach: '侖者之山', text: '音論說之論，一音倫' },
          { attach: '其名曰白䓘', text: '或作睪蘇。睪蘇一名白䓘，見《廣雅》，音羔' },
        ],
        sourceEdition: ${SRC_ED},
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText: '「白䓘」:B1/B2 正文均作「䓘」,arteducation 同;袁珂校注本正文作「白咎」(其引郭注「或作睾苏;睾苏一名白咎」)——3:1 袁本独异,本站从 B 系作「䓘」,登记疑23。「禺槀」三写法见疑24。「穀」为底本原形照录(G30 先例;全局 ruby 层若转「谷」将误注「中谷/育遗」之谷,故不转写)。',
        verificationNote: ${JSON.stringify(vn('L11', '92'))},
        verifiedAt: '2026-10-05',
      },
    ],
    mapPosition: { x: 66, y: 74, region: '南山经' }, // G88:回折第二层,实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G88:南次三经第十二山(B1 三经档 L12×B2 第94行;禺槀/禺稿/槁 三写法=疑24)。
    id: 'loc-yugao',
    canonicalName: '禺槀之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次三经',
    sourceOrder: 12,
    previousLocationId: 'loc-lunzhe',
    nextLocationId: 'loc-nanyu',
    sourceDirection: '又东',
    sourceDistance: '五百八十里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东五百八十里，曰禺槀之山，多怪兽，多大蛇。',
        chapter: '南山经',
        section: '南次三经第十二山',
        sourceEdition: ${SRC_ED},
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText: '「禺槀」:B1/B2/arteducation 均作「槀」;袁珂校注本正文作「禺稿」,其珂案引宋本/吴任臣本/毕沅校本作「槁」——槀/稿/槁 三写法并存,本站从 B1×B2「槀」,登记疑24。',
        verificationNote: ${JSON.stringify(vn('L12', '94'))},
        verifiedAt: '2026-10-05',
      },
    ],
    mapPosition: { x: 72, y: 71.5, region: '南山经' }, // G88:回折第二层,实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G88:南次三经第十三山(末段,B1 三经档 L13×B2 第96行;郭注 1 条;鶵/雛 异体)。
    id: 'loc-nanyu',
    canonicalName: '南禺之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次三经',
    sourceOrder: 13,
    previousLocationId: 'loc-yugao',
    sourceDirection: '又东',
    sourceDistance: '五百八十里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东五百八十里，曰南禺之山，其上多金玉，其下多水。有穴焉，水出辄入，夏乃出，冬则闭。佐水出焉，而东南流注于海，有凤皇、鹓雏。',
        chapter: '南山经',
        section: '南次三经第十三山(末段)',
        guoPuNotes: [
          { attach: '鳳皇、鵷鶵', text: '亦鳳屬' },
        ],
        sourceEdition: ${SRC_ED},
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText: '「鵷鶵」:B1/B2 作「鶵」,arteducation 作「雛」——异体白名单对,上屏转写「鹓雏」。无页面自带「一作」异文。',
        verificationNote: ${JSON.stringify(vn('L13', '96'))},
        verifiedAt: '2026-10-05',
      },
    ],
    mapPosition: { x: 78, y: 74, region: '南山经' }, // G88:回折第二层东端,实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    id: 'loc-tianshan',`],
])

// —— 3. readings.ts:SOUND +顒/䓘 ——
edit('src/data/readings.ts', [
  [`  {
    char: '鱄',`,
   `  {
    char: '顒',
    layer: 'ruby',
    quote: '音娬(袁本引作「音娱」)',
    line: 90,
    basis: 'sound',
    where: '南次三经·令丘之山段「其名曰顒」',
    note: '本站注音层标 yú。B1/B2 郭注作「音娬」,袁本引作「音娱」,娬 疑形讹,从音娱。G88 增补。',
  },
  {
    char: '䓘',
    layer: 'ruby',
    quote: '音羔',
    line: 92,
    basis: 'sound',
    where: '南次三经·仑者之山段「其名曰白䓘」',
    note: '本站注音层标 gāo,与郭注直音字「羔」同读。G88 增补。',
  },
  {
    char: '鱄',`],
])

// —— 4. variants.ts:疑23/24/25 + 头注 ——
edit('src/data/variants.ts', [
  [`    id: '疑22',`,
   `    id: '疑23',
    topic: '仑者之山「白䓘」/「白咎」异文(袁本独异)',
    evidence: '底本 B1/B2 与 arteducation 排印本正文均作「白䓘」;袁珂校注本正文作「白咎」,其引郭注「或作睾苏;睾苏一名白咎,见广雅,音羔」——3:1 袁本独异。',
    handling: '本站从 B 系作「䓘」(上屏「白䓘」),袁本异文照录于 loc-lunzhe variantText 与本表。G88 新增。',
    state: '已照录',
  },
  {
    id: '疑24',
    topic: '「禺槀」/「禺稿」/「禺槁」三写法并存',
    evidence: '底本 B1/B2 与 arteducation 均作「禺槀」;袁珂校注本正文作「禺稿」,其珂案引宋本/吴任臣本/毕沅校本作「禺槁」。',
    handling: '本站从 B1×B2「槀」,三写法照录于 loc-yugao variantText 与本表,不校改。G88 新增。',
    state: '不裁决',
  },
  {
    id: '疑25',
    topic: '南次三经「凡一十四山」计山口径与南山全线「凡四十山」总记计数',
    evidence: '篇末「凡一十四山」为四源同口径,而经文实分段 13 段(旄山之尾/非山之首两个「至於」句式段与经首天虞无里距段的计山法与段数不一致);南山经三段篇末合计 10+17+14=41 山、16680 里,总记行「大小凡四十山,万六千三百八十里」——山数差 1、里数差 300,四源同口径(底本自带)。',
    handling: '篇末与总记照录上屏,计数口径如实存疑不裁决;DistanceTable 南次三经存疑区列明。G88 新增。',
    state: '不裁决',
  },
  {
    id: '疑22',`],
  ['二、疑点登记(疑1—疑22)', '二、疑点登记(疑1—疑25)'],
])
console.log('G88 数据联动完成')
