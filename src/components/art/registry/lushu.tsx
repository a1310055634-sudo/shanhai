import { ArtCanvas } from './ArtCanvas'

/**
 * 鹿蜀 —— 据南山经·杻阳之山已核验形貌的艺术演绎:
 * 「其状如马而白首,其文如虎而赤尾,其音如谣」——马形行步(呼应行旅),
 * 首颈月白、身披虎纹(浅色带+线描)、尾自臀上扬为朱砂;张口引颈作谣声。
 * E10 重绘:颈头身结构相连、四足落地一前行(步态),构图与狐(伏踞尾扇)/凤皇(立鸟绦带)区分。
 * 全部收进 4:5 安全区(x 80—320)。
 */
export default function LushuArt() {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="鹿蜀插画:白首马形缓步前行,身披虎纹,曳朱砂尾,张口如谣(据原文描述艺术演绎)"
    >
      <ArtCanvas id="lushu" mistA="rgba(88, 115, 103, 0.18)" groundY={256} />

      {/* 四足(先行绘制,上端藏入身内);行旅步态:一前足前伸 */}
      <g fill="none" stroke="#0C120F" strokeWidth="11" strokeLinecap="round">
        <path d="M158 208 L150 252" />
        <path d="M176 214 L182 252" />
        <path d="M238 214 L248 252" />
        <path d="M254 206 L272 248" />
      </g>

      {/* 马形躯干:鬐甲至尻的水平背线,圆腹 */}
      <path
        fill="#0C120F"
        d="M150 160
           C170 146 206 142 232 148
           C254 152 268 166 268 186
           C268 204 258 216 240 220
           C210 226 172 224 152 210
           C140 200 140 172 150 160 Z"
      />

      {/* 虎纹:浅色宽带 + 线描双钩(其文如虎) */}
      <g fill="none" strokeLinecap="round">
        <path d="M176 152 C186 170 186 190 178 212" stroke="#22302A" strokeWidth="9" />
        <path d="M204 148 C214 168 214 192 206 218" stroke="#22302A" strokeWidth="9" />
        <path d="M232 152 C242 168 244 186 238 210" stroke="#22302A" strokeWidth="8" />
      </g>
      <g fill="none" stroke="#B18B56" strokeWidth="1.1" opacity="0.6">
        <path d="M176 156 C184 172 184 192 178 208" />
        <path d="M204 152 C212 170 212 192 206 214" />
      </g>

      {/* 白首白颈:一体轮廓——长吻马首 + 上扬颈,下缘没入深色躯干 */}
      <path
        fill="#F3EEE2"
        opacity="0.94"
        d="M74 138
           L84 114
           Q94 96 112 92
           L122 88
           L172 140
           L180 194
           L122 178
           Q90 160 74 138 Z"
      />
      {/* 颌与颊线描 */}
      <path d="M80 142 Q94 158 118 170" fill="none" stroke="#8F968D" strokeWidth="1" opacity="0.55" />
      {/* 耳(深色两枚,白首之上) */}
      <path d="M104 94 L98 76 L114 90 Z" fill="#0C120F" />
      <path d="M118 90 L120 72 L132 88 Z" fill="#0C120F" />
      {/* 鬃毛:深色数缕沿颈上缘 */}
      <g stroke="#0C120F" strokeWidth="5.5" strokeLinecap="round">
        <path d="M126 104 C138 112 148 122 156 132" />
        <path d="M114 96 C126 104 138 114 148 124" />
      </g>
      {/* 目:深色一点(白首之上,近额) */}
      <circle cx="98" cy="120" r="2.8" fill="#0C120F" />
      {/* 鼻孔(朱砂一点,点染 1/1) */}
      <circle cx="80" cy="132" r="1.8" fill="#A74738" opacity="0.85" />

      {/* 其音如谣:两道淡金声弧 */}
      <g fill="none" stroke="#B18B56" strokeWidth="1.1" opacity="0.55">
        <path d="M96 116 C84 124 78 138 80 152" />
        <path d="M106 106 C90 116 82 134 86 154" />
      </g>

      {/* 赤尾:自尻上扬(朱砂,尖收于安全区内) */}
      <path
        d="M262 172 C292 158 310 136 318 108 C322 142 306 182 274 200 C268 192 264 182 262 172 Z"
        fill="#A74738"
        opacity="0.88"
      />
      <path d="M268 178 C292 164 308 144 314 122" fill="none" stroke="#D9D6C9" strokeWidth="1" opacity="0.45" />
    </svg>
  )
}
