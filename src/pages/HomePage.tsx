import Hero from '../components/Hero'
import TodayBeast from '../components/home/TodayBeast'
import ExplorePaths from '../components/home/ExplorePaths'
import AtlasPreview from '../components/home/AtlasPreview'
import ChapterIndex from '../components/home/ChapterIndex'
import SourcePromise from '../components/home/SourcePromise'
import styles from './HomePage.module.css'

/**
 * 卷首首页:山海开卷 → 今日异兽 → 三条探索路径 → 山川长卷预览 → 十八篇入口 → 来源承诺。
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <div className={styles.flow}>
        <TodayBeast />
        <ExplorePaths />
        <AtlasPreview />
        <ChapterIndex />
        <SourcePromise />
      </div>
    </>
  )
}
