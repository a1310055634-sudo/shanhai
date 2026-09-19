import EmptyState from '../components/EmptyState'
import styles from './PlaceholderPage.module.css'

interface PlaceholderPageProps {
  /** 篇章式编号装饰,如「卷 · 二」 */
  volumeMark: string
  title: string
  pinyin: string
  description: string
}

/**
 * 阶段过渡占位页:内容区块在后续轮次逐卷开放。
 * 每个占位页有真实的标题与说明,不做假内容。
 */
export default function PlaceholderPage({
  volumeMark,
  title,
  pinyin,
  description,
}: PlaceholderPageProps) {
  return (
    <div className={styles.page}>
      <header className={styles.pageHead}>
        <p className={styles.volumeMark} aria-hidden="true">
          {volumeMark}
        </p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.pinyin}>{pinyin}</p>
      </header>
      <EmptyState
        title="此卷编纂中"
        description={description}
        action={{ to: '/', label: '返回卷首' }}
      />
    </div>
  )
}
