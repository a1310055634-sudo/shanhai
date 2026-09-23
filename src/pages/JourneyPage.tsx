import { Link } from 'react-router-dom'
import { NANCI_YI_ROUTE, type JourneyStation } from '../data/journey'
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
export default function JourneyPage() {
  const stations = NANCI_YI_ROUTE.stations.map(stationView).filter(
    (s): s is StationView => s !== null,
  )
  const validIds = new Set(stations.map((s) => s.locId))

  const params = new URLSearchParams(window.location.search)
  const requested = params.get('station')
  const invalidRequested = requested !== null && !validIds.has(requested)

  const currentId = requested && validIds.has(requested) ? requested : stations[0]?.locId
  const currentIndex = stations.findIndex((s) => s.locId === currentId)
  const current = currentIndex >= 0 ? stations[currentIndex] : undefined

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <p className={styles.kicker}>行旅 · 南次一经</p>
        <h1 className={styles.title}>南次一经·山海行旅</h1>
        <p className={styles.sub}>
          循原文次序自招摇之山而行;已核验的站点可停留细读,未录山段如实标注缺口。
        </p>
      </header>

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
