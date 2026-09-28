import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import TodayBeast from '../components/home/TodayBeast'
import ExplorePaths from '../components/home/ExplorePaths'
import AtlasPreview from '../components/home/AtlasPreview'
import ChapterIndex from '../components/home/ChapterIndex'
import SourcePromise from '../components/home/SourcePromise'
import { CHAPTERS } from '../data/chapters'
import { getVerifiedEntities } from '../data/entities'
import { LOCATIONS } from '../data/locations'
import styles from './HomePage.module.css'

const EXHIBIT_STATS = [
  { value: getVerifiedEntities().length, label: '条目已核验' },
  { value: LOCATIONS.length, label: '处山川入图' },
  { value: CHAPTERS.length, label: '篇通行本古卷' },
]

/**
 * 卷首首页:山海开卷 → 今日异兽 → 三条探索路径 → 山川长卷预览 → 十八篇入口 → 来源承诺。
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <div className={styles.flow}>
        <section className={styles.intro} id="home-exhibit" aria-label="展陈导览">
          <div className={styles.introCopy}>
            <p className={styles.eyebrow}>展陈导览 · 编卷状态</p>
            <h2 className={styles.introTitle}>从一段原文，走进一整座山海。</h2>
            <p className={styles.introText}>
              这里不是把神怪做成数值卡牌,而是沿着篇章、山川和原文证据慢慢展开一部数字异闻志。
              每一处留白,都代表尚未核定的部分。
            </p>
          </div>
          <dl className={styles.stats}>
            {EXHIBIT_STATS.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <dt className={styles.statLabel}>{stat.label}</dt>
                <dd className={styles.statValue}>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </section>
        {/* E01:行旅主探索入口——独立横幅,整块可点;朱砂留给当前态,此处以旧金为引 */}
        <Link className={styles.journeyEntry} to="/journeys/nanci-yi" aria-label="进入南次一经山海行旅">
          <span className={styles.journeyEntryTag}>行旅 · 已开通</span>
          <span className={styles.journeyEntryMain}>
            <span className={styles.journeyEntryTitle}>南次一经·山海行旅</span>
            <span className={styles.journeyEntryText}>
              沿原文次序自招摇之山行至箕尾之山:九位置、八座已核验站、一处柢/祗待核;方向里距均按底本核验。
            </span>
          </span>
          <span className={styles.journeyEntryCta} aria-hidden="true">
            进入行旅 →
          </span>
        </Link>
        <TodayBeast />
        <ExplorePaths />
        <AtlasPreview />
        <ChapterIndex />
        <SourcePromise />
      </div>
    </>
  )
}
