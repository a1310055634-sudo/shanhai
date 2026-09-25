import { Link } from 'react-router-dom'
import { ENTITIES } from '../../data/entities'
import styles from './SourcePromise.module.css'

const verified = ENTITIES.filter((e) => e.recordStatus === 'verified').length

const PROMISES = [
  {
    title: '原文有据',
    body: '古籍原文采用通行本(郭璞注—郝懿行笺疏系统),篇目次序与录入原文均经公开电子文本逐字核对,每段附出处与核验备注;标点为本站整理,不改动用字。',
  },
  {
    title: '释义有别',
    body: '「本站释义」以现代汉语撰写,不复制任何受版权保护的现代译注;无把握之处以「可能」「有观点认为」等限定词标出,与古籍原文明确分离。',
  },
  {
    title: '插画为演绎',
    body: '十二条目主体插图采用清《古今图书集成》禽虫典/神异典木刻版画(公有领域,取自维基共享资源),来源与出处逐幅标注;无版画可依处为据原文描述的原创 SVG 演绎。画面不将任何演绎冒充古籍原图。',
  },
  {
    title: '流变分栏',
    body: '后世典籍、文艺与流行文化中的形象一律放入「后世流变」区块,与《山海经》原始记载明显分隔,不混编、不冒充原文。',
  },
  {
    title: '核验透明',
    body: `当前已逐字核验条目 ${verified} 条;凡未经核验或存在分歧的信息,一律标注「待考证」「存在异文」或「原文未载」,不以常识补齐。`,
  },
]

/** 来源承诺(规范第四节第 7 条):浅宣纸阅读区,与墨色沉浸区形成节奏。 */
export default function SourcePromise() {
  return (
    <section className={styles.section} aria-label="来源承诺">
      <div className={styles.inner}>
        <header className={styles.head}>
          <p className={styles.headIndex}>诺</p>
          <h2 className={styles.headTitle}>来源承诺</h2>
          <p className={styles.headSub}>LAI YUAN CHENG NUO</p>
          <p className={styles.headNote}>
            本站是一部数字异闻志,不是游戏图鉴。以下承诺适用于全站内容。
          </p>
          <div className={styles.headRule} aria-hidden="true" />
        </header>
        <div className={styles.list}>
          {PROMISES.map((p) => (
            <div key={p.title} className={styles.item}>
              <p className={styles.itemTitle}>{p.title}</p>
              <p className={styles.itemBody}>{p.body}</p>
            </div>
          ))}
        </div>
        <p className={styles.about}>
          完整的底本信息与核验清单见
          <Link className={styles.aboutLink} to="/about">
            资料来源与制作说明
          </Link>
          。
        </p>
      </div>
    </section>
  )
}
