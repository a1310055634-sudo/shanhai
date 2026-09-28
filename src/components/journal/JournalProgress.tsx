import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import JourneyScenery from '../journey/JourneyScenery'
import { buildScrollSlots, cnNum } from './journalView'
import pageStyles from '../../pages/JourneyPage.module.css'

/**
 * R04 进度轨模块(自 E04 长卷迁入):九位置场景条 + 相邻边语义 + 示意注记。
 * 相邻边只有两端均为已核验站时为实线;隔待核段一律虚线(不虚构直接相邻)。
 */
export default function JournalProgress({ currentId }: { currentId?: string }) {
  return (
    <section
      className={pageStyles.scrollWrap}
      aria-label="路线长卷:南次一经九个顺序位置,古籍叙事顺序示意"
    >
      <JourneyScenery />
      <div className={pageStyles.scroll}>
        {(() => {
          const slots = buildScrollSlots()
          const out: ReactNode[] = []
          slots.forEach((slot, i) => {
            if (i > 0) {
              const prev = slots[i - 1]
              const verifiedEdge = prev.kind === 'station' && slot.kind === 'station'
              out.push(
                <span
                  key={`l${i}`}
                  className={
                    verifiedEdge
                      ? `${pageStyles.scrollLink} ${pageStyles.scrollLinkSolid}`
                      : pageStyles.scrollLink
                  }
                  aria-hidden="true"
                />,
              )
            }
            if (slot.kind === 'station') {
              out.push(
                <Link
                  key={`s${i}`}
                  to={`/journeys/nanci-yi?station=${slot.locId}`}
                  aria-current={currentId === slot.locId ? 'true' : undefined}
                  className={
                    currentId === slot.locId
                      ? `${pageStyles.scrollSlot} ${pageStyles.scrollSlotOn}`
                      : pageStyles.scrollSlot
                  }
                >
                  <span className={pageStyles.scrollOrder} aria-hidden="true">
                    {cnNum(slot.order)}
                  </span>
                  <span className={pageStyles.scrollDot} aria-hidden="true" />
                  <span className={pageStyles.scrollName}>{slot.name}</span>
                  {slot.approach && (
                    <span className={pageStyles.scrollApproach}>{slot.approach}</span>
                  )}
                </Link>,
              )
            } else {
              out.push(
                <div key={`p${i}`} className={pageStyles.scrollGap}>
                  <span className={pageStyles.scrollOrder} aria-hidden="true">
                    {cnNum(slot.order)}
                  </span>
                  <span className={pageStyles.scrollGapName}>{slot.name}</span>
                  <span className={pageStyles.scrollGapNote}>
                    {slot.note ?? '待核验'}
                  </span>
                </div>,
              )
            }
          })
          return out
        })()}
      </div>
      <p className={pageStyles.scrollNote}>
        古籍叙事顺序示意,非现实地理位置 · 已核验站可点入,待核验山段不可进入 ·
        行进方向循原文「又东」次序
      </p>
    </section>
  )
}
