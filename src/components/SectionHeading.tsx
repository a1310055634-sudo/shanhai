import styles from './SectionHeading.module.css'

interface SectionHeadingProps {
  /** 章节编号,如「壹」或「01」;纯装饰 */
  index?: string
  title: string
  /** 小字副题:拼音或英文 */
  subtitle?: string
  /** 一行说明(编辑说明性质) */
  note?: string
}

/** 通用章节标题:编号 + 宋体标题 + 小字副题 + 细线。 */
export default function SectionHeading({ index, title, subtitle, note }: SectionHeadingProps) {
  return (
    <header className={styles.head}>
      <div className={styles.row}>
        {index && (
          <span className={styles.index} aria-hidden="true">
            {index}
          </span>
        )}
        <div className={styles.titles}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </div>
      {note && <p className={styles.note}>{note}</p>}
      <div className={styles.rule} aria-hidden="true" />
    </header>
  )
}
