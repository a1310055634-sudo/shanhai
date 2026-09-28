import styles from './JournalMotifs.module.css'

/**
 * R08 招摇定制场景意象:西海波纹、桂枝剪影、金玉光点。
 * 仅在招摇站作为场景带的装饰前景点缀;纯 SVG aria-hidden,无内容文字。
 * 不宣称是真实地理或生物复原;只表现古籍叙事意象。
 */
export default function JournalMotifs({ slug }: { slug: string }) {
  if (slug === 'loc-zhaoyao') {
    return (
      <svg
        className={styles.motifs}
        viewBox="0 0 1280 140"
        preserveAspectRatio="xMidYMax meet"
        aria-hidden="true"
        focusable="false"
      >
        {/* 西海波纹 */}
        <g stroke="#587367" fill="none" opacity="0.25">
          <path d="M60 118 Q90 112 120 118 Q150 124 180 118" strokeWidth="1" />
          <path d="M160 126 Q190 120 220 126 Q250 132 280 126" strokeWidth="0.8" />
          <path d="M1080 120 Q1110 114 1140 120 Q1170 126 1200 120" strokeWidth="0.8" />
        </g>
        {/* 桂枝剪影(左下角伸入) */}
        <g fill="none" stroke="#587367" strokeWidth="1.2" opacity="0.28">
          <path d="M20 128 C40 116 68 104 96 100" />
          <path d="M48 120 C58 108 70 100 84 96" />
          {/* 桂叶 */}
          <path d="M36 118 C42 110 50 108 56 112 C52 120 44 122 36 118 Z" fill="#587367" opacity="0.2" stroke="none" />
          <path d="M62 106 C68 98 76 96 82 100 C78 108 70 110 62 106 Z" fill="#587367" opacity="0.16" stroke="none" />
        </g>
        {/* 金玉光点(三点,对应「多桂,多金玉」) */}
        <circle cx="350" cy="112" r="2.5" fill="#b18b56" opacity="0.6" />
        <circle cx="640" cy="120" r="2" fill="#f3eee2" opacity="0.4" />
        <circle cx="980" cy="108" r="2.5" fill="#b18b56" opacity="0.5" />
      </svg>
    )
  }
  return null
}
