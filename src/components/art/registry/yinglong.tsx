import { ArtCanvas } from './ArtCanvas'

/**
 * 应龙 —— 据大荒东经·凶犁土丘已核验叙事的艺术演绎:
 * 原文未载其形貌,故本幅只呈现叙事意象——
 * 「故下数旱,旱而为应龙之状,乃得大雨」:久旱大地之上,雨带中一道
 * 若有若无的雾龙之形(即人所"为"之状),不描鳞爪,不补造细节。
 * 视觉核心是「旱」与「雨将至」的对峙。
 */
export default function YinglongArt() {
  const rains = [
    { x: 0, y: 30, o: 0.3, n: 14 },
    { x: 210, y: 18, o: 0.24, n: 12 },
    { x: 90, y: 6, o: 0.18, n: 10 },
  ]
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="应龙插画:久旱大地之上,雨带中一道雾龙之形若隐若现(据原文叙事的艺术演绎,原文未载其形貌)"
    >
      <ArtCanvas id="yinglong" mistA="rgba(88, 115, 103, 0.10)" mistB="rgba(88, 115, 103, 0.06)" groundY={252} />

      {/* 旱裂大地:底部干裂线(旱) */}
      <path d="M-10 262 C120 252 240 258 410 250 L410 300 L-10 300 Z" fill="#101915" />
      <g stroke="#587367" strokeWidth="0.8" opacity="0.4">
        <path d="M40 276 C70 270 96 272 118 278" fill="none" />
        <path d="M150 282 C186 274 220 276 248 284" fill="none" />
        <path d="M270 278 C306 270 344 272 380 280" fill="none" />
        <path d="M96 292 C140 286 176 288 210 294" fill="none" />
      </g>

      {/* 雨云层:上幕厚云 */}
      <ellipse cx="200" cy="10" rx="260" ry="70" fill="#17231F" />
      <ellipse cx="120" cy="30" rx="160" ry="46" fill="#17231F" opacity="0.9" />

      {/* 雾龙之状:人为其形——一道蛇形雾带(极低对比,形轮廓以断续线暗示) */}
      <g>
        <path
          d="M40 96 C120 66 210 78 268 118 C320 154 336 196 322 232"
          fill="none"
          stroke="#D9D6C9"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.07"
        />
        <path
          d="M40 96 C120 66 210 78 268 118 C320 154 336 196 322 232"
          fill="none"
          stroke="#D9D6C9"
          strokeWidth="1"
          strokeDasharray="10 14"
          opacity="0.4"
        />
        {/* 首部一点:微光即其位 */}
        <circle cx="322" cy="232" r="3" fill="#E8E0CD" opacity="0.5" />
      </g>

      {/* 雨:雨带自云际落于旱地(旱而为应龙之状,乃得大雨) */}
      {rains.map((band, bi) => (
        <g key={bi} stroke="#D9D6C9" strokeWidth="0.8" opacity={band.o}>
          {Array.from({ length: band.n }).map((_, i) => {
            const x = band.x + i * 26 + (bi % 2) * 9
            const y = band.y + (i % 3) * 14
            return <line key={i} x1={x} y1={y} x2={x - 5} y2={y + 22} />
          })}
        </g>
      ))}

      {/* 大地上已有的雨意:地线微微返潮 */}
      <path
        d="M-10 262 C120 252 240 258 410 250"
        fill="none"
        stroke="#D9D6C9"
        strokeWidth="0.8"
        opacity="0.2"
      />
    </svg>
  )
}
