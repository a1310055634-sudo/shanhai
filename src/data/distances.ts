/**
 * 里距对照数据(G26 建南次一经;G30 参数化增南次二经)。
 * 红线:原文里距句一律照录,歧义照录不裁决(一经凡十山/篇末里距/柢祗用字三案,
 * 详见 EDITION_AUDIT.md 差1/2/6/7)。已建站山运行时复用 locations.ts 已核验
 * 引文截取里距句(单一数据源,不另抄第二份);柢(祗)待核不设站,录文按两源
 * 分别照录(底本A「东三百里祗山」/底本B「又東三百里柢山」,简体转写,用字与
 * 「又」字互异——两源存档见 EDITION_EVIDENCE/ctext-nanci1-20260927.txt 第5段
 * 与 wikisource-nanshan1-20260927.txt,2026-09-27 抓取,2026-10-02 G26 复核)。
 * 南次二经(G30):已录六山列行;未录十一山不列行——其里距句未走 EDITION_AUDIT
 * 全流程,照录上屏即违反「未核不上线」,缺口在存疑区如实说明而非凑行。
 * 逐段相加与本站校核均为本站计算,上屏时明示,不写成古籍原文。
 */
import { LOCATIONS } from './locations'
import { NANCI_YI_ROUTE } from './journey'
import { CHAPTER_TEXTS } from './chapterTexts'

/** 经别:南次一经(ns1,G26)/南次二经(ns2,G30)。 */
export type DistanceClassic = 'ns1' | 'ns2'

export interface DistanceQuote {
  /** 照录句(原文层) */
  text: string
  /** 来源注记(哪个底本/是否已核验引文) */
  source: string
}

export interface DistanceRow {
  /** 篇内叙述次序(自一始,含待核山) */
  order: number
  /** 本站用名(柢山从底本B,注记见 note) */
  name: string
  /** 已核验山川 id;待核行无 */
  locationId?: string
  /** 待核不设站 */
  pending?: boolean
  /** 仅待核行用:两源分别照录;已建站行留空,运行时从引文截取 */
  extraQuotes?: DistanceQuote[]
  /** 显式照录句:经首句「山」字先于山名出现(「南山经」),自动截取不可用,须整句指定 */
  quoteOverride?: string
  /** 里距(里):本站按照录句解析的数值,供逐段相加校核;非古籍原文。经首无前置里距为 null */
  li: number | null
  note?: string
}

const NS1_ROWS: DistanceRow[] = [
  {
    order: 1,
    name: '招摇之山',
    locationId: 'loc-zhaoyao',
    li: null,
    quoteOverride: '南山经之首曰䧿山。其首曰招摇之山',
    note: '经首之山,无前置里距',
  },
  { order: 2, name: '堂庭之山', locationId: 'loc-tangting', li: 300 },
  { order: 3, name: '猨翼之山', locationId: 'loc-yuanyi', li: 380 },
  { order: 4, name: '杻阳之山', locationId: 'loc-chuyang', li: 370 },
  {
    order: 5,
    name: '柢山',
    pending: true,
    li: 300,
    extraQuotes: [
      { text: '东三百里祗山', source: '底本A·ctext(zhs)' },
      { text: '又东三百里柢山', source: '底本B·维基文库郭璞注本' },
    ],
    note: '用字柢/祗两源互异,「又」字有无亦互异;待核不设站',
  },
  { order: 6, name: '亶爰之山', locationId: 'loc-danyuan', li: 400 },
  { order: 7, name: '基山', locationId: 'loc-jishan', li: 300 },
  { order: 8, name: '青丘之山', locationId: 'loc-qingqiu', li: 300 },
  { order: 9, name: '箕尾之山', locationId: 'loc-jiwei', li: 350 },
]

/**
 * 南次二经(G30):仅列已上线六山。柜山为经首无前置里距,照录句自动截取
 * 「南次二经之首，曰柜山」可用(首个「山」字即山名末字,无须 override)。
 * 瞿父/句餘(五、六山)未录不列行;序数 7/8 起自原文次序,空缺如实。
 */
const NS2_ROWS: DistanceRow[] = [
  {
    order: 1,
    name: '柜山',
    locationId: 'loc-guishan',
    li: null,
    note: '经首之山,无前置里距',
  },
  { order: 2, name: '长右之山', locationId: 'loc-changyou', li: 450 },
  { order: 3, name: '尧光之山', locationId: 'loc-yaoguang', li: 340 },
  { order: 4, name: '羽山', locationId: 'loc-yushan', li: 350 },
  { order: 5, name: '瞿父之山', locationId: 'loc-qufu', li: 370 },
  { order: 6, name: '句余之山', locationId: 'loc-juyu', li: 400 },
  { order: 7, name: '浮玉之山', locationId: 'loc-fuyu', li: 500 },
  { order: 8, name: '成山', locationId: 'loc-chengshan', li: 500 },
  { order: 9, name: '会稽之山', locationId: 'loc-kuaiji', li: 500 },
  { order: 10, name: '夷山', locationId: 'loc-yishan', li: 500 },
  { order: 11, name: '仆勾之山', locationId: 'loc-pugou', li: 500 },
  { order: 12, name: '洵山', locationId: 'loc-xunshan', li: 400 },
  { order: 13, name: '虖勺之山', locationId: 'loc-hushao', li: 400 },
  { order: 14, name: '区吴之山', locationId: 'loc-quwu', li: 500 },
  { order: 15, name: '鹿吴之山', locationId: 'loc-luwu', li: 500 },
  { order: 16, name: '漆吴之山', locationId: 'loc-qiwu', li: 500 },
]

const ROWS_BY_CLASSIC: Record<DistanceClassic, DistanceRow[]> = {
  ns1: NS1_ROWS,
  ns2: NS2_ROWS,
}

const TONGJI_SEG_BY_CLASSIC: Record<DistanceClassic, string> = {
  ns1: 'seg-ns1-tongji',
  ns2: 'seg-ns2-tongji',
}

const CN_DIGITS = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']

/** 序数汉字(一经表仅一至十);越界回退阿拉伯,不臆造。 */
export function cnNum(n: number): string {
  return CN_DIGITS[n - 1] ?? String(n)
}

/**
 * 汉字数字解析(一至九千九百九十九常用式),用于「从照录句解析里距」——
 * 本站校核数值必须来自照录句本身,而非另行手填。解析不出返回 null。
 */
export function hanziNum(s: string): number | null {
  const digit: Record<string, number> = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 }
  const unit: Record<string, number> = { 十: 10, 百: 100, 千: 1000 }
  let total = 0
  let cur = 0
  let seen = false
  for (const ch of s) {
    if (digit[ch] != null) {
      cur += digit[ch]
      seen = true
    } else if (unit[ch] != null) {
      total += (cur || 1) * unit[ch]
      cur = 0
      seen = true
    } else if (seen) {
      break
    }
  }
  return seen ? total + cur : null
}

/** 照录句截取:引文自句首至第一个「山」字(里距句均为引文首句)。 */
export function distanceQuote(originalText: string): string {
  const i = originalText.indexOf('山')
  return i === -1 ? originalText : originalText.slice(0, i + 1)
}

export interface ResolvedDistanceRow extends DistanceRow {
  /** 上屏照录句(已建站=引文截取;待核=两源录文) */
  quotes: DistanceQuote[]
  /** 行旅站序(1 起,自 NANCI_YI_ROUTE 派生,不手填);无行旅站为 null(二经六山图鉴有载而未设站) */
  stationNo: number | null
}

export function buildDistanceRows(classic: DistanceClassic = 'ns1'): ResolvedDistanceRow[] {
  return ROWS_BY_CLASSIC[classic].map((row) => {
    let quotes: DistanceQuote[] = []
    if (row.quoteOverride) {
      quotes = [{ text: row.quoteOverride, source: '站内引文(双源核验)照录' }]
    } else if (row.locationId) {
      const loc = LOCATIONS.find((l) => l.id === row.locationId)
      const text = loc ? distanceQuote(loc.citations[0]?.originalText ?? '') : ''
      if (text) quotes = [{ text, source: '站内引文(双源核验)照录' }]
    } else {
      quotes = row.extraQuotes ?? []
    }
    const idx = NANCI_YI_ROUTE.stations.findIndex((s) => s.locationId === row.locationId)
    return { ...row, quotes, stationNo: idx >= 0 ? idx + 1 : null }
  })
}

export interface DistanceSummary {
  /** 篇末总述原文(照录 chapterTexts 篇末段,单一数据源) */
  tongjiText: string
  /** 逐段里距:自各行照录句解析(经首无里距不计入) */
  segments: number[]
  /** 本站逐段相加 */
  sum: number
  /** 原文篇末里距(解析「二千九百五十」/「七千二百」) */
  totalInText: number
  /** 本站校核与篇末之差 */
  delta: number
  /** 实列山数(含待核柢山/二经为已录山数) */
  countedMountains: number
  /** 原文篇末山数(解析「凡十山」/「凡十七山」) */
  mountainsInText: number
}

export function buildDistanceSummary(classic: DistanceClassic = 'ns1'): DistanceSummary {
  const rows = buildDistanceRows(classic)
  const segments = rows.flatMap((row) => {
    if (row.li == null) return []
    const parsed = hanziNum(row.quotes[0]?.text ?? '')
    return [parsed ?? 0]
  })
  const sum = segments.reduce((a, b) => a + b, 0)
  const seg = CHAPTER_TEXTS['nanshan-jing'].segments.find((s) => s.id === TONGJI_SEG_BY_CLASSIC[classic])
  const tongjiText = seg && seg.kind === 'text' ? (seg.text ?? '') : ''
  const totalInText = hanziNum(/([一二三四五六七八九十百千]+)里/.exec(tongjiText)?.[1] ?? '') ?? 0
  const mountainsInText = hanziNum(/凡([一二三四五六七八九十百千]+)山/.exec(tongjiText)?.[1] ?? '') ?? 0
  return {
    tongjiText,
    segments,
    sum,
    totalInText,
    delta: totalInText - sum,
    countedMountains: rows.length,
    mountainsInText,
  }
}
