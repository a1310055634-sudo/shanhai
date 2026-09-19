import { Link } from 'react-router-dom'
import SectionHeading from '../SectionHeading'
import { CHAPTER_GROUPS, CHAPTERS } from '../../data/chapters'
import styles from './ChapterIndex.module.css'

/** 十八篇古卷入口(规范第四节第 6 条):复用已核验的篇章数据。 */
export default function ChapterIndex() {
  return (
    <section className={styles.section} aria-label="十八篇古卷">
      <SectionHeading
        index="卷"
        title="十八篇古卷"
        subtitle="SHI BA PIAN GU JUAN"
        note="通行本常见十八篇,篇目、次序以采用的底本为准,已经公开文本核对。"
      />
      <div className={styles.groups}>
        {CHAPTER_GROUPS.map((group) => (
          <div key={group.key} className={styles.group}>
            <p className={styles.groupName}>{group.key}</p>
            <ul className={styles.names}>
              {CHAPTERS.filter((c) => c.group === group.key).map((c) => (
                <li key={c.id}>
                  <Link className={styles.name} to="/chapters">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className={styles.more}>
        <Link className={styles.moreLink} to="/chapters">
          查看完整篇章目录 →
        </Link>
      </p>
    </section>
  )
}
