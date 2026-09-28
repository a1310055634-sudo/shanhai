import { NANCI_YI_PENDING, NANCI_YI_ROUTE } from '../../data/journey'
import { LOCATIONS } from '../../data/locations'
import { CHAPTER_TEXTS } from '../../data/chapterTexts'
import { classicArtFor, type ClassicArt } from '../../data/classicArt'
import type { Citation } from '../../data/types'

/**
 * R03 展览视图模型:「一卷九境」九位置的唯一派生源。
 * verified 站(JournalStationView)与 variant 缺口(JournalVariantGapView)类型分立:
 * 缺口没有 segmentId/引文/版画字段;站必有 segmentId 与引文。
 * 纯函数:依赖显式传入,便于负向用例检验。
 */

export interface JournalDeps {
  stations: Array<{ locationId: string; status: string; segmentId?: string; note?: string }>
  pending: Array<{
    name: string
    order: number
    note?: string
    variants?: Array<{ label: string; name: string }>
    distanceNote?: string
  }>
  locations: Array<{
    id: string
    canonicalName: string
    subClassic?: string
    sourceOrder?: number
    sourceDirection?: string
    sourceDistance?: string
    citations?: Citation[]
    recordStatus?: string
    relatedEntityIds?: string[]
  }>
  segments: Array<{ id: string; kind: 'text' | 'gap' }>
}

export interface JournalPlate extends ClassicArt {
  entitySlug: string
}

/** 已核验站视图:字段全部真实,不存在则缺省,不造假。 */
export interface JournalStationView {
  kind: 'station'
  locationId: string
  name: string
  /** 南次一经第几山(sourceOrder) */
  mountainOrder: number
  /** 已核验行旅第几站(按路线序,1 起) */
  stationIndex: number
  segmentId: string
  direction?: string
  distance?: string
  citation?: Citation
  entitySlug?: string
  plate?: JournalPlate
}

/** 柢/祗异文缺口视图:类型分立,无 segmentId、无引文、无版画。 */
export interface JournalVariantGapView {
  kind: 'variant-gap'
  mountainOrder: number
  /** 展示名(通行写法,B) */
  displayName: string
  /** 双源用字并示 */
  variants: Array<{ label: string; name: string }>
  /** 里距两源一致说明 */
  distanceNote?: string
  /** 完整异文说明 */
  explain?: string
}

export type JournalPosition = JournalStationView | JournalVariantGapView

export type JournalModelIssueKind =
  | 'duplicate-mountain-order'
  | 'station-vs-pending-conflict'
  | 'invalid-segment'
  | 'station-missing-citation'
  | 'order-not-contiguous'
  | 'wrong-plate-association'

export interface JournalModelIssue {
  kind: JournalModelIssueKind
  message: string
}

/** 由依赖派生九位置视图;山序升序且必须连续(1..N),否则记 issue。 */
export function buildJournalPositions(deps: JournalDeps): {
  positions: JournalPosition[]
  issues: JournalModelIssue[]
} {
  const issues: JournalModelIssue[] = []
  const byOrder = new Map<number, JournalPosition>()

  // 待核缺口先行入位
  deps.pending.forEach((p) => {
    if (byOrder.has(p.order)) {
      issues.push({
        kind: 'duplicate-mountain-order',
        message: `山序 ${p.order} 在待核清单中重复(${p.name})`,
      })
      return
    }
    byOrder.set(p.order, {
      kind: 'variant-gap',
      mountainOrder: p.order,
      displayName: p.name,
      variants: p.variants ?? [],
      distanceNote: p.distanceNote,
      explain: p.note,
    })
  })

  // 已核站入位;与待核同序 = 冲突(不覆盖)
  let stationIndex = 0
  deps.stations.forEach((st) => {
    const loc = deps.locations.find((l) => l.id === st.locationId)
    if (!loc) {
      issues.push({
        kind: 'invalid-segment',
        message: `站 ${st.locationId} 无对应地点数据`,
      })
      return
    }
    const order = loc.sourceOrder
    if (order === undefined) {
      issues.push({
        kind: 'invalid-segment',
        message: `${loc.canonicalName} 缺 sourceOrder,无法定九位置`,
      })
      return
    }
    if (byOrder.has(order)) {
      issues.push({
        kind: 'station-vs-pending-conflict',
        message: `山序 ${order} 同时存在已核站(${loc.canonicalName})与待核山段`,
      })
      return
    }
    if (st.segmentId && !deps.segments.some((x) => x.id === st.segmentId)) {
      issues.push({
        kind: 'invalid-segment',
        message: `${loc.canonicalName} 的 segmentId 不存在:${st.segmentId}`,
      })
    }
    const citation = loc.citations?.[0]
    if (st.status === 'verified' && !citation?.originalText) {
      issues.push({
        kind: 'station-missing-citation',
        message: `${loc.canonicalName} 已核验但无引文`,
      })
    }
    stationIndex += 1
    const entitySlug = loc.relatedEntityIds?.[0]
    const plateBase = entitySlug ? classicArtFor(entitySlug) : undefined
    let plate: JournalPlate | undefined
    if (entitySlug && plateBase) {
      plate = { ...plateBase, entitySlug }
    }
    byOrder.set(order, {
      kind: 'station',
      locationId: loc.id,
      name: loc.canonicalName,
      mountainOrder: order,
      stationIndex,
      segmentId: st.segmentId ?? '',
      direction: loc.sourceDirection,
      distance: loc.sourceDistance,
      citation,
      entitySlug,
      plate,
    })
  })

  // 序号连续性
  const orders = Array.from(byOrder.keys()).sort((a, b) => a - b)
  orders.forEach((o, i) => {
    if (o !== i + 1) {
      issues.push({
        kind: 'order-not-contiguous',
        message: `九位置序号不连续:第 ${i + 1} 位山序为 ${o}`,
      })
    }
  })

  const positions = orders.map((o) => byOrder.get(o)!) as JournalPosition[]
  return { positions, issues }
}

/** 组装当前项目依赖(供页面与调试钩子调用)。 */
export function journalDeps(): JournalDeps {
  return {
    stations: NANCI_YI_ROUTE.stations,
    pending: NANCI_YI_PENDING,
    locations: LOCATIONS,
    segments: CHAPTER_TEXTS['nanshan-jing']?.segments ?? [],
  }
}

export function buildCurrentJournalPositions() {
  return buildJournalPositions(journalDeps())
}
