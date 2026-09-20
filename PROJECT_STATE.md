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

视觉精修冲刺进行中:V04 陆吾+英招插画完成(4/14,看板见 VISUAL_SPRINT.md);下一轮 V05 烛阴+应龙插画。

## 已完成内容

- Vite + React + TS 脚手架、设计变量、基础排版、react-router 8 路由 + 404
- 全站外壳:Layout / Navigation / Footer / EmptyState / SectionHeading
- 首屏「山海开卷」:五层景深 + 指针视差 + 动效降级 + 九尾异兽剪影
- 十八篇目录(/chapters,篇目次序经 ctext 核对)
- **首批核验条目(/catalog)**:狌狌、鹿蜀(原文四段逐字核对)+ 招摇之山、杻阳之山两条 Location;EntityCard(4:5 线描插画区/原文特征引用/状态徽标/收藏);localStorage 收藏可用
- 数据类型:Entity / Citation / Location / ChapterMeta
- 五个状态文件 + README

## 已知问题

- 无 lint(阶段 5)/ 无测试(阶段 6);条目 2/12,原文正文未录入篇章阅读
- 条目插画为统一线描占位;「后世流变」字段与区块待设计(T2-06);/atlas 等仍为占位页
- IAB 点击:getByRole 偶发 3s 超时,先 scrollIntoView + evaluate .click() 兜底(第 5 轮实测)
- IAB 截图竞态与 console 回读限制(D-010/D-011)
- 运维:按端口 PID 杀服务(D-008);构建走 D: 真实路径(D-003)

## 最后成功验证时间

2026-09-21 06:56(北京时间)——build 通过;V04:陆吾(伏踞守望/九尾张扇/人面虎爪/囿域界线)与英招(腾空马躯/人面/鸟翼虎纹鬣/四海云气)正式插画上线并注册;构建通过、无溢出。

## 项目状态

IN_PROGRESS
