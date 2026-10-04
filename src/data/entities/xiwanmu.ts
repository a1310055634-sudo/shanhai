import type { Entity } from '../types'

/**
 * 西王母 —— G92 建条(2026-10-05,五阶线B 第三条)。
 * 四源:B2 西山郭注档第 114 行(玉山段)×arteducation bookv_2(「又西北」方位独异
 * 记 variantText)×袁本×站内引文核;栖居山=玉山(loc-yushan3,同轮建站;
 * loc-yushan 为北次三经羽山先占)。claims 核源=吴任臣《山海经广注》卷02 玉山段
 * 任臣案(图赞/帝王世纪/广记/穆天子传,guangzhu-juan02-20261004.txt 在档)。
 * recordStatus=unverified(五阶红线 6)。神祇条目,六层分隔尤严:演绎层不涉神格演绎。
 * 古图:待图占位如实。
 */
export const XIWANMU: Entity = {
  id: 'ent-xiwanmu',
  slug: 'xiwanmu',
  canonicalName: '西王母',
  pinyin: 'xī wáng mǔ',
  aliases: ['金方白虎之神(《廣記》引,任臣按断未足信)', '天帝之女(《圖贊》)'],
  type: 'deity',
  summary:
    '玉山之神,形状像人而有豹尾虎齿,善啸,蓬发戴胜,执掌天之灾厉与五刑残杀之气——《山海经》里的西王母是威厉的刑杀之神,与后世瑶池蟠桃的慈祥王母判然两途。',
  chapterIds: ['ch-xishan'],
  locationIds: ['loc-yushan3'],
  citations: [
    {
      originalText: '又西三百五十里，曰玉山，是西王母所居也。西王母其状如人，豹尾虎齿而善啸，蓬发戴胜，是司天之厉及五残。',
      chapter: '西山经',
      section: '西次三经(玉山)',
      sourceEdition:
        '通行本(郭璞注系统),据维基文库四库本郭璞注西山经档(B2,2026-10-05 第 114 行)、arteducation bookv_2 与袁珂校注本四源对读(G92;arteducation「又西北」方位独异见 variantText)',
      publicUrl:
        'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E8%A5%BF%E5%B1%B1%E7%B6%93',
      variantText:
        '「又西三百五十里」:arteducation 作「又西北三百五十里」——方位「北」字其站独异(B2/袁本均作「西」),不采记此。「蓬髮戴勝」郭注「勝,玉勝也」(玉制胜饰);「是司天之厲及五殘」郭注「主知灾厲五刑殘殺之氣也」——注文即此神职能的正解。',
      verificationNote:
        '2026-10-05 建条核验(G92):引文与 B2 西山郭注档(存档 EDITION_EVIDENCE/wikisource-xishan1-guopu-20261005.txt 第 114 行)剥注后逐字一致,arteducation(除方位独异)、袁本同句逐字合;广注卷02 玉山案语引经文同。recordStatus=unverified(五阶红线 6:词条升级留呈报)。',
      verifiedAt: '2026-10-05',
    },
  ],
  appearanceTraits: [
    {
      kind: 'appearance',
      text: '其状如人——形体像人。',
      citationIndex: 0,
    },
    {
      kind: 'appearance',
      text: '豹尾虎齿——有豹的尾巴、虎的牙齿。',
      citationIndex: 0,
    },
    {
      kind: 'appearance',
      text: '蓬发戴胜——蓬乱着头发,头上戴着玉胜(胜形玉饰)。',
      citationIndex: 0,
    },
  ],
  soundTraits: [
    {
      kind: 'sound',
      text: '善啸——长于呼啸。',
      citationIndex: 0,
    },
  ],
  behaviorTraits: [
    {
      kind: 'behavior',
      text: '是司天之厉及五残——执掌上天的灾厉与五刑残杀之气。',
      citationIndex: 0,
    },
  ],
  dietTraits: [], // 原文未载
  abilities: [], // 原文未载
  omens: [], // 司灾厉为常职,非「见则」式征兆
  modernExplanation:
    '西王母见于《西山经》玉山,是居住在昆仑之西的神祇。按原文,她形状像人而具豹尾虎齿,善啸,蓬发戴玉胜,执掌天的灾厉与五刑残杀之气——郭注「主知灾厉五刑残杀之气」正是对这一威厉职能的正解。本条严守六层分隔:经文的西王母是刑杀之神,与《穆天子传》宴饮瑶池的宾主形象、《汉武帝内传》以降赐蟠桃的慈祥仙母,是不同时代文献层层叠加的形象流变(见本条「后世流变」),本站不把它们混写进原文层。维基共享暂无合用于本条的西王母古图,「待补古图」占位如实。',
  disputedReadings: [
    '「又西三百五十里」:arteducation 作「又西北」——方位「北」字其站独异,本站从 B2/袁本作「西」。',
    '「勝/胜」:底本「蓬髪戴勝」之「胜」为玉胜(胜形头饰),非胜负之胜;郭注「勝,玉勝也」。上屏转写「戴胜」。',
    '本条核验状态「待考证」:五阶新词条按红线一律 unverified,引文本身已经四源逐字核对。',
  ],
  laterReception: [
    {
      era: '先秦两汉·穆天子传与帝王世纪(廣注卷二任臣案引)',
      text: '西王母最早的「人生轨迹」在《穆天子传》:周穆王甲子日宾于西王母,执玄圭白璧相见;乙丑日觞西王母于瑶池之上,西王母为天子谣曰「白云在天,山陵自出……将子无死,尚复能来」——刑杀之神在西周叙事里已成了能歌的对饮宾主。任臣案又引《帝王世纪》「昆仑之北玉山之神,人身虎首,豹尾蓬头」,与经文豹尾虎齿互证;引竹书纪年「穆王五十七年,西王母来见宾于昭宫」、黄帝时授地图、舜时献白玉琯诸说,把她编入上古帝王谱系。',
      claims: [
        {
          text: '《穆天子传》载周穆王觞西王母于瑶池之上,西王母为天子谣「将子无死,尚复能来」——瑶池宴饮叙事为西王母形象由威厉之神转向宾仙之祖的关键一步。',
          sourceTitle: '《山海經廣注》(四庫全書本)卷02·郭注引穆天子傳',
          sourceUrl:
            'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93%E5%BB%A3%E6%B3%A8_(%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC)/%E5%8D%B702',
          quote: '穆天子傳曰吉日甲子天子賔干西王母執𤣥圭白璧以見西王母獻錦組百縷金玉百斤西王母再拜受之乙丑天子觴西王母于瑶池之上西王母為天子謡曰白雲在天山陵自出道里悠逺山川間之將子無死尚復能来',
          archive: 'EDITION_EVIDENCE/guangzhu-juan02-20261004.txt',
          note: '郭注文引《穆天子传》大段照录(「賔干」之「干」为「于」形讹照录);瑶池、谣辞均出此。G92 新增。',
        },
        {
          text: '《帝王世纪》称「昆仑之北玉山之神,人身虎首,豹尾蓬头」——与经文「豹尾虎齿」互证,西王母之形早期文献即有猛兽要素。',
          sourceTitle: '《山海經廣注》(四庫全書本)卷02·任臣案引帝王世紀',
          sourceUrl:
            'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93%E5%BB%A3%E6%B3%A8_(%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC)/%E5%8D%B702',
          quote: '任臣案帝王世紀曰崑崙之北玉山之神人身虎首豹尾蓬頭',
          archive: 'EDITION_EVIDENCE/guangzhu-juan02-20261004.txt',
          note: '照录。G92 新增。',
        },
        {
          text: '郭璞《山海经图赞》以「天帝之女,蓬发虎颜」咏西王母——「天帝之女」与《穆天子传》西王母自谣「我惟帝女」相应。',
          sourceTitle: '《山海經廣注》(四庫全書本)卷02·任臣案引圖贊',
          sourceUrl:
            'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93%E5%BB%A3%E6%B3%A8_(%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC)/%E5%8D%B702',
          quote: '圗贊曰天帝之女蓬髪虎顔',
          archive: 'EDITION_EVIDENCE/guangzhu-juan02-20261004.txt',
          note: '案语截录至此(后文赞语存档在案,俟全引时再补);「圗」即「图」异体照录。G92 新增。',
        },
      ],
    },
    {
      era: '唐宋·王母真形之辨(廣注卷二任臣案引)',
      text: '《太平广记》一系文献试图「辨伪」:蓬发戴胜、虎齿善啸者「乃王母之使,金方白虎之神,非王母真形也」——把经文描写降格为王母使者的形象。吴任臣直斥「其说未足信」,并从名物入手:今日戴鵀鸟头有毛花成胜,故亦名戴胜,「戴胜」之义即取诸头饰。这则按语是清代学者对西王母形象史的一次正面表态:经文所见即真形,不烦曲说。',
      claims: [
        {
          text: '《太平广记》称蓬发戴胜、虎齿善啸者「乃王母之使,金方白虎之神,非王母真形也」——将经文形象降格为王母使者说;吴任臣按断「其说未足信」。',
          sourceTitle: '《山海經廣注》(四庫全書本)卷02·任臣案引廣記並按斷',
          sourceUrl:
            'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93%E5%BB%A3%E6%B3%A8_(%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC)/%E5%8D%B702',
          quote: '又廣記云蓬髪戴華勝虎齒善嘯者此乃王母之使金方白虎之神非王母真形也其說未足信',
          archive: 'EDITION_EVIDENCE/guangzhu-juan02-20261004.txt',
          note: '两面原则:广记异说与任臣按断并录,本站从任臣断语并以经文为准。G92 新增。',
        },
        {
          text: '吴任臣以名物证「戴胜」:今戴鵀鸟头有毛花成胜,故亦名戴胜——「戴胜」之义即取诸玉胜头饰,与郭注「胜,玉胜也」相承。',
          sourceTitle: '《山海經廣注》(四庫全書本)卷02·任臣案',
          sourceUrl:
            'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93%E5%BB%A3%E6%B3%A8_(%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC)/%E5%8D%B702',
          quote: '今戴鵀鳥以頭上有毛花成勝故亦名戴勝明此知戴勝之義',
          archive: 'EDITION_EVIDENCE/guangzhu-juan02-20261004.txt',
          note: '名物训释照录。G92 新增。',
        },
      ],
    },
  ],
  relatedEntityIds: ['ent-luwu'], // G98:广注卷02 昆仑段案语共现(穆天子传见西王母/陆吾司之)
  tags: ['西山经', '玉山', '豹尾虎齿', '蓬发戴胜', '司天之厉及五残', '神祇'],
  updatedAt: '2026-10-05',
  recordStatus: 'unverified',
}
