import { ArtCanvas } from './ArtCanvas'

/**
 * 凤皇 —— 据南山经·南次三经丹穴之山已核验形貌的艺术演绎:
 * 「其状如鸡,五采而文」「饮食自然,自歌自舞」——鸡形立鸟:冠、喙、颈、翼、足结构完整,
 * 一足点地一足提起作舞态;首/翼/背/膺/腹五处以五色矿物作「文」(朱砂/旧金/月白/岩青/铜绿),
 * 对应原文「五采而文」。长尾绦带披垂为艺术性演绎,非原文所载。
 * 构图与九尾狐(伏踞+尾扇)反向:竖轴立鸟 + 绦带下垂;五色节奏小而明,克制可见。
 */
export default function FenghuangArt() {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="凤皇插画:鸡形立鸟引颈自舞,一足提起,五采纹采在首翼背膺腹(据原文描述艺术演绎)"
    >
      <ArtCanvas id="fenghuang" mistA="rgba(177, 139, 86, 0.13)" groundY={258} />

      {/* 身后淡金晕,示「见则天下安宁」的祥瑞气 */}
      <ellipse cx="195" cy="160" rx="150" ry="86" fill="#B18B56" opacity="0.1" />

      {/* 长尾绦带:三带自尾根披垂向左(艺术性演绎,方向与狐尾扇相反) */}
      <g fill="none" strokeLinecap="round">
        <path d="M236 190 C196 224 148 240 96 234" stroke="#587367" strokeWidth="8" opacity="0.5" />
        <path d="M240 198 C204 240 160 262 108 268" stroke="#31545A" strokeWidth="5.5" opacity="0.55" />
        <path d="M232 184 C190 206 140 210 92 200" stroke="#B18B56" strokeWidth="3" opacity="0.5" />
      </g>

      <g>
        {/* 主体:鸡形卵身 */}
        <ellipse cx="206" cy="172" rx="37" ry="33" fill="#0C120F" transform="rotate(-24 206 172)" />

        {/* 翼:覆于身侧(在身体之上),三列羽线 */}
        <path
          fill="#0C120F"
          stroke="#D9D6C9"
          strokeWidth="0.9"
          strokeOpacity="0.5"
          d="M196 148
             C216 140 236 146 246 162
             C254 176 252 192 240 202
             C230 194 220 180 214 166
             C208 158 200 152 196 148 Z"
        />
        <g fill="none" stroke="#D9D6C9" strokeWidth="1" opacity="0.42">
          <path d="M202 156 C216 156 232 166 240 182" />
          <path d="M200 166 C212 168 224 178 230 190" />
          <path d="M240 170 C244 178 244 188 238 198" />
        </g>
        {/* 翼·义(旧金) */}
        <circle cx="228" cy="172" r="3.4" fill="#B18B56" />

        {/* 颈:S 形粗线自头入身,结构相连 */}
        <path
          d="M244 100 C240 118 230 132 214 144"
          fill="none"
          stroke="#0C120F"
          strokeWidth="17"
          strokeLinecap="round"
        />
        {/* 颈线描 */}
        <path d="M250 104 C246 120 236 132 222 142" fill="none" stroke="#D9D6C9" strokeWidth="1" opacity="0.38" />

        {/* 头:圆首 + 冠 + 喙 + 肉垂 */}
        <circle cx="252" cy="90" r="14.5" fill="#0C120F" />
        {/* 冠:一线朱砂(首·德 即在冠,点染一體) */}
        <path d="M243 79 C248 71 258 70 264 76" fill="none" stroke="#A74738" strokeWidth="2.6" opacity="0.9" strokeLinecap="round" />
        {/* 喙(鸡形,两瓣) */}
        <path d="M265 86 L282 92 L264 98 Z" fill="#0C120F" stroke="#D9D6C9" strokeWidth="0.8" strokeOpacity="0.4" strokeLinejoin="round" />
        {/* 肉垂 */}
        <path d="M262 98 C262 106 258 110 254 110" fill="none" stroke="#A74738" strokeWidth="2.2" opacity="0.7" strokeLinecap="round" />
        {/* 目:月白一点 */}
        <circle cx="254" cy="86" r="2.3" fill="#E8E0CD" opacity="0.92" />
        {/* 首·德 已由朱砂冠/垂承担 */}

        {/* 背·礼(月白)/ 膺·仁(岩青)/ 腹·信(铜绿):小纹采落于身轴 */}
        <circle cx="196" cy="150" r="3.4" fill="#E8E0CD" opacity="0.92" />
        <circle cx="186" cy="164" r="3.2" fill="#31545A" opacity="0.95" />
        <circle cx="192" cy="188" r="3.2" fill="#587367" opacity="0.95" />
        {/* 文意:三点连线成纹(细线,非点染) */}
        <path d="M196 150 L186 164 M186 164 L192 188" fill="none" stroke="#D9D6C9" strokeWidth="0.7" opacity="0.3" />

        {/* 足:一足点地(三趾),一足提起作舞 */}
        <path d="M212 202 L212 250 M200 250 L224 250 M212 250 L212 255" stroke="#0C120F" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <path d="M196 196 C210 210 220 226 218 242" stroke="#0C120F" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <path d="M218 242 L228 250 M218 242 L214 252" stroke="#0C120F" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  )
}
