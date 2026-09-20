import { ArtCanvas } from './ArtCanvas'

/**
 * 帝江 —— 据西山经·天山已核验形貌的艺术演绎:
 * 「其状如黄囊,赤如丹火,六足四翼,浑敦无面目,是识歌舞」——
 * 囊形团身内蕴丹火,六足四翼,浑然无面目;周身舞弧示意识歌舞。
 * 无目、无口:全画不画五官,是本幅的构图核心。
 */
export default function DijiangArt() {
  const legs = [
    { x: 148, y: 226, rot: -14 },
    { x: 178, y: 234, rot: -4 },
    { x: 208, y: 237, rot: 4 },
    { x: 236, y: 232, rot: 12 },
    { x: 158, y: 218, rot: -8 },
    { x: 228, y: 220, rot: 8 },
  ]
  const wings = [
    { x: 118, y: 128, rot: -28 },
    { x: 262, y: 120, rot: 26 },
    { x: 128, y: 168, rot: -10 },
    { x: 256, y: 164, rot: 10 },
  ]
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="帝江插画:黄囊状团身内蕴丹火,六足四翼,浑敦无面目,周身舞弧(据原文描述艺术演绎)"
    >
      <ArtCanvas id="dijiang" mistA="rgba(177, 139, 86, 0.12)" groundY={256} />

      <defs>
        <radialGradient id="dj-fire" cx="50%" cy="58%" r="60%">
          <stop offset="0%" stopColor="#A74738" stopOpacity="0.85" />
          <stop offset="46%" stopColor="#B18B56" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#B18B56" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 舞弧:三道环绕的节奏线(识歌舞) */}
      <g fill="none" stroke="#B18B56" strokeLinecap="round">
        <path d="M96 150 C120 108 168 84 216 88" strokeWidth="1.2" opacity="0.4" strokeDasharray="7 8" />
        <path d="M104 190 C136 226 196 240 258 224" strokeWidth="1" opacity="0.3" strokeDasharray="5 9" />
        <path d="M300 150 C292 116 268 92 238 82" strokeWidth="0.9" opacity="0.26" strokeDasharray="4 10" />
      </g>

      {/* 四翼:两两上下,短羽扇形,线描骨架 */}
      {wings.map((w, i) => (
        <g key={i} transform={`translate(${w.x} ${w.y}) rotate(${w.rot})`}>
          <path
            d="M0 0 C22 -10 44 -12 66 -6 C46 6 24 10 2 6 Z"
            fill="#0C120F"
            stroke="#D9D6C9"
            strokeWidth="0.9"
            opacity="0.96"
          />
          <path d="M4 0 C24 -4 42 -6 58 -4" fill="none" stroke="#D9D6C9" strokeWidth="0.7" opacity="0.35" />
        </g>
      ))}

      {/* 囊身:团而不规则,内蕴丹火 */}
      <path
        fill="#0C120F"
        d="M132 118
           C150 92 186 78 218 84
           C252 90 276 112 280 144
           C284 176 268 206 238 220
           C206 234 168 230 146 208
           C126 188 120 156 126 134
           C128 127 130 122 132 118 Z"
      />
      {/* 丹火内蕴(径向渐变核心,面积克制) */}
      <ellipse cx="204" cy="160" rx="86" ry="62" fill="url(#dj-fire)" opacity="0.9" />
      {/* 囊身轮廓线描(略粗,示意囊壁) */}
      <path
        d="M132 118 C150 92 186 78 218 84 C252 90 276 112 280 144 C284 176 268 206 238 220 C206 234 168 230 146 208 C126 188 120 156 126 134 C128 127 130 122 132 118 Z"
        fill="none"
        stroke="#D9D6C9"
        strokeWidth="1"
        opacity="0.28"
      />
      {/* 黄囊质地:数道随形的淡线 */}
      <g fill="none" stroke="#B18B56" strokeWidth="0.8" opacity="0.3">
        <path d="M156 116 C170 132 174 158 166 186" />
        <path d="M186 96 C200 116 206 150 198 186" />
        <path d="M232 100 C242 120 244 152 232 184" />
      </g>

      {/* 六足:短足三前四后,交替如踏歌节拍 */}
      {legs.map((l, i) => (
        <path
          key={i}
          d={`M${l.x} ${l.y} l6 20`}
          stroke="#0C120F"
          strokeWidth="7"
          strokeLinecap="round"
          transform={`rotate(${l.rot} ${l.x} ${l.y})`}
        />
      ))}
      {/* 足端淡线:踏拍示意 */}
      <g stroke="#B18B56" strokeWidth="0.9" opacity="0.4">
        <path d="M150 252 l12 0" />
        <path d="M238 256 l12 0" />
      </g>

      {/* 无面目:刻意不画任何五官,留白即其形 */}
    </svg>
  )
}
