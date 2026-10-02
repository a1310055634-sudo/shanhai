import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import ConceptMap from '../components/atlas/ConceptMap'
import CitationBlock from '../components/CitationBlock'
import { LOCATIONS } from '../data/locations'
import { ENTITIES } from '../data/entities'
import { CHAPTERS } from '../data/chapters'
import { MOUNTAIN_READINGS } from '../data/siteReadings'
import styles from './AtlasPage.module.css'

/** 山名读音(供参考,以旧注通读为准;非核验内容)。G35 起移至 data/siteReadings.ts 单一来源。 */
const PINYIN = MOUNTAIN_READINGS

const REGION_ORDER = ['南山经', '西山经', '北山经', '海外北经', '大荒东经']

/**
 * 山川地域:古籍内部叙事概念地图 + 分区地域卡片。
 * 概念坐标与现实经纬度严格分开(规范第七节)。
 */
export default function AtlasPage() {
  const regions = REGION_ORDER.map((region) => ({
    region,
    locations: LOCATIONS.filter((l) => l.mapPosition.region === region),
  })).filter((g) => g.locations.length > 0)

  return (
    <div className={styles.page}>
      <SectionHeading
        index="舆图"
        title="山川地域"
        subtitle="SHAN CHUAN DI YU"
        note="以下为古籍内部叙事关系图:分区依篇章,节点为已逐字核验的山川,连线仅绘有原文依据的相邻关系。概念坐标为本站呈现用,与现实经纬度无关。"
        level={1}
      />

      <ConceptMap mode="select" />

      <p className={styles.journeyLinkRow}>
        南次一经行旅:
        <Link className={styles.journeyLink} to="/journeys/nanci-yi">
          沿原文次序逐站行走 →
        </Link>
      </p>

      {regions.map(({ region, locations }) => (
        <section key={region} className={styles.region} aria-label={region}>
          <h2 className={styles.regionName}>{region}</h2>
          <ul className={styles.cards}>
            {locations.map((loc) => {
              const entity = ENTITIES.find((e) => loc.relatedEntityIds.includes(e.id))
              const chapter = CHAPTERS.find((c) => c.id === loc.chapterId)?.name
              return (
                <li key={loc.id} className={styles.card}>
                  <p className={styles.cardHead}>
                    <span className={styles.cardName}>{loc.canonicalName}</span>
                    <span className={styles.cardPinyin}>{PINYIN[loc.canonicalName] ?? ''}</span>
                  </p>
                  <p className={styles.cardMeta}>
                    {chapter && `《${chapter}》`}
                    {loc.sourceOrder !== undefined && ` · 原文顺序第 ${loc.sourceOrder} 山`}
                    {loc.sourceDirection && ` · ${loc.sourceDirection}`}
                    {loc.sourceDistance && ` ${loc.sourceDistance}`}
                  </p>
                  {loc.citations[0] && (
                    <CitationBlock citation={loc.citations[0]} />
                  )}
                  {entity && (
                    <p className={styles.cardEntity}>
                      相关条目:
                      <Link className={styles.entityLink} to={`/catalog/${entity.slug}`}>
                        {entity.canonicalName}
                      </Link>
                    </p>
                  )}
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </div>
  )
}
