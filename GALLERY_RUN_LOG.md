# 古朴精修冲刺 · 逐轮运行日志

> 只记真实发生的事。每轮追加:轮次与时间、开始 HEAD 与 git status、预期与实际改动、内容核对结果、build 结果、浏览器核对与截图、提交号、状态词、遗留与下轮入口。

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
