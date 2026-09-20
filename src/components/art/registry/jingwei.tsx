import { ArtCanvas } from './ArtCanvas'

/**
 * 精卫 —— 据北山经·发鸠之山已核验形貌与叙事的艺术演绎:
 * 「其状如乌,文首、白喙、赤足」「常衔西山之木石,以堙于东海」——
 * 乌形小岛大于浪,衔一枝石低掠于怒海之上;远处西山与坠石呼应。
 * 头部花纹(文首)、白喙、朱砂赤足为点染;整体沉郁,不作儿童绘本风。
 */
export default function JingweiArt() {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="精卫插画:乌形文首白喙赤足,衔木石低掠于东海怒浪之上(据原文描述艺术演绎)"
    >
      <ArtCanvas id="jingwei" mistA="rgba(49, 84, 90, 0.20)" mistB="rgba(49, 84, 90, 0.12)" groundY={272} />

      {/* 西山剪影(左远):衔木石之所来 */}
      <path
        d="M-10 208 C40 168 90 150 150 172 C120 190 70 202 -10 216 Z"
        fill="#0C120F"
        opacity="0.85"
      />
      <path
        d="M96 168 C104 150 112 142 126 136 M118 162 C124 150 132 144 144 140"
        fill="none"
        stroke="#587367"
        strokeWidth="1"
        opacity="0.5"
      />

      {/* 东海:层层浪线(右下占主导,墨线浪头) */}
      <g fill="none" stroke="#587367" strokeLinecap="round">
        <path d="M180 262 C230 252 280 262 330 254 C356 250 380 254 410 250" strokeWidth="1.4" opacity="0.5" />
        <path d="M150 276 C210 266 270 276 330 268 C358 264 386 268 410 264" strokeWidth="1.2" opacity="0.38" />
        <path d="M170 288 C230 278 290 288 350 280 C376 276 396 280 412 277" strokeWidth="1" opacity="0.26" />
      </g>
      {/* 浪头碎墨 */}
      <g fill="#587367">
        <circle cx="318" cy="252" r="2" opacity="0.5" />
        <circle cx="344" cy="266" r="1.6" opacity="0.4" />
        <circle cx="296" cy="272" r="1.3" opacity="0.32" />
      </g>

      {/* 已坠之石:海面三点(旧金微光,示填海不辍) */}
      <g fill="#B18B56">
        <circle cx="252" cy="266" r="2.2" opacity="0.5" />
        <circle cx="286" cy="272" r="1.7" opacity="0.4" />
      </g>

      {/* 精卫本尊:乌形,自左向右低掠,微俯(衔石欲投) */}
      <g>
        {/* 身与翅:一翅上扬一翅下压(逆风) */}
        <path
          fill="#0C120F"
          d="M96 118
             C114 104 138 100 158 108
             C176 114 190 126 196 142
             C200 154 198 166 190 174
             C176 166 158 162 142 162
             C124 162 108 152 100 138
             C96 131 95 124 96 118 Z"
        />
        {/* 上扬之翅(后掠) */}
        <path
          fill="#0C120F"
          d="M120 116 C110 98 96 88 74 84 C92 102 104 114 116 122 Z"
        />
        <path
          d="M116 116 C104 104 94 96 82 90"
          fill="none"
          stroke="#D9D6C9"
          strokeWidth="0.9"
          opacity="0.4"
        />
        {/* 尾羽(短,乌形) */}
        <path d="M92 132 C78 132 66 138 56 148 C70 150 84 148 94 142 Z" fill="#0C120F" />

        {/* 头(文首:额部两道浅纹) */}
        <circle cx="168" cy="120" r="17" fill="#0C120F" />
        <path
          d="M158 108 C164 102 172 100 180 102 M156 116 C160 110 166 106 172 105"
          fill="none"
          stroke="#B18B56"
          strokeWidth="1"
          opacity="0.55"
        />
        {/* 白喙:衔一枝木石(枝:旧金;石:灰墨) */}
        <path d="M183 118 L203 122 L184 126 Z" fill="#E8E0CD" opacity="0.92" />
        <g>
          <path
            d="M204 122 C212 118 220 116 230 116"
            fill="none"
            stroke="#B18B56"
            strokeWidth="2.2"
            opacity="0.85"
          />
          <path d="M228 114 L234 112 L233 122 Z" fill="#587367" opacity="0.9" />
          <circle cx="240" cy="118" r="3.4" fill="#0C120F" stroke="#587367" strokeWidth="0.8" />
        </g>
        {/* 目:月白一点,沉毅 */}
        <circle cx="170" cy="116" r="2" fill="#E8E0CD" opacity="0.85" />

        {/* 赤足:收于腹下(朱砂点染) */}
        <path
          d="M150 170 C152 176 156 180 162 182"
          fill="none"
          stroke="#A74738"
          strokeWidth="2.6"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* 所来之路:西山→本尊 一线淡墨(叙事引导) */}
        <path
          d="M40 196 C70 180 100 162 128 140"
          fill="none"
          stroke="#587367"
          strokeWidth="0.8"
          strokeDasharray="3 6"
          opacity="0.4"
        />
      </g>
    </svg>
  )
}
