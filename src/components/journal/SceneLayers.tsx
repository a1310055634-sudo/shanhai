import styles from './SceneLayers.module.css'

/**
 * R07 场景底层:三层山水 SVG(远山/中景/前景)+ 雾带。
 * 参数化:每站通过 hue 和 layerOpacity 微调,形成氛围差异。
 * 纯装饰 aria-hidden;不动任何内容文字。
 */
export interface SceneLayersProps {
  /** 色相偏移系数 0—1(0=岩青冷调,1=铜绿暖调),按山序/100 取值 */
  warmth: number
  /** 远山不透明度乘数 */
  farOpacity?: number
  /** 中景不透明度乘数 */
  midOpacity?: number
  /** 前景山影不透明度乘数 */
  nearOpacity?: number
}

export default function SceneLayers({
  warmth,
  farOpacity = 1,
  midOpacity = 1,
  nearOpacity = 1,
}: SceneLayersProps) {
  // 按warmth在岩青↔铜绿间插值
  const lerp = (a: number, b: number) => Math.round(a + (b - a) * warmth)
  const farColor = `rgb(${lerp(49, 88)}, ${lerp(84, 115)}, ${lerp(90, 103)})`
  const midColor = `rgb(${lerp(88, 49)}, ${lerp(115, 84)}, ${lerp(103, 90)})`

  return (
    <svg
      className={styles.scene}
      viewBox="0 0 1280 360"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      {/* 远山(最远,最淡) */}
      <path
        d="M0 180 L90 148 L200 172 L320 136 L450 168 L580 140 L710 170 L840 142 L970 168 L1100 146 L1230 170 L1440 152 L1440 360 L0 360 Z"
        fill={farColor}
        opacity={0.18 * farOpacity}
      />
      {/* 远山二重 */}
      <path
        d="M0 220 L140 194 L290 216 L450 188 L610 214 L770 192 L930 216 L1090 194 L1250 214 L1440 196 L1440 360 L0 360 Z"
        fill={midColor}
        opacity={0.12 * midOpacity}
      />
      {/* 中景雾带 */}
      <ellipse cx="340" cy="260" rx="320" ry="20" fill={midColor} opacity={0.08 * midOpacity} />
      <ellipse cx="940" cy="270" rx="380" ry="18" fill={midColor} opacity={0.07 * midOpacity} />
      {/* 中景山影 */}
      <path
        d="M0 268 L110 244 L240 264 L380 236 L520 262 L660 240 L800 264 L940 242 L1080 264 L1220 246 L1440 262 L1440 360 L0 360 Z"
        fill={midColor}
        opacity={0.10 * midOpacity}
      />
      {/* 前景山影(最近,最暗,收底) */}
      <path
        d="M0 360 L100 326 L240 358 L400 314 L560 354 L720 322 L880 356 L1040 320 L1200 354 L1360 328 L1440 348 L1440 360 L0 360 Z"
        fill="#0a100e"
        opacity={0.9 * nearOpacity}
      />
      {/* 前景旧金脊线 */}
      <path
        d="M100 326 L240 358 M560 354 L720 322 M1040 320 L1200 354"
        stroke="#b18b56"
        strokeWidth="0.8"
        opacity={0.18 * nearOpacity}
        fill="none"
      />
    </svg>
  )
}
