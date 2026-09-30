import { Link } from 'react-router-dom'
import styles from './JournalOpening.module.css'

interface JournalOpeningProps {
  /** 老用户:有进度时显示「继续行旅」目标站名与链接 */
  lastStationName?: string
  lastStationHref?: string
}

/**
 * R05 开卷首屏:西海/远山/前景三层景深 + 宣纸承载面;
 * 新用户明确起点(从招摇出发),老用户给「继续行旅」入口。
 * 静态构图,无自动动效;reduced-motion 下不变(本模块本就无动画)。
 */
export default function JournalOpening({
  lastStationName,
  lastStationHref,
}: JournalOpeningProps) {
  return (
    <section className={styles.opening} aria-label="开卷:一卷九境">
      {/* 场景景深:远山/海面/前景山影(纯装饰,aria-hidden) */}
      <svg
        className={styles.openingScene}
        viewBox="0 0 1440 520"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
        focusable="false"
      >
        <rect width="1440" height="520" fill="#0d1311" />
        {/* 月与微光:西海意象的天区 */}
        <circle cx="1120" cy="96" r="46" fill="#f3eee2" opacity="0.14" />
        <circle cx="1120" cy="96" r="26" fill="#f3eee2" opacity="0.1" />
        {/* 远山两重 */}
        <path
          d="M0 236 L120 200 L260 228 L420 186 L580 224 L740 192 L900 226 L1060 194 L1220 222 L1440 198 L1440 340 L0 340 Z"
          fill="#31545a"
          opacity="0.32"
        />
        <path
          d="M0 282 L160 252 L330 276 L520 240 L710 272 L900 248 L1090 274 L1280 250 L1440 268 L1440 380 L0 380 Z"
          fill="#587367"
          opacity="0.22"
        />
        {/* 海面:长横线与微光 */}
        <g stroke="#587367" opacity="0.3">
          <line x1="40" y1="330" x2="1400" y2="330" strokeWidth="1" />
          <line x1="120" y1="352" x2="1320" y2="352" strokeWidth="0.8" opacity="0.6" />
        </g>
        {/* 前景山影收底 */}
        <path
          d="M0 448 L180 404 L380 442 L600 396 L820 440 L1040 402 L1260 438 L1440 410 L1440 520 L0 520 Z"
          fill="#0a100e"
          opacity="0.9"
        />
      </svg>

      {/* G06 书衣式竖排题签:纯装饰,kicker 已承载同等信息 */}
      <div className={styles.titleSlip} aria-hidden="true">
        <span className={styles.slipText}>南次一经</span>
        <span className={styles.slipSeal}>旅</span>
      </div>

      {/* 宣纸承载面:标题与操作落在稳定文字区 */}
      <div className={styles.openingPanel}>
        <p className={styles.openingKicker}>行旅 · 南次一经 · 开卷</p>
        <h1 className={styles.openingTitle}>一卷九境</h1>
        <p className={styles.openingSub}>南次一经·山海行旅</p>
        <p className={styles.openingText}>
          自䧿山之首招摇之山启程,临西海,多桂多金玉;循原文次序东行,
          至箕尾之山尾踆于东海处收卷。八座山川已经双源逐字核验;
          第五山柢/祗用字两源互异,如实留白以待考。
        </p>
        <div className={styles.openingActions}>
          <Link className={styles.startBtn} to="/journeys/nanci-yi?station=loc-zhaoyao">
            从招摇之山出发 →
          </Link>
          {lastStationName && lastStationHref && (
            <Link className={styles.resumeBtn} to={lastStationHref}>
              继续行旅 · {lastStationName} →
            </Link>
          )}
        </div>
        <p className={styles.openingStats}>
          九个位置 · 八座已核验站 · 一处待核(柢/祗,见 EDITION_AUDIT)
        </p>
        <p className={styles.openingDisclaimer}>
          本卷为古籍叙事顺序示意,非现实地理位置;原文均经双源逐字核验。
        </p>
      </div>
    </section>
  )
}
