import type { Entity } from '../types'

/**
 * 英招 —— 原文于 2026-09-20 经 ctext.org 公开文本逐字核对。
 * 所在之山:西山经·槐江之山(前一座为泰器之山)。
 */
export const YINGZHAO: Entity = {
  id: 'ent-yingzhao',
  slug: 'yingzhao',
  canonicalName: '英招',
  pinyin: 'yīng zhāo',
  aliases: [],
  type: 'deity',
  summary:
    '槐江之山的神祇,司天帝之平圃:马身人面,身有虎纹而生鸟翼,巡行四海。',
  chapterIds: ['ch-xishan'],
  locationIds: ['loc-huaijiang'],
  citations: [
    {
      originalText: '又西三百二十里，曰槐江之山。丘时之水出焉，而北流注于泑水。',
      chapter: '西山经',
      section: '槐江之山',
      sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
      publicUrl: 'https://ctext.org/shan-hai-jing/xi-shan-jing/zhs',
      verificationNote:
        '2026-09-20 经 ctext 公开文本逐字核对。其前一山为泰器之山;本条仅录此段已核对文字,山句之后至「实惟帝之平圃」之间的文字未经逐字核对,故不录入。',
      verifiedAt: '2026-09-20',
    },
    {
      originalText: '实惟帝之平圃，神英招司之，其状马身而人面，虎文而鸟翼，徇于四海。',
      chapter: '西山经',
      section: '槐江之山',
      sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
      publicUrl: 'https://ctext.org/shan-hai-jing/xi-shan-jing/zhs',
      verificationNote: '2026-09-20 经 ctext 公开文本逐字核对(分段核对,句读为本站依底本整理)。',
      verifiedAt: '2026-09-20',
    },
  ],
  appearanceTraits: [
    {
      kind: 'appearance',
      text: '其状马身而人面,虎文而鸟翼——马的身体、人的面孔,身有虎纹而生鸟翼。',
      citationIndex: 1,
    },
  ],
  behaviorTraits: [
    {
      kind: 'behavior',
      text: '徇于四海——巡行四海。「徇」取巡行的通行训释。',
      citationIndex: 1,
    },
  ],
  soundTraits: [], // 原文未载
  dietTraits: [], // 原文未载
  abilities: [
    {
      text: '司帝之平圃——掌管天帝的平圃(「平圃」旧注多以为即悬圃,本站取直解并注明分歧)。',
      citationIndex: 1,
    },
  ],
  omens: [], // 原文未载
  modernExplanation:
    '英招见于《西山经》的槐江之山。原文称此地是「帝之平圃」,由英招司掌:他马身人面,身有虎纹,生有鸟翼,常巡行四海。与陆吾(司昆仑)相邻,是《西山经》所记天帝辖地的另一位守司之神。',
  laterReception: [
    {
      era: '清·吳任臣《山海經廣注》引郭璞《圖贊》',
      text: '英招为槐江之山之神,「其狀馬身而人面,虎文而鳥翼,狥于四海」;吴任臣《广注》引郭璞《图赞》「槐江之山,英招是主,巡游四海,撫翼雲儛」,把「狥于四海」化为「巡游四海」的巡行意象。',
      claims: [
        {
          text: '郭璞《山海经图赞》咏英招「巡游四海,撫翼雲儛」,承经文「狥于四海」的巡行叙述。',
          sourceTitle: '《山海經廣注》(四庫全書本)卷02·吳任臣案引',
          sourceUrl: 'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93%E5%BB%A3%E6%B3%A8_(%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC)/%E5%8D%B702',
          quote: '圖贊曰槐江之山英招是主巡游四海撫翼雲儛實唯帝囿有謂𤣥圃',
          archive: 'EDITION_EVIDENCE/guangzhu-juan02-20261004.txt',
          note: '郭注「狥謂周行也」;图赞「巡游四海」即周行四海的赞语化。',
        },
      ],
    },
  ],
  disputedReadings: [
    '「平圃」旧注多以为即「悬圃」,关系待考;本站行文取「平圃」直解。',
    '「徇于四海」之「徇」,或训巡行、或训环绕,本站取巡行。',
    '槐江之山的现代地理比附众说纷纭,本站暂不录入。',
  ],
  relatedEntityIds: [],
  tags: ['西山经', '槐江之山', '马身人面', '虎文鸟翼', '司平圃'],
  recordStatus: 'verified',
  illustration: {
    kind: 'svg',
    alt: '英招剪影插画(据原文描述艺术演绎)',
    note: '据原文描述艺术演绎',
  },
  updatedAt: '2026-09-20',
}
