---

## G24 · 郭璞注层(可展开,注文逐字照录底本)

- **有效执行编号**:二阶 4 / 18
- **北京时间**:2026-10-02 约 10:47—11:08(定时触发)
- **开始 HEAD**:`6d77742`(G23),工作树干净,无遗留锁
- **本轮预期**:CitationBlock 增「郭璞注」可展开层(默认收起),注文逐字对照维基文库郭璞注本,核一条上一条,未核条目不显示;收尾 git diff 证明原文区零改动

### 底本与核验(先核后上)

- 一阶两份存档(ctext 中英对照/维基文库纯文本)**均不含注文**;本轮新拉维基文库《山海經/南山經》郭璞注本原始 wikitext(curl action=raw,`{{*|…}}` 夹注标记,Textquality 75% 四库本)存档 `EDITION_EVIDENCE/wikisource-nanshan1-guopu-20261002.txt`(13 299 B)。WebFetch 摘录仅作定位,逐字依据一律以 raw wikitext 为准
- 上线 6 条引文共 **11 条注文**(招摇段 2/杻阳段 2/青丘段 2/丹穴段 1/开篇 2/青丘山句 2),全部从存档逐字复制,**保持繁体原样不转简**(繁简一对多转换会破坏逐字性);每条 verificationNote 追加「2026-10-02 郭璞注层上线」核验记录(存档路径+照录声明+疑点)
- 正文一致性比对:6 条 originalText 与郭注本正文繁简对应一致;九尾狐条「能食人,食者不蛊」与底本B「能食人;食者不蠱」仅标点小异(字全同),如实注记不改
- **疑点照录清单**(底本原样,不裁决):①青丘注「**敢**其肉」疑为「啖」之形讹(已上线照录);②招摇段「禺字音遇**,**」句末逗号为底本残留(已上线照录);③「作牛字圖,亦**做**牛形」作/做混用(已上线照录);④「**璨**曰:韭音九」「璨曰:榖亦名構」疑为「璞曰」形讹(**未采**这两条注,存档疑点供后续轮);⑤杻阳段「虺,尾**銃**」疑为「銳」(未采);⑥凤凰注「**鷰**頷」为「燕」异体(已上线照录)

### 实际改动(7 文件 + 1 存档 + 2 截图)

1. `src/data/types.ts`:新增 `GuoPuNote` 接口(attach?/text,头注声明逐字照录纪律)+ `Citation.guoPuNotes?`(仅逐字核验一致后可填,未核不填)
2. `src/data/entities/{xingxing,lushu,jiuweihu,fenghuang}.ts` + `src/data/locations.ts`(loc-zhaoyao/loc-qingqiu):6 条引文加 guoPuNotes + verificationNote 追加
3. `src/components/CitationBlock.tsx`:blockquote 后增 `<details>` 注层——summary=「郭璞注」楷体签+条数提示+静态箭头(CSS rotate 切换,无 transition),列表项=attach 楷体小签+注文宋体,地脚=照录声明+维基文库对照链接
4. `CitationBlock.module.css`:+91 行;summary min-height 44px 触控、宣纸内衬墨青界栏、无动画(reduced-motion 合规)
5. 柢山**:未动**(locations 无柢山条目,「柢/祗」异文留白红线;G23 长卷雾占位不涉本轮)

### 构建与浏览器核对(IAB,断言用完整类名 `_guopu_1c21n_111`)

- build 绿 1.43s;gzip:JS 149.51(**+1.57** vs G23 147.94)、CSS 16.83(+0.27)——增量=6 条注文繁体文本+组件与样式,如实记录(本轮无 <1KB 约束)
- **断言全绿**:①默认收起(open 属性 absent)×6 页;②点击展开,11 条注文逐字片段命中(含「禺似獼猴…禺字音遇,」「即九尾狐」「敢其肉」「漢時鳳鳥數出…雌曰凰,雄曰鳳」「在蜀,伏山山南之西頭」「雘,黝屬,音瓠」等);③summary 高 56px≥44、tagName=SUMMARY、`focus()`+activeElement 断言可达(IAB 键盘注入不落焦点已知限制,程序 focus 替代+留人工复核);④对照链接 href 正确且不在 aria-hidden 内(G22 教训复用);⑤luwu(未核条目)details=0=未核不显示;⑥atlas 页招摇/青丘两卡注层各自独立;⑦390 展开态 scrollWidth 375≤390 零横溢;⑧1440 桌面档展开零横溢(1425),引文块限宽 539px
- 截图 2 张入 `GALLERY_BASELINES/`:g24-xingxing-closed-390 / g24-xingxing-open-390(展开态目检:楷体签/attach 小签/繁体注文/出处行层次分明)

### 内容核对(硬红线)

- `git diff -- src/data`:**originalText 赋值行变更 = 0**;删除行 6 条全部为 verificationNote 旧值(替换追加);新增行 84 条全部为 guoPuNotes 块/类型注释/verificationNote 新值。原文区零改动证明成立
- 注层出处固定标「中文维基文库《山海經·南山經》郭璞注本(四庫全書底本)」+链接;六层分隔:注层位于原文块内、出处元信息前,与本站释义(页面其他区域)无混排

### 状态:**done**

- 验收对照:git diff 原文区零改动 ✅、抽 3 条注文逐字比对记录 ✅(11 条全录,狌狌注 2=存档 L12/青丘注=存档 L26/凤凰注=存档 L76)、aria 可达 ✅(原生 details/summary+focus 断言)
- **下轮入口:G25 意象复核+二经预研**——九站「原文依据→画面元素」对照表入 GALLERY_DESIGN.md;建南次二经核验工作稿(柜山/长右/尧光等 3—5 山,底本可复用本轮 wikisource raw 存档 L34—L68 南次二经段),标注「未核不上线」;工作稿不入正式数据

---

## G23 · 长卷回访(warmth 压饱和/jagged 参数化/768 第5格修复)

- **有效执行编号**:二阶 3 / 18
- **北京时间**:2026-10-02 约 10:22—10:55(定时触发)
- **开始 HEAD**:`ec370bf`(G22),工作树干净,无遗留锁
- **本轮预期**:journalSceneSpec warmth 曲线压饱和;SceneLayers jagged 峰形参数化(高差/密度),猨翼(order 3)更险+mistDensity 0.3→0.2,柢山雾感保持;行旅页 768 档进度轨第 5 格折三行修复(一阶 G01 缺口 #2)

### 实际改动(4 文件)

1. `journalSceneSpec.ts`:warmth 曲线整体 ×0.7(0/0.15/0.3/0.5/0.4/0.55/0.7/0.85/0.6 → 0/0.105/0.21/0.35/0.28/0.385/0.49/0.595/0.42,冷调锚点与次序不变);新增 `jaggedAmp/jaggedSteps` 可选系数;猨翼(3)amp 1.3+steps 1.2+mist 0.3→0.2;柢山(5)雾占位 mist 0.9 保持
2. `SceneLayers.tsx`:硬编码 jagged 路径改 `jaggedSet(amp,steps)` 生成器——三层山脊(基准 66/44/42px 高差、20/15/15 峰位)+确定性三角函数散列(同参数路径恒定),金线取前景奇位峰谷段;默认值(1,1)峰域与旧路径同族(远山峰 minY 110—140)
3. `JournalProgress.tsx`:缺口位 li 增 `railStopGapLi` 类(原 gap 类只在内层 span,li 拿不到弹性)
4. `JournalProgress.module.css`:641—960 档 `.railStopGapLi{flex:1.7 1 0}`+`.railDualChar` 字距 0.14→0.06em

### 构建与浏览器核对

- build 绿 1.50s;gzip:JS 147.94(**+0.15** vs G22 147.79,<1KB 达标)、CSS 16.56(+0.04)
- **改前基线**:768 档第 5 格字块高 35px=折两行(格 72px 容不下「祗山/柢山」六字);站 3/站 8 场景色 rgb(61,93,94)/rgb(82,110,101) 与旧表计算吻合
- **改后断言(8 站逐站)**:远山/中景色值全部精确命中 ×0.7 新表(32/32,如站 8 (82,110,101)→(72,102,98));雾带数与 mist 阈值计算一致;猨翼远山峰 minY 93<基山 112、峰位 26>22(更险且更密),雾带输出与改前一致(=0,如实记录:0.3→0.2 在两档阈值下均不生成雾带,语义为数据层收紧);8 站(色+轮廓)组合两两不同=逐站可辨;390 八站零横溢;768 第 5 格字块 35→**18px 单行**、缺口格 72→108px(flex 1.7 生效)、站格 68px≥44 触控、零横溢
- **懒加载**:BeastArtwork `loading="lazy"` 未触碰;有版画站(st1/st4/st8)lazy 图实测在 DOM;st2/3/6/7/9 无版画系 `relatedEntityIds: []` 本站无关联异兽,非回归(如实注记)
- 截图 11 张入 `GALLERY_BASELINES/`:改前 st3/st8 + 改后八站 390 + 改后 768 轨道

### 排障记录

- CSS Modules 哈希随文件内容变化(JournalProgress.module.css 编辑后 `_1pvje_`→`_ued4p_`),首轮 768 复测按旧类名查询 `dual:false` 假红——**改 CSS 后必须从新 dist 重新提取完整类名再断言**;另:`getClientRects()` 对 flex 子项恒返回 1(块化),折行检测须用高度读数

### 内容核对

- `git diff --stat -- src/data/` = **空**;场景参数为纯视觉层(journalSceneSpec.ts 头注声明不含内容事实),原文/注文/释义零触碰;无新增疑点

### 状态:**done**

- 验收对照:9 站对照截图 ✅(八站场景+九格轨道,11 张)、逐站可辨 ✅(色+轮廓两两不同断言)、JS gzip 增量 <1KB ✅(+0.15)、懒加载不退化 ✅(lazy 属性保留,无版画站系数据本无)
- **下轮入口:G24 郭璞注层**——CitationBlock 增「郭璞注」可展开层(details/summary 或按钮默认收起),注文逐字对照维基文库郭璞注本,核一条上一条,未核不显示;收尾 git diff 证明原文区零改动

---

## G21 · 古卷页经折细节(二阶首轮,含状态接管)

- **有效执行编号**:二阶 1 / 18
- **北京时间**:2026-10-02 约 18:00(二阶任务首次触发)
- **开始 HEAD**:`89171dc`(一阶 G13 收官),git status 有一枚过期 .round-lock(接管刷新)
- **本轮预期**:首轮特责(STATE 二阶接管+看板追加+二阶基线)+ G21 四子项

### 状态接管(首轮特责)

- STATE 重写:planId `shanhai-gallery-2`、phase 2、18 轮、currentRound G21;retired 字段注明一阶 G14—G20 并入退役;二阶基线 gzip(JS 147.62/CSS 16.35/HTML 442B,HEAD 89171dc)入档,一阶基线保留为 phase1Baseline
- 看板末尾追加「二阶看板(G21—G38)」表

### G21 实际改动(4 文件)

1. `Rule.tsx`+`Rule.module.css`:新增 `RuleFishTail`(版心鱼尾,12×7,上平下尖折面,path 自绘,原创声明入 DESIGN §3.3 台账)
2. `ChapterPage.tsx`:段间插鱼尾(text 段之间才插,gap/段首不插);**gap 段补 `id`+`data-seg-id`**(一阶遗留:gap 段无 id 致 hash 锚点不可达)
3. `ChapterPage.module.css`:.gap 升级「校注」小签(宣纸内衬 55%+双细线 outline -4px,与正文层级拉开);.gap 补 `scroll-margin-top:124px`;.fishTail 尺寸(width/height 必须自带——传 className 覆盖组件默认类,SVG 无尺寸会取 300×150,首拍即现巨大三角形,已修)
4. `ChaptersPage.module.css`:「可阅读」徽标加朱砂方点 5×5(::before,flex+gap),文字不改

### 段距与版心宽复核结论(不改,记录)

- .reader padding 30/36/34、段 gap 26px:与 G05 界栏版心(26/30)同族且行款舒适;DESIGN §4.2 界栏内段距 1.75em≈28px,26px 在容差内——**维持不动**

### 构建与浏览器核对

- build 绿 ×4(迭代修复);gzip 终值:CSS 16.42(+0.07 vs 二阶基线)、JS 147.80(+0.18)、HTML 442B
- **13/13 hash 锚点逐条实测全绿**(scrollIntoView 后 top 全部=124,含 gap-di 与 tongji-note 两个 gap 段;发现并修复两处:gap 无 id、gap 无 scroll-margin)
- 鱼尾断言:count=10(11 text 段间),尺寸 12×7 ✅;校注块断言:bg rgba(233,223,201,0.55)/outline -4px/radius 0 ✅
- 目录徽标断言:statusReadable display:flex+::before 5×5 rgb(167,71,56)+文字「可阅读」未改 ✅
- 390 档:零横向溢出 ✅,截图 `390-chapter-nanshan.png`(覆盖基线);1440 `1440-chapter-g21.png`
- 排障记录:①鱼尾首拍 642×361(className 覆盖默认类致 SVG 无尺寸,补尺寸修复);②gap 锚点首轮 exists:false 为 hash 直链时序读数假象(复测+DOM 直查证 id 存在,与 G05 :target 读数偏差同类)

### 内容核对

- 存疑注文字照录不改(「凡十山二千九百五十里」疑点层级拉开但不裁决);零原文改动;`git diff src/data/` = 空

### 状态:**done**

- 验收对照:锚点逐条 13/13 ✅、390 无横溢 ✅、存疑注不混正文 ✅(校注签分层)、鱼尾入台账 ✅
- **下轮入口:G22 详情页装裱**——版画绫边(6px 绫带+内衬 1px+诗塘 16px)、出处浮层改地脚(修一阶缺口 #4)、流变三级层级

---

## G22 · 详情页装裱(绫边/地脚/流变三级)

- **有效执行编号**:二阶 2 / 18
- **北京时间**:2026-10-02 约 02:00—02:20(定时触发;**时区勘误**:上轮日志「约 18:00」实为 UTC 墙钟误标,真实为北京 10-02 凌晨 02:00 许;本轮起按北京时间=UTC+8 记录)
- **开始 HEAD**:`338e42d`(G21),工作树干净,无遗留锁(上轮轮末已删)
- **本轮预期**:版画绫边(6px 绫带+1px 界栏线+16px 诗塘)、出处浮层改地脚(修一阶 G01 缺口 #4)、流变区三级层级、引文区界栏同族核对

### 实际改动(3 文件 + 基线截图 11 张)

1. `EntityDetailPage.tsx`:首屏版画改 `figure` 语义——面板+`figcaption` 地脚出处(修 G01 缺口 #4:原灰底浮条贴图边文字挤压;**顺带修复 a11y 缺口:原出处链接位于 `aria-hidden` 面板内,对读屏不可达**);后世流变区改三级层级——删帧首 tag(「与原始记载相区分」声明逐字保留于 era 字段,随出处行继续展示),era 由「伪标题」改为地脚出处行(标题=SectionHeading/正文=text/出处=era),数据零改动
2. `EntityDetailPage.module.css`:artPanel 绫边化(6px 岩青绫带 `rgba(49,84,90,.6)` + 内衬 1px 旧金界栏线 `outline var(--border-strong) @ -7px` + 方角);artNote 地脚样式(面板下方右对齐,去浮层底);receptionSource/Label 新增(地脚分隔线+「出处」旧金签,与 CitationBlock .meta 同构),receptionTag/receptionEra 样式删除;disputed 收编 G21「校注」小签(宣纸内衬 .55+双细线 outline -4px+方角,文字色转 paper-muted);locationCite 去左粗边收编宣纸引文小签(宣纸内衬 .5+墨字+双细线 -3px)
3. `BeastArtwork.module.css`:classicPaper 诗塘 `padding: 8%`→`16px` 固定值(详情/卡片两档一致,卡片档原 8%≈15—18px 视觉等值)

### 构建与浏览器核对

- build 绿;gzip:CSS 16.52(+0.07 vs 本轮起始实测 16.45)、JS 147.79(持平)、HTML 442B(注:G21 日志记 CSS 16.42,本轮同 HEAD 起始实测 16.45,以构建输出为准)
- **DOM 断言 21/21 @390 + 21/21 @1440 全绿**(断言 JSON 存 D:/zcode/tmp-shanhai-g22/):绫边 6px/色值/-7px/方角、诗塘 16×4、figcaption 在面板外且 top=427>panel.bottom=415、static 无底、不在 aria-hidden 子树、流变正文在上出处在下+1px 分隔线+分层声明保留、disputed/locationCite 小签族、CitationBlock 界栏不动(朱砂 .32 @ -5px)、onError 回退实测(坏 src→约 100ms 回退注册 SVG)、390 零横溢+题字不裁(h1 right=370)+toc 6 锚点 id 齐
- 截图:改版前 5 张(before-390×4 词条 jiuweihu/fenghuang/jingwei/xingxing+before-1440-jiuweihu)、改版后 6 张(after-390×4+after-1440-jiuweihu+after-1440-reception),存 GALLERY_BASELINES/
- 排障:①MSYS 多路径参数只转换末位致 cdp.mjs eval 槽位错读(改显式 D:/ 路径+修正脚本参数映射);②git-bash `date` 本地时区即 UTC,TZ=Asia/Shanghai 无 tzdata 静默回退——北京时间须 UTC+8 手算

### 内容核对

- `git diff --stat -- src/data/` = **空**(原文区零改动);流变 era/text 文字逐字未动,仅渲染位置调整
- 引文区界栏同族核对结论:CitationBlock 原文证据(G05 界栏)未动 ✅;详情页次级引文两处(locationCite/disputed)原为现代卡片语言(左粗边/灰卡圆角),本轮收编小签族;「凡十山二千九百五十里」疑点不在本页,未涉

### 状态:**done**

- 验收对照:抽 4 词条前后对照 ✅、onError 回退实测 ✅、390 不裁题字 ✅
- **下轮入口:G23 长卷回访**——journalSceneSpec warmth 压饱和、SceneLayers jagged 峰形参数化(猨翼 order 3 更险+mistDensity 0.3→0.2)、柢山雾感保持、行旅页 768 档进度轨第 5 格折三行修复(一阶 G01 缺口 #2)

---# 古朴精修冲刺 · 逐轮运行日志

> 只记真实发生的事。每轮追加:轮次与时间、开始 HEAD 与 git status、预期与实际改动、内容核对结果、build 结果、浏览器核对与截图、提交号、状态词、遗留与下轮入口。

---

## G13 · 山川图古化

- **有效执行编号**:13 / 20
- **北京时间**:2026-10-02 约 00:50—01:15(定时触发;用户指示跳过 45 分钟锁窗口提前开工,锁已接管)
- **开始 HEAD**:`d04883e`(G12),工作树干净
- **本轮预期**:ConceptMap 底面宣纸化、水系墨线、节点朱砂点+旧金签、标签拥挤回归验证;修 G01 缺口 #1(1440 档昆仑/槐江标签叠压)

### 实际改动(3 文件)

1. `ConceptMap.tsx` 宣纸化配色翻转:等高线青绿 `#31545A`→墨线 `var(--paper-ink)`(opacity 0.12→0.05 五档);雾层月白→淡墨;分区底纹青绿系→墨系(0.03—0.05)、边线墨色/南山经保持旧金;行旅徽章深底→宣纸签(方角+旧金边+墨字);行旅链接墨字(hover 朱砂);分区题字旧金(15px 题字性质,宣纸上约 3.2:1,非正文,记录在案);**节点改朱砂点**(常态宣纸描边 1px,选中 r8+旧金描边)+**选中旧金签线**(32px 短横);节点名墨字;里距注墨灰+**宣纸晕**(paintOrder stroke 3px 防压线),新增 `labelDx/labelDy` 偏移参数(西南四百里 →(+14,-11) 移至线上方);透明命中区 r13→**r32**(390 档 49px、768 档 44px 触控达标)
2. `ConceptMap.module.css` 宣纸化:mapWrap 深色径向渐变→`var(--surface-paper)` 纯宣纸+旧金边;panel/legend/disclaimer 深底条→宣纸底+墨灰字+墨界线;panelCite 左粗边 2px→1px;hover/焦点色改宣纸系(node hover 标签朱砂、链接 hover 朱砂、`g:focus-visible` 旧金描点补上——原仅 `a:focus-visible`)
3. `locations.ts` 概念坐标:西山经三角区拉开——泰器 (55,30)→(66.5,32)、槐江 (60,26)→(61.5,24.5)、昆仑 (54,23)→(53.5,18.5)。**依据**:原三角边长 56—63px 而标签宽 52—65px,1440 档必然互压;新边长 79—143px;方位惯例不变(昆仑仍在槐江西侧,与本站既有「概念坐标非地理定位」声明一致);`citations` 原文区零触碰

### 构建与浏览器核对(IAB)

- build 绿 1.43s/1.53s;gzip:CSS 16.37→**16.35(-0.02)**、JS 147.55→**147.62(+0.07**,labelDx 逻辑与坐标数据)
- **1440×900 断言**:`mapWrap` 底 rgb(244,236,223)+旧金边 ✅;节点朱砂 rgb(167,71,56)+宣纸描边 ✅;标签墨字 rgb(38,48,43) ✅;SVG 全部 **26 个 text 两两 bbox 零相交**(修复前西山经三角区 3 组互压)✅;**17/17 节点程序化 focus 成功**(select 模式 g[role=button][tabindex=0],IAB 键盘注入不落焦点,真实 Tab 遍历留人工桌面复核,如实记录)
- **选中态**(MouseEvent 派发,React 合成事件生效):面板出齐(名/里距·篇章/原文引文/关联条目陆吾)+ 节点 r8+旧金描边+旧金签线 ✅
- **390×844 断言**:整页 scrollWidth 375 无溢出(容器内横滚 760,R16 保字号方案保持)✅;命中区 49px≥44 ✅;26 text 零重叠 ✅;图例宣纸底+墨灰字 ✅
- 截图 2 张入 `GALLERY_BASELINES/`:`g13-atlas-1440-selected.png`(全图宣纸化+昆仑选中签线)、`g13-atlas-390.png`(横滚中段,字号可辨)

### 内容核对

- `git diff` 仅 `locations.ts` 三行 `mapPosition`(本站概念坐标,艺术演绎层)+ 组件样式/结构;古籍原文、郭璞注、释义层零改动;无新增疑点

### 状态:**done**

- 验收对照:宣纸底 ✅(断言);墨线水系 ✅(等高线五档墨线);节点朱砂点+旧金签 ✅(断言+截图);17 节点可读可聚焦 ✅(focus 17/17);键盘遍历=Tab 序原生可达+Enter/Space 处理器既有,程序化断言通过(真实键盘留人工);**标签零重叠 ✅**(26 text 两两断言,1440/390 双档);G01 缺口 #1 关闭 ✅
- **下轮入口:G14 古卷页**——段距/版心复核、篇末总述与存疑注层级、鱼尾分隔(总纲 §3.3 通过才做)、十八篇目录区分表达、全部 hash 锚点实测

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
