import { Link } from 'react-router-dom'
import pageStyles from '../../pages/JourneyPage.module.css'
import styles from './JournalClosing.module.css'

/**
 * R04 合卷模块(基础版,R14 精修):行至末站箕尾时的收束。
 * 回看路线(滚回长卷)/进入古卷(篇末总述)/版本说明 三个出口 + 篇末计数存疑并示。
 */
export default function JournalClosing() {
  return (
    <section className={styles.closing} aria-label="合卷">
      <p className={styles.closingKicker}>合 卷</p>
      <h3 className={styles.closingTitle}>东行九境,至此收卷</h3>
      <blockquote className={styles.closingQuote}>
        凡䧿山之首，自招摇之山，以至箕尾之山，凡十山，二千九百五十里。
        <span className={pageStyles.citeFrom}>——《南山经》篇末总述(照录)</span>
      </blockquote>
      <p className={styles.closingNote}>
        计数存疑:两源逐段实列均为九山,篇末作十山;本站按逐段里距相加校核得二千七百里,
        与篇末相差二百五十里。第十山所指文献未明,本站不作推断,照录原文并存疑。
        (详见 EDITION_AUDIT.md 差6/差7)
      </p>
      <div className={styles.closingActions}>
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
