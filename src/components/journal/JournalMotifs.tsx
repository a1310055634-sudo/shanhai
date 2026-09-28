import styles from './JournalMotifs.module.css'

/**
 * 站点场景意象层(R08 招摇起,R12 扩展亶爰/基山)。
 * 每站通过 slug 匹配专属意象 SVG;纯装饰 aria-hidden,无内容文字。
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
          <path d="M36 118 C42 110 50 108 56 112 C52 120 44 122 36 118 Z" fill="#587367" opacity="0.2" stroke="none" />
          <path d="M62 106 C68 98 76 96 82 100 C78 108 70 110 62 106 Z" fill="#587367" opacity="0.16" stroke="none" />
        </g>
        {/* 金玉光点 */}
        <circle cx="350" cy="112" r="2.5" fill="#b18b56" opacity="0.6" />
        <circle cx="640" cy="120" r="2" fill="#f3eee2" opacity="0.4" />
        <circle cx="980" cy="108" r="2.5" fill="#b18b56" opacity="0.5" />
      </svg>
    )
  }
  if (slug === 'loc-chuyang') {
    return (
      <svg
        className={styles.motifs}
        viewBox="0 0 1280 140"
        preserveAspectRatio="xMidYMax meet"
        aria-hidden="true"
        focusable="false"
      >
        {/* 赤金/白金对照:两组竖向双色棱形 */}
        <g opacity="0.2">
          <path d="M240 100 L254 114 L240 128 L226 114 Z" fill="#b18b56" />
          <path d="M280 106 L294 120 L280 134 L266 120 Z" fill="#f3eee2" opacity="0.5" />
          <path d="M320 100 L334 114 L320 128 L306 114 Z" fill="#b18b56" />
          <path d="M360 106 L374 120 L360 134 L346 120 Z" fill="#f3eee2" opacity="0.4" />
        </g>
        <rect x="420" y="108" width="80" height="3" rx="1.5" fill="#b18b56" opacity="0.3" />
        <rect x="520" y="108" width="80" height="3" rx="1.5" fill="#f3eee2" opacity="0.25" />
        <g stroke="#b18b56" fill="none" opacity="0.22">
          <path d="M680 112 C700 108 720 108 740 112" strokeWidth="1" />
          <path d="M700 120 C720 116 740 116 760 120" strokeWidth="0.8" />
        </g>
      </svg>
    )
  }
  if (slug === 'loc-danyuan') {
    return (
      <svg
        className={styles.motifs}
        viewBox="0 0 1280 140"
        preserveAspectRatio="xMidYMax meet"
        aria-hidden="true"
        focusable="false"
      >
        {/* 多水,无草木:寂水面涟漪,极简克制 */}
        <g stroke="#587367" fill="none" opacity="0.18">
          <path d="M80 118 C110 114 140 118 170 118" strokeWidth="0.8" />
          <path d="M1040 118 C1070 114 1100 118 1130 118" strokeWidth="0.8" />
        </g>
        {/* 无草木:无任何植物元素,以空旷感表达 */}
      </svg>
    )
  }
  if (slug === 'loc-jishan') {
    return (
      <svg
        className={styles.motifs}
        viewBox="0 0 1280 140"
        preserveAspectRatio="xMidYMax meet"
        aria-hidden="true"
        focusable="false"
      >
        {/* 阳多玉,阴多怪木:光暗两面构图 */}
        {/* 阳面(左):暖色微光斜线 */}
        <g stroke="#b18b56" opacity="0.2">
          <line x1="120" y1="96" x2="180" y2="122" strokeWidth="0.8" />
          <line x1="160" y1="90" x2="220" y2="116" strokeWidth="0.6" />
        </g>
        {/* 玉光点(暖色) */}
        <circle cx="180" cy="110" r="2" fill="#b18b56" opacity="0.5" />
        {/* 阴面(右):冷色怪木剪影 */}
        <g fill="none" stroke="#31545a" strokeWidth="1" opacity="0.2">
          <path d="M900 96 C920 88 950 84 980 88" />
          <path d="M940 92 C960 86 990 84 1010 90" />
        </g>
      </svg>
    )
  }
  if (slug === 'loc-qingqiu') {
    return (
      <svg
        className={styles.motifs}
        viewBox="0 0 1280 140"
        preserveAspectRatio="xMidYMax meet"
        aria-hidden="true"
        focusable="false"
      >
        {/* 其阳多玉:暖玉光点(左,向阳) */}
        <circle cx="180" cy="106" r="2.5" fill="#b18b56" opacity="0.55" />
        <circle cx="230" cy="118" r="1.8" fill="#f3eee2" opacity="0.4" />
        {/* 其阴多青䨼:矿彩青晕(右,向阴;主视觉是九尾狐版画展台,此处只作山色) */}
        <ellipse cx="980" cy="122" rx="260" ry="14" fill="#3f6b63" opacity="0.14" />
        <ellipse cx="1120" cy="116" rx="150" ry="9" fill="#587367" opacity="0.12" />
        {/* 一道青霭过渡 */}
        <path d="M420 116 C560 108 700 108 840 116" stroke="#587367" strokeWidth="0.8" fill="none" opacity="0.2" />
      </svg>
    )
  }
  return null
}
