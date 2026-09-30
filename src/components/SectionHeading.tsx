import Rule from './common/Rule'
import styles from './SectionHeading.module.css'

interface SectionHeadingProps {
  /** 章节编号,如「壹」或「01」;纯装饰 */
  index?: string
  title: string
  /** 小字副题:拼音或英文 */
  subtitle?: string
  /** 一行说明(编辑说明性质) */
  note?: string
  /** 页面顶层标题使用 h1,详情页内部区块保持默认 h2。 */
  level?: 1 | 2
}

/** 通用章节标题:编号 + 宋体标题 + 小字副题 + 细线。 */
export default function SectionHeading({ index, title, subtitle, note, level = 2 }: SectionHeadingProps) {
  const Heading = level === 1 ? 'h1' : 'h2'

  return (
    <header className={styles.head}>
      <div className={styles.row}>
        {index && (
          <span className={styles.index} aria-hidden="true">
            {index}
          </span>
        )}
        <div className={styles.titles}>
          <Heading className={styles.title}>{title}</Heading>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </div>
      {note && <p className={styles.note}>{note}</p>}
      {/* G07 金线收头:回纹端头对称线,替换原单侧渐变线 */}
      <Rule kind="meander" className={styles.ruleWrap} />
    </header>
  )
}
