# PROJECT_STATE —— 山海万象录

## 技术栈

- React 19 + TypeScript 5.7 + Vite 6(无 UI 框架)
- 样式:CSS Variables(tokens.css)+ CSS Modules,不用 Tailwind
- 路由:react-router 7,顶层页面与条目/篇章详情路由已接通
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

两大冲刺均已完成:视觉精修冲刺(V01—V14)与南次一经·山海行旅冲刺(J01—J16,10 轮 done/2 blocked/4 轮因底本源反爬未执行)。当前无进行中的冲刺;底本源恢复后可按 JOURNEY_REPORT.md「后续建议」补齐南次一经其余六山。

## 已完成内容

- Vite + React + TS 脚手架、设计变量、基础排版、react-router 8 路由 + 404
- 全站外壳:Layout / Navigation / Footer / EmptyState / SectionHeading
- 真实资料说明页(/about)与关系索引页(/relations)
- 首屏「山海开卷」:五层景深 + 指针视差 + 动效降级 + 九尾异兽剪影
- 十八篇目录(/chapters,篇目次序经 ctext 核对)
- **首批核验条目(/catalog)**:狌狌、鹿蜀(原文四段逐字核对)+ 招摇之山、杻阳之山两条 Location;EntityCard(4:5 线描插画区/原文特征引用/状态徽标/收藏);localStorage 收藏可用
- 数据类型:Entity / Citation / Location / ChapterMeta
- 五个状态文件 + README

## 已知问题

- 无 lint(阶段 5)/ 无测试(阶段 6);12/12 条目已核验,原文正文仍仅部分录入篇章阅读
- 「后世流变」字段与区块已落地;谱系与资料说明页已从占位页替换为真实内容
- IAB 点击:getByRole 偶发 3s 超时,先 scrollIntoView + evaluate .click() 兜底(第 5 轮实测)
- IAB 截图竞态与 console 回读限制(D-010/D-011)
- 运维:按端口 PID 杀服务(D-008);构建走 D: 真实路径(D-003)

## 最后成功验证时间

2026-09-24——行旅冲刺 J16 端到端验收:真实点击流(首页→行旅→三站往返→详情→古卷锚点→续行)全绿,发现并修复 3 处缺陷(站内导航不刷新/续行横幅恒假/古卷锚点无定位),1440/768/390 零横向溢出,build 通过。

## 项目状态

COMPLETE(视觉精修冲刺 V01—V14:PASS;山海行旅冲刺 J01—J16:NEEDS_ATTENTION——已核验 3 站行旅全绿,6 山待底本源恢复建站;详见 FINAL_REPORT.md 与 JOURNEY_REPORT.md)
