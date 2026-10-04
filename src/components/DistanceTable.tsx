import { useMemo } from 'react'
import { buildDistanceRows, buildDistanceSummary, cnNum, type DistanceClassic } from '../data/distances'
import styles from './DistanceTable.module.css'

/**
 * 里距对照(G26 建南次一经;G30 参数化增南次二经):原文照录句与
 * 「本站概念坐标」并置,逐项歧义照录不裁决。挂南山经古卷篇末。
 * 调试钩子 __distanceCheck 供 DOM 断言(模型层与 DOM 同源,页面内可复核)。
 * 二经六山图鉴有载而行旅未设站(NANCI_YI_ROUTE 仅一经),徽章三态区分。
 */
export default function DistanceTable({ classic = 'ns1' }: { classic?: DistanceClassic }) {
  const rows = useMemo(() => buildDistanceRows(classic), [classic])
  const summary = useMemo(() => buildDistanceSummary(classic), [classic])
  const isNs2 = classic === 'ns2'

  return (
    <section
      className={styles.block}
      aria-label={isNs2 ? '南次二经里距对照' : '南次一经里距对照'}
      data-distance-table={classic}
    >
      <header className={styles.head}>
        <h2 className={styles.title}>{isNs2 ? '里距对照(南次二经)' : '里距对照'}</h2>
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
                {row.stationNo != null
                  ? `行旅第${cnNum(row.stationNo)}站 · 图鉴有载`
                  : row.pending
                    ? '待核 · 不设站'
                    : '图鉴有载 · 行旅未设站'}
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

      <dl className={styles.summary} data-distance-summary={classic}>
        <div className={styles.sumRow}>
          <dt className={styles.sumTerm}>篇末原文</dt>
          <dd className={styles.sumQuote}>{summary.tongjiText}</dd>
        </div>
        <div className={styles.sumRow}>
          <dt className={styles.sumTerm}>{isNs2 ? '本站逐段相加(已录山)' : '本站逐段相加'}</dt>
          <dd className={styles.sumCalc}>
            {summary.segments.join(' + ')} = {summary.sum} 里
            <span className={styles.calcTag}>本站计算,非古籍原文</span>
          </dd>
        </div>
        <div className={styles.sumRow}>
          <dt className={styles.sumTerm}>存疑照录</dt>
          <dd className={styles.doubt}>
            {isNs2 ? (
              <ul className={styles.doubtList}>
                <li>
                  篇末作「凡{cnNum(summary.mountainsInText)}山」;底本B1页面南次二经实列十七山
                  (自柜山至漆吴之山),与篇末数合——四源对读已核(G84/G85),实列计数与篇末数相合。
                </li>
                <li>
                  十七山已全录(G85 咸陰之山经四源对读录入,勘误见疑15):逐段相加 {summary.sum} 里,篇末作{' '}
                  {summary.totalInText} 里——相差 {cnNum(Math.abs(summary.delta))} 里,缺口所指文献未明,如实存疑不裁决。
                </li>
                <li>
                  羽山郭注「計此道里不相應,似非也」系郭璞自注此山道里与实地方位不合,照录注层,非本站意见。
                </li>
              </ul>
            ) : (
              <ul className={styles.doubtList}>
                <li>
                  实列{cnNum(summary.countedMountains)}山,篇末作「凡{cnNum(summary.mountainsInText)}山」——千年校勘公案,本站不推断所指。
                </li>
                <li>
                  逐段相加 {summary.sum} 里,篇末作 {summary.totalInText} 里,相差 {summary.delta} 里——缺口所指文献未明。
                </li>
                <li>柢山两源用字(柢/祗)与「又」字互异——待核,详见篇内待录入注。</li>
              </ul>
            )}
          </dd>
        </div>
      </dl>
    </section>
  )
}
