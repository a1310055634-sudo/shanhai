import type { Entity } from '../types'

/**
 * 九尾狐 —— 原文于 2026-09-20 经 ctext.org 公开文本逐字核对。
 * 青丘之山在《南山经》南次一经(基山之后、箕尾之山之前)。
 */
export const JIUWEIHU: Entity = {
  id: 'ent-jiuweihu',
  slug: 'jiuweihu',
  canonicalName: '九尾狐',
  pinyin: 'jiǔ wěi hú',
  aliases: [],
  type: 'beast',
  summary:
    '青丘之山的异兽,状如狐而九尾,鸣声如婴儿;原文载其能食人,而食之者「不蛊」。',
  chapterIds: ['ch-nanshan'],
  locationIds: ['loc-qingqiu'],
  citations: [
    {
      originalText:
        '有兽焉，其状如狐而九尾，其音如婴儿，能食人，食者不蛊。',
      chapter: '南山经',
      section: '南次一经 · 青丘之山',
      guoPuNotes: [
        {
          attach: '其狀如狐而九尾',
          text: '即九尾狐',
        },
        {
          attach: '食者不蠱',
          text: '敢其肉，令人不逢妖邪之氣，或曰蠱毒',
        },
      ],
      sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
      publicUrl: 'https://ctext.org/shan-hai-jing/nan-shan-jing/zhs',
      verificationNote:
        '2026-09-20 经 ctext 公开文本逐字核对。青丘之山句「又东三百里,曰青丘之山,其阳多玉,其阴多青䨼。」同日核对;按同篇山序,青丘之山为南次一经第八山(招摇、堂庭、猨翼、杻阳、祗山、亶爰、基山之后)。 2026-09-27 复核:与底本A(ctext zhs,存档 EDITION_EVIDENCE/ctext-nanci1-20260927.txt)逐字一致,并与底本B(中文维基文库郭璞注本)对照相符。 另:B本郭璞注「即九尾狐」可证条目对应;B本「食者不蠱」页面自带异文「一作纂」,录备考。 2026-10-02 郭璞注层上线:注文 2 条逐字照录底本B原始 wikitext(存档 EDITION_EVIDENCE/wikisource-nanshan1-guopu-20261002.txt),保持繁体未转简;「敢其肉」之「敢」疑为「啖」之形讹,底本原样照录不改,见疑点清单。',
      verifiedAt: '2026-09-20',
    },
  ],
  appearanceTraits: [
    {
      kind: 'appearance',
      text: '其状如狐而九尾——形体如狐,而有九条尾巴。',
      citationIndex: 0,
    },
  ],
  behaviorTraits: [], // 原文未载(「能食人」录入食性)
  soundTraits: [
    {
      kind: 'sound',
      text: '其音如婴儿——鸣声如婴儿啼。',
      citationIndex: 0,
    },
  ],
  dietTraits: [
    {
      kind: 'diet',
      text: '能食人——原文载其能吃人(该兽自身的食性记述)。',
      citationIndex: 0,
    },
  ],
  abilities: [
    {
      text: '食者不蛊——原文载食用它的人「不蛊」;「蛊」的具体所指(蛊惑、蛊毒等)存在不同理解。',
      citationIndex: 0,
    },
  ],
  omens: [], // 原文未载
  modernExplanation:
    '九尾狐见于《南山经》青丘之山。按原文,它形如狐而有九尾,鸣声如婴儿啼,能吃人;「食者不蛊」是原文记录的食用效果。需要特别说明:后世文艺中的九尾狐形象(祥瑞或妖异)与本条原始记载差异很大,本站严格区分两者。',
  disputedReadings: [
    '「食者不蠱」郭注兩說:郭璞注「噉其肉令人不逄妖邪之氣」,又存「或曰蠱,蠱毒」一說——「不蠱」究竟是「不逢妖邪」還是「不中蠱毒」,郭注已兩說並存,本站照錄不裁決。(G79 登記)',
    '「食者不蛊」之「蛊」,或解为蛊惑、或解为蛊毒,具体所指存在不同理解。',
    '「能食人」与「食者不蛊」两句的主语不同(前者指兽食人,后者指人食兽),通读时须留意。',
    '青丘之山的现代地理比附,众说纷纭,本站暂不录入。',
  ],
  relatedEntityIds: [],
  tags: ['南山经', '南次一经', '青丘之山', '九尾', '如狐'],
  recordStatus: 'verified',
  illustration: {
    kind: 'svg',
    alt: '九尾狐剪影插画(据原文描述艺术演绎)',
    note: '据原文描述艺术演绎',
  },
  laterReception: [
    {
      era: '后世流变(本站编辑说明,与上方原始记载相区分)',
      text: '九尾狐是后世形象变化较大的《山海经》异兽之一。可以核到来源的一点是:至迟在汉代,「白狐九尾」已被写进王朝受命的故事里,作为「王之證」的祥瑞。至于六朝志怪、唐宋传奇与明清小说中九尾狐形象如何一步步演变,本轮尚未取得可核来源,本站留白待补,不写为事实。',
      claims: [
        {
          text: '《吳越春秋》记禹娶塗山之事,以「白狐九尾」为应验之兆;禹解为「白者,吾之服也。其九尾者,王之證也」——九尾狐在此已是王者的祥瑞之证。',
          sourceTitle: '《吳越春秋》越王無余外傳第六(汉·赵晔)',
          sourceUrl:
            'https://zh.wikisource.org/w/index.php?title=%E5%90%B3%E8%B6%8A%E6%98%A5%E7%A7%8B/%E8%B6%8A%E7%8E%8B%E7%84%A1%E4%BD%99%E5%A4%96%E5%82%B3&oldid=2178543',
          quote:
            '乃有白狐九尾造於禹。禹曰：“白者，吾之服也。其九尾者，王之證也。……明矣哉！”',
          archive: 'EDITION_EVIDENCE/liubian-guji-20261002.md 一',
          note: '维基文库公版页面固定版本 oldid=2178543,2026-10-02 直连抓取;繁体与标点照原页(原页外层引语作 “ ”,与《呂氏春秋》页作「 」者不同,本站不统一)。「……」为本站标示的省略(省略处即下条所引塗山之歌),省略号两侧各自逐字照录',
        },
        {
          text: '同篇所载塗山之歌,以“綏綏白狐，九尾痝痝”与“來賓為王”“成家成室”连言,可见汉代叙述中九尾白狐兼有婚姻与王业两重吉兆意味。',
          sourceTitle: '《吳越春秋》越王無余外傳第六(汉·赵晔)·塗山之歌',
          sourceUrl:
            'https://zh.wikisource.org/w/index.php?title=%E5%90%B3%E8%B6%8A%E6%98%A5%E7%A7%8B/%E8%B6%8A%E7%8E%8B%E7%84%A1%E4%BD%99%E5%A4%96%E5%82%B3&oldid=2178543',
          quote: '綏綏白狐，九尾痝痝。我家嘉夷，來賓為王。成家成室，我造彼昌。',
          archive: 'EDITION_EVIDENCE/liubian-guji-20261002.md 一',
          note: '「痝痝」为该页面用字(通行本或作「龐龐」),照录不改并记存档「转录备忘」',
        },
      ],
    },
    {
      era: '漢代讖緯與史志符瑞系統(吳任臣《山海經廣注》卷一彙引)',
      text: '九尾狐在漢代讖緯與史志中是系統性的祥瑞:吳任臣《廣注》彙引《孝經援神契》「德至鳥獸,則狐九尾」、《春秋運斗樞》「璣星得,則狐九尾」、《孫氏瑞應圖》「王者不傾于色,則九尾狐至」諸說,又歷數《古今注》章帝時白狐九尾見信都、《魏略》文帝受禪郡國奏九尾狐見于譙、《北史》天平八年光州獲九尾狐等史事——瑞應敘事自西漢讖緯貫穿至北朝史志。',
      claims: [
        {
          text: '漢代緯書《孝經援神契》以「狐九尾」為「德至鳥獸」的太平之應,九尾之數被賦予德化意義。',
          sourceTitle: '《山海經廣注》(四庫全書本)卷01·吳任臣案引《孝經援神契》',
          sourceUrl: 'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93%E5%BB%A3%E6%B3%A8_(%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC)/%E5%8D%B701',
          quote: '孝經援神契徳至鳥獸則狐九尾',
          archive: 'EDITION_EVIDENCE/guangzhu-juan01-20261004.txt',
          note: '吳任臣案引;與《吳越春秋》塗山歌(見上條)同為漢代九尾狐祥瑞敘事的兩大源頭(緯書系/史事系)。G79 新增。',
        },
        {
          text: '自東漢《古今注》記章帝時「白狐九尾見信都」,至《魏略》《北史》符瑞志歷歷記載九尾狐之見,九尾狐作為王朝符瑞進入正史書寫。',
          sourceTitle: '《山海經廣注》(四庫全書本)卷01·吳任臣案引《古今注》等',
          sourceUrl: 'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93%E5%BB%A3%E6%B3%A8_(%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC)/%E5%8D%B701',
          quote: '古今注章帝時白狐九尾見信都魏畧云文帝欲受禪郡國奏九尾狐見于譙陳宋符瑞志黄初元年九尾狐又見甄城北史天平八年光州獲九尾狐以獻',
          archive: 'EDITION_EVIDENCE/guangzhu-juan01-20261004.txt',
          note: '吳任臣案引連珠式彙錄;引文自「古今注」至「以獻」為四書連錄,本站不分拆。G79 新增。',
        },
      ],
    },
  ],
  updatedAt: '2026-09-20',
}
