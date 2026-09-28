# DEV_LOG —— 《山海万象录》开发日志(交接文档)

> 写给下一个接手的 agent。目标:读完这一篇就知道项目是什么、代码在哪、规矩是什么、下一步该做什么。
> 更新:2026-09-27(P14 收尾后)。本文是唯一的总入口,各专项细节有对应文档(见第 2 节)。

━━━━━━━━━━

## 0. 一句话现状

《山海经》主题数字博物馆(本地 React 站点,未发布),已历经**四个冲刺**全部完结:
①开发期(17 轮)→ ②视觉精修 V01—V14(COMPLETE)→ ③行旅 J01—J16(NEEDS_ATTENTION,当时底本源被反爬)→ ④古籍原图替换(用户指令)→ ⑤展览精修 E01—E15(COMPLETE)→ ⑥可信定稿 P01—P14(NEEDS_ATTENTION,仅环境验证残留)。
**南次一经九位置:8 座双源核验可进入站 + 1 处柢山 variant 待核。** 12 幅插图为清《古今图书集成》版画(公有领域)。当前无进行中任务,定时任务已停用。

## 1. 运行与硬规矩(先读,违反会翻车)

```
cd /d D:\zcode\workspace\default\shanhai   # 一切 npm/vite/git 命令必须用 D: 真实路径
npm run dev        # 开发
npm run build      # tsc --noEmit + vite build(提交前必过)
npm run preview    # 预览(默认 4173,被占自动 +1)
```

- **C: 路径是 junction**(真实数据在 `D:\zcode\workspace`),在 C: 路径跑构建必失败(DECISIONS.md D-003)。文件读写工具可走 C:。
- **杀服务按端口 PID**:`netstat -ano | grep :4173` → `taskkill //F //PID <pid>`;禁止 `taskkill //IM node.exe` 全量杀(D-008)。
- git 提交身份:`git -c user.name="shanhai-auto" -c user.email="shanhai-auto@local"`(仓库无全局配置)。
- 技术栈红线:React 19 + TS + Vite 6 + CSS Variables + CSS Modules + react-router 7。不引入 UI 框架/地图引擎/大型动画依赖。
- 设计方向:墨夜/宣纸/岩青铜绿/旧金为主,朱砂只用于当前状态/印章/主操作。禁止霓虹、玻璃拟态、卡牌风、粒子。

## 2. 文档地图(接手后按需读)

| 文件 | 内容 |
| --- | --- |
| **本文 DEV_LOG.md** | 总入口/交接 |
| DECISIONS.md | 全部技术决策 D-001 起(junction/PID杀进程/IAB测试协议 D-010/011 等),改前必查 |
| PUBLICATION_REPORT.md | 最近冲刺交付报告(当前状态权威来源) |
| PUBLICATION_SPRINT.md / EXHIBITION_SPRINT.md / JOURNEY_SPRINT.md / VISUAL_SPRINT.md | 四次冲刺看板(全部终态,勿重做勿清零) |
| **EDITION_AUDIT.md** | 版本审校矩阵:底本政策(A=ctext zhs 主底本/B=维基文库郭璞注本对照)、九位置逐段证据行、七差异项四栏 |
| **ART_PROVENANCE.md** | 12 幅版画逐幅来源档案 |
| CONTENT_SOURCES.md | 内容红线与底本记录(头部已挂 EDITION_AUDIT) |
| RUN_LOG.md | 全程逐轮日志(40+ 轮) |
| EDITION_EVIDENCE/ | 双源净化文本存档(ctext-nanci1 / wikisource-nanshan1) |

## 3. 代码结构(关键文件)

```
src/data/
  locations.ts        # 17 座 Location(南次一经 8+柢缺、丹穴、西山4、北山1、海外北1、大荒东2)
                      #   每座:citations[](originalText/sourceEdition/publicUrl/variantText/
                      #   verificationNote/verifiedAt)、sourceOrder(子经内山序)、subClassic
  journey.ts          # NANCI_YI_ROUTE(8 站:locationId/status/segmentId/note)
                      #   + NANCI_YI_PENDING(仅剩柢山1条,note 含异文说明)
                      #   + validateJourneyRoute()(8 类校验,古卷页有 window.__journeyCheck 钩子)
  chapterTexts.ts     # 南山经段落:seg-ns1-*(每山一段 + 篇末总述 seg-ns1-tongji
                      #   + 存疑说明 seg-ns1-tongji-note + 柢山独立 gap)
  classicArt.ts       # 12 幅版画清单(src/note/source/sourceUrl/provenance)
  entities/*.ts       # 12 条目(狌狌/鹿蜀/凤皇/九尾狐/帝江/精卫/陆吾/英招/文鳐鱼/烛阴/应龙/夔)
src/components/
  art/BeastArtwork.tsx    # 插画统一入口:优先版画(classicArtFor)→onError 回退原创 SVG→注册表
  art/registry/*.tsx      # 12 幅原创 SVG(版画失败兜底;九尾狐/凤皇/鹿蜀为 E08—E10 重绘版)
  atlas/ConceptMap.tsx    # 山川概念图(SECTION 区域+VERIFIED_LINKS 仅画有据相邻边)
  CitationBlock.tsx       # 原文证据块(宣纸底/出处/版本/核对链接/variantText 异文徽章)
src/pages/
  JourneyPage.tsx     # /journeys/nanci-yi:长卷(ROUTE+PENDING 生成,勿手写山名列表)
                      #   相邻边语义:两站均 verified=金实线,否则虚线
  ChapterPage.tsx     # 阅读器:text 段/gap 段(segmentOn 类高亮;hash 自行 scrollIntoView)
  EntityDetailPage.tsx # 六区块详情;artNote 已链接化指向 Commons
src/assets/classic/   # 12 幅版画 SVG(7.8MB;懒加载+gzip 传输,勿再压缩——有损木刻线)
```

## 4. 内容红线(最高优先级,违反即返工)

1. **录原文必入 EDITION_AUDIT**:状态 verified/provisional/blocked/variant;A=ctext zhs 用字底本,B=维基文库具名对照;B 的〈〉内郭璞注**永不抄入正文**。
2. 不编造原文/出处/能力;「待核验」不得改「已核验」;柢/祗等异文不裁决、双形并显。
3. 篇末「凡十山,二千九百五十里」照录+存疑说明块,**不得**为凑数增山/改里距(本站校核 2700 里≠古籍原文)。
4. 版画=《古今图书集成》potrace 矢量化件(PD),表述不得写成"古籍扫描原图";来源未查证就写未查证。
5. 站内数量一律从数据派生(LOCATIONS.length 等),不手填——曾因此翻车(P10 勘正 12→17)。

## 5. 测试协议(IAB 实测约定,省时间的经验)

- 点击超时 → `scrollIntoView + evaluate 派发 click` 兜底;SVG `<a>` 无 .click(),用 `dispatchEvent(MouseEvent)`。
- **截图与 DOM 断言矛盾以 DOM 为准**(D-011);IAB 截图管线曾整轮故障,别死磕截图。
- 样式断言必须用完整类名锚定(`[class*="scroll"]` 会先命中 scrollWrap 之类的长类名,曾致误判)。
- react-router v7 同路由参数导航**勿读 window.location**(读旧值),用 `useLocation()`(J16 教训)。
- 锚点定位:目标元素若是无类元素,scroll-margin 加在 `[id^='sec-']` 上;SPA hash 跳转需自行 scrollIntoView+状态类(pushState 不登记 :target)。
- 每轮验收三件套:npm run build + 三档(1440/768/390)溢出断言 `documentElement.scrollWidth<=clientWidth` + 主链路点击实测。

## 6. 下一步做什么(按优先级)

1. **柢/祗影印追证**(P05 悬案):找《古今图书集成》边裔典或明刻本影印页,证据足则建第 9 站,不足维持 variant 双显。
2. **版画原扫描链接**(12 幅,ART_PROVENANCE 标"未查证"):追 Commons File 页里的扫描来源页。
3. **扩展南次二经/三经**:底本双源流程照抄 P02—P07(ctext+维基文库,EDITION_AUDIT 建证据行→verified 建站);南次三经丹穴之山已有 Location 可复用。
4. 其余 9 幅旧剪影插画(狌狌等)按 E08 九尾狐参数化方法逐幅重绘(版画兜底层不需动)。
5. 真实浏览器补一次键盘 focus-visible 走查(IAB 环境限制未做成,P14 遗留)。
6. 远期:ESLint/Vitest(从未配置);书法体 webfont(SIL OFL 授权,规范允许)。

## 7. 环境备忘

- 预览服务由 agent 起后台任务维持(端口 4173);用户常在会话间看站,**收尾时不要杀预览**。
- ctext.org 反爬时好时坏(9/24 封→9/27 解);维基文库 zh.wikisource.org 稳定可作 B 源;zh.wikipedia.org API 在本环境不可达,用 commons.wikimedia.org API。
- 30 分钟定时任务已全部跑完并停用;用户会话内的临时诉求(如"换古籍原图")优先级高于一切计划。
- 工作区当前干净(HEAD=78b976d);若有未提交改动,先辨认归属再处置——可能是用户手改。

━━━━━━━━━━

*接手第一课:改任何古籍内容前,先读 EDITION_AUDIT.md 和 CONTENT_SOURCES.md;改任何视觉前,先看 DECISIONS.md 有没有踩过的坑。*
