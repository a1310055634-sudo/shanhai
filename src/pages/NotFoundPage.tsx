import { useLocation } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import styles from './NotFoundPage.module.css'

/** 未知路径:给出明确去向,不留死胡同。 */
export default function NotFoundPage() {
  const location = useLocation()
  return (
    <div className={styles.page}>
      <p className={styles.mark} aria-hidden="true">
        卷 · 佚
      </p>
      <EmptyState
        title="此页不在山海之间"
        description={`未找到「${location.pathname}」对应的篇章。它可能尚未编纂,或路径有误。`}
        action={{ to: '/', label: '返回卷首' }}
      />
    </div>
  )
}
