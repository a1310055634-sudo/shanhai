// G86: 南次三经扩录一(天虞/禱過/發爽/旄山尾)——数据联动脚本(唯一锚+计数守卫)
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

const SRC_ED = `'通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)、维基文库四库本郭璞注(B2)、arteducation.com.tw 繁体排印本与袁珂《山海经校注》本(殆知阁)四源对读逐字一致(G86);arteducation「南次三山」称谓差异沿 G85 定性(系统性排印习惯)'`

// —— 1. chapterTexts.ts:两个 gap 换四个 text 段 ——
edit('src/data/chapterTexts.ts', [
  [`    {
      id: 'seg-ns3-gap-tianyu-daoguo',
      kind: 'gap',
      section: '南次三经',
      note: '天虞之山、祷过之山段待录入',
    },`,
   `    {
      // G86:天虞之山段(2026-10-05 四源对读录入:B1 三经档 L01×B2 第72行×arteducation×袁本;
      // 经首段,无「又东」里距句;无郭注)。recordStatus 沿 G84/G85 四源口径=verified。
      id: 'seg-ns3-tianyu-shan',
      kind: 'text',
      section: '南次三经',
      text: '南次三经之首，曰天虞之山，其下多水，不可以上。',
      relatedLocationIds: ['loc-tianyu'],
    },
    {
      // G86:禱過之山段(B1 三经档 L02×B2 第74行)。郭注 6 条存档 citations(山无词条,
      // 注文不上屏词条页=G71 先例设计内);异文「白首一作手」两源同记=疑18。
      id: 'seg-ns3-daoguo-shan',
      kind: 'text',
      section: '南次三经',
      text: '东五百里，曰祷过之山，其上多金玉，其下多犀、兕，多象。有鸟焉，其状如鵁，而白首、三足、人面，其名曰瞿如，其鸣自号也。泿水出焉，而南流注于海。其中有虎蛟，其状鱼身而蛇尾，其音如鸳鸯，食者不肿，可以已痔。',
      relatedLocationIds: ['loc-daoguo'],
    },`],
  [`    {
      id: 'seg-ns3-gap-fashuang-end',
      kind: 'gap',
      section: '南次三经',
      note: '发爽之山以下诸段待录入',
    },`,
   `    {
      // G86:發爽之山段(B1 三经档 L04×B2 第78行)。异文「發爽一作喪」两源同记=疑19;
      // 「汎」为底本原形照录(G30 𨴯 先例),arteducation 作「泛水/勃海」按异形白名单对读。
      id: 'seg-ns3-fashuang-shan',
      kind: 'text',
      section: '南次三经',
      text: '又东五百里，曰发爽之山，无草木，多水，多白猿。汎水出焉，而南流注于渤海。',
      relatedLocationIds: ['loc-fashuang'],
    },
    {
      // G86:旄山之尾段(B1 三经档 L05×B2 第80行)。郭注 2 条存档 citations;异文
      // 「育遺一作隧」两源同记=疑20。段为「至於…之尾」句式(篇末计山口径注见疑记)。
      id: 'seg-ns3-maoshan-wei',
      kind: 'text',
      section: '南次三经',
      text: '又东四百里，至于旄山之尾，其南有谷，曰育遗，多怪鸟，凯风自是出。',
      relatedLocationIds: ['loc-maoshan'],
    },
    {
      id: 'seg-ns3-gap-feishan-end',
      kind: 'gap',
      section: '南次三经',
      note: '非山之首、阳夹、灌湘、鸡山、令丘、仑者、禺稿、南禺诸段待录入(G87—G88)',
    },`],
  // GLOSSARY +泿(郭注「音銀」;BMP 常规字,探针仍跑)
  [`  閼: { pinyin: 'è', hint: '郭注「音遏」;閼之泽' },`,
   `  閼: { pinyin: 'è', hint: '郭注「音遏」;閼之泽' },
  泿: { pinyin: 'yín', hint: '郭注「音銀」;泿水,水名' },`],
])

// —— 2. locations.ts:插 4 loc + 丹穴链补 ——
const cite = (sec, extra) => `      {
        originalText: ${JSON.stringify(extra.ot)},
        chapter: '南山经',
        section: '${sec}',
${extra.gn ? `        guoPuNotes: [\n${extra.gn}],\n` : ''}        sourceEdition: ${SRC_ED},
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText: ${JSON.stringify(extra.vt)},
        verificationNote: ${JSON.stringify(extra.vn)},
        verifiedAt: '2026-10-05',
      },`

const vn = (b1l, b2l) => `2026-10-05 建站核验(G86):四源正文逐字一致(B1 三经档 ${b1l}/B2 存档第 ${b2l} 行/arteducation bookv_1 页/袁本殆知阁档;泛/汎、勃/渤等异形白名单对读);上屏为简体逐字转换(東→东/禱→祷/過→过/狀→状/號→号/鴛鴦→鸳鸯/腫→肿/發→发/無→无/遺→遗/凱→凯,对照表见 EDITION_AUDIT.md 三之补13),注文保持繁体未转简。山无词条,郭注存档 citations 不上屏词条页(G71 先例设计内)。`

edit('src/data/locations.ts', [
  // 插入点:丹穴块前插天虞/禱過;丹穴后(fenghuang?loc 无关联块,丹穴块后插發爽/旄山尾)
  [`  {
    id: 'loc-danxue',`,
   `  {
    // G86:南次三经第一山(经首段,无里距句;四源对读录,B1 三经档 L01×B2 第72行)。
    id: 'loc-tianyu',
    canonicalName: '天虞之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次三经',
    sourceOrder: 1,
    nextLocationId: 'loc-daoguo',
    sourceDirection: '',
    sourceDistance: '',
    relatedEntityIds: [],
    citations: [
${cite('南次三经第一山', {
  ot: '南次三经之首，曰天虞之山，其下多水，不可以上。',
  vt: '无页面自带异文;arteducation 作「南次三山之首」系其系统性称谓习惯(G85 已定性),袁本作「南次三经之首」与 B1/B2 同。',
  vn: vn('L01', '72'),
})}
    ],
    mapPosition: { x: 57, y: 78.5, region: '南山经' }, // G86:三经区带(丹穴 70,80 之西)锯齿高档,实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G86:南次三经第二山(B1 三经档 L02×B2 第74行;郭注 6 条存档;疑18 异文)。
    id: 'loc-daoguo',
    canonicalName: '祷过之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次三经',
    sourceOrder: 2,
    previousLocationId: 'loc-tianyu',
    nextLocationId: 'loc-danxue',
    sourceDirection: '东',
    sourceDistance: '五百里',
    relatedEntityIds: [],
    citations: [
${cite('南次三经第二山', {
  ot: '东五百里，曰祷过之山，其上多金玉，其下多犀、兕，多象。有鸟焉，其状如鵁，而白首、三足、人面，其名曰瞿如，其鸣自号也。泿水出焉，而南流注于海。其中有虎蛟，其状鱼身而蛇尾，其音如鸳鸯，食者不肿，可以已痔。',
  gn: "          { attach: '犀、兕', text: '犀似水牛。猪頭痺腳，腳似象有三蹄。大腹黑色三角，一在頂上，一在額上，一在鼻上。在鼻上者小而不墮，食角也。好噉棘，口中常灑血沫。兕亦似水牛，青色一角，重三千斤' },\n          { attach: '多象', text: '象，獸之最大者。長鼻。大者牙長一丈。性妬，不畜淫子' },\n          { attach: '其狀如鵁', text: '鵁似鳧而小腳近尾。音骹箭之骹' },\n          { attach: '其名曰瞿如', text: '音劬' },\n          { attach: '泿水出焉', text: '音銀' },\n          { attach: '其中有虎蛟', text: '蛟似蛇，四足，龍屬' },",
  vt: '「白首」:底本B1页面自带异文标注「白首一作「手」」;底本B2四库本同记{{另|首|手}}(存档第 74 行)。两源正文均作「首」。本站从两源正文用字「首」,异文登记疑18。',
  vn: vn('L02', '74'),
})}
    ],
    mapPosition: { x: 62.5, y: 81, region: '南山经' }, // G86:三经区带锯齿低档,实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    id: 'loc-danxue',`],
  [`    sourceOrder: 3,
    sourceDirection: '又东',
    sourceDistance: '五百里',
    relatedEntityIds: ['ent-fenghuang'],`,
   `    sourceOrder: 3,
    previousLocationId: 'loc-daoguo', // G86:三经链补全
    nextLocationId: 'loc-fashuang',
    sourceDirection: '又东',
    sourceDistance: '五百里',
    relatedEntityIds: ['ent-fenghuang'],`],
  [`    mapPosition: { x: 70, y: 80, region: "南山经" },`,
   `    mapPosition: { x: 70, y: 80, region: "南山经" },
  },
  {
    // G86:南次三经第四山(B1 三经档 L04×B2 第78行;疑19 异文;汎/勃 异形对读)。
    id: 'loc-fashuang',
    canonicalName: '发爽之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次三经',
    sourceOrder: 4,
    previousLocationId: 'loc-danxue',
    nextLocationId: 'loc-maoshan',
    sourceDirection: '又东',
    sourceDistance: '五百里',
    relatedEntityIds: [],
    citations: [
${cite('南次三经第四山', {
  ot: '又东五百里，曰发爽之山，无草木，多水，多白猿。汎水出焉，而南流注于渤海。',
  vt: '「發爽」之「爽」:底本B1页面自带异文标注「發爽一作「喪」」;底本B2四库本同记{{另|爽|喪}}(存档第 78 行)。两源正文均作「爽」。本站从两源正文用字「爽」(上屏转写作「发爽」),异文登记疑19。「汎水」之「汎」为底本原形照录(G30 𨴯 先例;arteducation 作「泛水」「勃海」,泛/汎、勃/渤按异形白名单对读,不采)。',
  vn: vn('L04', '78'),
})}
    ],
    mapPosition: { x: 77, y: 78.5, region: '南山经' }, // G86:丹穴(70,80)之东锯齿高档,实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G86:南次三经第五山(旄山之尾,B1 三经档 L05×B2 第80行;郭注 2 条存档;疑20 异文;
    // 「至於…之尾」句式——篇末「凡一十四山」计山口径与段数关系见 STATE 呈报)。
    id: 'loc-maoshan',
    canonicalName: '旄山之尾',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次三经',
    sourceOrder: 5,
    previousLocationId: 'loc-fashuang',
    sourceDirection: '又东',
    sourceDistance: '四百里',
    relatedEntityIds: [],
    citations: [
${cite('南次三经第五山(旄山之尾)', {
  ot: '又东四百里，至于旄山之尾，其南有谷，曰育遗，多怪鸟，凯风自是出。',
  gn: "          { attach: '多怪鳥', text: '《廣雅》曰鵽𪅆、鷦朋、爰居、鴟雀皆怪鳥也' },\n          { attach: '凱風自是出', text: '凱風，南風' },",
  vt: '「育遺」之「遺」:底本B1页面自带异文标注「育遺一作「隧」」;底本B2四库本同记{{另|遺|隧}}(存档第 80 行)。两源正文均作「遺」。本站从两源正文用字「遺」(上屏转写作「遗」),异文登记疑20。',
  vn: vn('L05', '80'),
})}
    ],
    mapPosition: { x: 82.5, y: 81, region: '南山经' }, // G86:發爽之东锯齿低档,实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },`],
])

// —— 3. readings.ts:SOUND +泿行 ——
edit('src/data/readings.ts', [
  [`  {
    char: '瞿',`,
   `  {
    char: '泿',
    layer: 'ruby',
    quote: '音銀',
    line: 74,
    basis: 'sound',
    where: '南次三经·祷过之山段「泿水出焉」',
    note: '本站注音层标 yín,与郭注直音字「銀」同读。G86 增补。',
  },
  {
    char: '瞿',`],
])
console.log('数据联动完成')
