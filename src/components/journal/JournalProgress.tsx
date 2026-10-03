import { Link } from 'react-router-dom'
import { buildCurrentJournalPositions } from './journalModel'
import { RuleOrnamentIcon } from '../common/Rule'
import shitaoLandscape from '../../assets/paintings/shitao-landscape.jpg'
import styles from './JournalProgress.module.css'

/**
 * R06 路线进度轨:九位置地铁线式导航,由 journalModel 派生。
 * 已核验站 = Link 可点入;待核位 = span「待核」不可点;当前站 = 朱砂实心。
 */
export default function JournalProgress({ currentId }: { currentId?: string }) {
  const { positions } = buildCurrentJournalPositions()

  return (
    <nav className={styles.railWrap} aria-label="南次一经九位置路线导航">
      {/* G46 行旅画卷化:石涛山水扇页作长卷底画(羽化淡墨,轨道浮其上=古今对撞;
          SceneLayers 柢山雾感与站色参数不动);lazy:长卷非 LCP 主元素 */}
      <div className={styles.paintBg} aria-hidden="true">
        <img
          src={shitaoLandscape}
          alt=""
          width={1600}
          height={774}
          loading="lazy"
        />
      </div>
      {/* G07 轨道端点角饰(接入点 5-6):纯装饰 */}
      <RuleOrnamentIcon kind="cloud" className={styles.railEndL} />
      <RuleOrnamentIcon kind="cloud" className={styles.railEndR} />
      {/* G65 长卷装裱补全:引首题签(卷首,竖排楷体浮签)+跋尾印(卷尾,朱砂白文「山海」);
          装饰层 aria-hidden(信息已由 nav aria-label 与站名承载),零交互零动画;
          ≤640 档改静态度行(签在卷上/跋尾在卷下,不遮 3×3 网格) */}
      <div className={styles.frontTag} aria-hidden="true">山海行旅</div>
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
            <li
              key={`gap-${pos.mountainOrder}`}
              className={`${styles.railStop} ${styles.railStopGapLi}`}
            >
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
      <div className={styles.endColophon} aria-hidden="true">
        <span className={styles.colophonText}>据《南山经》原文次第演绎</span>
        <span className={styles.colophonSeal}>山海</span>
      </div>
    </nav>
  )
}
