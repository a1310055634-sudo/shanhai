import { Link } from 'react-router-dom'
import { buildCurrentJournalPositions } from './journalModel'
import { RuleOrnamentIcon } from '../common/Rule'
import styles from './JournalProgress.module.css'

/**
 * R06 路线进度轨:九位置地铁线式导航,由 journalModel 派生。
 * 已核验站 = Link 可点入;待核位 = span「待核」不可点;当前站 = 朱砂实心。
 */
export default function JournalProgress({ currentId }: { currentId?: string }) {
  const { positions } = buildCurrentJournalPositions()

  return (
    <nav className={styles.railWrap} aria-label="南次一经九位置路线导航">
      {/* G07 轨道端点角饰(接入点 5-6):纯装饰 */}
      <RuleOrnamentIcon kind="cloud" className={styles.railEndL} />
      <RuleOrnamentIcon kind="cloud" className={styles.railEndR} />
      <ol className={styles.rail}>
        {positions.map((pos) => {
          if (pos.kind === 'station') {
            const isCurrent = pos.locationId === currentId
            return (
              <li key={pos.locationId} className={styles.railStop}>
                <Link
                  to={`/journeys/nanci-yi?station=${pos.locationId}`}
                  className={
                    isCurrent ? `${styles.railStop} ${styles.railStopCurrent}` : styles.railStop
                  }
                  aria-current={isCurrent ? 'true' : undefined}
                >
                  <span className={styles.railNum}>{pos.mountainOrder}</span>
                  <span className={styles.railName}>{pos.name.replace('之山', '')}</span>
                </Link>
              </li>
            )
          }
          const variants = 'variants' in pos ? pos.variants : []
          return (
            <li key={`gap-${pos.mountainOrder}`} className={styles.railStop}>
              <span
                className={`${styles.railStop} ${styles.railStopGap}`}
                aria-label={`${pos.displayName}(第${pos.mountainOrder}山),用字两源互异,待核验,不可进入`}
              >
                <span className={styles.railNum}>{pos.mountainOrder}</span>
                <span className={styles.railDualChar}>
                  {variants.length === 2
                    ? variants.map((v) => v.name.replace('之山', '')).join('/')
                    : pos.displayName.replace('之山', '')}
                </span>
                <span className={styles.railPend}>待核</span>
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
