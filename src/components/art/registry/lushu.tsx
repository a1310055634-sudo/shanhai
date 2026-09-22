import { ArtCanvas } from './ArtCanvas'

/** 鹿蜀——据南山经·杻阳之山原文描述的艺术演绎。 */
export default function LushuArt() {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="鹿蜀插画:白首马形,身有虎纹,赤尾,张口如歌(据原文描述艺术演绎)"
    >
      <ArtCanvas id="lushu" mistA="rgba(88, 115, 103, 0.18)" groundY={256} />

      {/* 马形主体 */}
      <path
        fill="#0C120F"
        d="M104 212 C108 174 130 148 164 140 C202 130 248 140 268 164 C282 180 286 202 276 220 C258 238 222 244 182 240 C148 238 120 230 104 212 Z"
      />
      {/* 白首 */}
      <path fill="#F3EEE2" opacity="0.9" d="M104 176 C88 164 84 142 96 124 C108 108 130 106 144 120 C156 132 156 154 144 170 C134 182 118 184 104 176 Z" />
      <path d="M98 124 L96 106 L108 118 M126 112 L136 98 L140 120" fill="#0C120F" />
      <circle cx="120" cy="134" r="2.4" fill="#B18B56" opacity="0.9" />
      {/* 虎纹 */}
      <g fill="none" stroke="#B18B56" strokeWidth="2" opacity="0.58">
        <path d="M156 154 C174 164 182 178 182 194" />
        <path d="M182 146 C200 158 208 174 208 190" />
        <path d="M210 148 C228 160 236 174 236 188" />
        <path d="M236 158 C252 168 260 178 262 190" />
      </g>
      {/* 赤尾 */}
      <path d="M268 170 C302 154 326 126 344 94 C344 132 326 178 286 204 C278 198 272 186 268 170 Z" fill="#A74738" opacity="0.85" />
      <path d="M274 178 C302 160 324 134 340 108" fill="none" stroke="#D9D6C9" strokeWidth="1" opacity="0.45" />
      {/* 四足与地线 */}
      <g fill="none" stroke="#0C120F" strokeWidth="11" strokeLinecap="round">
        <path d="M146 218 C144 234 138 246 128 258" />
        <path d="M176 226 C176 240 170 250 164 260" />
        <path d="M236 224 C240 238 246 248 256 258" />
        <path d="M260 214 C270 226 280 236 292 242" />
      </g>
      {/* 其音如谣 */}
      <g fill="none" stroke="#B18B56" strokeWidth="1.1" opacity="0.5">
        <path d="M76 142 C60 150 54 164 58 178" />
        <path d="M64 130 C42 142 34 162 40 184" />
        <path d="M52 120 C24 136 14 162 22 190" />
      </g>
    </svg>
  )
}
