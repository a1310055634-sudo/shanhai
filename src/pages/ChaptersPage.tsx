import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import { CHAPTERS, CHAPTER_GROUPS, CHAPTER_ORDER_NUMERALS, CHAPTER_PINYIN } from '../data/chapters'
import styles from './ChaptersPage.module.css'

/**
 * 古籍篇章:通行本十八篇目录,以分组呈现。
 * 篇目次序已于 2026-09-20 依据 ctext.org 公开文本核对(见 CONTENT_SOURCES.md)。
 * 已录入原文的篇章可点入阅读,未录入的如实标注「待录入」,不提供假链接。
 */
export default function ChaptersPage() {
  return (
    <div className={styles.page}>
      <SectionHeading
        index="古卷"
        title="古籍篇章"
        subtitle="SHAN HAI JING · 十八篇"
        note="以下为通行本十八篇目录,篇目、次序以采用的底本为准,已经公开文本核对。各篇原文逐卷录入中,可阅读的篇章名称可直接点入。"
        level={1}
      />

      {CHAPTER_GROUPS.map((group) => {
        const chapters = CHAPTERS.filter((c) => c.group === group.key)
        return (
          <section key={group.key} className={styles.group} aria-label={group.key}>
            <div className={styles.groupHead}>
              <h3 className={styles.groupName}>{group.key}</h3>
              <p className={styles.groupNote}>{group.note}</p>
            </div>
            <ul className={styles.list}>
              {chapters.map((c) => {
                const readable = c.contentStatus !== 'pending'
                return (
                  <li key={c.id} className={styles.item}>
                    <span className={styles.order} aria-hidden="true">
                      第{CHAPTER_ORDER_NUMERALS[c.order - 1]}篇
                    </span>
                    <div className={styles.itemMain}>
                      {readable ? (
                        <Link className={styles.nameLink} to={`/chapters/${c.slug}`}>
                          <span className={styles.name}>{c.name}</span>
                          <span className={styles.pinyin}>{CHAPTER_PINYIN[c.name] ?? ''}</span>
                        </Link>
                      ) : (
                        <div className={styles.nameLink}>
                          <span className={styles.name}>{c.name}</span>
                          <span className={styles.pinyin}>{CHAPTER_PINYIN[c.name] ?? ''}</span>
                        </div>
                      )}
                    </div>
                    {readable ? (
                      <span className={styles.statusReadable}>可阅读</span>
                    ) : (
                      <span className={styles.status}>待录入</span>
                    )}
                  </li>
                )
              })}
            </ul>
          </section>
        )
      })}

      <p className={styles.sourceNote}>
        篇目核验:2026-09-20 依据「中国哲学书电子化计划」公开文本核对,与郭璞注—郝懿行笺疏系统通行本次序一致;原文录入所用底本详见「资料来源与制作说明」。
      </p>
    </div>
  )
}
