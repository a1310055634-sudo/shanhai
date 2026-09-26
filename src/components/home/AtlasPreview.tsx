import { Link } from 'react-router-dom'
import SectionHeading from '../SectionHeading'
import ConceptMap from '../atlas/ConceptMap'
import { LOCATIONS } from '../../data/locations'
import styles from './AtlasPreview.module.css'

/** 首页「山川长卷预览」(规范第四节第 4 条):全幅出血地图 + 必备争议说明。 */
export default function AtlasPreview() {
  return (
    <section className={styles.section} aria-label="山川长卷预览">
      <div className={styles.head}>
        <SectionHeading
          index="舆"
          title="山川长卷预览"
          subtitle="SHAN CHUAN CHANG JUAN"
          note={`已核验的${LOCATIONS.length}座山川,依古籍内部叙事分区排布;点击节点可前往关联条目。`}
        />
      </div>
      <ConceptMap />
      <div className={styles.foot}>
        <p className={styles.more}>
          <Link className={styles.moreLink} to="/atlas">
            展开山川地域 →
          </Link>
        </p>
      </div>
    </section>
  )
}
