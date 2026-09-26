/**
 * 南次一经·山海行旅——路线数据(J02 建立基本结构)。
 * 站点只收录已逐字核验的山川;缺口以 pending 段如实表示,不生成假站点。
 * 相邻关系(方向/距离)属于「从上一站到本站」的边,引用必须可回看。
 */

import { LOCATIONS as LOCS } from './locations'
import { ENTITIES } from './entities'
import { CHAPTER_TEXTS as SEGMENTS } from './chapterTexts'

export interface JourneyStation {
  locationId: string
  /** 站点核验状态:verified=山名/顺序/引文已核验 */
  status: 'verified' | 'pending'
  /** 对应篇章段落锚点(J09:站点→原文往返) */
  segmentId?: string
  /** 站点说明(进度/缺口提示) */
  note?: string
}

export interface JourneyRoute {
  id: string
  slug: string
  name: string
  chapterId: string
  stations: JourneyStation[]
}

export const NANCI_YI_ROUTE: JourneyRoute = {
  id: 'journey-nanci-yi',
  slug: 'nanci-yi',
  name: '南次一经行旅',
  chapterId: 'ch-nanshan',
  stations: [
    {
      locationId: 'loc-zhaoyao',
      status: 'verified',
      segmentId: 'seg-ns1-zhaoyao-kai',
      note: '南次一经首山',
    },
    {
      locationId: 'loc-tangting',
      status: 'verified',
      segmentId: 'seg-ns1-tangting',
      note: '第二山(2026-09-27 双源核验建站)',
    },
    {
      locationId: 'loc-yuanyi',
      status: 'verified',
      segmentId: 'seg-ns1-yuanyi',
      note: '第三山(2026-09-27 双源核验建站)',
    },
    {
      locationId: 'loc-chuyang',
      status: 'verified',
      segmentId: 'seg-ns1-chuyang-shan',
      note: '第四山',
    },
    {
      locationId: 'loc-qingqiu',
      status: 'verified',
      segmentId: 'seg-ns1-qingqiu-shan',
      note: '第八山(基山之后)',
    },
    // 箕尾之山待 J07 核验后建站
  ],
}

export interface JourneyIssue {
  kind:
    | 'duplicate-station'
    | 'invalid-location'
    | 'invalid-entity'
    | 'verified-without-citation'
    | 'invalid-segment'
    | 'order-conflict'
  message: string
}

/**
 * 路线数据完整性校验(J02 建立)。
 * 检查:重复站点、无效地点/实体引用、已核验站无引文、顺序冲突。
 */
export function validateJourneyRoute(route: JourneyRoute): JourneyIssue[] {
  const issues: JourneyIssue[] = []
  const seen = new Set<string>()

  route.stations.forEach((station, i) => {
    const loc = LOCS.find((l) => l.id === station.locationId)
    if (!loc) {
      issues.push({
        kind: 'invalid-location',
        message: `第 ${i + 1} 站引用了不存在的地点:${station.locationId}`,
      })
      return
    }
    if (seen.has(station.locationId)) {
      issues.push({
        kind: 'duplicate-station',
        message: `地点重复出现在路线中:${loc.canonicalName}`,
      })
    }
    seen.add(station.locationId)

    if (station.status === 'verified' && loc.citations.length === 0) {
      issues.push({
        kind: 'verified-without-citation',
        message: `${loc.canonicalName} 标记为已核验但没有任何引文`,
      })
    }

    const order = loc.sourceOrder
    const prev = i > 0 ? LOCS.find((l) => l.id === route.stations[i - 1].locationId) : undefined
    if (
      order !== undefined &&
      prev?.sourceOrder !== undefined &&
      order <= prev.sourceOrder
    ) {
      issues.push({
        kind: 'order-conflict',
        message: `${loc.canonicalName}(第 ${order} 山)未按原文顺序排列(前一站为第 ${prev.sourceOrder} 山)`,
      })
    }

    if (
      station.segmentId &&
      !SEGMENTS['nanshan-jing'].segments.some((x) => x.id === station.segmentId)
    ) {
      issues.push({
        kind: 'invalid-segment',
        message: `${loc.canonicalName} 的 segmentId 引用了不存在的段落:${station.segmentId}`,
      })
    }

    loc.relatedEntityIds.forEach((eid) => {
      if (!ENTITIES.some((e) => e.id === eid)) {
        issues.push({
          kind: 'invalid-entity',
          message: `${loc.canonicalName} 引用了不存在的实体:${eid}`,
        })
      }
    })
  })

  return issues
}

/** 南次一经已知山序中的未核验山段(名称见于既有盘点记录,山句待逐字核验)。 */
export interface PendingMountain {
  name: string
  order: number
  note?: string
}

export const NANCI_YI_PENDING: PendingMountain[] = [
  { name: '柢山', order: 5, note: '柢/祗两源互异(A ctext作祗/B维基文库作柢);里距两源一致东三百里;两源均无「曰」字' },
  { name: '亶爰之山', order: 6 },
  { name: '基山', order: 7 },
  { name: '箕尾之山', order: 9 },
]

/** 按实体反查所在行旅站点(J13 双向导航用)。 */
export function findStationByEntity(
  entityId: string,
): { route: JourneyRoute; station: JourneyStation } | undefined {
  const route = NANCI_YI_ROUTE
  const station = route.stations.find((x) => x.locationId && (
    LOCS.find((l) => l.id === x.locationId)?.relatedEntityIds.includes(entityId)
  ))
  return station ? { route, station } : undefined
}
