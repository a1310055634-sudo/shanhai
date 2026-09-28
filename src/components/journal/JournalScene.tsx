import { Link } from 'react-router-dom'
import BeastArtwork from '../art/BeastArtwork'
import { classicArtFor } from '../../data/classicArt'
import { cnNum } from './journalView'
import type { StationView } from './journalView'
import pageStyles from '../../pages/JourneyPage.module.css'
import styles from './JournalScene.module.css'

interface JournalSceneProps {
  current: StationView
  currentIndex: number
  totalStations: number
  segmentId?: string
  segmentText?: string
  segmentSection?: string
  explanation?: string
  prevName?: string
  prevHref?: string
  nextName?: string
  nextHref?: string
}

/** R04 场景模块(自 E06 展签迁入):序号山名/原文/释义 + 侧栏版画/异兽/古卷/前后行旅。 */
export default function JournalScene({
  current,
  currentIndex,
  totalStations,
  segmentId,
  segmentText,
  segmentSection,
  explanation,
  prevName,
  prevHref,
  nextName,
  nextHref,
}: JournalSceneProps) {
  return (
    <section className={pageStyles.current} aria-label="当前站点">
      <div className={pageStyles.signMain}>
        <p className={pageStyles.currentKicker}>
          当前站点 · 南次一经第{cnNum(current.order)}山 · 已核验行旅第{' '}
          {currentIndex + 1} / {totalStations} 站
        </p>
        <h2 className={pageStyles.currentName}>{current.name}</h2>
        {segmentText && (
          <blockquote className={pageStyles.currentCite}>
            <span className={pageStyles.citeTag}>原文</span>
            {segmentText}
            <span className={pageStyles.citeFrom}>
              ——《南山经》· {segmentSection}(节选)
            </span>
          </blockquote>
        )}
        {explanation ? (
          <div className={pageStyles.currentExplain}>
            <p className={pageStyles.explainTag}>本站释义(节选)</p>
            <p className={pageStyles.explainText}>{explanation}</p>
          </div>
        ) : (
          <p className={pageStyles.currentMuted}>
            本站释义待与原文同批核验后呈现。
          </p>
        )}
      </div>
      <aside className={pageStyles.signRail} aria-label="关联异兽与延伸行旅">
        {current.entitySlug ? (
          <div className={pageStyles.signArtZone}>
            <Link
              className={pageStyles.signArt}
              to={`/catalog/${current.entitySlug}`}
              aria-label={`查看异兽「${current.entityName}」完整条目`}
            >
              <BeastArtwork
                slug={current.entitySlug}
                name={current.entityName ?? ''}
                variant="card"
              />
            </Link>
            <span className={pageStyles.signArtNote}>
              {classicArtFor(current.entitySlug)?.source ?? '据原文描述艺术演绎'}
            </span>
            <p className={styles.sceneRailLabel}>关联异兽</p>
            <Link className={pageStyles.signBeastLink} to={`/catalog/${current.entitySlug}`}>
              {current.entityName} →
            </Link>
          </div>
        ) : (
          <p className={pageStyles.currentMuted}>本站暂无已核验异兽条目。</p>
        )}
        <p className={styles.sceneRailLabel}>进入古卷</p>
        <Link
          className={pageStyles.signChapterLink}
          to={`/chapters/nanshan-jing#${segmentId ?? ''}`}
        >
          《南山经》对应段落 →
        </Link>
        <p className={styles.sceneRailLabel}>前后行旅</p>
        <div className={pageStyles.currentNav}>
          {prevHref && (
            <Link className={pageStyles.navLink} to={prevHref}>
              ← 上一站 · {prevName}
            </Link>
          )}
          {nextHref && (
            <Link className={pageStyles.navLink} to={nextHref}>
              下一站 · {nextName} →
            </Link>
          )}
        </div>
      </aside>
    </section>
  )
}
