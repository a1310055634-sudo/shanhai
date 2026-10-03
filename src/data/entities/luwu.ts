import type { Entity } from '../types'

/**
 * 陆吾 —— 原文于 2026-09-20 经 ctext.org 公开文本逐字核对。
 * 所在之山:西山经·昆仑之丘(前一座为槐江之山,「西南四百里」而至)。
 */
export const LUWU: Entity = {
  id: 'ent-luwu',
  slug: 'luwu',
  canonicalName: '陆吾',
  pinyin: 'lù wú',
  aliases: [],
  type: 'deity',
  summary:
    '昆仑之丘的守护神:虎身九尾、人面虎爪,司掌天之九部与帝之囿时。',
  chapterIds: ['ch-xishan'],
  locationIds: ['loc-kunlun'],
  citations: [
    {
      originalText: '西南四百里，曰昆仑之丘，是实惟帝之下都，神陆吾司之。',
      chapter: '西山经',
      section: '昆仑之丘',
      sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
      publicUrl: 'https://ctext.org/shan-hai-jing/xi-shan-jing/zhs',
      verificationNote:
        '2026-09-20 经 ctext 公开文本逐字核对。注意行文为「西南四百里」(非「又西」);其前一山为槐江之山。',
      verifiedAt: '2026-09-20',
    },
    {
      originalText: '其神状虎身而九尾，人面而虎爪；是神也，司天之九部及帝之囿时。',
      chapter: '西山经',
      section: '昆仑之丘',
      sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
      publicUrl: 'https://ctext.org/shan-hai-jing/xi-shan-jing/zhs',
      verificationNote: '2026-09-20 经 ctext 公开文本逐字核对(与上一条同段连续)。',
      verifiedAt: '2026-09-20',
    },
  ],
  appearanceTraits: [
    {
      kind: 'appearance',
      text: '其神状虎身而九尾,人面而虎爪——形体如虎而有九条尾巴,人脸,虎一样的爪。',
      citationIndex: 1,
    },
  ],
  behaviorTraits: [], // 原文未载(其职司见能力区)
  soundTraits: [], // 原文未载
  dietTraits: [], // 原文未载
  abilities: [
    {
      text: '司天之九部及帝之囿时——掌管天之九部与天帝之囿时(「囿时」的确切含义,旧注有分歧)。',
      citationIndex: 1,
    },
  ],
  omens: [], // 原文未载
  modernExplanation:
    '陆吾见于《西山经》的昆仑之丘。原文称昆仑是「帝之下都」(天帝在下界的都城,此解取旧注通识),陆吾司掌其地:形如虎而九尾,人面虎爪,职掌天之九部与帝之囿时。他是昆仑神话中最早的守卫者形象之一,后世仙话中的昆仑守卫多有增饰。',
  disputedReadings: [
    '「囿时」的确切含义存在旧注分歧(或谓园圃时令,或谓苑囿之时节),本站不作定论。',
    '「帝之下都」取「天帝在下界的都城」的旧注通识;具体所指诸说不一。',
    '昆仑之丘的现代地理比附众说纷纭,本站暂不录入。',
  ],
  relatedEntityIds: [],
  tags: ['西山经', '昆仑之丘', '虎身九尾', '人面虎爪', '司囿时'],
  recordStatus: 'verified',
  illustration: {
    kind: 'svg',
    alt: '陆吾剪影插画(据原文描述艺术演绎)',
    note: '据原文描述艺术演绎',
  },
  laterReception: [
    {
      era: '后世流变(本站编辑说明,与上方原始记载相区分)',
      text: '昆仑之丘在后世神话与道教仙山体系中层层增益,陆吾作为昆仑守卫者的形象也随之演变,常与开明兽等守卫形象并提。这些增益均属后世建构,《西山经》原文对陆吾的记述相当简略,本站后续将以专文梳理。',
    },
    {
      era: '清·吳任臣《山海經廣注》引郭璞《圖贊》',
      text: '陆吾之神郭璞注「即肩吾也」(并引《庄子》「肩吾得之以處大山」);吴任臣《广注》引郭璞《图赞》「肩吾得一以處崑崙,開明是對,司帝之門,吐納靈氣」,把经文「司天之九部及帝之囿时」的门卫职守神格化。',
      claims: [
        {
          text: '郭璞以陆吾即《庄子》所载肩吾,其《图赞》咏「肩吾得一以處崑崙」,司帝之门。',
          sourceTitle: '《山海經廣注》(四庫全書本)卷02·吳任臣案引',
          sourceUrl: 'https://zh.wikisource.org/wiki/卷02',
          quote: '圖贊曰肩吾得一以處崑崙開明是對司帝之門吐納靈氣熊熊魂魂',
          archive: 'EDITION_EVIDENCE/guangzhu-juan02-20261004.txt',
          note: '郭注「即肩吾也。莊周曰肩吾得之以處大山也」;图赞承此以「肩吾」称之。',
        },
      ],
    },
  ],
  updatedAt: '2026-09-20',
}
