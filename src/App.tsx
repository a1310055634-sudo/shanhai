import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import PlaceholderPage from './pages/PlaceholderPage'
import ChaptersPage from './pages/ChaptersPage'
import ChapterPage from './pages/ChapterPage'
import AtlasPage from './pages/AtlasPage'
import CatalogPage from './pages/CatalogPage'
import EntityDetailPage from './pages/EntityDetailPage'
import FavoritesPage from './pages/FavoritesPage'
import ExplorePage from './pages/ExplorePage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="catalog/:slug" element={<EntityDetailPage />} />
        <Route path="atlas" element={<AtlasPage />} />
        <Route path="chapters" element={<ChaptersPage />} />
        <Route path="chapters/:slug" element={<ChapterPage />} />
        <Route
          path="relations"
          element={
            <PlaceholderPage
              volumeMark="卷 · 谱系"
              title="万物谱系"
              pinyin="WAN WU PU XI"
              description="实体与山川、篇章之间的关联网络。只收录有文本依据的关系——出现于、栖息于、流经、注入、同段出现等,不虚构血脉与敌对。"
            />
          }
        />
        <Route path="explore" element={<ExplorePage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route
          path="about"
          element={
            <PlaceholderPage
              volumeMark="卷 · 凡例"
              title="资料来源与制作说明"
              pinyin="ZI LIAO LAI YUAN"
              description="本站的原文底本、标点与释义处理方式、插画授权与内容核验流程说明。完整凡例随首批条目一同公布。"
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
