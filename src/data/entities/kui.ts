import type { Entity } from '../types'

/**
 * 夔 —— 原文于 2026-09-20 经 ctext.org 公开文本逐字核对。
 * 所在:大荒东经·流波山(东海中)。
 */
export const KUI: Entity = {
  id: 'ent-kui',
  slug: 'kui',
  canonicalName: '夔',
  pinyin: 'kuí',
  aliases: [],
  type: 'beast',
  summary:
    '东海流波山之兽:状如牛,苍身无角,一足;出入水必伴风雨,目光如日月,声如雷;原文记黄帝以其皮为鼓,声闻五百里。',
  chapterIds: ['ch-dahuang-dong'],
  locationIds: ['loc-liubo'],
  citations: [
    {
      originalText:
        '东海中有流波山，入海七千里。其上有兽，状如牛，苍身而无角，一足，出入水则必风雨，其光如日月，其声如雷，其名曰夔。黄帝得之，以其皮为鼓，橛以雷兽之骨，声闻五百里，以威天下。',
      chapter: '大荒东经',
      section: '流波山',
      sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
      publicUrl: 'https://ctext.org/shan-hai-jing/da-huang-dong-jing/zhs',
      verificationNote:
        '2026-09-20 经 ctext 公开文本逐字核对。「夔」另有见于他篇的记载,本条只录《大荒东经》,关系待谱系轮核对。',
      verifiedAt: '2026-09-20',
    },
  ],
  appearanceTraits: [
    {
      kind: 'appearance',
      text: '状如牛,苍身而无角,一足——形体如牛,青苍色的身躯,没有角,只有一只脚。',
      citationIndex: 0,
    },
    {
      kind: 'appearance',
      text: '其光如日月——身上放出如日月般的光。',
      citationIndex: 0,
    },
  ],
  behaviorTraits: [], // 原文未载(出入水伴风雨录入征兆区)
  soundTraits: [
    {
      kind: 'sound',
      text: '其声如雷——吼声如雷鸣。',
      citationIndex: 0,
    },
  ],
  dietTraits: [], // 原文未载
  abilities: [
    {
      text: '黄帝得之,以其皮为鼓,橛以雷兽之骨,声闻五百里,以威天下——原文记黄帝以其皮制鼓,以雷兽之骨为鼓槌,鼓声传五百里,威震天下(制器记述)。',
      citationIndex: 0,
    },
  ],
  omens: [
    {
      text: '出入水则必风雨——它出入水域时,必定伴随风雨(征兆记述)。',
      citationIndex: 0,
    },
  ],
  modernExplanation:
    '夔见于《大荒东经》东海中的流波山。按原文,它形如牛,青苍色,无角而只有一足,出入水域必带风雨,身放日月之光,吼声如雷;黄帝得到它之后,用它的皮做鼓,以雷兽之骨作槌,鼓声远播五百里。旧注对「雷兽」为何物说法不一;夔的形象在后世的音乐传说中另有演变,本站严格区分原始记载与流变。',
  disputedReadings: [
    '「雷兽」为何物,旧注有异说(或以为即夔类),本站不作定论。',
    '「橛」字的训释(或解悬置、或解击打),本站取通行理解并注明分歧。',
    '「一足」的形貌,后世诠释多歧(如与乐正夔的人名传说相混),均属流变,详见「后世流变」。',
  ],
  relatedEntityIds: [],
  tags: ['大荒东经', '流波山', '一足', '其声如雷', '皮鼓'],
  recordStatus: 'verified',
  illustration: {
    kind: 'svg',
    alt: '夔剪影插画(据原文描述艺术演绎)',
    note: '据原文描述艺术演绎',
  },
  laterReception: [
    {
      era: '后世流变(本站编辑说明,与上方原始记载相区分)',
      text: '「夔」在后世至少牵涉三套脉络:①本条的兽形记载与「夔牛」「夔鼓」一类器物、音乐传说;②虞舜乐正「夔」的人名传说——「夔一足」的著名辨析即由人兽相混而生(见下条);③青铜器纹样命名中的「夔纹」。三者源头不同、相互渗衍。其中②有可核来源,见下;①③本轮未取得可核来源,留白待补,不写为事实。',
      claims: [
        {
          text: '《呂氏春秋·察傳》载鲁哀公以「樂正夔一足」为问,孔子举舜命夔典乐之事作答,结以「若夔者一而足矣」,并明言「故曰夔一足,非一足也」——这是「夔一足」被解为「一人而已,非一足之兽」的早期文献依据,也正是人(乐正)与兽(一足之夔)相混的关节点。',
          sourceTitle: '《呂氏春秋》卷二十二·察傳(秦·吕不韦门客)',
          sourceUrl:
            'https://zh.wikisource.org/w/index.php?title=%E5%91%82%E6%B0%8F%E6%98%A5%E7%A7%8B/%E5%8D%B7%E4%BA%8C%E5%8D%81%E4%BA%8C&oldid=2497183',
          quote:
            '魯哀公問於孔子曰：「樂正夔一足，信乎？」……若夔者一而足矣。』故曰夔一足，非一足也。',
          archive: 'EDITION_EVIDENCE/liubian-guji-20261002.md 二',
          note: '维基文库公版页面固定版本 oldid=2497183,2026-10-02 抓取;引文中「……」为本站标示的省略,省略号两侧文字均逐字照录',
        },
      ],
    },
  ],
  updatedAt: '2026-09-20',
}
