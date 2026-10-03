# 《山海万象录》四阶「图鉴格物」任务书(G59—G82,共 24 轮)

> 版本 v2(2026-10-03 深夜复核版)。v1 经主会话对仓库逐项核验后修订:修正两处前提错误(①站内 12 兽版画源流;②凤皇词条现状),补数据/组件速查表、验收清单编号、工具约定附录。**本文件是四阶唯一指令源**,与定时任务提示词冲突时以本文件为准;涉及既有坑册时以「现读实况+本文件」为准。
> 历史坑册:`GALLERY_RUN_LOG.md` 各轮「新坑」小节 + `GALLERY_DESIGN.md` 各章——动到对应组件前先查。

## 0. 项目现状与继承铁律

### 0.1 环境

- 真实路径(Git Bash):`/d/zcode/workspace/default/shanhai`。**C 盘同名路径是 junction,Vite 在那里构建必败**,一切命令必须在 D 盘真实路径执行。
- git 提交身份:`git -c user.name=shanhai-auto -c user.email=shanhai-auto@local`;小提交标 G 编号,勿 amend;**全程禁 push/remote 写操作**。
- 并发保护:项目根 `.round-lock` mtime 距今 <45 分钟=有实例在跑,立即退出不计轮;过期才接管并刷新(锁内容=epoch 秒时间戳)。
- 时区:bash 裸 `date` 即北京时间+0800(**勿设 TZ**,设了反而变 UTC);node/python 不识别 `/tmp`,临时文件用项目内或显式 `D:/` 路径。
- 一切中文内容用 Write/Edit 工具写入,严禁 bash heredoc/echo/sed 写中文(GBK 化毁锚点);含 `$()`/反引号的脚本先 Write 成 .mjs 再 node 执行。
- 用户可能有预览服务器挂在 4173 端口(vite preview)——**不杀任何既有 node/Chrome 进程**,自己拉起的用完即清。

### 0.2 数据与组件速查(2026-10-03 实测,v2 逐项核过)

| 项 | 实况 |
|---|---|
| 词条 | `src/data/entities/*.ts` 共 **15 条**+index.ts;recordStatus:**12 verified / 3 unverified**(changyou 长右、huahuai 猾褢、zhi 彘);**claims 字段已用:jingwei/jiuweihu/kui 三条**,其余 12 条流变层无 claim;`getVerifiedEntities()`=首页「条目已核验」计数(现 12) |
| 山位 | `src/data/locations.ts` 共 **23 条**(南山一经 8/二经 6/丹穴 loc-danxue/发鸠 loc-fajiu/昆仑/天山 等;**柢山无条目=留白红线**) |
| 其余数据 | chapters.ts / chapterTexts.ts / classicArt.ts(12 条,含 width/height) / distances.ts(DistanceTable 数据+quoteOverride+存疑区) / journey.ts / readings.ts+siteReadings.ts(音表) / variants.ts(异文) / types.ts |
| 版画组件 | `src/components/art/registry/*.tsx` **12 兽**(ArtCanvas 调度);**源流=清《古今图书集成》禽虫典/神异典木刻的维基共享矢量化转描件**(ART_PROVENANCE 开篇在案,非本站手绘) |
| 古画资产 | `src/assets/paintings/*.jpg` 5 幅(三阶,1,065,665 B);12 既有版画 SVG 共 7,800,554 B(不入位图预算) |
| 场景/地图 | `src/components/journal/SceneLayers.tsx`(行旅 JourneyPage 八站场景+凡例页图示共用);`src/components/atlas/ConceptMap.tsx`(山川概念图,inkWash 滤镜 1 处=三阶纹样台账 1/4) |
| 页面 | src/pages/ 15 个组件(G56 矩阵口径 14 路由,以现读为准);ReadingsPage/VariantsPage 无独立 module.css |
| 底本存档 | `EDITION_EVIDENCE/`:**B1**=wikisource-nanshan1-b1-20261002.txt(头部说明+[L00]—[L18] 行号条目,物理 27 行;L01—L17=南次二经 17 山,L18=篇末总述);**B2**=wikisource-nanshan1-guopu-20261002.txt(123 行四库本郭注,**二经 17 山全覆盖,南次三经亦在档,丹穴之山=L76**);DRAFT-nanci2-workfile(柜/長/堯三山工作稿);ctext-nanci1(一经 A 侧旧档) |
| 台账/设计 | ART_PROVENANCE.md(版画章+三阶「古画卷」章 G1—G5);GALLERY_DESIGN.md(一—十一章,四阶开**十二章**);AUDIT 简繁转换表在 DESIGN 三之补系 |
| 验收脚本惯例 | `dev/roundNN-*.mjs`+`dev/roundNN-results.json`(round35—round56 在册);无头 Chrome+CDP 可复用 `D:/zcode/tmp-shanhai-g22/cdp.mjs`(shot/eval 两模式,9337 端口) |
| 构建参考值 | POST-1 后实测:JS 577.10 kB(raw)/179.99 kB(gzip);CSS 123.21/21.71。四阶基线以 G59 接管当日实测为准 |

### 0.3 接管(G59 执行)

STATE 重写:`planId:"shanhai-gallery-4"` / `phase:4` / `totalRounds:24` / `maxValidExecutions:24` / `validExecutions:1`(接管轮自计) / `currentRound:"G59"` / `rounds`:G59—G82 共 24 键(G59=done 其余 not_started) / `baseline`:当日实测 js/css gzip+imagesBytes(古画+版画分记) / `openItems`:承接三阶未决呈报项 / `shutdown`:「G82 后一切触发只读退出」。

### 0.4 通用铁律

- 技术底座不动:Vite+React+TS;**美术轮(G59—G70)禁改 `src/data/*` 与 `EDITION_EVIDENCE/*`**(git diff 触及即违规);不动 dist/(构建产物不入 git,现场 build 验收)。
- 状态四件套每轮必更:GALLERY_STATE.json / GALLERY_SPRINT.md / GALLERY_RUN_LOG.md / (需要时)GALLERY_DESIGN.md。
- 六层严格分隔(原文/郭注/异文/释义/策展/演绎)永不让步;原文与注文只认 EDITION_EVIDENCE 存档,逐字照录**不转简**(繁体原样);新增事实句 100% 有可溯来源,拿不准标「据载/据公开资料」,严禁编造。

## 1. 四阶目标与两条线

- **美术线「经典图谱」12 轮(G59—G70)**:在现有「古今图书集成转描版画」之外,把**其它刻本传统的扫描原件**(蒋应镐本/吴任臣本/汪绂本/怪奇鸟兽图卷等)请进站,词条页「古图原件×站内转描」并陈——呈现同一异兽在不同刻本传统中的形象流变,与内容线流变 claims 呼应(用户已拍板「并陈」)。另有场景水墨化/地图古意化/长卷装裱/排印细节/双主题清偿。
- **内容线「格物细读」12 轮(G71—G82)**:南次二经余 11 山扩录闭环(用户已拍板「双源先行+挂账」);新词条;凤皇郭注层;流变 claims;ruby 注音收尾;文献纵深;三页联动;四阶终验。
- 24 轮,一次触发一轮,禁止连做多轮、禁止跳轮、禁止 sleep 等待、禁止创建第二个定时任务。

## 2. 硬红线(继承+增补,违反即验收失败)

1. 内容轮收尾必须程序化证明既有原文区零改动:`git diff` 数 `originalText:` 赋值行变更=0(G24 口径)。
2. 审美负面清单:禁做旧滤镜/茶渍/金色发光/纹样堆砌;**四阶新增 SVG 纹样落点上限 4 处**(三阶台账 1/4,合计 ≤5),逐处登记 DESIGN 纹样台账;feTurbulence 每处登记。
3. 位图预算(**四阶新增独立池 ≤2.0MB**):单图 ≤350KB、长边 ≤1600px、一律 lazy+显式宽高防 CLS(hero 邻域 eager 例外沿用记录);压缩用本机 ffmpeg,**禁新增 npm 依赖**。G60 首批 5—8 幅与总量约束冲突时,以总量优先减幅数。
4. 古图许可:只收公有领域(维基共享 PD-old-70/PD-China/CC0,逐幅 API extmetadata 核验 LicenseShortName),登记 ART_PROVENANCE 新开「刻本扫描原件」章:来源 URL/许可/刻本与藏所(知则注,不知标「藏所待考」);拉不到合规图=降级不凑数,如实「待图」。
5. 双主题:新色一律走令牌(亮纸面用 --surface-paper 家族,**禁引 --paper/--paper-bright 作背景**——G41 坑);正文对比度 ≥4.5:1(画布字用 --on-canvas 家族);新交互键盘可达+reduced-motion 压平。
6. 计数守卫:一切计数型文案(首页「条目已核验 12」/行旅「八站」/音表/异文计数/DistanceTable 行数)改动必须同步数据源并双向断言。**四阶新增内容全部 unverified,首页「条目已核验」应保持 12 不变——每条内容轮把它列为断言项。**
7. 冻结:主导航七词与路由 slug 不动;柢(祗)留白不设正式站;六经馆/思想页/长读旧篇不回改;三阶画卷层(装裱/誊抄/显影/纸阶)参数不回退;G23 场景色彩曲线(warmth/jagged/mist)不回改(G63 只加质感层)。
8. 不发布、不上传、不改 C 盘 junction。

## 3. 美术线 12 轮(G59—G70)

> 每轮验收清单编号 A1、A2…,轮末 RUN_LOG 逐条给证据。美术轮通用 A 项(不赘写):build 过;390/1440 零溢出;双主题抽样截图;新 CSS 零裸色值;src/data 零 diff。

【G59】四阶接管+古图源侦察(轻轮)
施工:①STATE 重写接管(§0.3)+本任务书提交入库+SPRINT 追加四阶 24 轮表;②按附录 A 侦察:《古图可得性清单》=15 词条(至少 12 版画兽)×候选刻本,逐格记「可拉/不可拉/许可/分辨率/URL」,维基共享 API 逐幅核;③清单提交入库,G60 据此排首批。
验收:A1 STATE 四阶字段齐且 rounds 24 键;A2 清单入库且逐格有结论;A3 build 过;A4 除账本/清单外零产品码改动。

【G60】古图首批入库
施工:按清单拉 5—8 幅(主词条优先:九尾狐/狌狌/凤皇/应龙等已有版画者)→逐幅 extmetadata 许可核验→ffmpeg 压缩(≤350KB/长边 ≤1600)→入 `src/assets/classic-art/`(新建)→ART_PROVENANCE 开「刻本扫描原件」章→清单回填实拉结果与落选原因。
验收:A1 逐幅许可记录在案;A2 体积/宽高实测达标且总量对 ≤2.0MB;A3 provenance 章 G 编号连续;A4 src/data 零 diff;A5 通用 A 项。

【G61】词条页「古图×站内转描」并陈接入(一)
施工:EntityDetailPage 的 artPanel 区(G22 绫边/G49 留白既有)升双图结构——**古图原件装裱主位**(PaintingMount 变体:绫边/诗塘沿用,款识=刻本名+朝代+藏所或「藏所待考」楷体),**站内转描版画副位**加「站内转描 · 据古今图书集成」签;先接 G60 已入库词条;图 lazy+显式宽高;双图 aria 各述;InkReveal 不接入词条页(G49 设计内,维持)。
验收:A1 双图逐词条断言(主/副位、款识逐字、签文、lazy、宽高属性);A2 键盘可达+焦点环;A3 对比度 ≥4.5;A4 CLS=0;A5 截图 1440+390;A6 通用 A 项。

【G62】词条页并陈(二)+交互打磨
施工:其余有图词条接入;清单无货词条保持单图+「待补古图」占位签(如实,不凑数);副位 hover 微说明(令牌化,压平体系内)。
验收:A1 全 15 词条通查(有图/待图两态都断言);A2—A6 同 G61。

【G63】山川场景水墨化二期
施工:`src/components/journal/SceneLayers.tsx`(JourneyPage 八站+HowToReadPage 图示)加墨色分层(远淡近浓透明度梯度,fillOpacity 分档)+边缘晕染(复用 inkWash 滤镜或新增 +1 处登记);**G23 既有参数(warmth/jagged/mist 数值与色彩)一律不动**。
验收:A1 八站两两可辨断言复跑全绿(G23 口径:色+轮廓);A2 常用参数指纹证明零改动(改前改后 diff 仅质感层);A3 纹样台账登记;A4 截图双主题;A5 通用 A 项。

【G64】地图古意化
施工:AtlasPage+ConceptMap——宣纸纹理底(纸阶令牌复用)+古地图边框(界栏双线,纹样 1 处)+节点印章化(朱砂方印=verified/墨点=unverified,**两态 390 档可辨**)+角标司南(纹样 1 处,可选);节点文字零重叠断言复跑。
验收:A1 零重叠全绿(390+1440);A2 印/点两态对比断言;A3 纹样台账 +≤2;A4 图例说明(印=已核验/点=待核)上屏;A5 截图;A6 通用 A 项。

【G65】长卷装裱补全
施工:古卷长卷(JourneyPage/JournalProgress 区)引首题签(竖排楷体)+跋尾印+裱边收头(沿用 G22/G23 收头族,**不新增纹样族**);卷尾徐渭小景(G48)不动。
验收:A1 装裱结构断言;A2 签/印 aria 与键盘可达;A3 截图;A4 通用 A 项。

【G66】图鉴卡与首页统一
施工:EntityCard 纸卡质感(纸阶+边界令牌);首页模块卡与画卷层协调微调;不加新动画(压平体系内)。
验收:A1 新 CSS 零裸色值;A2 三视口(390/768/1440)零溢出;A3 截图;A4 通用 A 项。

【G67】排印细节(零数据改动)
施工:篇首章符(「其一/其二」式序数或「○」章符,选一定案入 DESIGN 十二章);引文块界栏线+「曰」朱签样式;目录徽标与正文序数统一;宋/楷层级复核(G52 不回退)。
验收:A1 CSS-only diff 证明(无 tsx 逻辑改动或仅类名);A2 双主题排印走查;A3 截图;A4 通用 A 项。

【G68】双主题与遗留清偿
施工:①晴窗 390 导航右缘渐隐带(先复现实测——RUN_LOG L542 观察项,从未追踪清偿;仍在才修,已消失则如实记档关项);②favicon 404 清偿:新建 `public/favicon.svg`(站印「山」方印)+index.html 加 link(现状无任何 icon 链接,RUN_LOG L862 在案);③G57 呈报项中可自理美术项顺手处理(「页脚 29px 升 44px」待用户裁决,**不动**)。
验收:A1 curl dist/favicon 资源 200+index.html link 在;A2 渐隐带前后对比截图(或关项证据);A3 console 零新增;A4 通用 A 项。

【G69】收藏/探索/关于画卷化补漏
施工:FavoritesPage/ExplorePage/AboutPage 三页画卷语言补齐(纸阶分档/留白节奏,轻量);About 样张区扩「刻本原件×站内转描」双列样张。
验收:A1 三页断言+截图;A2 src/data 零 diff;A3 通用 A 项。

【G70】美术线中期走查
施工:全站路由(G56 矩阵口径 14 条,以现读为准)双主题截图归档 `GALLERY_ART4/`(1440+390);对比度全站复跑;体积中期决算(vs 四阶基线);DESIGN 开「十二、图鉴格物线」(美术半卷:翻译规则延续/纹样台账/古图许可表)。
验收:A1 截图齐且 judge 或自检全过;A2 对比度零失败;A3 决算表;A4 DESIGN 成章;A5 通用 A 项。

## 4. 内容线 12 轮(G71—G82)

> 通用纪律(每轮适用,详见附录 B):开工先 Read B1 存档与 DRAFT 工作稿对账;双源净化逐字一致才升正式;recordStatus=unverified+不入推荐/探索池(首页计数保持 12,断言);郭注逐字照录繁体原样;简繁转换表逐条入 AUDIT;PINYIN/GLOSSARY 增补后必须复跑 annotate 白屏探针(增补平面字/代理对坑,G30 在案);地图新节点锯齿续排+两两零重叠实测;A 侧 ctext 每轮顺手复测一次,恢复即启动回核升级流程。
> 内容轮通用 A 项(不赘写):双源逐字一致证据;引文逐字符断言;原文区零改动 diff 证明;首页「条目已核验=12」不变断言;390 零横溢;build+截图;A 侧复测记录。

【G71】二经扩录一(2—3 山)
施工:先 Read B1 存档,列全 17 山名与 [L01]—[L17] 行号对照表(与 B2 逐山对账——**行号必须与山名对上,G30 勘误在案**),排定 G71—G74 分配(**本任务书不预判山名**);本轮录 2—3 山:B1×B2 净化→locations.ts 新 loc(锯齿续排避让)+chapterTexts 新段→郭注照录→转简表→PINYIN/GLOSSARY 增补→annotate 白屏探针。
验收:A1—A7 通用项;A8 新山地图节点零重叠专项。

【G72】二经扩录二(2—3 山)——同 G71 流程
【G73】二经扩录三(2—3 山)——同 G71 流程

【G74】二经扩录四+里距闭环
施工:录完全部余山;`src/data/distances.ts` 二经表补全 17 山+篇末总述行;逐段相加 vs 篇末 7200 里核对;存疑区三案更新(实列/篇末差值/柢祗——柢祗留白红线不变);JourneyPage 二经缺口标注按全录刷新(文案以现读为准);进度徽标 17/17。
验收:A1 全经逐山在册(17/17 断言);A2 里距表逐行逐字符对底本;A3 存疑区只增不删;A4 通用项。

【G75】新词条批
施工:随扩录新出的异兽立正式词条(entities/ 新文件+index 注册):形貌档案/释义/引文全双源;**recordStatus=unverified**;配图=接古图(清单有货优先)或原创 SVG ≤3 幅(入 ART 台账,registry 组件惯例:头注「据已核验形貌的演绎」);已核验计数不动断言。
验收:A1 词条页断言(徽章「待考证」两态);A2 配图来源登记;A3 通用项。

【G76】凤皇郭注层与丹穴关联(**盘点先行,以盘点定施工**)
施工:开工先 Read `src/data/entities/fenghuang.ts`(ent-fenghuang,**已存在且 verified**)+B2 L76 丹穴之山段,盘点郭注上屏现状;施工=B2 L76 尚未上屏的郭注(「漢時鳳鳥數出…」「《廣雅》云:鳳,雞頭…」等)经 citations.guoPuNotes 通道逐字补上屏(繁体原样)+loc-danxue(已存在)与凤皇词条页关联展示核验;**若盘点发现郭注已全在屏,本轮改做凤皇纵深一段并顺延 G80 篇幅,如实记档**。
验收:A1 郭注逐字符断言(details.open 后取文本口径);A2 原文区零改动;A3 首页计数不变;A4 build+截图。

【G77】流变 claims 补全
施工:G36 LaterClaim 契约下,补 claims 目标=**verified 且无 claim 的 9 条**(15 条中 jingwei/jiuweihu/kui 已有);3 条 unverified 词条(changyou/huahuai/zhi)claims 挂账至 A 侧回核后,不擅发。每条 claim:后世流变一句(郭璞图赞/博物志/类书等),逐条三路核活(curl→WebFetch→web_reader)或维基文库存档;两面原则:误读与正读并陈如实。
验收:A1 9 条 claims 上屏断言;A2 来源台账 100% 可溯;A3 unverified 三条保持无 claim 断言;A4 build。

【G78】ruby 注音收尾
施工:10 个未收字逐字给音(依据=郭璞音注「音X」/经典释文/广韵,裁决依据逐条记录进 RUN_LOG);读音分歧四例各给裁决建议呈报(不擅断);GLOSSARY/PINYIN/音表页(ReadingsPage+siteReadings.ts,以现读为准)同步;annotate 白屏探针必跑。
验收:A1 音表页计数断言更新;A2 ruby 渲染剥 rt 断言;A3 裁决表入 RUN_LOG;A4 通用项。

【G79】词条纵深·狌狌/九尾狐
施工:两核心词条各 +2 段纵深(早期文献链/形象流变/郭注与后世注家分歧),逐句可溯;不动演绎层与原文层。
验收:A1 引文逐字符断言;A2 来源台账;A3 首页计数不变;A4 build+截图。

【G80】词条纵深·凤皇+新增兽
施工:凤皇+G75 新词条各 +1—2 段纵深;跨词条「见X条」互链补全;若 G76 已顺延做凤皇纵深,本轮以新增兽为主。
验收:A1—A4 同 G79。

【G81】三页联动+凡例更新
施工:音表页(ReadingsPage)/异文页(VariantsPage)/古卷页 DistanceTable 区吸收 G71—G80 新数据全量刷新;凡例页(HowToReadPage)增补四阶新例(「刻本原件×站内转描」并陈例/流变 claim 例);相关计数断言全量更新。
验收:A1 三页逐项断言;A2 凡例与实况一致;A3 build+截图。

【G82】四阶终验
施工:REPORT 四阶卷(两线对照/性能体积决算/判定);回归矩阵复跑(dev/round56-regression.mjs 同款口径+四阶新断言);双主题全站走查;收官截图 `GALLERY_FINAL4/`;版本戳 rebuild 复跑(vite define __BUILD_COMMIT__ 页内=HEAD);STATE 收官态(24/24+shutdown 只读条款);DEV_LOG 四阶章。
验收:A1 矩阵全绿;A2 REPORT 判定;A3 收官截图齐;A4 四件套齐;A5 此后触发只读退出并提醒用户停用定时任务。

## 5. 每轮固定流程与 DoD

1. Read 本文件+GALLERY_STATE.json(取最早未完成轮);`.round-lock` mtime <45 分钟=退出不计轮,过期接管并刷新(内容=epoch 秒)。
2. Read RUN_LOG 顶部上一轮交接+涉及组件坑册小节。
3. 施工(中文全走 Write/Edit;含 `$()` 脚本先落 `dev/roundNN-*.mjs`)。
4. `npm run build`(tsc --noEmit && vite build)必须过。
5. 无头 Chrome+CDP 实测(附录 C 口径);美术轮留截图,内容轮加原文零改动 diff 证明。
6. 小提交(标 G 编号,勿 amend)→更新 SPRINT 行/STATE(validExecutions+1、currentRound 推进、rounds 键)/RUN_LOG 顶部条目(**记「四阶 n/24」**+交接:做了什么/坑/遗留)。
7. **DoD 未全过不得标 done**;做不完如实 partial 留下轮接续。
8. 轮末删锁;自拉的 Chrome/Node 进程清干净(用户预览服务器除外)。

## 6. 附录 A:古图源清单(侦察起点,以实查为准)

- 站内已有源=《古今图书集成》木刻的维基共享矢量化转描(12 兽,ART_PROVENANCE verified 在案)——四阶侦察**避开重复**,专找**其它刻本的扫描原件**:明·蒋应镐《山海经(图)绘像》;清·吴任臣《山海经广注》插图;清·汪绂《山海经存》;日本江户《怪奇鸟兽图卷》;《古今图书集成》**扫描原页**(若与站内转描同图,作「原件×转描」对照对亦有价值,如实注记同源)。
- 检索路径:Commons 分类(Category:Shan Hai Jing / Shanhaijing / Gujin Tushu Jicheng 等)+兽名拼音/威氏拼法/拉丁转写关键词;API `prop=imageinfo&iiprop=extmetadata` 逐幅核 LicenseShortName,仅收 PD-old-70/PD-China/CC0。
- 实操坑(三阶既证):wikimedia 429 重试即过;并行 curl(&)丢产物须串行;中文 URL 百分号编码(web_reader 未编码报 -400);Commons File 页描述与 extmetadata 冲突时以更严格者为准。
- 降级纪律:某兽拉不到合规图→该词条「待补古图」占位,不凑数;美术线重心按 G59 清单实况可移向场景/地图轮(顺序对调须在 RUN_LOG 记理由)。

## 7. 附录 B:双源扩录流程(B1×B2,二阶既证先例)

- B1=维基文库《山海經/南山經》呈现态文本(curl 页面 HTML→剥标签取「南次二經」至「南次三經」之间;存档头部已记抓取法;**每轮重抓与存档对账,不一致=当日页面变动,先查再动**)。存档 [L00]—[L18]:L01—L17=17 山,L18=篇末总述;〈〉内为郭璞注夹注、「X一作「Y」」为页面自带异文——均非正文(P02 政策),审计逐行可对照。
- B2=`wikisource-nanshan1-guopu-20261002.txt`(123 行):二经 17 山全覆盖;**每山一行,行号必须与山名对账**(G30 勘误:G29 日志曾把行号记错);三经在档(丹穴=L76,南禺=L96)。
- 净化:两源正文逐字一致才升正式;不一致=疑点照录不校改(「作X疑Y」式,接续二阶疑点编号);郭注 `{{*|…}}` 逐字照录繁体;篇末总述/里距照录;hanziNum 汉字解析相加(非手填,G26 口径)。
- recordStatus=unverified+不入推荐/探索/题库(ENTITIES index 过滤已内建,勿破坏);首页「条目已核验」保持 12(每轮断言)。
- 简繁转换只收一对多危险字入 AUDIT 表;同形字保留原形;易误读字注音入 PINYIN(柜[音矩]先例);GLOSSARY 增补平面字/代理对必跑 annotate 白屏探针(G30 崩溃先例)。
- 地图节点锯齿续排避让既有 23 节点,零重叠实测(390+1440);二经行新节点参考已录六山 (14,86)—(53.5,84.5) 带走向。

## 8. 附录 C:验收工具与断言口径(坑册精选,详见 RUN_LOG)

- 脚本:`dev/roundNN-*.mjs`+`dev/roundNN-results.json`;无头 Chrome 全新 `--user-data-dir` 临时目录+独立端口(9337/9341…避让);MSYS 多路径参数只转末位,写显式 `D:/`。
- CDP:连 `/json/list` type=page 的 target(连 browser 级 ws 静默失败);evaluate 多语句须 IIFE;新 profile 默认 light=晴窗,测灯下先 `localStorage.setItem('shanhai-theme','deng')` 后 reload;换主题测量须清存储+reload(G31 优先级坑);带 transition 元素测量前注入 `transition:none`(G32 协议)。
- 断言口径:视口内宽含滚动条——「满宽」断言须与 hero/容器比而非 innerWidth(POST-1 实测坑);ruby 断言剥 rt;CitationBlock 郭注默认收起,断言前 `details.open=true`;textContent 顺序=文档序;headless 不请求 /favicon.ico(测 favicon 用 curl 资源存在+link 标签,勿用 console)。
- headless `--screenshot` 直截真图(全新 profile 自动进晴窗);IAB 后台晴窗亮页截图有灰纱伪影(DESIGN 8.5②),验收用无头直截。

## 9. 异常兜底

- 验收失败 ≤2 次重试后置 blocked 如实记账;做不完 partial 接续,禁跳轮。
- 古图拉取失败走降级;构建异常先查是否误在 C 盘 junction 跑;`.round-lock` 过期但项目文件 mtime 距今几分钟内有新写=实例仍活跃,让位(实弹证据法,RUN_LOG 在案)。
- **G82 完成后或有效执行达 24 次:此后一切触发只读退出(不构建/不提交/不改文件),并提醒用户停用本定时任务。**

## 10. 附:定时任务提示词定稿(注册时全文粘贴,注册前以本文件 §10 为准)

无人值守推进《山海万象录》四阶「图鉴格物」冲刺(G59—G82,共 24 轮),一次触发只做一轮,禁止连做多轮、不 sleep 等待、不创建第二个定时任务。

项目真实路径(Git Bash):/d/zcode/workspace/default/shanhai(C 盘同名路径是 junction,Vite 在那里构建必失败,一切命令必须在 D 盘真实路径执行)。

任务书(唯一指令源):项目根目录 GALLERY_PROMPT4.md——先 Read 它,再读 GALLERY_STATE.json 取「最早未完成轮」,严格按任务书的硬红线、24 轮任务表、附录 A/B/C 与验收清单施工;本提示词与任务书冲突时以任务书为准。

固定要点(防呆,细节一律以任务书为准):
1. 并发保护:项目根 .round-lock 的 mtime 距今 <45 分钟=有实例在跑,立即退出不计轮;过期才接管并刷新。
2. 每轮流程:施工→npm run build(tsc --noEmit && vite build)→无头 Chrome+CDP 实测断言→小提交(git -c user.name=shanhai-auto -c user.email=shanhai-auto@local,提交信息标 G 编号,勿 amend)→更新 GALLERY_SPRINT.md 看板、GALLERY_STATE.json(validExecutions+1/currentRound 推进)、GALLERY_RUN_LOG.md 顶部日志(记「四阶 n/24」)→删锁;不杀用户 4173 预览服务器。
3. done 必须是验收条件真实通过,不得因时间到自动标完成;做不完标 partial 留下轮接续,不跳轮。
4. G59 首轮先做状态接管(STATE 重写 planId shanhai-gallery-4/phase 4/totalRounds 24/记四阶基线)再施工。
5. G82 完成后或有效执行达 24 次:此后一切触发只读退出(不构建、不提交、不改文件),并提醒用户停用本定时任务。
