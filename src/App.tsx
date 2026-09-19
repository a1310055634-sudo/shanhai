import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import PlaceholderPage from './pages/PlaceholderPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="catalog"
          element={
            <PlaceholderPage
              volumeMark="卷 · 异兽"
              title="万物图鉴"
              pinyin="WAN WU TU JIAN"
              description="异兽、鸟类、水族、神祇、国族、草木、矿物与器物的总目。每个条目须经原文逐字核验后开放,首批条目正在整理中。"
            />
          }
        />
        <Route
          path="atlas"
          element={
            <PlaceholderPage
              volumeMark="卷 · 山川"
              title="山川地域"
              pinyin="SHAN CHUAN DI YU"
              description="依《山海经》五山经与海经区域绘制的古籍内部叙事地图。山川与现实地理的对应存在诸多争议,本卷将只呈现古籍内部的方位与次序。"
            />
          }
        />
        <Route
          path="chapters"
          element={
            <PlaceholderPage
              volumeMark="卷 · 古卷"
              title="古籍篇章"
              pinyin="GU JI PIAN ZHANG"
              description="通行本《山海经》十八篇的目录与原文阅读。篇目次序以采用的底本为准,原文逐字录入并标注出处,开放前须经核验。"
            />
          }
        />
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
        <Route
          path="explore"
          element={
            <PlaceholderPage
              volumeMark="卷 · 探索"
              title="探索"
              pinyin="TAN SUO"
              description="随机翻卷、每日一卷、山海行旅与线索识兽等探索玩法,将在首批核验条目开放后一同上线。"
            />
          }
        />
        <Route
          path="favorites"
          element={
            <PlaceholderPage
              volumeMark="卷 · 收藏"
              title="我的收藏"
              pinyin="WO DE SHOU CANG"
              description="收藏与最近阅读记录保存在本机浏览器中,无需账号。条目详情开放后即可开始收藏。"
            />
          }
        />
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
