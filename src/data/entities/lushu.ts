import type { Entity } from '../types'

/**
 * 鹿蜀 —— 原文于 2026-09-20 经 ctext.org 公开文本逐字核对。
 */
export const LUSHU: Entity = {
  id: 'ent-lushu',
  slug: 'lushu',
  canonicalName: '鹿蜀',
  pinyin: 'lù shǔ',
  aliases: [],
  type: 'beast',
  summary:
    '杻阳之山的异兽,状如马而白首,身有虎纹而赤尾,鸣声如人歌谣;原文载佩之宜子孙。',
  chapterIds: ['ch-nanshan'],
  locationIds: ['loc-chuyang'],
  citations: [
    {
      originalText:
        '有兽焉，其状如马而白首，其文如虎而赤尾，其音如谣，其名曰鹿蜀，佩之宜子孙。',
      chapter: '南山经',
      section: '杻阳之山',
      sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
      publicUrl: 'https://ctext.org/shan-hai-jing/nan-shan-jing/zhs',
      verificationNote:
        '2026-09-20 经 ctext 公开文本逐字核对;所在之山句「又东三百七十里,曰杻阳之山」同日核对。 2026-09-27 复核:与底本A(ctext zhs,存档 EDITION_EVIDENCE/ctext-nanci1-20260927.txt)逐字一致,并与底本B(中文维基文库郭璞注本)对照相符。',
      verifiedAt: '2026-09-20',
    },
  ],
  appearanceTraits: [
    {
      kind: 'appearance',
      text: '其状如马而白首——体貌如马,头部白色。',
      citationIndex: 0,
    },
    {
      kind: 'appearance',
      text: '其文如虎而赤尾——身上斑纹如虎,尾巴红色。',
      citationIndex: 0,
    },
  ],
  behaviorTraits: [], // 原文未载
  soundTraits: [
    {
      kind: 'sound',
      text: '其音如谣——鸣声如人歌谣。「谣」旧注多释为徒歌(无伴奏之歌),本站取「如人歌谣」的直白理解。',
      citationIndex: 0,
    },
  ],
  dietTraits: [], // 原文未载
  abilities: [
    {
      text: '佩之宜子孙——原文载佩带之则有益于子孙(佩戴记述)。「佩之」所指为佩带其皮毛还是其他,原文未详。',
      citationIndex: 0,
    },
  ],
  omens: [], // 原文未载
  modernExplanation:
    '鹿蜀见于《南山经》的杻阳之山。按原文,它体貌如马,头白,身有虎纹,尾赤,鸣声如人歌谣;「佩之宜子孙」是原文记录的佩戴效果。其真实原型为何种动物,历代有不同猜测,本站不作定论。',
  disputedReadings: [
    '「其音如谣」之「谣」,旧注多释为徒歌,确切口吻待考。',
    '「佩之宜子孙」的「佩之」所指(佩带其皮毛或其他)原文未详,存在不同理解。',
  ],
  relatedEntityIds: [],
  tags: ['南山经', '杻阳之山', '如马', '虎纹', '赤尾'],
  recordStatus: 'verified',
  illustration: {
    kind: 'svg',
    alt: '鹿蜀剪影插画(据原文描述艺术演绎)',
    note: '据原文描述艺术演绎',
  },
  updatedAt: '2026-09-20',
}
