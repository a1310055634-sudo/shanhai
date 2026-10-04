# 《山海万象录》五阶「山河广记」任务书(G83—G102,共 20 轮)

> 版本 v1(2026-10-05 凌晨版,经主会话对仓库逐项核验后编写)。**本文件是五阶唯一指令源**,与定时任务提示词冲突时以本文件为准;涉及既有坑册时以「现读实况+本文件」为准。
> 五阶用户裁决(2026-10-05,三项已拍板):①资源配置=均衡五线(内容 7+词条 4+工程 4+纵深终验 5);②疑12 四例读音=**维持本站通行标注+郭注两存**,不再改动;③1440 页脚链接触控区=**升 44px**。
> 历史坑册:`GALLERY_RUN_LOG.md` 各轮「新坑」小节 + `GALLERY_DESIGN.md` 各章——动到对应组件前先查。

## 0. 项目现状与继承铁律

### 0.1 环境

- 真实路径(Git Bash):`/d/zcode/workspace/default/shanhai`。**C 盘同名路径是 junction,Vite 在那里构建必败**,一切命令必须在 D 盘真实路径执行。
- git 提交身份:`git -c user.name=shanhai-auto -c user.email=shanhai-auto@local`;小提交标 G 编号,勿 amend;**全程禁 push/remote 写操作**。
- 并发保护:项目根 `.round-lock` mtime 距今 <45 分钟=有实例在跑,立即退出不计轮;过期才接管并刷新(锁内容=epoch 秒时间戳)。锁过期但项目文件 mtime 距今几分钟内有新写=实例仍活跃,让位(实弹证据法)。
- 时区:bash 裸 `date` 即北京时间+0800(**勿设 TZ**);node/python 不识别 `/tmp`,临时文件用项目内或显式 `D:/` 路径。
- 一切中文内容用 Write/Edit 工具写入,严禁 bash heredoc/echo/sed 写中文(GBK 化毁锚点);含 `$()`/反引号的脚本先 Write 成 .mjs 再 node 执行。
- 用户可能有预览服务器挂在 4173 端口(vite preview)——**不杀任何既有 node/Chrome 进程**,自己拉起的用完即清。
- 本机同时有其它项目的定时任务在跑(川流不息/another-life 等):构建异常或系统明显卡顿时,先排除他项目构建窗口撞车,避让数分钟再重试;不冻结对方进程。

### 0.2 数据与组件速查(2026-10-05 实测)

| 项 | 实况 |
|---|---|
| 词条 | `src/data/entities/*.ts` 共 **17 条**+index.ts;recordStatus:**12 verified / 5 unverified**(changyou 长右、huahuai 猾褢、zhi 彘、gudiao 蛊雕、xun 䍺);claims 已挂 **31 条/14 词条**(G77+G76);`getVerifiedEntities()`=首页「条目已核验」计数(**现 12,五阶恒定不变,见红线 6**) |
| 山位 | `src/data/locations.ts` 共 **33 条**:ch-nanshan 25(南次一经全+二经 16/17,咸陰疑15 悬置)+ch-xishan 4+ch-beishan 1+ch-haiwai-bei 1+ch-dahuang-dong 2;**南次三经仅丹穴 1 山在册,余 12 山未录** |
| 章框架 | `chapters.ts` 18 章已定义(五藏山经 5+海外 4+海内 4+大荒 4+海内终),内容覆盖高度集中于南山经——五阶扩录主线 |
| 底本存档 | `EDITION_EVIDENCE/`:**B1**=wikisource-nanshan1-b1-20261002.txt(L01—L17 二经 17 山+L18 篇末);**B2**=wikisource-nanshan1-guopu-20261002.txt(123 行四库本郭注,**二经 17 山全覆盖+南次三经在档:丹穴=L76、南禺=L96**);DRAFT-nanci2 工作稿;ctext-nanci1 一经旧档。**南次三经 B1 正文、西山经 B1/B2 均待 G83 新拉建档** |
| 古图资产 | `src/assets/classic-art/` 8 幅(S1—S8 全 PD,795KB=四阶池 40%);`src/assets/paintings/` 5 幅古画(1,065,665 B);12 兽版画 SVG 7.8MB 不入位图预算;**待补古图 9 兽**(四阶清单如实占位);候选池已探明:蒋应镐崇祯本家族 15 文件/汪绂本 8 文件/三才图会 112 张(见 CLASSIC_ART_RECON.md) |
| 纹样台账 | 现 **2/4**(G81 记),五阶新增落点上限 2,G101 收口 |
| 页面/矩阵 | src/pages/ 15 个组件;回归矩阵四阶口径 **17/17**(dev/round82-regression 以出货产物复跑);矩阵/脚本新路由断言以现读为准 |
| 构建参考值 | 四阶终验 @0cabccf:JS 649.05 kB(raw)/199.81 kB(gzip);CSS 126.98/22.39;**vite.config 无任何代码分割,15 页全进首包**——G94 主攻;五阶基线以 G83 接管当日实测为准 |
| ctext 现状 | A 侧 ctext.org 软拦截页(200 但正文零命中,2026-10-04 复测);**11 处 unverified 待回核**(=二经六山 G28—G30+四阶新录十山中核不到者,确切清单 G84 现读 locations.ts recordStatus+EDITION_AUDIT 列定) |
| 验收脚本惯例 | `dev/roundNN-*.mjs`+`dev/roundNN-results.json`;CDP 可复用 `D:/zcode/tmp-shanhai-g22/cdp.mjs`(shot/eval 两模式,9337 端口,93xx 避让) |

### 0.3 接管(G83 执行)

STATE 重写:`planId:"shanhai-gallery-5"` / `phase:5` / `title:"山河广记·五阶冲刺 G83—G102"` / `totalRounds:20` / `maxValidExecutions:20` / `validExecutions:1`(接管轮自计) / `currentRound:"G83"` / `rounds`:G83—G102 共 20 键(G83=done 其余 not_started) / `baseline`:当日实测 js/css gzip+imagesBytes(古画+版画分记) / `phase4Final`:保留四阶终验档 / `openItems`:承接四阶 7 条呈报项中未闭环者 / `shutdown`:「G102 后一切触发只读退出」。SPRINT 追加五阶 20 轮表;本任务书同轮提交入库。

### 0.4 通用铁律

- 技术底座不动:Vite+React+TS;**内容轮禁改美术层既有参数**(三阶画卷层/四阶并陈结构/款识体例不回退);不动 dist/(构建产物不入 git,现场 build 验收)。
- 状态四件套每轮必更:GALLERY_STATE.json / GALLERY_SPRINT.md / GALLERY_RUN_LOG.md / (需要时)GALLERY_DESIGN.md(五阶开**十三章·山河广记线**)。
- 六层严格分隔(原文/郭注/异文/释义/策展/演绎)永不让步;原文与注文只认 EDITION_EVIDENCE 存档,逐字照录**不转简**(繁体原样);新增事实句 100% 有可溯来源,拿不准标「据载/据公开资料」,严禁编造。
- 工程轮(G94—G97)**禁新增 npm 依赖**(React.lazy 为 React 内置;搜索索引进程内运行时派生);禁改路由 slug 与页面既有行为语义。

## 1. 五阶目标与四条线

- **线A「南山闭环+西山开篇」7 轮(G83—G89)**:ctext 换源回核 11 处 unverified;咸陰之山三源裁决;南次三经 12 山扩录至南山经 40 山全覆盖+全线里距闭环;西次一经开篇 4—5 山。
- **线B「词条扩容」4 轮(G90—G93)**:陆吾/毕方/西王母/烛龙四条新词条,每条=双源建条+claims 奠基+古图探查(沿四阶「刻本原件×站内转描」并陈体例)。
- **线C「工程体验」4 轮(G94—G97)**:路由级代码分割;全站搜索(Ctrl+K);页脚触控 44px+移动端走查;键盘无障碍专项。
- **线D「纵深终验」5 轮(G98—G102)**:新词条 claims 补齐;疑12 裁决固化+ruby 复查;三页联动+凡例五阶新例;纹样收口+待图复查;G102 五阶终验。
- 20 轮,一次触发一轮,禁止连做多轮、禁止跳轮、禁止 sleep 等待、禁止创建第二个定时任务。

## 2. 硬红线(继承+增补,违反即验收失败)

1. 内容轮收尾必须程序化证明既有原文区零改动:`git diff` 数 `originalText:` 赋值行变更=0(G24 口径)。
2. 审美负面清单:禁做旧滤镜/茶渍/金色发光/纹样堆砌;**五阶新增 SVG 纹样落点上限 2 处**(台账现 2/4,收口 ≤4),逐处登记 DESIGN 纹样台账;feTurbulence 每处登记。
3. 位图预算(**五阶新增独立池 ≤2.0MB**):单图 ≤350KB、长边 ≤1600px、一律 lazy+显式宽高防 CLS;压缩用本机 ffmpeg,**禁新增 npm 依赖**;拉不到合规图=降级不凑数,如实「待图」。
4. 古图许可:只收公有领域(维基共享 PD-old-70/PD-China/CC0,逐幅 API extmetadata 核验 LicenseShortName),登记 ART_PROVENANCE;来源 URL/许可/刻本与藏所(知则注,不知标「藏所待考」)。
5. 双主题:新色一律走令牌(**禁引 --paper/--paper-bright 作背景**——G41 坑);正文对比度 ≥4.5:1;新交互键盘可达+reduced-motion 压平。
6. 计数守卫:**首页「条目已核验」=12 五阶恒定不变**——五阶全部新词条 unverified 起步且不入推荐/探索/题池(ENTITIES index 过滤内建,勿破坏);**存量 5 词条与词条 verified 状态一律不动**(词条升级留待用户裁决,呈报项);**山位 recordStatus 允许升级**(仅 G84 依回核证据,逐条给行号),山位升级不触词条计数但须同步 DistanceTable/summary 派生断言。一切计数型文案改动必须同步数据源并双向断言。
7. 冻结:主导航七词与路由 slug 不动(线C 新增搜索为浮层/路由增量须 RUN_LOG 记理由);柢(祗)留白不设正式站;三阶画卷层与 G23 场景色彩曲线不回退;四阶并陈结构与款识体例不回退;`vite.config.ts` buildStamp 机制不动(G94 只增不改)。
8. 不发布、不上传、不改 C 盘 junction。
9. **工程轮增补**:代码分割不得改变任何路由的可达性与渲染结果(懒加载 chunk 在 vite preview 下全路由 200);搜索索引必须运行时从既有数据源派生(**无第二份数据红线**,禁止手抄索引);file:// 直开若动态 chunk 失败,如实登记为已知限制,不引单文件插件绕过。

## 3. 线A:南山闭环+西山开篇(G83—G89,7 轮)

> 内容轮通用 A 项(不赘写):双源逐字一致证据;引文逐字符断言;原文区零改动 diff 证明;首页「条目已核验=12」不变断言;390 零横溢;build+截图。

【G83】五阶接管+底本侦察(轻轮)
施工:①STATE 重写接管(§0.3)+本任务书提交入库+SPRINT 追加五阶 20 轮表;②拉建档:维基文库《山海經/南山經》页取「南次三經」至篇末存 B1 三经档(〈〉郭注夹注/「一作」异文照录,P02 政策非正文);同页取「西山經」首段建 B1 西山档;B2 三经区间(L57—L96 现读对账)确认;③列 11 处 unverified 确切清单(现读 locations.ts recordStatus+EDITION_AUDIT);④西山经开篇候选山预排(G89 用,不拉图)。
验收:A1 STATE 五阶字段齐且 rounds 20 键;A2 三经 B1+西山 B1 建档且头部记抓取法与行号对照;A3 unverified 清单入库(逐条给行号);A4 build 过;A5 除账本/存档外零产品码改动。

【G84】ctext 换源回核(11 处)
施工:逐处换源回核——候选源:汉典 zdic.net 全文、国学大师 guoxue.com、古诗文网 gushiwen.cn、殆知阁/维基文库异本排版;逐处记「源/URL/抓取时刻/引文逐字比对结果」;核到且三源(B1/B2/新源)一致→该山 recordStatus 升 verified(逐条行号证据);核不到→如实维持 unverified;**词条 verified 一律不动**;回核台账入库(EDITION_AUDIT 新章或独立文件);DistanceTable/summary 派生计数复断言。
验收:A1 11 处逐处有结论(升/不升+证据);A2 升级逐条行号在案;A3 派生计数双向断言;A4 首页计数 12 不变;A5 通用 A 项。

【G85】咸陰之山三源裁决
施工:以 G84 回核所得第三源(或另寻毕沅《山海经笺疏》/郝懿行笺疏排印本)对读 B1 四百里/B2 五百里;**两源以上一致→录多数+少数入疑案注记,17/17 闭环**(locations 新增+chapterTexts 新段+DistanceTable 缺口 490 里归零+summary 派生刷新);**三源各异→维持悬置**,疑15 升三源并陈(variants 页照录);里距区文案运行时派生口径复断言(cnNum 十七既有)。
验收:A1 裁决三源并陈证据;A2 若闭环:17/17 断言+缺口归零断言;A3 若悬置:三源注记上屏断言;A4 原文区零改动;A5 通用 A 项。

【G86】南次三经扩录一(4 山)
施工:先 Read B1 三经档,列全 13 山名与行号对照表(与 B2 逐山对账,**行号必须与山名对上**,G30 勘误在案),排定 G86—G88 分配;本轮录前 4 山:B1×B2 净化→locations 新 loc(锯齿续排避让既有 33 节点)+chapterTexts 新段→郭注逐字照录→转简表入 AUDIT→PINYIN/GLOSSARY 增补→annotate 白屏探针(代理对坑,G30 在案)→recordStatus=unverified。
验收:A1—A7 通用项;A8 新山地图节点零重叠专项(390+1440)。

【G87】南次三经扩录二(4 山)——同 G86 流程
【G88】南次三经扩录三(5 山)+南山经全线里距闭环
施工:录完余山+篇末总述;`distances.ts` 三经表补全+南山经三段篇末总述逐段核对(一经+二经+三经 各段「凡X山,里数」hanziNum 解析相加 vs 篇末,存疑区只增不删);JourneyPage 南山进度标注刷新;进度徽标按现读口径更新。
验收:A1 南山经 40 山全线在册断言(或如实差值);A2 里距表逐行逐字符对底本;A3 存疑区只增不删;A4 通用项。

【G89】西次一经开篇(4—5 山)
施工:G83 西山 B1 档+新拉 B2 西山郭注档(wikisource 四库本,抓取法记档);净化双源逐字一致;录首段 4—5 山(钱来之山起,以现读底本为准,不预判山名);流程同 G86;**西山经余山明确「留工作稿待后续阶段」呈报,不逞强全录**。
验收:A1—A8 同 G86 通用项;A9 呈报项入 STATE.openItems。

## 4. 线B:词条扩容(G90—G93,4 轮)

> 每轮通用流程:双源建条(形貌档案/释义/引文全 B1×B2 逐字)→recordStatus=unverified(不入推荐/探索/题池,首页 12 不变断言)→claims 奠基 ≥2 条(可溯来源,广注存档或类书,quote 逐字照录)→古图探查(CLASSIC_ART_RECON 清单池逐格过,PD 许可核验;拉到=入 classic-art+并陈接线,拉不到=「待图」占位如实)→registry 版画(既有 12 兽池无此兽则不新绘,占位签)。每轮一个词条,勿并做。

【G90】陆吾(昆仑丘神,西山经)
【G91】毕方(章莪之山,西次三经)
【G92】西王母(玉山/責国双点位,人形神祇——六层分隔尤严,演绎层不涉神格演绎)
【G93】烛龙(大荒北/海外北,现 ch-dahuang-dong/ch-haiwai-bei 据点)

每轮验收:A1 词条页断言(徽章「待考证」两态+六层结构);A2 claims ≥2 条上屏+来源台账 100% 可溯;A3 配图来源登记或「待图」占位如实;A4 词条总数 17→N 派生计数双向断言;A5 原文区零改动;A6 build+双主题截图。

## 5. 线C:工程体验(G94—G97,4 轮)

> 工程轮通用 A 项:build 过;禁新增 npm 依赖(package.json diff=0 证明);矩阵相关项复跑;双主题截图;console 零新增。

【G94】路由级代码分割
施工:App.tsx 全 15 页 React.lazy+Suspense(既有 page 级骨架沿用);vite.config build 输出策略按需增(只增不改,buildStamp 不动);实测:构建前后 JS 首包/总包对照表(vite 报告口径);vite preview(4173 自拉实例或用户既有,**不杀**)全路由可达+懒 chunk 200;file:// 直开行为如实登记。
验收:A1 首包 gzip 显著下降(前后数字表)+总 gzip 增幅 ≤5% 否则归因;A2 preview 全路由矩阵复跑全绿;A3 Suspense 加载态双主题可辨+reduced-motion 安全;A4 package.json 零 diff;A5 通用 A 项。

【G95】全站搜索(Ctrl+K/导航入口)
施工:搜索浮层(路由增量则 RUN_LOG 记理由):索引**运行时派生**(山名/词条/异文疑点/音表/claims 关键词,全部从既有数据源现算,零手抄);结果分组(山川/词条/异文/音表)计数与数据源双向断言;键盘全流程(打开/输入/上下选/回车跳转/Esc 关)+焦点环+焦点归还;reduced-motion 压平;空态与零结果态如实文案。
验收:A1 分组计数双向断言;A2 键盘全流程断言(Tab 流+焦点归还);A3 对比度 ≥4.5;A4 390/1440 零溢出;A5 通用 A 项。

【G96】页脚触控 44px(用户已裁决)+移动端走查
施工:页脚链接触控区 29px→44px(1440 与 390 双档,令牌化间距,视觉回归截图对照);390 全路由走查(横溢/触控/可读性),晴窗渐隐带遗留复查(四阶 G68 已清偿,确认未复发)。
验收:A1 触控区实测 ≥44px(双主题双视口);A2 视觉回归前后对照存档;A3 390 走查零横溢;A4 通用 A 项。

【G97】键盘无障碍专项
施工:全站 Tab 流审计(扩录新页+搜索浮层+懒加载后全量复走);focus-visible/焦点环/跳转序复查;ARIA(轮播/画布/details/浮层)抽查修复;对比度全站复跑(28 组口径+新增面)。
验收:A1 Tab 流全路由逐站断言;A2 焦点环令牌统一(无裸色);A3 对比度零失败;A4 修复项前后表;A5 通用 A 项。

## 6. 线D:纵深终验(G98—G102,5 轮)

【G98】新词条 claims 补齐
施工:G90—G93 四词条 claims 补至存量词条中位水平(每条 ≥4 条),广注存档/类书核源,quote 逐字;两面原则(误读与正读并陈)。
验收:A1 claims 计数双向断言(31→N);A2 来源台账 100% 可溯;A3 build。

【G99】疑12 裁决固化(用户已裁决:维持通行+郭注两存)
施工:四例(禺/亶/杻/雘)裁决结论固化上屏——音表页/凡例增「读音依据」注记(维持通行标注,郭注异读两存,不改既有 ruby 标);ruby 分轨 4 字复查;STATE 呈报项闭环记档;G85 结果若涉 variants 疑15 注记一并核验。
验收:A1 注记上屏断言;A2 既有 ruby 零改动 diff 证明;A3 呈报项闭环记录;A4 通用 A 项。

【G100】三页联动 III+凡例五阶新例
施工:音表/异文/DistanceTable 区吸收 G84—G99 新数据全量刷新;凡例页(HowToReadPage)增五阶新例 2—3 条(候选:三源对读例/搜索用法例/verified 升级与计数口径例,以实做为准);跨词条互链扩容(广注共现取证扫描,目标 +3 对,无标签外推红线);相关计数断言全量更新。
验收:A1 三页逐项断言;A2 凡例与实况一致(凡引数必先程序化统计,G81 坑在案);A3 互链取证记录;A4 build+截图。

【G101】纹样收口+待图复查
施工:纹样台账现读,五阶新增 ≤2 落点收口(候选:搜索浮层裱边/新词条卡纸纹,以设计克制为先,宁缺勿凑);待图 9 兽+新词条 4 兽古图复查一轮(蒋应镐 15 文件/汪绂 8 文件/三才图会 112 张逐格过,PD 核验),拉到=入池并陈,拉不到=如实维持「待图」。
验收:A1 纹样台账 ≤4 且逐处登记;A2 复查逐格结论在案;A3 新入图许可+体积实测达标;A4 通用 A 项。

【G102】五阶终验
施工:REPORT 五阶卷(四线对照/性能体积决算/呈报项/判定);回归矩阵复跑(以出货产物,现读口径+五阶新断言);双主题全站走查+对比度复跑;收官截图 `GALLERY_FINAL5/`;版本戳 rebuild 复跑(__BUILD_COMMIT__ 页内=HEAD);STATE 收官态(20/20+status completed+shutdown 只读条款);DEV_LOG 五阶章。
验收:A1 矩阵全绿;A2 REPORT 判定;A3 收官截图齐;A4 四件套齐;A5 此后触发只读退出并提醒用户停用定时任务。

## 7. 每轮固定流程与 DoD

1. Read 本文件+GALLERY_STATE.json(取最早未完成轮);`.round-lock` mtime <45 分钟=退出不计轮,过期接管并刷新。
2. Read RUN_LOG 顶部上一轮交接+涉及组件坑册小节。
3. 施工(中文全走 Write/Edit;含 `$()` 脚本先落 `dev/roundNN-*.mjs`)。
4. `npm run build`(tsc --noEmit && vite build)必须过。
5. 无头 Chrome+CDP 实测(附录 C 口径);内容轮加原文零改动 diff 证明,工程/美术轮留截图。
6. 小提交(标 G 编号,勿 amend)→更新 SPRINT 行/STATE(validExecutions+1、currentRound 推进、rounds 键)/RUN_LOG 顶部条目(**记「五阶 n/20」**+交接:做了什么/坑/遗留)。
7. **DoD 未全过不得标 done**;做不完如实 partial 留下轮接续。
8. 轮末删锁;自拉的 Chrome/Node 进程清干净(用户预览服务器除外)。

## 8. 附录 A:底本源与核验源(G83 建档起点,以实查为准)

- **南次三经**:B1=维基文库《山海經/南山經》页「南次三經」至篇末(curl HTML→剥标签,抓取法记档头,〈〉夹注/「一作」非正文);B2=wikisource-nanshan1-guopu-20261002.txt 已在档(丹穴=L76、南禺=L96,区间现读对账)。三经 13 山:天虞…南禺。
- **西山经**:B1/B2 均待拉(G83 建 B1 首段,G89 前补 B2 郭注);西次一经首段「南山經之首曰華山……」实际以现读底本为准(注意 wikisource 页内经名与通行本差异,逐字照录不校改)。
- **换源回核候选**(G84):汉典 zdic.net / 国学大师 guoxue.com / 古诗文网 gushiwen.cn / 殆知阁 / 维基文库异本;**每源记 URL+抓取时刻+引文逐字比对**;三路核活法(curl→WebFetch→web_reader)路径如实注记;本机 DNS 对部分域可能 NXDOMAIN(污染非死链,须服务端交叉确认);软页(200 但正文零命中)如实记「不可用」不硬凑。
- 坑(既证):wikimedia 429 重试即过;并行 curl 丢产物须串行;中文 URL 百分号编码;Cloudflare 拦 curl 不拦 WebFetch;核活三路法不虚报。

## 9. 附录 B:双源扩录流程(沿 G71—G74 先例)

- 净化:两源正文逐字一致才升正式;不一致=疑点照录不校改(「作X疑Y」式,接续既有疑点编号,现疑15);郭注逐字照录繁体;篇末总述/里距 hanziNum 解析相加(非手填)。
- recordStatus=unverified+不入推荐/探索/题库(ENTITIES index 过滤内建);首页「条目已核验=12」每轮断言。
- 简繁转换只收一对多危险字入 AUDIT;同形字保留原形;易误读字注音入 PINYIN;GLOSSARY 增补平面字/代理对必跑 annotate 白屏探针。
- 地图节点锯齿续排避让既有 33 节点,零重叠实测(390+1440)。
- verified 升级仅限山位且仅限 G84/G85(依回核证据逐条行号);词条升级禁(呈报用户)。

## 10. 附录 C:验收工具与断言口径(坑册精选,详见 RUN_LOG)

- 脚本:`dev/roundNN-*.mjs`+`dev/roundNN-results.json`;无头 Chrome 全新 `--user-data-dir` 临时目录+独立端口(9337 起 93xx 避让);MSYS 多路径参数只转末位,写显式 `D:/`。
- CDP:连 `/json/list` type=page 的 target(连 browser 级 ws 静默失败);evaluate 多语句须 IIFE;新 profile 默认 light=晴窗,测灯下先 `localStorage.setItem('shanhai-theme','deng')` 后 reload;换主题测量须清存储+reload;带 transition 元素测量前注入 `transition:none`。
- 断言口径:视口内宽含滚动条——「满宽」断言与容器比而非 innerWidth;ruby 断言剥 rt;CitationBlock 郭注默认收起,断言前 `details.open=true`;textContent 顺序=文档序;favicon 用 curl 资源存在+link 标签(勿用 console);needle 取稳定子串且先自数据源实算(G81 坑);计数断言不得写死数值——自数据源派生。
- headless `--screenshot` 直截真图;IAB 后台晴窗亮页截图有灰纱伪影,验收用无头直截。

## 11. 异常兜底

- 验收失败 ≤2 次重试后置 blocked 如实记账;做不完 partial 接续,禁跳轮。
- 古图/外源拉取失败走降级如实;构建异常先查是否误在 C 盘 junction 跑;`.round-lock` 过期但项目文件 mtime 几分钟内有新写=实例活跃,让位。
- **G102 完成后或有效执行达 20 次:此后一切触发只读退出(不构建/不提交/不改文件),并提醒用户停用本定时任务。**

## 12. 附:定时任务提示词定稿(注册时全文粘贴,注册前以本文件 §12 为准)

无人值守推进《山海万象录》五阶「山河广记」冲刺(G83—G102,共 20 轮),一次触发只做一轮,禁止连做多轮、不 sleep 等待、不创建第二个定时任务。

项目真实路径(Git Bash):/d/zcode/workspace/default/shanhai(C 盘同名路径是 junction,Vite 在那里构建必失败,一切命令必须在 D 盘真实路径执行)。

任务书(唯一指令源):项目根目录 GALLERY_PROMPT5.md——先 Read 它,再读 GALLERY_STATE.json 取「最早未完成轮」,严格按任务书的硬红线、20 轮任务表、附录 A/B/C 与验收清单施工;本提示词与任务书冲突时以任务书为准。

固定要点(防呆,细节一律以任务书为准):
1. 并发保护:项目根 .round-lock 的 mtime 距今 <45 分钟=有实例在跑,立即退出不计轮;过期才接管并刷新。
2. 每轮流程:施工→npm run build(tsc --noEmit && vite build)→无头 Chrome+CDP 实测断言→小提交(git -c user.name=shanhai-auto -c user.email=shanhai-auto@local,提交信息标 G 编号,勿 amend)→更新 GALLERY_SPRINT.md 看板、GALLERY_STATE.json(validExecutions+1/currentRound 推进)、GALLERY_RUN_LOG.md 顶部日志(记「五阶 n/20」)→删锁;不杀用户 4173 预览服务器。
3. done 必须是验收条件真实通过,不得因时间到自动标完成;做不完标 partial 留下轮接续,不跳轮。
4. G83 首轮先做状态接管(STATE 重写 planId shanhai-gallery-5/phase 5/totalRounds 20/记五阶基线)再施工。
5. G102 完成后或有效执行达 20 次:此后一切触发只读退出(不构建、不提交、不改文件),并提醒用户停用本定时任务。
