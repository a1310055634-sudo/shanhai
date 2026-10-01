import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ChaptersPage from './pages/ChaptersPage'
import ChapterPage from './pages/ChapterPage'
import AtlasPage from './pages/AtlasPage'
import CatalogPage from './pages/CatalogPage'
import EntityDetailPage from './pages/EntityDetailPage'
import FavoritesPage from './pages/FavoritesPage'
import JourneyPage from './pages/JourneyPage'
import ExplorePage from './pages/ExplorePage'
import RelationsPage from './pages/RelationsPage'
import AboutPage from './pages/AboutPage'
import HowToReadPage from './pages/HowToReadPage'
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
        <Route path="relations" element={<RelationsPage />} />
        <Route path="explore" element={<ExplorePage />} />
        <Route path="journeys/nanci-yi" element={<JourneyPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="about" element={<AboutPage />} />
        {/* G27 凡例页:入口放 About 页内与页脚,不加主导航 */}
        <Route path="how-to-read" element={<HowToReadPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
