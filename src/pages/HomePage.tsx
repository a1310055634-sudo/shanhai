import Hero from '../components/Hero'
import TodayBeast from '../components/home/TodayBeast'
import ExplorePaths from '../components/home/ExplorePaths'
import ChapterIndex from '../components/home/ChapterIndex'
import SourcePromise from '../components/home/SourcePromise'
import styles from './HomePage.module.css'

/**
 * 卷首首页:山海开卷 → 今日异兽 → 三条探索路径 → 十八篇入口 → 来源承诺。
 * 「山川长卷预览」待 /atlas 概念地图就绪后接入(阶段 3)。
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <div className={styles.flow}>
        <TodayBeast />
        <ExplorePaths />
        <ChapterIndex />
        <SourcePromise />
      </div>
    </>
  )
}
