import { Link } from 'react-router-dom'
import SectionHeading from '../SectionHeading'
import styles from './ExplorePaths.module.css'

const PATHS = [
  {
    index: '壹',
    title: '从异兽出发',
    desc: '按形貌、声音、习性与栖息环境浏览山海之间的万千生灵,每一条均附原文出处。',
    to: '/catalog',
    cta: '进入图鉴',
  },
  {
    index: '贰',
    title: '从山川出发',
    desc: '沿南山、西山、北山、东山、中山与海经区域行走,依古籍内部的方位与次序。',
    to: '/atlas',
    cta: '展开山川',
  },
  {
    index: '叁',
    title: '从古卷出发',
    desc: '依通行本十八篇的篇章顺序阅读原文与索引,篇目次序已经公开文本核对。',
    to: '/chapters',
    cta: '展卷阅读',
  },
]

/** 三条探索路径(规范第四节第 3 条)。 */
export default function ExplorePaths() {
  return (
    <section className={styles.section} aria-label="探索路径">
      <SectionHeading
        index="径"
        title="三条探索路径"
        subtitle="TIAO TAN SUO LU JING"
      />
      <div className={styles.grid}>
        {PATHS.map((p) => (
          <Link key={p.to} className={styles.path} to={p.to}>
            <span className={styles.index} aria-hidden="true">
              {p.index}
            </span>
            <span className={styles.title}>{p.title}</span>
            <span className={styles.desc}>{p.desc}</span>
            <span className={styles.cta}>{p.cta} →</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
