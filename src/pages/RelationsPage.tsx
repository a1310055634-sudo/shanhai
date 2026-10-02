import { Link } from 'react-router-dom'
import LineageMap from '../components/relations/LineageMap'
import SectionHeading from '../components/SectionHeading'
import { CHAPTERS } from '../data/chapters'
import { ENTITIES, ENTITY_TYPE_LABELS, RECORD_STATUS_LABELS } from '../data/entities'
import { LOCATIONS } from '../data/locations'
import styles from './RelationsPage.module.css'

function chapterName(id: string) {
  return CHAPTERS.find((chapter) => chapter.id === id)?.name ?? id
}

function relatedEntities(entityId: string) {
  return ENTITIES.filter((other) => {
    if (other.id === entityId) return false
    const entity = ENTITIES.find((item) => item.id === entityId)
    if (!entity) return false
    return (
      other.chapterIds.some((id) => entity.chapterIds.includes(id)) ||
      other.locationIds.some((id) => entity.locationIds.includes(id))
    )
  })
}

/** 万物谱系:只展示篇章与地点带来的可核对关系,不虚构血缘或敌对关系。 */
export default function RelationsPage() {
  return (
    <div className={styles.page}>
      <SectionHeading
        index="谱系"
        title="万物谱系"
        subtitle="WAN WU PU XI"
        note="三方关系图呈现条目、山川与篇章的归属连接。关系全部来自已录入的数据字段，不把后世传说或网络设定当作古籍关系。"
        level={1}
      />

      <LineageMap />

      <SectionHeading
        index="详表"
        title="条目详表 · 文本视图"
        subtitle="TIAO MU XIANG BIAO"
        note="关系图之外，逐条列出每个条目的篇章、地点与相邻条目，作为图的文字对照。"
        level={2}
      />

      <div className={styles.grid}>
        {ENTITIES.map((entity) => {
          const locations = entity.locationIds
            .map((id) => LOCATIONS.find((location) => location.id === id))
            .filter((location): location is NonNullable<typeof location> => Boolean(location))
          const related = relatedEntities(entity.id)

          return (
            <article key={entity.id} className={styles.card}>
              <div className={styles.cardHead}>
                <div>
                  <p className={styles.type}>{ENTITY_TYPE_LABELS[entity.type]}</p>
                  <h2 className={styles.name}>
                    <Link to={`/catalog/${entity.slug}`}>{entity.canonicalName}</Link>
                  </h2>
                  <p className={styles.pinyin}>{entity.pinyin}</p>
                </div>
                <span className={styles.status}>{RECORD_STATUS_LABELS[entity.recordStatus]}</span>
              </div>

              <dl className={styles.facts}>
                <div>
                  <dt>篇章</dt>
                  <dd>{entity.chapterIds.map(chapterName).join('、')}</dd>
                </div>
                <div>
                  <dt>地点</dt>
                  <dd>
                    {locations.length > 0
                      ? locations.map((location) => location.canonicalName).join('、')
                      : '原文地点尚未关联'}
                  </dd>
                </div>
              </dl>

              <div className={styles.related}>
                <p className={styles.relatedTitle}>可回溯的相邻条目</p>
                {related.length > 0 ? (
                  <ul>
                    {related.map((other) => (
                      <li key={other.id}>
                        <Link to={`/catalog/${other.slug}`}>{other.canonicalName}</Link>
                        <span>
                          {other.locationIds.some((id) => entity.locationIds.includes(id)) ? '同地点' : '同篇章'}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={styles.none}>当前数据中暂无共同篇章或共同地点条目。</p>
                )}
              </div>
            </article>
          )
        })}
      </div>

      <p className={styles.note}>
        说明:「同篇章」「同地点」是本站基于已录入字段生成的阅读关系，并不等同于人物血缘、敌对或神话谱系。
        需要更细的原文依据时，请从条目返回对应的原文证据和篇章阅读。
      </p>
    </div>
  )
}
