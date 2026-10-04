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
      guoPuNotes: [
        {
          attach: '其音如謠',
          text: '如人歌聲',
        },
        {
          attach: '佩',
          text: '佩，謂帶其皮尾',
        },
      ],
      sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
      publicUrl: 'https://ctext.org/shan-hai-jing/nan-shan-jing/zhs',
      verificationNote:
        '2026-09-20 经 ctext 公开文本逐字核对;所在之山句「又东三百七十里,曰杻阳之山」同日核对。 2026-09-27 复核:与底本A(ctext zhs,存档 EDITION_EVIDENCE/ctext-nanci1-20260927.txt)逐字一致,并与底本B(中文维基文库郭璞注本)对照相符。 2026-10-02 郭璞注层上线:注文 2 条逐字照录底本B原始 wikitext(存档 EDITION_EVIDENCE/wikisource-nanshan1-guopu-20261002.txt),保持繁体未转简;「佩」注系于原文字「佩」与「之宜子孙」之间,attach 照录单字「佩」。',
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
  laterReception: [
    {
      era: '清·吳任臣《山海經廣注》引郭璞《圖贊》',
      text: '吴任臣《山海经广注》鹿蜀条引郭璞《图赞》「鹿蜀之獸,馬質虎文,攘首吟鳴,矯足騰羣,佩其皮尾,子孫如雲」,把经文「佩之宜子孫」的佩护传统凝为韵语。',
      claims: [
        {
          text: '郭璞《山海经图赞》咏鹿蜀「馬質虎文」,并重申「佩其皮尾,子孫如雲」的佩护宜子孙之说。',
          sourceTitle: '《山海經廣注》(四庫全書本)卷01·吳任臣案引',
          sourceUrl: 'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93%E5%BB%A3%E6%B3%A8_(%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC)/%E5%8D%B701',
          quote: '圖贊曰鹿蜀之獸馬質虎文攘首吟鳴矯足騰羣佩其皮尾子孫如雲',
          archive: 'EDITION_EVIDENCE/guangzhu-juan01-20261004.txt',
          note: '「馬質虎文」概括经文「其狀如馬…其文如虎」;「子孫如雲」即「宜子孫」的赞语化。',
        },
      ],
    },
  ],
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
