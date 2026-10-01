# 古朴精修冲刺 · 逐轮运行日志

> 只记真实发生的事。每轮追加:轮次与时间、开始 HEAD 与 git status、预期与实际改动、内容核对结果、build 结果、浏览器核对与截图、提交号、状态词、遗留与下轮入口。

---

## G12 · 图鉴探索精修

- **有效执行编号**:12 / 20
- **北京时间**:2026-10-02 约 00:15—00:35(定时触发)
- **开始 HEAD**:`d08dafc`(G11),工作树干净;`.round-lock` 不存在,新建接管
- **本轮预期**:EntityCard 装裱与 BeastArtwork 同族、筛选焦点态统一、空态文案落地、hover 时长走令牌;顺路消账 G01 缺口 #3(筛选区 768 档折三行)

### 实际改动(4 文件,纯样式层 + 1 词文案)

1. `EntityCard.module.css`:圆角归零+双线界栏(border `var(--border-normal)` + outline `var(--border-weak)`/-5px,G11 同族);hover 去现代投影、上浮 -3px→-2px 对齐 ExplorePaths;artNote/artCue 深底圆角 chip → **宣纸小签**(`--surface-paper` 底+`--paper-ink` 墨字+`--paper-border` 边,方角,与版画装裱底同族);fav 边框灰绿硬编码→token;trait 左粗边 2px→1px 减重
2. `CatalogFilters.module.css`:筛选区圆角归零+双线;**焦点态统一**——input/select 去 box-shadow 发光环,与 viewBtn/clear 全部统一为 `outline: 2px solid var(--old-gold)`/offset 2px;clear 按钮 36px→**44px 触控**(inline-flex+min-height);viewBtn 补 hover 态(令牌时长);input `width: clamp(170px, 22vw, 260px)` + ≤900px gap 收紧;focus-within 硬编码收编 token
3. `CatalogPage.module.css`:空态容器圆角归零+双线;「无」印灰绿边→**朱砂印**(合全站朱砂小印语言);listStatus/progressNote 旧金硬编码→token
4. `CatalogPage.tsx`:空态「当前**搜索**与筛选」→「当前**检索**与筛选」(G09 术语表漏网一处,本轮落地;其余空态文案已合规)

### 构建与浏览器核对(IAB)

- build 绿 1.35s;gzip:CSS 16.30→**16.37(+0.07)**、JS 147.54→**147.55(+0.01**,同字数文案,hash 变)
- 断言(1280 与 390 双档):card radius=0 + outline 1px/-5px + 边框 token 色 ✅;artNote bg rgb(244,236,223)/墨字 rgb(38,48,43)/方角 ✅;筛选区 radius=0 ✅;fav 44×44;input/select/viewBtn 均 44px;390 scrollWidth 375 无溢出 ✅
- **:focus-visible 实测限制**:IAB 键盘注入不落焦点(Tab 40 次 activeElement 仍 BODY),computed 断言不可得,改 CSSOM 断言:两条统一规则(`._input_/:focus-visible, ._select_` 带 border-color+outline、`._viewBtn_._clear_` outline,均 2px solid var(--old-gold),无 box-shadow)✅;桌面人工复核留用户(与 G08 同类限制,如实记录)
- **筛选全组合 8 组**(URL 导航):无筛选 12/篇章=南山经 4/类型=异兽 4/状态=已核验 12/列表视图 12/检索=九尾 2(九尾狐+陆吾,后者系「虎身而九尾」原文词语命中,检索语义正确)/篇章+类型 3/无结果 0——计数文案与实际渲染逐组一致 ✅
- 空态:标题「未检得相应条目」+ desc 含「当前检索与筛选」✅;「清除筛选」44px ✅
- 768 档:6 字段排 2 行(offsetTop 464×4 + 550×2),**折三行缺口关闭**;scrollWidth 753 无溢出 ✅
- 截图 3 张入 `GALLERY_BASELINES/`:`g12-catalog-grid-768.png`(筛选两行+装裱卡)、`g12-catalog-empty-390.png`(朱砂「无」印+双线空态)、`g12-catalog-grid-1440.png`;目检无回归(全页截图一次超时,改视口截图逐张重拍,即 G01 已知的 IAB 坑)

### 内容核对

- 零古籍内容改动;仅策展措辞层一词(搜索→检索),不涉原文/释义层;无新增疑点

### 状态:**done**

- 验收对照:装裱同族 ✅(radius0/双线/宣纸签断言);筛选焦点态 ✅(CSSOM 论证+IAB 限制如实记录);空态文案落地 ✅;hover 时长走令牌 ✅(本轮新增过渡全部 var(--duration-hover));筛选全组合 ✅(8/8);390 触控 ≥44px ✅(fav/input/select/viewBtn/clear 全量);空态截图 ✅
- **下轮入口:G13 山川图古化**——ConceptMap 宣纸底+墨线水系+朱砂节点,含 G01 缺口 #1(1440 档昆仑之丘/槐江之山标签叠压)

---

## G11 · 首页收口

- **有效执行编号**:11 / 20
- **北京时间**:2026-10-01 约 17:00(定时触发)
- **开始 HEAD**:`d627cee`(G10),工作树干净;锁接管
- **本轮预期**:Hero 渐变压饱和、入口卡片界栏同族、眉标与间距核对、三档截图、链路回归

### 实际改动(5 处 CSS,4 文件)

1. `Hero.module.css`:渐变五档压饱和(0f1714→0e1613、14211c→12201a、1a2a24→172620、**22352c→1f2c26**),降绿艳向沉稳墨调
2. `ExplorePaths.module.css` `.path`:radius 4px→0,灰边框→旧金双线(border 0.32+outline 0.16/-5px,G05 同族);hover 色同步哑金
3. `TodayBeast.module.css` 大卡:同上双线界栏改造
4. `TodayBeast.module.css` `.quote` 引文小卡:**去左粗边 3px 朱砂+圆角归零**,改朱砂双线(对齐 CitationBlock 界栏),padding 微调版心
5. `HomePage.module.css` `.journeyEntry`:**去左粗边 3px 旧金**,改对称双线,90°渐变底收敛(46,62,58→40,54,50)

### 核对不改动(记录理由)

- **眉标统一**:首页 `.eyebrow`(旧金/衬线/13px/0.28em)与 Hero `.kicker`(旧金/衬线/15px/0.34em)已同族(旧金+衬线+宽字距);字距差异属装饰性眉标带(DESIGN 字距带 0.12–0.16 仅约束标题层),不动
- **区间距**:`.flow` gap 走令牌 `--space-section-desktop`(128px),符合版式令牌,不动

### 构建与浏览器核对

- build 绿 1.58s;gzip:CSS 16.29→16.30(+0.01)、JS 147.54(-0.00)
- 1440 断言:hero 新色 rgb(31,44,38) 存在+旧色 rgb(34,53,44) 移除 ✅;path/journeyEntry radius=0+outline 1px/-5px ✅;零溢出 ✅
- 三档截图:`1440-home.png` / `768-home.png`(768×1024 存档) / `390-home.png`(目检:390 渐变沉稳、剪影清晰、题签正常)
- **链路回归**:首页 journeyEntry(href=/journeys/nanci-yi)→ 点击后 URL 含 /journeys/nanci-yi ✅ → 行旅页古卷链接(/chapters/nanshan-jing#seg-ns1-zhaoyao-kai)→ URL 命中+古卷页 h1=「南山经」 ✅

### 内容核对

- 零内容改动

### 状态:**done**

- 验收对照:三档截图 ✅、链路不退化 ✅、渐变压饱和 ✅、入口卡界栏同族 ✅
- **下轮入口:G12 图鉴探索**——EntityCard 装裱与 BeastArtwork 同族、筛选焦点态、hover 时长走令牌(DESIGN §4.3)

---

## G10 · 释义展签抽查(内容核对轮)

- **有效执行编号**:10 / 20
- **北京时间**:2026-10-01 约 16:20(用户手动「继续」触发)
- **开始 HEAD**:`f87ea3c`(G09),工作树干净;锁接管
- **本轮预期**:12 词条+九站展签对照 EDITION_AUDIT/两源存档逐字抽查;完整句原则;六层分隔;现代词混入只查措辞层;git diff 证明原文区零改动

### 程序化逐字比对(python,去标点后 A 源连续子串断言)

- A 源净化:`EDITION_EVIDENCE/ctext-nanci1-20260927.txt` 剔 ASCII 英文对照后 790 字(去标点)
- 提取数据层全部引文字段(originalText + chapterTexts text):**53 条**
- **南次一经范围 22 条 100% 逐字命中**:词条 3(jiuweihu/lushu/xingxing)+ locations 8 站引文(招摇至箕尾)+ chapterTexts 11 段(八站正文/鹿蜀段/篇末总述等)
- **范围外 31 条未命中属预期**:均系西山经/北山经/海外北经/大荒东经篇目(帝江/凤皇/精卫/夔/陆吾/英招/文鳐鱼/烛阴/应龙/丹穴之山等),本轮 A 存档仅覆盖南次一经;核对 CONTENT_SOURCES.md 第 26–36 行,均有 **2026-09-20 逐字核验记录(verified)** 且训释疑点逐条已注——不重复断言,如实记录
- 验收口径修正说明:验收要求「12 词条+九站展签逐条对照」——实际执行=南次一经范围逐字硬断言 + 范围外历史核验记录完备性核对;两源 B(繁体郭璞注本)不参与自动比对(引文用字从 A,繁简差异),其异文已在 EDITION_AUDIT 差 1–5 人工核对并上屏

### 六层分隔与完整句抽查

- jiuweihu 词条结构分层清晰:summary 策展层(「原文载其能食人」明示分层)/ citations 原文层+verificationNote 核验注(B 本异文「食者不蠱一作纂」备考)/ appearanceTraits 释义层(引文+破折号+白话)/ behaviorTraits `[]` 注「原文未载」诚实留白 ✅
- 完整句原则:抽检 22 条南次一经引文均以句号起止、无截断拼接 ✅
- 现代词混入扫描(数据库/系统/用户/点击/在线等 12 词):数据层命中 10 处全部为 `sourceEdition` 元字段(核验来源说明,「据 ctext.org 公开电子文本逐字核对」),非释义混排,合理保留;释义层零混入 ✅

### 疑点清单新增 1 项(不动数据)

- jiuweihu verificationNote 山序列举作「祗山」,与差 1 裁定的内部并显格式「柢(底本A作祗)」不完全一致——注文明示 A 源用字非错误,仅格式宜统一;留后续轮或人工

### 原文区零改动硬断言

- `git diff f87ea3c HEAD -- src/data/` = 空;`git diff 9a1fa9c HEAD -- src/data/` = 空 —— **全冲刺(自 G01 起)古籍数据层零改动** ✅

### 构建与浏览器核对

- 本轮零代码改动(纯核对轮),未跑 build、未走查页面(如实记录);preview 200 已确认

### 内容核对

- 本轮即内容核对轮;新增疑点 1 项入看板,零改动

### 状态:**done**

- 验收对照:git diff 原文区零改动 ✅(硬断言);疑点入清单 ✅;逐字比对程序化完成 ✅
- **下轮入口:G11 首页收口**——Hero 渐变压饱和(墨绿 22352c→1f2c26 方向)、区间距节奏、入口卡片与界栏语言同族(DESIGN §4.3)

---

## G09 · 文案古雅统一

- **有效执行编号**:9 / 20
- **北京时间**:2026-10-01 约 15:40(用户手动「继续」触发)
- **开始 HEAD**:`390df8a`(G08),工作树干净;锁接管
- **本轮预期**:按 DESIGN §5 术语表全量 grep、表内词替换、表外词不动、清单入日志

### 全量清单与裁定(grep「加载中/暂无/搜索/尚未收藏/去图鉴看看/收藏」)

**实改 4 处**:
1. `FavoritesPage.tsx` 空态标题:「尚未收藏任何条目」→「此卷尚未珍藏」
2. `FavoritesPage.tsx` 空态按钮:「去图鉴看看」→「去图鉴寻访」
3. `CatalogFilters.tsx` 输入标签:「搜索」→「检索」(与标题「检索图鉴」统一)
4. `CatalogFilters.tsx` 提示句:「可搜索名称…」→「可检索名称…」(同词形延伸,非表外新词)

**无落点**:DESIGN 表「加载中→展卷中」——全站 grep 无「加载中」字样(仅注释含「加载失败」),该项零改动,如实记录

**裁定不改(保守原则)**:
- 「暂无」系 4 处表外句:JournalScene「暂无已核验异兽条目」/ EntityDetailPage「暂无同地其他条目」/ CatalogPage「图鉴暂无条目」/ RelationsPage「暂无共同篇章…」——DESIGN 表只列了收藏空态的「暂无」,其余宁可少改
- 「清空收藏」:操作词(DESIGN:「清空记录|不动」同族)
- 「收藏」主导航词(Footer 链接)与 EntityCard 收藏钮 aria-label:aria 功能性描述不动
- CatalogPage 空态句「当前搜索与筛选没有匹配…」:表外整句
- 「我的收藏」「收藏与最近阅读」:含主导航词「收藏」,不动
- DESIGN 表「尚未收藏→尚未珍藏 aria 同步」:实测空态无独立 aria-label,仅可见文案

### 构建与浏览器核对

- build 绿 1.65s;gzip:CSS 16.29(零变化)、JS 147.55→147.54(-0.01)
- DOM 断言(新标签页,390):空态标题「此卷尚未珍藏」、按钮「去图鉴寻访」、筛选标签「检索」、提示「可检索名称、异名、拼音、标签与原文词语」——全部生效 ✅;截图 `390-catalog.png`(覆盖基线,「检索图鉴/可检索」上屏)
- 可用性:label htmlFor=catalog-q 关联未动、空态按钮仍为链接 ✅
- **英文夹带扫描(python,中文行内 3+ 连英文字母)**:命中行全为代码注释(JSX 注释、技术词 slug/SPA/SIL OFL/ruby)或 `<strong>`/`<span>` 标签名误报——**用户可见文本英文夹带为零** ✅

### 内容核对

- 零古籍内容改动;替换词均为 UI 层按钮/空态/标签

### 状态:**done**

- 验收对照:grep 新旧对照零残留 ✅、英文夹带为零 ✅、可用性不降 ✅、替换清单入日志 ✅
- **下轮入口:G10 释义展签抽查**——12 词条+九站展签对照 EDITION_AUDIT,收尾 git diff 证明原文区零改动

---

## G08 · 字韵层级

- **有效执行编号**:8 / 20
- **北京时间**:2026-10-01 约 15:00(用户手动「继续」触发)
- **开始 HEAD**:`ef55e08`(G07),工作树干净;锁接管
- **本轮预期**:-–font-title 落地七处,字距 0.12–0.16em,line-break:strict,两态截图,无字体闪烁

### 实际改动(9 处 CSS)

1. `Navigation.module.css` .brandName:font-serif→**font-title**,字距 0.18em→0.16em
2. `Hero.module.css` .title:补 font-title,0.1em→0.12em
3. `SectionHeading.module.css` .title:补 font-title(0.14em 原已达标)
4. `EntityDetailPage.module.css` .name(词条名):补 font-title(0.16em)
5. `ChapterPage.module.css` .title(篇名):补 font-title(0.16em)
6. `ChaptersPage.module.css` .name(篇章名):font-serif→font-title(0.16em)
7. `JourneyPage.module.css` .currentName(山名):font-serif→font-title(0.16em)
8. `CitationBlock.module.css` .text:补 `line-break: strict`
9. `ChapterPage.module.css` .reader:补 `line-break: strict`

### 构建与浏览器核对

- build 绿 1.60s;CSS gzip 16.26→16.29(+0.03);JS 147.57→147.55(-0.02)
- DOM 断言(1440):Hero 主标题/详情页词条名(72px)/古卷篇名/行旅山名(招摇之山)/Navigation 品牌字(span,3.04px=19×0.16em)computed fontFamily 全部以 Kaiti 栈开头 ✅;阅读面 lineBreak=strict ✅
- **排障记录**:首轮断言品牌字仍宋体——排查发现 dist 内有两个 `_brandName_` 规则(Navigation 新规则已生效;另一条是 Footer 的品牌字,DESIGN 落点清单不含 Footer、无需改),系我断言选择器用了 `p` 而 Navigation 品牌字实为 `span`,抓到了 Footer 元素。修正选择器后确认生效
- 390 抽测:行旅页山名楷体声明生效、零溢出(首页/行旅)✅
- **三档标题层级**:82px(首页主标题)/32px(页头)/19px(品牌字)DOM 断言可辨 ✅
- 无字体闪烁:纯系统字体栈、零网络字体,FOUT 不适用(代码层面论证)✅

### 字体可用性铁证(IAB 环境限制,如实记录)

- `document.fonts.check`:KaiTi/Kaiti SC/STKaiti/楷体/Noto Serif SC/SimSun 全部返回 true
- **canvas measureText(72px×7字)**:KaiTi=SimSun=Noto Serif SC=generic=576px 全等 → IAB 渲染环境所有 CJK 字体名解析到同一物理字体,**楷体与宋体在 IAB 内视觉不可辨**
- 两态截图已存档:`1440-home-kaiti.png`(正常)与 `1440-home-fallback-songti.png`(临时覆盖变量模拟),视觉相同即为该限制的证据
- 结论:楷体栈**声明与回退链正确**,在用户真实桌面浏览器(Windows KaiTi 齐备)将呈现楷体;IAB 内无法验收视觉效果——留人工桌面复核,G19 回归时再提示
- 符合红线「不虚报未实测项」

### 内容核对

- 零内容改动;不动任何文本层

### 状态:**done**(验收中「两态截图可辨」一项在 IAB 受限,已如实记录并留人工复核入口,不影响其余验收通过)

- **下轮入口:G09 文案古雅统一**——按 DESIGN §5 术语表 grep 全量清单(加载中/暂无/搜索/收藏),只动按钮/空态/提示/aria,主导航七词与 slug 不动

---

## G07 · 金线收头

- **有效执行编号**:7 / 20
- **北京时间**:2026-10-01 约 13:50
- **开始 HEAD**:`b9111cd`(G06);有一处未提交改动 `GALLERY_BASELINES/1440-journey.png`——G06 轮核对时覆盖拍的行旅站视图(归属:本冲刺自己),本轮一并提交
- **本轮预期**:Rule.tsx 三纹样,8 落点,对照截图≥3,重量低于文字,原创声明入 DESIGN

### 实际改动

1. 新建 `components/common/Rule.tsx` + `Rule.module.css`:
   - 三枚原创纹样(16×16,stroke currentColor 1.4):**云纹**(底横线+双拱如意云勾)、**回纹**(雷纹方螺旋一笔)、**方胜**(两菱相扣)
   - 双 API:整条 `<Rule kind>`(纹样—渐变线—纹样,对称)+ 单端 `<RuleOrnamentIcon kind>`
   - 线 `flex: 1 1 auto` 可收缩(红线),纹样 13px opacity 0.8
2. 5 接入点 8 落点:
   - **SectionHeading**(全站页头):单侧渐变线 → `<Rule kind="meander">` 对称回纹线(旧 .rule CSS 改 .ruleWrap 只留间距)
   - **Footer**:顶部 border-top 移除 → inner 首位 `<Rule kind="cloud">`;修正一次——首拍发现线只占 grid 第一列,补 `grid-column: 1/-1` 横跨全宽
   - **JournalProgress**:railWrap 左上/右上角饰(云纹 10px,opacity 0.45,absolute top 5px,与滚动内容 padding 14px 不相交);railWrap 补 position: relative
   - **JournalClosing**:合卷 actions 后居中收束线(260px)
   - **AboutPage**:凡例页末尾方胜收束线(300px,与页头回纹呼应)
3. DESIGN §3.2 原创声明定稿(形制公有领域+自绘 path+落点表核对一致)

### 构建与浏览器核对

- build 绿 ×2(1.25s/1.26s);gzip:CSS 16.10→16.26(+0.16)、JS 147.13→147.57(+0.44),合计 +0.60KB
- 对照截图 4 张:`1440-about-rule.png`(页头回纹线+凡例卡)、`1440-chapters-rule.png`(页头回纹线近景)、`1440-journey.png`(进度轨角饰,首枚 rect(153,374,10px))、`1440-journey-footer.png`(全宽云纹顶线)
- 视觉重量:13px 纹样+1px 线明显轻于标题文字(目检)✅
- 零溢出:390 首页/about/journey 三页 ✅;1440 about/journey ✅
- 断言:about 页 rule 条 3 + pageEnd 1 + icons 6;journey 页 railEnds 2 + footerRules 1 ✅

### 内容核对

- 零内容改动;纹样纯装饰 aria-hidden

### 状态:**done**

- 验收对照:对照截图 4≥3 ✅;重量低于文字 ✅;原创声明入 DESIGN ✅;≤8 落点 ✅(5 接入点,纹样实例每页≤6)
- **下轮入口:G08 字韵层级**——--font-title 落地(DESIGN §2.1 落点清单:Navigation 品牌字/Hero title/SectionHeading 主标题/详情页 h1/古卷 h1/篇章名/JournalScene 山名),字距 0.12–0.16em,line-break:strict

---

## G06 · 题签竖排

- **有效执行编号**:6 / 20
- **北京时间**:2026-10-01 约 13:10
- **开始 HEAD**:`77fb326`(G05),工作树干净;锁不存在,接管
- **本轮预期**:Hero 与 JournalOpening 书衣式竖排题签(DESIGN §2.3),双档截图,不遮版画,焦点路径不变

### 实际改动

1. `Hero.tsx` + `Hero.module.css`:新增 `.titleSlip`(「山海万象录」竖排题签)——absolute 左上(left clamp(20px,4vw,56px) / top 104px),writing-mode: vertical-rl + text-orientation: upright,宣纸底+楷体(var(--font-title) 19px)+双细线(border+outline -4px,G05 同族)+朱砂小印(24px「山」);aria-hidden 无 tabindex 无链接;**≤900px display:none**(窄屏 .kicker 已承载同等文字,信息零丢失)
2. `JournalOpening.tsx` + `JournalOpening.module.css`:新增题签(「南次一经」+印「旅」),**挂右上(right 24 / top 20)**——首版放左上,1440 实测压住面板 kicker 文字开头(overlapsPanel: true),即改右上;≤640px display:none

### 排障与位置修正记录

- 开卷视图触发:老用户(有进度)直接进站视图,JournalOpening 不渲染——需 `localStorage.clear()+reload` 才见开卷(测试路径,非缺陷)
- 左上→右上:块级盒子检测误报后,以 **Range 级文字真实包围盒**终裁:left 上 kicker(文字左起 ~190)与题签(1216–1256)盒子相交但文字不达;即便如此左上位置在视觉上确压 kicker 首字,改右上后 Range 检测 `textRectOverlaps: []` 零重叠

### 构建与浏览器核对

- build 绿(两轮 1.45s);gzip:CSS 15.77→16.10(+0.33)、JS 147.00→147.13(+0.13),合计 +0.46KB
- 1440 Hero 题签:vertical-rl/upright ✓、rect(56,177,44×230)、不遮 beastBox(矩形交叉检测 false)、focusables=0 ✓
- 1440 开卷题签:右上(1216,182)40×167、Range 级零文字重叠 ✓;截图 `1440-journey-opening.png`
- 390:首页题签 display:none ✓、开卷/行旅页不渲染 ✓;`390-journey.png`
- 焦点路径不变(纯装饰 aria-hidden);reduced-motion:题签零动画 ✓
- 截图:`1440-home.png`(覆盖基线,题签入画)

### 内容核对

- 零内容改动;题签文字「山海万象录」「南次一经」均为站名/篇名,非古籍引文

### 状态:**done**

- 验收对照:1440/390 双档截图 ✅;不遮版画/文字 ✅;焦点路径不变 ✅
- **下轮入口:G07 金线收头**——Rule.tsx 三纹样(云纹/回纹/方胜),8 处落点表(DESIGN §3.2),全站≤8 硬上限

---

## G05 · 界栏版框

- **有效执行编号**:5 / 20
- **北京时间**:2026-10-01 约 12:30
- **开始 HEAD**:`11ef60a`(G04),工作树干净;锁不存在,接管
- **本轮预期**:三处「圆角卡片+左粗边」→ 四周双边界栏,:target 朱砂双线,锚点不退化

### 落点核实

EntityDetailPage 引文区**直接复用 CitationBlock**(citations.map → `<CitationBlock anchor={cite-i} />`),实际改动两文件覆盖三处视觉落点:详情页引文卡、古卷页引文块(经 CitationBlock 的其他引用)、证据抽屉。古卷阅读面的段卡是 ChapterPage 自有样式(非 CitationBlock),不在本轮范围。

### 实际改动

1. `CitationBlock.module.css` `.cite`:去 `border-left: 3px` 与 4px 圆角 → **外线** border 1px rgba(167,71,56,0.32)+ **内线** outline 1px rgba(167,71,56,0.16) offset -5px;radius 0;版心 padding 22/24 → 26px 30px 22px;`.cite:target` → 外线与内线齐变 var(--cinnabar)(朱砂双线)+ 轻投影;transition 扩为三属性
2. `JournalEvidence.module.css` `.drawer`:radius 4px → 2px;**外线** border rgba(165,135,91,0.55)(金)+ **内线** outline rgba(165,135,91,0.25) offset -6px;版心 20/22 → 22px 26px。内线选 outline 方案因抽屉是滚动容器(::before 内线会随内容滚走,outline 贴框不滚)

### 技术要点

双线统一用「border(外)+ outline 负 offset(内)」:不占布局、不受 overflow:hidden 裁剪、滚动容器内不随内容滚动、圆角>0 时自动跟随。

### 构建与浏览器核对

- build 绿 1.41s;CSS gzip 15.72→15.77(+0.05KB);JS 零变化
- 详情页常态零溢出(390)✅
- **`:target` 朱砂双线铁证**:`querySelector('._cite_:target')` 计算样式 borderTop=**rgb(167,71,56)**、outlineColor=**rgb(167,71,56)**(=--cinnabar);锚点 rectTop=124(scroll-margin-top 生效,页头 109px);CSSOM 规则文本核对无缺失
- 排障记录:首轮经 getElementById 读值为常态弱色,系完整加载后样式重算时机的读数偏差;以 :target 匹配元素直读计算样式定案
- 抽屉断言:borderColor rgba(165,135,91,0.55)+outline rgba(165,135,91,0.25)/1px/offset -6px+radius 2px 全过;截图 `390-journey-drawer.png` 双线可见、信息结构未破坏
- **Esc 关闭**:页面内派发 KeyboardEvent('Escape') → 抽屉关闭 ✅(功能无退化);IAB cua.keypress 真实按键未达 document 层(与 R 冲刺「IAB 注入限制」一致),如实记录为测试环境限制
- 前后对照:改前=G01 基线 `390-catalog-xingxing.png`(圆角+左粗边),改后=`390-catalog-xingxing-cite0-target.png`(双线+朱砂高亮)

### 内容核对

- 零内容改动

### 状态:**done**

- 验收对照:三处前后对照 ✅(详情页/抽屉目检+同源复用);390 不溢出 ✅;锚点不退化 ✅(rectTop=124+:target 命中+Esc 关闭)
- **下轮入口:G06 题签竖排**——Hero 与 JournalOpening 书衣式竖排题签(DESIGN §2.3:vertical-rl/双线/朱砂小印/390 降级横排)

---

## G04 · 宣纸材质

- **有效执行编号**:4 / 20
- **北京时间**:2026-10-01 约 11:50
- **开始 HEAD**:`25a4c7e`(G03),工作树干净;锁不存在,接管
- **本轮预期**:新建 PaperTexture(DESIGN §1.1 规格),四处落点,gzip 增量 <2KB,质感可见不抢戏,对比度不降级

### 实际改动

1. 新建 `src/components/common/PaperTexture.tsx`:feTurbulence(fractalNoise/baseFrequency 0.9/octaves 2/seed 7)+ feColorMatrix 压为暖棕噪点(α=0.55);`useId` 生成唯一 filter id(同页多实例安全);aria-hidden + focusable=false
2. 新建 `src/components/common/PaperTexture.module.css`:absolute inset 0 / **z-index -1**(宿主 isolation: isolate 关住)/ opacity 0.05 / multiply / pointer-events none
3. 四落点接入(TSX 插 `<PaperTexture />` + 容器补 `position: relative; isolation: isolate; overflow: hidden`):
   - `CitationBlock.tsx` → `.cite`
   - `ChapterPage.tsx` → `.reader`
   - `BeastArtwork.tsx` → `.classicPaper`(版画装裱底)
   - `TodayBeast.tsx` → `.quote`(首页今日异兽引文卡)

### 落点修订(文档先行)

原定落点 JournalEvidence 抽屉,开工核对发现**抽屉通体墨夜面**(`#16221d` 底 + `--text-on-dark` 文字),不符 DESIGN §1.1 负面清单「纸纹只上宣纸面」。按「先改文档再改码」纪律:DESIGN §1.1 落点表已修订为 TodayBeast `.quote`(宣纸底引文卡,与 CitationBlock 同族),并注明抽屉古朴化走墨夜面语言(细金线)。

### 构建与浏览器核对

- build 绿 1.40s;gzip:JS 146.77→**147.00(+0.23)**、CSS 15.68→**15.72(+0.04)**,合计 **+0.27KB ≪ 2KB 上限** ✅
- DOM 断言(390,古卷阅读面):svg 存在且为首子元素、opacity=0.05、mix-blend=multiply、pointer-events=none、aria-hidden、宿主 isolation=isolate、overflow=hidden —— 全过 ✅;首页 quote 卡:svg 存在、isolate、opacity 0.05 ✅
- 目检截图 2 张(覆盖基线):390 古卷阅读面(细颗粒可辨、文字清晰、「细看有粗看无」)、390 详情页版画(装裱底纸纹,版画展示无破坏)
- 零溢出复查:首页 / 古卷 / 详情页 390 全过 ✅

### 对比度不降级论证

纸纹为 z-index -1 的装饰层,文字之上无叠加;multiply 最坏情形对宣纸底各通道压暗 ≤4/255(0.05×α0.55),paper-ink 对宣纸 10.3:1 → ≥10.0:1,仍远超 4.5 红线;目检文字边缘无噪点干扰。

### 内容核对

- 零内容改动;不动任何文本层

### 状态:**done**

- 验收对照:质感可见不抢戏 ✅(目检);对比度不降级 ✅(论证+目检);gzip 增量 0.27KB<2KB ✅;四落点 ✅(落点表已按实际修订)
- **下轮入口:G05 界栏版框**——CitationBlock/JournalEvidence/EntityDetailPage 三处双边界栏(DESIGN §3.1);注意 JournalEvidence 为墨夜面,界栏线用其现有金色系而非宣纸边框变量

---

## G03 · 令牌第一刀

- **有效执行编号**:3 / 20
- **北京时间**:2026-10-01 约 11:20
- **开始 HEAD**:`ab71d75`(G02),工作树干净;锁不存在(G02 已删),接管
- **本轮预期**:按 DESIGN §1.2/§1.3/§2.1 调 tokens.css,对比度注释重算,build 绿,七主径核对

### 实际改动

1. `src/styles/tokens.css`:
   - `--paper: #e8e0cd → #e9dfc9`、`--paper-bright: #f3eee2 → #f4ecdf`(宣纸暖化,幅度每通道 ≤4)
   - `--paper-muted: #4c554e → #524f43`(随暖度转暖灰+微深)
   - `--old-gold: #b18b56 → #a5875b`(饱和度 39%→29% 哑光化)
   - `--border-strong/normal/weak` 三级 rgba 基色同步新金 rgb(165,135,91)
   - 新增 `--font-title`('Kaiti SC','STKaiti',KaiTi,'楷体'+宋体全栈回退;G08 落地,本轮仅定义)
   - 新增 `--paper-texture: none`(预留,注释写明 G04 走组件层方案、组件不得引用)
   - 文件头注释与各变量注释更新
2. `src/components/home/SourcePromise.module.css`:3 处硬编码 `color: #4c554e` → `var(--paper-muted)`(宣纸卡弱化文字,同语义收编令牌,自动跟随暖化)
3. `src/styles/base.css`:`::selection` 底色 rgba 基色同步新金

### 对比度重算(回写进 tokens 注释,实算值)

| 组合 | 原 | 新 | 线 |
|---|---|---|---|
| paper-ink #26302b / 宣纸 #e9dfc9 | 11.8:1 | **10.3:1** | ≥4.5 ✅ |
| paper-ink / 月白 #f4ecdf | ~11.6 | **11.6:1** | ✅ |
| paper-muted #524f43 / 月白 | 6.7:1 | **7.0:1** | ✅(DESIGN 预期带 ≥7 达成) |
| old-gold #a5875b / 墨夜 | 6.0:1 | **5.6:1** | ✅(眉标/ghost 文字 ≥4.5) |

### 构建与浏览器核对

- build 绿 1.34s;CSS 89.15→89.33KB(gzip 15.63→**15.68**,+0.05KB=两变量);JS 472.43/146.77 零变化
- 变量生效断言(首页 getComputedStyle):paper=#e9dfc9 / paperBright=#f4ecdf / oldGold=#a5875b / paperMuted=#524f43 / fontTitle=Kaiti 栈 / paperTexture=none —— 全部生效 ✅
- 七主径走查(390):home+catalog+catalog/xingxing+atlas+chapters+chapters/nanshan-jing+journey,h1 全对、零横向溢出 ✅
- 目检截图 2 张(已覆盖基线同名文件):390 古卷阅读面(宣纸暖度可辨不脏,拼音/朱砂眉批正常)、1440 长卷(哑金边框收敛无发光,进度轨行为与基线一致)

### 决策记录

- 组件内 60 处 `rgba(177,139,86,x)` 衍生边框色(28 文件)**本轮不批量替换**:色差在低透明度下不可辨,批量替换令 diff 膨胀违背小步提交;G11—G15 逐页顺路收编 var(--border-*),已记看板
- SVG 场景装饰硬编码(星点/金线/月亮,opacity 0.1–0.6)豁免:装饰色与令牌同名不同用,收编无收益

### 内容核对

- 零内容改动;不触碰任何文本层

### 状态:**done**

- 验收对照:build 绿 ✅;七主径无肉眼回归 ✅(变量断言+目检);对比度注释重算达标 ✅(四组合全 ≥4.5)
- **下轮入口:G04 宣纸材质**——新建 components/common/PaperTexture.tsx(DESIGN §1.1 规格),四处落点,gzip 增量 <2KB 验收

---

## G02 · 古朴总纲

- **有效执行编号**:2 / 20
- **北京时间**:2026-10-01 约 10:45
- **开始 HEAD**:`9a1fa9c`(G01),工作树干净
- **锁处置**:`.round-lock` age=437s(G01 遗留完成态锁)。核实 HEAD=G01 提交且树干净 → 判定无并发实例,接管刷新。**流程修订**:提示词未写「轮末删锁」,自本轮起每轮收尾删锁;新规已写入 GALLERY_SPRINT.md 停机规则节(每轮必读处),后续轮遇热锁按该节处置,不空转退出。

### 实际改动

- 新建:`GALLERY_DESIGN.md`(古朴总纲,约 160 行):
  - 材质线:PaperTexture 规格(feTurbulence fractalNoise/0.9/2 octaves/opacity≤0.05/multiply,4 落点写死)、旧金哑光方向(降饱和,边框三级透明度不动)、宣纸暖度幅度(每通道 ≤6,对比度注释回写)
  - 字韵线:三层定义(--font-title 楷体系统栈/标题层落点清单含「ConceptMap 标签不动」豁免)、字距 0.12–0.16em、line-break:strict、直角引号统一(**原文层底本标点优先,引文不改**)、竖排题签规格(vertical-rl/upright/双线/朱砂小印/390 降级横排)
  - 纹样线:界栏双线改法(::before inset 3px,圆角归零,版心 28/32,:target 朱砂双线)、Rule.tsx 三纹样(云纹/回纹/方胜,currentColor,原创声明+形制出处说明)、**8 处落点写死**(SectionHeading×2/Footer×2/JournalProgress×2/JournalClosing×1/AboutPage×1)、鱼尾分隔 1 处条件通过
  - 版式线:装裱形制(绫 6px+内衬 1px+诗塘 16px+地脚,**顺带修 G01 缺口#4 出处浮层挤压**)、版心 780 保持、逐页版式任务表(G11—G15)
  - 术语对照表:7 项改(加载中→展卷中/收藏→珍藏语境限定等)+ 不动清单(操作动词/诚实状态词/导航七词/slug);G09 施工法:先 grep 全量清单,表外词不改
  - 执行纪律:文档即唯一事实源,冲突先改文档;上限硬约束;零空话条款
- 代码改动:无(纯文档轮)

### 构建结果

- `npm run build` 绿(1.47s);gzip 三项与 G01 基线一致(JS 146.77 / CSS 15.63),零漂移

### 浏览器核对

- 纯文档轮,无页面改动,未做页面走查(如实记录);preview 200 可达性已确认

### 内容核对

- 零内容改动。术语表明确「诚实状态词不动」「原文层底本标点优先」,红线前置

### 验收对照

- 后续轮照文档即可施工 ✅(改法到 CSS 属性级、落点到文件名、数量上限写死)
- 无空词 ✅(全文无「高级感/氛围」类表述;文档自带「零空话」纪律条款)

### 状态:**done**

- **下轮入口:G03 令牌第一刀**——按 DESIGN §1.2/§1.3/§2.1 调 tokens.css(宣纸暖度、旧金哑光、--font-title 新增),对比度注释重算回写,七主径浏览器核对

---

## G01 · 施工前基线与古朴审计

- **有效执行编号**:1 / 20
- **北京时间**:2026-10-01 约 10:00(本机时区)
- **开始 HEAD**:`823ba01`,git status 干净
- **锁**:`.round-lock` 不存在,本轮接管(mtime 1790787113)
- **本轮预期**:建四件套;build 记基线;走查 10 路由(390 截图 + 1440/768 DOM 论证);产出两清单;代码零改动

### 实际改动

- 新建:`GALLERY_STATE.json` / `GALLERY_SPRINT.md` / `GALLERY_RUN_LOG.md` / `GALLERY_BASELINES/`(目录)
- 代码改动:无(红线遵守)

### 构建结果

- `npm run build` 绿,1.45s
- 基线三项(gzip):JS 146.77 kB / CSS 15.63 kB / HTML 441 B
- JS 与 R19 终验记录(472.43KB/gzip 146.77)完全一致,无漂移

### 浏览器核对

- preview 4173 重启后 200;IAB 视口经 `setViewportSize` 实设(本轮起支持,不再受固定 390 限制)
- **390×844 十页**:home / catalog / catalog-xingxing / atlas / chapters / chapter-nanshan / journey / favorites / relations / about —— 全部零横向溢出(scrollW=clientW=375,滚动条扣除正常),截图 `390-*.png` ×10
- **1440×900 六页**:home(重拍)/ catalog-xingxing / atlas / chapter-nanshan / journey / about —— 全部零溢出,截图 `1440-*.png` ×6
- **768×1024 四页**:home / journey / chapter-nanshan / catalog —— 全部零溢出,截图 `768-*.png` ×4
- 基线截图合计 **20 张**,存 `GALLERY_BASELINES/`

### 走查发现(已入看板缺口清单)

1. 山川图 1440 档「昆仑之丘/槐江之山」标签叠压(R16 移动端修过,桌面档残留)→ G13
2. 行旅页 768 档第 5 格「柢山/祗山·待核」折三行破格 → G16
3. 图鉴筛选区 768 档折三行偏高 → G12
4. 详情页版画出处浮层文字挤压 → G15
5. 长卷场景横幅大视口静态偏空 → G16

### 时序竞态记录(非站点缺陷)

批量 goto 循环中首张 1440-home 截图实际渲染的是上一页(/chapters)内容;单独重跳后正常(h1=「山海有灵,万物入卷」)。结论:截图前需确保路由完成,后续轮批量走查每页 waitForTimeout ≥1200ms 并抽查 h1 与路由一致性;基线已用重拍版覆盖。

### R19 终验缺口

- ✅ 1440/768 档本轮直接实测关闭(六页+四页零溢出,真实截图为证)
- ⬜ reduced-motion 真实偏好仍无法在 IAB 实测(无 emulateMedia),G19 以代码审查处理并如实标注

### 内容核对

- 本轮零内容改动,不触碰古籍原文;无新增内容疑点

### 提交

- 见 git log(本提交即 G01,仅含 GALLERY_* 四件套与 20 张基线截图,零代码改动)

### 状态:**done**

- 验收对照:四件套就位 ✅;基线截图 20≥10 ✅;两清单入看板 ✅;代码零改动 ✅;build 绿 ✅
- **下轮入口:G02 古朴总纲(GALLERY_DESIGN.md)**——从本看板「古朴缺口清单」四线展开,含术语对照表与字韵三层定义

---
