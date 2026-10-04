import type { Entity } from '../types'

/**
 * 钦原 —— G90 建条(2026-10-05,五阶线B 词条扩容首轮)。
 * 任务书 G90 原定「陆吾」经现读勘误已在站(ent-luwu,verified),沿四阶 v2 凤皇
 * 先例改为同点位(昆仑之丘)未建异兽钦原;四源齐:B2 西山郭注档第 108 行×
 * arteducation bookv_2×袁本(殆知阁)×站内昆仑丘条(G01,ctext 核)。
 * claims 核源=吴任臣《山海经广注》卷02 任臣案(EDITION_EVIDENCE/guangzhu-juan02-20261004.txt,
 * G77 拉取存档)。recordStatus=unverified(五阶红线 6:新词条不入推荐/探索/题池)。
 * 配图:维基共享复查 0 命中(CLASSIC_ART_RECON 待图清单外新查),「待补古图」占位如实。
 */
export const QINYUAN: Entity = {
  id: 'ent-qinyuan',
  slug: 'qinyuan',
  canonicalName: '钦原',
  pinyin: 'qīn yuán',
  aliases: ['欽原(底本用字)'],
  type: 'bird',
  summary:
    '昆仑之丘上的毒鸟,形状像蜂,大如鸳鸯,螫鸟兽则死、螫树木则枯——昆仑神境中以毒性著称的异鸟。',
  chapterIds: ['ch-xishan'],
  locationIds: ['loc-kunlun'],
  citations: [
    {
      originalText: '有鸟焉，其状如蜂，大如鸳鸯，名曰钦原，蠚鸟兽则死，蠚木则枯。',
      chapter: '西山经',
      section: '西次三经(昆仑之丘)',
      sourceEdition:
        '通行本(郭璞注系统),据站内昆仑之丘条(G01,ctext 公开文本核验)与维基文库四库本郭璞注西山经档(B2,2026-10-05 拉取第 108 行)、arteducation bookv_2 页、袁珂校注本四源逐字一致(G90);郭注「欽,或作爰,或作至也」以 {{*|}} 夹注插于「欽原」二字之间,剥注后连读',
      publicUrl:
        'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E8%A5%BF%E5%B1%B1%E7%B6%93',
      variantText:
        '「欽」:郭注「欽,或作爰,或作至也」(B2 第 108 行夹注/广注卷02 同)——异文注记照录;本站从底本正文作「钦」。「蠭」(B2 原文)与「蜂」为古今字,上屏转写「蜂」。',
      verificationNote:
        '2026-10-05 建条核验(G90):引文与 B2 西山郭注档(存档 EDITION_EVIDENCE/wikisource-xishan1-guopu-20261005.txt 第 108 行)剥注后逐字一致,arteducation bookv_2 与袁本同句逐字合;站内昆仑之丘条引文(G01,ctext 核验)同段互证。recordStatus=unverified(五阶红线 6:词条升级留呈报)。郭注「欽或作爰或作至」存档,注层照录。',
      verifiedAt: '2026-10-05',
    },
  ],
  appearanceTraits: [
    {
      kind: 'appearance',
      text: '其状如蜂——身体像蜂(细腰毒虫之形)。',
      citationIndex: 0,
    },
    {
      kind: 'appearance',
      text: '大如鸳鸯——体形与鸳鸯相当(远大于常蜂)。',
      citationIndex: 0,
    },
  ],
  soundTraits: [], // 原文未载
  behaviorTraits: [
    {
      kind: 'behavior',
      text: '蠚鸟兽则死,蠚木则枯——螫刺鸟兽即死,螫刺树木即枯,毒性烈于常蜂。',
      citationIndex: 0,
    },
  ],
  dietTraits: [], // 原文未载
  abilities: [], // 原文未载
  omens: [], // 原文未载
  modernExplanation:
    '钦原见于《西山经》昆仑之丘,是栖息于昆仑神境的毒鸟。按原文,它形状像蜂而体大如鸳鸯,螫刺鸟兽即死、螫刺树木即枯——吴任臣《广注》引五侯鲭「蠧鸟兽则死,蠧木则空」,把毒性落到「蛀空树木」的具体后果(见本条「后世流变」)。其形貌组合(蜂形+鸳鸯之体)与《南山经》鸣蛇、化蛇等「兽鸟合体」异兽同构,本站不作原型推断。郭注存一异文「欽或作爰或作至」,照录待考。维基共享暂无钦原古图,「待补古图」占位如实。',
  disputedReadings: [
    '「欽」之异文:郭注「欽,或作爰,或作至也」(B2 第 108 行夹注)——「爰」「至」两异文照录,本站从底本正文「钦」。',
    '「蠭」/「蜂」:B2 原文作「蠭」,为「蜂」之古字,上屏转写「蜂」(一对一)。',
    '本条核验状态「待考证」:五阶新词条按红线一律 unverified(不因四源一致升级,词条升级留用户裁决),引文本身已经四源逐字核对。',
  ],
  laterReception: [
    {
      era: '晋·郭璞《圖贊》(清·吳任臣《山海經廣注》卷二任臣案引)',
      text: '郭璞《图赞》为钦原存一赞:「钦原类蜂,大如鸳鸯,触物则毙,其锐难当」——赞语四句全承本经「状如蜂」「大如鸳鸯」「蠚鸟兽则死」三句,并以「其锐难当」点出毒性之烈,可见图赞与经文同源相承,非另创一说。',
      claims: [
        {
          text: '郭璞《山海经图赞》咏钦原「钦原类蜂,大如鸳鸯,触物则毙,其锐难当」——赞语与经文三句一一相应,以「其锐难当」总括毒性。',
          sourceTitle: '《山海經廣注》(四庫全書本)卷02·任臣案引圖贊',
          sourceUrl:
            'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93%E5%BB%A3%E6%B3%A8_(%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC)/%E5%8D%B702',
          quote: '任臣案圖贊曰土螻食人四角似羊欽原𩔖蜂大如鴛鴦觸物則斃其鋭難當',
          archive: 'EDITION_EVIDENCE/guangzhu-juan02-20261004.txt',
          note: '图赞文字依四庫本廣注案语所引照录(该案语土螻/钦原两赞连书,本条取钦原半);「𩔖」即「类」之异体,照录。G90 新增。',
        },
        {
          text: '明清名物书对钦原毒性的记载一脉相承:《駢雅》径以「蠚鸟」归类,《元览》记「蜚竭水,钦原蠚木」,《五侯鲭》则落到「蠧鸟兽则死,蠧木则空」——毒性从「蠚死蠚枯」具体化为「蛀空树木」。',
          sourceTitle: '《山海經廣注》(四庫全書本)卷02·任臣案引駢雅、元覽、五侯鯖',
          sourceUrl:
            'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93%E5%BB%A3%E6%B3%A8_(%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC)/%E5%8D%B702',
          quote: '任臣案駢雅云欽原蠚鳥也元覽曰蜚竭水欽原蠚木彭儼五侯鯖云欽原蠧鳥獸則死蠧木則空',
          archive: 'EDITION_EVIDENCE/guangzhu-juan02-20261004.txt',
          note: '三部名物书皆吴任臣案语所引,照录;「蠧」即「蛀」之异体,照录。本站两面原则:经文「蠚鸟兽则死,蠚木则枯」为本经正读,后世「蛀空」说照录并存。G90 新增。',
        },
      ],
    },
  ],
  relatedEntityIds: [],
  tags: ['西山经', '昆仑之丘', '状如蜂', '大如鸳鸯', '毒鸟'],
  updatedAt: '2026-10-05',
  recordStatus: 'unverified',
}
