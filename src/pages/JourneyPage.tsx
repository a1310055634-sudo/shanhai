import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { NANCI_YI_ROUTE, NANCI_YI_PENDING, type JourneyStation } from '../data/journey'
import { CHAPTER_TEXTS } from '../data/chapterTexts'
import { LOCATIONS } from '../data/locations'
import { ENTITIES } from '../data/entities'
import styles from './JourneyPage.module.css'

interface StationView {
  station: JourneyStation
  locId: string
  name: string
  entitySlug?: string
  entityName?: string
}

function stationView(station: JourneyStation): StationView | null {
  const loc = LOCATIONS.find((l) => l.id === station.locationId)
  if (!loc) return null
  const entity = ENTITIES.find((e) => station.locationId && loc.relatedEntityIds.includes(e.id))
  return {
    station,
    locId: loc.id,
    name: loc.canonicalName,
    entitySlug: entity?.slug,
    entityName: entity?.canonicalName,
  }
}

/**
 * 南次一经·山海行旅(J10):固定路由 /journeys/nanci-yi。
 * 当前站同步到 URL(?station=);刷新/分享/返回均保持;非法参数安全回起点并提示。
 * 站点数据全部来自已逐字核验的 NANCI_YI_ROUTE,缺口如实显示。
 */
interface ScrollSlot {
  kind: 'station' | 'gap'
  locId?: string
  name: string
  approach?: string
}

/** 长卷槽位:已核验站与未核验山段按原文次序合并排列。 */
function buildScrollSlots(): Array<ScrollSlot> {
  const slots: Array<ScrollSlot> = []
  const pending = [...NANCI_YI_PENDING]

  NANCI_YI_ROUTE.stations.forEach((station) => {
    const loc = LOCATIONS.find((l) => l.id === station.locationId)
    if (!loc) return
    // 插入本站之前的未核验山段
    while (
      pending.length > 0 &&
      loc.sourceOrder !== undefined &&
      pending[0].order < loc.sourceOrder
    ) {
      const p = pending.shift()!
      slots.push({ kind: 'gap', name: p.name })
    }
    slots.push({
      kind: 'station',
      locId: loc.id,
      name: loc.canonicalName,
      approach: loc.sourceDirection
        ? `${loc.sourceDirection ?? ''}${loc.sourceDistance ?? ''}`.trim() || undefined
        : undefined,
    })
  })
  // 末段之前剩余的未核验山
  while (pending.length > 0) {
    const p = pending.shift()!
    slots.push({ kind: 'gap', name: p.name })
  }
  return slots
}

const PROGRESS_KEY = 'shanhai:journey-progress'

function readProgress(): string | null {
  try {
    return localStorage.getItem(PROGRESS_KEY)
  } catch {
    return null
  }
}

export default function JourneyPage() {
  const stations = NANCI_YI_ROUTE.stations.map(stationView).filter(
    (s): s is StationView => s !== null,
  )
  const validIds = new Set(stations.map((s) => s.locId))

  const params = new URLSearchParams(window.location.search)
  const requested = params.get('station')
  const invalidRequested = requested !== null && !validIds.has(requested)

  // J14:无 station 参数时恢复上次到达站点(localStorage 不可用则静默降级)
  const savedProgress = requested === null ? readProgress() : null
  const savedValid =
    savedProgress !== null && validIds.has(savedProgress) ? savedProgress : null

  const currentId =
    requested && validIds.has(requested)
      ? requested
      : savedValid ?? stations[0]?.locId
  const currentIndex = stations.findIndex((s) => s.locId === currentId)
  const current = currentIndex >= 0 ? stations[currentIndex] : undefined
  const currentStationSegment = current?.station.segmentId
    ? CHAPTER_TEXTS['nanshan-jing']?.segments.find((x) => x.id === current.station.segmentId)
    : undefined
  const currentEntity = current?.entitySlug
    ? ENTITIES.find((e) => e.slug === current.entitySlug)
    : undefined
  const currentEntityExplanation = currentEntity?.modernExplanation.slice(0, 90)

  // J14:到达站点时记录进度(localStorage 不可用时静默降级)
  useEffect(() => {
    if (!currentId) return
    try {
      localStorage.setItem(PROGRESS_KEY, currentId)
    } catch {
      // 隐私模式等场景:静默降级
    }
  }, [currentId])

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <p className={styles.kicker}>行旅 · 南次一经</p>
        <h1 className={styles.title}>南次一经·山海行旅</h1>
        <p className={styles.sub}>
          循原文次序自招摇之山而行;已核验的站点可停留细读,未录山段如实标注缺口。
        </p>
      </header>

      {/* 路线长卷(J11):按原文次序的站点总览条 */}
      <section className={styles.scrollWrap} aria-label="路线长卷">
        <div className={styles.scroll}>
          {buildScrollSlots().map((slot, i) =>
            slot.kind === 'station' ? (
              <Link
                key={`s${i}`}
                to={`/journeys/nanci-yi?station=${slot.locId}`}
                className={
                  currentId === slot.locId
                    ? `${styles.scrollSlot} ${styles.scrollSlotOn}`
                    : styles.scrollSlot
                }
              >
                <span className={styles.scrollDot} aria-hidden="true" />
                <span className={styles.scrollName}>{slot.name}</span>
                {slot.approach && (
                  <span className={styles.scrollApproach}>{slot.approach}</span>
                )}
              </Link>
            ) : (
              <div key={`p${i}`} className={styles.scrollGap}>
                <span className={styles.scrollGapName}>{slot.name}</span>
                <span className={styles.scrollGapNote}>待核验</span>
              </div>
            ),
          )}
        </div>
      </section>

      {savedValid && savedValid !== currentId && (
        <p className={styles.resume}>
          <Link className={styles.resumeLink} to={`/journeys/nanci-yi?station=${savedValid}`}>
            继续上次行旅 →
          </Link>
        </p>
      )}

      {invalidRequested && requested && (
        <p className={styles.invalid} role="status">
          未找到站点「{requested}」,已回到路线起点。
        </p>
      )}

      <ol className={styles.stations}>
        {stations.map((s, i) => {
          const active = s.locId === currentId
          return (
            <li key={s.locId} className={active ? `${styles.station} ${styles.active}` : styles.station}>
              <Link
                className={styles.stationMain}
                to={`/journeys/nanci-yi?station=${s.locId}`}
                aria-current={active ? 'true' : undefined}
              >
                <span className={styles.no} aria-hidden="true">
                  {i + 1}
                </span>
                <span className={styles.name}>{s.name}</span>
                <span className={styles.note}>{s.station.note}</span>
              </Link>
              {s.entitySlug && (
                <Link className={styles.beastLink} to={`/catalog/${s.entitySlug}`}>
                  异兽·{s.entityName}
                </Link>
              )}
            </li>
          )
        })}
      </ol>

      {current && (
        <section className={styles.current} aria-label="当前站点">
          <p className={styles.currentKicker}>当前站点 · 第 {currentIndex + 1} 站</p>
          <h2 className={styles.currentName}>{current.name}</h2>
          {currentStationSegment && (
            <blockquote className={styles.currentCite}>
              <span className={styles.citeTag}>原文</span>
              {currentStationSegment.text}
              <span className={styles.citeFrom}>
                ——《南山经》· {currentStationSegment.section}(节选)
              </span>
            </blockquote>
          )}
          {current.entitySlug && currentEntityExplanation && (
            <div className={styles.currentExplain}>
              <p className={styles.explainTag}>本站释义(节选)</p>
              <p className={styles.explainText}>{currentEntityExplanation}</p>
              <Link className={styles.explainLink} to={`/catalog/${current.entitySlug}`}>
                阅读完整条目 →
              </Link>
            </div>
          )}
          {current.entitySlug ? (
            <p className={styles.currentBeast}>
              出现异兽:
              <Link className={styles.currentLink} to={`/catalog/${current.entitySlug}`}>
                {current.entityName}
              </Link>
            </p>
          ) : (
            <p className={styles.currentMuted}>本站暂无已核验异兽条目。</p>
          )}
          <div className={styles.currentNav}>
            {currentIndex > 0 && (
              <Link
                className={styles.navLink}
                to={`/journeys/nanci-yi?station=${stations[currentIndex - 1].locId}`}
              >
                ← 上一站 · {stations[currentIndex - 1].name}
              </Link>
            )}
            {currentIndex < stations.length - 1 && (
              <Link
                className={styles.navLink}
                to={`/journeys/nanci-yi?station=${stations[currentIndex + 1].locId}`}
              >
                下一站 · {stations[currentIndex + 1].name} →
              </Link>
            )}
          </div>
          <p className={styles.readHint}>
            原文阅读:
            <Link className={styles.readLink} to={`/chapters/nanshan-jing#${current.station.segmentId ?? ''}`}>
              打开《南山经》对应段落
            </Link>
          </p>
        </section>
      )}
    </div>
  )
}
