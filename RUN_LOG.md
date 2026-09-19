# RUN_LOG —— 山海万象录

> 每轮追加,不得覆盖历史记录。新记录加在文件顶部分隔线之后。

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
