import type { Entity } from '../types'

/**
 * 猾褢 —— G29 建条(2026-10-02)。底本A(ctext)反爬不可达,用字经中文维基文库
 * 两个具名来源(B1《山海經/南山經》页面文本 × B2 四库本郭璞注)逐字对照一致后
 * 录入;A 侧恢复后回核,核验状态届时再议升级。详见 EDITION_AUDIT.md 三之补6。
 */
export const HUAHUAI: Entity = {
  id: 'ent-huahuai',
  slug: 'huahuai',
  canonicalName: '猾褢',
  pinyin: 'huá huái',
  aliases: [],
  type: 'beast',
  summary:
    '尧光之山的异兽,状如人而长猪鬣,穴居冬蛰,鸣声如砍木;原文载其出现时县里将有大徭役。',
  chapterIds: ['ch-nanshan'],
  locationIds: ['loc-yaoguang'],
  citations: [
    {
      originalText: '有兽焉，其状如人而彘鬛，穴居而冬蛰，其名曰猾褢，其音如斲木，见则县有大繇。',
      chapter: '南山经',
      section: '南次二经第三山(尧光之山)',
      guoPuNotes: [
        {
          attach: '其名曰猾褢',
          text: '滑懷兩音',
        },
        {
          attach: '其音如斲木',
          text: '如人斫木聲',
        },
        {
          attach: '见则县有大繇',
          text: '謂作役也。或曰其繇亂',
        },
      ],
      sourceEdition:
        '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)与维基文库四库本郭璞注(B2)两源逐字核对;底本A(ctext.org)2026-10-02 复测反爬不可达,恢复后回核',
      publicUrl:
        'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
      verificationNote:
        '2026-10-02 建条核验(G29):底本B1(中文维基文库《山海經/南山經》页面,存档 EDITION_EVIDENCE/wikisource-nanshan1-b1-20261002.txt 第L03行)与底本B2(维基文库四库本郭璞注,存档 wikisource-nanshan1-guopu-20261002.txt 第38行)本句净化正文逐字一致;上屏为简体逐字转换(仅繁简对应,逐字对照表见 EDITION_AUDIT.md 三之补6),注文保持繁体未转简。「褢」为「懷」古字,照录底本。底本A(ctext zhs)当日复测不可达(反爬拦截页),A×B 回核挂账,见 DRAFT-nanci2 疑点清单。',
      verifiedAt: '2026-10-02',
    },
  ],
  appearanceTraits: [
    {
      kind: 'appearance',
      text: '其状如人而彘鬛——体貌像人,长着猪一样的鬣毛。「彘」即猪;「鬛」同「鬣」,兽颈部长毛。',
      citationIndex: 0,
    },
  ],
  behaviorTraits: [
    {
      kind: 'behavior',
      text: '穴居而冬蛰——住在洞穴里,冬天蛰伏。',
      citationIndex: 0,
    },
  ],
  soundTraits: [
    {
      kind: 'sound',
      text: '其音如斲木——鸣声如同砍木头(郭璞注:如人斫木聲)。',
      citationIndex: 0,
    },
  ],
  dietTraits: [], // 原文未载
  abilities: [], // 原文未载
  omens: [
    {
      text: '见则县有大繇——原文载它出现时,县里将有大徭役(郭璞注:謂作役也;或曰其繇亂)。',
      citationIndex: 0,
    },
  ],
  modernExplanation:
    '猾褢见于《南山经》南次二经的尧光之山。按原文,它形状像人而长猪鬣,穴居冬蛰,鸣声如砍木;它出现时县里会有大徭役,是古书中的劳役征兆之兽。郭璞注其名「滑懷兩音」,读法从注。其真实原型为何,本站不作推断。',
  disputedReadings: [
    '「猾褢」之「褢」:底本B1/B2均作「褢」(「懷」之古字),郭璞注「滑懷兩音」;他本或涉注音作「懷」类字形,本站照录底本用字,不作改字。',
    '郭注「謂作役也。或曰其繇亂」:郭璞于「大繇」并存两说,注文照录于注层;「繇」此处通行读 yáo、通「徭」,第二解训义本站不加臆测。',
    '底本A(ctext)2026-10-02 复测反爬不可达,本条用字以中文维基文库两源(B1×B2)逐字对照为据,A 恢复后回核;在此之前本条核验状态保持「待考证」。',
  ],
  relatedEntityIds: [],
  tags: ['南山经', '尧光之山', '如人', '彘鬣', '穴居冬蛰', '徭役之兆'],
  recordStatus: 'unverified',
  illustration: {
    kind: 'svg',
    alt: '猾褢水墨底座过渡插画(原创演绎;正式插画待艺术轮注册)',
    note: '未注册正式插画,渲染统一水墨底座过渡层',
  },
  updatedAt: '2026-10-02',
}
