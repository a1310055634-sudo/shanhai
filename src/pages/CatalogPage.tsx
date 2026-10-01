import { Link, useSearchParams } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import EntityCard from '../components/EntityCard'
import CatalogFilters, { hasActiveFilters, matchQuery, type CatalogQuery } from '../components/CatalogFilters'
import { CHAPTERS } from '../data/chapters'
import { ENTITY_TYPE_LABELS, RECORD_STATUS_LABELS, ENTITIES } from '../data/entities'
import { getLocation } from '../data/locations'
import styles from './CatalogPage.module.css'

function readQuery(params: URLSearchParams): CatalogQuery {
  const view = params.get('view') === 'list' ? 'list' : 'grid'
  return {
    q: params.get('q') ?? '',
    chapter: params.get('chapter') ?? '',
    type: params.get('type') ?? '',
    status: params.get('status') ?? '',
    view,
  }
}

/**
 * 万物图鉴:搜索与筛选(状态同步到 URL,可分享刷新)、网格/列表双视图。
 * 分类为本站阅读索引,非《山海经》原有分类法。
 */
export default function CatalogPage() {
  const [params, setParams] = useSearchParams()
  const query = readQuery(params)

  const patch = (p: Partial<CatalogQuery>) => {
    const next = { ...query, ...p }
    const out = new URLSearchParams()
    if (next.q) out.set('q', next.q)
    if (next.chapter) out.set('chapter', next.chapter)
    if (next.type) out.set('type', next.type)
    if (next.status) out.set('status', next.status)
    if (next.view === 'list') out.set('view', 'list')
    setParams(out, { replace: true })
  }

  const clear = () => setParams(new URLSearchParams(), { replace: true })

  const filtered = ENTITIES.filter((e) => matchQuery(e, query))
  const verifiedCount = ENTITIES.filter((e) => e.recordStatus === 'verified').length

  return (
    <div className={styles.page}>
      <SectionHeading
        index="图鉴"
        title="异兽与万物图鉴"
        subtitle="SHAN HAI CATALOG"
        note="本图鉴为阅读索引,条目含异兽、鸟族、水族、神祇、国族、草木、矿物、器物与山川水系。分类方式为本站所拟,并非《山海经》原有分类。每条均附原文出处,录入前经公开文本逐字核对。"
        level={1}
      />

      <CatalogFilters
        query={query}
        onChange={patch}
        onClear={clear}
        resultCount={filtered.length}
      />

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptySeal} aria-hidden="true">
            无
          </p>
          <p className={styles.emptyTitle}>未检得相应条目</p>
          <p className={styles.emptyDesc}>
            {hasActiveFilters(query)
              ? '当前检索与筛选没有匹配的条目。它可能尚未录入,或换个字词再试。'
              : '图鉴暂无条目。'}
          </p>
          {hasActiveFilters(query) && (
            <button type="button" className={styles.emptyAction} onClick={clear}>
              清除全部筛选
            </button>
          )}
        </div>
      ) : query.view === 'list' ? (
        <ul className={styles.list}>
          {filtered.map((entity) => {
            const location = entity.locationIds
              .map((id) => getLocation(id))
              .find(Boolean)
            const chapterNames = entity.chapterIds
              .map((id) => CHAPTERS.find((c) => c.id === id)?.name)
              .filter(Boolean)
              .join('、')
            return (
              <li key={entity.id} className={styles.listRow}>
                <Link className={styles.listName} to={`/catalog/${entity.slug}`}>
                  {entity.canonicalName}
                  <span className={styles.listPinyin}>{entity.pinyin}</span>
                </Link>
                <span className={styles.listMeta}>
                  {ENTITY_TYPE_LABELS[entity.type]}
                  {chapterNames && ` · ${chapterNames}`}
                  {location && ` · ${location.canonicalName}`}
                </span>
                <span className={styles.listStatus}>
                  {RECORD_STATUS_LABELS[entity.recordStatus]}
                </span>
              </li>
            )
          })}
        </ul>
      ) : (
        <div className={styles.grid}>
          {filtered.map((entity) => {
            const location = entity.locationIds
              .map((id) => getLocation(id))
              .find(Boolean)
            return (
              <EntityCard
                key={entity.id}
                entity={entity}
                locationName={location?.canonicalName}
              />
            )
          })}
        </div>
      )}

      <p className={styles.progressNote}>
        已收录 {ENTITIES.length} 条,其中逐字核验 {verifiedCount} 条;首批目标十二条,条目随核验进度逐卷录入。
        「最近阅读」与「收藏」可在对应页面查看,记录仅保存在本机浏览器中。
      </p>
    </div>
  )
}
