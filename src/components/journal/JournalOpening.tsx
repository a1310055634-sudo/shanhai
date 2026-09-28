import { Link } from 'react-router-dom'
import styles from './JournalOpening.module.css'

/**
 * R04 开卷模块(基础版,R05 精修视觉):新用户(无 station 参数且无进度)看到的开卷。
 * 九位置/八已核/一待核说明 + 非真实地理声明;进入按钮链到起点招摇。
 */
export default function JournalOpening() {
  return (
    <section className={styles.opening} aria-label="开卷:一卷九境">
      <p className={styles.openingKicker}>行旅 · 南次一经 · 开卷</p>
      <h1 className={styles.openingTitle}>一卷九境</h1>
      <p className={styles.openingSub}>南次一经·山海行旅</p>
      <p className={styles.openingText}>
        自䧿山之首招摇之山启程,循原文次序东行,至箕尾之山收卷。
        八座山川已经双源逐字核验;第五山柢/祗用字两源互异,暂作留白,如实以待核呈现。
      </p>
      <div className={styles.openingActions}>
        <Link
          className={styles.startBtn}
          to="/journeys/nanci-yi?station=loc-zhaoyao"
        >
          从招摇之山出发 →
        </Link>
      </div>
      <p className={styles.openingStats}>九个位置 · 八座已核验站 · 一处待核(柢/祗)</p>
      <p className={styles.openingDisclaimer}>
        本卷为古籍叙事顺序示意,非现实地理位置;原文均经双源逐字核验。
      </p>
    </section>
  )
}
