# 古朴精修冲刺 · 逐轮运行日志

> 只记真实发生的事。每轮追加:轮次与时间、开始 HEAD 与 git status、预期与实际改动、内容核对结果、build 结果、浏览器核对与截图、提交号、状态词、遗留与下轮入口。

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
