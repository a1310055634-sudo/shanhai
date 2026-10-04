import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import {
  BLANK_ENTRIES,
  DOUBT12_VERDICTS,
  GLOSS_ENTRIES,
  GUOPU_ARCHIVE,
  NOT_ON_SITE,
  READING_COUNTS,
  SOUND_ENTRIES,
  inRubyLayer,
  siteReadingOf,
  type ReadingEntry,
} from '../data/readings'
import styles from './ReferencePage.module.css'

/**
 * 难字音表(G35)。分层纪律:
 *  - 第一层「注」:郭璞注有音注(直音/反切),逐字照录底本B存档并记行号,不折合今音;
 *  - 第二层「释」:郭璞注有训释但无音注,读音留白;
 *  - 第三层「白」:底本无音注可依,读音一律留白并降级为「通读参考·非核验内容」。
 * 本站标注读音取自既有两层(ruby 注音层 / 山名通读层)单一来源,本页不另抄第三份。
 */

const TAG: Record<ReadingEntry['basis'], { text: string; cls: string }> = {
  sound: { text: '郭注有音', cls: `${styles.tag} ${styles.tagSound}` },
  gloss: { text: '郭注有释无音', cls: styles.tag },
  none: { text: '底本无音注·留白', cls: styles.tag },
}

/** 本站标注读音的呈现串(值取原表;山名层连同所据山名一并示出)。 */
function siteReadingText(entry: ReadingEntry) {
  const value = siteReadingOf(entry)
  if (!value) {
    return { kind: 'none' as const, text: '本站未标注读音(留白)' }
  }
  if (entry.layer === 'mountains') {
    return { kind: 'mountains' as const, text: `山名通读层「${entry.mountainName}」作 ${value}` }
  }
  return { kind: 'ruby' as const, text: value }
}

function EntryRow({ entry }: { entry: ReadingEntry }) {
  const reading = siteReadingText(entry)
  const tag = TAG[entry.basis]
  const rubyCovered = inRubyLayer(entry)
  return (
    <li className={styles.entry} data-char={entry.char} data-basis={entry.basis}>
      <div className={styles.entryHead}>
        <p className={styles.entryChar}>
          {entry.char}
          {entry.siteChar ? <span className={styles.entrySiteLabel}>站内作「{entry.siteChar}」</span> : null}
        </p>
        <p className={styles.entrySite}>
          <span className={styles.entrySiteLabel}>本站标注</span>
          {reading.kind === 'none' ? (
            <span className={styles.entrySiteNone}>{reading.text}</span>
          ) : (
            reading.text
          )}
        </p>
        <p className={styles.entrySite}>
          <span className={styles.entrySiteLabel}>注音层</span>
          <span className={styles.entrySiteNone}>
            {rubyCovered ? '古卷阅读器 ruby 注音层已收' : 'ruby 注音层未收(古卷页该字不显注音)'}
          </span>
        </p>
      </div>
      <div className={styles.entryBody}>
        <p className={styles.basisLine}>
          <span className={tag.cls}>{tag.text}</span>
          {entry.quote ? (
            <>
              <span className={styles.basisQuote}>郭璞注「{entry.quote}」</span>
              <span className={styles.basisMeta}>
                底本 B 第 {entry.line} 行
              </span>
            </>
          ) : (
            <span className={styles.basisQuote}>{entry.blankEvidence}</span>
          )}
        </p>
        <p className={styles.entryWhere}>
          <span className={styles.entrySiteLabel}>出现处</span>
          {entry.where}
        </p>
        {entry.note ? (
          <p className={styles.entryNote}>
            <span className={styles.entrySiteLabel}>备考</span>
            {entry.note}
          </p>
        ) : null}
      </div>
    </li>
  )
}

export default function ReadingsPage() {
  return (
    <div className={styles.page}>
      <SectionHeading
        index="音"
        title="难字音表"
        subtitle="NAN ZI YIN BIAO · READINGS WITH EVIDENCE"
        note="站内出现过的生僻字逐字列出读音与读音的依据;底本没有音注的一律留白,并把本站读音降级为通读参考。"
        level={1}
      />

      <section id="sec-basis" className={styles.section}>
        <SectionHeading index="例" title="三层依据" subtitle="SAN CENG YI JU" />
        <div className={styles.panel}>
          <p>
            <strong>一 · 郭注有音</strong>
            底本 B(中文维基文库郭璞注本)有直音或反切,音注逐字照录、保持繁体,并记存档行号。
            <strong>反切一律不折合今音</strong>——折合本身是本站推断,故只照录不代判。
          </p>
          <p>
            <strong>二 · 郭注有释无音</strong>
            郭璞注只作训释(如「蚖也」「未詳」),没有给该字注音;该字读音留白。
          </p>
          <p>
            <strong>三 · 底本无音注</strong>
            底本全篇找不到该字的音注(或该字所属篇章不在本站郭注存档范围内),读音一律留白;
            本站注音层与山名通读层的标注同时降级为「通读参考,非核验内容」,不写成定论。
          </p>
          <p className={styles.muted}>
            音注底本:{GUOPU_ARCHIVE.label},存档 {GUOPU_ARCHIVE.file}({GUOPU_ARCHIVE.fetchedAt} 抓取)。
            全部音注的逐字命中与行号由 dev/round35-verify.mjs 程序化回查,不凭记忆录入。
          </p>
        </div>
      </section>

      <section id="sec-doubt12" className={styles.section}>
        <SectionHeading index="裁" title="读音裁决 · 疑12(终)" subtitle="YI 12 ZHONG CAI" />
        <div className={styles.panel}>
          <p>
            疑12 四例(禺/亶/杻/雘)均为郭注直音与今通行读的韵、声差异,性质多为古今音变或注音用字假借。
            经 G78 复核呈报,用户已于 2026-10-05 终裁:<strong>维持本站通行标注,郭注异读两存照录,不改既有 ruby 标</strong>。
          </p>
          <ul>
            {DOUBT12_VERDICTS.map((v) => (
              <li key={v.char}>
                <strong>{v.char}</strong> · 本站 {v.site} / 郭注 {v.guo} —— {v.verdict}。
              </li>
            ))}
          </ul>
          <p className={styles.muted}>
            裁决记录:G78 呈报建议表(RUN_LOG)→ 用户终裁(G99 固化上屏);本表与 SOUND_ENTRIES 各条 note 的「两存照录」互为表里,既有读音标注零改动。
          </p>
        </div>
      </section>

      <section id="sec-sound" className={styles.section}>
        <SectionHeading
          index="注"
          title="郭璞注有音注的字"
          subtitle="YOU YIN ZHU DE ZI"
          note={`共 ${READING_COUNTS.sound} 字。音注为底本原文照录;本站标注读音与之并列,字面不同者两存,不裁决孰是孰非。`}
        />
        <ul className={styles.entries}>
          {SOUND_ENTRIES.map((entry) => (
            <EntryRow key={`sound-${entry.char}`} entry={entry} />
          ))}
        </ul>
      </section>

      <section id="sec-gloss" className={styles.section}>
        <SectionHeading
          index="释"
          title="郭璞注有训释、无音注的字"
          subtitle="YOU SHI WU YIN DE ZI"
          note={`共 ${READING_COUNTS.gloss} 字。注文说的是字义或声音比拟,不是注音;读音留白。`}
        />
        <ul className={styles.entries}>
          {GLOSS_ENTRIES.map((entry) => (
            <EntryRow key={`gloss-${entry.char}`} entry={entry} />
          ))}
        </ul>
      </section>

      <section id="sec-blank" className={styles.section}>
        <SectionHeading
          index="白"
          title="底本无音注可依的字"
          subtitle="LIU BAI DE ZI"
          note={`共 ${READING_COUNTS.blank} 字。依据行写明「无音注」及其证据(全存档出现处计数),读音留白。`}
        />
        <ul className={styles.entries}>
          {BLANK_ENTRIES.map((entry) => (
            <EntryRow key={`blank-${entry.char}`} entry={entry} />
          ))}
        </ul>
      </section>

      <section id="sec-offsite" className={styles.section}>
        <SectionHeading
          index="阙"
          title="底本有音注、站内尚未上屏的字"
          subtitle="WEI SHANG PING DE ZI"
          note="底本音注已核,但该段原文尚未在站内上屏,故不列行;登记于此,待该段录入后并入上表。"
        />
        <dl className={styles.doubts}>
          {NOT_ON_SITE.map((item) => (
            <div key={item.char} className={styles.doubt}>
              <dt className={styles.doubtHead}>
                <span className={styles.doubtId}>第 {item.line} 行</span>
                <strong className={styles.doubtTopic}>
                  {item.char} · 郭璞注「{item.quote}」
                </strong>
              </dt>
              <dd className={styles.doubtBody}>{item.reason}</dd>
            </div>
          ))}
        </dl>
        <p className={styles.muted}>
          全表合计 {READING_COUNTS.total} 字(有音注 {READING_COUNTS.sound} · 有释无音{' '}
          {READING_COUNTS.gloss} · 留白 {READING_COUNTS.blank});未列表音注 {NOT_ON_SITE.length} 字。
          读音与异文的分歧照录不裁决,集中登记见
          <Link className={styles.inlineLink} to="/variants">
            异文校勘
          </Link>
          ;分层规则见
          <Link className={styles.inlineLink} to="/how-to-read">
            如何读本站
          </Link>
          。
        </p>
      </section>

      <nav className={styles.endLinks} aria-label="相关页面">
        <Link className={styles.endLink} to="/variants">
          异文校勘 →
        </Link>
        <Link className={styles.endLink} to="/how-to-read">
          如何读本站(凡例) →
        </Link>
        <Link className={styles.endLink} to="/chapters/nanshan-jing">
          查看古卷·南山经 →
        </Link>
        <a className={styles.endLink} href={GUOPU_ARCHIVE.url} target="_blank" rel="noreferrer">
          郭璞注本底本(维基文库)↗
        </a>
      </nav>
    </div>
  )
}
