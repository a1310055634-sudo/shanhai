import SectionHeading from '../components/SectionHeading'
import EntityCard from '../components/EntityCard'
import { ENTITIES } from '../data/entities'
import { getLocation } from '../data/locations'
import styles from './CatalogPage.module.css'

/**
 * 万物图鉴:按本站阅读索引组织的条目网格。
 * 分类为本站索引,非《山海经》原有分类法;搜索与筛选随条目增多在后续轮加入。
 */
export default function CatalogPage() {
  const verifiedCount = ENTITIES.filter((e) => e.recordStatus === 'verified').length

  return (
    <div className={styles.page}>
      <SectionHeading
        index="图鉴"
        title="异兽与万物图鉴"
        subtitle="SHAN HAI CATALOG"
        note="本图鉴为阅读索引,条目含异兽、鸟族、水族、神祇、国族、草木、矿物、器物与山川水系。分类方式为本站所拟,并非《山海经》原有分类。每条均附原文出处,录入前经公开文本逐字核对。"
      />

      <div className={styles.grid}>
        {ENTITIES.map((entity) => {
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

      <p className={styles.progressNote}>
        已收录 {ENTITIES.length} 条,其中逐字核验 {verifiedCount} 条;首批目标十二条,条目随核验进度逐卷录入。
        搜索、篇章与类型筛选功能将随条目增多开放。
      </p>
    </div>
  )
}
