import type { Entity } from '../data/types'
import { CHAPTERS } from '../data/chapters'
import { ENTITY_TYPE_LABELS, RECORD_STATUS_LABELS } from '../data/entities'
import styles from './CatalogFilters.module.css'

export interface CatalogQuery {
  q: string
  chapter: string
  type: string
  status: string
  view: 'grid' | 'list'
}

/** 单项筛选判定。 */
export function matchQuery(entity: Entity, query: CatalogQuery): boolean {
  if (query.chapter && !entity.chapterIds.includes(query.chapter)) return false
  if (query.type && entity.type !== query.type) return false
  if (query.status && entity.recordStatus !== query.status) return false
  const q = query.q.trim().toLowerCase()
  if (q) {
    const hay = [
      entity.canonicalName,
      entity.pinyin,
      ...entity.aliases,
      ...entity.tags,
      ...entity.citations.map((c) => c.originalText),
    ]
      .join('|')
      .toLowerCase()
    if (!hay.includes(q)) return false
  }
  return true
}

export function hasActiveFilters(query: CatalogQuery): boolean {
  return Boolean(query.q || query.chapter || query.type || query.status)
}

interface CatalogFiltersProps {
  query: CatalogQuery
  onChange: (patch: Partial<CatalogQuery>) => void
  onClear: () => void
  resultCount: number
}

/** 图鉴筛选器(规范第五节):搜索 + 篇章/类型/核验状态 + 视图切换 + 清除。 */
export default function CatalogFilters({
  query,
  onChange,
  onClear,
  resultCount,
}: CatalogFiltersProps) {
  return (
    <div className={styles.filters} role="search" aria-label="图鉴检索与筛选">
      <div className={styles.filtersHead}>
        <p className={styles.filtersTitle}>检索图鉴</p>
        <p className={styles.filtersHint}>可搜索名称、异名、拼音、标签与原文词语</p>
      </div>
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="catalog-q">
            搜索
          </label>
          <input
            id="catalog-q"
            className={styles.input}
            type="search"
            placeholder="名称、异名、拼音或原文字词"
            value={query.q}
            onChange={(e) => onChange({ q: e.target.value })}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="catalog-chapter">
            篇章
          </label>
          <select
            id="catalog-chapter"
            className={styles.select}
            value={query.chapter}
            onChange={(e) => onChange({ chapter: e.target.value })}
          >
            <option value="">全部篇章</option>
            {CHAPTERS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="catalog-type">
            类型
          </label>
          <select
            id="catalog-type"
            className={styles.select}
            value={query.type}
            onChange={(e) => onChange({ type: e.target.value })}
          >
            <option value="">全部类型</option>
            {Object.entries(ENTITY_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="catalog-status">
            资料状态
          </label>
          <select
            id="catalog-status"
            className={styles.select}
            value={query.status}
            onChange={(e) => onChange({ status: e.target.value })}
          >
            <option value="">全部状态</option>
            {Object.entries(RECORD_STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>视图</span>
          <div className={styles.viewToggle} role="group" aria-label="视图切换">
            <button
              type="button"
              className={query.view === 'grid' ? `${styles.viewBtn} ${styles.viewOn}` : styles.viewBtn}
              aria-pressed={query.view === 'grid'}
              onClick={() => onChange({ view: 'grid' })}
            >
              网格
            </button>
            <button
              type="button"
              className={query.view === 'list' ? `${styles.viewBtn} ${styles.viewOn}` : styles.viewBtn}
              aria-pressed={query.view === 'list'}
              onClick={() => onChange({ view: 'list' })}
            >
              列表
            </button>
          </div>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>
            结果
          </span>
          <div className={styles.resultRow}>
            <span className={styles.count} aria-live="polite">{resultCount} 条</span>
            {hasActiveFilters(query) && (
              <button type="button" className={styles.clear} onClick={onClear}>
                清除筛选
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
