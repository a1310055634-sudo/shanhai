# PROJECT_STATE —— 山海万象录

## 技术栈

- React 19 + TypeScript 5.7 + Vite 6(无 UI 框架)
- 样式:CSS Variables(tokens.css)+ CSS Modules,不用 Tailwind
- 路由:计划使用 react-router(阶段 2 引入,当前为单页占位)
- 内容:本地结构化数据(`src/data/`),无后端、无账号系统

## 运行方式(重要!)

```bash
# 必须使用 D 盘真实路径,不要通过 C: junction 路径运行构建!
cd D:\zcode\workspace\default\shanhai
npm install        # 首次
npm run dev        # 开发
npm run build      # 类型检查 + 产物构建
npm run preview    # 预览产物
```

原因:`C:\Users\13100\.zcode\workspace` 是指向 `D:\zcode\workspace` 的 NTFS junction。在 C: 路径下运行 Vite 时,root 用 C: 路径而文件 realpath 解析为 D: 路径,盘符不一致导致 Rollup 报 "fileName or name must not be absolute paths" 构建失败。所有 npm/vite/git 命令一律 cd 到 D: 路径执行。

## 当前阶段

阶段 1(视觉基线)进行中:T1-01 全站外壳 + 路由骨架已完成,下一轮 T1-02 首页首屏「山海开卷」。

## 已完成内容

- Vite + React + TS 脚手架,`npm run build` 通过(tsc --noEmit + vite build)
- 设计变量 `src/styles/tokens.css`(规范第九节全部色板/字体/间距/动效时长)
- 基础排版 `src/styles/base.css`(含 prefers-reduced-motion 与焦点样式)
- react-router 7.18.4:8 条顶层路由 + 404 页,SPA 回退验证
- 全站外壳:Layout(跳转正文)/ Navigation(六项主导航+朱砂选中态)/ Footer(来源承诺摘要)/ EmptyState
- 占位页体系:7 个区块占位 + 404,均有真实说明文字
- 数据类型定义 `src/data/types.ts`(Entity / Citation / Location / ChapterMeta,按规范第八节)
- 五个状态文件 + README

## 已知问题

- 无 lint 配置(计划阶段 5 补 ESLint);无测试框架(阶段 6 评估)
- 首页为占位页,T1-02 实现首屏
- 导航工具区(搜索/字体/动效开关)未实现(T2-01)
- IAB 无法回读历史 console,浏览器验证以渲染结果+资源加载佐证(D-010)
- 运维教训:停止 preview 等本地服务必须按端口查 PID 精准 kill,禁止 `taskkill //IM node.exe` 全量杀(会误伤其他进程)

## 最后成功验证时间

2026-09-20 02:36(北京时间)——build 通过;9 条路由 HTTP 200;浏览器 1440/768/390 三档实测通过,无横向溢出、无坏图(修复 390px 导航折行与 6px min-content 溢出后复检确认)。

## 项目状态

IN_PROGRESS
