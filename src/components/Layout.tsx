import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import Footer from './Footer'
import SearchOverlay from './search/SearchOverlay'
import styles from './Layout.module.css'

/**
 * 全站外壳:跳转正文链接 → 导航 → 主内容 → 页脚。
 * 主内容容器 #main 是「跳到主要内容」锚点与语义主地标。
 */
export default function Layout() {
  return (
    <div className={styles.shell}>
      <a className={styles.skipLink} href="#main">
        跳到主要内容
      </a>
      <Navigation />
      <main className={styles.main} id="main">
        <Outlet />
      </main>
      <Footer />
      <SearchOverlay />
    </div>
  )
}

/** 导航项配置:古籍气质命名 + 清晰路由 */
export const NAV_ITEMS = [
  { to: '/', label: '卷首', end: true },
  { to: '/catalog', label: '异兽' },
  { to: '/atlas', label: '山川' },
  { to: '/chapters', label: '古卷' },
  { to: '/relations', label: '谱系' },
  { to: '/explore', label: '探索' },
  { to: '/favorites', label: '收藏' },
]
