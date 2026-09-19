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

阶段 0(项目盘点)已完成,下一轮进入阶段 1(视觉基线)。

## 已完成内容

- Vite + React + TS 脚手架,`npm run build` 通过(tsc --noEmit + vite build)
- 设计变量 `src/styles/tokens.css`(规范第九节全部色板/字体/间距/动效时长)
- 基础排版 `src/styles/base.css`(含 prefers-reduced-motion 与焦点样式)
- 占位卷首页 `src/pages/HomePage.tsx`
- 数据类型定义 `src/data/types.ts`(Entity / Citation / Location / ChapterMeta,按规范第八节)
- 五个状态文件 + README

## 已知问题

- 无 lint 配置(计划阶段 5 补 ESLint);无测试框架(阶段 6 评估)
- 首页为占位页,视觉基线在阶段 1 实现
- 运维教训:停止 preview 等本地服务必须按端口查 PID 精准 kill,禁止 `taskkill //IM node.exe` 全量杀(会误伤其他进程)

## 最后成功验证时间

2026-09-20 01:52(北京时间)——`npm run build` 通过;`vite preview` 下首页与 CSS 资源均 HTTP 200,标题渲染正确。

## 项目状态

IN_PROGRESS
