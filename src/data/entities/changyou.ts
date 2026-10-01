import type { Entity } from '../types'

/**
 * 长右 —— G28 建条(2026-10-02)。底本A(ctext)反爬不可达,用字经中文维基文库
 * 两个具名来源(B1《山海經/南山經》页面文本 × B2 四库本郭璞注)逐字对照一致后
 * 录入;A 侧恢复后回核,核验状态届时再议升级。详见 EDITION_AUDIT.md 三之补5。
 */
export const CHANGYOU: Entity = {
  id: 'ent-changyou',
  slug: 'changyou',
  canonicalName: '长右',
  pinyin: 'cháng yòu',
  aliases: [],
  type: 'beast',
  summary:
    '长右之山的异兽,状如禺而四耳,因山得名,鸣声如人呻吟;原文载其出现时郡县将发大水。',
  chapterIds: ['ch-nanshan'],
  locationIds: ['loc-changyou'],
  citations: [
    {
      originalText: '有兽焉，其状如禺而四耳，其名长右，其音如吟，见则郡县大水。',
      chapter: '南山经',
      section: '南次二经第二山(长右之山)',
      guoPuNotes: [
        {
          attach: '其名長右',
          text: '以山出此獸，因以名之',
        },
        {
          attach: '其音如吟',
          text: '如人呻吟聲',
        },
      ],
      sourceEdition:
        '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)与维基文库四库本郭璞注(B2)两源逐字核对;底本A(ctext.org)2026-10-02 反爬不可达,恢复后回核',
      publicUrl:
        'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
      verificationNote:
        '2026-10-02 建条核验(G28):底本B1(中文维基文库《山海經/南山經》页面,自带郭注夹注)与底本B2(维基文库四库本郭璞注,存档 EDITION_EVIDENCE/wikisource-nanshan1-guopu-20261002.txt 第36行)本句净化正文逐字一致;上屏为简体逐字转换(仅繁简对应,逐字对照表见 EDITION_AUDIT.md 三之补5),注文保持繁体未转简。底本A(ctext zhs)当日实测不可达(反爬拦截页),A×B 回核挂账,见 DRAFT-nanci2 疑点清单。',
      verifiedAt: '2026-10-02',
    },
  ],
  appearanceTraits: [
    {
      kind: 'appearance',
      text: '其状如禺而四耳——体貌像禺,长着四只耳朵。「禺」旧注以为猿猴类,确切所指待考。',
      citationIndex: 0,
    },
  ],
  behaviorTraits: [], // 原文未载
  soundTraits: [
    {
      kind: 'sound',
      text: '其音如吟——鸣声如同人呻吟(郭璞注:如人呻吟聲)。',
      citationIndex: 0,
    },
  ],
  dietTraits: [], // 原文未载
  abilities: [], // 原文未载
  omens: [
    {
      text: '见则郡县大水——原文载它出现时,郡县将发生大水。',
      citationIndex: 0,
    },
  ],
  modernExplanation:
    '长右见于《南山经》南次二经的长右之山。按原文,它形状像禺而有四只耳朵,鸣声如人呻吟;它因所居之山得名(郭璞注:以山出此兽,因以名之,亦有解为山因兽名者,先后关系原文未详)。原文记它出现时郡县发大水,是古书中的水患征兆之兽。其真实原型为何,本站不作推断。',
  disputedReadings: [
    '「长右」山、兽同名:郭璞注谓兽因山得名,亦有理解认为山因兽得名,先后关系原文未详。',
    '「禺」为何种动物,旧注推测为猿猴类,确指待考。',
    '底本A(ctext)2026-10-02 反爬不可达,本条用字以中文维基文库两源(B1×B2)逐字对照为据,A 恢复后回核;在此之前本条核验状态保持「待考证」。',
  ],
  relatedEntityIds: [],
  tags: ['南山经', '长右之山', '如禺', '四耳', '水患之兆'],
  recordStatus: 'unverified',
  illustration: {
    kind: 'svg',
    alt: '长右水墨底座过渡插画(原创演绎;正式插画待艺术轮注册)',
    note: '未注册正式插画,渲染统一水墨底座过渡层',
  },
  updatedAt: '2026-10-02',
}
