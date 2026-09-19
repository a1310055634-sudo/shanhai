import type { Entity } from '../types'

/**
 * 帝江 —— 原文于 2026-09-20 经 ctext.org 公开文本逐字核对。
 * 所在之山:西山经·天山;其前一山为騩山。子经内次序待山川轮核定。
 */
export const DIJIANG: Entity = {
  id: 'ent-dijiang',
  slug: 'dijiang',
  canonicalName: '帝江',
  pinyin: 'dì jiāng',
  aliases: [],
  type: 'deity',
  summary:
    '天山的神祇:状如黄色皮囊,红如丹火,六足四翼,浑浑沌沌没有面目,却通晓歌舞。',
  chapterIds: ['ch-xishan'],
  locationIds: ['loc-tianshan'],
  citations: [
    {
      originalText:
        '有神焉，其状如黄囊，赤如丹火，六足四翼，浑敦无面目，是识歌舞，实惟帝江也。',
      chapter: '西山经',
      section: '天山',
      sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
      publicUrl: 'https://ctext.org/shan-hai-jing/xi-shan-jing/zhs',
      verificationNote:
        '2026-09-20 经 ctext 公开文本逐字核对。所在山句「又西三百五十里,曰天山,多金玉,有青雄黄。英水出焉,而西南流注于汤谷。」同日核对;其前一山为騩山(「又西一百九十里,曰騩山」)。',
      verifiedAt: '2026-09-20',
    },
  ],
  appearanceTraits: [
    {
      kind: 'appearance',
      text: '其状如黄囊,赤如丹火——形体如黄色皮囊,颜色红如丹火。',
      citationIndex: 0,
    },
    {
      kind: 'appearance',
      text: '六足四翼,浑敦无面目——六只脚、四只翅膀,浑浑沌沌,没有面目七窍。',
      citationIndex: 0,
    },
  ],
  behaviorTraits: [
    {
      kind: 'behavior',
      text: '是识歌舞——通晓歌舞(原文以此为其「神」性之一)。',
      citationIndex: 0,
    },
  ],
  soundTraits: [], // 原文未载
  dietTraits: [], // 原文未载
  abilities: [], // 原文无食用、佩戴等记述
  omens: [], // 原文未载
  modernExplanation:
    '帝江见于《西山经》的天山。按原文,它形如黄色皮囊、色红如丹火,六足四翼,没有面目,却通晓歌舞。旧注多将「浑敦无面目」与「浑沌/混沌」的传说联系起来,后世也有将其理解为乐舞之神或神鸟的说法;帝江的确切所指与读法,历代理解不一,本站不作定论。',
  disputedReadings: [
    '「帝江」的读法与所指,旧注存在不同说法;本站暂按字面标注拼音,相关异读待考证。',
    '「浑敦无面目」与后世「混沌」形象的关联,属后世诠释,详见「后世流变」。',
    '「是识歌舞」或解作「懂得歌舞」,亦有解作「以此歌舞为事」者,取直白理解并注明分歧。',
  ],
  relatedEntityIds: [],
  tags: ['西山经', '天山', '六足四翼', '无面目', '识歌舞'],
  recordStatus: 'verified',
  illustration: {
    kind: 'svg',
    alt: '帝江剪影插画(据原文描述艺术演绎)',
    note: '据原文描述艺术演绎',
  },
  laterReception: [
    {
      era: '后世流变(本站编辑说明,与上方原始记载相区分)',
      text: '帝江常被后世与「浑沌/混沌」的神话与哲学意象相连(《庄子》寓言中凿七窍而浑沌死的浑沌即常被并举),亦有据「是识歌舞」将其视为乐舞之神的演绎。这些均属后世诠释:《西山经》原文仅记其形貌与歌舞,未涉其他。本站后续将以专文梳理,此处不展开。',
    },
  ],
  updatedAt: '2026-09-20',
}
