# DEV_LOG —— 《山海万象录》开发日志(交接文档)

> 写给下一个接手的 agent。目标:读完这一篇就知道项目是什么、代码在哪、规矩是什么、下一步该做什么。
> 更新:2026-10-02(二阶冲刺 G21—G38 收官后)。本文是唯一的总入口,各专项细节有对应文档(见第 2 节)。

━━━━━━━━━━

## 0. 一句话现状

《山海经》主题数字博物馆(本地 React 站点,未发布),已历经**六个冲刺**,其中最新一个(**古朴精修·二阶 G21—G38,18/18 轮 done**)刚刚收官:

①开发期(17 轮)→ ②视觉精修 V01—V14(COMPLETE)→ ③行旅 J01—J16 → ④古籍原图替换 → ⑤展览精修 E01—E15(COMPLETE)→ ⑥可信定稿 P01—P14 → ⑦**古朴精修一阶 G01—G13**(材质/字韵/纹样/版式四线)→ ⑧**古朴精修二阶 G21—G38**(更准确/更透明/更精致/更可靠)。

二阶新增:郭璞注可展开层、南次二经 6 山、里距总表、难字音表、异文校勘页、凡例页、晴窗/灯下双主题、谱系关系图、细节层与校讫记、微交互总审计。
**南次一经 8 座双源核验可进入站 + 1 处柢山 variant 待核;南次二经 6/17 山已录(B1×B2 双源,底本 A 反爬挂账)。**
**当前无进行中任务**;定时任务应已由用户停用——若再触发,只读退出,不构建不提交不改文件。

## 0.1 二阶收官要点(接手先看这五条)

1. **终验报告**:`GALLERY_REPORT.md`(二阶卷:目标对照/18 轮记录/完成与遗留/回归矩阵/性能/截图索引/判定)。四件套仍为 `GALLERY_STATE.json` / `GALLERY_SPRINT.md` / `GALLERY_RUN_LOG.md` / `GALLERY_DESIGN.md`,收官截图在 `GALLERY_FINAL2/`。
2. **性能**:JS gzip 176.78 kB / CSS 20.37 kB / HTML 0.87 kB(基线 147.62 / 16.35 / 0.442)。**依赖自基线零变动**——增量全是内容与样式,别误以为引了库。
3. **新增三个页面**(均在 About 内链 + 页脚,不加主导航):`/how-to-read` 凡例、`/readings` 难字音表、`/variants` 异文校勘。内容契约见 `GALLERY_DESIGN.md` 九、十节。
4. **可复跑的验收脚本**(`dev/`):`round35-verify.mjs`(读音证据回查)、`round36-verify.mjs`(流变 claim 双向复核:本地存档 + 在线重抓)、`round37-audit.mjs`(微交互裸值/死令牌扫描)、`round38-final.mjs`(14 路由回归矩阵 + 收官截图)。**改内容或样式后先跑这几个。**
5. **测量方法学**(踩过的坑都写在 `GALLERY_DESIGN.md` 8.5 / 9.6 / 十节):对比度合成必须自最底层向上叠加(否则宣纸内衬被误算成深底产生假失败);SVG 命中区须按 viewBox 缩放换算;SVG 图元不计页面横溢;`npm.cmd` 的 exit 1 不等于构建失败;PowerShell 会把弯引号当字符串定界符(提交信息用 `git commit -F`)。

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

1. **底本 A(ctext)回核**:南次二经 6 山(柜山/长右/尧光/羽山/浮玉/成山)按 B1×B2 先上线并挂 `unverified`,A×B 逐字回核**仍挂账**;A 可达后按 `EDITION_AUDIT.md` 三之补5—7 流程补录,并把 `recordStatus` 升为 verified。**未核不得升。**
2. **南次二经余 11 山**(瞿父、句餘、会稽、夷、僕勾、咸阴、洵、虖勺、区吴、鹿吴、漆吴):DRAFT 工作稿在 `EDITION_EVIDENCE/DRAFT-nanci2-workfile-20261002.md`,**扩录须用户新立任务**;每轮只录 1—2 山,不加速。
3. **柢/祗影印追证**(P05 悬案):找《古今图书集成》边裔典或明刻本影印页,证据足则建第 9 站,不足维持 variant 双显。
4. **读音待办**:ruby 注音层未收 10 字(棪/柢/踆/汸/淯/糈/鴟/亶/杻/猨)是否补入须定夺;疑 12 四例读音分歧(禺/亶/杻/雘)留人工复核。
5. **流变层扩写**:其余 12 词条无 claim(未核即无 claim 是设计内状态);四类已登记的「未取得可核来源」说法(六朝志怪/唐宋传奇/明清小说、夔纹、帝江与《庄子》浑沌、精卫后世注家)待取证回填。
6. 其余 9 幅旧剪影插画(狌狌等)按 E08 九尾狐参数化方法逐幅重绘(版画兜底层不需动)。
7. 远期:ESLint/Vitest(从未配置);书法体 webfont(SIL OFL 授权,规范允许);1440 指针档页脚链接是否统一升 44px。

## 7. 环境备忘

- 预览服务由 agent 起后台任务维持(端口 4173);用户常在会话间看站,**收尾时不要杀预览**。
- ctext.org 反爬时好时坏(9/24 封→9/27 解→**10/02 全天不可达**);维基文库 zh.wikisource.org 稳定可作 B 源;zh.wikipedia.org API 在本环境不可达,用 commons.wikimedia.org API。
- 2026-10-02 出现一次环境故障:pwsh 因沙箱无法在工作区根目录写入权限而全数失败(`SetNamedSecurityInfoW failed (Win32 5)`);用户把会话文件策略改为 danger-full-access 后恢复,**未做任何 ACL 修复**。
- 无头 Chrome 路径 `C:\Program Files\Google\Chrome\Application\chrome.exe`;本会话无 IAB,浏览器核对走 CDP 直连脚本(`dev/round3*-browser.mjs`)。CDP 的 WebSocket 会保持 Node 事件循环存活,脚本末尾必须 `process.exit()`。
- 30 分钟定时任务应已停用;用户会话内的临时诉求(如"换古籍原图")优先级高于一切计划。
- 工作区当前干净(HEAD 见 `git log -1`);若有未提交改动,先辨认归属再处置——可能是用户手改。

━━━━━━━━━━

*接手第一课:改任何古籍内容前,先读 EDITION_AUDIT.md 和 CONTENT_SOURCES.md;改任何视觉前,先看 DECISIONS.md 有没有踩过的坑。*
