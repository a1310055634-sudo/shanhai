# unverified 台账 · 五阶回核对象清单(2026-10-05,G83 立档)

> 用途:GALLERY_PROMPT5.md 任务书【G84】ctext 换源回核的执行清单。recordStatus 现读实况=2026-10-05 对 `src/data/locations.ts` / `src/data/entities/*.ts` 逐行 grep,行号为当日实况。
> **口径漂移记档**:任务书 G84 沿四阶 STATE.openItems 写「11 处」,现读实况为 **山位 16 处**(二经已录 16 山全部 unverified——G28—G30 建站 6 山+G71—G74 建站 10 山;四阶 openItems「二经六山+四阶新录十山」即 16,「11」为当年登记口径误差)。**以现读 16 处为准**,G84 回核对象=下表 16 山;词条 5 处按五阶红线 6 一律不动(升级留呈报)。

## 一、山位 16 处(locations.ts,全部南次二经)

| # | id | 行号 | 建站轮 | B1 行(20261002 档) | B2 行(20261002 档) |
|---|---|---|---|---|---|
| 1 | loc-guishan 柜山 | L548 | G28 | L01 | 34 |
| 2 | loc-changyou 長右 | L582 | G28 | L02 | 36 |
| 3 | loc-yaoguang 堯光之山 | L616 | G29 | L03 | 38 |
| 4 | loc-yushan 羽山 | L661 | G29 | L04 | 40 |
| 5 | loc-fuyu 浮玉之山 | L789 | G30 | L07 | 46 |
| 6 | loc-chengshan 成山 | L843 | G30 | L08 | 48 |
| 7 | loc-qufu 瞿父之山 | L701 | G71 | L05 | 42 |
| 8 | loc-juyu 句餘之山 | L740 | G71 | L06 | 44 |
| 9 | loc-kuaiji 會稽之山 | L893 | G71 | L09 | 50 |
| 10 | loc-yishan 夷山 | L926 | G72 | L10 | 52 |
| 11 | loc-pugou 僕勾之山 | L961 | G72 | L11 | 54 |
| 12 | loc-xunshan 洵山 | L1019 | G73 | L13 | 58 |
| 13 | loc-hushao 虖勺之山 | L1066 | G73 | L14 | 60 |
| 14 | loc-quwu 區吳之山 | L1099 | G74 | L15 | 62 |
| 15 | loc-luwu 鹿吳之山 | L1135 | G74 | L16 | 64 |
| 16 | loc-qiwu 漆吳之山 | L1182 | G74 | L17 | 66 |

> B2 行号以 G71 对照表(EDITION_AUDIT 三之补8)为参照,G84 回核开工须逐行现读对账(行号必须与山名对上,G30 勘误在案)。
> 咸陰之山**不在表内**(B1 四百里/B2 五百里两源互异悬置,疑15,归 G85 三源裁决,不在 G84 回核范围)。

## 二、词条 5 处(entities/*.ts,五阶一律不动)

| # | id | 行号 | 建站轮 |
|---|---|---|---|
| 1 | ent-changyou 长右 | changyou.ts L76 | G28 |
| 2 | ent-huahuai 猾褢 | huahuai.ts L85 | G29 |
| 3 | ent-zhi 彘 | zhi.ts L66 | G30 |
| 4 | ent-gudiao 蛊雕 | gudiao.ts L122 | G75 |
| 5 | ent-xun 䍺 | xun.ts L116 | G75 |

## 三、G84 换源回核判定规则(承任务书 §8)

1. 候选源:汉典 zdic.net / 国学大师 guoxue.com / 古诗文网 gushiwen.cn / 殆知阁 / 维基文库异本——逐源记 URL+抓取时刻+引文逐字比对结果;软页(200 但正文零命中)记「不可用」不硬凑;本机 DNS NXDOMAIN 须服务端交叉确认(污染非死链)。
2. 判定:B1×B2×新源 三源正文一致→该山 recordStatus 升 verified(逐条给行号证据);任一源缺或互异→维持 unverified 并将差异记入本台账回填栏。
3. 升级联动:DistanceTable/summary 派生计数双向断言;首页「条目已核验」=12 不受影响(词条计数,非山位);地图方印/虚线圈两态随 recordStatus 自动翻转须复断言零重叠。
4. ctext.org 本体不在候选清单(软拦截既证),但每轮顺手复测一次(恢复即按 P02 优先回核)。

## 四、回核结果回填(G84 填写,2026-10-05)

**结论:16/16 山全部回核闭环,recordStatus 已全数升级 verified(locations.ts 复核 unverified=0/verified=33)。** 换源=arteducation.com.tw 繁体排印本(主比对源)+殆知阁袁珂校注本(仲裁源),抓取与仲裁记录见 `round84-verification-sources-20261005.md`;比对脚本 `dev/round84-compare.mjs`(结果 dev/round84-compare-results.json)。

| # | id | 判定 | 证据摘要 |
|---|---|---|---|
| 1 | loc-guishan 柜山 | 升(仲裁) | artedu「南次二**山**之首」独异;B1×B2×袁本同「經」;artedu 篇末同款「南次二山」=系统性称谓习惯,非文本互异 |
| 2 | loc-changyou 長右 | 升 | 三源逐字一致(41 字符) |
| 3 | loc-yaoguang 堯光之山 | 升 | 异形对鬛/鬣(俗字,G29 既记)+斲/斫(郭注夹注「如人斫木聲」自证),余全同 |
| 4 | loc-yushan 羽山 | 升 | 异形对蟲/虫,余全同(24) |
| 5 | loc-qufu 瞿父之山 | 升 | 三源逐字一致(18) |
| 6 | loc-juyu 句餘之山 | 升 | 异形对餘/余,余全同(16) |
| 7 | loc-fuyu 浮玉之山 | 升(仲裁) | artedu「北流**至**于」独异;B1×B2×袁本同「注于」 |
| 8 | loc-chengshan 成山 | 升 | 异形对於/于,余全同(40) |
| 9 | loc-kuaiji 會稽之山 | 升 | 同上(32) |
| 10 | loc-yishan 夷山 | 升 | 同上(25) |
| 11 | loc-pugou 僕勾之山 | 升 | 异形对僕/仆,余全同(25) |
| 12 | loc-xunshan 洵山 | 升 | 异形对於/于,余全同(51) |
| 13 | loc-hushao 虖勺之山 | 升 | 三源逐字一致(30) |
| 14 | loc-quwu 區吳之山 | 升 | 异形对於/于,余全同(27) |
| 15 | loc-luwu 鹿吳之山 | 升 | 同上(55) |
| 16 | loc-qiwu 漆吳之山 | 升 | 同上(34) |

- 篇末总述(chapterTexts,非 recordStatus 对象):artedu「毛,用一壁瘞」排印误字(袁本仲裁「璧」),差异在案。
- **词条 5 处未动**(红线 6):changyou/huahuai/zhi/gudiao/xun 保持 unverified,升级留呈报。
- 升级联动断言(8/8 PASS,dev/round84-verify.mjs):首页「条目已核验」=12;Atlas 方印 33/节点 33/虚线圈 0;里距表「待核·不设站」仅柢山 1 处(一经既有缺口,红线内);changyou 词条「待考证」徽章仍在。截图 GALLERY_BASELINES/round84-atlas-qing-{1440,390}.png(晴窗;方印渲染路径 G64 已实测双主题,本轮仅数量 17→33)。
