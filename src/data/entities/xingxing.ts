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
  laterReception: [
    {
      era: '清·吳任臣《山海經廣注》引郭璞《圖贊》與《淮南萬畢術》',
      text: '吴任臣《山海经广注》于狌狌条下并引郭璞《图赞》「狌狌似猴,走立行伏」与《淮南万毕术》「狌狌知往」二说;前者状其形,后者记其「知往」之性。',
      claims: [
        {
          text: '郭璞《山海经图赞》咏狌狌「似猴,走立行伏」,状其形似猴而行止特异。',
          sourceTitle: '《山海經廣注》(四庫全書本)卷01·吳任臣案引',
          sourceUrl: 'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93%E5%BB%A3%E6%B3%A8_(%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC)/%E5%8D%B701',
          quote: '圖贊曰狌狌似猴走立行伏櫰木挺力少辛明目',
          archive: 'EDITION_EVIDENCE/guangzhu-juan01-20261004.txt',
          note: '郭注「生生禺獸狀如猿」;图赞文字依四庫本廣注案语所引照录(「走立行伏」句读从存档)。',
        },
        {
          text: '《淮南万毕术》有「狌狌知往」之说,谓狌狌能知过去,吴任臣引之与郭注并陈。',
          sourceTitle: '《山海經廣注》(四庫全書本)卷01·吳任臣案引',
          sourceUrl: 'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93%E5%BB%A3%E6%B3%A8_(%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC)/%E5%8D%B701',
          quote: '任臣案淮南萬畢術曰婦終知來狌狌知往',
          archive: 'EDITION_EVIDENCE/guangzhu-juan01-20261004.txt',
          note: '「知往」与《海内南经》「狌狌知人名」同为后人增衍的智性叙述;本站照录并存。',
        },
      ],
    },
    {
      era: '先秦两汉文献链(《禮記》及清·吳任臣《山海經廣注》彙證)',
      text: '狌狌在早期文献中最著名的一笔是「能言」:《禮記·曲禮上》以「鸚鵡能言,不離飛鳥;猩猩能言,不離禽獸」立人禽之辨。吳任臣《廣注》又彙錄《王會解》「都郭生生,即狌狌也」(以《逸周書·王會解》的都郭/生生為異名)与《太微經》「狌染齒于酒」等说,与本经「食之善走」的记载并存。',
      claims: [
        {
          text: '《禮記·曲禮上》以「猩猩能言」与鹦鹉对举,谓其虽能言、不離禽獸——狌狌的「能言」是早期文献链中最著名的一笔。',
          sourceTitle: '《禮記·曲禮上》(漢·戴聖編)',
          sourceUrl: 'https://zh.wikisource.org/wiki/%E7%A6%AE%E8%A8%98/%E6%9B%B2%E7%A6%AE%E4%B8%8A',
          quote: '鸚鵡能言，不離飛鳥；猩猩能言，不離禽獸。今人而無禮，雖能言，不亦禽獸之心乎！',
          archive: 'EDITION_EVIDENCE/liji-quli-shang-excerpt-20261004.txt',
          note: '《禮記》以猩猩之「能言」为人禽之辨的话头;与本经「食之善走」构成狌狌文献的两条主线(言/走)。G79 新增。',
        },
        {
          text: '吳任臣《廣注》彙錄《王會解》「都郭生生即狌狌」与《太微經》「狌染齒于酒」诸说,狌狌异名与传说并陈。',
          sourceTitle: '《山海經廣注》(四庫全書本)卷01·吳任臣案引',
          sourceUrl: 'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93%E5%BB%A3%E6%B3%A8_(%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC)/%E5%8D%B701',
          quote: '任臣案淮南萬畢術曰婦終知來狌狌知往王㑹解州靡以費費都郭生生即狌狌也太微經曰狌染齒于酒忘其努取',
          archive: 'EDITION_EVIDENCE/guangzhu-juan01-20261004.txt',
          note: '「王㑹解」即《逸周書·王會解》;汇证文字照录广注案语,本站不分拆诸引。G79 新增。',
        },
      ],
    },
  ],
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
