import { useFavorites } from '../hooks/useFavorites'
import type { Entity } from '../data/types'
import { CHAPTERS } from '../data/chapters'
import { ENTITY_TYPE_LABELS, RECORD_STATUS_LABELS } from '../data/entities'
import styles from './EntityCard.module.css'

interface EntityCardProps {
  entity: Entity
  locationName?: string
  /** 详情页开放前禁用链接,只作展示 */
  detailEnabled?: boolean
}

/**
 * 图鉴条目卡:4:5 插画区(统一线描占位,艺术演绎)+ 名称拼音 +
 * 类型/篇章/地域 + 摘要 + 一项原文特征 + 资料状态 + 收藏。
 */
export default function EntityCard({
  entity,
  locationName,
  detailEnabled = false,
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
        <svg viewBox="0 0 200 250" preserveAspectRatio="xMidYMid slice">
          <rect width="200" height="250" fill="#131c18" />
          {/* 统一线描:山影 + 游线(装饰) */}
          <path
            d="M-10 210 C40 190 70 200 100 186 C140 168 165 186 210 172"
            fill="none"
            stroke="#587367"
            strokeWidth="1"
            opacity="0.4"
          />
          <path
            d="M-10 226 C50 210 90 218 130 206 C160 198 185 206 210 198"
            fill="none"
            stroke="#31545A"
            strokeWidth="1"
            opacity="0.5"
          />
          <circle
            cx="156"
            cy="58"
            r="20"
            fill="none"
            stroke="#B18B56"
            strokeWidth="0.8"
            opacity="0.45"
          />
        </svg>
        <span className={styles.artSeal}>{entity.canonicalName.slice(0, 1)}</span>
        <span className={styles.artNote}>艺术演绎</span>
      </div>

      <div className={styles.body}>
        <div className={styles.titleRow}>
          {detailEnabled ? (
            <a className={styles.titleLink} href={`/catalog/${entity.slug}`}>
              {title}
            </a>
          ) : (
            <div className={styles.titlePlain}>{title}</div>
          )}
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
