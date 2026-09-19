# DECISIONS —— 山海万象录

记录重要技术/设计取舍及原因。新决策追加,不删除历史。

## D-001 技术栈:React 19 + TypeScript + Vite 6(2026-09-20)

规范第十二节默认选择。不用 Next(纯静态本地数据站,无需 SSR)、不用 UI 组件库(视觉系统必须完全自控,拒绝模板感)。

## D-002 样式方案:CSS Variables + CSS Modules(2026-09-20)

不引入 Tailwind/styled-components:规范第九节要求精确的色彩比例与古籍气质,tokens.css + Modules 足够且零额外依赖;「不为了特效引入大型依赖」。

## D-003 【关键】构建与运行必须用 D: 盘真实路径(2026-09-20)

C: 侧路径是 NTFS junction,指向 D:\zcode\workspace。Vite/Rollup 在 junction 路径下因盘符不一致构建失败(实测报 "The fileName or name properties … must be neither absolute nor relative paths, received D:/…")。所有 npm/vite/git 命令一律 `cd D:\zcode\workspace\default\shanhai` 后执行。文件读写工具走 C: 路径不受影响。

## D-004 Git 策略:项目内独立仓库,每轮一个基线 commit(2026-09-20)

工作区根目录不是 git 仓库;在 shanhai/ 内 `git init`,每轮验证通过后 commit 一次,便于下轮 diff 排查与回滚。禁止任何破坏性 git 操作(rebase/reset --hard/clean 等)。

## D-005 字体策略:系统字体栈先行(2026-09-20)

tokens.css 定义宋体/黑体回退栈(Noto Serif SC → Songti SC → SimSun;Noto Sans SC → Microsoft YaHei)。Web 字体(思源系列自托管、子集化)推迟到阶段 5 性能轮评估——避免大字体文件拖慢首屏;系统回退必须始终可用。

## D-006 插画策略:原创 SVG 线描 + 抽象剪影(2026-09-20)

规范第八/九节:不引用来源不明网络图片。全部插画以原创 SVG「古籍线描骨架+矿物色局部着色」风格实现,存于 `src/assets/`(建立后),每图标注「据原文描述艺术演绎」。

## D-007 轮次并发锁:`shanhai/.round-lock`(2026-09-20)

每轮开始:若锁文件存在且 mtime 距今 < 45 分钟 → 判定上一轮仍在运行,本轮跳过退出;否则写入当前时间继续。每轮收尾删除锁文件。锁文件不入 git。

## D-008 服务进程管理:按端口精准 kill(2026-09-20)

实测教训:用 `taskkill //IM node.exe` 停 preview 会全量误杀。今后一律 `netstat -ano | grep <端口>` 找 PID 后 `taskkill //F //PID <pid>`。

## D-009 路由提前:react-router 7 在阶段 1 引入(2026-09-20)

原计划阶段 2 引入路由,但阶段 1 的导航若没有真实去向就是一堆死链(违反「导航无死链」验收项)。故 T1-01 一并完成 8 条顶层路由 + 占位页 + 404 页。带 `:slug` 的详情路由仍留在阶段 2 与数据一同落地。

## D-010 浏览器实测为阶段 1 起的固定验收项(2026-09-20)

IAB 浏览器实测两轮已各抓出一个纯代码检查发现不了的问题(390px 导航竖排折行、6px min-content 溢出)。此后凡改动视觉/布局的轮次,必须:1440/768/390 三档截图 + scrollWidth 溢出断言。IAB 无法回读历史 console,以「React 挂载 + evaluate 执行 + 资源全 200」佐证。
