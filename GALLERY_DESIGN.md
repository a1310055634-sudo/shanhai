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
| 证据抽屉 | `components/journal/JournalEvidence.tsx`(宣纸面板内) |
| 古卷阅读面 | `pages/ChapterPage.tsx`(宣纸阅读卡内) |
| 版画装裱底 | `components/art/BeastArtwork.tsx`(装裱底色层内) |

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

**原创声明**:三个纹样为本项目原创 SVG(参照传统云纹/回纹/方胜的公共形制自绘 path),无外部素材来源,公有领域形制不受版权约束;记录于本节即视为出处存档。

### 3.3 鱼尾分隔(G14,条件通过)

古卷页(ChapterPage)段落之间加版心鱼尾形小分隔(`」`形 SVG,8×6px,--paper-border 色)。条件:G14 施工时先在 390 档验证不干扰段落锚点跳转,若锚点定位受影响则弃用并记录。**仅此一处**,不算入 3.2 的 8 处上限(它是分隔符不是收头,但同样遵守「视觉重量低于文字」)。

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
