import Hero from '../components/Hero'
import styles from './HomePage.module.css'

/**
 * 卷首首页:首屏「山海开卷」+ 编纂进度注记。
 * 今日异兽、探索路径、山川长卷、热门条目等章节随内容核验进度逐轮加入。
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <section className={styles.statusNote} aria-label="编纂进度">
        <p>
          《山海万象录》正在逐卷编纂:卷首已成,图鉴、山川、古卷与谱系将于后续卷次依次开放,凡未经核验的资料一律标注存疑。
        </p>
      </section>
    </>
  )
}
