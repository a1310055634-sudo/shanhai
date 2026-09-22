import { ArtCanvas } from './ArtCanvas'

/** 文鳐鱼——据西山经·泰器之山原文描述的艺术演绎。 */
export default function WenyaoyuArt() {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="文鳐鱼插画:鱼身鸟翼,苍色纹理,白首赤喙,夜行于海上(据原文描述艺术演绎)"
    >
      <ArtCanvas id="wenyaoyu" mistA="rgba(49, 84, 90, 0.22)" mistB="rgba(88, 115, 103, 0.12)" groundLine="#31545A" groundY={258} />

      {/* 夜飞:月轮与极少星点 */}
      <circle cx="312" cy="70" r="25" fill="none" stroke="#D9D6C9" strokeWidth="1" opacity="0.45" />
      <circle cx="330" cy="56" r="25" fill="#131d18" opacity="0.96" />
      <circle cx="350" cy="88" r="1.5" fill="#B18B56" opacity="0.55" />

      {/* 鱼身与鸟翼 */}
      <path
        fill="#0C120F"
        d="M70 166 C102 132 158 112 224 120 C260 124 286 140 302 160 C278 182 248 198 212 204 C156 212 106 198 70 166 Z"
      />
      <path d="M70 166 L38 142 L46 170 L36 194 L76 176" fill="#0C120F" />
      {/* 白首 */}
      <path d="M216 124 C242 122 262 136 270 154 C260 168 244 176 226 174 C214 158 210 140 216 124 Z" fill="#F3EEE2" opacity="0.9" />
      {/* 赤喙 */}
      <path d="M264 150 L296 160 L266 169 Z" fill="#A74738" opacity="0.9" />
      {/* 苍文 */}
      <g fill="none" stroke="#587367" strokeWidth="2" opacity="0.7">
        <path d="M94 158 C112 146 128 144 144 150" />
        <path d="M102 178 C120 164 138 162 154 168" />
        <path d="M144 142 C160 132 178 132 194 140" />
        <path d="M154 190 C174 178 194 178 210 186" />
      </g>
      {/* 鸟翼:上下展开,不补羽色 */}
      <path fill="#0C120F" d="M164 134 C148 92 152 58 176 34 C184 76 204 102 226 126 C210 136 188 140 164 134 Z" />
      <path fill="#0C120F" opacity="0.85" d="M190 132 C198 94 220 66 254 52 C244 92 230 122 214 142 Z" />
      <g fill="none" stroke="#D9D6C9" strokeWidth="1" opacity="0.45">
        <path d="M170 122 C168 92 170 68 176 48" />
        <path d="M198 126 C210 98 226 78 246 62" />
      </g>
      {/* 夜行轨迹与海面 */}
      <path d="M30 226 C112 212 178 230 248 218 C310 208 354 218 410 204" fill="none" stroke="#31545A" strokeWidth="1.2" opacity="0.55" />
      <path d="M106 232 C136 222 164 224 190 230" fill="none" stroke="#B18B56" strokeWidth="1" opacity="0.45" />
    </svg>
  )
}
