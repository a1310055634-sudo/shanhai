# G37 微交互与触控目标审计报告(2026-10-02)

> 工具:`dev/round37-audit.mjs`(静态扫描 45 个 CSS 文件)、`dev/round37-browser.mjs`(无头 Chrome + CDP 运行时实测)。
> 原始清单:`TOUCH-TARGET-AUDIT-G37.json`(逐路由 / 逐类)。

## 一、动效裸值 → 令牌(扫描口径:剔除 `var()` 后不得残留时长与缓动关键字)

**收编前 8 处裸值,收编后 0 处。**

| 文件:行 | 原值 | 收编为 | 说明 |
|---|---|---|---|
| `pages/HomePage.module.css`(2 处) | `0.25s ease` | `var(--duration-hover) var(--ease-soft)` | G32 挂账项;250→200ms 收敛到交互档 |
| `components/Hero.module.css` | `2.8s ease-in-out` | `var(--duration-cue) var(--ease-ambient)` | 下引指示呼吸 |
| `components/Hero.module.css` | `84s ease-in-out` | `var(--duration-ambient) var(--ease-ambient)` | 云海漂移(慢) |
| `components/Hero.module.css` | `118s ease-in-out` | `var(--duration-ambient-slow) var(--ease-ambient)` | 云海漂移(更慢) |
| `components/Hero.module.css` | `7s ease-in-out` | `var(--duration-twinkle) var(--ease-ambient)` | 星辰微闪 |
| `components/journal/JournalEvidence.module.css` | `0.32s` | `var(--duration-drawer) var(--ease-soft)` | 证据抽屉 |
| `components/journal/JournalScene.module.css` | `0.7s` | `var(--duration-reveal) var(--ease-soft)` | 收敛到揭示档(700→720ms,+20ms 不可辨) |
| `styles/base.css`(2 处) | `0.01ms` | `var(--duration-flatten)` | reduced-motion 压平档 |

**时长阶梯(定稿)**:交互档 `hover 200ms` / `drawer 320ms` / `reveal 720ms`;氛围组 `cue 2800ms`、`ambient 84s`、`ambient-slow 118s`、`twinkle 7s`;压平档 `flatten 0.01ms`。缓动:`--ease-soft`(交互)/`--ease-ambient = ease-in-out`(氛围往复)。

**死令牌清理**:`--duration-map-draw`(1200ms)与 `--duration-transition`(540ms)全站零引用(已核实仅存在于 tokens.css 定义处),本轮删除;审计脚本第 6 节持续报告死令牌,新增令牌须同时有引用。

**`@keyframes` 对应**:定义 6 个(rise-in / cue-breathe / drift / twinkle / drawerIn / featuredIn),引用全部有定义,无悬挂引用。

**reduced-motion 覆盖面**:`base.css` 对 `*, *::before, *::after` 压平 `animation-duration` / `animation-iteration-count` / `transition-duration`(均 `!important`)+ `scroll-behavior:auto`。运行时以 CDP `Emulation.setEmulatedMedia` 实测:压平后全站动效时长**只剩 `1e-05s` 单一取值**,无遗漏。

## 二、触控目标(390 触控档 ≥44px)

**修复前:14 路由中 9 个路由存在不足,合计 109 个控件、归并 15 类。修复后:14 路由全部 ≥44px,不足 0 个。**

修复手法统一:各组件 CSS 末尾追加 `@media (max-width: 768px)` 块,给对应选择器 `display:inline-flex; align-items:center; min-height:44px`(与 R17 页脚链接同法),**桌面档版式不动**。

| 修复前最小值 | 数量 | 控件(所在文件) |
|---|---|---|
| 14px | 2 | 舆图「进入山海行旅 →」(`atlas/ConceptMap.tsx`,SVG 文本 → 补命中矩形,见下) |
| 23px | 2 | `AtlasPreview .moreLink`、`ChapterIndex .moreLink` |
| 24px | 1 | `Hero .scrollCue`(↓向下开卷) |
| 25.6px | 56 | `RelationsPage .related a`(谱系详表条目链接) |
| 26.8px | 2 | `AboutPage .statusLink` |
| 31px | 18 | `ChapterIndex .name`(卷目篇章名) |
| 33.3px | 2 | `ChaptersPage .nameLink`、`FavoritesPage .historyName` |
| 38px | 1 | `ExplorePage .journeyEnter` |
| 41px | 15 | `RelationsPage .name a`(谱系详表条目名) |
| 41px | 4 | `ExplorePage .stationLink` |
| 43.8px | 4+1+1 | `EntityDetailPage .relatedLink` / `.randomBtn`、`ChapterPage .navLink` |

**SVG 命中区的缩放换算(本轮新记)**:舆图 `viewBox="0 0 1000 620"`,390 档以 `min-width:760px` 横滚呈现,故缩放 = 760/1000 = **0.76**;要得到 44 CSS px 命中高度,矩形需 **44 / 0.76 ≈ 58 用户单位**。首版按 44 单位画,实测只有 33.4px 不达标——**SVG 里的触摸目标必须按实际缩放换算,不能直接用 CSS px 数值**。定稿 `x=548 y=366 w=96 h=58`,运行时实测命中区 **44.08px**,且与舆图另外 23 个可交互节点**零重叠**(程序化相交检测)。

## 三、遗留与说明

- 本轮只按 **390 触控档**判定 ≥44px;1440 指针档沿用 G35 已记口径(≥24px,WCAG 2.5.8 AA),页脚链接 29px 属该档内合格项,是否统一升到 44px 仍未决,留 G38 终验记录。
- 句内文字链接(段落中的行内 `a`)按 WCAG 2.5.8 内联例外排除,并在断言里单独计数,不静默放过。
- 静态扫描不能覆盖「JS 运行时写入的内联样式」;本轮以运行时实测(computed style + 全路由控件遍历)补足,未发现 JS 注入动效。
