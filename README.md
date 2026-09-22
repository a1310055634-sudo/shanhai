# 山海万象录 · SHAN HAI ARCHIVE

一部可以阅读、检索和探索的《山海经》数字异闻志。
定位:「当代数字博物馆 × 幽玄古籍 × 山水志怪长卷」。

> 视觉精修冲刺 V01—V14 已全部完成(2026-09-23):12 条核验条目配齐原创差异化插画,
> 首页展陈化、图鉴画册化、详情展签化、交互概念地图、篇章阅读器全部就绪。详见 FINAL_REPORT.md。

## 本地运行

```bash
# 必须使用 D 盘真实路径(C: 侧路径是 junction,构建会因盘符不一致失败)
cd D:\zcode\workspace\default\shanhai
npm install
npm run dev       # 开发服务器
npm run build     # 类型检查 + 生产构建
npm run preview   # 预览生产构建
```

## 技术栈

React 19 · TypeScript · Vite 6 · CSS Variables + CSS Modules · 本地结构化数据(无后端)

## 项目文档

- `PROJECT_STATE.md` —— 当前阶段、运行方式、已知问题
- `TASKS.md` —— 任务看板(Now / Next / Later / Blocked / Done)
- `DECISIONS.md` —— 技术与设计决策记录
- `CONTENT_SOURCES.md` —— 原文底本、内容核验与授权说明
- `RUN_LOG.md` —— 每轮自动化运行日志

## 内容承诺

- 原文逐字对照公版底本录入并标注版本;不编造原文、出处与结论
- 页面严格区分:古籍原文 / 本站释义 / 编辑说明 / 后世流变 / 艺术演绎
- 插画均为本站原创 SVG 艺术演绎,不使用来源不明图片
