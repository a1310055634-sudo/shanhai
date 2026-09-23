/**
 * 南次一经·山海行旅——路线数据(J02 建立基本结构)。
 * 站点只收录已逐字核验的山川;缺口以 pending 段如实表示,不生成假站点。
 * 相邻关系(方向/距离)属于「从上一站到本站」的边,引用必须可回看。
 */

import { LOCATIONS as LOCS } from './locations'
import { ENTITIES } from './entities'

export interface JourneyStation {
  locationId: string
  /** 站点核验状态:verified=山名/顺序/引文已核验 */
  status: 'verified' | 'pending'
  /** pending 时的说明(哪些山段待录入) */
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
    { locationId: 'loc-zhaoyao', status: 'verified' },
    // 堂庭之山、猨翼之山待 J04 核验后建站
    { locationId: 'loc-chuyang', status: 'verified' },
    // 柢山、亶爰之山、基山待 J05/J06 核验后建站
    { locationId: 'loc-qingqiu', status: 'verified' },
    // 箕尾之山待 J07 核验后建站
  ],
}

export interface JourneyIssue {
  kind:
    | 'duplicate-station'
    | 'invalid-location'
    | 'invalid-entity'
    | 'verified-without-citation'
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
