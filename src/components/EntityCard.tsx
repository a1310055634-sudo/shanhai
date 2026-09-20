import { Link } from 'react-router-dom'
import { useFavorites } from '../hooks/useFavorites'
import type { Entity } from '../data/types'
import { CHAPTERS } from '../data/chapters'
import { ENTITY_TYPE_LABELS, RECORD_STATUS_LABELS } from '../data/entities'
import BeastArtwork from './art/BeastArtwork'
import styles from './EntityCard.module.css'

interface EntityCardProps {
  entity: Entity
  locationName?: string
}

/**
 * 图鉴条目卡:4:5 插画区(统一线描占位,艺术演绎)+ 名称拼音 +
 * 类型/篇章/地域 + 摘要 + 一项原文特征 + 资料状态 + 收藏。
 */
export default function EntityCard({
  entity,
  locationName,
}: EntityCardProps) {
  const { toggle, isFavorite } = useFavorites()
  const favorited = isFavorite(entity.id)
  const firstTrait = [
    ...entity.appearanceTraits,
    ...entity.soundTraits,
    ...entity.behaviorTraits,
    ...entity.dietTraits,
  ][0]
  const chapterNames = entity.chapterIds
    .map((id) => CHAPTERS.find((c) => c.id === id)?.name)
    .filter(Boolean)
    .join('、')

  const title = (
    <>
      <span className={styles.name}>{entity.canonicalName}</span>
      <span className={styles.pinyin}>{entity.pinyin}</span>
    </>
  )

  return (
    <article className={styles.card}>
      <div className={styles.art} aria-hidden="true">
        <BeastArtwork slug={entity.slug} name={entity.canonicalName} variant="card" />
        <span className={styles.artNote}>艺术演绎</span>
      </div>

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <Link
            className={styles.titleLink}
            to={`/catalog/${entity.slug}`}
            aria-label={`${entity.canonicalName},查看条目详情`}
          >
            {title}
          </Link>
          <button
            type="button"
            className={favorited ? `${styles.fav} ${styles.favOn}` : styles.fav}
            aria-pressed={favorited}
            aria-label={favorited ? `取消收藏${entity.canonicalName}` : `收藏${entity.canonicalName}`}
            onClick={() => toggle(entity.id)}
          >
            藏
          </button>
        </div>

        {entity.aliases.length > 0 && (
          <p className={styles.aliases}>异名:{entity.aliases.join('、')}</p>
        )}

        <p className={styles.meta}>
          <span>{ENTITY_TYPE_LABELS[entity.type]}</span>
          {chapterNames && (
            <>
              <span className={styles.metaDivider} aria-hidden="true">
                ·
              </span>
              <span>{chapterNames}</span>
            </>
          )}
          {locationName && (
            <>
              <span className={styles.metaDivider} aria-hidden="true">
                ·
              </span>
              <span>{locationName}</span>
            </>
          )}
        </p>

        <p className={styles.summary}>{entity.summary}</p>

        {firstTrait && (
          <p className={styles.trait}>
            <span className={styles.traitLabel}>原文</span>
            {firstTrait.text}
          </p>
        )}

        <p className={styles.footerRow}>
          <span className={`${styles.status} ${styles[entity.recordStatus]}`}>
            {RECORD_STATUS_LABELS[entity.recordStatus]}
          </span>
        </p>
      </div>
    </article>
  )
}
