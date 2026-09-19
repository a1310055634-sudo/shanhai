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
  ],
  updatedAt: '2026-09-20',
}
