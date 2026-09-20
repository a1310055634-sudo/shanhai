import type { ComponentType } from 'react'
import JiuweihuArt from './registry/jiuweihu'
import FenghuangArt from './registry/fenghuang'
import JingweiArt from './registry/jingwei'
import DijiangArt from './registry/dijiang'
import styles from './BeastArtwork.module.css'

/**
 * 统一异兽插画组件(V01 建立接口,规则详见 VISUAL_SPRINT.md「插画统一规则」)。
 *
 * - 画布 viewBox 0 0 400 300,slice 裁切(卡片 4:5、详情 4:3 均安全);
 * - 线描骨架 #D9D6C9 / #B18B56(1—1.5px);淡墨晕染 #587367 / #31545A 低透明度;
 *   矿物色点染每幅 ≤3 处;主体占 55%—70%,底部统一地线;
 * - 原文未载的部分以云雾、留白处理;「据原文描述艺术演绎」标识由外层容器输出;
 * - 画面内不出现文字(作品名由页面标题承担)。
 *
 * 扩展点:V02 起为每条目在 ART_REGISTRY 注册正式插画组件(带独立轮廓/姿态/点色);
 * 未注册的 slug 暂时显示统一水墨底座过渡层——它不是最终插画,V02—V07 将全部替换。
 */

type ArtComponent = ComponentType

/**
 * 正式插画注册表:REGISTRY[slug] = 插画组件。
 * V02: jiuweihu / fenghuang(已完成);
 * V03: jingwei / dijiang(已完成);
 * V04: luwu / yingzhao;
 * V05: zhuyin / yinglong;V06: kui / wenyaoyu;V07: xingxing / lushu。
 */
const ART_REGISTRY: Record<string, ArtComponent> = {
  jiuweihu: JiuweihuArt,
  fenghuang: FenghuangArt,
  jingwei: JingweiArt,
  dijiang: DijiangArt,
}

/** 按slug 稳定取一组色调,使过渡底座彼此有别(确定性,非随机)。 */
const TONES = [
  { mistA: 'rgba(88, 115, 103, 0.18)', mistB: 'rgba(88, 115, 103, 0.10)', line: '#587367', star: '#F3EEE2' },
  { mistA: 'rgba(49, 84, 90, 0.22)', mistB: 'rgba(49, 84, 90, 0.12)', line: '#31545A', star: '#B18B56' },
  { mistA: 'rgba(177, 139, 86, 0.13)', mistB: 'rgba(177, 139, 86, 0.08)', line: '#B18B56', star: '#F3EEE2' },
]

function toneFor(slug: string) {
  let h = 0
  for (let i = 0; i < slug.length; i += 1) h = (h * 31 + slug.charCodeAt(i)) % 997
  return TONES[h % TONES.length]
}

export default function BeastArtwork({
  slug,
  name,
  variant = 'card',
}: {
  slug: string
  name: string
  variant?: 'card' | 'detail'
}) {
  const Registered = ART_REGISTRY[slug]
  if (Registered) return <Registered />

  // —— 统一水墨底座(过渡层,V02—V07 逐条替换)——
  const tone = toneFor(slug)
  const shift = variant === 'detail' ? 0 : 26
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`${name}插画(据原文描述艺术演绎)`}
      className={styles.art}
    >
      <defs>
        <linearGradient id={`ba-bg-${slug}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#121b17" />
          <stop offset="100%" stopColor="#0d1311" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#ba-bg-${slug})`} />

      {/* 星屑两三点(月白,非圆环) */}
      <circle cx={330 - shift} cy={54} r={1.4} fill={tone.star} opacity="0.5" />
      <circle cx={356 - shift} cy={82} r={1} fill={tone.star} opacity="0.35" />
      <circle cx={306 - shift} cy={100} r={0.8} fill={tone.star} opacity="0.28" />

      {/* 淡墨晕染 */}
      <ellipse cx={200 + shift * 0.4} cy={196} rx={230} ry={70} fill={tone.mistA} />
      <ellipse cx={160 + shift * 0.2} cy={236} rx={180} ry={54} fill={tone.mistB} />

      {/* 古籍线描地线(远山/水纹二选一,按色调微差) */}
      <path
        d={`M-10 ${214 + shift * 0.1} C90 ${190 + shift * 0.1} 180 ${202 + shift * 0.1} 270 ${186 + shift * 0.1} C330 ${175 + shift * 0.1} 380 ${186 + shift * 0.1} 410 ${180 + shift * 0.1}`}
        fill="none"
        stroke={tone.line}
        strokeWidth="1.1"
        opacity="0.5"
      />
      <path
        d={`M-10 ${244 + shift * 0.1} C110 ${222 + shift * 0.1} 210 ${234 + shift * 0.1} 310 ${218 + shift * 0.1}`}
        fill="none"
        stroke={tone.line}
        strokeWidth="1"
        opacity="0.3"
      />
    </svg>
  )
}
