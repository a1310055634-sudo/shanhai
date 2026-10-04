import type { Entity } from '../types'

/**
 * 毕方 —— G91 建条(2026-10-05,五阶线B 第二条)。
 * 四源:B2 西山郭注档第 122 行×呈现态重抓×arteducation bookv_2(「畢文」为其站排印
 * 误字,记 variantText)×袁本(珂案引诸本皆「毕方」);章莪之山同轮建站(loc-zhangwo)。
 * claims 核源=吴任臣《山海经广注》卷02 任臣案(图赞/淮南子注/白泽图/柳宗元/尚书故实/
 * 薛综注,guangzhu-juan02-20261004.txt 在档)。recordStatus=unverified(五阶红线 6)。
 * 古图:待图占位如实(commons 复查与四阶清单均无)。
 */
export const BIFANG: Entity = {
  id: 'ent-bifang',
  slug: 'bifang',
  canonicalName: '毕方',
  pinyin: 'bì fāng',
  aliases: ['畢方(底本用字)', '必方(《白澤圖》)', '畢鸞(訛稱,見《尚書故實》)'],
  type: 'bird',
  summary:
    '章莪之山上的独脚火鸟,形状像鹤,青底赤纹白喙,鸣声即是在喊自己的名字;它出现在哪里,哪里就有怪火之灾——千年火灾妖鸟,木火之精。',
  chapterIds: ['ch-xishan'],
  locationIds: ['loc-zhangwo'],
  citations: [
    {
      originalText: '有鸟焉，其状如鹤，一足，赤文青质而白喙，名曰毕方，其鸣自叫也，见则其邑有讹火。',
      chapter: '西山经',
      section: '西次三经(章莪之山)',
      sourceEdition:
        '通行本(郭璞注系统),据维基文库四库本郭璞注西山经档(B2,2026-10-05 第 122 行)、呈现态重抓段、arteducation bookv_2 与袁珂校注本四源对读(G91;arteducation「畢文」为排印误字见 variantText)',
      publicUrl:
        'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E8%A5%BF%E5%B1%B1%E7%B6%93',
      variantText:
        '「名曰畢方」:arteducation 作「畢文」——袁本珂案引诸本皆「毕方」,定性为其站排印误字(G85 框架),不采。「其名如猙」(同段兽句):袁本珂案「宋本、吴宽抄本并作曰狰」,本站从 B 系「如狰」。',
      verificationNote:
        '2026-10-05 建条核验(G91):引文与 B2 西山郭注档(存档 EDITION_EVIDENCE/wikisource-xishan1-guopu-20261005.txt 第 122 行)剥注后逐字一致,呈现态重抓段、arteducation(除「畢文」误字)、袁本同句逐字合;广注卷02 案语引经文同。recordStatus=unverified(五阶红线 6:词条升级留呈报)。',
      verifiedAt: '2026-10-05',
    },
  ],
  appearanceTraits: [
    {
      kind: 'appearance',
      text: '其状如鹤,一足——形状像鹤,只有一只脚。',
      citationIndex: 0,
    },
    {
      kind: 'appearance',
      text: '赤文青质而白喙——青色的身体上有赤色斑纹,白色的喙。',
      citationIndex: 0,
    },
  ],
  soundTraits: [
    {
      kind: 'sound',
      text: '其鸣自叫也——鸣声即是在喊「毕方」自己的名字。',
      citationIndex: 0,
    },
  ],
  behaviorTraits: [],
  dietTraits: [], // 原文未载
  abilities: [], // 原文未载
  omens: [
    {
      text: '见则其邑有讹火——它出现的地方,会发生怪火之灾。',
      citationIndex: 0,
    },
  ],
  modernExplanation:
    '毕方见于《西山经》章莪之山,是独脚鹤形、青质赤纹白喙的火鸟,「见则其邑有讹火」使它成为山海经中与火灾绑定的妖鸟。后世文献把它进一步五行化:《淮南子》注称「木生毕方」(木火之精),《白泽图》称「火之精曰必方」;柳宗元元和年间逐毕方文,则是它最著名的唐代入世记录(见本条「后世流变」)。薛综《文选》注「两足一翼」与经文「一足」小异,照录并存。维基共享暂无毕方古图,「待补古图」占位如实。',
  disputedReadings: [
    '「一足」:薛综《文選》注作「畢方如鳥兩足一翼,常銜火作怪灾」——与经文「一足」小异,任臣案已注「与经文小有異同,未可据也」;本站从经文。',
    '「畢文」:arteducation 排印作「畢文」,袁本珂案诸本皆「毕方」,定性排印误字(疑点框架外,记 variantText)。',
    '本条核验状态「待考证」:五阶新词条按红线一律 unverified,引文本身已经四源逐字核对。',
  ],
  laterReception: [
    {
      era: '汉晋·五行火精与《圖贊》(廣注卷二任臣案引)',
      text: '毕方在汉晋文献中被定型为「木火之精」:《淮南子》注称「木生毕方」,状如鸟、青色赤脚、一足而不食五谷;《白泽图》称「火之精曰必方,状如鸟一足,以其名呼之则去」。郭璞《图赞》则以「赤文」「离精」(离为火)点题——「旱则高翔……集乃流灾,火不炎」,把经文「见则有讹火」转写为可禳解的火妖。',
      claims: [
        {
          text: '《淮南子》注称毕方「木生毕方」,状如鸟、青色赤脚、一足、不食五谷——木火之精的五行定位自此成型。',
          sourceTitle: '《山海經廣注》(四庫全書本)卷02·任臣案引淮南子注',
          sourceUrl:
            'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93%E5%BB%A3%E6%B3%A8_(%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC)/%E5%8D%B702',
          quote: '淮南子木生畢方注云狀如鳥青色赤脚一足不食五榖',
          archive: 'EDITION_EVIDENCE/guangzhu-juan02-20261004.txt',
          note: '任臣案语所引照录;「一足」与经文合。G91 新增。',
        },
        {
          text: '《白泽图》称「火之精曰必方,状如鸟一足,以其名呼之则去」——「必方」即毕方,火精可呼名驱去的禳解术一脉,与经文妖鸟说并存。',
          sourceTitle: '《山海經廣注》(四庫全書本)卷02·任臣案引白澤圖',
          sourceUrl:
            'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93%E5%BB%A3%E6%B3%A8_(%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC)/%E5%8D%B702',
          quote: '又白澤圖火之精曰必方狀如鳥一足以其名呼之則去即畢方也',
          archive: 'EDITION_EVIDENCE/guangzhu-juan02-20261004.txt',
          note: '任臣案「即畢方也」为吴任臣按断。G91 新增。',
        },
        {
          text: '郭璞《山海经图赞》咏毕方「毕方赤文,离精是炳,旱则高翔,鼓翼阳景,集乃流灾,火不炎」——以离卦之火点题,承经文「赤文」「讹火」而加禳解之意。',
          sourceTitle: '《山海經廣注》(四庫全書本)卷02·任臣案引圖贊',
          sourceUrl:
            'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93%E5%BB%A3%E6%B3%A8_(%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC)/%E5%8D%B702',
          quote: '圗贊曰畢方赤文離精是炳旱則髙翔鼓翼陽景集乃流灾火不炎',
          archive: 'EDITION_EVIDENCE/guangzhu-juan02-20261004.txt',
          note: '「圗」即「图」异体,照录;「离精」=离卦火精。G91 新增。',
        },
      ],
    },
    {
      era: '唐宋·逐毕方与独足鹤(廣注卷二任臣案引)',
      text: '毕方在唐代两次「现世」:汉武帝时有人献独足鹤,东方朔引《山海经》辨为毕方(《尚书故实》);唐元和七年(812)长安夏秋火灾日夜数十发,柳宗元作《逐毕方文》逐之——任臣案引其语「讹传怪鸟,莫实其状」,以为毕方实有其应。宋以降兴化府志记嘉靖间莆田火夜鸟下火中,犹指为柳宗元所逐之毕方。',
      claims: [
        {
          text: '汉武帝时有人献独足鹤,东方朔引《山海经》「毕方鸟也」验之即是——毕方之名汉代已为朝廷博物之谈(《尚书故实》载)。',
          sourceTitle: '《山海經廣注》(四庫全書本)卷02·任臣案引尚書故實',
          sourceUrl:
            'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93%E5%BB%A3%E6%B3%A8_(%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC)/%E5%8D%B702',
          quote: '尚書故實云漢武帝有獻獨足鶴者人皆以為異東方朔奏曰山海經云畢方鳥也驗之果是',
          archive: 'EDITION_EVIDENCE/guangzhu-juan02-20261004.txt',
          note: '「朔」字原档作 SKchar 编码生僻字形,本句取通假通行字转录,原貌以存档为准。G91 新增。',
        },
        {
          text: '唐元和七年夏火灾日夜数十发,柳宗元作《逐毕方文》——任臣案引「讹传怪鸟,莫实其状」,并引兴化府志嘉靖间莆田火灾「有鸟下火中」以为其应,毕方火灾妖鸟说唐宋以降历代相承。',
          sourceTitle: '《山海經廣注》(四庫全書本)卷02·任臣案引柳宗元逐畢方文、興化府志',
          sourceUrl:
            'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93%E5%BB%A3%E6%B3%A8_(%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC)/%E5%8D%B702',
          quote: '正柳宗元逐畢方文元和七年夏火灾日夜數十發葢𩔖物之為者訛傳怪鳥莫實其狀',
          archive: 'EDITION_EVIDENCE/guangzhu-juan02-20261004.txt',
          note: '「𩔖」即「类」异体照录;柳宗元原文未引全文,任臣案语引其断语。G91 新增。',
        },
      ],
    },
  ],
  relatedEntityIds: [],
  tags: ['西山经', '章莪之山', '状如鹤', '一足', '讹火', '火鸟'],
  updatedAt: '2026-10-05',
  recordStatus: 'unverified',
}
