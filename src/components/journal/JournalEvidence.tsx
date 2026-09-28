import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { LOCATIONS } from '../../data/locations'
import styles from './JournalEvidence.module.css'

/**
 * R15 证据层:每站统一的「看原文与出处」入口。
 * 抽屉内容全部派生自 LOCATIONS 已核引文(出处底本/核验状态/版本异文/核验备注),
 * 不新增任何古籍事实;主场景保持干净,长考据收进抽屉。
 * 键盘约定:打开时焦点移入抽屉,Tab 循环限制在抽屉内,Esc 或遮罩关闭后焦点返回触发钮。
 */
export default function JournalEvidence({
  locId,
  segmentId,
}: {
  locId: string
  segmentId?: string
}) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const loc = LOCATIONS.find((l) => l.id === locId)
  const citation = loc?.citations[0]

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
        return
      }
      // 简易焦点圈:Tab 只在抽屉内循环
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        )
        if (focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        const active = document.activeElement
        if (e.shiftKey && (active === first || active === dialogRef.current)) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && active === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    dialogRef.current?.focus()
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  if (!loc || !citation) return null

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={styles.evidenceBtn}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        看原文与出处
      </button>
      {open && (
        <>
          <div className={styles.overlay} onClick={() => setOpen(false)} aria-hidden="true" />
          <div
            ref={dialogRef}
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-labelledby="journal-evidence-title"
            tabIndex={-1}
          >
            <div className={styles.drawerHead}>
              <h4 id="journal-evidence-title" className={styles.drawerTitle}>
                原文与出处 · {loc.canonicalName}
              </h4>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => {
                  setOpen(false)
                  triggerRef.current?.focus()
                }}
                aria-label="关闭原文与出处"
              >
                ×
              </button>
            </div>

            <section className={styles.evSection}>
              <p className={styles.evLabel}>底本录文</p>
              <p className={styles.evOriginal}>{citation.originalText}</p>
              <p className={styles.evMeta}>
                《{citation.chapter}》{citation.section ? ` · ${citation.section}` : ''}
              </p>
            </section>

            <section className={styles.evSection}>
              <p className={styles.evLabel}>出处底本</p>
              <p className={styles.evBody}>{citation.sourceEdition}</p>
              {citation.publicUrl && (
                <a
                  className={styles.evLink}
                  href={citation.publicUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  查看出处页 ↗
                </a>
              )}
            </section>

            <section className={styles.evSection}>
              <p className={styles.evLabel}>核验状态</p>
              <p className={styles.evBody}>
                {loc.recordStatus === 'verified' ? '已核验' : loc.recordStatus}
                {citation.verifiedAt ? ` · 核验于 ${citation.verifiedAt}` : ''}
                {loc.relatedEntityIds.length > 0
                  ? ''
                  : ' · 本站无已核验异兽条目'}
              </p>
            </section>

            {citation.variantText && (
              <section className={styles.evSection}>
                <p className={styles.evLabel}>版本异文</p>
                <p className={styles.evBody}>{citation.variantText}</p>
              </section>
            )}

            <section className={styles.evSection}>
              <p className={styles.evLabel}>核验备注</p>
              <p className={styles.evNote}>{citation.verificationNote}</p>
            </section>

            {segmentId && (
              <section className={styles.evSection}>
                <p className={styles.evLabel}>进入古卷</p>
                <Link className={styles.evLink} to={`/chapters/nanshan-jing#${segmentId}`}>
                  《南山经》对应段落 →
                </Link>
              </section>
            )}
          </div>
        </>
      )}
    </>
  )
}
