import styles from './JourneyScenery.module.css'

/**
 * E04 行旅长卷山水底层(纯装饰,aria-hidden):
 * 远景青绿轮廓 — 中景云水 — 前景山影,三层量极轻,不与文字争读。
 * 数据与位置无关;只提供氛围,不表示现实地理。
 */
export default function JourneyScenery() {
  return (
    <svg
      className={styles.scenery}
      viewBox="0 0 1280 200"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      {/* 远景:两层青绿山影 */}
      <path
        d="M0 118 L90 84 L170 112 L260 70 L350 110 L455 78 L560 116 L660 88 L770 118 L880 80 L985 112 L1090 86 L1190 114 L1280 92 L1280 200 L0 200 Z"
        fill="var(--rock-cyan)"
        opacity="0.14"
      />
      <path
        d="M0 138 L110 112 L230 134 L360 104 L490 132 L620 110 L750 134 L880 108 L1010 132 L1140 112 L1280 130 L1280 200 L0 200 Z"
        fill="var(--verdigris)"
        opacity="0.1"
      />
      {/* 中景云水:横向雾带 */}
      <ellipse cx="300" cy="150" rx="260" ry="16" fill="var(--verdigris)" opacity="0.09" />
      <ellipse cx="880" cy="158" rx="320" ry="14" fill="var(--verdigris)" opacity="0.08" />
      <ellipse cx="620" cy="146" rx="180" ry="10" fill="var(--paper)" opacity="0.05" />
      {/* 前景山影:压住底边,带一线旧金脊 */}
      <path
        d="M0 200 L120 164 L236 190 L380 150 L520 188 L640 160 L790 192 L920 156 L1060 190 L1180 162 L1280 186 L1280 200 Z"
        fill="#0a100e"
        opacity="0.92"
      />
      <path
        d="M120 164 L236 190 M380 150 L520 188 M920 156 L1060 190"
        stroke="var(--old-gold)"
        strokeWidth="1"
        opacity="0.22"
        fill="none"
      />
    </svg>
  )
}
