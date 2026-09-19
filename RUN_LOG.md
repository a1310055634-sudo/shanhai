# RUN_LOG —— 山海万象录

> 每轮追加,不得覆盖历史记录。新记录加在本行之下(最新在前)。

---

## 2026-09-20 02:14 — 02:36 · 第 2 轮 · T1-01 视觉基线:全站外壳 + 路由骨架

**本轮任务**:T1-01 Layout/Navigation/Footer + react-router 全路由接线(将 T2-01 的路由骨架部分提前,避免导航死链)。

**修改内容**:
- 安装 react-router-dom 7.18.4;main.tsx 挂 BrowserRouter
- 新组件:Layout(跳转正文链接 + 主内容地标)、Navigation(品牌印 + 六项主导航,朱砂下划线选中态)、Footer(站内入口 + 来源承诺摘要)、EmptyState(统一空状态,卷册编号 + 「待」印)
- 新页面:PlaceholderPage(7 个区块复用)+ NotFoundPage(404 明确去向);App 路由 8 条顶层 + 通配
- HomePage 移除嵌套 main;响应式:≤900px 双行导航、≤640px 紧凑单行

**验证命令与结果**:
- `npm run build`(tsc --noEmit + vite build):**通过**(中途修复 EmptyState 漏导入 Link)
- 路由检查:`/ /catalog /atlas /chapters /relations /explore /favorites /about /nonexistent` 全部 HTTP 200(SPA 回退正常,404 由前端渲染)
- **浏览器实测**(IAB,生产构建):1440/768/390 三档截图 + DOM 快照检查
  - 发现并修复问题①:390px 导航项两字竖排折行 → navLink 加 white-space: nowrap
  - 发现并修复问题②(根因):390px 页面横向溢出 6px(nav ul 的 min-content 361px 超过容器,flex 项 min-width:auto 不收缩)→ 滚动收进 nav 容器 + width:max-content,复检 scrollWidth 375/375 无溢出
  - 发现并修复问题③:HomePage 嵌套 `<main>` 地标 → 改为 div
  - 修复后 1440/768/390 三档截图复检:导航、版心、占位页(万物图鉴)、EmptyState 渲染正常,无横向溢出,无坏图
- lint:未配置;测试:未配置;控制台错误:API 不支持回读历史 console,以「React 正常挂载 + evaluate 正常执行 + 资源全 200」佐证无致命错误

**遗留问题**:
- 首页仍为占位卷首(首屏「山海开卷」是下一轮 T1-02 主任务)
- 导航工具区(全站搜索、字体大小、动效开关)未实现——见 TASKS Now
- console 回读能力限制已记录,后续用渲染结果与资源加载佐证

**下一轮建议**:T1-02 首屏「山海开卷」(≥90vh 多层景深 SVG + 主文案 + 双入口 + 朱砂印记 + 动效降级),完成条件:build 通过 + 浏览器三档实测 + prefers-reduced-motion 验证。

---

## 2026-09-20 01:45 — 01:52 · 第 1 轮 · T0-01 阶段 0:项目盘点与初始化

**本轮任务**:T0-01 从零初始化项目,确认可启动、可构建。

**修改内容**:
- 新建 `shanhai/` 项目:Vite 6 + React 19 + TypeScript 5.7 脚手架(package.json / vite.config.ts / tsconfig.json / index.html)
- `src/styles/tokens.css`:规范第九节设计变量(色板/字体栈/字号行高/版面/动效时长)
- `src/styles/base.css`:基础排版、焦点样式、prefers-reduced-motion
- `src/pages/HomePage.tsx` + module css:占位卷首页
- `src/data/types.ts`:Entity / Citation / Location / ChapterMeta 数据结构
- 五个状态文件 + README + .gitignore + git init 基线提交

**验证命令与结果**:
- `npm install`:通过(69 packages;esbuild postinstall 被环境的 allow-scripts 策略暂缓,未影响构建)
- `npm run build`(tsc --noEmit + vite build):**通过**(修复两次:补 `src/vite-env.d.ts` 解决 CSS Modules 类型;改用 D: 真实路径解决 junction 盘符不一致导致 Rollup 报错——见 DECISIONS D-003)
- `vite preview` + curl:首页 HTTP 200,标题「山海万象录 · SHAN HAI ARCHIVE」正确,CSS 资源 HTTP 200
- lint:未配置;测试:未配置
- 浏览器实测:未做(本轮仅为占位页,阶段 1 起每轮浏览器实测)

**遗留问题**:
- lint 未配置(阶段 5);测试未配置(阶段 6 评估)
- esbuild 的 postinstall 待 approve,若后续轮构建异常先检查此项
- 运维教训:本轮曾用 `taskkill //IM node.exe` 停 preview(有误杀风险),今后按端口 PID 精准 kill(D-008)

**下一轮建议**:T1-01 视觉基线落地(Layout/Navigation/Footer + 排版体系),完成条件与范围见 TASKS.md Now 区。
