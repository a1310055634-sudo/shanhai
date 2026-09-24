import { ArtCanvas } from './ArtCanvas'

/**
 * 九尾狐 —— 据南山经·青丘之山已核验形貌的艺术演绎:
 * 「其状如狐而九尾,其音如婴儿」——狐形伏踞、昂首张口作鸣状。
 * E08 重绘:九尾改为参数化独立扇形(前三后六各为独立path,线描勾边、深浅分层),
 * 每尾 tip 分离可数;全部收进 4:5 卡片安全区(x 80—320),不被裁切。
 * 原文未载毛色,故通体线描骨架 + 淡墨晕染;矿物点染 ≤3:旧金目色、朱砂鸣线、中尾旧金尖。
 */

const TAIL_BASE = { x: 250, y: 212 }
const rad = (deg: number) => (deg * Math.PI) / 180

/**
 * 单尾叶形路径:根宽渐饱、中段隆起、圆尖收尾(三次曲线),整尾向 bend 方向弯垂。
 * 全部 tip 收在 4:5 安全区(x≤318)内。
 */
function tailPath(angleDeg: number, len: number, wBase: number): string {
  const bend = -10
  const a = rad(angleDeg)
  const tipA = rad(angleDeg + bend)
  const { x: bx, y: by } = TAIL_BASE
  const px = -Math.sin(a)
  const py = Math.cos(a)
  const hw = wBase / 2
  const tx = bx + len * Math.cos(tipA)
  const ty = by + len * Math.sin(tipA)
  const tpx = -Math.sin(tipA)
  const tpy = Math.cos(tipA)
  const tw = 4 // 圆尖半宽
  // 两侧控制点:上缘外鼓、下缘缓直,形成叶形
  const c1 = {
    x: bx + len * 0.42 * Math.cos(rad(angleDeg + bend * 0.7)) + px * hw * 1.25,
    y: by + len * 0.42 * Math.sin(rad(angleDeg + bend * 0.7)) + py * hw * 1.25,
  }
  const c2 = {
    x: bx + len * 0.42 * Math.cos(rad(angleDeg + bend * 0.7)) - px * hw * 0.9,
    y: by + len * 0.42 * Math.sin(rad(angleDeg + bend * 0.7)) - py * hw * 0.9,
  }
  return [
    `M ${(bx + px * hw).toFixed(1)} ${(by + py * hw).toFixed(1)}`,
    `C ${(c1.x).toFixed(1)} ${(c1.y).toFixed(1)} ${(tx + tpx * tw * 2).toFixed(1)} ${(ty + tpy * tw * 2).toFixed(1)} ${(tx + tpx * tw).toFixed(1)} ${(ty + tpy * tw).toFixed(1)}`,
    `Q ${tx.toFixed(1)} ${ty.toFixed(1)} ${(tx - tpx * tw).toFixed(1)} ${(ty - tpy * tw).toFixed(1)}`,
    `C ${(tx - tpx * tw * 2).toFixed(1)} ${(ty - tpy * tw * 2).toFixed(1)} ${(c2.x).toFixed(1)} ${(c2.y).toFixed(1)} ${(bx - px * hw).toFixed(1)} ${(by - py * hw).toFixed(1)}`,
    'Z',
  ].join(' ')
}

/** 后层三尾(浅,穿插于前层间隙),前层六尾(深,扇形主体)。角度/长度保证 tip x ≤318。 */
const BACK_TAILS = [
  { a: -85, len: 116, w: 26 },
  { a: -65, len: 128, w: 28 },
  { a: -45, len: 96, w: 26 },
]
const FRONT_TAILS = [
  { a: -95, len: 108, w: 27 },
  { a: -75, len: 124, w: 28 },
  { a: -55, len: 120, w: 28 },
  { a: -38, len: 86, w: 26 },
  { a: -24, len: 74, w: 24 },
  { a: -15, len: 66, w: 22 },
]

export default function JiuweihuArt() {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="九尾狐插画:伏踞的狐形,九条尾如扇分层披展,昂首张口(据原文描述艺术演绎)"
    >
      <ArtCanvas id="jiuweihu" mistA="rgba(88, 115, 103, 0.20)" groundY={252} />

      {/* 兽后淡墨,衬出轮廓 */}
      <ellipse cx="200" cy="200" rx="150" ry="66" fill="#587367" opacity="0.16" />

      <g>
        {/* 后层三尾:浅墨,穿插于前层之间(远景) */}
        <g fill="#182620" stroke="#D9D6C9" strokeWidth="0.8" opacity="0.5">
          {BACK_TAILS.map((t) => (
            <path key={t.a} d={tailPath(t.a, t.len, t.w)} />
          ))}
        </g>

        {/* 前层六尾:墨色主体,浅线描勾边,尾尖彼此分离可数(中景) */}
        <g fill="#0C120F" stroke="#D9D6C9" strokeWidth="1" opacity="0.96">
          {FRONT_TAILS.map((t) => (
            <path key={t.a} d={tailPath(t.a, t.len, t.w)} />
          ))}
        </g>
        {/* 中尾旧金尖(点染 3/3) */}
        <circle cx="272" cy="98" r="2.2" fill="#B18B56" opacity="0.9" />

        {/* 主体:伏踞,昂首张口(其音如婴儿) */}
        <path
          fill="#0C120F"
          d="M150 252
             L154 216
             C150 198 142 186 130 178
             C118 168 112 156 112 142
             C112 130 107 120 97 114
             L106 108
             C116 102 126 104 133 99
             L128 76
             L146 92
             L158 70
             L166 96
             C180 102 190 114 196 130
             C202 146 212 158 228 164
             C246 170 254 184 254 202
             C254 222 250 238 246 252
             L214 252
             L218 224
             C218 210 212 200 202 194
             L184 190
             C176 206 172 226 171 252
             Z"
        />
        {/* 背脊线描:提亮狐形辨识度 */}
        <path
          d="M166 96 C180 102 190 114 196 130 C202 146 212 158 228 164"
          fill="none"
          stroke="#D9D6C9"
          strokeWidth="1"
          opacity="0.4"
        />

        {/* 前腿下半(与身分离的剪影腿) */}
        <path d="M148 252 L152 228 C153 220 150 214 144 210 L136 208 C132 224 130 238 130 252 Z" fill="#0C120F" />

        {/* 目:旧金一点(点染 1/3) */}
        <circle cx="112" cy="128" r="2.6" fill="#B18B56" opacity="0.9" />
        {/* 张口:一线朱砂示意鸣声(其音如婴儿,点染 2/3) */}
        <path d="M97 114 L88 118" stroke="#A74738" strokeWidth="1.6" opacity="0.75" />
        {/* 鸣声波纹:两道淡金弧,示意声出于口 */}
        <g fill="none" stroke="#B18B56" strokeWidth="1" opacity="0.4">
          <path d="M80 106 C72 112 68 120 68 130" />
          <path d="M72 98 C60 106 54 118 54 132" />
        </g>
      </g>
    </svg>
  )
}
