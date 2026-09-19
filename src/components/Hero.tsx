import { Link } from 'react-router-dom'
import { usePointerParallax } from '../hooks/usePointerParallax'
import StarField from './scene/StarField'
import CloudSea from './scene/CloudSea'
import { FarRanges, NearRidge } from './scene/MountainRanges'
import WaterRipples from './scene/WaterRipples'
import BeastSilhouette from './scene/BeastSilhouette'
import styles from './Hero.module.css'

/**
 * 首屏「山海开卷」:远山、云海、水纹、星宿与异兽剪影构成四层以上景深。
 * 视差由 usePointerParallax 驱动(仅 transform,≤18px,精确指针设备启用),
 * prefers-reduced-motion 与窄屏下自动降级为静态。
 */
export default function Hero() {
  const ref = usePointerParallax<HTMLElement>()

  return (
    <section className={styles.hero} ref={ref} aria-label="山海开卷">
      <div className={styles.scene} aria-hidden="true">
        <div className={`${styles.layer} ${styles.lStars}`}>
          <StarField />
        </div>
        <div className={`${styles.layer} ${styles.lFar}`}>
          <FarRanges />
        </div>
        <div className={`${styles.layer} ${styles.lClouds}`}>
          <CloudSea />
        </div>
        <div className={`${styles.layer} ${styles.lWater}`}>
          <WaterRipples />
        </div>
        <div className={styles.layer}>
          <NearRidge />
        </div>
        <div className={`${styles.layer} ${styles.lMid}`}>
          <div className={styles.beastBox}>
            <BeastSilhouette />
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <p className={styles.kicker}>
          <span className={styles.seal} aria-hidden="true">
            山
          </span>
          <span className={styles.kickerText}>山海万象录 · 卷之一 · 开卷</span>
        </p>
        <h1 className={styles.title}>山海有灵，万物入卷</h1>
        <p className={styles.subtitle}>循古卷而行，访群山、诸神、异兽与远方之国。</p>
        <div className={styles.actions}>
          <Link className={styles.primary} to="/explore">
            入卷探索
          </Link>
          <Link className={styles.ghost} to="/catalog">
            查看异兽图鉴
          </Link>
        </div>
      </div>

      <p className={styles.caption}>据古籍意象艺术演绎</p>
    </section>
  )
}
