import type { Entity } from '../types'

/**
 * 狌狌 —— 原文于 2026-09-20 经 ctext.org 公开文本逐字核对。
 * 只有 verified 条目可进入首页推荐、每日一卷、随机探索与猜谜题库。
 */
export const XINGXING: Entity = {
  id: 'ent-xingxing',
  slug: 'xingxing',
  canonicalName: '狌狌',
  pinyin: 'xīng xīng',
  aliases: [],
  type: 'beast',
  summary:
    '招摇之山的异兽,状如禺而白耳;行止奇特,原文兼有「伏行」与「人走」两种记述。',
  chapterIds: ['ch-nanshan'],
  locationIds: ['loc-zhaoyao'],
  citations: [
    {
      originalText: '有兽焉，其状如禺而白耳，伏行人走，其名曰狌狌，食之善走。',
      chapter: '南山经',
      section: '招摇之山',
      guoPuNotes: [
        {
          attach: '其狀如禺',
          text: '禺似獼猴而大赤目，長者不了此物名禺。作牛字圖，亦做牛形或作猴，皆失之也。禺字音遇，',
        },
        {
          attach: '其名曰狌狌',
          text: '狌狌，禺獸。狀如猿，伏行交足亦此類也。見《京房易》',
        },
      ],
      sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
      publicUrl: 'https://ctext.org/shan-hai-jing/nan-shan-jing/zhs',
      verificationNote:
        '2026-09-20 经 ctext 公开文本逐字核对。「禺」为何种动物,旧注有猿猴类之说,本站不作定论。 2026-09-27 复核:与底本A(ctext zhs,存档 EDITION_EVIDENCE/ctext-nanci1-20260927.txt)逐字一致,并与底本B(中文维基文库郭璞注本)对照相符。 2026-10-02 郭璞注层上线:注文 2 条逐字照录底本B原始 wikitext(存档 EDITION_EVIDENCE/wikisource-nanshan1-guopu-20261002.txt),保持繁体未转简;「作牛字圖,亦做牛形」作/做混用、「禺字音遇,」句末逗号为底本原样,照录不改,见疑点清单。',
      verifiedAt: '2026-09-20',
    },
  ],
  appearanceTraits: [
    {
      kind: 'appearance',
      text: '其状如禺而白耳——形似「禺」,耳部白色。「禺」的确切所指待考证。',
      citationIndex: 0,
    },
  ],
  behaviorTraits: [
    {
      kind: 'behavior',
      text: '伏行人走——能伏地而行,亦能如人行走;「人走」的具体含义存在解读分歧。',
      citationIndex: 0,
    },
  ],
  soundTraits: [], // 原文未载
  dietTraits: [], // 原文未载(「食之善走」是食用效果,录入能力区)
  abilities: [
    {
      text: '食之善走——原文载食用狌狌则善于奔跑(食用记述)。',
      citationIndex: 0,
    },
  ],
  omens: [], // 原文未载
  modernExplanation:
    '狌狌见于《南山经》开篇的招摇之山。按原文,它形似「禺」而白耳,行动兼有伏行与如人行走两种记述;「食之善走」是原文记录的食用效果。旧说多以禺为猿猴类动物,狌狌因此常被理解为某种灵长类,但确切对应何种动物,历代有不同说法,本站不作定论。',
  disputedReadings: [
    '「禺」为何种动物,旧注说法不一,有待考证。',
    '「伏行人走」或解作「能伏行,又能像人一样行走」,具体所指存在解读分歧。',
    '后世文献中亦见以「猩猩」称之;本站暂以底本用字「狌狌」为准,此异文关系待进一步考证。',
  ],
  relatedEntityIds: [],
  tags: ['南山经', '招摇之山', '白耳', '如禺'],
  recordStatus: 'verified',
  illustration: {
    kind: 'svg',
    alt: '狌狌剪影插画(据原文描述艺术演绎)',
    note: '据原文描述艺术演绎',
  },
  updatedAt: '2026-09-20',
}
