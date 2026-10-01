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
 * G24 郭璞注层:仅当该条注文已逐字核验(数据侧把关,未核条目无 guoPuNotes
 * 字段)才渲染可展开层;details/summary 原生键盘可达,默认收起,无开合动画。
 */
export default function CitationBlock({ citation, anchor }: CitationBlockProps) {
  const guoPuNotes = citation.guoPuNotes
  return (
    <figure className={styles.cite} id={anchor}>
      <PaperTexture />
      <blockquote className={styles.text}>{citation.originalText}</blockquote>
      {guoPuNotes && guoPuNotes.length > 0 && (
        <details className={styles.guopu}>
          <summary className={styles.guopuSummary}>
            <span className={styles.guopuBadge}>郭璞注</span>
            <span className={styles.guopuHint}>
              {guoPuNotes.length} 条 · 逐字照录底本原样(未转简)
            </span>
            <span aria-hidden="true" className={styles.guopuArrow} />
          </summary>
          <ul className={styles.guopuList}>
            {guoPuNotes.map((note, i) => (
              <li className={styles.guopuItem} key={i}>
                {note.attach && (
                  <span className={styles.guopuAttach}>{note.attach}</span>
                )}
                <span className={styles.guopuText}>{note.text}</span>
              </li>
            ))}
          </ul>
          <p className={styles.guopuSource}>
            注文逐字照录中文维基文库《山海經·南山經》郭璞注本(四庫全書底本),
            <a
              className={styles.link}
              href="https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93"
              target="_blank"
              rel="noreferrer"
            >
              对照原文(新窗打开)
            </a>
          </p>
        </details>
      )}
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
