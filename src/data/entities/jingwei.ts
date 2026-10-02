import type { Entity } from '../types'

/**
 * 精卫 —— 原文于 2026-09-20 经 ctext.org 公开文本逐字核对。
 * 所在之山:北山经·发鸠之山;所在子经与次序待山川轮核定。
 */
export const JINGWEI: Entity = {
  id: 'ent-jingwei',
  slug: 'jingwei',
  canonicalName: '精卫',
  pinyin: 'jīng wèi',
  aliases: [],
  type: 'bird',
  summary:
    '发鸠之山的鸟:状如乌鸦,花脑袋、白嘴、红足,鸣声似自呼其名;原文记其为炎帝之女女娃所化,常衔西山木石填东海。',
  chapterIds: ['ch-beishan'],
  locationIds: ['loc-fajiu'],
  citations: [
    {
      originalText:
        '又北二百里，曰发鸠之山，其上多柘木。有鸟焉，其状如乌，文首、白喙、赤足，名曰精卫，其鸣自詨。是炎帝之少女，名曰女娃，女娃游于东海，溺而不返，故为精卫，常衔西山之木石，以堙于东海。',
      chapter: '北山经',
      section: '发鸠之山',
      sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
      publicUrl: 'https://ctext.org/shan-hai-jing/bei-shan-jing/zhs',
      verificationNote:
        '2026-09-20 经 ctext 公开文本逐字核对(原文较长,分三段连续核对后合录,拼接处为同一原文段落连续文字)。北山经首句「《北山经》之首,曰单狐之山」同日核对;发鸠之山所在子经与次序待山川轮核定。',
      verifiedAt: '2026-09-20',
    },
  ],
  appearanceTraits: [
    {
      kind: 'appearance',
      text: '其状如乌,文首、白喙、赤足——形体如乌鸦,头部有花纹,白嘴壳,红色脚。',
      citationIndex: 0,
    },
  ],
  behaviorTraits: [
    {
      kind: 'behavior',
      text: '常衔西山之木石,以堙于东海——常衔西山的树枝石块,用来填塞东海。',
      citationIndex: 0,
    },
    {
      kind: 'behavior',
      text: '原文记其为「炎帝之少女」女娃所化:女娃游于东海,溺而不返,故为精卫(此为原文叙事,本站照录)。',
      citationIndex: 0,
    },
  ],
  soundTraits: [
    {
      kind: 'sound',
      text: '其鸣自詨——鸣声像是在呼叫自己的名字。「詨」旧注多解为自呼其名,本站取此理解并注明所据。',
      citationIndex: 0,
    },
  ],
  dietTraits: [], // 原文未载
  abilities: [], // 原文无食用、佩戴等记述
  omens: [], // 原文未载
  modernExplanation:
    '精卫见于《北山经》的发鸠之山。按原文,它形如乌鸦而头有花纹、白喙红足,叫声似自呼其名;原文并记述它是炎帝之女女娃所化——女娃游于东海溺亡,化为精卫,常衔西山木石填海。「精卫填海」的著名意象即源于此,但其后世寓意(坚韧不屈等)属于流变,本站严格区分。',
  disputedReadings: [
    '「其鸣自詨」之「詨」,或解作「自呼其名」,亦有解作「叫声急切」者;本站取前者并注明。',
    '「堙」字取「填塞」的通行训释;填海的目的与结局,原文未言,后世多有引申。',
    '发鸠之山的现代地理比附,众说纷纭,本站暂不录入。',
  ],
  relatedEntityIds: [],
  tags: ['北山经', '发鸠之山', '如乌', '炎帝之女', '衔木石填海'],
  recordStatus: 'verified',
  illustration: {
    kind: 'svg',
    alt: '精卫剪影插画(据原文描述艺术演绎)',
    note: '据原文描述艺术演绎',
  },
  laterReception: [
    {
      era: '后世流变(本站编辑说明,与上方原始记载相区分)',
      text: '「精卫填海」在后世成为著名的神话意象,常被引为坚韧不屈、以微小之力抗浩大之事的象征,广泛见于诗文、绘画与现代语汇。原文只记述衔木石填海之事,未加评说;将这一行为解读为某种精神,属后世的引申与增益。这一引申至迟在晋代已经成形,见下条所据。',
      claims: [
        {
          text: '晋代陶渊明《讀山海經》其十以“精衛銜微木，將以填滄海”与“刑天舞干戚，猛志故常在”并举,是早期把精卫填海读作「猛志」的一段诗文证据——可见「填海=不屈之志」的引申,至迟在晋代已见于文人写作。',
          sourceTitle: '《陶淵明集》讀《山海經》十三首·其十(晋·陶潜)',
          sourceUrl:
            'https://zh.wikisource.org/w/index.php?title=%E8%AE%80%E3%80%8A%E5%B1%B1%E6%B5%B7%E7%B6%93%E3%80%8B&oldid=7939694',
          quote: '精衛銜微木，將以填滄海；刑天舞干戚，猛志故常在。',
          archive: 'EDITION_EVIDENCE/liubian-guji-20261002.md 三',
          note: '维基文库公版页面固定版本 oldid=7939694,2026-10-02 抓取;该页标注作品属公有领域',
        },
      ],
    },
  ],
  updatedAt: '2026-09-20',
}
