# RUN_LOG —— 山海万象录

> 每轮追加,不得覆盖历史记录。新记录加在本行之下(最新在前)。

---

## 2026-09-20 03:14 — 03:26 · 第 4 轮 · T2-02 十八篇目录数据 + SectionHeading

**本轮任务**:T2-02 核验并录入通行本十八篇目录,实现 /chapters 篇章页;顺带完成 T1-03 的 SectionHeading 组件。

**修改内容**:
- **底本核验(内容红线执行)**:篇目与次序已依据「中国哲学书电子化计划」公开文本(ctext.org/shan-hai-jing)逐条核对——山经五篇、海外经四、海内经四、大荒经四、海内经(终篇),共十八篇;核验记录写入 CONTENT_SOURCES.md 与页面脚注
- `src/data/chapters.ts`:18 条 ChapterMeta(id/slug/name/order/group/contentStatus=pending)+ 分组说明(标注为本站编辑说明)+ 篇名拼音(含声调)
- `src/components/SectionHeading.tsx`:编号 + 标题 + 小字副题 + 金线(T1-03 部分完成)
- `src/pages/ChaptersPage.tsx`:分组目录页,每篇「第N篇 + 篇名 + 拼音 + 待录入」徽标;原文未录入不放假链接;底部核验说明
- App 路由:/chapters 由占位页替换为真实目录页

**验证命令与结果**:
- `npm run build`:**通过**
- 浏览器实测:DOM 断言(5 组名正确、18 条篇章项、18 个「待录入」、无溢出);1440 与 390 截图正常——组名金色、篇名宋体、拼音含声调、徽标右对齐,390px 单栏堆叠正常
- 空帧问题复发并定位规律:**goto 后首张截图也可能拍到未完成绘制的帧**(与上轮 reload 竞态同源),重拍即正常;协议更新为「首拍若与 DOM 断言矛盾,等待 600ms 重拍,以 DOM 事实为准」
- lint:未配置;测试:未配置

**遗留问题**:
- 各篇「待录入」——首批原文录入在 T2-03(下一轮主任务)
- T1-03 剩余:按钮体系沉淀、卡片容器基样式
- 篇章摘要与实体统计:依赖原文录入,暂不展示(不编造)

**下一轮建议**:T2-03 首批 2—3 个核验条目(候选:狌狌、鹿蜀——须先经 ctext 公开文本逐字核对南山经首段原文,再录入 Entity/Citation),并以此驱动图鉴列表页替换占位。

---

## 2026-09-20 02:44 — 02:57 · 第 3 轮 · T1-02 首页首屏「山海开卷」

**本轮任务**:T1-02 首屏场景(≥90vh、多层景深、视差、动效降级)+ 主文案与双入口。

**修改内容**:
- 新增 `src/hooks/usePointerParallax.ts`:指针视差,只写 CSS 变量,消费方仅 transform;精确指针设备才启用;prefers-reduced-motion 不启用;位移按层 6—18px(规范 ≤20px)
- 新增 `src/components/scene/`:StarField(星辰+虚构星宿连线+月轮)、CloudSea(雾带缓移 84s/118s,仅 transform)、MountainRanges(远山两重平滑山脊+近景深墨山脊)、WaterRipples(山脚波纹细线)、BeastSilhouette(据「其状如狐而九尾」意象的九尾异兽剪影,纯装饰)
- 新增 `src/components/Hero.tsx` + 样式:90vh 以上首屏;印章+「山海万象录 · 卷之一 · 开卷」眉标;主标题「山海有灵，万物入卷」;副标题;双入口(入卷探索→/explore 朱砂实底、查看异兽图鉴→/catalog 旧金描边);右下「据古籍意象艺术演绎」注记;内容浮现 720ms;≤900px 减层降幅、≤640px 按钮全宽
- HomePage 重写为 Hero + 编纂进度注记条
- 美术打磨一轮:远山由规则锯齿改为平滑曲线山脊;兽尾由尖直叶片改为四条弧形长尾

**验证命令与结果**:
- `npm run build`:**通过**(打磨前后共 3 次,均通过)
- 浏览器实测(生产构建):1440/768/390 三档截图 + DOM 断言(h1 正确、6 个 SVG 场景层、导航 9 链接),三档 `scrollWidth` 断言均无横向溢出
- 过程事故记录:一次 1440 复验截图出现「只有星空」空帧,复查为 **reload 竞态旧帧**(截图先于新渲染稳定),goto 重验即正常——非代码缺陷;教训已录入 DECISIONS D-011:布局复验一律 goto + 等待 + DOM 事实断言,不凭单张 reload 截图下结论
- prefers-reduced-motion:CSS 内显式关闭漂移/闪烁/浮现/视差(代码路径审查;IAB 无法模拟该媒体查询,已记录验证方式)
- lint:未配置;测试:未配置

**遗留问题**:
- 异兽头部造型仍偏「犬科」,后续美术轮可再打磨(不影响主线)
- 云海层在 1440 下偏淡(符合 2%—7% 纹理规范,但可再校一档透明度)
- 「今日异兽」等首页章节依赖首批核验条目(阶段 2 内容轮)

**下一轮建议**:T1-03 通用组件补齐(SectionHeading/按钮体系/卡片基样式)+ T2-01 导航工具区骨架;随后进入阶段 2 内容轮(T2-02 十八篇目录)。

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
