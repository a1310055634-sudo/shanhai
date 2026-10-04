import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import styles from './HowToReadPage.module.css'

/**
 * 凡例页(G27):「如何读本站」。
 * 六层分隔图示/底本说明/核验流程/纹样原创声明台账。
 * 全部表述对齐站内实际实现(CitationBlock/EntityDetailPage/DistanceTable/
 * BeastArtwork/SceneLayers)与 GALLERY_DESIGN.md 三之台账,零臆造;
 * 本页不新增纹样落点(收束线不挂,各类落点上限已定)。
 */

/** 六层:名称为全站统一术语,与任务书六层严格对应;呈现位置均为实查组件。 */
const LAYERS = [
  {
    index: '一',
    name: '古籍原文',
    what: '《山海经》原文按所据底本逐字录入,每段独立呈现、不拼接;标点为本站整理,底本用字原则上照录。',
    where: '各处引文区块(宣纸底、宋体直录,附出处、版本、公开对照链接与核验备注);古卷阅读面按篇呈现原文。',
  },
  {
    index: '二',
    name: '郭璞注',
    what: '古注单独成层,注文按底本原样照录(保持繁体,未转简化字),不与本站释义混写。',
    where: '引文区块内的「郭璞注」可展开层,默认收起;仅当该条引文正文与郭璞注本逐字核对一致才显示,未核条目不显示此层。',
  },
  {
    index: '三',
    name: '版本异文',
    what: '两种来源用字或文句互异时,分别照录、不作取舍;读法分歧如实标注,不改底本、不裁决。',
    where: '引文区块内的「存在异文」标注、词条页争议读法;如首篇里距表中柢(祗)一山,两种电子文本用字不同,站内分别照录。',
  },
  {
    index: '四',
    name: '本站释义',
    what: '现代汉语编辑文字,基于已核验原文提炼,不确定处以限定词标注,不代表学术定论。',
    where: '词条页「本站释义」与「形貌档案」;档案各条注明所据引文,可「回看原文」跳到对应引文区块。',
  },
  {
    index: '五',
    name: '策展文案',
    what: '词条摘要、后世流变、行旅导览语与本页编纂文字,均为本站编辑说明,代表本站立场而非古籍内容。',
    where: '图鉴卡片摘要、词条页「后世流变」、行旅页站点导览、本页与「资料来源与制作说明」页。',
  },
  {
    index: '六',
    name: '艺术演绎',
    what:
      '插画与场景属演绎层:12 兽主体版画为清《古今图书集成》禽虫典/神异典木刻的公有领域转描件;另有 6 幅其它刻本扫描原件(明崇祯本蒋应镐本、清光绪本汪绂本、三才图会等)与转描版并陈,用以呈现同一异兽在不同刻本中的形象差异;其余词条为依据原文描述的原创 SVG。行旅长卷场景为抽象山影(色块、脊线、雾带),不描画具体物象。',
    where:
      '词条页插画区(刻本原件主位 + 站内转描副位并陈,无合规刻本图者挂「待补古图」占位)、图鉴卡片(标注「据原文描述艺术演绎」)、行旅长卷;凡原文有据与纯属演绎的元素分开对待,不把演绎写成原文意象。',
  },
]

const PROCESS_STEPS = [
  '先定位篇章与段落,不凭记忆或常识补写。',
  '逐字对照公开底本;所据文本抓取存档,核对以存档为准,并记录篇名、位置与存档日期。',
  '引文逐条附出处、版本、核验备注、核验日期与公开对照链接;同一实体多处出现分别立条,不拼接。',
  '注层另核:该条引文正文与郭璞注本逐字一致,方才展示注文;未核条目不显示注层。',
  '核不动就留白:分歧标「存在异文」「待考证」,原文未载如实说明;核不动的内容不上线。',
  '读音依据三分(郭注有音/有释无音/无音注留白),分歧例(疑12:禺/亶/杻/雘)经用户终裁「维持本站通行标注,郭注异读两存照录,不改既有 ruby 标」;详见难字音表页「读音裁决」节。',
]

/**
 * 五阶新增例(G100):四源对读口径/全站搜索/代码分割已知限制/互链取证式。
 * 「站内实况」栏所列为已落库数据与已验证结论(2026-10-05 程序化统计与实测)。
 */
const PHASE5_EXAMPLES = [
  {
    name: '四源对读与核验口径(山位可升级,词条恒待考证)',
    what:
      '扩录与回核采用多源对读:维基文库呈现态(B1)×四库本郭注档(B2)×arteducation 繁体排印本×袁珂校注本,逐字一致方录;山位 recordStatus 可凭多源一致升级(五阶 16 山升级),词条 recordStatus 一律保持「待考证」(升级须用户裁决),两口径并行不悖。',
    reality:
      '全站 53 山 recordStatus=verified(含五阶 16 山换源升级+咸陰闭环)、21 词条全「待考证」待用户裁决;unverified 台账=EDITION_EVIDENCE/unverified-ledger(山位 0 悬置)。',
    where: '难字音表「读音裁决」节、古卷各山核验备注、EDITION_EVIDENCE/unverified-ledger 台账。',
  },
  {
    name: '全站检索(Ctrl+K)',
    what:
      '任意页按 Ctrl+K(或页脚「全站检索」)呼出检索浮层:山川/词条/异文/音表四组结果实时过滤,↑↓ 选择、Enter 跳转、Esc 关闭并归还焦点。索引由既有数据源运行时派生,不另存第二份数据。',
    reality:
      '四组索引(53 山/21 词条/25 疑点/全部音表字)运行时现算;分组计数与数据源双向断言过;对比度 12.70;键盘全流程含焦点陷阱与归还(G97 审计)。',
    where: '全站任意页;入口见页脚「站内」栏。',
  },
  {
    name: '按路由分卷加载(file:// 已知限制)',
    what:
      '除卷首外各页按路由分卷加载(懒加载),首卷体积显著下降;代价是直接双击 dist/index.html(file:// 协议)时分卷会受浏览器安全限制,懒加载页停留在加载签——站内以 http 预览形态部署,此为已知限制,不以单文件打包绕过。',
    reality:
      '首卷 JS 219.11→148.88 kB gzip(-32%),30 分卷总 +6.5%(归因呈报);preview 全路由 17/17 可达实测。',
    where: '全站;部署说明见本页「核验流程」与 RUN_LOG。',
  },
  {
    name: '跨词条互链(取证式)',
    what:
      '两个词条在注文或后世文献中被并提、并举成类时,在词条页「相关探索」增设「见X条」互链;互链必须有同段共现的文献实证(广注存档程序化扫描),不按标签相似度自动外推。五阶互链 3→6 对(钦原↔陆吾、西王母↔陆吾、相柳↔应龙)。',
    reality:
      '广注五卷同段共现程序化扫描:卷02 昆仑段陆吾+钦原+西王母三方同行、卷17 相柳+应龙同行;卷01/卷14 命中恰为四阶既有互链(扫描器有效性互证)。',
    where: '词条页「相关探索」区,每组互链下注明依据。',
  },
]

/**
 * 四阶新增例(G81):随站内能力增长,凡例同步补例,逐条对齐实况。
 * 每条「站内实况」为组件/数据实查结论,零臆造;与 GALLERY_DESIGN.md 十二章同步。
 */
const PHASE4_EXAMPLES = [
  {
    name: '刻本原件 × 站内转描(并陈)',
    what:
      '同一异兽在不同刻本传统中的形象并陈:主位为其它刻本的扫描原件(明崇祯本蒋应镐本、清光绪本汪绂本等),副位为站内依《古今图书集成》禽虫典木刻转描的版画,并标「站内转描 · 据古今图书集成」签。',
    reality:
      '已入库刻本原件 6 幅(S1—S6,均公有领域,逐幅核过许可),接线覆盖 5 个词条(九尾狐/鹿蜀/精卫/长右/猾褢,鹿蜀两本并陈);另有蛊雕一幅为《南山经》分册古图、属转描同族,合计 7 幅接线;其余词条一律挂「待补古图」占位签,不凑数。',
    where: '词条页插画区(双图并陈)、资料来源页样张区(九尾狐三联对照)。',
  },
  {
    name: '后世流变逐句可溯(claim)',
    what:
      '「后世流变」层的每一句事实性表述都绑定一条 claim:篇名、公开链接、逐字照录的后世引文、项目内存档路径四件齐备,引文保持繁体原样。取不到来源的说法不写成事实,只在正文里明确标注留白。',
    reality:
      '现共 21 个词条、47 条 claim(G100 程序化统计,2026-10-05;四阶终 31 条后,五阶新增钦原 2·毕方 4·西王母 5·相柳 4,另烛阴/九尾狐等存量词条纵深各有增补);主源为清·吴任臣《山海经广注》四库本卷 01/02/08/14/17 存档,另用《艺文类聚》卷九十九、《礼记·曲礼上》。',
    where: '词条页「后世流变」区,每条 claim 下附照录引文与出处。',
  },
  {
    name: '见X条(跨词条互链)',
    what:
      '两个词条在注文或后世文献中被并提、并举成类时,在词条页「相关探索」增设「见X条」一组互链,并在组下注明依据。此类互链必须有文献实证,不得按标签相似度自动外推。',
    reality:
      '现有 3 对双向互链:狌狌↔长右(《駢雅》「皆禺屬也」)、凤皇↔应龙(吴粲《赤牍》)、精卫↔文鳐鱼(左思《魏都赋》);取证方式为在广注六卷存档中扫「同一注文同时提及两兽」,无实证者不上链。',
    where: '词条页「相关探索」区「见X条」组(1440/390 双档均已验证)。',
  },
  {
    name: '章符与里距缺口(排印与存疑)',
    what:
      '篇首章符取「其一/其二」式汉字序数;里距对照表逐山照录原文,把「本站逐段相加」与「篇末原文」并置,差额与存疑单列,不合并、不为凑合篇末计数而增删原文。',
    reality:
      '南次二经 17 山中本站已录 16 山(咸陰之山因两源里距互异、正文未达逐字一致门槛而不录,登记疑15);相加与篇末「七千二百里」的缺口如实照录待续。',
    where: '古卷阅读面篇首章符、篇末里距对照表(含「存疑照录」栏)。',
  },
]

/** 纹样台账:名称/落点数/位置,与 GALLERY_DESIGN.md 三之(G05/G07/G21)逐项一致。 */
const ORNAMENTS = [
  {
    name: '界栏(双线版框)',
    count: '3 处',
    where: '引文区块、行旅原文证据区、词条页引文区;四周双线,直角无圆角。',
  },
  {
    name: '纸纹(宣纸纹理)',
    count: '4 处',
    where: '引文区块、词条页版画装裱、卷首「今日异兽」、古卷阅读面。',
  },
  {
    name: '端头纹样线(收头)',
    count: '8 处',
    where: '各页页题分隔线两端(回纹);页脚顶线两端(云纹);行旅进度轨首尾(云纹);合卷尾饰(云纹);「资料来源与制作说明」页收束线(方胜)。',
  },
  {
    name: '鱼尾(段间小分隔)',
    count: '1 处',
    where: '古卷阅读面正文段与段之间。',
  },
  {
    name: '晕染滤镜族(水墨噪点)',
    count: '2 处',
    where: '山川概念图(第三阶 1 处)、行旅八站场景与凡例图示共用(第四阶 1 处,下半幅噪点 + 近浓渐变构成水墨质感层,纯加法落地,第三阶场景色彩曲线参数零改动)。',
  },
  {
    name: '界栏双线边框(古地图)',
    count: '1 处',
    where: '山川概念图外框(外粗内细,四阶新增);引文区块的「界栏」为版式处理,已单列于上,不计入本族。',
  },
]

/** 资料来源与制作说明:把首页承诺落成可核对的公开凡例。 */
export default function HowToReadPage() {
  return (
    <div className={styles.page}>
      <SectionHeading
        index="凡例"
        title="如何读本站"
        subtitle="RU HE DU BEN ZHAN · SHAN HAI WAN XIANG LU"
        note="本页说明站内内容的分层规则、所据底本、核验流程与纹样来源;后续新增内容同遵此凡例。"
        level={1}
      />

      <section id="sec-layers" className={styles.section}>
        <SectionHeading
          index="层"
          title="六层分隔"
          subtitle="LIU CENG FEN GE"
          note="古籍原文、郭璞注、版本异文、本站释义、策展文案、艺术演绎六类内容严格分层,不混排。下图逐层说明它是什么、出现在站内何处。"
        />
        <ol className={styles.layers} aria-label="六层分隔图示">
          {LAYERS.map((layer) => (
            <li key={layer.index} className={styles.layer}>
              <p className={styles.layerHead}>
                <span aria-hidden="true" className={styles.layerIndex}>
                  {layer.index}
                </span>
                <strong className={styles.layerName}>{layer.name}</strong>
              </p>
              <p className={styles.layerWhat}>{layer.what}</p>
              <p className={styles.layerWhere}>
                <span className={styles.whereLabel}>站内呈现</span>
                {layer.where}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section id="sec-editions" className={styles.section}>
        <SectionHeading index="底" title="底本说明" subtitle="DI BEN SHUO MING" />
        <div className={styles.editions}>
          <p>
            <strong>原文底本</strong>
            篇目与次序采用通行本十八篇体系;原文以郭璞注—郝懿行笺疏系统通行本为底本,电子文本逐字对照
            <a
              className={styles.inlineLink}
              href="https://ctext.org/shan-hai-jing"
              target="_blank"
              rel="noreferrer"
            >
              中国哲学书电子化计划公开文本
            </a>
            。
          </p>
          <p>
            <strong>注文底本</strong>
            郭璞注逐字对照中文维基文库《山海經》郭璞注本(四庫全書底本);注文照录保持原样,不转简化字。
          </p>
          <p>
            <strong>存档纪律</strong>
            核对所据的公开电子文本抓取后存档于项目内档案,逐字核对以存档文本为准,存档日期随文件记录;两种来源用字互异处分别照录、不作合并。
          </p>
          <p className={styles.muted}>
            标点为本站整理;底本用字原则上照录,存在异体、异文或读法分歧时保留原字并在对应条目中注明。
          </p>
        </div>
      </section>

      <section id="sec-process" className={styles.section}>
        <SectionHeading index="核" title="核验流程" subtitle="HE YAN LIU CHENG" />
        <ol className={styles.process}>
          {PROCESS_STEPS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section id="sec-phase4" className={styles.section}>
        <SectionHeading
          index="例"
          title="四阶新增例"
          subtitle="SI JIE XIN ZENG LI"
          note="以下四例为四阶新增能力与惯例,逐条对齐站内实况;「站内实况」栏所列为已落库数据与已验证结论,不含计划项。"
        />
        <ol className={styles.layers} aria-label="四阶新增例">
          {PHASE4_EXAMPLES.map((item) => (
            <li key={item.name} className={styles.layer}>
              <p className={styles.layerHead}>
                <span aria-hidden="true" className={styles.layerIndex}>
                  ★
                </span>
                <strong className={styles.layerName}>{item.name}</strong>
              </p>
              <p className={styles.layerWhat}>{item.what}</p>
              <p className={styles.layerWhere}>
                <span className={styles.whereLabel}>站内实况</span>
                {item.reality}
              </p>
              <p className={styles.layerWhere}>
                <span className={styles.whereLabel}>出现处</span>
                {item.where}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section id="sec-phase5" className={styles.section}>
        <SectionHeading
          index="例"
          title="五阶新增例"
          subtitle="WU JIE XIN ZENG LI"
          note="以下四例为五阶新增能力与惯例(2026-10-05),逐条对齐站内实况;「站内实况」栏所列为已落库数据与已验证结论,不含计划项。"
        />
        <ol className={styles.layers} aria-label="五阶新增例">
          {PHASE5_EXAMPLES.map((item) => (
            <li key={item.name} className={styles.layer}>
              <p className={styles.layerHead}>
                <span aria-hidden="true" className={styles.layerIndex}>
                  ★
                </span>
                <strong className={styles.layerName}>{item.name}</strong>
              </p>
              <p className={styles.layerWhat}>{item.what}</p>
              <p className={styles.layerWhere}>
                <span className={styles.whereLabel}>站内实况</span>
                {item.reality}
              </p>
              <p className={styles.layerWhere}>
                <span className={styles.whereLabel}>出现处</span>
                {item.where}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section id="sec-ornaments" className={styles.section}>
        <SectionHeading
          index="纹"
          title="纹样原创声明台账"
          subtitle="WEN YANG TAI ZHANG"
          note="全站形制语言逐类登记如下;各类落点数量按台账写死,新增纹样落点须先修订设计文档。"
        />
        <dl className={styles.ledger}>
          {ORNAMENTS.map((item) => (
            <div key={item.name} className={styles.ledgerRow}>
              <dt>
                <strong>{item.name}</strong>
                <span className={styles.ledgerCount}>{item.count}</span>
              </dt>
              <dd>{item.where}</dd>
            </div>
          ))}
        </dl>
        <p className={styles.muted}>
          原创声明:云纹(底横线加双拱如意云勾)、回纹(雷纹方螺旋一笔)、方胜(两菱相扣)与鱼尾四种形制,均为本项目参照传统公共形制自绘的
          SVG 线稿,无外部素材来源;形制属公有领域,本实现不受版权约束。界栏与纸纹为基础版式处理,不属于装饰纹样。
          四阶新增纹样落点预算 ≤4 处(晕染滤镜族第二落点 + 古地图界栏边框),现用 2 处;
          后续新增须先修订 GALLERY_DESIGN.md 十二章台账再落地。
        </p>
      </section>

      <nav className={styles.endLinks} aria-label="相关页面">
        <Link className={styles.endLink} to="/about">
          资料来源与制作说明 →
        </Link>
        <Link className={styles.endLink} to="/chapters/nanshan-jing">
          查看古卷·南山经 →
        </Link>
        <Link className={styles.endLink} to="/catalog">
          查看图鉴 →
        </Link>
      </nav>
    </div>
  )
}
