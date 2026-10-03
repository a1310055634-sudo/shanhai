import { Link } from 'react-router-dom'
import { usePointerParallax } from '../hooks/usePointerParallax'
import zhengxieOrchids from '../assets/paintings/zhengxie-orchids-bamboo.jpg'
import Transcriber from './Transcriber'
import InkReveal from './InkReveal'
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
      {/* 画卷通栏底画(2026-10-03 用户反馈修正,POST-G58;原 G42 定宽贴片存在感不足):
          公版古画(〔清〕郑燮 兰竹图)贴 hero 底边通栏升起,上缘线性羽化溶入墨夜,
          opacity .42 压成大气层(矩形扫描件的硬边由贴边+羽化双路消除)。
          场景 SVG 层绘制其上(异兽剪影行于古画上=古今对撞);文字层 z2。
          G43 誊抄 / G44 墨痕显影在本层落位(data-hero-paint 锚)。
          装饰背景:alt 留空+aria-hidden。 */}
      <div className={styles.heroPaint} aria-hidden="true" data-hero-paint="">
        <img
          className={styles.heroPaintImg}
          src={zhengxieOrchids}
          alt=""
          width={1600}
          height={812}
          loading="eager"
        />
        <InkReveal />
      </div>
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

      {/* G06 书衣式竖排题签:纯装饰,kicker 已承载同等信息;无交互不影响焦点路径 */}
      <div className={styles.titleSlip} aria-hidden="true">
        <span className={styles.slipText}>山海万象录</span>
        <span className={styles.slipSeal}>山</span>
      </div>

      <div className={styles.content}>
        <p className={styles.kicker}>
          <span className={styles.seal} aria-hidden="true">
            山
          </span>
          <span className={styles.kickerText}>山海万象录 · 卷之一 · 开卷</span>
        </p>
        <h1 className={styles.title}>山海有灵，万物入卷</h1>
        <p className={styles.subtitle}>
          {/* G43 誊抄机:逐字显形+墨点光标,速度/防跳版/降级见组件头注 */}
          <Transcriber text="循古卷而行，访群山、诸神、异兽与远方之国。" />
        </p>
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
      <a className={styles.scrollCue} href="#home-exhibit">
        <span className={styles.scrollMark} aria-hidden="true">↓</span>
        <span>向下开卷</span>
      </a>
    </section>
  )
}
