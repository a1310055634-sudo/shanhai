import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NANCI_YI_ROUTE, NANCI_YI_PENDING, type JourneyStation } from '../data/journey'
import { CHAPTER_TEXTS } from '../data/chapterTexts'
import { LOCATIONS } from '../data/locations'
import { ENTITIES } from '../data/entities'
import JourneyScenery from '../components/journey/JourneyScenery'
import BeastArtwork from '../components/art/BeastArtwork'
import { classicArtFor } from '../data/classicArt'
import styles from './JourneyPage.module.css'

interface StationView {
  station: JourneyStation
  locId: string
  name: string
  order?: number
  entitySlug?: string
  entityName?: string
}

/** E06:释义按完整句抽取:逐句累加,至 60 字以上或超限即止 */
function explainLead(text: string, limit = 110): string {
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
const CN_NUM = ['一', '二', '三', '四', '五', '六', '七', '八', '九']
const cnNum = (n?: number) => (n && n >= 1 && n <= 9 ? CN_NUM[n - 1] : '')

function stationView(station: JourneyStation): StationView | null {
  const loc = LOCATIONS.find((l) => l.id === station.locationId)
  if (!loc) return null
  const entity = ENTITIES.find((e) => station.locationId && loc.relatedEntityIds.includes(e.id))
  return {
    station,
    locId: loc.id,
    name: loc.canonicalName,
    order: loc.sourceOrder,
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
  order?: number
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
      slots.push({ kind: 'gap', name: p.name, order: p.order })
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
  // 末段之前剩余的未核验山
  while (pending.length > 0) {
    const p = pending.shift()!
    slots.push({ kind: 'gap', name: p.name, order: p.order })
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
  // J16 修复:订阅路由上下文而非 window.location——站内同路由 param 导航时
  // pushState 与渲染提交的时序可能使 window.location 滞后,导致面板停留旧站。
  const location = useLocation()
  const stations = NANCI_YI_ROUTE.stations.map(stationView).filter(
    (s): s is StationView => s !== null,
  )
  const validIds = new Set(stations.map((s) => s.locId))

  const params = new URLSearchParams(location.search)
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
  // E06:释义节选按完整句抽取(至少一句,约 60—110 字),不再生硬截断,不新增史实
  const currentEntityExplanation = currentEntity
    ? explainLead(currentEntity.modernExplanation)
    : undefined

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

      {/* E04 路线长卷:九位置山海场景;相邻边只在两端均已核验时画为实线 */}
      <section
        className={styles.scrollWrap}
        aria-label="路线长卷:南次一经九个顺序位置,古籍叙事顺序示意"
      >
        <JourneyScenery />
        <div className={styles.scroll}>
          {(() => {
            const slots = buildScrollSlots()
            const out: ReactNode[] = []
            slots.forEach((slot, i) => {
              if (i > 0) {
                const prev = slots[i - 1]
                // 相邻边只有两端都是已核验站时才是「原文已证实的直接相邻」;隔缺口一律虚线
                const verifiedEdge = prev.kind === 'station' && slot.kind === 'station'
                out.push(
                  <span
                    key={`l${i}`}
                    className={verifiedEdge ? `${styles.scrollLink} ${styles.scrollLinkSolid}` : styles.scrollLink}
                    aria-hidden="true"
                  />,
                )
              }
              if (slot.kind === 'station') {
                out.push(
                  <Link
                    key={`s${i}`}
                    to={`/journeys/nanci-yi?station=${slot.locId}`}
                    aria-current={currentId === slot.locId ? 'true' : undefined}
                    className={
                      currentId === slot.locId
                        ? `${styles.scrollSlot} ${styles.scrollSlotOn}`
                        : styles.scrollSlot
                    }
                  >
                    <span className={styles.scrollOrder} aria-hidden="true">
                      {cnNum(slot.order)}
                    </span>
                    <span className={styles.scrollDot} aria-hidden="true" />
                    <span className={styles.scrollName}>{slot.name}</span>
                    {slot.approach && (
                      <span className={styles.scrollApproach}>{slot.approach}</span>
                    )}
                  </Link>,
                )
              } else {
                out.push(
                  <div key={`p${i}`} className={styles.scrollGap}>
                    <span className={styles.scrollOrder} aria-hidden="true">
                      {cnNum(slot.order)}
                    </span>
                    <span className={styles.scrollGapName}>{slot.name}</span>
                    <span className={styles.scrollGapNote}>待核验</span>
                  </div>,
                )
              }
            })
            return out
          })()}
        </div>
        <p className={styles.scrollNote}>
          古籍叙事顺序示意,非现实地理位置 · 已核验站可点入,待核验山段不可进入 · 行进方向循原文「又东」次序
        </p>
      </section>

      {/* J16 修正:原条件(savedValid !== currentId)恒假——带参时 savedProgress 为 null,
          无参时 currentId 即存档站,横幅永不可达。改为无参接续时明示站点并给从起点出发的入口。 */}
      {requested === null && savedValid !== null && current && (
        <p className={styles.resume} role="status">
          已接续上次行旅,当前在{current.name}。
          <Link className={styles.resumeLink} to={`/journeys/nanci-yi?station=${stations[0]?.locId}`}>
            从起点重新出发 →
          </Link>
        </p>
      )}

      {invalidRequested && requested && (
        <p className={styles.invalid} role="status">
          未找到站点「{requested}」,已回到路线起点。
        </p>
      )}

      {/* E06 展签六区:序号山名/原文证据(含来源)/本站释义 | 局部插画/关联异兽/进入古卷/前后行旅 */}
      {current && (
        <section className={styles.current} aria-label="当前站点">
          <div className={styles.signMain}>
            <p className={styles.currentKicker}>
              当前站点 · 南次一经第{cnNum(current.order)}山 · 已核验行旅第 {currentIndex + 1} / {stations.length} 站
            </p>
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
            {currentEntityExplanation ? (
              <div className={styles.currentExplain}>
                <p className={styles.explainTag}>本站释义(节选)</p>
                <p className={styles.explainText}>{currentEntityExplanation}</p>
              </div>
            ) : (
              <p className={styles.currentMuted}>本站释义待与原文同批核验后呈现。</p>
            )}
          </div>
          <aside className={styles.signRail} aria-label="关联异兽与延伸行旅">
            {current.entitySlug ? (
              <div className={styles.signArtZone}>
                <Link
                  className={styles.signArt}
                  to={`/catalog/${current.entitySlug}`}
                  aria-label={`查看异兽「${current.entityName}」完整条目`}
                >
                  <BeastArtwork slug={current.entitySlug} name={current.entityName ?? ''} variant="card" />
                </Link>
                <span className={styles.signArtNote}>
                  {classicArtFor(current.entitySlug)?.source ?? '据原文描述艺术演绎'}
                </span>
                <p className={styles.signRailLabel}>关联异兽</p>
                <Link className={styles.signBeastLink} to={`/catalog/${current.entitySlug}`}>
                  {current.entityName} →
                </Link>
              </div>
            ) : (
              <p className={styles.currentMuted}>本站暂无已核验异兽条目。</p>
            )}
            <p className={styles.signRailLabel}>进入古卷</p>
            <Link
              className={styles.signChapterLink}
              to={`/chapters/nanshan-jing#${current.station.segmentId ?? ''}`}
            >
              《南山经》对应段落 →
            </Link>
            <p className={styles.signRailLabel}>前后行旅</p>
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
          </aside>
        </section>
      )}

      {/* E03:三站列表降级为紧凑辅助索引——主路线在上方长卷,异兽入口在展签内 */}
      <nav className={styles.stationIndex} aria-label="已核验站索引">
        <span className={styles.stationIndexLabel}>已核验站</span>
        <ol className={styles.stationIndexList}>
          {stations.map((s, i) => {
            const active = s.locId === currentId
            return (
              <li key={s.locId}>
                <Link
                  className={active ? `${styles.indexLink} ${styles.indexLinkOn}` : styles.indexLink}
                  to={`/journeys/nanci-yi?station=${s.locId}`}
                  aria-current={active ? 'true' : undefined}
                >
                  {i + 1} · {s.name}
                </Link>
              </li>
            )
          })}
        </ol>
      </nav>
    </div>
  )
}
