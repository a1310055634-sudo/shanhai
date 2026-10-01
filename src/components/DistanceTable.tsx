import { useMemo } from 'react'
import { buildDistanceRows, buildDistanceSummary, cnNum } from '../data/distances'
import styles from './DistanceTable.module.css'

/**
 * 南次一经·里距对照(G26):原文照录句与「本站概念坐标」并置,
 * 逐项歧义照录不裁决。挂南山经古卷篇末。
 * 调试钩子 __distanceCheck 供 DOM 断言(模型层与 DOM 同源,页面内可复核)。
 */
export default function DistanceTable() {
  const rows = useMemo(() => buildDistanceRows(), [])
  const summary = useMemo(() => buildDistanceSummary(), [])

  return (
    <section className={styles.block} aria-label="南次一经里距对照" data-distance-table>
      <header className={styles.head}>
        <h2 className={styles.title}>里距对照</h2>
        <p className={styles.note}>
          引文为原文照录;「X 里」与行旅站序为本站解析标注,非古籍原文。歧义照录,本站不裁决。
        </p>
      </header>

      <ol className={styles.list}>
        {rows.map((row) => (
          <li
            key={row.name}
            className={row.pending ? `${styles.row} ${styles.rowPending}` : styles.row}
            data-distance-row={row.name}
          >
            <div className={styles.rowHead}>
              <span className={styles.order}>第{cnNum(row.order)}山</span>
              <span className={styles.name}>{row.name}</span>
              <span className={row.stationNo != null ? styles.station : styles.stationPending}>
                {row.stationNo != null ? `行旅第${cnNum(row.stationNo)}站 · 图鉴有载` : '待核 · 不设站'}
              </span>
            </div>
            <div className={styles.quotes}>
              {row.quotes.length === 0 && <span className={styles.noQuote}>—</span>}
              {row.quotes.length === 1 && (
                <span className={styles.quote}>{row.quotes[0].text}</span>
              )}
              {row.quotes.length > 1 &&
                row.quotes.map((q) => (
                  <span key={q.source} className={styles.quoteAlt}>
                    <span className={styles.quote}>{q.text}</span>
                    <span className={styles.quoteSrc}>{q.source}</span>
                  </span>
                ))}
            </div>
            <div className={styles.rowFoot}>
              <span className={styles.li}>{row.li != null ? `${row.li} 里` : '—'}</span>
              {row.note && <span className={styles.rowNote}>{row.note}</span>}
            </div>
          </li>
        ))}
      </ol>

      <dl className={styles.summary} data-distance-summary>
        <div className={styles.sumRow}>
          <dt className={styles.sumTerm}>篇末原文</dt>
          <dd className={styles.sumQuote}>{summary.tongjiText}</dd>
        </div>
        <div className={styles.sumRow}>
          <dt className={styles.sumTerm}>本站逐段相加</dt>
          <dd className={styles.sumCalc}>
            {summary.segments.join(' + ')} = {summary.sum} 里
            <span className={styles.calcTag}>本站计算,非古籍原文</span>
          </dd>
        </div>
        <div className={styles.sumRow}>
          <dt className={styles.sumTerm}>存疑照录</dt>
          <dd className={styles.doubt}>
            <ul className={styles.doubtList}>
              <li>
                实列{cnNum(summary.countedMountains)}山,篇末作「凡{cnNum(summary.mountainsInText)}山」——千年校勘公案,本站不推断所指。
              </li>
              <li>
                逐段相加 {summary.sum} 里,篇末作 {summary.totalInText} 里,相差 {summary.delta} 里——缺口所指文献未明。
              </li>
              <li>柢山两源用字(柢/祗)与「又」字互异——待核,详见篇内待录入注。</li>
            </ul>
          </dd>
        </div>
      </dl>
    </section>
  )
}
