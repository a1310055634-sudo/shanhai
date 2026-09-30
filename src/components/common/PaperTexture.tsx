import { useId } from 'react'
import styles from './PaperTexture.module.css'

/**
 * 宣纸纤维纹理层(G04,GALLERY_DESIGN.md §1.1)。
 * feTurbulence 分形噪声压成暖棕噪点;CSS 侧 opacity 0.05 + multiply。
 * 纯装饰:aria-hidden、pointer-events none、z-index -1(需宿主
 * position: relative + isolation: isolate,纸纹画在宿主背景之上、内容之下)。
 * 仅用于宣纸表面;墨夜面禁止使用(GALLERY_DESIGN.md §1.1 负面清单)。
 */
export default function PaperTexture() {
  const filterId = useId()
  return (
    <svg
      className={styles.layer}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      <filter id={filterId}>
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="2"
          seed="7"
          stitchTiles="stitch"
        />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.45  0 0 0 0 0.40  0 0 0 0 0.30  0 0 0 0.55 0"
        />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${filterId})`} />
    </svg>
  )
}
