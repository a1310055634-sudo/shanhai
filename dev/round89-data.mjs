// G89: 西次一经开篇(錢來/松果/太華/小華/符禺)——新章文本+5 loc+GLOSSARY/SOUND
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

const SRC_ED = `'通行本(郭璞注系统),据中文维基文库《山海經/西山經》页面文本(B1,2026-10-05 档)、维基文库四库本郭璞注 wikitext(B2,2026-10-05 档)、arteducation.com.tw 西山经页(bookv_2)与袁珂《山海经校注》本(殆知阁)四源对读(G89;B1×B2 逐字一致为录入门槛;arteducation「濩」字缺字显示为囗、【牛乍】/【蟲遺】为缺字拆字展示,均非异文)'`
const vn = (b1l, b2l) => `2026-10-05 建站核验(G89):四源对读,B1×B2 正文逐字一致(B1 西山档 ${b1l}/B2 存档第 ${b2l} 行)为录入门槛;arteducation/袁本正文同;上屏为简体逐字转换(錢→钱/馬→马/華→华/條→条/棗→枣/聾→聋/銅→铜/雞→鸡 等,对照表见 EDITION_AUDIT.md 三之补16),注文保持繁体未转简。山无词条,郭注存档 citations 不上屏词条页(G71 先例设计内)。`

// —— 1. chapterTexts.ts:XISHAN 章+GLOSSARY+10 ——
edit('src/data/chapterTexts.ts', [
  // 新章插在 NANSHAN 定义之前
  [`const NANSHAN: ChapterText = {`,
   `// G89:西山经章文本(西次一经开篇 5/19 山;B1 西山档 wikisource-xishan1-b1-20261005
// ×B2 wikisource-xishan1-guopu-20261005 四源对读;余山留工作稿待后续阶段呈报)。
const XISHAN: ChapterText = {
  segments: [
    {
      // G89:錢來之山(西次一经第一山,经首段;郭注 3 条存档;羬音針/腊音昔)。
      id: 'seg-xs1-qianlai',
      kind: 'text',
      section: '西次一经',
      text: '西山经华山之首，曰钱来之山，其上多松，其下多洗石。有兽焉，其状如羊而马尾，名曰羬羊，其脂可以已腊。',
      relatedLocationIds: ['loc-qianlai'],
    },
    {
      // G89:松果之山(第二山;郭注 2 条;䳋音彤;𦢊 代理对原形照录,郭注反切「音叵駮反」)。
      id: 'seg-xs1-songguo',
      kind: 'text',
      section: '西次一经',
      text: '西四十五里，曰松果之山。濩水出焉，北流注于渭，其中多铜。有鸟焉，其名曰䳋渠，其状如山鸡，黑身赤足，可以已𦢊。',
      relatedLocationIds: ['loc-songguo'],
    },
    {
      // G89:太華之山(第三山;郭注 4 条;肥𧔥 代理对原形照录,郭注「復有肥遺蛇疑是
      // 同名」,音从遗 yí)。
      id: 'seg-xs1-taihua',
      kind: 'text',
      section: '西次一经',
      text: '又西六十里，曰太华之山，削成而四方，其高五千仞，其广十里，鸟兽莫居。有蛇焉，名曰肥𧔥，六足四翼，见则天下大旱。',
      relatedLocationIds: ['loc-taihua'],
    },
    {
      // G89:小華之山(第四山;郭注 6 条;㸲音昨/鷩音作蔽/㻬琈雩浮兩音)。
      id: 'seg-xs1-xiaohua',
      kind: 'text',
      section: '西次一经',
      text: '又西八十里，曰小华之山，其木多荆杞，其兽多㸲牛，其阴多磬石，其阳多㻬琈之玉，鸟多赤鷩，可以御火，其草有萆荔，状如乌韭，而生于石上，亦缘木而生，食之已心痛。',
      relatedLocationIds: ['loc-xiaohua'],
    },
    {
      // G89:符禺之山(第五山;郭注 3 条;鴖音旻;loc-fuyu 为二经浮玉先占,符禺用
      // loc-fuyux)。
      id: 'seg-xs1-fuyu',
      kind: 'text',
      section: '西次一经',
      text: '又西八十里，曰符禺之山，其阳多铜，其阴多铁。其上有木焉，名曰文茎，其实如枣，可以已聋。其草多条，其状如葵，而赤华黄实，如婴儿舌，食之使人不惑。符禺之水出焉，而北流注于渭。其兽多葱聋，其状如羊而赤鬣。其鸟多鴖，其状如翠而赤喙，可以御火。',
      relatedLocationIds: ['loc-fuyux'],
    },
    {
      id: 'seg-xs1-tongji',
      kind: 'text',
      section: '西次一经',
      text: '凡西经之首，自钱来之山至于騩山，凡十九山，二千九百五十七里。',
      relatedLocationIds: [],
    },
    {
      id: 'seg-xs1-gap-continuous',
      kind: 'gap',
      section: '西次一经',
      note: '羭次之山以下十四山待后续阶段扩录呈报(西次一经共十九山;华山区祠礼段随篇末在 B1 西山档 L20 照录存档,待全经录毕上屏)',
    },
  ],
}

const NANSHAN: ChapterText = {`],
  // 注册 CHAPTER_TEXTS
  [`export const CHAPTER_TEXTS: Record<string, ChapterText> = {
  'nanshan-jing': NANSHAN,
}`,
   `export const CHAPTER_TEXTS: Record<string, ChapterText> = {
  'nanshan-jing': NANSHAN,
  'xishan-jing': XISHAN,
}`],
  // GLOSSARY +10
  [`  䓘: { pinyin: 'gāo', hint: '郭注「音羔」;或作睪蘇,草名' },`,
   `  䓘: { pinyin: 'gāo', hint: '郭注「音羔」;或作睪蘇,草名' },
  羬: { pinyin: 'zhēn', hint: '郭注「羬音針」;羊身马尾之兽(羬羊)' },
  腊: { pinyin: 'xī', hint: '郭注「腊音昔」;体皴,此指干裂之症' },
  䳋: { pinyin: 'tóng', hint: '郭注「䳋,音彤弓之彤」;䳋渠,鸟名' },
  𦢊: { pinyin: 'bó', hint: '郭注反切「音叵駮反」;皮皴起(代理对字,G30 u 旗护栏内)' },
  𧔥: { pinyin: 'yí', hint: '郭注「復有肥遺蛇,疑是同名」,音从遗;肥𧔥,六足四翼之蛇(代理对字)' },
  㸲: { pinyin: 'zuó', hint: '郭注「音昨」;山牛(㸲牛)' },
  鷩: { pinyin: 'biē', hint: '郭注「音作蔽,或作鳖」;赤鷩,山鸡之属' },
  㻬: { pinyin: 'yú', hint: '郭注「雩浮兩音」;㻬琈,玉名(㻬)' },
  琈: { pinyin: 'fú', hint: '郭注「雩浮兩音」;㻬琈,玉名(琈)' },
  鴖: { pinyin: 'mín', hint: '郭注「音旻」;鸟名,其状如翠赤喙' },`],
])

// —— 2. chapters.ts:西山经 contentStatus ——
edit('src/data/chapters.ts', [
  [`{ id: 'ch-xishan', slug: 'xishan-jing', name: '西山经', order: 2, group: '山经', contentStatus: 'pending' },`,
   `{ id: 'ch-xishan', slug: 'xishan-jing', name: '西山经', order: 2, group: '山经', contentStatus: 'partial' },`],
])

// —— 3. locations.ts:块边界(天山块前?已被占)——用文件尾数组闭合前插入 ——
edit('src/data/locations.ts', [
  [`]

export function getLocation(id: string): Location | undefined {`,
   `  {
    // G89:西次一经第一山(经首段;B1 西山档 L01×B2 第 14 行;郭注 3 条;羬音針/腊音昔)。
    id: 'loc-qianlai',
    canonicalName: '钱来之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-xishan',
    subClassic: '西次一经',
    sourceOrder: 1,
    nextLocationId: 'loc-songguo',
    sourceDirection: '',
    sourceDistance: '',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '西山经华山之首，曰钱来之山，其上多松，其下多洗石。有兽焉，其状如羊而马尾，名曰羬羊，其脂可以已腊。',
        chapter: '西山经',
        section: '西次一经第一山',
        guoPuNotes: [
          { attach: '洗石', text: '澡洗可以磢體，去垢圿。磢，初兩反' },
          { attach: '羬羊', text: '今大月氐國有大羊如驢，而馬尾。《爾雅》云：羊六尺爲羬，謂此羊也。羬音針' },
          { attach: '已腊', text: '治體皴。腊音昔' },
        ],
        sourceEdition: ${SRC_ED},
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E8%A5%BF%E5%B1%B1%E7%B6%93',
        variantText: '无页面自带异文;四源正文一致(G89)。arteducation「腊」作规范繁体「臘」,与底本古形「腊」为同字异形白名单对。',
        verificationNote: ${JSON.stringify(vn('L01', '14'))},
        verifiedAt: '2026-10-05',
      },
    ],
    mapPosition: { x: 30, y: 40, region: '西山经' }, // G89:西次一经带(昆仑等西次三经点 53-66,18-32 之西南空带),实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G89:西次一经第二山(B1 西山档 L02×B2 第 16 行;郭注 2 条;𦢊 代理对原形照录)。
    id: 'loc-songguo',
    canonicalName: '松果之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-xishan',
    subClassic: '西次一经',
    sourceOrder: 2,
    previousLocationId: 'loc-qianlai',
    nextLocationId: 'loc-taihua',
    sourceDirection: '西',
    sourceDistance: '四十五里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '西四十五里，曰松果之山。濩水出焉，北流注于渭，其中多铜。有鸟焉，其名曰䳋渠，其状如山鸡，黑身赤足，可以已𦢊。',
        chapter: '西山经',
        section: '西次一经第二山',
        guoPuNotes: [
          { attach: '䳋渠', text: '䳋，音彤弓之彤' },
          { attach: '已𦢊', text: '謂皮皴起也。音叵駮反' },
        ],
        sourceEdition: ${SRC_ED},
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E8%A5%BF%E5%B1%B1%E7%B6%93',
        variantText: '无页面自带异文;四源正文一致。arteducation「濩」字缺字显示为「囗」(其站字体缺字,非异文);袁本作「濩水」同底本。',
        verificationNote: ${JSON.stringify(vn('L02', '16'))},
        verifiedAt: '2026-10-05',
      },
    ],
    mapPosition: { x: 36, y: 42, region: '西山经' }, // G89:西次一经带锯齿,实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G89:西次一经第三山(B1 西山档 L03×B2 第 18 行;郭注 4 条;肥𧔥 代理对)。
    id: 'loc-taihua',
    canonicalName: '太华之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-xishan',
    subClassic: '西次一经',
    sourceOrder: 3,
    previousLocationId: 'loc-songguo',
    nextLocationId: 'loc-xiaohua',
    sourceDirection: '又西',
    sourceDistance: '六十里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又西六十里，曰太华之山，削成而四方，其高五千仞，其广十里，鸟兽莫居。有蛇焉，名曰肥𧔥，六足四翼，见则天下大旱。',
        chapter: '西山经',
        section: '西次一经第三山',
        guoPuNotes: [
          { attach: '太華之山', text: '即西岳華陰山也。今在弘農，華陰縣西南' },
          { attach: '削成而四方', text: '今山形上大下小，峭峻也' },
          { attach: '其廣十里', text: '仞，八尺也。上有明星玉女，持玉漿得上，服之即成仙。道險僻不通，時含神霧云' },
          { attach: '肥𧔥', text: '湯時此蛇見於陽山下。復有肥遺蛇，疑是同名' },
        ],
        sourceEdition: ${SRC_ED},
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E8%A5%BF%E5%B1%B1%E7%B6%93',
        variantText: '「肥𧔥」:B1/B2 原文作「𧔥」,arteducation 缺字拆字显示为「【蟲遺】」(其站字体缺字,非异文);袁本简体域同。郭注「復有肥遺蛇,疑是同名」——本站注音层音从遗(yí)。',
        verificationNote: ${JSON.stringify(vn('L03', '18'))},
        verifiedAt: '2026-10-05',
      },
    ],
    mapPosition: { x: 42, y: 40, region: '西山经' }, // G89:西次一带锯齿,实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G89:西次一经第四山(B1 西山档 L04×B2 第 20 行;郭注 6 条;㸲/鷩/㻬琈 郭音)。
    id: 'loc-xiaohua',
    canonicalName: '小华之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-xishan',
    subClassic: '西次一经',
    sourceOrder: 4,
    previousLocationId: 'loc-taihua',
    nextLocationId: 'loc-fuyux',
    sourceDirection: '又西',
    sourceDistance: '八十里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又西八十里，曰小华之山，其木多荆杞，其兽多㸲牛，其阴多磬石，其阳多㻬琈之玉，鸟多赤鷩，可以御火，其草有萆荔，状如乌韭，而生于石上，亦缘木而生，食之已心痛。',
        chapter: '西山经',
        section: '西次一经第四山',
        guoPuNotes: [
          { attach: '小華之山', text: '即少華山' },
          { attach: '㸲牛', text: '今華陽山中多山牛山羊，肉皆千斤，牛即此牛也，音昨' },
          { attach: '磬石', text: '可以爲樂石' },
          { attach: '㻬琈之玉', text: '㻬琈玉，名所未詳也。雩浮兩音' },
          { attach: '赤鷩', text: '赤鷩，山雞之屬。胷腹、洞赤、冠金皆黃頭綠尾，中有赤毛，彩鮮明。音作蔽，或作鱉' },
          { attach: '萆荔', text: '萆荔，香草也。蔽戾兩音' },
        ],
        sourceEdition: ${SRC_ED},
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E8%A5%BF%E5%B1%B1%E7%B6%93',
        variantText: '「㸲牛」:B1/B2 作「㸲」,arteducation 缺字拆字显示「【牛乍】」(非异文);郭注「音昨」。无页面自带「一作」异文。',
        verificationNote: ${JSON.stringify(vn('L04', '20'))},
        verifiedAt: '2026-10-05',
      },
    ],
    mapPosition: { x: 48, y: 42, region: '西山经' }, // G89:西次一带锯齿,实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G89:西次一经第五山(B1 西山档 L05×B2 第 22 行;郭注 3 条;鴖音旻;
    // loc-fuyu 为二经浮玉先占,符禺用 loc-fuyux)。
    id: 'loc-fuyux',
    canonicalName: '符禺之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-xishan',
    subClassic: '西次一经',
    sourceOrder: 5,
    previousLocationId: 'loc-xiaohua',
    sourceDirection: '又西',
    sourceDistance: '八十里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又西八十里，曰符禺之山，其阳多铜，其阴多铁。其上有木焉，名曰文茎，其实如枣，可以已聋。其草多条，其状如葵，而赤华黄实，如婴儿舌，食之使人不惑。符禺之水出焉，而北流注于渭。其兽多葱聋，其状如羊而赤鬣。其鸟多鴖，其状如翠而赤喙，可以御火。',
        chapter: '西山经',
        section: '西次一经第五山',
        guoPuNotes: [
          { attach: '鴖', text: '音旻' },
          { attach: '赤喙', text: '翠似燕而紺色也' },
          { attach: '可以禦火', text: '畜之辟火災也' },
        ],
        sourceEdition: ${SRC_ED},
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E8%A5%BF%E5%B1%B1%E7%B6%93',
        variantText: '无页面自带异文;四源正文一致(arteducation「禦」作「御」,异形白名单对)。「赤鬛」之「鬛」为俗字照录(G29 先例,与「鬣」同)。id 说明:loc-fuyu 为南次二经浮玉之山(G30)先占,本山(符禺)加 x 后缀。',
        verificationNote: ${JSON.stringify(vn('L05', '22'))},
        verifiedAt: '2026-10-05',
      },
    ],
    mapPosition: { x: 54, y: 44, region: '西山经' }, // G89:西次一带东端,实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },
]

export function getLocation(id: string): Location | undefined {`],
])

// —— 4. readings.ts:SOUND +10(锚首条目) ——
edit('src/data/readings.ts', [
  [`  {
    char: '顒',`,
   `  {
    char: '羬',
    layer: 'ruby',
    quote: '音針',
    line: 14,
    basis: 'sound',
    where: '西次一经·钱来之山「名曰羬羊」',
    note: '本站注音层标 zhēn,与郭注直音字「針」同读。G89 增补。',
  },
  {
    char: '腊',
    layer: 'ruby',
    quote: '腊音昔',
    line: 14,
    basis: 'sound',
    where: '西次一经·钱来之山「其脂可以已腊」',
    note: '本站注音层标 xī,与郭注直音字「昔」同读。G89 增补。',
  },
  {
    char: '䳋',
    layer: 'ruby',
    quote: '音彤弓之彤',
    line: 16,
    basis: 'sound',
    where: '西次一经·松果之山「其名曰䳋渠」',
    note: '本站注音层标 tóng,与郭注直音「彤」同读。G89 增补。',
  },
  {
    char: '𦢊',
    layer: 'ruby',
    quote: '音叵駮反',
    line: 16,
    basis: 'sound',
    where: '西次一经·松果之山「可以已𦢊」',
    note: '本站注音层标 bó,郭注反切「叵駮」。代理对字,annotate u 旗护栏内,G30 先例。G89 增补。',
  },
  {
    char: '𧔥',
    layer: 'ruby',
    quote: '復有肥遺蛇,疑是同名',
    line: 18,
    basis: 'sound',
    where: '西次一经·太华之山「名曰肥𧔥」',
    note: '本站注音层标 yí,从郭注「肥遺蛇疑是同名」之遗。代理对字。G89 增补。',
  },
  {
    char: '㸲',
    layer: 'ruby',
    quote: '音昨',
    line: 20,
    basis: 'sound',
    where: '西次一经·小华之山「其兽多㸲牛」',
    note: '本站注音层标 zuó,与郭注直音字「昨」同读。G89 增补。',
  },
  {
    char: '鷩',
    layer: 'ruby',
    quote: '音作蔽,或作鳖',
    line: 20,
    basis: 'sound',
    where: '西次一经·小华之山「鸟多赤鷩」',
    note: '本站注音层标 biē,郭注直音「蔽」。G89 增补。',
  },
  {
    char: '㻬',
    layer: 'ruby',
    quote: '雩浮兩音',
    line: 20,
    basis: 'sound',
    where: '西次一经·小华之山「其阳多㻬琈之玉」',
    note: '郭注「雩浮兩音」按序注 㻬=yú/琈=fú。G89 增补。',
  },
  {
    char: '琈',
    layer: 'ruby',
    quote: '雩浮兩音',
    line: 20,
    basis: 'sound',
    where: '西次一经·小华之山「其阳多㻬琈之玉」',
    note: '郭注「雩浮兩音」按序注 㻬=yú/琈=fú。G89 增补。',
  },
  {
    char: '鴖',
    layer: 'ruby',
    quote: '音旻',
    line: 22,
    basis: 'sound',
    where: '西次一经·符禺之山「其鸟多鴖」',
    note: '本站注音层标 mín,与郭注直音字「旻」同读。G89 增补。',
  },
  {
    char: '顒',`],
])
console.log('G89 数据联动完成')
