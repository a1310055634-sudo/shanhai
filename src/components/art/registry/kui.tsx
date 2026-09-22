import { ArtCanvas } from './ArtCanvas'

/** 夔——据大荒东经·流波山原文描述的艺术演绎。 */
export default function KuiArt() {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="夔插画:苍色无角牛形,一足立于流波山海潮之间,日月与雷声意象(据原文描述艺术演绎)"
    >
      <ArtCanvas id="kui" mistA="rgba(49, 84, 90, 0.22)" mistB="rgba(49, 84, 90, 0.12)" groundLine="#31545A" groundY={256} />

      {/* 日月:「其光如日月」,只作两处留白光源 */}
      <circle cx="318" cy="66" r="20" fill="#F3EEE2" opacity="0.08" />
      <circle cx="318" cy="66" r="10" fill="none" stroke="#D9D6C9" strokeWidth="1" opacity="0.5" />
      <circle cx="354" cy="96" r="8" fill="none" stroke="#B18B56" strokeWidth="1" opacity="0.4" />

      {/* 海潮与风雨:「出入水则必风雨」 */}
      <g fill="none" strokeLinecap="round">
        <path d="M-10 236 C64 218 120 242 188 226 C258 210 326 232 410 214" stroke="#587367" strokeWidth="2" opacity="0.55" />
        <path d="M-10 254 C62 240 128 260 198 244 C280 226 338 248 410 232" stroke="#31545A" strokeWidth="1.2" opacity="0.6" />
        <path d="M292 142 C286 158 286 174 292 190" stroke="#D9D6C9" strokeWidth="1" opacity="0.25" />
        <path d="M310 138 C304 156 304 174 310 192" stroke="#D9D6C9" strokeWidth="1" opacity="0.22" />
      </g>

      {/* 苍色牛形:无角,一足 */}
      <path
        fill="#0C120F"
        d="M92 188 C88 164 102 142 128 132 C154 122 198 126 226 142 C250 156 264 178 256 198 C248 218 220 226 184 224 C150 222 116 216 98 204 Z"
      />
      <path
        fill="#0C120F"
        d="M98 164 C82 154 76 136 84 120 C91 106 108 98 124 106 C136 112 140 126 134 140 C128 154 114 164 98 164 Z"
      />
      {/* 不画角,以圆钝头部保留原文限制 */}
      <path d="M92 124 C100 118 112 118 120 124" fill="none" stroke="#D9D6C9" strokeWidth="1" opacity="0.55" />
      <circle cx="112" cy="128" r="2" fill="#B18B56" opacity="0.85" />
      {/* 一足 */}
      <path d="M174 214 C172 232 166 248 154 264" fill="none" stroke="#0C120F" strokeWidth="18" strokeLinecap="round" />
      <path d="M151 264 C160 268 172 268 182 264" fill="none" stroke="#D9D6C9" strokeWidth="1" opacity="0.45" />
      {/* 声如雷:主体周围三道震动弧 */}
      <g fill="none" stroke="#B18B56" strokeWidth="1.2" opacity="0.55">
        <path d="M72 166 C52 176 48 196 58 214" />
        <path d="M60 154 C32 170 26 202 42 228" />
        <path d="M48 142 C12 166 6 210 28 242" />
      </g>
      <path d="M226 146 L238 134 L246 144 L258 128" fill="none" stroke="#A74738" strokeWidth="1.5" opacity="0.7" />
    </svg>
  )
}
