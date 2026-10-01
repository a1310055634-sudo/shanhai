import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import { ENTITIES } from '../data/entities'
import { CHAPTERS } from '../data/chapters'
import Rule from '../components/common/Rule'
import styles from './AboutPage.module.css'

const verifiedCount = ENTITIES.filter((entity) => entity.recordStatus === 'verified').length
const readableChapters = CHAPTERS.filter((chapter) => chapter.contentStatus !== 'pending').length

/** 资料来源与制作说明:把首页承诺落成可核对的公开凡例。 */
export default function AboutPage() {
  return (
    <div className={styles.page}>
      <SectionHeading
        index="凡例"
        title="资料来源与制作说明"
        subtitle="ZI LIAO LAI YUAN · EDITORIAL NOTES"
        note="这里说明本站如何录入、核验和呈现《山海经》材料。编辑说明与古籍原文严格分栏。"
        level={1}
      />

      <div className={styles.grid}>
        <section className={styles.panel} aria-labelledby="source-edition">
          <p className={styles.panelIndex}>一</p>
          <h2 id="source-edition" className={styles.panelTitle}>原文底本</h2>
          <p>
            篇目与次序采用通行本十八篇体系:山经五篇、海外经四篇、海内经四篇、大荒经四篇,以及末篇《海内经》。
            原文以郭璞注—郝懿行笺疏系统的通行本为底本,逐段与
            <a className={styles.inlineLink} href="https://ctext.org/shan-hai-jing" target="_blank" rel="noreferrer">
              中国哲学书电子化计划公开文本
            </a>
            对照。
          </p>
          <p className={styles.muted}>
            标点为本站整理,底本用字原则上照录。存在异体、异文或读法分歧时,保留原字并在对应条目中注明。
          </p>
        </section>

        <section className={styles.panel} aria-labelledby="verification">
          <p className={styles.panelIndex}>二</p>
          <h2 id="verification" className={styles.panelTitle}>核验流程</h2>
          <ol className={styles.steps}>
            <li>先定位篇章与段落,不凭常识补写。</li>
            <li>逐字对照公开底本,记录篇名、位置、版本和核验日期。</li>
            <li>把原文、本站释义、编辑说明和后世流变分开呈现。</li>
            <li>无法确定的内容标为「待考证」「存在异文」或「原文未载」。</li>
          </ol>
        </section>

        <section className={styles.panel} aria-labelledby="presentation">
          <p className={styles.panelIndex}>三</p>
          <h2 id="presentation" className={styles.panelTitle}>页面呈现规则</h2>
          <ul className={styles.list}>
            <li><strong>原文证据</strong>只展示对应引用,不拼接不同段落。</li>
            <li><strong>本站释义</strong>是现代汉语编辑文字,不代表学术定论。</li>
            <li><strong>分类与地图</strong>是本站阅读索引,不是《山海经》原有分类或现实地图。</li>
            <li><strong>插画</strong>:十二条目主体为清《古今图书集成》木刻版画(公有领域,维基共享资源),逐幅标注出处;其余为依据原文描述的原创 SVG 艺术演绎。</li>
          </ul>
        </section>

        <section className={styles.panel} aria-labelledby="copyright">
          <p className={styles.panelIndex}>四</p>
          <h2 id="copyright" className={styles.panelTitle}>插画与字体</h2>
          <p>
            十二条目主体插画为清《古今图书集成》(1726 年成书)木刻版画,属公有领域,取自维基共享资源并逐幅标注出处;无版画可依处为项目原创 SVG 演绎。不热链外部图片。
          </p>
          <p className={styles.muted}>
            当前使用系统字体栈。若后续引入 Web 字体,只考虑 SIL OFL 授权字体并自托管子集。
          </p>
        </section>
      </div>

      <section className={styles.status} aria-labelledby="current-status">
        <div>
          <p className={styles.panelIndex}>当前</p>
          <h2 id="current-status" className={styles.panelTitle}>编纂状态</h2>
        </div>
        <div className={styles.statusStats}>
          <span><strong>{verifiedCount}</strong> 条目已逐字核验</span>
          <span><strong>{readableChapters}</strong> 篇进入阅读器</span>
          <Link className={styles.statusLink} to="/catalog">查看图鉴 →</Link>
          <Link className={styles.statusLink} to="/chapters">查看古卷 →</Link>
        </div>
      </section>

      <p className={styles.sourceNote}>
        详细核验清单见项目内 CONTENT_SOURCES.md;页面中每条原文证据也附有公开对照链接与核验备注。
        分层呈现的完整凡例另见
        <Link className={styles.inlineLink} to="/how-to-read">
          如何读本站
        </Link>
        。
      </p>

      {/* G07 凡例页收束线(接入点 8):方胜端头 */}
      <Rule kind="fangsheng" className={styles.pageEnd} />
    </div>
  )
}
