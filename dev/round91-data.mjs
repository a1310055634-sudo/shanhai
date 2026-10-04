// G91: 章莪之山 loc(西次三经)+毕方词条——数据联动
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

// —— 1. chapterTexts.ts:SubClassic 扩 + XISHAN 加三经章莪段 + gap 文案分化 ——
edit('src/data/chapterTexts.ts', [
  [`export type SubClassic = '南次一经' | '南次二经' | '南次三经' | '西次一经'`,
   `export type SubClassic = '南次一经' | '南次二经' | '南次三经' | '西次一经' | '西次三经'`],
  [`    {
      id: 'seg-xs1-tongji',`,
   `    {
      // G91:章莪之山段(西次三经;B2 西山郭注档第 122 行×arteducation×袁本×广注卷02
      // 案语引经同——B1 西山档仅存西次一经首段,本段 B1 侧以呈现态重抓补核,见 AUDIT
      // 三之补18)。段含兽「狰」不立条(G71 先例,引文整段照录);毕方词条 G91 立条。
      // arteducation「畢文」为其站排印误字(袁本珂案诸本皆「毕方」),记 variantText。
      id: 'seg-xs3-zhangwo',
      kind: 'text',
      section: '西次三经',
      text: '又西二百八十里，曰章莪之山，无草木，多瑶碧。所为甚怪。有兽焉，其状如赤豹，五尾一角，其音如击石，其名如狰。有鸟焉，其状如鹤，一足，赤文青质而白喙，名曰毕方，其鸣自叫也，见则其邑有讹火。',
      relatedLocationIds: ['loc-zhangwo'],
    },
    {
      id: 'seg-xs3-gap-zhangwo-end',
      kind: 'gap',
      section: '西次三经',
      note: '西次三经余山(阴山/符惕/三危/騩山/泑山/翼望等)待后续阶段扩录;站内既录昆仑之丘等四山见西次三经图鉴',
    },
    {
      id: 'seg-xs1-tongji',`],
  [`      id: 'seg-xs1-gap-continuous',
      kind: 'gap',
      section: '西次一经',
      note: '羭次之山以下十四山待后续阶段扩录呈报(西次一经共十九山;华山区祠礼段随篇末在 B1 西山档 L20 照录存档,待全经录毕上屏)',`,
   `      id: 'seg-xs1-gap-continuous',
      kind: 'gap',
      section: '西次一经',
      note: '西次一经余十四山(羭次之山以下)待后续阶段扩录呈报(共十九山;华山区祠礼段随篇末在 B1 西山档 L20 照录存档,待全经录毕上屏)',`],
])

// —— 2. locations.ts:loc-zhangwo(文件尾锚) ——
edit('src/data/locations.ts', [
  [`]

export function getLocation(id: string): Location | undefined {`,
   `  {
    // G91:西次三经第十山(章莪之山;B2 西山郭注档第 122 行×呈现态重抓×arteducation×
    // 袁本珂案引诸本;段含兽「狰」不立条)。毕方词条(G91)栖居此山。
    id: 'loc-zhangwo',
    canonicalName: '章莪之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-xishan',
    subClassic: '西次三经',
    sourceOrder: 10,
    sourceDirection: '又西',
    sourceDistance: '二百八十里',
    relatedEntityIds: ['ent-bifang'],
    citations: [
      {
        originalText: '又西二百八十里，曰章莪之山，无草木，多瑶碧。所为甚怪。有兽焉，其状如赤豹，五尾一角，其音如击石，其名如狰。有鸟焉，其状如鹤，一足，赤文青质而白喙，名曰毕方，其鸣自叫也，见则其邑有讹火。',
        chapter: '西山经',
        section: '西次三经第十山',
        guoPuNotes: [
          { attach: '瑤碧', text: '碧亦玉屬' },
          { attach: '所為甚怪', text: '多有非常之怪' },
          { attach: '其名如猙', text: '京氏易義曰：音如石相擊，音靜' },
          { attach: '譌火', text: '譌亦妖訛字' },
        ],
        sourceEdition:
          '通行本(郭璞注系统),据维基文库四库本郭璞注西山经档(B2,2026-10-05 第 122 行)×呈现态重抓剥段×arteducation bookv_2×袁珂校注本四源对读(G91);B1 西山档(G83)仅存西次一经首段,本段 B1 侧以呈现态重抓补核(存档比对脚本 dev/round91-compare 输出)',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E8%A5%BF%E5%B1%B1%E7%B6%93',
        variantText: '「名曰畢方」:arteducation 作「畢文」——袁本珂案引诸本皆「毕方」,定性为其站排印误字(G85 框架),不采。「其名如猙」:袁本珂案「宋本、吴宽抄本并作曰狰」,本站从 B 系「如狰」(上屏转写),异文记此。无页面自带「一作」标注。',
        verificationNote:
          '2026-10-05 建站核验(G91):B2 第 122 行剥注后与呈现态重抓段、arteducation、袁本正文逐字一致(artedu「畢文」排印误除外);上屏为简体逐字转换(莪/瑤→瑶/擊→击/猙→狰/鶴→鹤/畢→毕/譌→讹,对照表见 EDITION_AUDIT.md 三之补18),注文保持繁体未转简。段含兽「狰」不立条(G71 先例)。毕方词条栖居此山(ent-bifang)。',
        verifiedAt: '2026-10-05',
      },
    ],
    mapPosition: { x: 90, y: 36, region: '西山经' }, // G91:西次三经带(槐江 61.5,24.5 之东延长线,三危一带走向),实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },
]

export function getLocation(id: string): Location | undefined {`],
])
console.log('G88 数据联动完成(loc+chapterTexts)')
