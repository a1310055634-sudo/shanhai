import type { Entity } from '../types'

/**
 * 烛阴 —— 原文于 2026-09-20 经 ctext.org 公开文本逐字核对。
 * 注意底本用字:「锺山」(非钟/鍾)、「暝为夜」(暝,非瞑)、「无𦜹」照录生僻字。
 * 所在:海外北经·锺山。
 */
export const ZHUYIN: Entity = {
  id: 'ent-zhuyin',
  slug: 'zhuyin',
  canonicalName: '烛阴',
  pinyin: 'zhú yīn',
  aliases: [],
  type: 'deity',
  summary:
    '锺山之神:人面蛇身,遍体赤色,身长千里;睁眼为昼、闭眼为夜,吹气为冬、呼气为夏,息即为风,不饮不食不息。',
  chapterIds: ['ch-haiwai-bei'],
  locationIds: ['loc-zhongshan-sh'],
  citations: [
    {
      originalText:
        '锺山之神，名曰烛阴，视为昼，暝为夜，吹为冬，呼为夏，不饮，不食，不息，息为风，身长千里。在无𦜹之东。其为物，人面蛇身，赤色，居锺山下。',
      chapter: '海外北经',
      section: '锺山',
      sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
      publicUrl: 'https://ctext.org/shan-hai-jing/hai-wai-bei-jing/zhs',
      verificationNote:
        '2026-09-20 经 ctext 公开文本逐字核对。底本用字:「锺山」之「锺」、「暝为夜」之「暝」,均照录;「无𦜹」为地名,生僻字照录,读音待考。',
      verifiedAt: '2026-09-20',
    },
  ],
  appearanceTraits: [
    {
      kind: 'appearance',
      text: '其为物,人面蛇身,赤色——人面,蛇身,通体红色。',
      citationIndex: 0,
    },
    {
      kind: 'appearance',
      text: '身长千里——身长达千里(原文如此,极言其长)。',
      citationIndex: 0,
    },
  ],
  behaviorTraits: [
    {
      kind: 'behavior',
      text: '不饮,不食,不息——不饮水,不进食,不呼吸(「不息」又与其「息为风」相连,见能力区)。',
      citationIndex: 0,
    },
  ],
  soundTraits: [], // 原文未载
  dietTraits: [], // 原文未载(「不饮不食」见行为区)
  abilities: [
    {
      text: '视为昼,暝为夜——睁眼便是白天,闭眼便是黑夜。',
      citationIndex: 0,
    },
    {
      text: '吹为冬,呼为夏——吹气便成冬天,呼气便成夏天。',
      citationIndex: 0,
    },
    {
      text: '不息,息为风——平常不呼吸,一呼吸便起风。',
      citationIndex: 0,
    },
  ],
  omens: [], // 原文未载
  modernExplanation:
    '烛阴见于《海外北经》,是锺山之神:人面蛇身,通体赤色,身长千里。它的睁眼与闭眼、吹气与呼气,直接对应昼夜与冬夏;平常不饮不食不息,一呼吸便起风。这是《山海经》中神力最接近「创世级」的记述之一,常见于后世对光明与四季由来的想象;但原文只作如此记述,未解释缘由。',
  disputedReadings: [
    '「烛阴」与《大荒北经》所见「烛龙」的关系,旧注多以为一神异名;本站此轮未录彼条,两者关系待专文考证。',
    '「无𦜹」为地名,「𦜹」为生僻字,读音与所指待考。',
    '「视为昼,暝为夜」是对神力的直陈还是比喻,注家理解不一,本站照录原文。',
  ],
  relatedEntityIds: [],
  tags: ['海外北经', '锺山', '人面蛇身', '视为昼暝为夜', '身长千里'],
  recordStatus: 'verified',
  illustration: {
    kind: 'svg',
    alt: '烛阴剪影插画(据原文描述艺术演绎)',
    note: '据原文描述艺术演绎',
  },
  laterReception: [
    {
      era: '后世流变(本站编辑说明,与上方原始记载相区分)',
      text: '「睁眼为昼、闭眼为夜」的烛龙/烛阴意象,在后世诗文与思想论述中被反复化用,常被引为古人对昼夜四季由来的一种神话式想象。相关论述多与《大荒北经》「烛龙」条并举,属诠释与演绎,与《海外北经》本条的简略记述不可混同。',
    },
    {
      era: '清·吳任臣《山海經廣注》引《括地圖》等',
      text: '烛阴(烛龙)为钟山之神,「視為晝,暝為夜,吹為冬,呼為夏……身長千里」;吴任臣《广注》并引《括地圖》「鍾山之神,名曰燭龍,視為晝,眠為夜」,及《楚辞·天問》王逸注「有龍銜燭而照之」、柳宗元《天對》,与经文相证成。',
      claims: [
        {
          text: '《括地圖》亦载「鍾山之神,名曰燭龍,視為晝,眠為夜」,与《海外北经》烛阴叙述几乎全同。',
          sourceTitle: '《山海經廣注》(四庫全書本)卷08·吳任臣案引',
          sourceUrl: 'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93%E5%BB%A3%E6%B3%A8_(%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC)/%E5%8D%B708',
          quote: '括地圖曰鍾山之神名曰燭龍視為晝眠為夜吹為冬吁為夏息為風',
          archive: 'EDITION_EVIDENCE/guangzhu-juan08-20261004.txt',
          note: '吴任臣案引;「燭陰/燭龍」两名并存,经文作「燭陰」。',
        },
        {
          text: '《楚辞·天問》「燭龍何照」之問,王逸注谓「天之西北有幽冥無日之國,有龍銜燭而照之」,与烛阴神话同源。',
          sourceTitle: '《山海經廣注》(四庫全書本)卷08·吳任臣案引',
          sourceUrl: 'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93%E5%BB%A3%E6%B3%A8_(%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC)/%E5%8D%B708',
          quote: '楚辭曰安不到燭龍何照王逸注云天之西北有幽冥無日之國有龍銜燭而照之',
          archive: 'EDITION_EVIDENCE/guangzhu-juan08-20261004.txt',
          note: '吴任臣案引;柳宗元《天對》「日安不到,燭龍何照」相关的答问系统亦经其引及。',
        },
      ],
    },
  ],
  updatedAt: '2026-09-20',
}
