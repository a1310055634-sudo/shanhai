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
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
