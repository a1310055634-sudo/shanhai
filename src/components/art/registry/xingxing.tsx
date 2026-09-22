import { ArtCanvas } from './ArtCanvas'

/** 狌狌——据南山经·招摇之山原文描述的艺术演绎。 */
export default function XingxingArt() {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="狌狌插画:禺类兽形,双耳白色,伏行与人行之间的动作意象(据原文描述艺术演绎)"
    >
      <ArtCanvas id="xingxing" mistA="rgba(88, 115, 103, 0.18)" groundY={252} />

      {/* 伏行的兽形 */}
      <path
        fill="#0C120F"
        d="M82 214 C92 178 118 152 152 144 C188 136 230 146 254 168 C270 184 278 204 268 222 C248 240 212 244 174 238 C138 234 106 230 82 214 Z"
      />
      {/* 禺类头部与白耳 */}
      <path fill="#0C120F" d="M96 188 C84 170 88 146 106 132 C124 118 148 120 160 138 C170 154 164 178 146 190 C128 200 108 198 96 188 Z" />
      <ellipse cx="101" cy="150" rx="14" ry="19" fill="#F3EEE2" opacity="0.92" />
      <ellipse cx="153" cy="145" rx="13" ry="18" fill="#F3EEE2" opacity="0.92" />
      <circle cx="124" cy="154" r="2" fill="#B18B56" opacity="0.85" />
      <path d="M132 166 C138 170 144 170 149 166" fill="none" stroke="#D9D6C9" strokeWidth="1" opacity="0.55" />
      {/* 伏行四肢 */}
      <g fill="none" stroke="#0C120F" strokeWidth="12" strokeLinecap="round">
        <path d="M112 212 C100 226 88 238 72 246" />
        <path d="M148 222 C140 236 126 246 112 252" />
        <path d="M226 220 C238 234 252 242 268 246" />
        <path d="M252 204 C268 214 282 224 292 234" />
      </g>
      {/* 「伏行人走」:以一条淡淡的人行节拍轨迹表现动作差异,不补造形貌 */}
      <g fill="none" stroke="#B18B56" strokeWidth="1" opacity="0.42">
        <path d="M56 262 C78 254 98 256 118 264" />
        <path d="M230 260 C250 252 270 254 290 262" />
      </g>
      <path d="M176 154 C190 166 198 180 200 196" fill="none" stroke="#D9D6C9" strokeWidth="1" opacity="0.28" />
    </svg>
  )
}
