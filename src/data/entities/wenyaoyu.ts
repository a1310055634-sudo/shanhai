import type { Entity } from '../types'

/**
 * 文鳐鱼 —— 原文于 2026-09-20 经 ctext.org 公开文本逐字核对。
 * 所在之山:西山经·泰器之山(前一座为锺山)。
 */
export const WENYAOYU: Entity = {
  id: 'ent-wenyaoyu',
  slug: 'wenyaoyu',
  canonicalName: '文鳐鱼',
  pinyin: 'wén yáo yú',
  aliases: [],
  type: 'aquatic',
  summary:
    '泰器之山观水中的怪鱼:状如鲤鱼,鱼身鸟翼,苍纹白首红喙,常行西海、夜飞东海;出现则天下丰收。',
  chapterIds: ['ch-xishan'],
  locationIds: ['loc-taiqi'],
  citations: [
    {
      originalText:
        '是多文鳐鱼，状如鲤鱼，鱼身而鸟翼，苍文而白首，赤喙，常行西海，游于东海，以夜飞。其音如鸾鸡，其味酸甘，食之已狂，见则天下大穰。',
      chapter: '西山经',
      section: '泰器之山 · 观水',
      sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
      publicUrl: 'https://ctext.org/shan-hai-jing/xi-shan-jing/zhs',
      verificationNote:
        '2026-09-20 经 ctext 公开文本逐字核对(「食之已狂,见则天下大穰」连接处经二次确认紧接)。山句「又西百八十里,曰泰器之山。观水出焉,西流注于流沙。」同日核对。',
      verifiedAt: '2026-09-20',
    },
  ],
  appearanceTraits: [
    {
      kind: 'appearance',
      text: '状如鲤鱼,鱼身而鸟翼,苍文而白首,赤喙——形如鲤鱼,鱼身鸟翼,青色纹路、白色头部、红色的嘴。',
      citationIndex: 0,
    },
  ],
  behaviorTraits: [
    {
      kind: 'behavior',
      text: '常行西海,游于东海,以夜飞——常行于西海,游到东海,在夜间飞行。',
      citationIndex: 0,
    },
  ],
  soundTraits: [
    {
      kind: 'sound',
      text: '其音如鸾鸡——叫声如鸾鸡。「鸾鸡」为何物,旧注未详,本站照录。',
      citationIndex: 0,
    },
  ],
  dietTraits: [], // 该鱼自身食性原文未载(「食之已狂」为人食其肉之效,录能力区)
  abilities: [
    {
      text: '食之已狂——食用其肉可治「狂」(「已」训治愈;「狂」所指病症旧注有异说)。',
      citationIndex: 0,
    },
  ],
  omens: [
    {
      text: '见则天下大穰——原文载其出现则天下大丰收(「穰」训丰收,征兆记述)。',
      citationIndex: 0,
    },
  ],
  modernExplanation:
    '文鳐鱼见于《西山经》泰器之山的观水。按原文,它形如鲤鱼而生鸟翼,青纹白首红喙,常从西海游向东海,能在夜间飞行,叫声如鸾鸡;食其肉可治「狂」,出现则天下大穰(丰收)。它是《山海经》中兼具鱼、鸟特征的典型水族,后世「飞鱼」意象常与之相涉。',
  laterReception: [
    {
      era: '清·吳任臣《山海經廣注》引郭璞《圖贊》',
      text: '文鳐鱼「常行西海,游于东海,以夜飞」,「见则天下大穰」;吴任臣《广注》引郭璞《图赞》「見則邑穰,厥名曰鰩,經營二海,矯翼閑霄,唯味之竒,寄厥伊庖」,兼收其丰穰征兆与「味奇」之说。',
      claims: [
        {
          text: '郭璞《山海经图赞》咏文鳐鱼「見則邑穰」「經營二海」,承经文「見則天下大穰」与跨海夜飞的叙述。',
          sourceTitle: '《山海經廣注》(四庫全書本)卷02·吳任臣案引',
          sourceUrl: 'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93%E5%BB%A3%E6%B3%A8_(%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC)/%E5%8D%B702',
          quote: '圖贊曰見則邑穰厥名曰鰩經營二海矯翼閑霄唯味之竒寄厥伊庖',
          archive: 'EDITION_EVIDENCE/guangzhu-juan02-20261004.txt',
          note: '「經營二海」即「常行西海,游于東海」;「寄厥伊庖」呼应「其味酸甘,食之已狂」的食用记载。',
        },
      ],
    },
  ],
  disputedReadings: [
    '「鸾鸡」为何种禽鸟,旧注未详,有待考证。',
    '「食之已狂」之「狂」所指病症(癫狂、狂疾等),旧注有异说。',
    '「大穰」训大丰收,取通行训释;泰器之山的现代地理比附暂不录入。',
  ],
  relatedEntityIds: [],
  tags: ['西山经', '泰器之山', '鱼身鸟翼', '夜飞', '大穰之兆'],
  recordStatus: 'verified',
  illustration: {
    kind: 'svg',
    alt: '文鳐鱼剪影插画(据原文描述艺术演绎)',
    note: '据原文描述艺术演绎',
  },
  updatedAt: '2026-09-20',
}
