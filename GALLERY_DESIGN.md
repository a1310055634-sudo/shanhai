# 古朴总纲(GALLERY_DESIGN.md)

> G02 定稿。后续轮次(G03—G18)照本文档施工,不再回问对话。
> 原则:**做旧不脏,纹样克制,静止截图独立成立**。所有改动不得破坏 R 冲刺既有验收(对比度、触控 44px、reduced-motion 全局压平、六层内容分隔)。

---

## 一、材质线(G03/G04 落地)

### 1.1 宣纸纸纹(G04)

**做什么**:新建 `src/components/common/PaperTexture.tsx`——内联 SVG 滤镜纤维纹:

- `<filter>` 用 `feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2"` + `feColorMatrix` 压成灰度;
- 组件渲染为 absolute inset-0 的覆盖层,`pointer-events: none`;
- CSS:`opacity ≤ 0.05`,`mix-blend-mode: multiply`;
- 导出为可复用组件(`<PaperTexture />`),不引外部图片,预计 gzip 增量 <2KB。

**落地位置(4 处,不许再加)**:

| 落点 | 文件 |
|---|---|
| 引文块 | `components/CitationBlock.tsx`(cite 容器内) |
| 古卷阅读面 | `pages/ChapterPage.tsx`(宣纸阅读卡内) |
| 版画装裱底 | `components/art/BeastArtwork.tsx`(装裱底色层内) |
| 首页今日异兽引文卡 | `components/home/TodayBeast.tsx`(quote 卡内) |

> **G04 修订**:原定第四落点 JournalEvidence 抽屉,实测(G04 开工核对)抽屉通体墨夜面(`--text-on-dark` 文字+#16221d 底),不符本节负面清单「纸纹只上宣纸面」——改为 TodayBeast `.quote`(宣纸底引文卡,与 CitationBlock 同族语言)。抽屉的古朴化(G05 若涉及)走墨夜面语言(细金线),不用纸纹。

**不做什么**:茶渍、折角、破洞、大面积泛黄、纸纹盖过正文(纹层必须在文字层 z-index 之下)、深色墨夜面上用纸纹(只用于宣纸表面)。

### 1.2 旧金哑光(G03)

- `--old-gold: #b18b56` → 调向低饱和哑光(候选 `#a98a5f` 区间,最终值以对比度实测定):降饱和不减可读性;
- 边框透明度三级体系(0.55/0.38/0.22)**保持不变**,只动色相明度;
- Hero `.ghost` hover 的实心金底填充保持,不加渐变不加阴影发光。

**不做什么**:金色渐变、金属光泽、glow、亮金描边。

### 1.3 宣纸暖度(G03)

- `--paper: #e8e0cd` / `--paper-bright: #f3eee2` 向暖微调(幅度 ≤ 每通道 6,如 #e8e0cd → #e9dfc9 区间),调后**重算并回写对比度注释**:宣纸面正文 ≥4.5:1、弱化文字 ≥4.5:1(现值 11.8/6.7,允许降至 ≥7 而不破红线);
- 墨夜色(--ink-night/--ink-deep)**不动**。

---

## 二、字韵线(G03/G06/G08 落地)

### 2.1 字韵三层定义(G03 定变量,G08 落地)

| 层 | 变量 | 字体栈 | 用途 |
|---|---|---|---|
| 标题层 | `--font-title`(G03 新增) | `'Kaiti SC','STKaiti',KaiTi,'楷体',serif` 首选,回退 `var(--font-serif)` | 站名、页标题 h1、山名、词条名、篇章名 |
| 正文层 | `--font-serif`(现有) | Noto Serif SC / 宋体 | 原文、引文、释义、正文段落 |
| 辅助层 | `--font-sans`(现有) | Noto Sans SC / 黑体 | UI 标签、按钮、拼音、出处、meta |

**标题层落地位置(G08)**:Navigation 品牌文字、Hero `.title`、各页 SectionHeading 主标题、EntityDetailPage h1、ChapterPage h1、ChaptersPage 篇章名、JournalScene 站名(山名)。**不动**:ConceptMap 地图标签(空间紧,保持现状)、正文层、辅助层。

**字距**:标题层统一 `letter-spacing: 0.12em–0.16em`(现 Hero .title 0.1em → 0.12em 起步;眉标 0.3em+ 保持)。

### 2.2 标点(G08)

- 原文阅读面(ChapterPage 阅读卡、CitationBlock `.text`)加 `line-break: strict`;
- G08 时全站 grep 弯引号 `“”‘’`,统一为直角引号「」(古籍语境);核对 EDITION_EVIDENCE 确认底本引文内的引号形态不受影响(引文照录底本标点,若底本用弯引号则不改——**原文层零改动红线优先于本条**)。

### 2.3 竖排题签(G06)

**做什么**:书衣式竖排题签组件级样式(直接写进 `Hero.module.css` 与 `JournalOpening.module.css`,不建独立组件):

- `writing-mode: vertical-rl; text-orientation: upright;`;
- 宣纸底(--surface-paper)+ 墨字(--text-on-light)+ 双细线(外 1px --border 系 + 内 1px,同界栏语言)+ 右下朱砂小印(复用 Hero `.seal` 语言,缩小至 24px);
- 桌面(>900px)置于画面左上,与 `.content` 错开;题签文字:首页「山海万象录」,开卷「南次一经」;
- 超长规则:竖排高度超容器 70% 时 font-size 降一档(--fs-h3 → --fs-body),不截断不换列;
- 390 档(≤640px)降级为横排眉标(复用现有 `.kicker` 语言),**不强制竖排**。

**验收补充**:焦点路径不变(题签为纯装饰,不加 tabIndex,aria-hidden)、不遮版画主体(beastBox 区域外)、reduced-motion 下无动画(题签本身无动画)。

---

## 三、纹样线(G05/G07/G14 落地)

### 3.1 界栏版框(G05)

**改法**(三处:`CitationBlock.module.css` / `JournalEvidence.module.css` / `EntityDetailPage.module.css` 引文区):

- 「圆角卡片+左粗边」→ 四周双边界栏:元素自身 `border: 1px solid`(外线,--paper-border 加强档)+ `::before` 绝对定位 `inset: 3px` 画内线(1px,--paper-border 弱档);内外线间距 3–6px;
- `border-radius: 0`(CitationBlock 现为 --radius-card 4px → 归零);
- 版心留白:padding 从 22/24 调为 `28px 32px`(上下 28 左右 32,近似半版行款);
- `:target` 高亮:现为 box-shadow 单圈 → 改「朱砂双线」:外圈 `box-shadow: 0 0 0 1px var(--cinnabar)` + `::before` 内线切换为朱砂 1px;
- JournalEvidence 与 EntityDetailPage 引文区同语言,但不改变各自信息结构。

**验收**:390 不溢出;古卷「回看原文」hash 锚点逐条实测(scroll-margin-top:124px 保持);`.cite:target` 命中路径实测。

### 3.2 金线收头(G07)

**做什么**:新建 `src/components/common/Rule.tsx`——带端头纹样的水平分隔线:

- 三个原创纹样 SVG(内联 path,viewBox `0 0 16 16`,`stroke="currentColor"` `fill="none"` `stroke-width="1.5"`):
  1. **云纹**:双螺旋对望(两段 arc 卷曲);
  2. **回纹**:方形单元回字(三折直角折线);
  3. **方胜**:两菱相扣(两个旋转 45° 的方形交叠);
- 颜色一律 `currentColor`(继承文字色,默认旧金),尺寸 12–16px,视觉重量必须低于正文文字;
- 组件 API:`<Rule ornament="cloud"|"meander"|"fangsheng" />`,渲染 `纹样—线—纹样` 对称结构。

**落地位置(全站 8 处上限,写死)**:

| # | 落点 | 文件 |
|---|---|---|
| 1–2 | SectionHeading 分隔线两端 | `components/SectionHeading.tsx` |
| 3–4 | 页脚顶线两端 | `components/Footer.tsx` |
| 5–6 | 行旅进度轨首尾端点 | `components/journal/JournalProgress.tsx` |
| 7 | 合卷尾饰 | `components/journal/JournalClosing.tsx` |
| 8 | About 凡例卡分隔 | `pages/AboutPage.tsx` |

**不做什么**:整条线换成花纹线、纹样放大成主视觉、超过 8 处、动画纹样。

**原创声明(G07 施工定稿)**:三个纹样(云纹=底横线+双拱如意云勾、回纹=雷纹方螺旋一笔、方胜=两菱相扣)均为本项目参照传统公共形制**自绘的 SVG path**(viewBox 16×16,stroke currentColor 1.4),无外部素材来源;形制属公有领域,本实现不受版权约束。组件 `components/common/Rule.tsx`(整条 `<Rule kind>` / 单端 `<RuleOrnamentIcon kind>` 双 API),样式 `Rule.module.css`。**G07 实际落点与计划一致**(8 处):SectionHeading 分隔线两端(回纹,全站页头)、Footer 顶线两端(云纹,替换原 border-top)、JournalProgress 轨道左上/右上角饰(云纹 10px)、JournalClosing 合卷收束线(云纹,居中 260px)、AboutPage 凡例页收束线(方胜,居中 300px)。

### 3.3 鱼尾分隔(G21 定稿)

古卷页(ChapterPage)正文段与正文段之间插版心鱼尾形小分隔——**已落地**:`Rule.tsx` 导出 `RuleFishTail`(12×7px,上缘平直下端收尖的折面抽象,path 自绘),色 `--paper-border`,仅古卷阅读面 1 处预算(gap 存疑段与段首不插)。**原创声明**:参照古雕版书口鱼尾公共形制自绘 path,无外部素材。存疑注同步升级「校注」小签(宣纸内衬 55% 透明+双细线),与正文层级拉开、不混排。

---

### 3.4 行旅长卷九站意象对照(G25 定稿)

> **性质声明**:SceneLayers 是抽象山影演绎层(纯色块/脊线/雾带),不画具体物象;本表逐站给出「原文依据→画面元素」映射,**凡原文无据的参数一律标注「演绎」**,不把演绎写成原文意象(防臆造)。原文引句均照录自 `EDITION_EVIDENCE/ctext-nanci1-20260927.txt`(底本 A,2026-09-27 存档,简体)。

**三条总规律(先读这个再看表)**:

1. **warmth 色温曲线是策展叙事曲线**(冷启—渐暖—高潮—回落),非逐山意象逐点映射;文本锚点只有三处:招摇「临于西海」→最冷(warmth 0),杻阳「其阳多赤金」→转暖锚(warmth 0.35),青丘九尾狐为行旅高潮→峰值(warmth 0.595),箕尾收束→回落(0.42)。其余站值是曲线插值,属演绎。
2. **雾带密度大体随「水」意象走**:柢山「多水」0.9 > 亶爰「多水」0.7 > 箕尾「汸水+踆东海」0.6 > 杻阳「怪水」/基山/青丘「英水」0.5 > 招摇「临西海」0.4;两处例外均有更高优先级:堂庭(原文无水雾,本轮 0.8→0.45 回归规律)、猨翼(「水多怪鱼」让位「不可以上」的险峰可辨性,G23 决策,0.2 保留)。
3. **profile 山脊形**:只有猨翼有「不可以上」的险峻明文→jagged 最险档(amp 1.3);箕尾「其尾踆于东海」→stubborn 低平宽远(山影没海);其余站原文无山势语,profile 一律视为演绎选择,如实标注。

| 站 | 山(原文引句,照录 A) | 画面元素(现参数) | 判定与依据 |
|---|---|---|---|
| 1 | 招摇之山:「临于西海之上，多桂，多金玉。丽𪊨之水出焉，而西流注于海」 | warmth 0(冷调锚)/rolling/mist 0.4 | ✓ 临海→冷调+薄雾;首山无山势语→rolling(演绎);「多桂多金玉」不入背景山影(由版画/词条层表达,不臆造入景) |
| 2 | 堂庭之山:「多棪木，多白猿，多水玉，多黄金」 | warmth 0.105/rolling/**mist 0.45(G25 修,原 0.8)** | **修**:原文四物皆产、无水雾意象,雾 0.8 无据且打断规律 2;降 0.45 回过渡档;白猿/棪木由异兽词条层表达 |
| 3 | 猨翼之山:「其中多怪兽，水多怪鱼，多白玉，多腹虫，多怪蛇，多怪木，不可以上」 | warmth 0.21/jagged amp1.3 steps1.2(G23)/mist 0.2 | ✓ 「不可以上」明文→险峰最险档(G23 更险+雾压低保可辨);水意象让位险峰(怪鱼由词条层表达) |
| 4 | 杻阳之山:「其阳多赤金，其阴多白金。怪水出焉，而东流注于宪翼之水」 | warmth 0.35(转暖锚)/stubborn/mist 0.5 | ✓ 赤金→转暖锚;stubborn 属演绎(无山势语);怪水→基准雾 |
| 5 | 柢山:「多水，无草木」(**柢/祗 variant 待核,未建站**) | warmth 0.28/三层透明度减半(0.5/0.5/0.6)/mist 0.9 | ✓ 多水→最浓雾;未核留白位→降透明度雾占位,页面如实显示待核,不显山形细节 |
| 6 | 亶爰之山:「多水，无草木，不可以上」 | warmth 0.385/stubborn/mist 0.7 | ✓ 多水→浓雾;「不可以上」以深雾表不可即——与猨翼表法区分的依据:亶爰险因原文未言,雾深即「不可即」;猨翼有怪兽怪蛇怪木明文,以山形表险 |
| 7 | 基山:「其阳多玉，其阴多怪木」(猼訑「其目在背」) | warmth 0.49/jagged 基准 amp1/mist 0.5 | **演绎**:无山势语;jagged 呼应「怪木」之奇,amp=1 与猨翼 1.3 拉开(「奇」≠「险」);如实标注为演绎,非原文映射 |
| 8 | 青丘之山:「其阳多玉，其阴多青䨼。英水出焉，南流注于即翼之泽」(九尾狐高潮) | warmth 0.595 峰值/rolling/mist 0.5/**exhibitCenter 版画居中** | ✓ 高潮站→最暖+版画居中(策展锚);英水→基准雾;rolling 属演绎(无山势语);warmth 峰值挂靠叙事而非青丘山体文本 |
| 9 | 箕尾之山:「其尾踆于东海，多沙石。汸水出焉，而南流注于淯」 | warmth 0.42 回落/stubborn/mist 0.6/近景透明度 0.8 | ✓ 「尾踆东海」→stubborn 低平宽远、山影没海(文本锚最直接的一站);汸水/临海→雾 0.6;近景淡出=收束(策展曲线,演绎) |

> **修订记录**:G25 仅动一处参数(堂庭雾 0.8→0.45),理由见规律 2;其余八站参数全部维持(G23 刚验收过的状态),本表把「原本凭感觉设的值」逐站挂上文本依据或如实标「演绎」。后续轮改场景参数前先回本表修订。

---

## 四、版式线(G05/G11—G15 逐页落地)

### 4.1 装裱形制(G15)

EntityDetailPage 版画区改「绫边装裱」:

- 外框:6px --paper-border 色带(绫)+ 内衬 1px 界栏线;
- 诗塘:版画四周 16px 宣纸留白(现 BeastArtwork 已有装裱底,调 padding 节奏即可);
- 地脚:出处小字区固定在装裱下缘,用 --fs-caption,不压画心;
- 现有出处浮层(截图 G01 发现文字挤压)改为地脚排布——**顺带修 G01 缺口 #4**。

### 4.2 版心节奏

- 阅读面 max-width 780px 保持(CitationBlock `.cite`、ChapterPage 阅读卡);
- 段落节奏:正文行高 1.85–2.0 保持;界栏内段距 1.75em;
- 各页 SectionHeading 与首段间距统一为 `--space-section-desktop` 的 1/2(64px)/移动 42px——G11—G15 逐页核对时顺手对齐,不单开一轮。

### 4.3 逐页重点(G11—G15 各自的版式任务)

| 轮 | 页 | 版式任务 |
|---|---|---|
| G11 | 首页 | Hero 渐变压饱和(墨绿 22352c → 调向 1f2c26 区间,降绿艳);入口卡片与界栏语言同族(圆角归零、双线);眉标(kicker)统一 |
| G12 | 图鉴/探索 | EntityCard 装裱与 BeastArtwork 同族;筛选控件焦点态统一(:focus-visible 已有全局,补控件级);空态文案用 G09 术语 |
| G13 | 山川图 | 底面宣纸化(画布区改宣纸底+墨线水系);节点朱砂点、标签旧金;**修 G01 缺口 #1(1440 档昆仑之丘/槐江之山标签叠压)** |
| G14 | 古卷页 | 段距/版心复核;篇末总述(seg-ns1-tongji)与存疑注层级;鱼尾分隔(3.3);**目录页「可阅读/待录入」徽标的古雅表达(徽标文字本身不改——诚实状态词)** |
| G15 | 详情页 | 4.1 装裱;流变区层级(标题/正文/出处三级) |

---

### 4.4 谱系三方关系图(G33 定稿)

RelationsPage 顶部新增 `LineageMap`(src/components/relations/),替代原页首三色点图例;原卡片列表降为下方「条目详表·文本视图」小节保留(图的文字对照与无 SVG 回退)。**语言与山川图(ConceptMap)同族**:宣纸底(--surface-paper+淡墨等高线底纹/雾层)、朱砂点(条目,待考证空心)、旧金签(篇章 rect 签)、墨字标签(山川,无条目山淡墨 0.68)、旧金线(栖居实线=已核验/虚线=待考证;归属淡金长虚线)。

**布局算法(确定性,零交叉)**:三列泳道——篇章签 x=96、条目 x=470、山川 x=868,viewBox 1000×918。23 山按篇章分组(通行本 order 排序:南山经 15→西山经 4→北山经 1→海外北经 1→大荒东经 2),南山经组内按子经排序(一经 8→二经 6→三经 1[丹穴]),行距 30/组距 50;**每个条目的 y=其栖居山的 y**(数据保证每山≤1 条目),栖居线全水平零交叉;篇章签 y=组内山 y 均值,归属线从签右端扇形汇聚到组内各山。标签实测零重叠断言通过(51 text 两两 bbox 不相交)后定稿:初版列首题识 y=40 与首行条目标签(狌狌,y=57)bbox 相交,题识上移至 34、TOP_Y 72→82 修复。

**数据派生纪律**:全部关系由 CHAPTERS/LOCATIONS/ENTITIES 三源实时派生(chapterId 字段/relatedEntityIds+locationIds),**不维护第三份关系数据**;图上只画两类可核对连接(条目栖居山川、山川归属篇章),不虚构血缘/敌对。山川是否关联条目、条目是否已核验,均以视觉档次如实区分(淡墨/空心虚线),图例逐项说明。

**交互与可达**:43 节点全部 tabIndex=0 + role=button + aria-label(篇章含山/目计数),Enter/Space 选中(再按切换关闭)、Esc 或「收起」钮关闭;选中态高亮相关连线;信息面板(aria-live=polite)按节点类型给深链(条目→/catalog/、山川→关联条目或古卷提示、篇章→/chapters/)。面板链接与收起钮 min-height 44px;节点透明命中区 r32(横滚后 48.6px,与山川图同口径)。

**390 策略(与山川图同款,如实记录)**:≤700px 时 mapWrap overflow-x:auto + .map min-width:760px——横向滚动保 13px 字号,不做等比缩放(缩放会使标签不可辨);页面级零横溢。实测:375 视口 wrap 横滚 760>333 生效、docScrollW=375 无页面横滚;1440 档零溢出+零重叠。双主题实测四要素翻转(灯下底 244,236,223/墨 38,48,43/朱砂 167,71,56/旧金 165,135,91 ↔ 晴窗 247,241,227/46,42,32/143,60,43[=G32 加深 #8f3c2b 交叉吻合]/102,81,46)。

**纹样台账**:本页零新增纹样落点;等高线底纹/雾层为山川图 G13 同族语言复用,不另计预算。

---

## 五、术语对照表(G09 施工依据)

**原则**:只动「名词性、装饰性、氛围性」文案;**不动**操作性动词(进入/查看/复制/清空/返回)、诚实状态词(待录入/待核/已核验/存在异文)、aria 里的功能性描述。**主导航七词永不改**:卷首、异兽、山川、古卷、谱系、探索、收藏。路由 slug 全不动。

| 现词 | 改为 | 位置 | 理由 |
|---|---|---|---|
| 加载中… | 展卷中… | 全局 loading 态 | 氛围词,无操作歧义 |
| 暂无收藏任何条目 | 此卷尚未珍藏 | FavoritesPage 空态 | 「珍藏」动词化更雅 |
| 尚未收藏 | 尚未珍藏 | 同上 aria | 同步 |
| 去图鉴看看 | 去图鉴寻访 | FavoritesPage 空态按钮 | 氛围词,「寻访」仍含进入义 |
| 搜索 | 检索 | CatalogFilters 标签(标题「检索图鉴」已雅,输入标签统一) | 名词统一 |
| 清空记录 | 不动 | FavoritesPage | 操作词,直白优先 |
| 复制原文(含出处) | 不动 | 全站 | 操作词 |
| 待录入/待核/已核验 | 不动 | 全站 | 诚实状态词 |
| 继续行旅/从招摇重新出发 | 不动 | JourneyPage | 操作词 |

**G09 施工时**:先 `grep -rn "加载中\|暂无\|搜索" src/` 拿全量清单,按本表替换,表外词一律**不改**(宁可少改不可错改);替换清单逐条入 RUN_LOG。英文夹带扫描(grep 常见英文残句)照旧执行。

---

## 六、执行纪律(后续轮通用)

1. 每轮施工前读本文档对应节;改法与文档冲突时,**先改文档再改码**(文档即唯一事实源,并在 RUN_LOG 记录修订);
2. 纹样/落点数量上限是硬约束:界栏三处、纸纹四处、收头八处、鱼尾一处,超限先回本文档修订;
3. 每轮浏览器核对:390 必测;涉桌面档改动的(界栏/题签/收头/装裱)用 setViewportSize 实测 1440;
4. 零空话:本档与 RUN_LOG 禁用「高级感」「氛围拉满」「质感大幅提升」类不可复核表述,只写做了什么、落在哪、怎么验的。

---

## 七、双主题线(G31 起步,G32 走查收口)

### 7.1 架构与真源

- 真源是 `<html data-theme>`:`:root` 即「灯下」墨夜主题(默认,无属性);`html[data-theme='qing']` 覆盖为「晴窗」宣纸系。全部色彩类令牌双值;字体/字号/版面/动效等结构令牌两主题共享(tokens.css 头注同口径)。
- 初始化:index.html 内联脚本在 React 挂载前定主题——localStorage(`shanhai-theme`,`'qing'|'deng'`)优先,否则跟随 `prefers-color-scheme`(浅色系统→晴窗,深色/无偏好→灯下默认);存储不可用保持默认。防闪烁,无 FOUC。
- 切换:`src/hooks/useTheme.ts`(useSyncExternalStore+MutationObserver 订阅 data-theme);切换瞬间挂 `html.theme-switching`(base.css 压平全部 transition)双 rAF 后移除,setTimeout 100ms 兜底幂等移除(后台标签 rAF 暂停时仍能复位)——**切换零动画,不引入任何新动画**,base.css prefers-reduced-motion 压平规则不受影响。
- 入口:页脚 colophon 行右侧「◐ 晴窗 / ◑ 灯下」按钮(示将切往的主题),min-height 44px。

### 7.2 关键决策:--paper / --paper-bright 的晴窗重定义

- 事实:两令牌全站 93 处作 `color:`(深底强调亮字语义)、仅 2 处作 `background:`(skipLink/SourcePromise,G31 已改用 `--surface-paper`)。
- 因此晴窗下二者**重定义为墨字双档**(--paper #3a3527 / --paper-bright #262117),93 处组件代码零改动自动适配;导航/页脚 brandName、navLink hover/active 同步受益。
- 铁律:**表面令牌(--surface-night/--surface-paper)一律写死色值,禁止引用 --paper/--paper-bright**,防级联污染(tokens.css 晴窗块注释同口径)。

### 7.3 晴窗色板(G32 IAB 实测收敛后定稿)

实测方法:页面内逐元素采样(getComputedStyle 色彩 × 有效背景逐层 alpha 合成,渐变底取最不利色标),WCAG 相对亮度对比度;正文阈值 4.5:1、大字(≥24px 或 ≥18.66px 粗体)3.0:1。修复后 13 路由×双主题 390 档扫描:晴窗全路由零失败;灯下残余全部为印章装饰豁免(见 7.4)。

| 令牌 | 灯下 | 晴窗 | 实测最不利底对比度(晴窗) |
|---|---|---|---|
| --ink-night 页面底 | #0d1311 | #e9deca | 暖宣纸,非纯白 |
| --ink-deep 分层 | #17231f | #ddd0b4 | 分层带 |
| --paper / --paper-bright | #e9dfc9 / #f4ecdf | #3a3527 / #262117 | 墨字双档(纸底 9.05 / 12.01) |
| --text-on-dark | #d9d6c9 | #33382c | 正文墨字(9.05) |
| --text-muted | #8f968d | **#57503c**(G32 加深) | 弱化字(最深面 #ddd0b4 上 5.25;原 #625c49 仅 4.37 不达标) |
| --old-gold | #a5875b | #66512e | 赭金(4.95) |
| --cinnabar | #a74738 | **#8f3c2b**(G32 加深) | 朱砂(4.83;原 #99412f 对 #ddd0b4 4.36 不达标) |
| --rock-cyan / --verdigris | #31545a / #587367 | #2c4d53 / #52695d | 图形色 |
| --verdigris-text | #86a492 | **#45584b**(G32 加深) | 铜绿文字(5.00;原 #4f6656 对 #ddd0b4 4.09 不达标) |
| --paper-muted / --paper-border | #524f43 / rgba(38,48,43,.15) | #5a5340 / rgba(74,62,38,.24) | 宣纸面弱化字(6.4+) |
| --nav-veil | rgba(13,19,17,.92) | rgba(221,208,180,.92) | 导航纱面(G31) |

**G32 新增令牌族(收编 26 处硬编码深纱/画布字):**

| 令牌族 | 灯下 | 晴窗 | 语义 |
|---|---|---|---|
| --veil-soft / -mid / -strong / -solid | rgba(23,35,31,.45/.55/.7/.92) | rgba(252,247,237,.62) / rgba(250,244,232,.75) / rgba(249,242,229,.82) / rgba(247,241,227,.98) | 半透明面板底:灯下深纱、晴窗宣纸浅纱;其上墨字对浅纱合成底 ≥10:1 |
| --on-canvas / -bright / -muted / -gold / -verdigris / -cinnabar | #d9d6c9 / #f4ecdf / #8f968d / #a5875b / #86a492 / #d18069 | 两主题同值 | 深色画布(英雄区/长卷场景/版画)之上的文字,不随主题翻转;对最深画布 #0d1311 ≥5.28、对朱砂按钮底 ≥4.7 |
| --paper-veil | rgba(233,223,201,.92) | 两主题同值 | 宣纸内衬「贴纸」面板(G22 校注盒/引文底),其上暗字 ≥9:1(原 0.5—0.55 透明度在深底上合成出中间灰,暗字仅 2.2—3.3:1,G32 提实修复) |

### 7.4 G32 收编结果与豁免清单

- **收编**(收编前全量清单见 `HARDCODE-SCAN-G32.md`):26 处半透明深纱 background → --veil-* 四档;6 处画布区文字色 → --on-canvas 六档(Hero 标题/副题/按钮/眉标/滚动提示、首页行旅入口条、JournalProgress 进度轨、TodayBeast 主按钮);3 处金字上纸面(ConceptMap 区域标签 SVG fill、DistanceTable/ChapterIndex——后两处实为深底,回退 --old-gold 主题跟随)+ SourcePromise 眉标硬编码 #6a7168 → --paper-muted;2 处宣纸内衬 → --paper-veil。画布内渐变(EntityCard 底部渐隐、JournalOpening 开卷渐晕)与阴影按「册页插图」策略保留。
- **豁免(如实记档,不再改)**:导航站印「山」(灯下 3.22:1×13 路由)、404「待」印(3.03)、About「当前」眉标(3.01)、行旅当前站序号「2」(2.82)——均为朱砂印章/装饰印记,WCAG 标志与装饰豁免;修复需改朱砂主色,破坏 G03 认可色板。
- **既有层叠缺陷修复**:1280 桌面档英雄区印框半透明深底叠压左侧竖排书签条(visual-judge 复核发现,两主题同现)→ 印框改透明底线框式。
- **G37 挂账(本轮顺手发现)**:Hero/HomePage journeyEntryCta 各 1 处 transition 裸值(`0.25s ease`),未动,归 G37 审计。
- **测量伪影备忘**:IAB 后台标签 rAF 暂停会使 CSS color 过渡冻结在起点值——程序化扫描必须在切主题前注入 `transition:none` 后同帧取样,否则全站文字色呈假值。

## 八、细节层(G34 落地)

### 8.1 新令牌族(G34,双主题)

| 令牌 | 灯下 | 晴窗 | 语义 |
|---|---|---|---|
| --focus-ring-color / -width / -offset | var(--old-gold) #a5875b / 2px / 2px | 随 --old-gold 翻赭金 #66512e | 键盘焦点环(:root 引用零重定义,自动双主题) |
| --selection-bg / -text | rgba(167,71,56,.38)(朱砂淡染,深底合成约 #4a2a24) / var(--paper-bright) | rgba(143,60,43,.2)(浅底更淡防浊,合成约 #d6b3a7,墨字对其 ~6.5:1) / 随 --paper-bright 翻 #262117 | 选区淡染:原 G01 旧金淡染改朱砂(朱砂语义=选中/关键操作,与令牌注记一致);选中字色随主题「灯下亮纸/晴窗浓墨」 |
| --scrollbar-thumb / -hover / -track | var(--border-normal) / var(--border-strong) / transparent | 自动随边框三档翻赭金系 | 细滚动条配色,零新色值 |

### 8.2 细滚动条

- 标准轨:html { scrollbar-width: thin; scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track) }(Chrome 121+/Firefox)。
- webkit 轨:10px 视觉 6px(thumb 上下 2px border 内缩,经典细条技巧),track 透明不挡宣纸底;corner 透明。
- 组件内既有 scrollbar-width:none(导航横滚/古卷进度轨)就近覆盖保持隐藏,与全局不冲突(标准属性优先于 webkit 伪元素)。

### 8.3 焦点环全站清单(CSSOM 断言口径,round34 共 12 条规则)

- **全局兜底** base.css `:focus-visible` = `var(--focus-ring-width) solid var(--focus-ring-color)` + `offset var(--focus-ring-offset)`;全站一切可聚焦元素的默认键盘环。
- **令牌环**(与全局等价,显式写出防漂移):CatalogFilters .input/.select(另加 border-color 变金)/.viewBtn/.clear、JournalEvidence .evidenceBtn×2/.drawer/.closeBtn/.evLink 共 8 处规则,G34 由硬编码 2px/old-gold 统一改引令牌。
- **三类记录在案变体**:①贴边环——EntityCard .cardLink outline-offset:-2px(卡内缩,防环出卡裁切);②SVG 描边环——ConceptMap/LineageMap 节点 :focus-visible circle/rect stroke: var(--focus-ring-color)(SVG 形状 outline 不适用);③画布亮纸环——JourneyPage .scrollSlot/.indexLink/.navLink 用 --paper-bright(行旅页深色画布上下文,G32 对比度全表实测通过,两主题:灯下亮纸/晴窗浓墨,不并环)。
- **安全模式**:EntityCard/ConceptMap/LineageMap 三处 `outline:none` 均为「默认关、:focus-visible 显式补回」写法,键盘环无缺口。
- **断言实录**:CSSOM 遍历(含嵌套容器递归)得 12 条规则与上表逐一吻合;程序化 focus 不触发 :focus-visible(浏览器启发式,IAB 键盘注入不落焦点的已知限制);改用无头 Chrome CDP Input.dispatchKeyEvent 真实 Tab 派发——灯下 Tab×6 全部 fv:true+outline rgb(165,135,91) 2px offset 2px,晴窗(含全新 profile 按 prefers-color-scheme 自动进晴窗)rgb(102,81,46),reduced-motion=reduce 下全站压平仍生效(transitionDuration 1e-05s)。

### 8.4 页脚校讫记+构建版本戳

- vite.config.ts 构建时 execSync 读取 `git rev-parse --short HEAD`+日期,define 注入 `__BUILD_COMMIT__`/`__BUILD_DATE__`(git 不可用回退 unknown 不阻塞构建);类型声明在 vite-env.d.ts。
- 页脚 colophon 第二行「校讫记 · {date} 编成 · 本次第 {commit}」:fs-micro 档、tabular-nums、不承载必读信息(装饰性眉标口径);与承诺行组成 .colophonMeta 左列,右侧主题钮 44px 不变。
- 一致性验收:构建戳出现在 git log 中即一致(功能提交后 rebuild,戳=功能提交短号;日志/STATE 后续提交不回改戳)。

### 8.5 截图管线伪影备忘(G34 新坑,后续截图轮必读)

- 无头 Chrome headless=new `Page.captureScreenshot`(fromSurface 省略/true)**不绘制文本选区高亮**(合成表面层不含 selection);fromSurface:false 在 headless=new 输出空白帧,不可用。选区验证必须走真实有头渲染(IAB)。
- **IAB 后台标签截图伪影**:晴窗亮页面整页均匀灰暗(深底透出感),灯下深页面不可见;reload 直出/注入动画压平/前台化 set(true) 均不能消除,无 DOM 覆盖层(no overlay)。同页页脚区(CDP 路径)渲染正常,证明页面本体无缺陷。样本存 g34-qing-1440-selection-iab-veil-artifact.png(选中段浅红染在灰纱下仍可辨,visual-judge 复审 pass)。
- CDP 截图取 `r.result.data`(send 封装返回整信封);localStorage 残留主题按 G31 优先级压过 prefers-color-scheme——换主题测量须清存储+reload,emulation 偏好只对无存储状态生效。
- 本会话(round35)起本机无 IAB,浏览器核对改走**无头 Chrome + CDP 直连**(dev/round35-browser.mjs,自建最小 CDP 客户端:Emulation.setDeviceMetricsOverride 定档、Page.navigate+loadEventFired 等待、Runtime.evaluate 断言、Page.captureScreenshot 纯视口截图)。两个必踩的坑写在这里:①CDP 的 WebSocket 会保持 Node 事件循环存活,脚本跑完必须显式 `process.exit()`,否则命令永不返回(表现为「无输出假死」);②PowerShell 里 `npm` 是 npm.ps1,被执行策略拦(UnauthorizedAccess),须用 `npm.cmd`;`npm.cmd` 把 vite 的告警写 stderr,PowerShell 会把它当 NativeCommandError 记 exit 1——**退出码 1 不等于构建失败**,以 `✓ built` 与产物行为准。

## 九、读音与异文两层(G35 落地)

### 9.1 分层原则(与六层分隔同源)

- **读音层**(难字音表 /readings):只承载「读音」与「读音的依据」,不复制任何原文;原文由 chapterTexts/locations/distances 单一来源提供。
- **异文层**(异文校勘 /variants):只承载「两源用字/文句互异」的四栏并录与疑点登记;站内引文自带的异文标注运行时不抄第二份,从 `LOCATIONS[].citations[].variantText` 派生。
- 两页均为**新增呈现层**,不动 src/data 既有文件;入口放 About 页内与页脚,不加主导航(与凡例页同规)。

### 9.2 读音依据三分(不可互相冒充)

| 类 | 记号 | 判据 | 处置 |
|---|---|---|---|
| 郭注有音 | 郭注有音 | 底本 B 存档有直音或反切 | 音注逐字照录(繁体原样)+存档行号;**反切不折合今音**(折合是本站推断) |
| 郭注有释无音 | 郭注有释无音 | 该处注文是训释或声音比拟(如「蚖也」「未詳」「其音如斫木」) | 读音留白;注文只作依据行显示,不当注音用 |
| 底本无音注 | 底本无音注·留白 | 全存档该字无音注,或该篇不在存档范围 | 读音留白;依据行写明「出现 N 处均无注音」的计数证据 |

- 本站标注读音只取自既有两层(ruby 注音层 `GLOSSARY`、山名通读层 `MOUNTAIN_READINGS`,G35 起后者由 AtlasPage 抽出为 `data/siteReadings.ts` 单一来源),音表不另抄第三份值;`siteReadingOf()` 运行时代为读取,任一层改动音表随之变化。
- 郭注音注与本站标注**字面不同时两存照录、不裁决**(禺/亶/杻/雘 四例,登记为疑 12)。

### 9.3 异文并录的照录契约(可程序化验收)

- 差异项每栏拆为 `quote`(逐字照录片段)+ `note`(本站编辑说明):`quote` 以 `data-quote`/`data-quote-archive` 输出到 DOM,验收脚本从**渲染结果**回查对应存档,要求 100% 命中——不是核数据文件,是核页面真的印对了。无照录句可言(本站综述、合计、两源一致之判断)时留空 `quote`,不伪造引文。
- 底本 B 的异文若只见于原始 wikitext 模板(如差 4 的 `{{另|堂|常}}`),照录**模板原文**并注明页面渲染形(「堂一作常」);B1 阅读页无此注记,不得写成 B1 所有。

### 9.4 G32 既有豁免在参考页的适用

- 小签族(`.tag`/`.caseNo`/`.doubtId`)统一取**宣纸小签配方**(不透明 `--surface-paper` 底 + `--paper-ink`/`--cinnabar` 字),故在深浅两种页面底上都成立;这是本轮修掉的一类真缺陷——最初用 `--paper-muted`(宣纸面弱化字)直接放在深底上,等于跨表面混用,实测 2.29:1。
- 站名印章 `.brandSeal`(朱砂印记)沿用 G32 已定性豁免;验收脚本按类名排除并单独计数,不静默放过。
- 触控目标按档位断言:**390 触控档全部控件 ≥44px**;**1440 指针档 ≥24px(WCAG 2.5.8 AA)**——页脚链接的 44px 规则是 R17 既有的 `max-width:768px` 实现,本轮不扩大到桌面档(避免牵动 13 路由页脚版式),该差异在此记录。句内文字链接按 WCAG 2.5.8 内联例外排除并单独计数。

### 9.5 后世流变 claim 契约(G36 落地)

- **结构**:`LaterReception { era, text, claims? }`;`claims[]` 每条 = 本站表述一句 + `sourceTitle`(篇名含卷/篇) + `sourceUrl` + `quote`(所据原文逐字照录,繁体原样) + `archive`(项目内存档) + `note`。渲染三级:**本站表述 → 引文(楷体,独立成行)→ 所出(篇名 + 公开对照链接 + 存档行)**,与 G22 的三级层级同构。
- **准入**:①凡写入 `claims` 的表述必须有可核来源;②取不到来源的说法**一律不写进 claims**,只在 `text` 内明确写「本轮尚未取得可核来源,留白待补,不写为事实」——**留白要写在页面上,不是只写在日志里**;③后世典籍层与《山海经》原文层、郭璞注层严格分开,永不混排。
- **照录**:后世典籍引文同样逐字照录,含**源页面自身的标点体例**(《吳越春秋》页外层引语作 `“ ”`,《呂氏春秋》页作 `「 」`)——**不统一、不互相移植**;底本转录可疑处(如「乃辭雲」之「雲」)照录并在存档「转录备忘」登记。
- **省略**:跨行摘引以 `……` 标示,验收脚本按 `……` 分段后**逐段**回查存档(省略号两侧各自逐字),不允许用省略号掩盖不连续的文字。
- **双向复核**:`dev/round36-verify.mjs` 既回查项目存档,也重抓 `sourceUrl` 做在线复核;两处都命中才算过。本轮即由在线复核抓出「归档文本被工具层把 `“ ”` 归一成 `「 」`」的不一致。

### 9.6 测量方法修正与取档备忘(G36 记,影响既有轮次结论)

- **对比度合成的顺序错误(重要)**:G35 的探针在逐层合成背景色时写成 `acc*(1-p.a) + p*p.a`,把半透明层与底层的顺序写反——**宣纸内衬**(`--paper-veil` 等半透明浅底)因此被算成深底,产生一批 2.29:1 的**假失败**;反过来也可能掩盖真失败。正确写法是自最底层向上叠加 `v*a + base*(1-a)`。修正后:①G36 灯下对比度由「一片失败」转为 0 失败;②**G35 的两个页面用修正后探针复跑仍 30/30 通过**(结论不变,方法补齐)。后续一切对比度测量一律用修正后写法。
- **SVG 图元不计页面横溢**:`el.ownerSVGElement` 非空的图元(ellipse/path/g…)其几何包围盒可超出 `svg` 视口却不产生页面滚动;横溢断言以 `documentElement.scrollWidth ≤ clientWidth` 为准,并排除 SVG 内部图元。
- **页内 `<header>` 干扰导航断言**:词条页插画区自带 `<header>`,用 `document.querySelectorAll('header a')` 会把它算进主导航;导航断言改取**DOM 中第一个 header**(应用顶栏)。
- **取档必须直连原始字符**:经工具层取回的页面文本可能被归一标点(`“ ”`→`「 」`);凡要入 `EDITION_EVIDENCE/` 的文本一律走 `dev/round36-archive.mjs` 式直连抓取,并在输出中打印该段实际出现的引号字符及码位以便肉眼比对。
- **CDP 脚本两个坑**(与 8.5 并列):①`localStorage` 在 `about:blank` 上抛 SecurityError,首帧访问须包 `try`;②断言脚本里凡比较尺寸高度,`getBoundingClientRect().height` 可能是 43.99x,须按 `Math.round` 比较或留余量,否则 44px 规则会假失败。

## 十、微交互令牌与触控底线(G37 审计定稿)

### 10.1 动效令牌阶梯(全站零裸值)

| 档 | 令牌 | 值 | 用途 |
|---|---|---|---|
| 交互 | `--duration-hover` | 200ms | 全站 hover / 状态色变化(78 处) |
| 交互 | `--duration-drawer` | 320ms | 行旅证据抽屉滑入 |
| 交互 | `--duration-reveal` | 720ms | 首屏揭示、长卷站点淡入 |
| 氛围 | `--duration-cue` | 2800ms | 首页下引指示呼吸 |
| 氛围 | `--duration-ambient` / `-slow` | 84s / 118s | 云海漂移(往复) |
| 氛围 | `--duration-twinkle` | 7s | 星辰微闪 |
| 压平 | `--duration-flatten` | 0.01ms | reduced-motion 与主题切换归零(base.css 专用) |

- 缓动只有两个:`--ease-soft`(交互,`cubic-bezier(.25,.1,.25,1)`)、`--ease-ambient`(氛围往复,`ease-in-out`)。
- **纪律**:新增动效必须引用上表令牌;新增令牌必须同时有引用。`dev/round37-audit.mjs` 第 6 节持续报告死令牌——G37 已按此清理 `--duration-map-draw`(1200ms)与 `--duration-transition`(540ms)两个零引用令牌。
- 扫描口径:先剔除 `var(--…)` 再匹配时长与缓动关键字(否则 `var(--ease-soft)` 会被 `ease` 关键字误报);`transition: none` 不计裸值。

### 10.2 触控底线(390 档 ≥44px)

- **口径**:390 触控档**全部交互控件** ≥44px;1440 指针档 ≥24px(WCAG 2.5.8 AA)。段内行内文字链接按 2.5.8 内联例外排除并单独计数。
- **实现手法**:在组件 CSS 末尾追加 `@media (max-width: 768px)` 块,给选择器 `display:inline-flex; align-items:center; min-height:44px`(桌面档版式不动)。
- **SVG 内命中区必须按缩放换算**:舆图 `viewBox="0 0 1000 620"`,390 档以 `min-width:760px` 横滚呈现 → 缩放 0.76,故 44 CSS px 命中高度需 **58 用户单位**(首版按 44 单位画,实测仅 33.4px 不达标)。**CSS px 数值不能直接写进 SVG 坐标。**
- **新增命中区必须做重叠检测**:扩大命中区可能盖住邻近交互节点;G37 的做法是在运行时对「新命中区 × 舆图其余 23 个可交互节点」逐对求相交,零相交才算通过。
- 全量结果存 `TOUCH-TARGET-AUDIT-G37.md` 与 `TOUCH-TARGET-AUDIT-G37.json`:修复前 109 个控件不足(15 类,最小 14px),修复后 14 路由**全部 ≥44px,不足 0**。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 十一、画卷气象线(三阶总纲,G39 开题)

参考站 MiMo Code(mimo.xiaomi.com/coder,小米官网系「新中式水墨文人风」)美术气象经**翻译**融入本站。完整实测规格表(色板/字号阶/构图几何/动效常量/不搬清单)见任务书 `GALLERY_PROMPT3.md` **附录 A**,施工取值以附录 A 为准;本节记翻译结论与纪律。

### 11.1 八条翻译规则(G39 定稿,改动须用户确认)

1. **水墨位图背景 → 公版古画真迹**:只收明清及以前水墨真迹的公版摄影(维基共享 PD/馆方 CC0),逐幅登记 ART_PROVENANCE「古画卷」章;禁 AI 图/现代摄影/无许可图。
2. **打字机 → 誊抄机 Transcriber**:逐字显形+墨点光标;单速走令牌(55—130ms 区间,G43 定稿);打前量整句宽锁死容器防 CLS;光标 aria-hidden;reduced-motion 直出全文。
3. **区块纸色交替 → 纸阶系统**:参考站实为一带一色(五带五色 #efebe3→#f5ede7);本站 --page-alt-1/2/3 三档(双主题六值),相邻区块取相邻档,档差 ≤5% 亮度,每档正文对比度 ≥4.5:1。
4. **大留白 → 呼吸感而非删内容**:只动间距/版心/背景;六层分隔与文献密度永不让步。
5. **古今对撞 → 画卷上浮卡**:画≈半幅贴一侧(object-fit:cover 比例参照),文字列 ≤400px 窄列;**画上禁压任何正文文字层**;本站扫描件无预抠纸底,必须装裱(PaintingMount)或 CSS mask 四周羽化,禁直角硬边。
6. **宋体标题 → 系统宋体栈** 'Songti SC','STSong',SimSun,Georgia,serif:大题 30px/w500/0.02em 字距、引言 22px/w500/行高 1.5 两级进宋体,正文与文献层字体不动;**禁远程字体**(参考站 subset woff2 不可学);SimSun 屏显不达标如实退回。
7. **动效 → 全令牌化**:并入 10.1 令牌阶梯与 base.css 压平体系;不自加参考站没有的动效类型(参考站无视差/无 scroll-reveal 渐显/无发光,全站 keyframes 仅 2 枚)。
8. **鼠标拂拭显影 → 墨痕显影 InkReveal**:画常驻底层+纸色 canvas 面纱;鼠标路径每 12px 盖墨点图章(r 8→≤128×随机 0.45,520ms easeOutCubic,alpha=1-t² 愈合,三重正弦墨渍边,MAX 160,rAF 按需启停,DPR≤2);面纱色走双主题令牌禁硬编码;降级三路=hover:none 画常显/reduced-motion 面纱静态半透不跑 rAF/JS 失败 fail-open。

### 11.2 三阶负面清单增补(在二阶全部之上)

禁古画贴纸化(画卷只以成幅装裱或区块背景存在);SVG 纹样新增落点全阶段 ≤4(晕染滤镜族 ≤3+其他 ≤1,逐处记第三章台账);位图单图 ≤350KB/长边 ≤1600px/新增位图总量 ≤2.5MB(既有 12 幅版画 SVG 7.44 MB 不在此预算);图片一律 lazy+显式宽高防 CLS,alt 用真实题名;不搬参考站的按钮胶囊/终端命令条/4px 带圆角/页脚制式/#fcfaf8 底色。

### 11.3 三阶轮次映射

G39 立项(本节)→ G40 资产(台账章)→ G41 PaintingMount → G42 卷首展卷 → G43 誊抄机 → G44 墨痕显影 → G45 纸阶 → G46 行旅 → G47 谱系 → G48 古卷(轻)→ G49 图鉴 → G50 山川晕染 → G51 参考页(轻)→ G52 宋体实验 → G53 动效收口 → G54 体积对照 → G55 双主题走查 → G56 回归矩阵 → G57 遗留呈报 → G58 终验。性能对照起点=三阶基线(js gzip 176.78 kB/css 20.37 kB/图片 7,800,554 B @18914aa)。


### 11.4 纸阶系统(G45 定稿)

六值令牌(双主题三档,一带一色,相邻区块取相邻档,经折装多页隐喻):

| 档 | 灯下 | 晴窗 | 应用 |
|---|---|---|---|
| --page-alt-1 | #121a16 | #f4ecdf | 首页展陈导览带 / 古卷篇组第 1/4 组 / 探索·随机翻卷 |
| --page-alt-2 | #17231f(=--ink-deep 值,独立令牌) | #f1e7d6 | 首页(预留) / 篇组第 2/5 组 / 探索·每日一卷 |
| --page-alt-3 | #1c2b24 | #eee2cc | (预留) / 篇组第 3 组 / 探索·山海行旅 |

对比度实测(dev/round45-paperbands.mjs,页面真实 computed 值):

| 主题 | 正文色 | 对一档 | 对二档 | 对三档 |
|---|---|---|---|---|
| 灯下 | rgb(217,214,201) | 12.16:1 | 11.12:1 | 10.15:1 |
| 晴窗 | rgb(51,56,44) | 10.28:1 | 9.84:1 | 9.40:1 |

- 晴窗三档相对亮度 0.845/0.802/0.769,档差 4—5%(任务书 ≤5% 约束);灯下三档为最小可辨深墨阶。
- 圆角沿用 --radius-card(不采纳参考站 4px);篇组带纸阶时补 padding 26px 28px+--paper-border 边线。
- 文献页(原文/音表/异文等)无多带结构,纸阶暂无落点=设计内(六层密度不让步);后续画卷页(G46+)按相邻档取阶。
- 14 路由双主题零横溢/控制台零异常(round45-results.json)。
