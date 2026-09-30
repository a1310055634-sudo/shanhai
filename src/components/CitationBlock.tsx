import type { Citation } from '../data/types'
import PaperTexture from './common/PaperTexture'
import styles from './CitationBlock.module.css'

interface CitationBlockProps {
  citation: Citation
  /** 锚点 id,供形貌档案「回看原文」跳转;回看跳转时高亮 */
  anchor?: string
}

/**
 * 原文证据块(V10 精修):浅宣纸底 + 宋体原文 + 细朱砂左标 + 显著出处;
 * 每段独立呈现,不拼接。
 */
export default function CitationBlock({ citation, anchor }: CitationBlockProps) {
  return (
    <figure className={styles.cite} id={anchor}>
      <PaperTexture />
      <blockquote className={styles.text}>{citation.originalText}</blockquote>
      <figcaption className={styles.meta}>
        <p className={styles.line}>
          <span className={styles.label}>出处</span>
          《山海经·{citation.chapter}》{citation.section ? `· ${citation.section}` : ''}
        </p>
        <p className={styles.line}>
          <span className={styles.label}>版本</span>
          {citation.sourceEdition}
        </p>
        {citation.publicUrl && (
          <p className={styles.line}>
            <span className={styles.label}>核对</span>
            <a
              className={styles.link}
              href={citation.publicUrl}
              target="_blank"
              rel="noreferrer"
            >
              公开文本对照(新窗打开)
            </a>
          </p>
        )}
        {citation.variantText && (
          <p className={styles.variant}>
            <span className={styles.variantBadge}>存在异文</span>
            {citation.variantText}
          </p>
        )}
        <p className={styles.verify}>
          <span className={styles.verifyBadge}>已核验</span>
          {citation.verifiedAt && `核验于 ${citation.verifiedAt}`}
          {citation.verificationNote && ` · ${citation.verificationNote}`}
        </p>
      </figcaption>
    </figure>
  )
}
