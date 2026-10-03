import { ArtCanvas } from './ArtCanvas'

/**
 * 䍺 —— 据南山经·洵山已核验形貌的艺术演绎(G75 原创,2026-10-04):
 * 「其状如羊而无口,不可杀也」——羊形立姿,身覆短鬃线;**不画口部**(原文明言无口,
 * 为本插画核心约束);目为细缝(无口则神凝,呼应郭注「稟氣自然」);四足落地静立。
 * 全部收进 4:5 安全区(x 80—320);原创演绎,ART 台账已登记。
 */
export default function XunArt() {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="䍺插画:羊形立兽,身覆短鬃,闭目无口,静立如凝(据原文描述艺术演绎)"
    >
      <ArtCanvas id="xun" mistA="rgba(88, 115, 103, 0.18)" groundY={256} />

      {/* 四足(静立) */}
      <g fill="none" stroke="#0C120F" strokeWidth="10" strokeLinecap="round">
        <path d="M164 210 L158 252" />
        <path d="M180 214 L184 252" />
        <path d="M232 214 L236 252" />
        <path d="M248 208 L264 250" />
      </g>

      {/* 羊形躯干:丰臀厚背,颈前倾(无头部口部细节) */}
      <path
        fill="#0C120F"
        d="M156 214
           C146 196 148 172 162 158
           C176 144 198 138 220 142
           C244 146 262 158 270 176
           C278 192 276 208 266 216
           C246 224 176 226 156 214 Z"
      />

      {/* 短鬃线(背颈至臀,细线排布示羊毛) */}
      <g fill="none" stroke="#D9D6C9" strokeWidth="1.4" opacity="0.75">
        <path d="M170 158 L166 172" />
        <path d="M182 152 L179 168" />
        <path d="M196 148 L194 166" />
        <path d="M210 148 L209 166" />
        <path d="M224 150 L224 168" />
        <path d="M238 156 L238 172" />
        <path d="M252 164 L254 178" />
        <path d="M162 186 L158 198" />
        <path d="M176 182 L173 196" />
        <path d="M254 188 L257 200" />
      </g>

      {/* 头颈:下探无口——面部仅一枚细缝目(闭目神凝),无鼻唇线 */}
      <path
        fill="#0C120F"
        d="M162 158
           C154 146 150 132 156 122
           C162 112 176 110 186 116
           C192 120 194 128 190 136
           C184 148 172 156 162 158 Z"
      />
      {/* 细缝目(闭目) */}
      <path d="M166 126 C172 124 178 124 183 127" fill="none" stroke="#D9D6C9" strokeWidth="1.6" strokeLinecap="round" />
      {/* 双耳(横出) */}
      <path fill="#0C120F" d="M186 116 C196 108 208 106 214 110 C208 118 196 120 188 118 Z" />
      <path fill="#0C120F" d="M158 118 C150 110 140 108 134 112 C140 120 150 121 157 120 Z" />

      {/* 尾(垂后) */}
      <path fill="none" stroke="#0C120F" strokeWidth="7" strokeLinecap="round" d="M270 182 C282 186 288 194 288 204" />

      {/* 矿物色点染(≤3):背一点朱砂、膝一点铜绿 */}
      <circle cx="214" cy="160" r="3" fill="#a74738" opacity="0.85" />
      <circle cx="180" cy="236" r="2.4" fill="#86a492" opacity="0.8" />

      {/* 地线 */}
      <path d="M120 256 L292 256" stroke="#B18B56" strokeWidth="1.2" opacity="0.6" />
    </svg>
  )
}
