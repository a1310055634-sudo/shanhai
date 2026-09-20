import { ArtCanvas } from './ArtCanvas'

/**
 * 英招 —— 据西山经·槐江之山已核验形貌的艺术演绎:
 * 「其状马身而人面,虎文而鸟翼,徇于四海」——
 * 马躯腾空徉行,人面平静前望,身披虎纹,肩生鸟翼;足下云气四海。
 * 与陆吾(伏踞守望)相反:这是巡行的飞行侧影,朝右、腾空、动感。
 */
export default function YingzhaoArt() {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="英招插画:马身人面披虎纹生鸟翼,腾空徇于四海(据原文描述艺术演绎)"
    >
      <ArtCanvas id="yingzhao" mistA="rgba(88, 115, 103, 0.18)" groundY={272} />

      {/* 四海云气:足下三条流云带(徇于四海) */}
      <g fill="none" stroke="#587367" strokeLinecap="round">
        <path d="M60 258 C120 246 190 258 260 250 C310 244 350 250 400 244" strokeWidth="1.3" opacity="0.45" />
        <path d="M40 272 C110 262 180 272 250 266 C300 262 350 266 400 260" strokeWidth="1.1" opacity="0.32" />
        <path d="M90 284 C160 276 230 284 300 278" strokeWidth="0.9" opacity="0.22" />
      </g>

      {/* 鸟翼:肩后上展(羽层三层,线描骨架) */}
      <g>
        <path
          fill="#0C120F"
          d="M196 118
             C214 96 240 84 272 82
             C258 106 238 124 214 134
             C207 132 200 126 196 118 Z"
        />
        <path
          fill="#0C120F"
          opacity="0.85"
          d="M198 132 C216 120 234 114 254 112 C242 128 226 138 208 142 Z"
        />
        <g fill="none" stroke="#D9D6C9" strokeWidth="0.9" opacity="0.4">
          <path d="M204 122 C222 106 242 94 262 88" />
          <path d="M204 136 C218 128 232 122 246 118" />
        </g>
      </g>

      {/* 马躯:腾空跃姿,颈首人面前伸 */}
      <path
        fill="#0C120F"
        d="M150 160
           C168 138 194 128 220 130
           C246 132 266 144 276 162
           C284 176 284 192 276 204
           C264 220 244 228 222 226
           C196 224 172 212 158 194
           C148 182 146 170 150 160 Z"
      />
      {/* 虎文:躯上数道弧带(线描,与陆吾直纹区隔为弧带) */}
      <g fill="none" stroke="#B18B56" strokeWidth="1.2" opacity="0.5">
        <path d="M170 148 C182 156 188 170 186 186" />
        <path d="M196 138 C208 148 214 164 212 182" />
        <path d="M222 134 C234 144 240 160 238 178" />
        <path d="M246 140 C254 150 258 162 256 174" />
      </g>
      {/* 躯干线描 */}
      <path
        d="M158 176 C176 156 200 144 224 142 C244 140 262 148 272 160"
        fill="none"
        stroke="#D9D6C9"
        strokeWidth="0.9"
        opacity="0.35"
      />

      {/* 人面:颈上前伸,平静前望(极简线:眉目/鼻) */}
      <g>
        <path
          fill="#0C120F"
          d="M150 160
             C146 148 148 136 156 128
             C164 120 176 118 184 124
             C192 130 194 140 190 150
             C186 160 176 166 166 166
             C159 166 153 164 150 160 Z"
        />
        <g fill="none" stroke="#D9D6C9" strokeWidth="1" opacity="0.6">
          <path d="M160 138 C165 135 171 135 176 137" />
          <path d="M180 136 C184 140 186 146 184 152" opacity="0.5" />
        </g>
        <circle cx="172" cy="141" r="1.7" fill="#B18B56" opacity="0.9" />
      </g>

      {/* 鬃鬣:颈后三绦(马鬣意象,与凤皇尾绦笔触区分:短促) */}
      <g fill="none" strokeLinecap="round">
        <path d="M150 132 C136 126 124 126 112 130" stroke="#587367" strokeWidth="5" opacity="0.6" />
        <path d="M148 142 C134 138 122 138 110 142" stroke="#31545A" strokeWidth="4" opacity="0.7" />
        <path d="M150 152 C138 150 128 150 118 154" stroke="#B18B56" strokeWidth="2.4" opacity="0.5" />
      </g>

      {/* 四肢:腾空收展(前伸后蹬,不着地) */}
      <g stroke="#0C120F" strokeWidth="9" strokeLinecap="round">
        <path d="M170 212 C162 226 152 234 138 240" />
        <path d="M256 210 C266 222 272 234 274 248" />
      </g>
      <g stroke="#0C120F" strokeWidth="7" strokeLinecap="round" opacity="0.85">
        <path d="M200 222 C200 236 196 248 188 258" />
        <path d="M238 220 C240 234 238 246 232 256" />
      </g>
      {/* 足下踏云两点(旧金微光) */}
      <circle cx="136" cy="248" r="1.8" fill="#B18B56" opacity="0.45" />
      <circle cx="278" cy="256" r="1.6" fill="#B18B56" opacity="0.4" />
    </svg>
  )
}
