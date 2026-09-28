import { Link } from 'react-router-dom'
import { CHAPTER_TEXTS } from '../../data/chapterTexts'
import { buildCurrentJournalPositions } from './journalModel'
import pageStyles from '../../pages/JourneyPage.module.css'
import styles from './JournalClosing.module.css'

/**
 * R04 合卷模块,R14 升级为终幕:行至末站箕尾时的收束。
 * 东海意象已由场景层承担;此处提供——
 * ①回看路线(九位置回环,已核站可点回跳);②篇末总述照录+计数存疑并示
 * (引文与存疑说明均派生自 chapterTexts 的 seg-ns1-tongji / seg-ns1-tongji-note,
 * 不另维护一份手写考据);③进入古卷/版本说明/从招摇再出发 三个出口。
 */
export default function JournalClosing() {
  const segments = CHAPTER_TEXTS['nanshan-jing']?.segments ?? []
  const tongji = segments.find((s) => s.id === 'seg-ns1-tongji')
  const tongjiNote = segments.find((s) => s.id === 'seg-ns1-tongji-note')
  const { positions } = buildCurrentJournalPositions()

  return (
    <section className={styles.closing} aria-label="合卷">
      <p className={styles.closingKicker}>合 卷</p>
      <h3 className={styles.closingTitle}>东行九境,至此收卷</h3>
      <p className={styles.closingEcho}>
        山尾踆于东海,海面向远方敞开——行旅自西海之滨的招摇来,至此与海相合。
      </p>

      {/* 回看路线:九位置回环,已核站可点回跳,待核位如实标注 */}
      <nav className={styles.closingRecap} aria-label="回看路线">
        <span className={styles.recapLabel}>回看路线</span>
        <ol className={styles.recapList}>
          {positions.map((pos) =>
            pos.kind === 'station' ? (
              <li key={pos.locationId}>
                <Link
                  className={styles.recapStop}
                  to={`/journeys/nanci-yi?station=${pos.locationId}`}
                >
                  {pos.mountainOrder} · {pos.name.replace('之山', '')}
                </Link>
              </li>
            ) : (
              <li key={pos.mountainOrder}>
                <span
                  className={`${styles.recapStop} ${styles.recapGap}`}
                  aria-label={`${pos.displayName}(第${pos.mountainOrder}山),待核验`}
                >
                  {pos.mountainOrder} · {pos.displayName.replace('之山', '')} · 待核
                </span>
              </li>
            ),
          )}
        </ol>
      </nav>

      {tongji && tongji.kind === 'text' && (
        <blockquote className={styles.closingQuote}>
          {tongji.text}
          <span className={pageStyles.citeFrom}>——《南山经》篇末总述(照录)</span>
        </blockquote>
      )}
      {tongjiNote && tongjiNote.kind === 'gap' && tongjiNote.note && (
        <p className={styles.closingNote}>存疑并示:{tongjiNote.note}</p>
      )}

      <div className={styles.closingActions}>
        <Link className={styles.closingPrimary} to="/journeys/nanci-yi?station=loc-zhaoyao">
          从招摇再出发 →
        </Link>
        <Link className={styles.closingLink} to="/chapters/nanshan-jing#seg-ns1-tongji">
          进入古卷·篇末总述 →
        </Link>
        <Link className={styles.closingLink} to="/about">
          版本与来源说明 →
        </Link>
      </div>
    </section>
  )
}
