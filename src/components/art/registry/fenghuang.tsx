import { ArtCanvas } from './ArtCanvas'

/**
 * 凤皇 —— 据南山经·南次三经丹穴之山已核验形貌的艺术演绎:
 * 「其状如鸡,五采而文」「饮食自然,自歌自舞」——鸡形昂首、展翅举足作舞态,
 * 身轴五处纹采以五色矿物点染示意(首德/翼义/背礼/膺仁/腹信)。
 * 长尾绦带披垂,呼应「见则天下安宁」的祥瑞气。
 */
export default function FenghuangArt() {
  const dots: Array<{ cx: number; cy: number; c: string }> = [
    { cx: 205, cy: 118, c: '#A74738' }, // 首·德(朱砂)
    { cx: 232, cy: 146, c: '#B18B56' }, // 翼·义(旧金)
    { cx: 210, cy: 176, c: '#E8E0CD' }, // 背·礼(月白)
    { cx: 182, cy: 150, c: '#31545A' }, // 膺·仁(岩青)
    { cx: 196, cy: 186, c: '#587367' }, // 腹·信(铜绿)
  ]
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="凤皇插画:鸡形昂首,五采纹采点染,展翅举足自舞(据原文描述艺术演绎)"
    >
      <ArtCanvas id="fenghuang" mistA="rgba(177, 139, 86, 0.13)" groundY={258} />

      {/* 身后淡金晕,示祥瑞气 */}
      <ellipse cx="190" cy="160" rx="150" ry="86" fill="#B18B56" opacity="0.1" />

      {/* 尾绦:三长带自身后垂披(凤皇长尾意象,曲线与狐尾方向相反) */}
      <g fill="none" strokeLinecap="round">
        <path d="M196 208 C168 238 128 254 84 250" stroke="#587367" strokeWidth="7" opacity="0.55" />
        <path d="M198 214 C176 250 146 268 104 272" stroke="#31545A" strokeWidth="5" opacity="0.6" />
        <path d="M194 202 C160 224 116 230 76 222" stroke="#B18B56" strokeWidth="3" opacity="0.55" />
      </g>

      <g>
        {/* 翼:上举后掠,线描骨架 + 淡墨 */}
        <path
          fill="#0C120F"
          d="M214 148
             C238 128 258 118 284 114
             C266 140 246 158 224 166
             C217 162 214 156 214 148 Z"
        />
        <path
          d="M218 150 C240 134 258 126 276 120"
          fill="none"
          stroke="#D9D6C9"
          strokeWidth="1"
          opacity="0.45"
        />
        {/* 翼·义 纹采点 */}
        <circle cx="244" cy="138" r="3.4" fill="#B18B56" />

        {/* 主体:鸡形,昂首挺胸,一足提起点(自歌自舞) */}
        <path
          fill="#0C120F"
          d="M196 100
             C206 88 220 82 232 84
             C246 86 254 96 252 108
             C250 122 238 132 222 136
             C206 140 190 148 180 162
             C170 176 166 192 168 208
             C170 222 176 234 186 242
             L158 242
             C150 226 146 206 150 186
             C154 164 166 144 184 132
             C192 126 196 118 196 108 Z"
        />
        {/* 颈胸线描 */}
        <path
          d="M200 108 C196 128 184 146 172 162"
          fill="none"
          stroke="#D9D6C9"
          strokeWidth="1"
          opacity="0.4"
        />

        {/* 头颈:鸡首昂起,冠与喙 */}
        <path
          fill="#0C120F"
          d="M196 100
             C192 88 194 76 202 68
             C210 60 222 58 230 64
             C238 58 248 60 252 68
             L238 72
             C230 70 222 72 216 78
             C210 84 206 92 208 100
             Z"
        />
        {/* 喙(鸡形) */}
        <path d="M252 66 L268 70 L251 76 Z" fill="#0C120F" />
        {/* 肉冠一线朱砂 */}
        <path d="M208 62 C214 56 224 54 232 58" fill="none" stroke="#A74738" strokeWidth="2.4" opacity="0.85" />
        {/* 目:月白一点 */}
        <circle cx="226" cy="72" r="2.2" fill="#E8E0CD" opacity="0.9" />

        {/* 首·德 / 背·礼 / 膺·仁 / 腹·信 四点(翼·义已落于翼上) */}
        {dots.slice(0, 1).map((d, i) => (
          <circle key={`d${i}`} cx={d.cx} cy={d.cy} r={3.6} fill={d.c} opacity="0.9" />
        ))}
        {dots.slice(2).map((d, i) => (
          <circle key={`d${i}`} cx={d.cx} cy={d.cy} r={3.2} fill={d.c} opacity="0.85" />
        ))}

        {/* 足:一足点地,一足提起(舞) */}
        <path d="M198 242 L198 258 M190 258 L206 258" stroke="#0C120F" strokeWidth="4" strokeLinecap="round" />
        <path d="M216 222 C224 230 228 240 226 250" stroke="#0C120F" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  )
}
