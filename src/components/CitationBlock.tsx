import type { Citation } from '../data/types'
import styles from './CitationBlock.module.css'

interface CitationBlockProps {
  citation: Citation
  /** 锚点 id,供形貌档案「回看原文」跳转 */
  anchor?: string
}

/**
 * 原文证据块(规范第六节第 2 条):原文 + 篇章 + 版本 + 位置 +
 * 公开核对链接 + 异文说明 + 核验状态。每段独立呈现,不拼接。
 */
export default function CitationBlock({ citation, anchor }: CitationBlockProps) {
  return (
    <figure className={styles.cite} id={anchor}>
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
