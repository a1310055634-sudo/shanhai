import { Link } from 'react-router-dom'
import BeastArtwork from '../art/BeastArtwork'
import { classicArtFor } from '../../data/classicArt'
import { ENTITIES } from '../../data/entities'
import { cnNum, stationVariantLead } from './journalView'
import type { StationView } from './journalView'
import JournalEvidence from './JournalEvidence'
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
  /** R13 展品显现:版画升为满幅中心展台(由 sceneSpec.exhibitCenter 派生,仅青丘) */
  featured?: boolean
}

/** R04 场景模块(自 E06 展签迁入):序号山名/原文/释义 + 侧栏版画/异兽/古卷/前后行旅。
 *  R13:已核异文以独立分层行可见(数据派生);featured 站以展台呈现版画,并明示
 *  原始记载与后世流变的边界——不新增任何古籍事实,只引用既有已核分层。 */
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
  featured = false,
}: JournalSceneProps) {
  const variantLead = stationVariantLead(current.locId)
  const entity = current.entitySlug
    ? ENTITIES.find((e) => e.slug === current.entitySlug)
    : undefined
  const artRecord = current.entitySlug ? classicArtFor(current.entitySlug) : undefined
  const hasLaterReception = (entity?.laterReception?.length ?? 0) > 0

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
        {/* R13:版本异文独立分层,不入原文引文;全句见古卷对照页 */}
        {variantLead && (
          <p className={styles.variantLine}>
            <span className={styles.variantTag}>异文</span>
            <span>{variantLead}</span>
            <Link
              className={styles.variantLink}
              to={`/chapters/nanshan-jing#${segmentId ?? ''}`}
              aria-label="在古卷对照页查看完整异文记录"
            >
              见古卷对照 →
            </Link>
          </p>
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
        {/* R15:统一证据入口——出处底本/核验状态/版本异文收进抽屉,不塞满主场景 */}
        <JournalEvidence locId={current.locId} segmentId={segmentId} />
      </div>
      <aside className={pageStyles.signRail} aria-label="关联异兽与延伸行旅">
        {current.entitySlug ? (
          featured ? (
            /* 展台模式下侧栏只留文字链接,不重复渲染同一幅版画 */
            <div className={pageStyles.signArtZone}>
              <p className={styles.sceneRailLabel}>关联异兽</p>
              <Link className={pageStyles.signBeastLink} to={`/catalog/${current.entitySlug}`}>
                {current.entityName} →
              </Link>
            </div>
          ) : (
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
          )
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
      {/* R13 展品显现:版画郑重居中,题签/出处/边界注随展;详见 IMMERSIVE_DESIGN 展台规范 */}
      {featured && current.entitySlug && (
        <figure className={styles.featuredExhibit}>
          <span className={styles.featuredTag}>主展品 · {current.name}</span>
          <Link
            className={styles.featuredArt}
            to={`/catalog/${current.entitySlug}`}
            aria-label={`查看异兽「${current.entityName}」完整条目`}
          >
            <BeastArtwork
              slug={current.entitySlug}
              name={current.entityName ?? ''}
              variant="detail"
            />
          </Link>
          <figcaption className={styles.featuredCaption}>
            <span className={styles.featuredTitle}>{current.entityName}</span>
            <span>{artRecord?.source ?? '据原文描述艺术演绎'}</span>
            {artRecord?.sourceUrl && (
              <a
                className={styles.featuredSource}
                href={artRecord.sourceUrl}
                target="_blank"
                rel="noreferrer"
              >
                版画出处(File 页) ↗
              </a>
            )}
            {/* 边界声明:明示原始记载与后世形象分属两层,后续流变见条目「后世流变」 */}
            {hasLaterReception && (
              <span className={styles.boundaryNote}>
                原始记载止于《南山经》原文此句;后世祥瑞、妖异等形象属文献流变,
                与本展签分属不同内容层,此处不混入——详见条目「后世流变」。
              </span>
            )}
          </figcaption>
        </figure>
      )}
    </section>
  )
}
