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
