/**
 * 内容数据核心类型(规范第八节)。
 * recordStatus 为资料核验状态:verified 才能进入首页推荐、每日一卷、
 * 随机探索与猜谜题库;variant=存在异文;unverified=待考证。
 */

export type RecordStatus = 'verified' | 'variant' | 'unverified'

export type EntityType =
  | 'beast' // 异兽
  | 'bird' // 鸟类
  | 'aquatic' // 水族
  | 'deity' // 神祇
  | 'figure' // 人物
  | 'nation' // 国族
  | 'plant' // 植物
  | 'mineral' // 矿物
  | 'artifact' // 器物
  | 'terrain' // 山川水系

export type TraitKind =
  | 'appearance' // 形貌
  | 'sound' // 声音
  | 'behavior' // 习性
  | 'diet' // 食性

/**
 * 郭璞注单条(G24):注文从底本逐字照录(维基文库郭璞注本),保持繁体原样,
 * 不转简、不改字、不补标点;底本疑似形讹字一律照录并在疑点清单记录。
 */
export interface GuoPuNote {
  /** 注文所系正文短语(照录底本正文,便于读者定位);省略表示系于整段 */
  attach?: string
  /** 注文原文(逐字照录) */
  text: string
}

/** 一条原文引用及其核验信息;同一实体多处出现时分别立条,不得拼接。 */
export interface Citation {
  /** 原文(按所据底本录入,不得凭记忆补写) */
  originalText: string
  /**
   * 郭璞注层(G24,可选):仅在该条 originalText 与郭璞注本正文逐字核对一致后
   * 方可填写;未核或正文有出入的条目不填、页面不显示注层。
   */
  guoPuNotes?: GuoPuNote[]
  /** 篇章名称,如「南山经」 */
  chapter: string
  /** 卷次或段落位置 */
  section?: string
  /** 所据版本,如「郭璞注·郝懿行笺疏系统通行本(详见 CONTENT_SOURCES.md)」 */
  sourceEdition: string
  /** 页码或公开可核对的定位信息 */
  pageOrLocation?: string
  /** 公开链接(仅限公版、稳定来源) */
  publicUrl?: string
  /** 异文说明(存在异文时必填) */
  variantText?: string
  /** 核验备注:如何核对、何处存疑 */
  verificationNote: string
  /** 核验时间 ISO 日期 */
  verifiedAt?: string
}

/** 一项可回看原文的特征。 */
export interface Trait {
  kind: TraitKind
  /** 特征描述(基于原文,不确定处用限定词) */
  text: string
  /** 指回对应 citation 的下标 */
  citationIndex: number
}

/** 原文明示的能力/征兆/用途记述,严格与原文绑定。 */
export interface SourceNote {
  text: string
  citationIndex: number
}

/**
 * 后世流变的一条可溯 claim(G36)。
 * 「逐句注篇名与链接」:每个 fact 句都绑定一条后世古籍原文引文 + 页名 + 链接 + 项目内存档;
 * 取不到来源的说法一律不写进 claim,只在 LaterReception.text 内明确标注留白。
 */
export interface LaterClaim {
  /** 本站表述(现代汉语,一句) */
  text: string
  /** 篇名(含卷/篇定位),如「《呂氏春秋》卷二十二·察傳」 */
  sourceTitle: string
  /** 公开链接(公版、稳定来源) */
  sourceUrl: string
  /** 所据原文引文(逐字照录后世典籍,保持繁体原样) */
  quote: string
  /** 项目内存档文件(核对以存档为准) */
  archive: string
  /** 说明:转录疑点、作者/时代、照录口径 */
  note?: string
}

/** 后世流变条目(与原始记载严格分隔,均为本站编辑说明)。 */
export interface LaterReception {
  era: string
  text: string
  /** G36 新增:逐句可溯的 fact 句;无来源的说法不列此处 */
  claims?: LaterClaim[]
}

export interface Entity {
  id: string
  slug: string
  canonicalName: string
  pinyin: string
  aliases: string[]
  type: EntityType
  /** 基于原文提炼的一句话摘要 */
  summary: string
  chapterIds: string[]
  locationIds: string[]
  citations: Citation[]
  appearanceTraits: Trait[]
  behaviorTraits: Trait[]
  soundTraits: Trait[]
  dietTraits: Trait[]
  /** 原文明示的能力 */
  abilities: SourceNote[]
  /** 出现时伴随的征兆 */
  omens: SourceNote[]
  /** 本站释义(现代汉语,标注不确定处) */
  modernExplanation: string
  /** 异文与争议读法 */
  disputedReadings: string[]
  relatedEntityIds: string[]
  /** 本站阅读索引标签(非《山海经》原有分类) */
  tags: string[]
  recordStatus: RecordStatus
  /** 插画说明;均为艺术演绎或原创 SVG */
  illustration?: { kind: 'svg' | 'none'; alt: string; note?: string }
  /** 后世流变(本站编辑说明;无可靠把握时不填) */
  laterReception?: LaterReception[]
  updatedAt: string
}

/** 概念地图坐标(古籍内部叙事关系,非现实经纬度)。 */
export interface MapPosition {
  x: number
  y: number
  region: string
}

export interface Location {
  id: string
  canonicalName: string
  aliases: string[]
  type: 'mountain' | 'river' | 'sea' | 'plain' | 'nation' | 'wasteland'
  chapterId: string
  /** 所属子经(如「南次一经」);仅在与行旅核验时填,未核定处留空 */
  subClassic?: string
  /** 原文中的出场顺序(所在子经内的次序;未能核验整链时暂缺) */
  sourceOrder?: number
  previousLocationId?: string
  nextLocationId?: string
  /** 原文记载的方位,如「曰……之山」前的行向描述 */
  sourceDirection?: string
  /** 原文记载的距离(保留原文表述) */
  sourceDistance?: string
  relatedEntityIds: string[]
  citations: Citation[]
  mapPosition: MapPosition
  /** 现代地理假说(须注明争议,不与概念坐标混用) */
  modernHypotheses: string[]
  recordStatus: RecordStatus
}

export interface ChapterMeta {
  id: string
  slug: string
  name: string
  /** 通行本顺序 1—18 */
  order: number
  /** 所属部分:山经 / 海外经 / 海内经 / 大荒经 / 海内经(终篇独立成篇) */
  group: '山经' | '海外经' | '海内经' | '大荒经' | '海内经(终篇)'
  /** 本站进度:该篇是否已录入原文 */
  contentStatus: 'pending' | 'partial' | 'entered'
}
