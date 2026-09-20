
/**
 * 烛阴 —— 据海外北经·锺山已核验形貌与神迹的艺术演绎:
 * 「人面蛇身,赤色」「视为昼,暝为夜,吹为冬,呼为夏」「身长千里,居锺山下」——
 * 赤鳞长蛇自画外盘绕锺山,首作人面;背景昼(右上微明)与夜(左下沉暗)分野;
 * 风起于身:数道风弧自口侧荡出。身躯出画,以「不见其尾」示意身长千里。
 * 本幅背景需昼夜分野,故自绘底色,不使用 ArtCanvas 统一底座。
 */
export default function ZhuyinArt() {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="烛阴插画:赤色人面蛇身盘绕锺山,身躯出入画外不见其尾,背景昼夜分野(据原文描述艺术演绎)"
    >
      {/* 昼夜分野背景:右上视为昼(微明),左下暝为夜(沉暗) */}
      <defs>
        <linearGradient id="zy-day" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1d2b26" />
          <stop offset="100%" stopColor="#131d18" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="zy-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3A1F1A" />
          <stop offset="55%" stopColor="#2b1512" />
          <stop offset="100%" stopColor="#1a0e0c" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="#0d1311" />
      <rect width="400" height="300" fill="url(#zy-day)" opacity="0.55" />
      {/* 月:昼侧一点 */}
      <circle cx="352" cy="52" r="14" fill="#E8E0CD" opacity="0.3" />

      {/* 锺山:下部山影,蛇身盘绕其上 */}
      <path
        d="M40 268 C120 214 200 226 260 240 C310 252 360 244 410 252 L410 300 L-10 300 Z"
        fill="#101915"
      />
      <path
        d="M40 268 C120 214 200 226 260 240"
        fill="none"
        stroke="#587367"
        strokeWidth="1"
        opacity="0.4"
      />

      {/* 蛇身:三段巨弯自右下入画,盘过山脊,向左上出画(不见其尾) */}
      <g>
        <path
          fill="url(#zy-body)"
          stroke="#A74738"
          strokeWidth="1"
          strokeOpacity="0.5"
          d="M410 262
             C360 250 330 220 336 186
             C342 152 316 128 274 128
             C230 128 196 148 176 178
             C160 202 140 212 116 208
             C96 205 84 192 86 174
             C88 158 100 148 114 148
             C124 148 132 154 134 162"
        />
        {/* 赤鳞:沿脊背的短弧鳞线(朱砂系) */}
        <g fill="none" stroke="#A74738" strokeWidth="1.1" opacity="0.55">
          <path d="M368 240 C356 226 348 212 344 196" />
          <path d="M338 210 C326 200 318 186 316 170" />
          <path d="M318 150 C302 140 284 136 266 138" />
          <path d="M258 140 C236 146 218 158 206 172" />
          <path d="M188 190 C176 200 160 206 144 204" />
        </g>
        {/* 腹线:一线月白沿腹 */}
        <path
          d="M400 258 C352 246 324 218 330 188 C336 158 312 136 274 136 C232 136 200 154 180 184"
          fill="none"
          stroke="#E8E0CD"
          strokeWidth="0.9"
          opacity="0.3"
        />

        {/* 人面:蛇首上端,沉静阖目(暝) */}
        <g>
          <ellipse cx="112" cy="140" rx="26" ry="20" fill="url(#zy-body)" stroke="#A74738" strokeOpacity="0.5" />
          {/* 阖目两弧(暝为夜) */}
          <path d="M100 136 C104 132 110 132 114 135" fill="none" stroke="#E8E0CD" strokeWidth="1.2" opacity="0.85" />
          <path d="M120 134 C124 131 130 131 134 134" fill="none" stroke="#E8E0CD" strokeWidth="1.2" opacity="0.85" />
          {/* 鼻颌极简 */}
          <path d="M112 144 C112 150 110 154 106 157 M118 146 C118 151 117 155 114 158" fill="none" stroke="#E8E0CD" strokeWidth="0.8" opacity="0.5" />
          {/* 发披:数缕 */}
          <g stroke="#0C120F" strokeWidth="2.4" opacity="0.9">
            <path d="M96 130 C88 122 84 112 84 102" />
            <path d="M104 124 C98 114 96 104 98 94" />
          </g>
          {/* 吹息成风:口侧风弧(呼为夏/吹为冬之风) */}
          <g fill="none" stroke="#B18B56" strokeLinecap="round">
            <path d="M84 152 C70 154 58 162 50 174" strokeWidth="1.2" opacity="0.5" />
            <path d="M78 164 C64 168 54 176 48 188" strokeWidth="1" opacity="0.4" />
            <path d="M90 166 C80 172 72 180 66 192" strokeWidth="0.9" opacity="0.3" />
          </g>
        </g>
      </g>
    </svg>
  )
}
