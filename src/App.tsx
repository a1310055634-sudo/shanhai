import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'

// G94 路由级代码分割:除首页(首屏 LCP,静态导入)外全部页面 React.lazy。
// Suspense fallback 走令牌化静态加载签(无动画,reduced-motion 天然安全);
// file:// 直开下动态 chunk 会加载失败,属已知限制(单文件方案违禁增依赖,不引入)。
const ChaptersPage = lazy(() => import('./pages/ChaptersPage'))
const ChapterPage = lazy(() => import('./pages/ChapterPage'))
const AtlasPage = lazy(() => import('./pages/AtlasPage'))
const CatalogPage = lazy(() => import('./pages/CatalogPage'))
const EntityDetailPage = lazy(() => import('./pages/EntityDetailPage'))
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'))
const JourneyPage = lazy(() => import('./pages/JourneyPage'))
const ExplorePage = lazy(() => import('./pages/ExplorePage'))
const RelationsPage = lazy(() => import('./pages/RelationsPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const HowToReadPage = lazy(() => import('./pages/HowToReadPage'))
const ReadingsPage = lazy(() => import('./pages/ReadingsPage'))
const VariantsPage = lazy(() => import('./pages/VariantsPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

export default function App() {
  return (
    <Suspense
      fallback={
        <div
          aria-busy="true"
          aria-live="polite"
          style={{
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-kai, serif)',
            letterSpacing: '0.2em',
          }}
        >
          展卷中
        </div>
      }
    >
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="catalog/:slug" element={<EntityDetailPage />} />
          <Route path="atlas" element={<AtlasPage />} />
          <Route path="chapters" element={<ChaptersPage />} />
          <Route path="chapters/:slug" element={<ChapterPage />} />
          <Route path="relations" element={<RelationsPage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="journeys/nanci-yi" element={<JourneyPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="about" element={<AboutPage />} />
          {/* G27 凡例页:入口放 About 页内与页脚,不加主导航 */}
          <Route path="how-to-read" element={<HowToReadPage />} />
          {/* G35 难字音表 / 异文校勘页:入口放 About 页内与页脚,不加主导航 */}
          <Route path="readings" element={<ReadingsPage />} />
          <Route path="variants" element={<VariantsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
