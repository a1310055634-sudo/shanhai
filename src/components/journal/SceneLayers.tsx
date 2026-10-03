import { useId } from 'react'
import styles from './SceneLayers.module.css'

/**
 * R07+R09 场景底层:三层山水 SVG(远山/中景/前景山影)+ 雾带。
 * R09 profile 参数按山序切换山脊轮廓;G23 jagged 参数化(amp 高差/steps 峰密度),
 * 确定性散列保证同参数路径恒定。纯装饰 aria-hidden;不动任何内容文字。
 * G63 四阶水墨化二期:纯加法质感层(近浓深度渐变+inkWash 晕染滤镜第二落点,记 DESIGN 台账
 * 滤镜族 2/3)——G23 既有参数(warmth 曲线/profile/jagged/mist 数值与色彩)零改动,指纹断言证之。
 */
export interface SceneLayersProps {
  warmth: number
  farOpacity?: number
  midOpacity?: number
  nearOpacity?: number
  profile?: 'rolling' | 'jagged' | 'stubborn'
  /** jagged 高差/密度系数(1=基准;猨翼 1.3/1.2 更险) */
  jaggedAmp?: number
  jaggedSteps?: number
  mistDensity?: number
}

/** jagged 险峰轮廓生成:amp=峰谷高差系数(基准 66/44/42px),steps=峰位密度系数(基准 20/15/15)。 */
function jaggedSet(amp: number, steps: number) {
  const ridge = (base: number, a: number, n: number, seed: number) => {
    const pts: Array<[number, number]> = [[0, base]]
    for (let i = 1; i < n; i++) {
      const r = Math.abs(Math.sin((i + seed) * 12.9898) * 43758.5453) % 1
      pts.push([Math.round((1440 * i) / n), Math.round(i % 2 ? base - a * (0.55 + 0.45 * r) : base + a * 0.06 * r)])
    }
    pts.push([1440, base])
    return pts
  }
  const toPath = (pts: Array<[number, number]>) =>
    pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ') + ' L1440 360 L0 360 Z'
  const far = ridge(176, 66 * amp, Math.round(20 * steps), 1)
  const mid = ridge(230, 44 * amp, Math.round(15 * steps), 2)
  const near = ridge(344, 42 * amp, Math.round(15 * steps), 3)
  const gold = [3, 9, 13].map((i) => `M${near[i][0]} ${near[i][1]} L${near[i + 1][0]} ${near[i + 1][1]}`).join(' ')
  return { far: toPath(far), mid: toPath(mid), near: toPath(near), gold }
}

const PROFILES = {
  rolling: {
    far: 'M0 170 C90 140 180 160 270 146 C360 132 450 152 540 140 C630 128 720 148 810 138 C900 128 990 146 1080 138 C1170 130 1260 144 1440 138 L1440 360 L0 360 Z',
    mid: 'M0 230 C120 208 240 226 360 214 C480 202 600 218 720 208 C840 198 960 214 1080 206 C1200 198 1320 212 1440 204 L1440 360 L0 360 Z',
    near: 'M0 360 L100 322 C180 314 260 330 340 322 C420 314 500 330 580 322 C660 314 740 330 820 322 C900 314 980 330 1060 322 C1140 314 1220 330 1300 322 C1380 314 1440 322 1440 322 L1440 360 L0 360 Z',
    gold: 'M100 322 C180 314 260 330 340 322 M580 322 C660 314 740 330 820 322',
  },
  stubborn: {
    far: 'M0 200 L200 178 L400 194 L600 172 L800 190 L1000 174 L1200 190 L1440 176 L1440 360 L0 360 Z',
    mid: 'M0 250 L200 230 L400 246 L600 226 L800 244 L1000 228 L1200 244 L1440 230 L1440 360 L0 360 Z',
    near: 'M0 360 L200 330 L400 352 L600 326 L800 348 L1000 328 L1200 350 L1440 332 L1440 360 L0 360 Z',
    gold: 'M400 352 L600 326',
  },
} as const

export default function SceneLayers({
  warmth,
  farOpacity = 1,
  midOpacity = 1,
  nearOpacity = 1,
  profile = 'stubborn',
  jaggedAmp = 1,
  jaggedSteps = 1,
  mistDensity = 0.5,
}: SceneLayersProps) {
  const lerp = (a: number, b: number) => Math.round(a + (b - a) * warmth)
  const farColor = `rgb(${lerp(49, 88)}, ${lerp(84, 115)}, ${lerp(90, 103)})`
  const midColor = `rgb(${lerp(88, 49)}, ${lerp(115, 84)}, ${lerp(103, 90)})`
  const prof = profile === 'jagged' ? jaggedSet(jaggedAmp, jaggedSteps) : PROFILES[profile]
  // G63 滤镜/渐变 id:useId 去冒号(一页多实例不撞 id;ConceptMap inkWash 同规格第二落点)
  const uid = useId().replace(/:/g, '')

  return (
    <svg
      className={styles.scene}
      viewBox="0 0 1280 360"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`g63depth-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a100e" stopOpacity="0" />
          <stop offset="1" stopColor="#0a100e" stopOpacity="0.1" />
        </linearGradient>
        <filter id={`inkWash-${uid}`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.011 0.017" numOctaves="3" seed="7" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.10  0 0 0 0 0.12  0 0 0 0 0.11  0 0 0 0.42 0"
          />
        </filter>
      </defs>
      <path d={prof.far} fill={farColor} opacity={0.18 * farOpacity} />
      {mistDensity > 0.3 && (
        <ellipse cx="340" cy="260" rx="320" ry="20" fill={midColor} opacity={0.08 * mistDensity} />
      )}
      {mistDensity > 0.5 && (
        <ellipse cx="940" cy="270" rx="380" ry="18" fill={midColor} opacity={0.07 * mistDensity} />
      )}
      <path d={prof.mid} fill={midColor} opacity={0.12 * midOpacity} />
      <path d={prof.near} fill="#0a100e" opacity={0.9 * nearOpacity} />
      {/* G63 加法质感层(置于 gold 描线之下,不压旧金山缘高光):近浓深度渐变+晕染噪点 */}
      <rect
        x="0"
        y="0"
        width="1280"
        height="360"
        fill={`url(#g63depth-${uid})`}
        aria-hidden="true"
      />
      <rect
        x="0"
        y="180"
        width="1280"
        height="180"
        filter={`url(#inkWash-${uid})`}
        opacity="0.14"
        aria-hidden="true"
      />
      <path d={prof.gold} stroke="#b18b56" strokeWidth="0.8" opacity={0.18 * nearOpacity} fill="none" />
    </svg>
  )
}
