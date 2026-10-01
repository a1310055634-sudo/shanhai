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
    what: '插画与场景属演绎层:十二条目主体插画为清《古今图书集成》木刻版画(公有领域,逐幅标注出处),其余为依据原文描述的原创 SVG;行旅长卷场景为抽象山影(色块、脊线、雾带),不描画具体物象。',
    where: '词条页与图鉴插画(标注「据原文描述艺术演绎」)、行旅长卷;凡原文有据与纯属演绎的元素分开对待,不把演绎写成原文意象。',
  },
]

const PROCESS_STEPS = [
  '先定位篇章与段落,不凭记忆或常识补写。',
  '逐字对照公开底本;所据文本抓取存档,核对以存档为准,并记录篇名、位置与存档日期。',
  '引文逐条附出处、版本、核验备注、核验日期与公开对照链接;同一实体多处出现分别立条,不拼接。',
  '注层另核:该条引文正文与郭璞注本逐字一致,方才展示注文;未核条目不显示注层。',
  '核不动就留白:分歧标「存在异文」「待考证」,原文未载如实说明;核不动的内容不上线。',
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
