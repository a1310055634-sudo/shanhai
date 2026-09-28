import styles from './SceneLayers.module.css'

/**
 * R07+R09 场景底层:三层山水 SVG(远山/中景/前景)+ 雾带。
 * R09 新增 profile 参数——按山序切换三种山脊轮廓,让每站场景有构图差异。
 * 纯装饰 aria-hidden;不动任何内容文字。
 */
export interface SceneLayersProps {
  warmth: number
  farOpacity?: number
  midOpacity?: number
  nearOpacity?: number
  profile?: 'rolling' | 'jagged' | 'stubborn'
  mistDensity?: number
}

const PROFILES = {
  rolling: {
    far: 'M0 170 C90 140 180 160 270 146 C360 132 450 152 540 140 C630 128 720 148 810 138 C900 128 990 146 1080 138 C1170 130 1260 144 1440 138 L1440 360 L0 360 Z',
    mid: 'M0 230 C120 208 240 226 360 214 C480 202 600 218 720 208 C840 198 960 214 1080 206 C1200 198 1320 212 1440 204 L1440 360 L0 360 Z',
    near: 'M0 360 L100 322 C180 314 260 330 340 322 C420 314 500 330 580 322 C660 314 740 330 820 322 C900 314 980 330 1060 322 C1140 314 1220 330 1300 322 C1380 314 1440 322 1440 322 L1440 360 L0 360 Z',
    gold: 'M100 322 C180 314 260 330 340 322 M580 322 C660 314 740 330 820 322',
  },
  jagged: {
    far: 'M0 190 L80 130 L160 178 L240 110 L320 168 L400 120 L480 172 L560 128 L640 178 L720 132 L800 170 L880 126 L960 174 L1040 134 L1120 172 L1200 132 L1280 170 L1360 138 L1440 162 L1440 360 L0 360 Z',
    mid: 'M0 240 L100 200 L180 232 L280 186 L380 226 L480 192 L580 230 L680 194 L780 228 L880 200 L980 232 L1080 204 L1180 232 L1280 200 L1380 228 L1440 208 L1440 360 L0 360 Z',
    near: 'M0 360 L90 316 L160 346 L260 302 L360 340 L460 306 L560 344 L660 310 L760 346 L860 316 L960 350 L1060 320 L1160 350 L1260 322 L1360 348 L1440 326 L1440 360 L0 360 Z',
    gold: 'M260 302 L360 340 M660 310 L760 346 M1060 320 L1160 350',
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
  mistDensity = 0.5,
}: SceneLayersProps) {
  const lerp = (a: number, b: number) => Math.round(a + (b - a) * warmth)
  const farColor = `rgb(${lerp(49, 88)}, ${lerp(84, 115)}, ${lerp(90, 103)})`
  const midColor = `rgb(${lerp(88, 49)}, ${lerp(115, 84)}, ${lerp(103, 90)})`
  const prof = PROFILES[profile]

  return (
    <svg
      className={styles.scene}
      viewBox="0 0 1280 360"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <path d={prof.far} fill={farColor} opacity={0.18 * farOpacity} />
      {mistDensity > 0.3 && (
        <ellipse cx="340" cy="260" rx="320" ry="20" fill={midColor} opacity={0.08 * mistDensity} />
      )}
      {mistDensity > 0.5 && (
        <ellipse cx="940" cy="270" rx="380" ry="18" fill={midColor} opacity={0.07 * mistDensity} />
      )}
      <path d={prof.mid} fill={midColor} opacity={0.12 * midOpacity} />
      <path d={prof.near} fill="#0a100e" opacity={0.9 * nearOpacity} />
      <path d={prof.gold} stroke="#b18b56" strokeWidth="0.8" opacity={0.18 * nearOpacity} fill="none" />
    </svg>
  )
}
