import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import { LOCATIONS } from '../data/locations'
import { CHAPTER_TEXTS } from '../data/chapterTexts'
import { DOUBTS, GUOPU_DOUBTS, VARIANT_CASES, VARIANT_COUNTS } from '../data/variants'
import styles from './ReferencePage.module.css'

/**
 * 异文校勘页(G35)。
 *  - 独立差异项(差1—差7):来源 A / 来源 B / 本站现行呈现 / 未决原因 四栏并录,照录不裁决;
 *  - 疑点登记(疑1—疑12 + 郭注层四条):与 GALLERY_SPRINT.md「二阶内容疑点清单」逐条同 id;
 *  - 站内引文异文标注:运行时自 LOCATIONS[].citations[].variantText 派生,不自建第三份。
 */

const NANSHAN_SEGMENTS = CHAPTER_TEXTS['nanshan-jing']?.segments ?? []

/** 该山对应的首个古卷段 id(用于深链;找不到则退回篇首,不伪造锚点)。 */
function segmentIdOf(locationId: string): string | null {
  return NANSHAN_SEGMENTS.find((seg) => seg.relatedLocationIds?.includes(locationId))?.id ?? null
}

/** 站内已上屏的引文异文标注(单一来源派生;不手抄)。 */
const SITE_VARIANTS = LOCATIONS.flatMap((location) =>
  location.citations
    .filter((cite) => Boolean(cite.variantText))
    .map((cite) => ({
      id: `${location.id}-${cite.section}`,
      locationId: location.id,
      name: location.canonicalName,
      subClassic: location.subClassic,
      section: cite.section,
      text: cite.variantText as string,
      url: cite.publicUrl,
      segmentId: segmentIdOf(location.id),
    })),
)

export default function VariantsPage() {
  return (
    <div className={styles.page}>
      <SectionHeading
        index="校"
        title="异文校勘"
        subtitle="YI WEN JIAO KAN · TEXTUAL VARIANTS"
        note="两种具名来源用字互异处逐条并录;本站不裁决孰是孰非,不改底本用字,不替文献补字。"
        level={1}
      />

      <section id="sec-principle" className={styles.section}>
        <SectionHeading index="例" title="校勘口径" subtitle="JIAO KAN KOU JING" />
        <div className={styles.panel}>
          <p>
            <strong>来源 A</strong>
            ctext.org 公开文本(简体),存档
            EDITION_EVIDENCE/ctext-nanci1-20260927.txt,2026-09-27 抓取。
          </p>
          <p>
            <strong>来源 B</strong>
            中文维基文库郭璞注本(四庫全書底本),存档
            EDITION_EVIDENCE/wikisource-nanshan1-guopu-20261002.txt(夹注本,带行号)与
            EDITION_EVIDENCE/wikisource-nanshan1-20260927.txt,2026-10-02 抓取。
          </p>
          <p>
            <strong>处理原则</strong>
            用字互异则双形并显、分别照录;文句互异(如有无「又」字)亦分别照录。
            本站不下判断、不合并、不为凑合篇末计数而增删原文;差额与矛盾照录并注明出处。
            核不动的内容一律留白并登记为疑点,不上线。
          </p>
          <p className={styles.muted}>
            下表「证据」栏的数字均为对存档文本的程序化计数与逐字回查结果(脚本
            dev/round35-verify.mjs,可复跑),非人工目验。
          </p>
        </div>
      </section>

      <section id="sec-cases" className={styles.section}>
        <SectionHeading
          index="差"
          title="独立差异项"
          subtitle="DU LI CHA YI XIANG"
          note={`共 ${VARIANT_COUNTS.cases} 项。四栏并录:来源 A / 来源 B / 本站现行呈现 / 未决原因。`}
        />
        <div className={styles.cases}>
          {VARIANT_CASES.map((item) => (
            <article key={item.id} id={item.id} className={styles.case} data-case={item.no}>
              <p className={styles.caseHead}>
                <span className={styles.caseNo}>{item.no}</span>
                <strong className={styles.caseSubject}>{item.subject}</strong>
                <span className={styles.tag}>{item.state}</span>
              </p>
              <p className={styles.caseWhere}>{item.where}</p>
              <div className={styles.sides}>
                <div className={styles.side}>
                  <p className={styles.sideLabel}>来源 A · ctext</p>
                  {item.sourceA.quote ? (
                    <p
                      className={styles.sideText}
                      data-quote={item.sourceA.quote}
                      data-quote-archive={item.sourceA.archive}
                    >
                      <q className={styles.sideQuote}>{item.sourceA.quote}</q>
                      <span className={styles.sideNote}>{item.sourceA.note}</span>
                    </p>
                  ) : (
                    <p className={styles.sideText} data-quote="">
                      {item.sourceA.note}
                    </p>
                  )}
                </div>
                <div className={styles.side}>
                  <p className={styles.sideLabel}>来源 B · 维基文库郭璞注本</p>
                  {item.sourceB.quote ? (
                    <p
                      className={styles.sideText}
                      data-quote={item.sourceB.quote}
                      data-quote-archive={item.sourceB.archive}
                    >
                      <q className={styles.sideQuote}>{item.sourceB.quote}</q>
                      <span className={styles.sideNote}>{item.sourceB.note}</span>
                    </p>
                  ) : (
                    <p className={styles.sideText} data-quote="">
                      {item.sourceB.note}
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.caseFoot}>
                <p className={styles.footRow}>
                  <span className={styles.footLabel}>本站现行</span>
                  <span className={styles.footValue}>{item.display}</span>
                </p>
                <p className={styles.footRow}>
                  <span className={styles.footLabel}>未决原因</span>
                  <span className={styles.footValue}>{item.reason}</span>
                </p>
                <p className={styles.footRow}>
                  <span className={styles.footLabel}>存档证据</span>
                  <span className={styles.footValue}>{item.evidence}</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="sec-doubts" className={styles.section}>
        <SectionHeading
          index="疑"
          title="疑点登记"
          subtitle="YI DIAN DENG JI"
          note={`共 ${VARIANT_COUNTS.doubts} 条,与看板「二阶内容疑点清单」同编号;另附郭璞注层疑点 ${VARIANT_COUNTS.guopuDoubts} 条。`}
        />
        <dl className={styles.doubts}>
          {DOUBTS.map((item) => (
            <div key={item.id} className={styles.doubt} data-doubt={item.id}>
              <dt className={styles.doubtHead}>
                <span className={styles.doubtId}>{item.id}</span>
                <strong className={styles.doubtTopic}>{item.topic}</strong>
                <span className={styles.tag}>{item.state}</span>
              </dt>
              <dd className={styles.doubtBody}>
                <strong>证据</strong>
                {item.evidence}
              </dd>
              <dd className={styles.doubtBody}>
                <strong>处理</strong>
                {item.handling}
              </dd>
            </div>
          ))}
          {GUOPU_DOUBTS.map((item) => (
            <div key={item.topic} className={styles.doubt} data-doubt="guopu">
              <dt className={styles.doubtHead}>
                <span className={styles.doubtId}>郭注</span>
                <strong className={styles.doubtTopic}>{item.topic}</strong>
              </dt>
              <dd className={styles.doubtBody}>{item.note}</dd>
            </div>
          ))}
        </dl>
        <p className={styles.muted}>
          疑点只登记不消解:底本 A(ctext)2026-10-02 复测仍反爬不可达,本站未绕过限制,
          相关条目按 B1×B2 双源先上线并挂「待回核」,回核结论待底本 A 可达后补录。
          读音分歧另见
          <Link className={styles.inlineLink} to="/readings">
            难字音表
          </Link>
          。
        </p>
      </section>

      <section id="sec-site" className={styles.section}>
        <SectionHeading
          index="站"
          title="站内引文异文标注"
          subtitle="ZHAN NEI YIN WEN BIAO ZHU"
          note={`共 ${SITE_VARIANTS.length} 处。此节运行时从各条目引文数据派生,不另存第二份,条目更新则此节同步。`}
        />
        <div className={styles.cites}>
          {SITE_VARIANTS.map((item) => (
            <article key={item.id} className={styles.cite} data-site-variant={item.locationId}>
              <p className={styles.citeHead}>
                <strong className={styles.citeName}>{item.name}</strong>
                <span className={styles.citeSection}>
                  {item.subClassic} · {item.section}
                </span>
              </p>
              <p className={styles.citeText}>{item.text}</p>
              <div className={styles.citeLinks}>
                <Link className={styles.citeLink} to="/atlas">
                  山川图 →
                </Link>
                <Link
                  className={styles.citeLink}
                  to={
                    item.segmentId
                      ? `/chapters/nanshan-jing#${item.segmentId}`
                      : '/chapters/nanshan-jing'
                  }
                >
                  {item.segmentId ? '回看古卷对应段 →' : '回看古卷 →'}
                </Link>
                {item.url ? (
                  <a className={styles.citeLink} href={item.url} target="_blank" rel="noreferrer">
                    公开对照底本 ↗
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <nav className={styles.endLinks} aria-label="相关页面">
        <Link className={styles.endLink} to="/readings">
          难字音表 →
        </Link>
        <Link className={styles.endLink} to="/how-to-read">
          如何读本站(凡例) →
        </Link>
        <Link className={styles.endLink} to="/about">
          资料来源与制作说明 →
        </Link>
      </nav>
    </div>
  )
}
