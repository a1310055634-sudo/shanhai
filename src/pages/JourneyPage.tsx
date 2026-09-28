import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NANCI_YI_ROUTE } from '../data/journey'
import { CHAPTER_TEXTS } from '../data/chapterTexts'
import { ENTITIES } from '../data/entities'
import JournalProgress from '../components/journal/JournalProgress'
import JournalOpening from '../components/journal/JournalOpening'
import JournalScene from '../components/journal/JournalScene'
import JournalClosing from '../components/journal/JournalClosing'
import SceneLayers from '../components/journal/SceneLayers'
import JournalMotifs from '../components/journal/JournalMotifs'
import { sceneSpecFor } from '../components/journal/journalSceneSpec'
import {
  explainLead,
  readProgress,
  stationView,
  type StationView,
} from '../components/journal/journalView'
import styles from './JourneyPage.module.css'

/**
 * 南次一经·山海行旅(J10):固定路由 /journeys/nanci-yi。
 * 当前站同步到 URL(?station=);刷新/分享/返回均保持;非法参数安全回起点并提示。
 * 站点数据全部来自已逐字核验的 NANCI_YI_ROUTE,缺口如实显示。
 */
// R04:槽位派生/进度读取已迁 src/components/journal/journalView.ts

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

  const PROGRESS_KEY = 'shanhai:journey-progress'
  const sceneSpec = current?.order !== undefined
    ? sceneSpecFor(current.order)
    : { warmth: 0, farOpacity: 1, midOpacity: 1, nearOpacity: 1, profile: 'rolling' as const, mistDensity: 0.5 }

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
      {requested === null && !savedValid && (
        <JournalOpening />
      )}
      {!(requested === null && !savedValid) && (
        <header className={styles.head}>
          <p className={styles.kicker}>行旅 · 南次一经</p>
          <h1 className={styles.title}>南次一经·山海行旅</h1>
          <p className={styles.sub}>
            循原文次序自招摇之山而行;已核验的站点可停留细读,未录山段如实标注缺口。
          </p>
        </header>
      )}

      {/* R04:路线长卷迁入 JournalProgress 模块 */}
      <JournalProgress currentId={currentId} />

      {/* R07:场景底层带——远山/雾/前景山影,按当前站山序参数化 */}
      {current?.order !== undefined && (
        <div className={styles.sceneBand} aria-hidden="true">
          <SceneLayers {...sceneSpec} />
          <JournalMotifs slug={current.locId} />
        </div>
      )}

      {/* J16 修正:原条件(savedValid !== currentId)恒假——带参时 savedProgress 为 null,
          无参时 currentId 即存档站,横幅永不可达。改为无参接续时明示站点并给从起点出发的入口。 */}
      {requested === null && savedValid !== null && current && (
        <p className={styles.resume} role="status">
          已接续上次行旅,当前在{current.name}。
          <Link className={styles.resumeLink} to={`/journeys/nanci-yi?station=${current.locId}`}>
            继续行旅 →
          </Link>
          <Link className={styles.resumeLink} to={`/journeys/nanci-yi?station=${stations[0]?.locId}`}>
            从招摇重新出发 →
          </Link>
        </p>
      )}

      {invalidRequested && requested && (
        <p className={styles.invalid} role="status">
          未找到站点「{requested}」,已回到路线起点。
        </p>
      )}

      {/* R04:场景模块(展签六区);R13 featured 由场景参数表派生(仅青丘 exhibitCenter) */}
      {current && (
        <JournalScene
          current={current}
          currentIndex={currentIndex}
          totalStations={stations.length}
          segmentId={current?.station.segmentId}
          segmentText={currentStationSegment?.text}
          segmentSection={currentStationSegment?.section}
          explanation={currentEntityExplanation}
          featured={sceneSpec.exhibitCenter === true}
          prevName={currentIndex > 0 ? stations[currentIndex - 1].name : undefined}
          prevHref={currentIndex > 0 ? `/journeys/nanci-yi?station=${stations[currentIndex - 1].locId}` : undefined}
          nextName={currentIndex < stations.length - 1 ? stations[currentIndex + 1].name : undefined}
          nextHref={currentIndex < stations.length - 1 ? `/journeys/nanci-yi?station=${stations[currentIndex + 1].locId}` : undefined}
        />
      )}

      {/* R04:合卷模块——行至末站箕尾时呈现 */}
      {current?.locId === 'loc-jiwei' && (
        <JournalClosing />
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
