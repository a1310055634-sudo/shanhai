import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHeading from '../SectionHeading'
import PaperTexture from '../common/PaperTexture'
import { CHAPTERS } from '../../data/chapters'
import { getVerifiedEntities } from '../../data/entities'
import styles from './TodayBeast.module.css'

/** 「今日异兽」:只从 verified 条目中抽取,可「换一只」。 */
export default function TodayBeast() {
  const verified = useMemo(() => getVerifiedEntities(), [])
  const [index, setIndex] = useState(() => Math.floor(Math.random() * verified.length))

  if (verified.length === 0) {
    return null
  }

  const entity = verified[index % verified.length]
  const chapterNames = entity.chapterIds
    .map((id) => CHAPTERS.find((c) => c.id === id)?.name)
    .filter(Boolean)
    .join('、')

  const swap = () => {
    setIndex((prev) => {
      if (verified.length <= 1) return prev
      let next = prev
      while (next === prev) {
        next = Math.floor(Math.random() * verified.length)
      }
      return next
    })
  }

  return (
    <section className={styles.section} aria-label="今日异兽">
      <SectionHeading index="今日" title="今日异兽" subtitle="JIN RI YI SHOU" />

      <div className={styles.card}>
        <div className={styles.info}>
          <p className={styles.meta}>
            <span className={styles.chapter}>{chapterNames}</span>
            <span className={styles.dot} aria-hidden="true">
              ·
            </span>
            <span>已核验</span>
          </p>
          <p className={styles.nameRow}>
            <Link className={styles.name} to={`/catalog/${entity.slug}`}>
              {entity.canonicalName}
            </Link>
            <span className={styles.pinyin}>{entity.pinyin}</span>
          </p>
          <p className={styles.aliasLine}>
            {entity.aliases.length > 0
              ? `异名:${entity.aliases.join('、')}`
              : '本条底本未见异名记载'}
          </p>
          <blockquote className={styles.quote}>
            <PaperTexture />
            {entity.citations[0]?.originalText}
          </blockquote>
          <p className={styles.quoteSource}>
            ——《山海经·{entity.citations[0]?.chapter}》·
            {entity.citations[0]?.section}
          </p>
          <div className={styles.actions}>
            <Link className={styles.primary} to={`/catalog/${entity.slug}`}>
              查看完整条目
            </Link>
            <button type="button" className={styles.swap} onClick={swap}>
              换一只
            </button>
          </div>
        </div>
        <div className={styles.feature} aria-hidden="true">
          <span className={styles.featureSeal}>{entity.canonicalName.slice(0, 1)}</span>
          <p className={styles.featureTrait}>{entity.summary}</p>
        </div>
      </div>
    </section>
  )
}
