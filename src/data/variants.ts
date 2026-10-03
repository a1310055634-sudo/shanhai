/**
 * 异文校勘数据(G35 建)。
 *
 * 三层分工,不混排:
 *  一、独立差异项(差1—差7):两种具名来源用字或文句互异,四栏并录
 *      (来源A / 来源B / 本站现行呈现 / 未决原因),一律照录不裁决。
 *      底本A = ctext.org 公开文本,存档 EDITION_EVIDENCE/ctext-nanci1-20260927.txt;
 *      底本B = 中文维基文库郭璞注本(四庫全書底本),存档
 *      EDITION_EVIDENCE/wikisource-nanshan1-guopu-20261002.txt 与
 *      wikisource-nanshan1-20260927.txt。
 *  二、疑点登记(疑1—疑17):候核疑点与其处理状态,与 GALLERY_SPRINT.md
 *      「二阶内容疑点清单」逐条对应(id 相同)。
 *  三、站内引文异文标注:不自建第三份,页面运行时从 LOCATIONS[].citations[].variantText
 *      派生(单一来源)。
 *
 * 红线:本文件不含新增裁决,不改任何原文;新增事实句一律附存档坐标。
 */

/** 差异项状态:并显不裁决 / 已按底本政策处理 / 文献自身矛盾存疑。 */
export type VariantState = '并显不裁决' | '已处理' | '存疑'

/** 照录所据的存档:'ctext' = 来源 A;'guopu' / 'b1' = 来源 B 两种存档。 */
export type VariantArchive = 'ctext' | 'guopu' | 'b1'

/**
 * 差异项某一栏。quote 为**逐字照录片段**(页面以 data-quote 输出,由
 * dev/round35-browser.mjs 从渲染结果回查存档,要求 100% 命中);
 * 无照录句可言(本站综述、合计、两源一致之判断)时留空 quote,只写 note。
 */
export interface VariantSource {
  quote?: string
  archive?: VariantArchive
  note: string
}

export interface VariantCase {
  id: string
  no: string
  /** 异文主题(用字或文句) */
  subject: string
  /** 所属篇章与位置 */
  where: string
  /** 来源 A */
  sourceA: VariantSource
  /** 来源 B */
  sourceB: VariantSource
  /** 本站现行呈现 */
  display: string
  /** 未决原因 / 处理依据 */
  reason: string
  state: VariantState
  /** 存档证据(可核) */
  evidence: string
}

export const VARIANT_CASES: VariantCase[] = [
  {
    id: 'cha-1',
    no: '差 1',
    subject: '柢 / 祗(南次一经第五山山名用字)',
    where: '南山经·南次一经第五山',
    sourceA: { quote: '东三百里祗山', archive: 'ctext', note: '作「祗」;无「又」无「曰」。' },
    sourceB: {
      quote: '又東三百里柢',
      archive: 'guopu',
      note: '作「柢」;有「又」无「曰」(底本夹注「音蔕」在「柢」「山」二字之间)。',
    },
    display:
      '展示名从底本 B 通行写法「柢山」;该山待核不设正式站,篇末里距表两源分别照录(A「东三百里祗山」/ B「又東三百里柢山」)。',
    reason: '两具名来源用字互异且均为现代转录,双形并显、不裁决孰是孰非;影印本追证留后续。',
    state: '并显不裁决',
    evidence:
      '程序化计数:A 源存档全文「柢」0 次、「祗」1 次(A 源该句作「东三百里祗山，多水，无草木」);B 源存档第 20 行作「又東三百里柢」并有郭璞注「音蔕」(dev/round35-verify.mjs 第 4 节)。',
  },
  {
    id: 'cha-2',
    no: '差 2',
    subject: '柢山段的「又」字有无',
    where: '南山经·南次一经第五山',
    sourceA: { quote: '东三百里祗山', archive: 'ctext', note: '无「又」、无「曰」。' },
    sourceB: { quote: '又東三百里柢', archive: 'guopu', note: '有「又」、无「曰」。' },
    display: '篇末里距表柢(祗)行按两源分别照录,不合并、不补字。',
    reason: '两源均无「曰」,「曰」为后世整理补字,本站不补;「又」字 A 无 B 有,照录并显。',
    state: '并显不裁决',
    evidence: 'A 源存档第 5 段作「东三百里祗山」;B 源存档第 20 行作「又東三百里柢山」。',
  },
  {
    id: 'cha-3',
    no: '差 3',
    subject: '青䨼 / 青雘(矿物颜料名用字)',
    where: '南山经·南次一经青丘之山;南次二经成山',
    sourceA: { quote: '其阴多青䨼', archive: 'ctext', note: '作「䨼」。' },
    sourceB: {
      quote: '其陰多青雘',
      archive: 'guopu',
      note: '作「雘」,底本并有郭璞注「雘，黝屬，音瓠」。',
    },
    display:
      '引文从底本 A 作「青䨼」;青丘之山卡片与词条页以「存在异文」标注并显底本 B 用字与郭注。',
    reason: '两源用字互异,双形并显;音读亦随异文两存(见难字音表「雘」「䨼」两条)。',
    state: '并显不裁决',
    evidence:
      'A 源存档「䨼」1 次、「雘」0 次;A 源该句作「其阳多玉，其阴多青䨼」;B 源存档第 26 行作「其陰多青雘」夹注「雘，黝屬，音瓠」(程序化回查,同上)。',
  },
  {
    id: 'cha-4',
    no: '差 4',
    subject: '堂 / 常(堂庭之山山名用字)',
    where: '南山经·南次一经第二山',
    sourceA: { quote: '又东三百里，曰堂庭之山', archive: 'ctext', note: '作「堂」。' },
    sourceB: {
      quote: '{{另|堂|常}}',
      archive: 'guopu',
      note: '底本 B 于「堂」字处用异文模板另出「常」,页面渲染作「堂一作常」(B1 阅读页无此注记,此异文只见于郭璞注本)。',
    },
    display: '录入「堂庭之山」,并在引文区块 variantText 上屏底本 B 注记「堂一作常」。',
    reason: '非两源冲突,系底本 B 自身注记,已捕获并展示。',
    state: '已处理',
    evidence:
      'A 源存档「堂」1 次、「常」0 次;A 源该句作「又东三百里，曰堂庭之山，多棪木」;B 源存档第 14 行含异文模板{{另|堂|常}}(程序化回查,同上)。',
  },
  {
    id: 'cha-5',
    no: '差 5',
    subject: '柢山、亶爰之山里距数值',
    where: '南山经·南次一经',
    sourceA: { note: '柢(祗)三百里、亶爰四百里(本站依 A 源逐段读取)。' },
    sourceB: { note: '柢三百里、亶爰四百里——两源一致。' },
    display: '里距表分别照录各段句;柢山行两源并录,亶爰行从已核验引文截取。',
    reason: '无来源冲突(影印本追证同柢山,留后续)。',
    state: '已处理',
    evidence: '两源存档对应段落里距数值一致;柢山用字分歧另见差 1、差 2。',
  },
  {
    id: 'cha-6',
    no: '差 6',
    subject: '逐段实列九山与篇末「凡十山」',
    where: '南山经·南次一经篇末',
    sourceA: { quote: '凡十山', archive: 'ctext', note: '逐段实列 9 山(招摇、堂庭、猨翼、杻阳、祗、亶爰、基、青丘、箕尾),篇末却作「凡十山」。' },
    sourceB: { quote: '凡十山，二千九百五十里', archive: 'guopu', note: '同样 9 段,篇末亦作「凡十山」——两源相同。' },
    display: '篇末总述区如实并列「逐段可列九山」与「原文篇末作十山」,标文本存疑。',
    reason:
      '矛盾出自文献本身(脱简/重出/计数口径诸说),千年校勘公案;本站不裁决、不推断第十山名、不为凑数增山。',
    state: '存疑',
    evidence: '两源篇末均作「凡十山,二千九百五十里」;逐段山名与段数一致。',
  },
  {
    id: 'cha-7',
    no: '差 7',
    subject: '篇末里距与逐段里距之和(本站校核)',
    where: '南山经·南次一经篇末',
    sourceA: { note: '逐段相加 = 2700 里——本站依 A 源逐段计算(首山无前置里距),非古籍原文。' },
    sourceB: { quote: '二千九百五十里', archive: 'guopu', note: '篇末原文作「凡十山，二千九百五十里」,两源一致。' },
    display:
      '里距表并示「原文篇末 2950 里」与「本站按逐段相加校核 2700 里」两数,后者明示为本站计算、非古籍原文。',
    reason:
      '差额 250 里恰与一段中型里距相当,但不据此推断存在脱漏山段,也不改动任何数字;若差 6 之「十山」确有一山脱文,其里距或即缺口,文献未明,存疑。',
    state: '存疑',
    evidence: '数值与合计区由里距表运行时从照录句解析(2700 为本站计算结果,已在页面明示)。',
  },
]

/** 疑点状态:照录待续(等底本A回核)/ 已处理 / 照录不裁决。 */
export type DoubtState = '待底本A回核' | '已照录' | '不裁决'

export interface DoubtItem {
  id: string
  topic: string
  evidence: string
  handling: string
  state: DoubtState
}

/** 南次二经疑点(疑1—疑6,G25 工作稿建立;B1×B2 双源已核,底本A 反爬未达)。 */
export const DOUBTS: DoubtItem[] = [
  {
    id: '疑1',
    topic: '鴸句「名自號也」前疑有脱字',
    evidence: '底本 B1/B2 均作「其名曰鴸，〈音株〉名自號也」;「名自號也」三字无主语字样,与同卷他段句式不齐。',
    handling: '不补字;待底本 A 照录后按底本政策处理。',
    state: '待底本A回核',
  },
  {
    id: '疑2',
    topic: '「放」/「效」异文',
    evidence: 'B1 页面注记「放一作效」,B2 用异文模板同记——两源同记一处异文。',
    handling: '候选 variant,待底本 A 核;若 A 作「放」,按差 4 堂/常先例并显 B 注记。',
    state: '待底本A回核',
  },
  {
    id: '疑3',
    topic: '长右段里距句「东南四百五十里」无「又」字',
    evidence: 'B1/B2 一致;南次一经体例多作「又东」,且柜山段末作「东望长右」,方向亦异。',
    handling: '体例差异照录;有无「又」待底本 A 逐字核(参照差 2「又/曰」先例)。',
    state: '待底本A回核',
  },
  {
    id: '疑4',
    topic: '长右段「无草木，多水」',
    evidence: 'B1/B2 一致。',
    handling: '照录;待底本 A 核。不引任何未抓取文本(含整理本异说)入档案。',
    state: '待底本A回核',
  },
  {
    id: '疑5',
    topic: '「縣」字句式三段三样',
    evidence: '柜山「见则其县多土功」/长右「见则郡县大水」/尧光「见则县有大繇」。',
    handling: '照录,不统一,不裁决。',
    state: '不裁决',
  },
  {
    id: '疑6',
    topic: '篇末「凡十七山」与实列山数',
    evidence: 'B1/B2 一致作「凡十七山，七千二百里」;末山名「漆吴之山」。',
    handling:
      '录入进度骨架 = 17 山;已录六山逐段相加 2140 里对篇末 7200 里,缺口如实待续,不预判(差 6/差 7 先例)。',
    state: '待底本A回核',
  },
  {
    id: '疑7',
    topic: '郭注「細丹砂如」文意未足,疑有脱文',
    evidence: 'B2 存档第 34 行「多丹粟。{{*|細丹砂如}}」,注文止于「如」字。',
    handling: '该条注文不上屏(藏拙于注层而非删改);存档可查。',
    state: '不裁决',
  },
  {
    id: '疑8',
    topic: '郭注「貢折者有珠」之「貢」疑为「員」形讹',
    evidence: 'B2 存档第 34 行注引《尸子》「水方折者有玉，貢折者有珠」;通行《尸子》作「員折者有珠」。',
    handling: '注文照录未改;不据他书径改底本用字。',
    state: '不裁决',
  },
  {
    id: '疑9',
    topic: '郭注「柷」疑为「祝」形讹',
    evidence: 'B2 存档第 44 行(羽山段)注文用「柷」字,文意当为「祝」。',
    handling: '注文照录;形讹之疑登记在案,不改底本。',
    state: '不裁决',
  },
  {
    id: '疑10',
    topic: '成山段底本自带异文(其形制句)',
    evidence: '底本 B 页面正文自带异文注记,两源同记。',
    handling: '按 variant 规则照录并显(等同差 4 先例)。',
    state: '已照录',
  },
  {
    id: '疑11',
    topic: '成山段底本自带异文(水流句「一作流注于西」)',
    evidence: 'B2 存档第 48 行「而南流注于{{*|一作流注于西}}虖勺」。',
    handling: '按 variant 规则照录并显。',
    state: '已照录',
  },
  {
    id: '疑12',
    topic: '本站标注读音与郭璞注音注字面不同(禺 / 亶 / 杻 / 雘)',
    evidence:
      '郭璞注直音:禺「禺字音遇」(第 12 行)、亶「亶音蟬」(第 22 行)、杻「音紐」(第 18 行)、雘「音瓠」(第 26 行);本站标注读音依次为 yú / dǎn / chǔ / huò。',
    handling:
      '音表并列照录,不折合今音、不判孰是孰非;旧注音值与今音对应关系非本站所能裁定,四种字的读音分歧留人工复核。G35 本轮新增。',
    state: '不裁决',
  },
  {
    id: '疑13',
    topic: '会稽之山「勺水出焉」之「勺」/「多」异文',
    evidence: '底本 B1 页面自带异文标注「勺一作「多」水出焉」;底本 B2 四库本郭璞注同记{{另|勺|多}}(存档第 50 行)。两源正文均作「勺」。与成山「虖勺一作「多」」(疑10)句型相同,为两处独立异文。',
    handling: '正文从两源共用作「勺」,异文照录于 loc-kuaiji variantText 与本表;待底本 A 照录后按底本政策处理。G71 新增。',
    state: '待底本A回核',
  },
  {
    id: '疑14',
    topic: '僕勾之山「勾」/「夕」异文',
    evidence: '底本 B1 页面自带异文标注「僕勾一作「夕」之山」;底本 B2 四库本郭璞注同记{{另|勾|夕}}(存档第 54 行)。两源正文均作「勾」。',
    handling: '正文从两源共用作「勾」,异文照录于 loc-pugou variantText 与本表;待底本 A 照录后按底本政策处理。G72 新增。',
    state: '待底本A回核',
  },
  {
    id: '疑15',
    topic: '咸陰之山里距两源互异(四百里/五百里)',
    evidence: '底本 B1 存档 L12 行作「又東四百里,曰咸陰之山」;底本 B2 存档第 56 行作「又東五百里,曰咸陰之山」。正文里距数字两源互异,逐字一致门槛未达。',
    handling: '咸陰之山本轮不录正文(不凑数),gap 注如实;待底本 A 照录后三源对读裁决。G72 新增。',
    state: '待底本A回核',
  },
  {
    id: '疑16',
    topic: '洵山「洵」/「旬」异文',
    evidence: '底本 B1 页面自带异文标注「洵一作「旬」山」;底本 B2 四库本郭璞注同记{{另|洵|旬}}(存档第 58 行)。两源正文均作「洵」。',
    handling: '正文从两源共用作「洵」,异文照录于 loc-xunshan variantText 与本表;待底本 A 照录后按底本政策处理。G73 新增。',
    state: '待底本A回核',
  },
  {
    id: '疑17',
    topic: '鹿吳之山「蠱雕」之「蠱」/「纂」异文',
    evidence: '底本 B1 页面自带异文标注「名曰蠱一作「纂」雕」;底本 B2 四库本郭璞注同记{{另|蠱|纂}}(存档第 64 行)。两源正文均作「蠱」。',
    handling: '正文从两源共用作「蠱」(简体「蛊」),异文照录于 loc-luwu variantText 与本表;待底本 A 照录后按底本政策处理。蠱雕词条候选(G75)。G74 新增。',
    state: '待底本A回核',
  },
]

/** 郭璞注层疑点(G24 上线时登记,原文见 GALLERY_SPRINT.md G24 行)。 */
export const GUOPU_DOUBTS = [
  { topic: '「敢其肉」', note: '底本 B 作「敢其肉」，文意当为「食其肉」或「敢」为讹字;注文照录未改。' },
  { topic: '尾逗号', note: '底本 B 注文句末逗号与句号混用处照录原样,不作标点校改(注文标点属底本)。' },
  { topic: '「作」/「做」混用', note: '底本 B 同一注内「作牛字圖」与「亦做牛形」混用,照录未统一。' },
  { topic: '「璨曰」未采', note: '底本 B 夹注含后人「璨曰」云云(非郭璞注),本站郭璞注层不采入,该部分不上屏。' },
]

export const VARIANT_COUNTS = {
  cases: VARIANT_CASES.length,
  doubts: DOUBTS.length,
  guopuDoubts: GUOPU_DOUBTS.length,
}
