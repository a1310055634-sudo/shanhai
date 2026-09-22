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
        <TodayBeast />
        <ExplorePaths />
        <AtlasPreview />
        <ChapterIndex />
        <SourcePromise />
      </div>
    </>
  )
}
