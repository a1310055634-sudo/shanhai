import { Link } from 'react-router-dom'
import styles from './EmptyState.module.css'

interface EmptyStateProps {
  /** 卷册式编号,如「卷二」;纯装饰 */
  volumeMark?: string
  title: string
  description?: string
  action?: { to: string; label: string }
}

/** 通用空状态:内容未开放、无结果、缺数据时的统一呈现。 */
export default function EmptyState({
  volumeMark,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className={styles.empty}>
      {volumeMark && (
        <p className={styles.volumeMark} aria-hidden="true">
          {volumeMark}
        </p>
      )}
      <p className={styles.seal} aria-hidden="true">
        待
      </p>
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
      {action && (
        <Link className={styles.action} to={action.to}>
          {action.label}
        </Link>
      )}
    </div>
  )
}
