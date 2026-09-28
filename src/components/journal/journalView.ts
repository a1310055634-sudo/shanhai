import { NANCI_YI_PENDING, NANCI_YI_ROUTE, type JourneyStation } from '../../data/journey'
import { LOCATIONS } from '../../data/locations'
import { ENTITIES } from '../../data/entities'

/** 站点视图(R04 由 JourneyPage 迁入):地点+站点合并后的展示字段。 */
export interface StationView {
  station: JourneyStation
  locId: string
  name: string
  order?: number
  entitySlug?: string
  entityName?: string
}

export function stationView(station: JourneyStation): StationView | null {
  const loc = LOCATIONS.find((l) => l.id === station.locationId)
  if (!loc) return null
  const entity = ENTITIES.find((e) => loc.relatedEntityIds.includes(e.id))
  return {
    station,
    locId: loc.id,
    name: loc.canonicalName,
    order: loc.sourceOrder,
    entitySlug: entity?.slug,
    entityName: entity?.canonicalName,
  }
}

/** E06:释义按完整句抽取:逐句累加,至 60 字以上或超限即止 */
export function explainLead(text: string, limit = 110): string {
  const sentences = text.split(/(?<=[。!?;；])/).filter(Boolean)
  let out = ''
  for (const sen of sentences) {
    if (out && out.length + sen.length > limit) break
    out += sen
    if (out.length >= 60) break
  }
  return out || text.slice(0, limit)
}

/** E05:原文山次用汉字数字,与「已核验行旅第几站」明确区分 */
export const CN_NUM = ['一', '二', '三', '四', '五', '六', '七', '八', '九']
export const cnNum = (n?: number) => (n && n >= 1 && n <= 9 ? CN_NUM[n - 1] : '')

/** R13:站点引文里的异文简行——取 variantText 首句,数据派生,不手写;
 * 全句仍以古卷对照页为准,此处仅令异文在场景内可见。 */
export function stationVariantLead(locId: string): string | undefined {
  const loc = LOCATIONS.find((l) => l.id === locId)
  const vt = loc?.citations.find((c) => c.variantText)?.variantText
  if (!vt) return undefined
  const head = vt.split('。')[0]
  return head ? `${head}。` : undefined
}

export interface ScrollSlot {
  kind: 'station' | 'gap'
  locId?: string
  name: string
  order?: number
  note?: string
  approach?: string
}

/** 长卷槽位:已核验站与未核验山段按原文次序合并排列(数据派生,勿手写)。 */
export function buildScrollSlots(): Array<ScrollSlot> {
  const slots: Array<ScrollSlot> = []
  const pending = [...NANCI_YI_PENDING]

  NANCI_YI_ROUTE.stations.forEach((station) => {
    const loc = LOCATIONS.find((l) => l.id === station.locationId)
    if (!loc) return
    while (
      pending.length > 0 &&
      loc.sourceOrder !== undefined &&
      pending[0].order < loc.sourceOrder
    ) {
      const p = pending.shift()!
      slots.push({ kind: 'gap', name: p.name, order: p.order, note: p.note })
    }
    slots.push({
      kind: 'station',
      locId: loc.id,
      name: loc.canonicalName,
      order: loc.sourceOrder,
      approach: loc.sourceDirection
        ? `${loc.sourceDirection ?? ''}${loc.sourceDistance ?? ''}`.trim() || undefined
        : undefined,
    })
  })
  while (pending.length > 0) {
    const p = pending.shift()!
    slots.push({ kind: 'gap', name: p.name, order: p.order })
  }
  return slots
}

export const PROGRESS_KEY = 'shanhai:journey-progress'

export function readProgress(): string | null {
  try {
    return localStorage.getItem(PROGRESS_KEY)
  } catch {
    return null
  }
}
