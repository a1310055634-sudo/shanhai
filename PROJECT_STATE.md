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

阶段 2(核心浏览路径)进行中:十八篇目录已核验落地(T2-02),下一轮 T2-03 首批核验条目 + 图鉴列表页。

## 已完成内容

- Vite + React + TS 脚手架,`npm run build` 通过(tsc --noEmit + vite build)
- 设计变量 `src/styles/tokens.css`、基础排版 `src/styles/base.css`
- react-router 7.18.4:8 条顶层路由 + 404,SPA 回退验证
- 全站外壳:Layout / Navigation / Footer / EmptyState
- 首屏「山海开卷」:五层景深 + 指针视差 + 动效降级 + 九尾异兽剪影
- **十八篇目录**:篇目次序经 ctext 公开文本核对定稿;chapters.ts 数据(18 篇 + 分组 + 拼音);/chapters 真实目录页(未录入篇目如实标注「待录入」)
- 通用组件:SectionHeading(章节标题体系)
- 数据类型:`src/data/types.ts`(Entity / Citation / Location / ChapterMeta)
- 五个状态文件 + README

## 已知问题

- 无 lint(阶段 5)/ 无测试(阶段 6);原文内容尚未录入(全部「待录入」)
- IAB 截图竞态:goto/reload 后首拍可能为未完成帧——以 DOM 断言为准,重拍复验(D-011)
- IAB 无法回读历史 console,以渲染 + 资源加载佐证(D-010)
- 运维:杀本地服务必须按端口 PID,禁止全量 kill node.exe(D-008)

## 最后成功验证时间

2026-09-20 03:26(北京时间)——build 通过;/chapters DOM 断言(5 组/18 篇/无溢出)通过;1440 与 390 截图复验正常。

## 项目状态

IN_PROGRESS
