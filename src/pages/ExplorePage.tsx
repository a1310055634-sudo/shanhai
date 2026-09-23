import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import { getVerifiedEntities } from '../data/entities'
import { LOCATIONS } from '../data/locations'
import { NANCI_YI_ROUTE } from '../data/journey'
import styles from './ExplorePage.module.css'

/** 山海行旅路线:由结构化路线数据生成(J09),只列已逐字核验的山川站。 */
const JOURNEY = NANCI_YI_ROUTE.stations

const JOURNEY_2 = [{ locId: 'loc-danxue', note: '南次三经第三山' }]

/** 按本地日期稳定推荐(每日一卷)。 */
function dayIndexOf(length: number): number {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const day = Math.floor((now.getTime() - start.getTime()) / 86400000)
  return day % length
}

/**
 * 探索(规范第七节):随机翻卷、每日一卷、山海行旅。
 * 关联漫游与线索识兽待条目扩充后开放。
 */
export default function ExplorePage() {
  const navigate = useNavigate()
  const verified = useMemo(() => getVerifiedEntities(), [])
  const daily = verified[dayIndexOf(verified.length)]

  const randomRoll = () => {
    const pick = verified[Math.floor(Math.random() * verified.length)]
    navigate(`/catalog/${pick.slug}`)
  }

  const stationOf = (locId: string) => {
    const loc = LOCATIONS.find((l) => l.id === locId)!
    const entity = verified.find((e) => loc.relatedEntityIds.includes(e.id))
    return { loc, entity }
  }

  return (
    <div className={styles.page}>
      <SectionHeading
        index="游"
        title="探索"
        subtitle="TAN SUO"
        note="三种玩法均只使用已逐字核验的条目;线索识兽与关联漫游将随条目扩充开放。"
        level={1}
      />

      <div className={styles.grid}>
        {/* 随机翻卷 */}
        <section className={styles.card} aria-label="随机翻卷">
          <p className={styles.cardIndex}>其一</p>
          <h2 className={styles.cardTitle}>随机翻卷</h2>
          <p className={styles.cardDesc}>
            从 {verified.length} 条已核验条目中随机抽出一卷,展开即是缘分。
          </p>
          <button type="button" className={styles.action} onClick={randomRoll}>
            抽一卷
          </button>
        </section>

        {/* 每日一卷 */}
        <section className={styles.card} aria-label="每日一卷">
          <p className={styles.cardIndex}>其二</p>
          <h2 className={styles.cardTitle}>每日一卷</h2>
          {daily && (
            <>
              <p className={styles.daily}>
                今日推荐:
                <Link className={styles.dailyName} to={`/catalog/${daily.slug}`}>
                  {daily.canonicalName}
                </Link>
                <span className={styles.dailyPinyin}>{daily.pinyin}</span>
              </p>
              <p className={styles.cardDesc}>
                按当日日期固定推荐,全站同日同卷;明日另换。
              </p>
              <Link className={styles.action} to={`/catalog/${daily.slug}`}>
                展开今日卷
              </Link>
            </>
          )}
        </section>
      </div>

      {/* 山海行旅 */}
      <section className={styles.journey} aria-label="山海行旅">
        <div className={styles.journeyHead}>
          <h2 className={styles.cardTitle}>山海行旅</h2>
          <p className={styles.journeyNote}>
            依原文地点顺序逐站行走;只列已核验之站,缺口如实标注。
          </p>
        </div>

        <div className={styles.journeyHead}>
          <p className={styles.routeName}>路线一 · 南次一经</p>
          <Link className={styles.journeyEnter} to="/journeys/nanci-yi">
            进入行旅 →
          </Link>
        </div>
        <ol className={styles.stations}>
          {JOURNEY.map((station, i) => {
            const { loc, entity } = stationOf(station.locationId)
            return (
              <li key={station.locationId} className={styles.station}>
                <span className={styles.stationNo}>{i + 1}</span>
                <div className={styles.stationBody}>
                  <p className={styles.stationLoc}>{loc.canonicalName}</p>
                  <p className={styles.stationNote}>{station.note}</p>
                </div>
                {entity && (
                  <Link className={styles.stationLink} to={`/catalog/${entity.slug}`}>
                    {entity.canonicalName} →
                  </Link>
                )}
                {station.segmentId && (
                  <Link
                    className={styles.stationText}
                    to={`/chapters/nanshan-jing#${station.segmentId}`}
                    aria-label={`查看${loc.canonicalName}对应原文`}
                  >
                    原文
                  </Link>
                )}
              </li>
            )
          })}
        </ol>

        <p className={styles.routeName}>路线二 · 南次三经(首站已通)</p>
        <ol className={styles.stations}>
          {JOURNEY_2.map(({ locId, note }) => {
            const { loc, entity } = stationOf(locId)
            return (
              <li key={locId} className={styles.station}>
                <span className={styles.stationNo}>1</span>
                <div className={styles.stationBody}>
                  <p className={styles.stationLoc}>{loc.canonicalName}</p>
                  <p className={styles.stationNote}>{note}(前后诸站待录入)</p>
                </div>
                {entity && (
                  <Link className={styles.stationLink} to={`/catalog/${entity.slug}`}>
                    {entity.canonicalName} →
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
        <p className={styles.journeyFoot}>
          西山经一线(泰器之山→槐江之山→昆仑之山,相邻关系已核)将在行旅地图轮加入。
        </p>
      </section>
    </div>
  )
}
