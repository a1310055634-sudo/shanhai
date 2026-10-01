import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import EntityCard from '../components/EntityCard'
import { useFavorites } from '../hooks/useFavorites'
import { useReadingHistory } from '../hooks/useReadingHistory'
import { ENTITIES, ENTITY_TYPE_LABELS } from '../data/entities'
import styles from './FavoritesPage.module.css'

/** 收藏与最近阅读(规范第七节第 6 条):全部本地存储,无账号。 */
export default function FavoritesPage() {
  const { ids, clear: clearFavorites } = useFavorites()
  const { entries, clear: clearHistory } = useReadingHistory()

  const favoriteEntities = ids
    .map((id) => ENTITIES.find((e) => e.id === id))
    .filter((e): e is NonNullable<typeof e> => Boolean(e))

  const historyEntities = entries.map((entry) => ({
    entry,
    entity: ENTITIES.find((e) => e.slug === entry.slug),
  }))
  const visibleHistory = historyEntities.filter((h) => h.entity)

  return (
    <div className={styles.page}>
      <SectionHeading
        index="藏"
        title="收藏与最近阅读"
        subtitle="SHOU CANG YU YUE DU"
        note="收藏与阅读记录只保存在本机浏览器中,无需账号;清除浏览器数据会一并清除。"
        level={1}
      />

      {/* 收藏 */}
      <section className={styles.block} aria-label="我的收藏">
        <div className={styles.blockHead}>
          <h2 className={styles.blockTitle}>我的收藏</h2>
          {favoriteEntities.length > 0 && (
            <button type="button" className={styles.clear} onClick={clearFavorites}>
              清空收藏
            </button>
          )}
        </div>
        {favoriteEntities.length > 0 ? (
          <div className={styles.grid}>
            {favoriteEntities.map((entity) => (
              <EntityCard key={entity.id} entity={entity} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptySeal} aria-hidden="true">
              藏
            </p>
            <p className={styles.emptyTitle}>此卷尚未珍藏</p>
            <p className={styles.emptyDesc}>
              在图鉴或条目详情中点按「藏」字,即可将条目收于本卷。
            </p>
            <Link className={styles.emptyAction} to="/catalog">
              去图鉴寻访
            </Link>
          </div>
        )}
      </section>

      {/* 最近阅读 */}
      <section className={styles.block} aria-label="最近阅读">
        <div className={styles.blockHead}>
          <h2 className={styles.blockTitle}>最近阅读</h2>
          {historyEntities.length > 0 && (
            <button type="button" className={styles.clear} onClick={clearHistory}>
              清空记录
            </button>
          )}
        </div>
        {visibleHistory.length > 0 ? (
          <ul className={styles.history}>
            {visibleHistory.map(({ entry, entity }) => (
                <li key={entry.slug} className={styles.historyRow}>
                  <Link className={styles.historyName} to={`/catalog/${entity!.slug}`}>
                    {entity!.canonicalName}
                    <span className={styles.historyPinyin}>{entity!.pinyin}</span>
                  </Link>
                  <span className={styles.historyMeta}>
                    {ENTITY_TYPE_LABELS[entity!.type]}
                  </span>
                  <span className={styles.historyTime}>
                    {new Date(entry.ts).toLocaleString('zh-CN', {
                      hour12: false,
                      month: 'numeric',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </li>
            ))}
          </ul>
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptySeal} aria-hidden="true">
              读
            </p>
            <p className={styles.emptyTitle}>还没有阅读记录</p>
            <p className={styles.emptyDesc}>
              打开任意条目详情,这里会记下最近的足迹。
            </p>
            <Link className={styles.emptyAction} to="/catalog">
              从图鉴开始
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}
