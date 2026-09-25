import { Link } from 'react-router-dom'
import { useFavorites } from '../hooks/useFavorites'
import type { Entity } from '../data/types'
import { CHAPTERS } from '../data/chapters'
import { ENTITY_TYPE_LABELS, RECORD_STATUS_LABELS } from '../data/entities'
import BeastArtwork from './art/BeastArtwork'
import { classicArtFor } from '../data/classicArt'
import styles from './EntityCard.module.css'

interface EntityCardProps {
  entity: Entity
  locationName?: string
}

/**
 * 图鉴条目卡(V09 精修):插画约 65%,信息首屏仅名称/拼音/类型/出处/
 * 一项原文特征;整卡可进详情(收藏钮独立);悬停:轻放大+旧金描边+2px 上浮+「阅此卷」。
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

  return (
    <article className={styles.card}>
      <Link
        className={styles.cardLink}
        to={`/catalog/${entity.slug}`}
        aria-label={`${entity.canonicalName}(${entity.pinyin}),查看条目详情`}
      >
        <div className={styles.art} aria-hidden="true">
          <BeastArtwork slug={entity.slug} name={entity.canonicalName} variant="card" />
          <span className={styles.artNote}>{classicArtFor(entity.slug)?.note ?? '据原文演绎'}</span>
          <span className={styles.artCue} aria-hidden="true">
            阅此卷 →
          </span>
        </div>

        <div className={styles.body}>
          <div className={styles.identity}>
            <span className={styles.type}>{ENTITY_TYPE_LABELS[entity.type]}</span>
            <span className={`${styles.status} ${styles[entity.recordStatus]}`}>
              {RECORD_STATUS_LABELS[entity.recordStatus]}
            </span>
          </div>
          <p className={styles.nameRow}>
            <span className={styles.name}>{entity.canonicalName}</span>
            <span className={styles.pinyin}>{entity.pinyin}</span>
          </p>

          <p className={styles.meta}>
            {chapterNames && <span>{chapterNames}</span>}
            {locationName && (
              <>
                <span className={styles.metaDivider} aria-hidden="true">
                  ·
                </span>
                <span>{locationName}</span>
              </>
            )}
          </p>

          {firstTrait && (
            <p className={styles.trait}>
              <span className={styles.traitLabel}>原文线索</span>
              {firstTrait.text}
            </p>
          )}
        </div>
      </Link>
      <button
        type="button"
        className={favorited ? `${styles.fav} ${styles.favOn}` : styles.fav}
        aria-pressed={favorited}
        aria-label={favorited ? `取消收藏${entity.canonicalName}` : `收藏${entity.canonicalName}`}
        title={favorited ? `取消收藏${entity.canonicalName}` : `收藏${entity.canonicalName}`}
        onClick={() => toggle(entity.id)}
      >
        {favorited ? '已藏' : '藏'}
      </button>
    </article>
  )
}
