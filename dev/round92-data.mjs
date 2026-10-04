// G92: 玉山 loc(西次三经 order 6)+西王母词条——数据联动
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

// —— 1. chapterTexts.ts:玉山段插章莪段前(经序 6<10) ——
edit('src/data/chapterTexts.ts', [
  [`    {
      // G91:章莪之山段(西次三经;B2 西山郭注档第 122 行×arteducation×袁本×广注卷02`,
   `    {
      // G92:玉山之段(西次三经第六山;B2 西山郭注档第 114 行×arteducation×袁本×
      // 广注卷02 玉山案语)。段含兽「狡」鸟「胜遇」不立条(G71 先例);西王母词条
      // G92 立条栖居此山。arteducation「又西北三百五十里」方位独异,从 B 系「又西」。
      id: 'seg-xs3-yushan',
      kind: 'text',
      section: '西次三经',
      text: '又西三百五十里，曰玉山，是西王母所居也。西王母其状如人，豹尾虎齿而善啸，蓬发戴胜，是司天之厉及五残。有兽焉，其状如犬而豹文，其角如牛，其名曰狡，其音如吠犬，见则其国大穰。有鸟焉，其状如翟而赤，名曰胜遇，是食鱼，其音如录，见则其国大水。',
      relatedLocationIds: ['loc-yushan3'],
    },
    {
      // G91:章莪之山段(西次三经;B2 西山郭注档第 122 行×arteducation×袁本×广注卷02`],
  // 三经 gap 文案更新
  [`      note: '西次三经余山(阴山/符惕/三危/騩山/泑山/翼望等)待后续阶段扩录;站内既录昆仑之丘等四山见西次三经图鉴',`,
   `      note: '西次三经余山(轩辕之丘/积石/长留/阴山/符惕/三危/騩山/泑山/翼望等)待后续阶段扩录;站内既录昆仑之丘、玉山等五山见西次三经图鉴',`],
])

// —— 2. locations.ts:loc-yushan3(文件尾锚) ——
edit('src/data/locations.ts', [
  [`]

export function getLocation(id: string): Location | undefined {`,
   `  {
    // G92:西次三经第六山(玉山;B2 西山郭注档第 114 行×arteducation×袁本×广注卷02
    // 玉山案语;段含兽「狡」鸟「胜遇」不立条)。西王母词条(G92)栖居此山。
    // id 说明:loc-yushan 为北次三经羽山(G29)先占,玉山加 3 后缀。
    id: 'loc-yushan3',
    canonicalName: '玉山',
    aliases: ['羣玉之山(《穆天子傳》)'],
    type: 'mountain',
    chapterId: 'ch-xishan',
    subClassic: '西次三经',
    sourceOrder: 6,
    sourceDirection: '又西',
    sourceDistance: '三百五十里',
    relatedEntityIds: ['ent-xiwanmu'],
    citations: [
      {
        originalText: '又西三百五十里，曰玉山，是西王母所居也。西王母其状如人，豹尾虎齿而善啸，蓬发戴胜，是司天之厉及五残。有兽焉，其状如犬而豹文，其角如牛，其名曰狡，其音如吠犬，见则其国大穰。有鸟焉，其状如翟而赤，名曰胜遇，是食鱼，其音如录，见则其国大水。',
        chapter: '西山经',
        section: '西次三经第六山',
        guoPuNotes: [
          { attach: '玉山', text: '此山多玉石，因以名云。穆天子傳謂之羣玉之山' },
          { attach: '蓬髮戴勝', text: '蓬頭亂髪，勝玉勝也' },
          { attach: '司天之厲及五殘', text: '主知灾厲五刑殘殺之氣也' },
          { attach: '其角如牛', text: '或作羊' },
        ],
        sourceEdition:
          '通行本(郭璞注系统),据维基文库四库本郭璞注西山经档(B2,2026-10-05 第 114 行)×arteducation bookv_2×袁珂校注本四源对读(G92);B1 侧以呈现态重抓补核(同 G91 体例)',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E8%A5%BF%E5%B1%B1%E7%B6%93',
        variantText: '「又西三百五十里」:arteducation 作「又西北三百五十里」——方位「北」字其站独异(B2/袁本均作「西」),不采记此。段含兽「狡」鸟「胜遇」不立条(G71 先例);狡「其角如牛,或作羊」郭注异文存注层。',
        verificationNote:
          '2026-10-05 建站核验(G92):B2 第 114 行剥注后与 arteducation(除方位独异)、袁本正文逐字一致;上屏为简体逐字转换(穰/翟/錄→录 等,对照表见 EDITION_AUDIT.md 三之补19),注文保持繁体未转简。西王母词条栖居此山(ent-xiwanmu)。',
        verifiedAt: '2026-10-05',
      },
    ],
    mapPosition: { x: 74, y: 22, region: '西山经' }, // G92:西次三经带(天山 66,19 之东),实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },
]

export function getLocation(id: string): Location | undefined {`],
])
console.log('G92 数据联动完成')
