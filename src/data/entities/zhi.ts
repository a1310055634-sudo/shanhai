import type { Entity } from '../types'

/**
 * 彘 —— G30 建条(2026-10-02)。底本A(ctext)反爬不可达,用字经中文维基文库
 * 两个具名来源(B1《山海經/南山經》页面文本 × B2 四库本郭璞注)逐字对照一致后
 * 录入;A 侧恢复后回核,核验状态届时再议升级。详见 EDITION_AUDIT.md 三之补7。
 * 浮玉之山段郭璞注三条(具區/水名/鮆魚)均不系于彘句,本条注层如实空缺,不凑注。
 */
export const ZHI: Entity = {
  id: 'ent-zhi',
  slug: 'zhi',
  canonicalName: '彘',
  pinyin: 'zhì',
  aliases: [],
  type: 'beast',
  summary:
    '浮玉之山的食人异兽,形状像虎而长牛尾,叫声如同狗叫。与同名的猪(彘)字同形,此处为《山经》所载兽名。',
  chapterIds: ['ch-nanshan'],
  locationIds: ['loc-fuyu'],
  citations: [
    {
      originalText: '有兽焉，其状如虎而牛尾，其音如吠犬，其名曰彘，是食人。',
      chapter: '南山经',
      section: '南次二经第七山(浮玉之山)',
      sourceEdition:
        '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)与维基文库四库本郭璞注(B2)两源逐字核对;底本A(ctext.org)2026-10-02 复测反爬不可达,恢复后回核',
      publicUrl:
        'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
      verificationNote:
        '2026-10-02 建条核验(G30):底本B1(中文维基文库《山海經/南山經》页面,存档 EDITION_EVIDENCE/wikisource-nanshan1-b1-20261002.txt 第L07行)与底本B2(维基文库四库本郭璞注,存档 wikisource-nanshan1-guopu-20261002.txt 第46行)本句净化正文逐字一致;上屏为简体逐字转换(仅繁简对应,逐字对照表见 EDITION_AUDIT.md 三之补7)。郭璞于此句无注,本条注层如实空缺。「彘」字通行指猪,此处为原文自释之兽名(状如虎而牛尾),两义并存不作取舍。底本A(ctext zhs)当日复测不可达(反爬拦截页),A×B 回核挂账,见 DRAFT-nanci2 疑点清单。',
      verifiedAt: '2026-10-02',
    },
  ],
  appearanceTraits: [
    {
      kind: 'appearance',
      text: '其状如虎而牛尾——体貌像虎,尾巴像牛。',
      citationIndex: 0,
    },
  ],
  behaviorTraits: [],
  soundTraits: [
    {
      kind: 'sound',
      text: '其音如吠犬——叫声如同狗叫。',
      citationIndex: 0,
    },
  ],
  dietTraits: [
    {
      kind: 'diet',
      text: '是食人——原文载它会吃人(该兽自身的食性记述)。',
      citationIndex: 0,
    },
  ],
  abilities: [], // 原文未载
  omens: [], // 原文未载「见则」征兆句
  modernExplanation:
    '彘见于《南山经》南次二经的浮玉之山。按原文,它形状像虎而长牛尾,叫声如犬吠,会吃人。「彘」字本身通行指猪,而此处原文自释其形(如虎牛尾),是《山经》借常用字记兽名的例子;两义并存,本站不作裁决。郭璞于此句无注。其真实原型为何,本站不作推断。',
  disputedReadings: [
    '「彘」字义:底本B1/B2正文均作「彘」;该字通行训猪,此处按原文自释为兽名(状如虎而牛尾),字义两读并存照录,不裁决。',
    '底本A(ctext)2026-10-02 复测反爬不可达,本条用字以中文维基文库两源(B1×B2)逐字对照为据,A 恢复后回核;在此之前本条核验状态保持「待考证」。',
  ],
  relatedEntityIds: [],
  tags: ['南山经', '浮玉之山', '如虎', '牛尾', '吠犬', '食人'],
  recordStatus: 'unverified',
  illustration: {
    kind: 'svg',
    alt: '彘水墨底座过渡插画(原创演绎;正式插画待艺术轮注册)',
    note: '未注册正式插画,渲染统一水墨底座过渡层',
  },
  updatedAt: '2026-10-02',
}
