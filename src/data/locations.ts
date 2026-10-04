import type { Location } from './types'

/**
 * 山川地域数据(首批:南山经前段两座已核验之山)。
 * 原文核验来源逐条见各 citation:南次一经等 2026-09-20 起经 ctext.org 公开文本
 * 逐字核对;南次二经柜山/长右之山(G28)、尧光之山/羽山(G29)因底本A(ctext)反爬
 * 不可达,2026-10-02 经中文维基文库两源(B1 页面×B2 四库本郭璞注)逐字对照一致后
 * 录入,A 侧回核挂账(recordStatus 暂为 unverified)。详见 CONTENT_SOURCES.md 与
 * EDITION_AUDIT.md。
 * mapPosition 为概念地图坐标(古籍叙事关系),与现实经纬度无关。
 * 地点链条(前后山)将随山川轮补全,暂缺字段不标「原文未载」。
 */
export const LOCATIONS: Location[] = [
  {
    id: 'loc-zhaoyao',
    canonicalName: '招摇之山',
    aliases: ['䧿山之首'],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次一经',
    sourceOrder: 1,
    sourceDirection: undefined,
    sourceDistance: undefined,
    relatedEntityIds: ['ent-xingxing'],
    citations: [
      {
        originalText: '南山经之首曰䧿山。其首曰招摇之山，临于西海之上，多桂，多金玉。',
        chapter: '南山经',
        section: '开篇',
        guoPuNotes: [
          {
            attach: '臨於西海之上',
            text: '在蜀，伏山山南之西頭，濱西海也。',
          },
          {
            attach: '多桂',
            text: '桂葉似枇杷，長二尺餘，廣數寸，味辛白花，叢生山峯。冬夏常青，間無雜木。《呂氏春秋》曰：「招搖之桂」',
          },
        ],
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/nan-shan-jing/zhs',
        variantText: '「䧿」与「鹊」为异体字关系,山名写法存在异文;本站以底本用字「䧿」为准并注明。',
        verificationNote: '2026-09-20 经 ctext 公开文本逐字核对(开篇句)。2026-09-27 复核:与底本A(ctext zhs)逐字一致,并与底本B(中文维基文库郭璞注本)对照相符。 2026-10-02 郭璞注层上线:注文 2 条逐字照录底本B原始 wikitext(存档 EDITION_EVIDENCE/wikisource-nanshan1-guopu-20261002.txt),保持繁体未转简;郭注「在蜀,伏山山南之西頭」为晋人地理比附,照录不代表本站采信。',
        verifiedAt: '2026-09-20',
      },
    ],
    mapPosition: { x: 12, y: 70, region: '南山经' },
    modernHypotheses: [], // 现代地理比附暂不录入(待专门考证轮)
    recordStatus: 'verified',
  },
  {
    id: 'loc-tangting',
    canonicalName: '堂庭之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次一经',
    sourceOrder: 2,
    sourceDirection: '又东',
    sourceDistance: '三百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东三百里，曰堂庭之山，多棪木，多白猿，多水玉，多黄金。',
        chapter: '南山经',
        section: '南次一经第二山',
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/nan-shan-jing/zhs',
        variantText:
          '「堂」:底本B(中文维基文库郭璞注本,2026-09-27)页面自带异文标注「堂一作常」。两具名电子本正文均作「堂」,「常」为彼本注记异文,本站从底本A「堂」。',
        verificationNote:
          '2026-09-27 建站核验:底本A(ctext zhs,存档 EDITION_EVIDENCE/ctext-nanci1-20260927.txt)与底本B(中文维基文库郭璞注本)逐字对照一致(「常」异文除外,已标注)。',
        verifiedAt: '2026-09-27',
      },
    ],
    mapPosition: { x: 20, y: 72, region: '南山经' },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    id: 'loc-yuanyi',
    canonicalName: '猨翼之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次一经',
    sourceOrder: 3,
    sourceDirection: '又东',
    sourceDistance: '三百八十里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东三百八十里，曰猨翼之山，其中多怪兽，水多怪鱼，多白玉，多腹虫，多怪蛇，多怪木，不可以上。',
        chapter: '南山经',
        section: '南次一经第三山',
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/nan-shan-jing/zhs',
        verificationNote:
          '2026-09-27 建站核验:底本A(ctext zhs)与底本B(中文维基文库郭璞注本)逐字对照一致。A/B 段内均作「猨翼」;「多白猿」之「猿」为兽名用字,与山名「猨」不同处,不构成山名异文。',
        verifiedAt: '2026-09-27',
      },
    ],
    mapPosition: { x: 27, y: 74, region: '南山经' },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    id: 'loc-chuyang',
    canonicalName: '杻阳之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次一经',
    sourceOrder: 4,
    sourceDirection: '又东',
    sourceDistance: '三百七十里',
    relatedEntityIds: ['ent-lushu'],
    citations: [
      {
        originalText: '又东三百七十里，曰杻阳之山，其阳多赤金，其阴多白金。',
        chapter: '南山经',
        section: '南次一经第四山',
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/nan-shan-jing/zhs',
        verificationNote:
          '2026-09-20 经 ctext 公开文本逐字核对;其前一山为猨翼之山(「又东三百八十里,曰猨翼之山」),地点链条待山川轮补全。 2026-09-27 复核:与底本A(ctext zhs,存档 EDITION_EVIDENCE/ctext-nanci1-20260927.txt)逐字一致,并与底本B(中文维基文库郭璞注本)对照相符。',
        verifiedAt: '2026-09-20',
      },
    ],
    mapPosition: { x: 35, y: 77, region: '南山经' },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    id: 'loc-danyuan',
    canonicalName: '亶爰之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次一经',
    sourceOrder: 6,
    sourceDirection: '又东',
    sourceDistance: '四百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东四百里，曰亶爰之山，多水，无草木，不可以上。有兽焉，其状如狸而有髦，其名曰类，自为牝牡，食者不妬。',
        chapter: '南山经',
        section: '南次一经第六山',
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/nan-shan-jing/zhs',
        verificationNote:
          '2026-09-27 建站核验:底本A(ctext zhs,存档 EDITION_EVIDENCE/ctext-nanci1-20260927.txt)与底本B(中文维基文库郭璞注本)逐字对照一致,山名与里距(又东四百里)两源相同。郭璞注「類」等注文未录入。',
        verifiedAt: '2026-09-27',
      },
    ],
    mapPosition: { x: 42, y: 79, region: '南山经' },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    id: 'loc-jishan',
    canonicalName: '基山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次一经',
    sourceOrder: 7,
    sourceDirection: '又东',
    sourceDistance: '三百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东三百里，曰基山，其阳多玉，其阴多怪木。有兽焉，其状如羊，九尾四耳，其目在背，其名曰猼訑，佩之不畏。有鸟焉，其状如鸡而三首六目，六足三翼，其名曰𪁺𩿧，食之无卧。',
        chapter: '南山经',
        section: '南次一经第七山',
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/nan-shan-jing/zhs',
        verificationNote:
          '2026-09-27 建站核验:底本A与底本B(中文维基文库郭璞注本)逐字对照一致。段内猼訑、𪁺𩿧(音博宜?)为随文异兽名,不另建条目;B本「三首六目、六足三翼」用顿号,本站从A逗号(标点整理已录 EDITION_AUDIT)。',
        verifiedAt: '2026-09-27',
      },
    ],
    mapPosition: { x: 50, y: 81, region: '南山经' },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    id: 'loc-qingqiu',
    canonicalName: '青丘之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次一经',
    sourceOrder: 8,
    sourceDirection: '又东',
    sourceDistance: '三百里',
    relatedEntityIds: ['ent-jiuweihu'],
    citations: [
      {
        originalText: '又东三百里，曰青丘之山，其阳多玉，其阴多青䨼。',
        chapter: '南山经',
        section: '南次一经第八山',
        guoPuNotes: [
          {
            attach: '青丘',
            text: '亦有青丘國在海外水經云。即《上林賦》云：「秋田於青丘」',
          },
          {
            attach: '其陰多青雘',
            text: '雘，黝屬，音瓠',
          },
        ],
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/nan-shan-jing/zhs',
        verificationNote:
          '2026-09-20 经 ctext 公开文本逐字核对。「青䨼」之「䨼」为生僻字,本站保留底本原字,释义后续补充。山序按南次一经:招摇、堂庭、猨翼、杻阳、祗山(底本A用字;底本B维基文库作「柢山」,见 EDITION_AUDIT 差1)、亶爰、基山之后即青丘。2026-09-27 复核:与底本A(ctext zhs)逐字一致,并与底本B(中文维基文库郭璞注本)对照相符。 2026-10-02 郭璞注层上线:注文 2 条逐字照录底本B原始 wikitext(存档 EDITION_EVIDENCE/wikisource-nanshan1-guopu-20261002.txt),保持繁体未转简;注 attach「其陰多青雘」照录底本B用字「雘」,与本站正文从底本A「䨼」的取舍(见 variantText)分属两层,不改注。',
        variantText:
          '「青䨼」:底本B(中文维基文库郭璞注本,2026-09-27)作「青雘」,并附郭璞注「雘,黝屬,音瓠」。两具名电子本用字互异,本站从底本A原字「䨼」(EDITION_AUDIT.md 差3)。',
        verifiedAt: '2026-09-20',
      },
    ],
    mapPosition: { x: 58, y: 84, region: '南山经' },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    id: 'loc-jiwei',
    canonicalName: '箕尾之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次一经',
    sourceOrder: 9,
    sourceDirection: '又东',
    sourceDistance: '三百五十里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东三百五十里，曰箕尾之山，其尾踆于东海，多沙石。汸水出焉，而南流注于淯，其中多白玉。',
        chapter: '南山经',
        section: '南次一经第九山(末山)',
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/nan-shan-jing/zhs',
        verificationNote:
          '2026-09-27 建站核验:底本A(ctext zhs,存档 EDITION_EVIDENCE/ctext-nanci1-20260927.txt)与底本B(中文维基文库郭璞注本)逐字对照一致。篇末紧接「凡䧿山之首…凡十山,二千九百五十里」总述(另段独立收录,计数存疑见 EDITION_AUDIT 差6/差7)。',
        verifiedAt: '2026-09-27',
      },
    ],
    mapPosition: { x: 67, y: 87, region: '南山经' },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G86:南次三经第一山(经首段,无里距句;四源对读录,B1 三经档 L01×B2 第72行)。
    id: 'loc-tianyu',
    canonicalName: '天虞之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次三经',
    sourceOrder: 1,
    nextLocationId: 'loc-daoguo',
    sourceDirection: '',
    sourceDistance: '',
    relatedEntityIds: [],
    citations: [
      {
        originalText: "南次三经之首，曰天虞之山，其下多水，不可以上。",
        chapter: '南山经',
        section: '南次三经第一山',
        sourceEdition: '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)、维基文库四库本郭璞注(B2)、arteducation.com.tw 繁体排印本与袁珂《山海经校注》本(殆知阁)四源对读逐字一致(G86);arteducation「南次三山」称谓差异沿 G85 定性(系统性排印习惯)',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText: "无页面自带异文;arteducation 作「南次三山之首」系其系统性称谓习惯(G85 已定性),袁本作「南次三经之首」与 B1/B2 同。",
        verificationNote: "2026-10-05 建站核验(G86):四源正文逐字一致(B1 三经档 L01/B2 存档第 72 行/arteducation bookv_1 页/袁本殆知阁档;泛/汎、勃/渤等异形白名单对读);上屏为简体逐字转换(東→东/禱→祷/過→过/狀→状/號→号/鴛鴦→鸳鸯/腫→肿/發→发/無→无/遺→遗/凱→凯,对照表见 EDITION_AUDIT.md 三之补13),注文保持繁体未转简。山无词条,郭注存档 citations 不上屏词条页(G71 先例设计内)。",
        verifiedAt: '2026-10-05',
      },
    ],
    mapPosition: { x: 56.5, y: 78.5, region: '南山经' }, // G86:三经区带(丹穴 70,80 之西)锯齿高档;三轮实测(初摆 57/62.5,81 与青丘标签 1440 档相撞收敛至此)
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G86:南次三经第二山(B1 三经档 L02×B2 第74行;郭注 6 条存档;疑18 异文)。
    id: 'loc-daoguo',
    canonicalName: '祷过之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次三经',
    sourceOrder: 2,
    previousLocationId: 'loc-tianyu',
    nextLocationId: 'loc-danxue',
    sourceDirection: '东',
    sourceDistance: '五百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: "东五百里，曰祷过之山，其上多金玉，其下多犀、兕，多象。有鸟焉，其状如鵁，而白首、三足、人面，其名曰瞿如，其鸣自号也。泿水出焉，而南流注于海。其中有虎蛟，其状鱼身而蛇尾，其音如鸳鸯，食者不肿，可以已痔。",
        chapter: '南山经',
        section: '南次三经第二山',
        guoPuNotes: [
          { attach: '犀、兕', text: '犀似水牛。猪頭痺腳，腳似象有三蹄。大腹黑色三角，一在頂上，一在額上，一在鼻上。在鼻上者小而不墮，食角也。好噉棘，口中常灑血沫。兕亦似水牛，青色一角，重三千斤' },
          { attach: '多象', text: '象，獸之最大者。長鼻。大者牙長一丈。性妬，不畜淫子' },
          { attach: '其狀如鵁', text: '鵁似鳧而小腳近尾。音骹箭之骹' },
          { attach: '其名曰瞿如', text: '音劬' },
          { attach: '泿水出焉', text: '音銀' },
          { attach: '其中有虎蛟', text: '蛟似蛇，四足，龍屬' },],
        sourceEdition: '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)、维基文库四库本郭璞注(B2)、arteducation.com.tw 繁体排印本与袁珂《山海经校注》本(殆知阁)四源对读逐字一致(G86);arteducation「南次三山」称谓差异沿 G85 定性(系统性排印习惯)',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText: "「白首」:底本B1页面自带异文标注「白首一作「手」」;底本B2四库本同记{{另|首|手}}(存档第 74 行)。两源正文均作「首」。本站从两源正文用字「首」,异文登记疑18。",
        verificationNote: "2026-10-05 建站核验(G86):四源正文逐字一致(B1 三经档 L02/B2 存档第 74 行/arteducation bookv_1 页/袁本殆知阁档;泛/汎、勃/渤等异形白名单对读);上屏为简体逐字转换(東→东/禱→祷/過→过/狀→状/號→号/鴛鴦→鸳鸯/腫→肿/發→发/無→无/遺→遗/凱→凯,对照表见 EDITION_AUDIT.md 三之补13),注文保持繁体未转简。山无词条,郭注存档 citations 不上屏词条页(G71 先例设计内)。",
        verifiedAt: '2026-10-05',
      },
    ],
    mapPosition: { x: 63, y: 78, region: '南山经' }, // G86:三经区带锯齿带北移(与青丘 58,84 垂直距拉开,1440 档实测裁决)
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    id: 'loc-danxue',
    canonicalName: '丹穴之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次三经',
    sourceOrder: 3,
    previousLocationId: 'loc-daoguo', // G86:三经链补全
    nextLocationId: 'loc-fashuang',
    sourceDirection: '又东',
    sourceDistance: '五百里',
    relatedEntityIds: ['ent-fenghuang'],
    citations: [
      {
        originalText: '又东五百里，曰丹穴之山，其上多金玉。丹水出焉，而南流注于渤海。',
        chapter: '南山经',
        section: '南次三经第三山',
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/nan-shan-jing/zhs',
        verificationNote:
          '2026-09-20 经 ctext 公开文本逐字核对。丹穴之山属南次三经(天虞、祷过之后第三山),不在南次一经;sourceOrder 为所在子经内的次序。',
        verifiedAt: '2026-09-20',
      },
    ],
    mapPosition: { x: 70, y: 80, region: "南山经" },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G86:南次三经第四山(B1 三经档 L04×B2 第78行;疑19 异文;汎/勃 异形对读)。
    id: 'loc-fashuang',
    canonicalName: '发爽之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次三经',
    sourceOrder: 4,
    previousLocationId: 'loc-danxue',
    nextLocationId: 'loc-maoshan',
    sourceDirection: '又东',
    sourceDistance: '五百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: "又东五百里，曰发爽之山，无草木，多水，多白猿。汎水出焉，而南流注于渤海。",
        chapter: '南山经',
        section: '南次三经第四山',
        sourceEdition: '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)、维基文库四库本郭璞注(B2)、arteducation.com.tw 繁体排印本与袁珂《山海经校注》本(殆知阁)四源对读逐字一致(G86);arteducation「南次三山」称谓差异沿 G85 定性(系统性排印习惯)',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText: "「發爽」之「爽」:底本B1页面自带异文标注「發爽一作「喪」」;底本B2四库本同记{{另|爽|喪}}(存档第 78 行)。两源正文均作「爽」。本站从两源正文用字「爽」(上屏转写作「发爽」),异文登记疑19。「汎水」之「汎」为底本原形照录(G30 𨴯 先例;arteducation 作「泛水」「勃海」,泛/汎、勃/渤按异形白名单对读,不采)。",
        verificationNote: "2026-10-05 建站核验(G86):四源正文逐字一致(B1 三经档 L04/B2 存档第 78 行/arteducation bookv_1 页/袁本殆知阁档;泛/汎、勃/渤等异形白名单对读);上屏为简体逐字转换(東→东/禱→祷/過→过/狀→状/號→号/鴛鴦→鸳鸯/腫→肿/發→发/無→无/遺→遗/凱→凯,对照表见 EDITION_AUDIT.md 三之补13),注文保持繁体未转简。山无词条,郭注存档 citations 不上屏词条页(G71 先例设计内)。",
        verifiedAt: '2026-10-05',
      },
    ],
    mapPosition: { x: 77, y: 78.5, region: '南山经' }, // G86:丹穴(70,80)之东锯齿高档,实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G86:南次三经第五山(旄山之尾,B1 三经档 L05×B2 第80行;郭注 2 条存档;疑20 异文;
    // 「至於…之尾」句式——篇末「凡一十四山」计山口径与段数关系见 STATE 呈报)。
    id: 'loc-maoshan',
    canonicalName: '旄山之尾',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次三经',
    sourceOrder: 5,
    previousLocationId: 'loc-fashuang',
    sourceDirection: '又东',
    sourceDistance: '四百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: "又东四百里，至于旄山之尾，其南有谷，曰育遗，多怪鸟，凯风自是出。",
        chapter: '南山经',
        section: '南次三经第五山(旄山之尾)',
        guoPuNotes: [
          { attach: '多怪鳥', text: '《廣雅》曰鵽𪅆、鷦朋、爰居、鴟雀皆怪鳥也' },
          { attach: '凱風自是出', text: '凱風，南風' },],
        sourceEdition: '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)、维基文库四库本郭璞注(B2)、arteducation.com.tw 繁体排印本与袁珂《山海经校注》本(殆知阁)四源对读逐字一致(G86);arteducation「南次三山」称谓差异沿 G85 定性(系统性排印习惯)',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText: "「育遺」之「遺」:底本B1页面自带异文标注「育遺一作「隧」」;底本B2四库本同记{{另|遺|隧}}(存档第 80 行)。两源正文均作「遺」。本站从两源正文用字「遺」(上屏转写作「遗」),异文登记疑20。",
        verificationNote: "2026-10-05 建站核验(G86):四源正文逐字一致(B1 三经档 L05/B2 存档第 80 行/arteducation bookv_1 页/袁本殆知阁档;泛/汎、勃/渤等异形白名单对读);上屏为简体逐字转换(東→东/禱→祷/過→过/狀→状/號→号/鴛鴦→鸳鸯/腫→肿/發→发/無→无/遺→遗/凱→凯,对照表见 EDITION_AUDIT.md 三之补13),注文保持繁体未转简。山无词条,郭注存档 citations 不上屏词条页(G71 先例设计内)。",
        verifiedAt: '2026-10-05',
      },
    ],
    nextLocationId: 'loc-lingqiu', // G88:令丘建站(非山首之前 G87 已转接)
    mapPosition: { x: 82.5, y: 81, region: '南山经' }, // G86:發爽之东锯齿低档,实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G87:南次三经第六山(非山之首,B1 三经档 L06×B2 第82行;「至於…之首」句式;
    // 无郭注无异文)。
    id: 'loc-feishan',
    canonicalName: '非山之首',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次三经',
    sourceOrder: 6,
    previousLocationId: 'loc-maoshan',
    nextLocationId: 'loc-yangjia',
    sourceDirection: '又东',
    sourceDistance: '四百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东四百里，至于非山之首，其上多金玉，无水，其下多蝮虫。',
        chapter: '南山经',
        section: '南次三经第六山(非山之首)',
        sourceEdition: '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)、维基文库四库本郭璞注(B2)、arteducation.com.tw 繁体排印本与袁珂《山海经校注》本(殆知阁)四源对读(G87;B1×B2 逐字一致为录入门槛,第三四源差异见 variantText/疑点表)',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText: '无页面自带异文;四源正文一致(G87)。',
        verificationNote: "2026-10-05 建站核验(G87):四源对读,B1×B2 正文逐字一致(B1 三经档 L06/B2 存档第 82 行)为录入门槛;arteducation/袁本正文同(差异登记疑点);上屏为简体逐字转换(雞→鸡/鮒→鲋/陽→阳 等,对照表见 EDITION_AUDIT.md 三之补14),注文保持繁体未转简。山无词条,郭注存档 citations 不上屏词条页(G71 先例设计内)。",
        verifiedAt: '2026-10-05',
      },
    ],
    mapPosition: { x: 87, y: 77, region: '南山经' }, // G87:三经带续排(初摆 86.5,78 与旄山尾 1440 档 dy 不足实测检出,二轮收敛)
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G87:南次三经第七山(B1 三经档 L07×B2 第84行;无郭注)。
    id: 'loc-yangjia',
    canonicalName: '阳夹之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次三经',
    sourceOrder: 7,
    previousLocationId: 'loc-feishan',
    nextLocationId: 'loc-guanxiang',
    sourceDirection: '又东',
    sourceDistance: '五百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东五百里，曰阳夹之山，无草木，多水。',
        chapter: '南山经',
        section: '南次三经第七山',
        sourceEdition: '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)、维基文库四库本郭璞注(B2)、arteducation.com.tw 繁体排印本与袁珂《山海经校注》本(殆知阁)四源对读(G87;B1×B2 逐字一致为录入门槛,第三四源差异见 variantText/疑点表)',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText: '无页面自带异文;四源正文一致(G87)。',
        verificationNote: "2026-10-05 建站核验(G87):四源对读,B1×B2 正文逐字一致(B1 三经档 L07/B2 存档第 84 行)为录入门槛;arteducation/袁本正文同(差异登记疑点);上屏为简体逐字转换(雞→鸡/鮒→鲋/陽→阳 等,对照表见 EDITION_AUDIT.md 三之补14),注文保持繁体未转简。山无词条,郭注存档 citations 不上屏词条页(G71 先例设计内)。",
        verifiedAt: '2026-10-05',
      },
    ],
    mapPosition: { x: 90, y: 81.5, region: '南山经' }, // G87:三经带锯齿,实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G87:南次三经第八山(B1 三经档 L08×B2 第86行;疑21 异文)。
    id: 'loc-guanxiang',
    canonicalName: '灌湘之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次三经',
    sourceOrder: 8,
    previousLocationId: 'loc-yangjia',
    nextLocationId: 'loc-jishan3',
    sourceDirection: '又东',
    sourceDistance: '五百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东五百里，曰灌湘之山，上多木，无草；多怪鸟，无兽。',
        chapter: '南山经',
        section: '南次三经第八山',
        sourceEdition: '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)、维基文库四库本郭璞注(B2)、arteducation.com.tw 繁体排印本与袁珂《山海经校注》本(殆知阁)四源对读(G87;B1×B2 逐字一致为录入门槛,第三四源差异见 variantText/疑点表)',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText: '「灌湘之山」:底本B1页面自带异文标注「灌湘之山一作「灌湖射之山」」;底本B2四库本同记{{另|灌湘之山|灌湖射之山}}(存档第 86 行)。两源正文均作「灌湘之山」。本站从两源正文,异文登记疑21;arteducation/袁本正文亦作「灌湘之山」。',
        verificationNote: "2026-10-05 建站核验(G87):四源对读,B1×B2 正文逐字一致(B1 三经档 L08/B2 存档第 86 行)为录入门槛;arteducation/袁本正文同(差异登记疑点);上屏为简体逐字转换(雞→鸡/鮒→鲋/陽→阳 等,对照表见 EDITION_AUDIT.md 三之补14),注文保持繁体未转简。山无词条,郭注存档 citations 不上屏词条页(G71 先例设计内)。",
        verifiedAt: '2026-10-05',
      },
    ],
    mapPosition: { x: 93.5, y: 78, region: '南山经' }, // G87:三经带锯齿,实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G87:南次三经第九山(B1 三经档 L09×B2 第88行;郭注 2 条;疑22「黑水山焉」两案)。
    id: 'loc-jishan3', // 一经基山 loc-jishan(G01)先占,三经鸡山加 3 后缀
    canonicalName: '鸡山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次三经',
    sourceOrder: 9,
    previousLocationId: 'loc-guanxiang',
    sourceDirection: '又东',
    sourceDistance: '五百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东五百里，曰鸡山，其上多金，其下多丹雘。黑水山焉，而南流注于海。其中有鱄鱼，其状如鲋而彘毛，其音如豚，见则天下大旱。',
        chapter: '南山经',
        section: '南次三经第九山',
        guoPuNotes: [
          { attach: '丹雘', text: '雘，赤色者，或曰臒，美丹也。見《尚書》，音尺蠖之蠖' },
          { attach: '鱄魚', text: '音團扇之團' },
        ],
        sourceEdition: '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)、维基文库四库本郭璞注(B2)、arteducation.com.tw 繁体排印本与袁珂《山海经校注》本(殆知阁)四源对读(G87;B1×B2 逐字一致为录入门槛,第三四源差异见 variantText/疑点表)',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText: '「黑水山焉」:底本B1/B2 两源正文均作「山焉」(B1 三经档 L09/B2 存档第 88 行);arteducation 排印本与袁珂校注本(郝懿行笺疏系统)均作「黑水出焉」——两案相持,本站从底本 B 系照录「山焉」,登记疑22(「山」疑「出」形讹),不校改。G87 新增。',
        verificationNote: "2026-10-05 建站核验(G87):四源对读,B1×B2 正文逐字一致(B1 三经档 L09/B2 存档第 88 行)为录入门槛;arteducation/袁本正文同(差异登记疑点);上屏为简体逐字转换(雞→鸡/鮒→鲋/陽→阳 等,对照表见 EDITION_AUDIT.md 三之补14),注文保持繁体未转简。山无词条,郭注存档 citations 不上屏词条页(G71 先例设计内)。",
        verifiedAt: '2026-10-05',
      },
    ],
    mapPosition: { x: 97, y: 81.5, region: '南山经' }, // G87:三经带东缘,实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G88:南次三经第十山(B1 三经档 L10×B2 第90行;郭注 2 条;顒郭音「音娬」袁本
    // 引「音娱」形讹照录从音娱)。
    id: 'loc-lingqiu',
    canonicalName: '令丘之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次三经',
    sourceOrder: 10,
    previousLocationId: 'loc-jishan3',
    nextLocationId: 'loc-lunzhe',
    sourceDirection: '又东',
    sourceDistance: '四百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东四百里，曰令丘之山，无草木，多火。其南有谷焉，曰中谷，条风自是出。有鸟焉，其状如枭，人面四目而有耳，其名曰顒，其鸣自号也，见则天下大旱。',
        chapter: '南山经',
        section: '南次三经第十山',
        guoPuNotes: [
          { attach: '條風自是出', text: '東北風爲條風。《記》曰：條風至，出輕繋，督逋畱' },
          { attach: '其名曰顒', text: '音娬' },
        ],
        sourceEdition: '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)、维基文库四库本郭璞注(B2)、arteducation.com.tw 繁体排印本与袁珂《山海经校注》本(殆知阁)四源对读(G88;B1×B2 逐字一致为录入门槛,第三四源差异见 variantText/疑点表)',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText: '「音娬」:B1/B2 郭注均作「音娬」,袁珂校注本引郭注作「音娱」(yú)——「娬」疑「娱」形讹,注文照录「音娬」原形,本站注音层从「音娱」标 yú。梟/裊(arteducation)为异体白名单对。',
        verificationNote: "2026-10-05 建站核验(G88):四源对读,B1×B2 正文逐字一致(B1 三经档 L10/B2 存档第 90 行)为录入门槛;arteducation/袁本正文同(差异登记疑点);上屏为简体逐字转换(雞→鸡/鮒→鲋/梟→枭/侖→仑/飴→饴/餓→饿 等,对照表见 EDITION_AUDIT.md 三之补15),注文保持繁体未转简。山无词条,郭注存档 citations 不上屏词条页(G71 先例设计内)。",
        verifiedAt: '2026-10-05',
      },
    ],
    mapPosition: { x: 60, y: 71.5, region: '南山经' }, // G88:三经带回折第二层(西起),实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G88:南次三经第十一山(B1 三经档 L11×B2 第92行;郭注 2 条;白䓘 袁本独异作
    // 「白咎」=疑23;「穀」底本原形照录)。
    id: 'loc-lunzhe',
    canonicalName: '仑者之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次三经',
    sourceOrder: 11,
    previousLocationId: 'loc-lingqiu',
    nextLocationId: 'loc-yugao',
    sourceDirection: '又东',
    sourceDistance: '三百七十里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东三百七十里，曰仑者之山，其上多金玉，其下多青雘。有木焉，其状如穀而赤理其汗如漆，其味如饴，食者不饥，可以释劳，其名曰白䓘，可以血玉。',
        chapter: '南山经',
        section: '南次三经第十一山',
        guoPuNotes: [
          { attach: '侖者之山', text: '音論說之論，一音倫' },
          { attach: '其名曰白䓘', text: '或作睪蘇。睪蘇一名白䓘，見《廣雅》，音羔' },
        ],
        sourceEdition: '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)、维基文库四库本郭璞注(B2)、arteducation.com.tw 繁体排印本与袁珂《山海经校注》本(殆知阁)四源对读(G88;B1×B2 逐字一致为录入门槛,第三四源差异见 variantText/疑点表)',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText: '「白䓘」:B1/B2 正文均作「䓘」,arteducation 同;袁珂校注本正文作「白咎」(其引郭注「或作睾苏;睾苏一名白咎」)——3:1 袁本独异,本站从 B 系作「䓘」,登记疑23。「禺槀」三写法见疑24。「穀」为底本原形照录(G30 先例;全局 ruby 层若转「谷」将误注「中谷/育遗」之谷,故不转写)。',
        verificationNote: "2026-10-05 建站核验(G88):四源对读,B1×B2 正文逐字一致(B1 三经档 L11/B2 存档第 92 行)为录入门槛;arteducation/袁本正文同(差异登记疑点);上屏为简体逐字转换(雞→鸡/鮒→鲋/梟→枭/侖→仑/飴→饴/餓→饿 等,对照表见 EDITION_AUDIT.md 三之补15),注文保持繁体未转简。山无词条,郭注存档 citations 不上屏词条页(G71 先例设计内)。",
        verifiedAt: '2026-10-05',
      },
    ],
    mapPosition: { x: 66, y: 74, region: '南山经' }, // G88:回折第二层,实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G88:南次三经第十二山(B1 三经档 L12×B2 第94行;禺槀/禺稿/槁 三写法=疑24)。
    id: 'loc-yugao',
    canonicalName: '禺槀之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次三经',
    sourceOrder: 12,
    previousLocationId: 'loc-lunzhe',
    nextLocationId: 'loc-nanyu',
    sourceDirection: '又东',
    sourceDistance: '五百八十里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东五百八十里，曰禺槀之山，多怪兽，多大蛇。',
        chapter: '南山经',
        section: '南次三经第十二山',
        sourceEdition: '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)、维基文库四库本郭璞注(B2)、arteducation.com.tw 繁体排印本与袁珂《山海经校注》本(殆知阁)四源对读(G88;B1×B2 逐字一致为录入门槛,第三四源差异见 variantText/疑点表)',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText: '「禺槀」:B1/B2/arteducation 均作「槀」;袁珂校注本正文作「禺稿」,其珂案引宋本/吴任臣本/毕沅校本作「槁」——槀/稿/槁 三写法并存,本站从 B1×B2「槀」,登记疑24。',
        verificationNote: "2026-10-05 建站核验(G88):四源对读,B1×B2 正文逐字一致(B1 三经档 L12/B2 存档第 94 行)为录入门槛;arteducation/袁本正文同(差异登记疑点);上屏为简体逐字转换(雞→鸡/鮒→鲋/梟→枭/侖→仑/飴→饴/餓→饿 等,对照表见 EDITION_AUDIT.md 三之补15),注文保持繁体未转简。山无词条,郭注存档 citations 不上屏词条页(G71 先例设计内)。",
        verifiedAt: '2026-10-05',
      },
    ],
    mapPosition: { x: 72, y: 71.5, region: '南山经' }, // G88:回折第二层,实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G88:南次三经第十三山(末段,B1 三经档 L13×B2 第96行;郭注 1 条;鶵/雛 异体)。
    id: 'loc-nanyu',
    canonicalName: '南禺之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次三经',
    sourceOrder: 13,
    previousLocationId: 'loc-yugao',
    sourceDirection: '又东',
    sourceDistance: '五百八十里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东五百八十里，曰南禺之山，其上多金玉，其下多水。有穴焉，水出辄入，夏乃出，冬则闭。佐水出焉，而东南流注于海，有凤皇、鹓雏。',
        chapter: '南山经',
        section: '南次三经第十三山(末段)',
        guoPuNotes: [
          { attach: '鳳皇、鵷鶵', text: '亦鳳屬' },
        ],
        sourceEdition: '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)、维基文库四库本郭璞注(B2)、arteducation.com.tw 繁体排印本与袁珂《山海经校注》本(殆知阁)四源对读(G88;B1×B2 逐字一致为录入门槛,第三四源差异见 variantText/疑点表)',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText: '「鵷鶵」:B1/B2 作「鶵」,arteducation 作「雛」——异体白名单对,上屏转写「鹓雏」。无页面自带「一作」异文。',
        verificationNote: "2026-10-05 建站核验(G88):四源对读,B1×B2 正文逐字一致(B1 三经档 L13/B2 存档第 96 行)为录入门槛;arteducation/袁本正文同(差异登记疑点);上屏为简体逐字转换(雞→鸡/鮒→鲋/梟→枭/侖→仑/飴→饴/餓→饿 等,对照表见 EDITION_AUDIT.md 三之补15),注文保持繁体未转简。山无词条,郭注存档 citations 不上屏词条页(G71 先例设计内)。",
        verifiedAt: '2026-10-05',
      },
    ],
    mapPosition: { x: 78, y: 74, region: '南山经' }, // G88:回折第二层东端,实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    id: 'loc-tianshan',
    canonicalName: '天山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-xishan',
    sourceOrder: undefined,
    sourceDirection: '又西',
    sourceDistance: '三百五十里',
    relatedEntityIds: ['ent-dijiang'],
    citations: [
      {
        originalText: '又西三百五十里，曰天山，多金玉，有青雄黄。英水出焉，而西南流注于汤谷。',
        chapter: '西山经',
        section: '天山',
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/xi-shan-jing/zhs',
        verificationNote:
          '2026-09-20 经 ctext 公开文本逐字核对。其前一山为騩山(「又西一百九十里,曰騩山」);所在子经与整链次序待山川轮核定,故 sourceOrder 暂缺。',
        verifiedAt: '2026-09-20',
      },
    ],
    mapPosition: { x: 66, y: 19, region: "西山经" },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    id: 'loc-fajiu',
    canonicalName: '发鸠之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-beishan',
    sourceOrder: undefined,
    sourceDirection: '又北',
    sourceDistance: '二百里',
    relatedEntityIds: ['ent-jingwei'],
    citations: [
      {
        originalText: '又北二百里，曰发鸠之山，其上多柘木。',
        chapter: '北山经',
        section: '发鸠之山',
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/bei-shan-jing/zhs',
        verificationNote:
          '2026-09-20 经 ctext 公开文本逐字核对。《北山经》之首为单狐之山(同日核对);发鸠之山所在子经与次序待山川轮核定,故 sourceOrder 暂缺。',
        verifiedAt: '2026-09-20',
      },
    ],
    mapPosition: { x: 24, y: 12, region: '北山经' },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    id: 'loc-taiqi',
    canonicalName: '泰器之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-xishan',
    sourceOrder: undefined,
    sourceDirection: '又西',
    sourceDistance: '百八十里',
    relatedEntityIds: ['ent-wenyaoyu'],
    citations: [
      {
        originalText: '又西百八十里，曰泰器之山。观水出焉，西流注于流沙。',
        chapter: '西山经',
        section: '泰器之山',
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/xi-shan-jing/zhs',
        verificationNote:
          '2026-09-20 经 ctext 公开文本逐字核对。其前一山为锺山;所在子经与整链次序待山川轮核定。',
        verifiedAt: '2026-09-20',
      },
    ],
    mapPosition: { x: 66.5, y: 32, region: "西山经" },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    id: 'loc-huaijiang',
    canonicalName: '槐江之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-xishan',
    sourceOrder: undefined,
    sourceDirection: '又西',
    sourceDistance: '三百二十里',
    relatedEntityIds: ['ent-yingzhao'],
    citations: [
      {
        originalText: '又西三百二十里，曰槐江之山。丘时之水出焉，而北流注于泑水。',
        chapter: '西山经',
        section: '槐江之山',
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/xi-shan-jing/zhs',
        verificationNote:
          '2026-09-20 经 ctext 公开文本逐字核对。其前一山为泰器之山;由此「西南四百里」即昆仑之丘(同日核对)。',
        verifiedAt: '2026-09-20',
      },
    ],
    mapPosition: { x: 61.5, y: 24.5, region: "西山经" },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    id: 'loc-kunlun',
    canonicalName: '昆仑之丘',
    aliases: ['帝之下都'],
    type: 'mountain',
    chapterId: 'ch-xishan',
    sourceOrder: undefined,
    sourceDirection: '西南',
    sourceDistance: '四百里',
    relatedEntityIds: ['ent-luwu'],
    citations: [
      {
        originalText: '西南四百里，曰昆仑之丘，是实惟帝之下都，神陆吾司之。',
        chapter: '西山经',
        section: '昆仑之丘',
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/xi-shan-jing/zhs',
        verificationNote:
          '2026-09-20 经 ctext 公开文本逐字核对。注意行文为「西南四百里」(自槐江之山而至),非「又西」;「帝之下都」取旧注通识并已标注。',
        verifiedAt: '2026-09-20',
      },
    ],
    mapPosition: { x: 53.5, y: 18.5, region: "西山经" },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    id: 'loc-zhongshan-sh',
    canonicalName: '锺山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-haiwai-bei',
    sourceOrder: undefined,
    sourceDirection: undefined,
    sourceDistance: undefined,
    relatedEntityIds: ['ent-zhuyin'],
    citations: [
      {
        originalText:
          '锺山之神，名曰烛阴，视为昼，暝为夜，吹为冬，呼为夏，不饮，不食，不息，息为风，身长千里。在无𦜹之东。其为物，人面蛇身，赤色，居锺山下。',
        chapter: '海外北经',
        section: '锺山',
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/hai-wai-bei-jing/zhs',
        verificationNote:
          '2026-09-20 经 ctext 公开文本逐字核对。底本用字「锺」(非钟/鍾)、「暝」照录;与西山经之锺山是否一山,属考证问题,本站暂分立两条、互不合并。',
        verifiedAt: '2026-09-20',
      },
    ],
    mapPosition: { x: 40, y: 8, region: '海外北经' },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    id: 'loc-xionglitu',
    canonicalName: '凶犁土丘',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-dahuang-dong',
    sourceOrder: undefined,
    sourceDirection: '大荒东北隅中',
    sourceDistance: undefined,
    relatedEntityIds: ['ent-yinglong'],
    citations: [
      {
        originalText: '大荒东北隅中，有山名曰凶犁土丘。',
        chapter: '大荒东经',
        section: '凶犁土丘',
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/da-huang-dong-jing/zhs',
        verificationNote: '2026-09-20 经 ctext 公开文本逐字核对。',
        verifiedAt: '2026-09-20',
      },
    ],
    mapPosition: { x: 85, y: 6, region: '大荒东经' },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    id: 'loc-liubo',
    canonicalName: '流波山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-dahuang-dong',
    sourceOrder: undefined,
    sourceDirection: '东海中',
    sourceDistance: '入海七千里',
    relatedEntityIds: ['ent-kui'],
    citations: [
      {
        originalText: '东海中有流波山，入海七千里。',
        chapter: '大荒东经',
        section: '流波山',
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/da-huang-dong-jing/zhs',
        verificationNote: '2026-09-20 经 ctext 公开文本逐字核对。',
        verifiedAt: '2026-09-20',
      },
    ],
    mapPosition: { x: 92, y: 50, region: '大荒东经' },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G28:南次二经第一山。底本A(ctext)2026-10-02 反爬不可达,经底本B1(中文维基文库
    // 页面)×B2(四库本郭璞注)两源逐字一致后录入;用字简体转换表与疑点挂账见
    // EDITION_AUDIT.md 三之补5、EDITION_EVIDENCE/DRAFT-nanci2-workfile-20261002.md。
    id: 'loc-guishan',
    canonicalName: '柜山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次二经',
    sourceOrder: 1,
    sourceDirection: undefined,
    sourceDistance: undefined,
    nextLocationId: 'loc-changyou',
    relatedEntityIds: [],
    citations: [
      {
        originalText:
          '南次二经之首，曰柜山，西临流黄，北望诸毗，东望长右。英水出焉，西南流注于赤水，其中多白玉，多丹粟。有兽焉，其状如豚，有距，其音如狗吠，其名曰狸力，见则其县多土功。有鸟焉，其状如鸱而人手。其音如痹，其名曰鴸，名自号也，见则其县多放士。',
        chapter: '南山经',
        section: '南次二经第一山',
        guoPuNotes: [
          {
            attach: '柜山',
            text: '音矩',
          },
          {
            attach: '西临流黄，北望诸毗，东望长右',
            text: '皆山名',
          },
          {
            attach: '多白玉',
            text: '尸子曰：水方折者有玉，貢折者有珠',
          },
          {
            attach: '其状如鸱而人手',
            text: '其腳如人手，鴟音處脂反',
          },
          {
            attach: '其音如痹',
            text: '未詳',
          },
          {
            attach: '其名曰鴸',
            text: '音株',
          },
        ],
        sourceEdition:
          '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)与维基文库四库本郭璞注(B2)两源逐字核对;底本A(ctext.org)2026-10-02 反爬不可达,恢复后回核',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText:
          '「放士」之「放」:底本B1页面自带异文标注「放一作效」,底本B2四库本郭璞注同记此异文(放/效),两源正文均作「放」。本站从B1正文用字「放」并标注;底本A待回核。',
        verificationNote:
          '2026-10-02 建站核验(G28):底本B1(中文维基文库《山海經/南山經》,自带郭注夹注)与底本B2(维基文库四库本郭璞注,存档 EDITION_EVIDENCE/wikisource-nanshan1-guopu-20261002.txt 第34行)净化正文逐字一致。上屏为简体逐字转换(仅繁简对应,无异文性改字;逐字对照表见 EDITION_AUDIT.md 三之补5);篇名《》书名号为底本B页面所加,体例从底本A(一经正文无书名号)去《》录正文。底本A(ctext zhs)当日实测不可达(反爬拦截页),A×B 回核挂账(DRAFT-nanci2 疑点清单)。郭璞注「尸子曰:水方折者有玉,貢折者有珠」之「貢」疑为「員」形讹,注文照录未改;注「細丹砂如」文意未足疑有脱文,不上屏,存档可查。',
        verifiedAt: '2026-10-02',
      },
    ],
    mapPosition: { x: 14, y: 86, region: '南山经' },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G28:南次二经第二山,兽「长右」因山得名(郭注)。核验与挂账同 loc-guishan。
    id: 'loc-changyou',
    canonicalName: '长右之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次二经',
    sourceOrder: 2,
    previousLocationId: 'loc-guishan',
    nextLocationId: 'loc-yaoguang',
    sourceDirection: '东南',
    sourceDistance: '四百五十里',
    relatedEntityIds: ['ent-changyou'],
    citations: [
      {
        originalText: '东南四百五十里曰长右之山，无草木，多水。',
        chapter: '南山经',
        section: '南次二经第二山',
        sourceEdition:
          '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)与维基文库四库本郭璞注(B2)两源逐字核对;底本A(ctext.org)2026-10-02 反爬不可达,恢复后回核',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText:
          '「东南四百五十里」无「又」字:底本B1/B2均作「東南四百五十里曰長右之山」,与南次一经「又东……」体例不同,两源一致,照录不补;有无「又」待底本A回核(DRAFT-nanci2 疑点3)。',
        verificationNote:
          '2026-10-02 建站核验(G28):底本B1与底本B2(存档 EDITION_EVIDENCE/wikisource-nanshan1-guopu-20261002.txt 第36行)净化正文逐字一致;上屏简体逐字转换(对照表见 EDITION_AUDIT.md 三之补5)。底本A(ctext zhs)当日实测不可达(反爬拦截页),A×B 回核挂账。兽「长右」段另立引文,见 ent-changyou。',
        verifiedAt: '2026-10-02',
      },
    ],
    mapPosition: { x: 24, y: 87.5, region: '南山经' },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G29:南次二经第三山。兽「猾褢」另立词条(ent-huahuai)。核验路径同 loc-guishan:
    // 底本A(ctext)2026-10-02 复测仍反爬不可达,经底本B1(维基文库页面存档 L03)×
    // B2(四库本郭璞注,存档第38行)两源净化正文逐字一致后录入。
    id: 'loc-yaoguang',
    canonicalName: '尧光之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次二经',
    sourceOrder: 3,
    previousLocationId: 'loc-changyou',
    nextLocationId: 'loc-yushan',
    sourceDirection: '又东',
    sourceDistance: '三百四十里',
    relatedEntityIds: ['ent-huahuai'],
    citations: [
      {
        originalText: '又东三百四十里，曰尧光之山，其阳多玉，其阴多金。',
        chapter: '南山经',
        section: '南次二经第三山',
        sourceEdition:
          '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)与维基文库四库本郭璞注(B2)两源逐字核对;底本A(ctext.org)2026-10-02 复测反爬不可达,恢复后回核',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        verificationNote:
          '2026-10-02 建站核验(G29):底本B1(维基文库页面,存档 EDITION_EVIDENCE/wikisource-nanshan1-b1-20261002.txt 第L03行)与底本B2(四库本郭璞注,存档 wikisource-nanshan1-guopu-20261002.txt 第38行)净化正文逐字一致(61字符/汉字51);上屏为简体逐字转换(仅繁简对应,无异文性改字;对照表见 EDITION_AUDIT.md 三之补6)。兽「猾褢」句另立引文,见 ent-huahuai。底本A(ctext zhs)当日复测不可达(反爬拦截页),A×B 回核挂账(DRAFT-nanci2 疑点清单)。',
        verifiedAt: '2026-10-02',
      },
    ],
    mapPosition: { x: 34, y: 86, region: '南山经' },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G29:南次二经第四山。郭注含郭璞自注里距疑点「計此道里不相應,似非也」,
    // 照录上屏(注层),非本站校勘意见;「柷」疑「祝」形讹照录未改(疑点9)。
    id: 'loc-yushan',
    canonicalName: '羽山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次二经',
    sourceOrder: 4,
    previousLocationId: 'loc-yaoguang',
    nextLocationId: 'loc-qufu', // G71:瞿父之山建站,羽山不再直连浮玉
    sourceDirection: '又东',
    sourceDistance: '三百五十里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东三百五十里，曰羽山，其下多水，其上多雨，无草木，多蝮虫。',
        chapter: '南山经',
        section: '南次二经第四山',
        guoPuNotes: [
          {
            attach: '羽山',
            text: '今東海柷其縣西南，有羽山，即鯀所殛處。計此道里不相應，似非也',
          },
          {
            attach: '多蝮虫',
            text: '蚖也。',
          },
        ],
        sourceEdition:
          '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)与维基文库四库本郭璞注(B2)两源逐字核对;底本A(ctext.org)2026-10-02 复测反爬不可达,恢复后回核',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText:
          '郭注「今東海柷其縣西南」之「柷」:底本B1/B2均作「柷」,疑为「祝」形讹(汉代东海郡有祝其县,郭注所指当即祝其县)。注文照录未校改;郭注「計此道里不相應,似非也」系郭璞自注此山道里与实地方位不合,为注文内容本身,照录上屏,非本站校勘意见(DRAFT-nanci2 疑点9)。',
        verificationNote:
          '2026-10-02 建站核验(G29):底本B1(维基文库页面,存档 EDITION_EVIDENCE/wikisource-nanshan1-b1-20261002.txt 第L04行)与底本B2(四库本郭璞注,存档 wikisource-nanshan1-guopu-20261002.txt 第40行)净化正文逐字一致(30字符/汉字24);上屏为简体逐字转换(对照表见 EDITION_AUDIT.md 三之补6),注文保持繁体未转简。底本A(ctext zhs)当日复测不可达(反爬拦截页),A×B 回核挂账。',
        verifiedAt: '2026-10-02',
      },
    ],
    mapPosition: { x: 44, y: 87.5, region: '南山经' },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G71:南次二经第五山(2026-10-04 经底本B1 存档 L05×B2 第42行两源净化正文
    // 逐字一致后录入,底本A回核挂账;郭注仅音注「音劬」一条)。文句极简
    // (「无草木,多金玉」),不立词条。
    id: 'loc-qufu',
    canonicalName: '瞿父之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次二经',
    sourceOrder: 5,
    previousLocationId: 'loc-yushan',
    nextLocationId: 'loc-juyu',
    sourceDirection: '又东',
    sourceDistance: '三百七十里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东三百七十里，曰瞿父之山，无草木，多金玉。',
        chapter: '南山经',
        section: '南次二经第五山',
        guoPuNotes: [
          {
            attach: '瞿父之山',
            text: '音劬',
          },
        ],
        sourceEdition:
          '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)与维基文库四库本郭璞注(B2)两源逐字核对;底本A(ctext.org)2026-10-04 复测反爬不可达,恢复后回核',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        verificationNote:
          '2026-10-04 建站核验(G71):底本B1(维基文库页面,存档 EDITION_EVIDENCE/wikisource-nanshan1-b1-20261002.txt 第L05行)与底本B2(四库本郭璞注,存档 wikisource-nanshan1-guopu-20261002.txt 第42行)净化正文逐字一致;上屏为简体逐字转换(对照表见 EDITION_AUDIT.md 三之补8),注文保持繁体未转简。底本A(ctext zhs)当日复测不可达(反爬拦截页),A×B 回核挂账。',
        verifiedAt: '2026-10-04',
      },
    ],
    mapPosition: { x: 45.8, y: 84.2, region: '南山经' }, // G71:羽山/句余之间下行避让(标签零重叠实测裁决)
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G71:南次二经第六山(核验路径同 loc-qufu:B1 L06×B2 第44行)。
    // 「餘」简体转写作「余」(一对多,入 AUDIT 三之补8 转写表)。
    id: 'loc-juyu',
    canonicalName: '句余之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次二经',
    sourceOrder: 6,
    previousLocationId: 'loc-qufu',
    nextLocationId: 'loc-fuyu',
    sourceDirection: '又东',
    sourceDistance: '四百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东四百里，曰句余之山，无草木，多金玉。',
        chapter: '南山经',
        section: '南次二经第六山',
        guoPuNotes: [
          {
            attach: '句餘之山',
            text: '今在會稽餘姚縣南，章句縣北，故此二縣因此爲名云。見《張氏地理志》',
          },
        ],
        sourceEdition:
          '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)与维基文库四库本郭璞注(B2)两源逐字核对;底本A(ctext.org)2026-10-04 复测反爬不可达,恢复后回核',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        verificationNote:
          '2026-10-04 建站核验(G71):底本B1(存档 L06行)与底本B2(存档 第44行)净化正文逐字一致;上屏为简体逐字转换(「餘」→「余」一对多,对照表见 EDITION_AUDIT.md 三之补8),注文保持繁体未转简。底本A(ctext zhs)当日复测不可达(反爬拦截页),A×B 回核挂账。',
        verifiedAt: '2026-10-04',
      },
    ],
    mapPosition: { x: 49.5, y: 87.6, region: '南山经' }, // G71:锯齿上行(零重叠实测裁决)
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G30:南次二经第七山(第五/六山瞿父、句余 G71 已补录,链路经二山相连)。
    // 兽「彘」另立词条(ent-zhi)。核验路径同 loc-guishan:底本A(ctext)2026-10-02
    // 复测仍反爬不可达,经底本B1(存档 L07)×B2(存档第46行)两源净化正文逐字一致后录入。
    id: 'loc-fuyu',
    canonicalName: '浮玉之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次二经',
    sourceOrder: 7,
    previousLocationId: 'loc-juyu', // G71:瞿父/句余插站,羽山直连改经二山
    nextLocationId: 'loc-chengshan',
    sourceDirection: '又东',
    sourceDistance: '五百里',
    relatedEntityIds: ['ent-zhi'],
    citations: [
      {
        originalText:
          '又东五百里，曰浮玉之山，北望具区，东望诸毗。有兽焉，其状如虎而牛尾，其音如吠犬，其名曰彘，是食人。苕水出于其阴，北流注于具区。其中多鮆鱼。',
        chapter: '南山经',
        section: '南次二经第七山',
        guoPuNotes: [
          {
            attach: '北望具区',
            text: '具區，今吳縣西南太湖也。《尚書》謂之震澤',
          },
          {
            attach: '东望诸毗',
            text: '水名',
          },
          {
            attach: '其中多鮆鱼',
            text: '鮆魚，狹薄而長頭。大者尺餘，太湖中今饒之。一名刀魚，音祚啓反',
          },
        ],
        sourceEdition:
          '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)与维基文库四库本郭璞注(B2)两源逐字核对;底本A(ctext.org)2026-10-02 复测反爬不可达,恢复后回核',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        verificationNote:
          '2026-10-02 建站核验(G30):底本B1(维基文库页面,存档 EDITION_EVIDENCE/wikisource-nanshan1-b1-20261002.txt 第L07行)与底本B2(四库本郭璞注,存档 wikisource-nanshan1-guopu-20261002.txt 第46行)净化正文逐字一致(断言脚本实测);上屏为简体逐字转换(仅繁简对应,无异文性改字;对照表见 EDITION_AUDIT.md 三之补7),注文保持繁体未转简。兽「彘」句另立引文,见 ent-zhi。底本A(ctext zhs)当日复测不可达(反爬拦截页),A×B 回核挂账(DRAFT-nanci2 疑点清单)。',
        verifiedAt: '2026-10-02',
      },
    ],
    mapPosition: { x: 57.2, y: 89.5, region: '南山经' }, // G71:二经尾列下移避让一经尾部青丘/箕尾(坐标经两轮实测标定)
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G30:南次二经第八山。水名「虖勺」两处底本自带异文(勺一作多/一作流注于西,
    // 两源同记)照录 variantText(疑点10/11);「𨴯」「雘」等生僻字 GLOSSARY 注音。
    id: 'loc-chengshan',
    canonicalName: '成山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次二经',
    sourceOrder: 8,
    previousLocationId: 'loc-fuyu',
    nextLocationId: 'loc-kuaiji', // G71:会稽之山建站
    sourceDirection: '又东',
    sourceDistance: '五百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText:
          '又东五百里，曰成山，四方而三坛，其上多金玉，其下多青雘。𨴯水出焉，而南流注于虖勺，其中多黄金。',
        chapter: '南山经',
        section: '南次二经第八山',
        guoPuNotes: [
          {
            attach: '四方而三坛',
            text: '形如人築，壇相累也。成亦重耳',
          },
          {
            attach: '𨴯水出焉',
            text: '音涿',
          },
          {
            attach: '虖勺',
            text: '虖，音呼。',
          },
          {
            attach: '其中多黄金',
            text: '今永昌郡，水出金如糠在沙中。尸子曰：清水出黃金、玉英',
          },
        ],
        sourceEdition:
          '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)与维基文库四库本郭璞注(B2)两源逐字核对;底本A(ctext.org)2026-10-02 复测反爬不可达,恢复后回核',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText:
          '两处底本自带异文,两源同记,照录不裁决:①水名「虖勺」之「勺」——底本B1页面注记「勺一作多」,底本B2四库本以{{另|勺|多}}模板同记此异文,两源正文均作「勺」,本站从「勺」并标注;②「南流注于」下——两源均夹注「一作流注于西」,另一版本于水名前多一「西」字。均待底本A回核(DRAFT-nanci2 疑点10/11)。',
        verificationNote:
          '2026-10-02 建站核验(G30):底本B1(维基文库页面,存档 EDITION_EVIDENCE/wikisource-nanshan1-b1-20261002.txt 第L08行,剥〈〉夹注与「一作「多」」页面注记)与底本B2(四库本郭璞注,存档 wikisource-nanshan1-guopu-20261002.txt 第48行,剥{{*|}}夹注、{{另|}}模板取正字)净化正文逐字一致(断言脚本实测);上屏为简体逐字转换(对照表见 EDITION_AUDIT.md 三之补7),注文保持繁体未转简。底本A(ctext zhs)当日复测不可达(反爬拦截页),A×B 回核挂账。',
        verifiedAt: '2026-10-02',
      },
    ],
    mapPosition: { x: 62.4, y: 89.5, region: '南山经' }, // G71:二经尾列下移(同上)
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G71:南次二经第九山(2026-10-04 经底本B1 存档 L09×B2 第50行两源净化正文
    // 逐字一致后录入,底本A回核挂账)。郭注三条(禹冢及井/砆石/音鵙);
    // 底本自带异文「勺一作多」登记疑13(variants),正文从两源共用作「勺」。
    id: 'loc-kuaiji',
    canonicalName: '会稽之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次二经',
    sourceOrder: 9,
    previousLocationId: 'loc-chengshan',
    nextLocationId: 'loc-yishan', // G72:夷山建站
    sourceDirection: '又东',
    sourceDistance: '五百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东五百里，曰会稽之山，四方，其上多金玉，其下多砆石。勺水出焉，而南流注于湨。',
        chapter: '南山经',
        section: '南次二经第九山',
        guoPuNotes: [
          {
            attach: '會稽之山',
            text: '今在會稽郡山陰縣南，上有禹冢及井',
          },
          {
            attach: '其下多砆石',
            text: '砆，武大石，似玉，今長沙臨湘出之。赤地白文，色蘢葱，不分明。',
          },
          {
            attach: '注於湨',
            text: '音鵙',
          },
        ],
        sourceEdition:
          '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)与维基文库四库本郭璞注(B2)两源逐字核对;底本A(ctext.org)2026-10-04 复测反爬不可达,恢复后回核',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText:
          '「勺水出焉」之「勺」:底本B1页面自带异文标注「勺一作多」,底本B2四库本郭璞注同记{{另|勺|多}};两源正文均作「勺」。本站从两源正文用字「勺」,异文登记疑13;与成山「虖勺一作多」(疑10)为两处独立异文。底本A待回核。',
        verificationNote:
          '2026-10-04 建站核验(G71):底本B1(存档 L09行,剥〈〉夹注与「勺一作「多」」页面注记)与底本B2(存档 第50行,剥{{*|}}与{{另|}}模板)净化正文逐字一致;上屏为简体逐字转换(會→会/於→于,对照表见 EDITION_AUDIT.md 三之补8),注文保持繁体未转简。音注「音鵙」上屏注层;「湨」「砆」入 GLOSSARY 注音。底本A(ctext zhs)当日复测不可达(反爬拦截页),A×B 回核挂账。',
        verifiedAt: '2026-10-04',
      },
    ],
    mapPosition: { x: 69.5, y: 91, region: '南山经' }, // G72:右移避让夷山(两轮实测标定同法)
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G72:南次二经第十山(2026-10-04 经底本B1 存档 L10×B2 第52行两源净化正文
    // 逐字一致后录入,底本A回核挂账;无郭注)。湨水上承会稽「注于湨」。
    id: 'loc-yishan',
    canonicalName: '夷山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次二经',
    sourceOrder: 10,
    previousLocationId: 'loc-kuaiji',
    nextLocationId: 'loc-pugou',
    sourceDirection: '又东',
    sourceDistance: '五百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东五百里，曰夷山。无草木，多沙石，湨水出焉，而南流注于列涂。',
        chapter: '南山经',
        section: '南次二经第十山',
        sourceEdition:
          '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)与维基文库四库本郭璞注(B2)两源逐字核对;底本A(ctext.org)2026-10-04 复测软拦截页(200 但正文零命中),恢复后回核',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        verificationNote:
          '2026-10-04 建站核验(G72):底本B1(存档 L10行)与底本B2(存档 第52行)净化正文逐字一致;上屏为简体逐字转换(塗→涂,对照表见 EDITION_AUDIT.md 三之补9);本山无郭璞注。底本A(ctext zhs)2026-10-04 复测 200 但正文零命中(软拦截),A×B 回核挂账。',
        verifiedAt: '2026-10-04',
      },
    ],
    mapPosition: { x: 75.5, y: 89.5, region: '南山经' }, // G72:尾列续排(实测二轮:75.5 避会稽右缘)
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G72:南次二经第十一山(核验路径同 loc-yishan:B1 L11×B2 第54行)。
    // 异文「勾一作夕」两源同记,登记疑14;「僕」简体作「仆」。
    id: 'loc-pugou',
    canonicalName: '仆勾之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次二经',
    sourceOrder: 11,
    previousLocationId: 'loc-yishan',
    nextLocationId: 'loc-xianyin', // G85:咸陰建站(闭环第十七山)
    sourceDirection: '又东',
    sourceDistance: '五百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东五百里，曰仆勾之山，其上多金玉，其下多草木，无鸟兽，无水。',
        chapter: '南山经',
        section: '南次二经第十一山',
        sourceEdition:
          '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)与维基文库四库本郭璞注(B2)两源逐字核对;底本A(ctext.org)2026-10-04 复测软拦截页(200 但正文零命中),恢复后回核',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText:
          '「僕勾」之「勾」:底本B1页面自带异文标注「僕勾一作「夕」」;底本B2四库本郭璞注同记{{另|勾|夕}}(存档第 54 行)。两源正文均作「勾」。本站从两源正文用字「勾」,异文登记疑14。底本A待回核。',
        verificationNote:
          '2026-10-04 建站核验(G72):底本B1(存档 L11行)与底本B2(存档 第54行)净化正文逐字一致;上屏为简体逐字转换(僕→仆/鳥獸→鸟兽,对照表见 EDITION_AUDIT.md 三之补9)。底本A(ctext zhs)2026-10-04 复测软拦截页,A×B 回核挂账。',
        verifiedAt: '2026-10-04',
      },
    ],
    mapPosition: { x: 77, y: 92.6, region: '南山经' }, // G72:尾列末位(y 三档错行,实测裁决)
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G85:南次二经第十二山(2026-10-05 四源对读后录入:B1 存档 L12×B2 第56行×
    // arteducation 排印本×袁珂校注本,四源全作「五百里」;维基文库页面修订史核查
    // 2026-02-21 后零编辑,确证 G72「B1 四百里」为当时误记,勘误见疑15 与
    // EDITION_AUDIT 三之补12)。无郭注(B2 该行无注)。
    id: 'loc-xianyin',
    canonicalName: '咸阴之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次二经',
    sourceOrder: 12,
    previousLocationId: 'loc-pugou',
    nextLocationId: 'loc-xunshan',
    sourceDirection: '又东',
    sourceDistance: '五百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东五百里，曰咸阴之山，无草木，无水。',
        chapter: '南山经',
        section: '南次二经第十二山',
        sourceEdition:
          '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)、维基文库四库本郭璞注(B2)、arteducation.com.tw 繁体排印本与袁珂《山海经校注》本(殆知阁)四源对读逐字一致(G85);勘误史见 variantText 与疑15',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText:
          '里距数字勘误记录(疑15,G85 定谳):G72(2026-10-03)曾记「B1 四百里/B2 五百里两源互异」并悬置;G85 四源对读——B1 存档(2026-10-02 抓取)L12、B2 第 56 行、arteducation 排印本、袁珂校注本全作「又东五百里」,且维基文库页面修订史(API 实查)显示 2026-02-21 后零编辑——G72「四百里」系当时误读误记(「四百」与「五百」等字长,字节对账不可见,当时未存档页面快照)。本站从四源一致作「五百里」,疑15 转勘误记录存档。',
        verificationNote:
          '2026-10-05 建站核验(G85):四源正文逐字一致(B1 存档 L12 行/B2 存档第 56 行/arteducation bookv_1 页/袁本殆知阁档;「鹹/咸」为异形白名单对);上屏为简体逐字转换(東→东/陰→阴/無→无,对照见 EDITION_AUDIT.md 三之补12)。段无郭注(B2 该行无注)。',
        verifiedAt: '2026-10-05',
      },
    ],
    mapPosition: { x: 78, y: 95.8, region: '南山经' }, // G85:仆勾(77,92.6)下方第二档拉开垂直距(中插方案与仆勾/洵山标签双撞实测检出,二轮实测裁决)
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G73:南次二经第十二山(2026-10-04 经底本B1 存档 L13×B2 第58行两源净化正文
    // 逐字一致后录入,底本A回核挂账)。异文「洵一作旬」两源同记=疑16。
    // 兽「䍺」句照录(词条候选留 G75,relatedEntityIds 暂缺如实);郭注 5 条上屏。
    id: 'loc-xunshan',
    canonicalName: '洵山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次二经',
    sourceOrder: 13,
    previousLocationId: 'loc-xianyin',
    nextLocationId: 'loc-hushao',
    sourceDirection: '又东',
    sourceDistance: '四百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东四百里，曰洵山，其阳多金，其阴多玉。有兽焉，其状如羊而无口，不可杀也，其名曰䍺。洵水出焉，而南流注于阏之泽，其中多芘蠃。',
        chapter: '南山经',
        section: '南次二经第十三山',
        guoPuNotes: [
          {
            attach: '不可杀也',
            text: '稟氣自然',
          },
          {
            attach: '其名曰䍺',
            text: '音還，或音患',
          },
          {
            attach: '洵水出焉',
            text: '音詢',
          },
          {
            attach: '閼之澤',
            text: '音遏',
          },
          {
            attach: '芘蠃',
            text: '紫色螺也',
          },
        ],
        sourceEdition:
          '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)与维基文库四库本郭璞注(B2)两源逐字核对;底本A(ctext.org)2026-10-04 复测软拦截页(200 但正文零命中),恢复后回核',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText:
          '「洵山」之「洵」:底本B1页面自带异文标注「洵一作「旬」山」;底本B2四库本郭璞注同记{{另|洵|旬}}(存档第 58 行)。两源正文均作「洵」。本站从两源正文用字「洵」,异文登记疑16。底本A待回核。',
        verificationNote:
          '2026-10-04 建站核验(G73):底本B1(存档 L13行)与底本B2(存档 第58行)净化正文逐字一致;上屏为简体逐字转换(東→东/無→无/狀→状/陰→阴/殺→杀/閼→阏/澤→泽,对照表见 EDITION_AUDIT.md 三之补10),注文保持繁体未转简。兽「䍺」句照录,词条候选留 G75。底本A(ctext zhs)2026-10-04 复测软拦截页,A×B 回核挂账。',
        verifiedAt: '2026-10-04',
      },
    ],
    mapPosition: { x: 81.5, y: 89.5, region: '南山经' }, // G73:尾列续排(线性标定预解+实测裁决)
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G73:南次二经第十三山(核验路径同 loc-xunshan:B1 L14×B2 第60行)。
    // 郭注 3 条(梓枏/荊杞/滂水)上屏注层;「虖」GLOSSARY 已收(hū)。
    id: 'loc-hushao',
    canonicalName: '虖勺之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次二经',
    sourceOrder: 14,
    previousLocationId: 'loc-xunshan',
    nextLocationId: 'loc-quwu', // G74:區吳之山建站
    sourceDirection: '又东',
    sourceDistance: '四百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东四百里，曰虖勺之山，其上多梓枏，其下多荆杞。滂水出焉，而东流注于海。',
        chapter: '南山经',
        section: '南次二经第十四山',
        guoPuNotes: [
          {
            attach: '梓枏',
            text: '梓，山楸也。枏，大木葉，似桑，今作楠，音南。《爾雅》以爲柟',
          },
          {
            attach: '荊杞',
            text: '杞，枸杞也，子赤',
          },
          {
            attach: '滂水出焉',
            text: '音滂沱之滂',
          },
        ],
        sourceEdition:
          '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)与维基文库四库本郭璞注(B2)两源逐字核对;底本A(ctext.org)2026-10-04 复测软拦截页(200 但正文零命中),恢复后回核',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        verificationNote:
          '2026-10-04 建站核验(G73):底本B1(存档 L14行)与底本B2(存档 第60行)净化正文逐字一致;上屏为简体逐字转换(東→东/荊→荆,对照表见 EDITION_AUDIT.md 三之补10),注文保持繁体未转简。「虖」字 GLOSSARY 已收(hū)。底本A(ctext zhs)2026-10-04 复测软拦截页,A×B 回核挂账。',
        verifiedAt: '2026-10-04',
      },
    ],
    mapPosition: { x: 86, y: 91, region: '南山经' }, // G73:尾列续排(实测裁决)
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G74:南次二经第十四山(2026-10-04 经底本B1 存档 L15×B2 第62行两源净化正文
    // 逐字一致后录入,底本A回核挂账;无郭注)。
    id: 'loc-quwu',
    canonicalName: '区吴之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次二经',
    sourceOrder: 15,
    previousLocationId: 'loc-hushao',
    nextLocationId: 'loc-luwu',
    sourceDirection: '又东',
    sourceDistance: '五百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东五百里，曰区吴之山，无草木，多沙石。鹿水出焉，而南流注于滂水。',
        chapter: '南山经',
        section: '南次二经第十五山',
        sourceEdition:
          '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)与维基文库四库本郭璞注(B2)两源逐字核对;底本A(ctext.org)2026-10-04 复测软拦截页(200 但正文零命中),恢复后回核',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        verificationNote:
          '2026-10-04 建站核验(G74):底本B1(存档 L15行)与底本B2(存档 第62行)净化正文逐字一致;上屏为简体逐字转换(東→东/無→无/區→区,对照表见 EDITION_AUDIT.md 三之补11);本山无郭璞注。底本A(ctext zhs)2026-10-04 复测软拦截页,A×B 回核挂账。',
        verifiedAt: '2026-10-04',
      },
    ],
    mapPosition: { x: 89, y: 94.2, region: '南山经' }, // G74:下移一行避虖勺(实测一轮收敛)
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G74:南次二经第十五山(核验路径同 loc-quwu:B1 L16×B2 第64行)。
    // 异文「蠱一作纂」两源同记=疑17;兽「蠱雕」句照录(词条候选 G75,
    // 同源分册 SVG「南山經-蠱雕.svg」已在库——G62 侦察线索)。
    id: 'loc-luwu',
    canonicalName: '鹿吴之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次二经',
    sourceOrder: 16,
    previousLocationId: 'loc-quwu',
    nextLocationId: 'loc-qiwu',
    sourceDirection: '又东',
    sourceDistance: '五百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东五百里，曰鹿吴之山，上无草木，多金石。泽更之水出焉，而南流注于滂水。水有兽焉，名曰蛊雕，其状如雕而有角，其音如婴儿之音，是食人。',
        chapter: '南山经',
        section: '南次二经第十六山',
        sourceEdition:
          '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)与维基文库四库本郭璞注(B2)两源逐字核对;底本A(ctext.org)2026-10-04 复测软拦截页(200 但正文零命中),恢复后回核',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText:
          '「蠱雕」之「蠱」:底本B1页面自带异文标注「蠱一作「纂」雕」;底本B2四库本郭璞注同记{{另|蠱|纂}}(存档第 64 行)。两源正文均作「蠱」。本站从两源正文用字「蠱」(简体「蛊」),异文登记疑17。底本A待回核。',
        verificationNote:
          '2026-10-04 建站核验(G74):底本B1(存档 L16行)与底本B2(存档 第64行)净化正文逐字一致;上屏为简体逐字转换(吳→吴/澤→泽/蠱→蛊/嬰兒→婴儿,对照表见 EDITION_AUDIT.md 三之补11)。兽「蠱雕」句照录,词条候选留 G75。底本A(ctext zhs)2026-10-04 复测软拦截页,A×B 回核挂账。',
        verifiedAt: '2026-10-04',
      },
    ],
    mapPosition: { x: 94, y: 89.5, region: '南山经' }, // G74:尾列(y 三档错行,实测裁决)
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G74:南次二经第十六山/末录(第十七山咸陰之山疑15 悬置)。
    // (核验路径同 loc-quwu:B1 L17×B2 第66行;「東五百里」无「又」字两源同。
    // 郭注 3 条存档。)
    id: 'loc-qiwu',
    canonicalName: '漆吴之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次二经',
    sourceOrder: 17,
    previousLocationId: 'loc-luwu',
    sourceDirection: '东',
    sourceDistance: '五百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '东五百里，曰漆吴之山，无草木，多博石，无玉。处于东海，望丘山，其光载出载入，是惟日次。',
        chapter: '南山经',
        section: '南次二经第十七山(末录;全经十七山录毕,G85 咸陰闭环)',
        guoPuNotes: [
          {
            attach: '无玉',
            text: '可以爲博碁石',
          },
          {
            attach: '其光載出載入',
            text: '神光之所潛耀',
          },
          {
            attach: '是惟日次',
            text: '是日景之所次舍',
          },
        ],
        sourceEdition:
          '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)与维基文库四库本郭璞注(B2)两源逐字核对;底本A(ctext.org)2026-10-04 复测软拦截页(200 但正文零命中),恢复后回核',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        verificationNote:
          '2026-10-04 建站核验(G74):底本B1(存档 L17行,剥〈〉夹注)与底本B2(存档 第66行,剥{{*|}}夹注)净化正文逐字一致;「東五百里」无「又」字两源同(与一经经首同款)。上屏为简体逐字转换(東→东/無→无,对照表见 EDITION_AUDIT.md 三之补11),注文保持繁体存档。底本A(ctext zhs)2026-10-04 复测软拦截页,A×B 回核挂账。',
        verifiedAt: '2026-10-04',
      },
    ],
    mapPosition: { x: 98, y: 92.6, region: '南山经' }, // G74:尾列末位贴东缘(实测裁决)
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G89:西次一经第一山(经首段;B1 西山档 L01×B2 第 14 行;郭注 3 条;羬音針/腊音昔)。
    id: 'loc-qianlai',
    canonicalName: '钱来之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-xishan',
    subClassic: '西次一经',
    sourceOrder: 1,
    nextLocationId: 'loc-songguo',
    sourceDirection: '',
    sourceDistance: '',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '西山经华山之首，曰钱来之山，其上多松，其下多洗石。有兽焉，其状如羊而马尾，名曰羬羊，其脂可以已腊。',
        chapter: '西山经',
        section: '西次一经第一山',
        guoPuNotes: [
          { attach: '洗石', text: '澡洗可以磢體，去垢圿。磢，初兩反' },
          { attach: '羬羊', text: '今大月氐國有大羊如驢，而馬尾。《爾雅》云：羊六尺爲羬，謂此羊也。羬音針' },
          { attach: '已腊', text: '治體皴。腊音昔' },
        ],
        sourceEdition: '通行本(郭璞注系统),据中文维基文库《山海經/西山經》页面文本(B1,2026-10-05 档)、维基文库四库本郭璞注 wikitext(B2,2026-10-05 档)、arteducation.com.tw 西山经页(bookv_2)与袁珂《山海经校注》本(殆知阁)四源对读(G89;B1×B2 逐字一致为录入门槛;arteducation「濩」字缺字显示为囗、【牛乍】/【蟲遺】为缺字拆字展示,均非异文)',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E8%A5%BF%E5%B1%B1%E7%B6%93',
        variantText: '无页面自带异文;四源正文一致(G89)。arteducation「腊」作规范繁体「臘」,与底本古形「腊」为同字异形白名单对。',
        verificationNote: "2026-10-05 建站核验(G89):四源对读,B1×B2 正文逐字一致(B1 西山档 L01/B2 存档第 14 行)为录入门槛;arteducation/袁本正文同;上屏为简体逐字转换(錢→钱/馬→马/華→华/條→条/棗→枣/聾→聋/銅→铜/雞→鸡 等,对照表见 EDITION_AUDIT.md 三之补16),注文保持繁体未转简。山无词条,郭注存档 citations 不上屏词条页(G71 先例设计内)。",
        verifiedAt: '2026-10-05',
      },
    ],
    mapPosition: { x: 30, y: 40, region: '西山经' }, // G89:西次一经带(昆仑等西次三经点 53-66,18-32 之西南空带),实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G89:西次一经第二山(B1 西山档 L02×B2 第 16 行;郭注 2 条;𦢊 代理对原形照录)。
    id: 'loc-songguo',
    canonicalName: '松果之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-xishan',
    subClassic: '西次一经',
    sourceOrder: 2,
    previousLocationId: 'loc-qianlai',
    nextLocationId: 'loc-taihua',
    sourceDirection: '西',
    sourceDistance: '四十五里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '西四十五里，曰松果之山。濩水出焉，北流注于渭，其中多铜。有鸟焉，其名曰䳋渠，其状如山鸡，黑身赤足，可以已𦢊。',
        chapter: '西山经',
        section: '西次一经第二山',
        guoPuNotes: [
          { attach: '䳋渠', text: '䳋，音彤弓之彤' },
          { attach: '已𦢊', text: '謂皮皴起也。音叵駮反' },
        ],
        sourceEdition: '通行本(郭璞注系统),据中文维基文库《山海經/西山經》页面文本(B1,2026-10-05 档)、维基文库四库本郭璞注 wikitext(B2,2026-10-05 档)、arteducation.com.tw 西山经页(bookv_2)与袁珂《山海经校注》本(殆知阁)四源对读(G89;B1×B2 逐字一致为录入门槛;arteducation「濩」字缺字显示为囗、【牛乍】/【蟲遺】为缺字拆字展示,均非异文)',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E8%A5%BF%E5%B1%B1%E7%B6%93',
        variantText: '无页面自带异文;四源正文一致。arteducation「濩」字缺字显示为「囗」(其站字体缺字,非异文);袁本作「濩水」同底本。',
        verificationNote: "2026-10-05 建站核验(G89):四源对读,B1×B2 正文逐字一致(B1 西山档 L02/B2 存档第 16 行)为录入门槛;arteducation/袁本正文同;上屏为简体逐字转换(錢→钱/馬→马/華→华/條→条/棗→枣/聾→聋/銅→铜/雞→鸡 等,对照表见 EDITION_AUDIT.md 三之补16),注文保持繁体未转简。山无词条,郭注存档 citations 不上屏词条页(G71 先例设计内)。",
        verifiedAt: '2026-10-05',
      },
    ],
    mapPosition: { x: 36, y: 42, region: '西山经' }, // G89:西次一经带锯齿,实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G89:西次一经第三山(B1 西山档 L03×B2 第 18 行;郭注 4 条;肥𧔥 代理对)。
    id: 'loc-taihua',
    canonicalName: '太华之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-xishan',
    subClassic: '西次一经',
    sourceOrder: 3,
    previousLocationId: 'loc-songguo',
    nextLocationId: 'loc-xiaohua',
    sourceDirection: '又西',
    sourceDistance: '六十里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又西六十里，曰太华之山，削成而四方，其高五千仞，其广十里，鸟兽莫居。有蛇焉，名曰肥𧔥，六足四翼，见则天下大旱。',
        chapter: '西山经',
        section: '西次一经第三山',
        guoPuNotes: [
          { attach: '太華之山', text: '即西岳華陰山也。今在弘農，華陰縣西南' },
          { attach: '削成而四方', text: '今山形上大下小，峭峻也' },
          { attach: '其廣十里', text: '仞，八尺也。上有明星玉女，持玉漿得上，服之即成仙。道險僻不通，時含神霧云' },
          { attach: '肥𧔥', text: '湯時此蛇見於陽山下。復有肥遺蛇，疑是同名' },
        ],
        sourceEdition: '通行本(郭璞注系统),据中文维基文库《山海經/西山經》页面文本(B1,2026-10-05 档)、维基文库四库本郭璞注 wikitext(B2,2026-10-05 档)、arteducation.com.tw 西山经页(bookv_2)与袁珂《山海经校注》本(殆知阁)四源对读(G89;B1×B2 逐字一致为录入门槛;arteducation「濩」字缺字显示为囗、【牛乍】/【蟲遺】为缺字拆字展示,均非异文)',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E8%A5%BF%E5%B1%B1%E7%B6%93',
        variantText: '「肥𧔥」:B1/B2 原文作「𧔥」,arteducation 缺字拆字显示为「【蟲遺】」(其站字体缺字,非异文);袁本简体域同。郭注「復有肥遺蛇,疑是同名」——本站注音层音从遗(yí)。',
        verificationNote: "2026-10-05 建站核验(G89):四源对读,B1×B2 正文逐字一致(B1 西山档 L03/B2 存档第 18 行)为录入门槛;arteducation/袁本正文同;上屏为简体逐字转换(錢→钱/馬→马/華→华/條→条/棗→枣/聾→聋/銅→铜/雞→鸡 等,对照表见 EDITION_AUDIT.md 三之补16),注文保持繁体未转简。山无词条,郭注存档 citations 不上屏词条页(G71 先例设计内)。",
        verifiedAt: '2026-10-05',
      },
    ],
    mapPosition: { x: 42, y: 40, region: '西山经' }, // G89:西次一带锯齿,实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G89:西次一经第四山(B1 西山档 L04×B2 第 20 行;郭注 6 条;㸲/鷩/㻬琈 郭音)。
    id: 'loc-xiaohua',
    canonicalName: '小华之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-xishan',
    subClassic: '西次一经',
    sourceOrder: 4,
    previousLocationId: 'loc-taihua',
    nextLocationId: 'loc-fuyux',
    sourceDirection: '又西',
    sourceDistance: '八十里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又西八十里，曰小华之山，其木多荆杞，其兽多㸲牛，其阴多磬石，其阳多㻬琈之玉，鸟多赤鷩，可以御火，其草有萆荔，状如乌韭，而生于石上，亦缘木而生，食之已心痛。',
        chapter: '西山经',
        section: '西次一经第四山',
        guoPuNotes: [
          { attach: '小華之山', text: '即少華山' },
          { attach: '㸲牛', text: '今華陽山中多山牛山羊，肉皆千斤，牛即此牛也，音昨' },
          { attach: '磬石', text: '可以爲樂石' },
          { attach: '㻬琈之玉', text: '㻬琈玉，名所未詳也。雩浮兩音' },
          { attach: '赤鷩', text: '赤鷩，山雞之屬。胷腹、洞赤、冠金皆黃頭綠尾，中有赤毛，彩鮮明。音作蔽，或作鱉' },
          { attach: '萆荔', text: '萆荔，香草也。蔽戾兩音' },
        ],
        sourceEdition: '通行本(郭璞注系统),据中文维基文库《山海經/西山經》页面文本(B1,2026-10-05 档)、维基文库四库本郭璞注 wikitext(B2,2026-10-05 档)、arteducation.com.tw 西山经页(bookv_2)与袁珂《山海经校注》本(殆知阁)四源对读(G89;B1×B2 逐字一致为录入门槛;arteducation「濩」字缺字显示为囗、【牛乍】/【蟲遺】为缺字拆字展示,均非异文)',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E8%A5%BF%E5%B1%B1%E7%B6%93',
        variantText: '「㸲牛」:B1/B2 作「㸲」,arteducation 缺字拆字显示「【牛乍】」(非异文);郭注「音昨」。无页面自带「一作」异文。',
        verificationNote: "2026-10-05 建站核验(G89):四源对读,B1×B2 正文逐字一致(B1 西山档 L04/B2 存档第 20 行)为录入门槛;arteducation/袁本正文同;上屏为简体逐字转换(錢→钱/馬→马/華→华/條→条/棗→枣/聾→聋/銅→铜/雞→鸡 等,对照表见 EDITION_AUDIT.md 三之补16),注文保持繁体未转简。山无词条,郭注存档 citations 不上屏词条页(G71 先例设计内)。",
        verifiedAt: '2026-10-05',
      },
    ],
    mapPosition: { x: 48, y: 42, region: '西山经' }, // G89:西次一带锯齿,实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G89:西次一经第五山(B1 西山档 L05×B2 第 22 行;郭注 3 条;鴖音旻;
    // loc-fuyu 为二经浮玉先占,符禺用 loc-fuyux)。
    id: 'loc-fuyux',
    canonicalName: '符禺之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-xishan',
    subClassic: '西次一经',
    sourceOrder: 5,
    previousLocationId: 'loc-xiaohua',
    sourceDirection: '又西',
    sourceDistance: '八十里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又西八十里，曰符禺之山，其阳多铜，其阴多铁。其上有木焉，名曰文茎，其实如枣，可以已聋。其草多条，其状如葵，而赤华黄实，如婴儿舌，食之使人不惑。符禺之水出焉，而北流注于渭。其兽多葱聋，其状如羊而赤鬣。其鸟多鴖，其状如翠而赤喙，可以御火。',
        chapter: '西山经',
        section: '西次一经第五山',
        guoPuNotes: [
          { attach: '鴖', text: '音旻' },
          { attach: '赤喙', text: '翠似燕而紺色也' },
          { attach: '可以禦火', text: '畜之辟火災也' },
        ],
        sourceEdition: '通行本(郭璞注系统),据中文维基文库《山海經/西山經》页面文本(B1,2026-10-05 档)、维基文库四库本郭璞注 wikitext(B2,2026-10-05 档)、arteducation.com.tw 西山经页(bookv_2)与袁珂《山海经校注》本(殆知阁)四源对读(G89;B1×B2 逐字一致为录入门槛;arteducation「濩」字缺字显示为囗、【牛乍】/【蟲遺】为缺字拆字展示,均非异文)',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E8%A5%BF%E5%B1%B1%E7%B6%93',
        variantText: '无页面自带异文;四源正文一致(arteducation「禦」作「御」,异形白名单对)。「赤鬛」之「鬛」为俗字照录(G29 先例,与「鬣」同)。id 说明:loc-fuyu 为南次二经浮玉之山(G30)先占,本山(符禺)加 x 后缀。',
        verificationNote: "2026-10-05 建站核验(G89):四源对读,B1×B2 正文逐字一致(B1 西山档 L05/B2 存档第 22 行)为录入门槛;arteducation/袁本正文同;上屏为简体逐字转换(錢→钱/馬→马/華→华/條→条/棗→枣/聾→聋/銅→铜/雞→鸡 等,对照表见 EDITION_AUDIT.md 三之补16),注文保持繁体未转简。山无词条,郭注存档 citations 不上屏词条页(G71 先例设计内)。",
        verifiedAt: '2026-10-05',
      },
    ],
    mapPosition: { x: 54, y: 44, region: '西山经' }, // G89:西次一带东端,实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G91:西次三经第十山(章莪之山;B2 西山郭注档第 122 行×呈现态重抓×arteducation×
    // 袁本珂案引诸本;段含兽「狰」不立条)。毕方词条(G91)栖居此山。
    id: 'loc-zhangwo',
    canonicalName: '章莪之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-xishan',
    subClassic: '西次三经',
    sourceOrder: 10,
    sourceDirection: '又西',
    sourceDistance: '二百八十里',
    relatedEntityIds: ['ent-bifang'],
    citations: [
      {
        originalText: '又西二百八十里，曰章莪之山，无草木，多瑶碧。所为甚怪。有兽焉，其状如赤豹，五尾一角，其音如击石，其名如狰。有鸟焉，其状如鹤，一足，赤文青质而白喙，名曰毕方，其鸣自叫也，见则其邑有讹火。',
        chapter: '西山经',
        section: '西次三经第十山',
        guoPuNotes: [
          { attach: '瑤碧', text: '碧亦玉屬' },
          { attach: '所為甚怪', text: '多有非常之怪' },
          { attach: '其名如猙', text: '京氏易義曰：音如石相擊，音靜' },
          { attach: '譌火', text: '譌亦妖訛字' },
        ],
        sourceEdition:
          '通行本(郭璞注系统),据维基文库四库本郭璞注西山经档(B2,2026-10-05 第 122 行)×呈现态重抓剥段×arteducation bookv_2×袁珂校注本四源对读(G91);B1 西山档(G83)仅存西次一经首段,本段 B1 侧以呈现态重抓补核(存档比对脚本 dev/round91-compare 输出)',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E8%A5%BF%E5%B1%B1%E7%B6%93',
        variantText: '「名曰畢方」:arteducation 作「畢文」——袁本珂案引诸本皆「毕方」,定性为其站排印误字(G85 框架),不采。「其名如猙」:袁本珂案「宋本、吴宽抄本并作曰狰」,本站从 B 系「如狰」(上屏转写),异文记此。无页面自带「一作」标注。',
        verificationNote:
          '2026-10-05 建站核验(G91):B2 第 122 行剥注后与呈现态重抓段、arteducation、袁本正文逐字一致(artedu「畢文」排印误除外);上屏为简体逐字转换(莪/瑤→瑶/擊→击/猙→狰/鶴→鹤/畢→毕/譌→讹,对照表见 EDITION_AUDIT.md 三之补18),注文保持繁体未转简。段含兽「狰」不立条(G71 先例)。毕方词条栖居此山(ent-bifang)。',
        verifiedAt: '2026-10-05',
      },
    ],
    mapPosition: { x: 90, y: 36, region: '西山经' }, // G91:西次三经带(槐江 61.5,24.5 之东延长线,三危一带走向),实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G92:西次三经第六山(玉山;B2 西山郭注档第 114 行×arteducation×袁本×广注卷02
    // 玉山案语;段含兽「狡」鸟「胜遇」不立条)。西王母词条(G92)栖居此山。
    // id 说明:loc-yushan 为北次三经羽山(G29)先占,玉山加 3 后缀。
    id: 'loc-yushan3',
    canonicalName: '玉山',
    aliases: ['羣玉之山(《穆天子傳》)'],
    type: 'mountain',
    chapterId: 'ch-xishan',
    subClassic: '西次三经',
    sourceOrder: 6,
    sourceDirection: '又西',
    sourceDistance: '三百五十里',
    relatedEntityIds: ['ent-xiwanmu'],
    citations: [
      {
        originalText: '又西三百五十里，曰玉山，是西王母所居也。西王母其状如人，豹尾虎齿而善啸，蓬发戴胜，是司天之厉及五残。有兽焉，其状如犬而豹文，其角如牛，其名曰狡，其音如吠犬，见则其国大穰。有鸟焉，其状如翟而赤，名曰胜遇，是食鱼，其音如录，见则其国大水。',
        chapter: '西山经',
        section: '西次三经第六山',
        guoPuNotes: [
          { attach: '玉山', text: '此山多玉石，因以名云。穆天子傳謂之羣玉之山' },
          { attach: '蓬髮戴勝', text: '蓬頭亂髪，勝玉勝也' },
          { attach: '司天之厲及五殘', text: '主知灾厲五刑殘殺之氣也' },
          { attach: '其角如牛', text: '或作羊' },
        ],
        sourceEdition:
          '通行本(郭璞注系统),据维基文库四库本郭璞注西山经档(B2,2026-10-05 第 114 行)×arteducation bookv_2×袁珂校注本四源对读(G92);B1 侧以呈现态重抓补核(同 G91 体例)',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E8%A5%BF%E5%B1%B1%E7%B6%93',
        variantText: '「又西三百五十里」:arteducation 作「又西北三百五十里」——方位「北」字其站独异(B2/袁本均作「西」),不采记此。段含兽「狡」鸟「胜遇」不立条(G71 先例);狡「其角如牛,或作羊」郭注异文存注层。',
        verificationNote:
          '2026-10-05 建站核验(G92):B2 第 114 行剥注后与 arteducation(除方位独异)、袁本正文逐字一致;上屏为简体逐字转换(穰/翟/錄→录 等,对照表见 EDITION_AUDIT.md 三之补19),注文保持繁体未转简。西王母词条栖居此山(ent-xiwanmu)。',
        verifiedAt: '2026-10-05',
      },
    ],
    mapPosition: { x: 74, y: 22, region: '西山经' }, // G92:西次三经带(天山 66,19 之东),实测裁决
    modernHypotheses: [],
    recordStatus: 'verified',
  },
]

export function getLocation(id: string): Location | undefined {
  return LOCATIONS.find((l) => l.id === id)
}
