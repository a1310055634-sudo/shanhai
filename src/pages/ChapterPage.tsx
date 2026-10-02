import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import PaintingMount from '../components/PaintingMount'
import xuweiGrapes from '../assets/paintings/xuwei-grapes.jpg'
import { CHAPTERS, CHAPTER_PINYIN } from '../data/chapters'
import { LOCATIONS } from '../data/locations'
import { CHAPTER_TEXTS, GLOSSARY, segmentCounts, type ChapterSegment } from '../data/chapterTexts'
import { NANCI_YI_ROUTE, validateJourneyRoute } from '../data/journey'
import { buildJournalPositions, journalDeps, type JournalDeps } from '../components/journal/journalModel'
import { ENTITIES } from '../data/entities'
import DistanceTable from '../components/DistanceTable'
import { Fragment } from 'react'
import EmptyState from '../components/EmptyState'
import PaperTexture from '../components/common/PaperTexture'
import { RuleFishTail } from '../components/common/Rule'
import styles from './ChapterPage.module.css'

/** 生僻字注音:按词典把字包成 ruby。u 标志必要:词典含增补平面字(𨴯),无 u 会劈成孤立代理项。 */
function annotate(text: string, on: boolean) {
  if (!on) return text
  const chars = Object.keys(GLOSSARY)
  const re = new RegExp(`[${chars.join('')}]`, 'gu')
  const parts = text.split(re)
  const matched = text.match(re) ?? []
  return parts.flatMap((part, i) => {
    const ruby = matched[i]
      ? (
          <ruby key={`r${i}`}>
            {matched[i]}
            <rt>{GLOSSARY[matched[i]].pinyin}</rt>
          </ruby>
        )
      : null
    return [part, ruby].filter(Boolean)
  })
}

/** 篇章阅读器(规范第七节):分段、进度、注音开关、复制带出处、上下篇。 */
export default function ChapterPage() {
  const { slug } = useParams()
  const location = useLocation()
  const chapter = CHAPTERS.find((c) => c.slug === slug)
  const [annotateOn, setAnnotateOn] = useState(true)
  const [copied, setCopied] = useState<string | null>(null)
  const [copyFailed, setCopyFailed] = useState<string | null>(null)

  const chapterText = useMemo(
    () => (slug ? CHAPTER_TEXTS[slug] : undefined),
    [slug],
  )

  // 调试钩子(J08 审校复用):window.__journeyCheck() 返回路线完整性问题清单
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__journeyCheck = () =>
      validateJourneyRoute(NANCI_YI_ROUTE)
  }, [])

  // R03 调试钩子:window.__journalModel(deps?) 返回展览视图模型(可传变形依赖做负向检验)
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__journalModel = (deps?: JournalDeps) =>
      buildJournalPositions(deps ?? journalDeps())
    ;(window as unknown as Record<string, unknown>).__journalDeps = journalDeps()
  }, [])

  // J16:行旅「打开对应段落」等站内锚点进入时,SPA 哈希变更不触发浏览器原生滚动,
  // pushState 也不登记 :target——故自行定位并以状态类明示到达段落。
  const [anchorSeg, setAnchorSeg] = useState<string | null>(null)
  useEffect(() => {
    if (!location.hash) {
      setAnchorSeg(null)
      return
    }
    const id = decodeURIComponent(location.hash.slice(1))
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ block: 'start' })
    setAnchorSeg(id)
  }, [location.hash, chapter, chapterText])

  if (!chapter || !chapterText) {
    return (
      <div className={styles.page}>
        <EmptyState
          title="此卷尚未开放"
          description="该篇原文尚未录入,开放前须经逐字核验。请先阅读已开放的篇章。"
          action={{ to: '/chapters', label: '返回篇章目录' }}
        />
      </div>
    )
  }

  const order = CHAPTERS.indexOf(chapter)
  const prev = order > 0 ? CHAPTERS[order - 1] : undefined
  const next = order < CHAPTERS.length - 1 ? CHAPTERS[order + 1] : undefined
  const linkedEntities = ENTITIES.filter((e) => e.chapterIds.includes(chapter.id))
  const { entered, gaps } = segmentCounts(chapterText)
  const total = entered + gaps
  const progress = Math.round((entered / total) * 100)

  const copySegment = async (seg: ChapterSegment, index: number) => {
    const payload = `${seg.text}
——《山海经·${chapter.name}》· ${seg.section} · 山海万象录`
    const key = String(index)
    const legacy = () => {
      try {
        const ta = document.createElement('textarea')
        ta.value = payload
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        const ok = document.execCommand('copy')
        document.body.removeChild(ta)
        return ok
      } catch {
        return false
      }
    }
    let ok = false
    try {
      await navigator.clipboard.writeText(payload)
      ok = true
    } catch {
      ok = legacy()
    }
    if (ok) {
      setCopied(key)
      setCopyFailed(null)
    } else {
      setCopyFailed(key)
      setCopied(null)
    }
    window.setTimeout(() => {
      setCopied(null)
      setCopyFailed(null)
    }, 2400)
  }

  const jumpToEntity = (id: string) =>
    `/catalog/${ENTITIES.find((e) => e.id === id)?.slug ?? ''}`

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <p className={styles.kicker}>
          卷{CHAPTER_PINYIN[chapter.name] ? ` · ${chapter.name}` : ''}
        </p>
        <h1 className={styles.title}>{chapter.name}</h1>
        <p className={styles.pinyin}>{CHAPTER_PINYIN[chapter.name]}</p>

        <div className={styles.progressRow}>
          <div
            className={styles.progressTrack}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="录入进度"
          >
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
          <p className={styles.progressNote}>
            已录入 {entered} 段 · 待录入 {gaps} 处 ·
            相关条目 {linkedEntities.length} 条
          </p>
        </div>

        <div className={styles.toolbar}>
          <button
            type="button"
            className={annotateOn ? `${styles.toggle} ${styles.toggleOn}` : styles.toggle}
            aria-pressed={annotateOn}
            onClick={() => setAnnotateOn((v) => !v)}
          >
            生僻字注音{annotateOn ? '开' : '关'}
          </button>
          <p className={styles.toolbarNote}>
            注音读音供参考,训释以各条目页为准;待录入处如实标注,不补写。
            <Link className={styles.toolbarLink} to="/journeys/nanci-yi">
              进入南次一经行旅 →
            </Link>
          </p>
        </div>
      </header>

      <div className={styles.reader}>
        <PaperTexture />
        {chapterText.segments.map((seg, i) => {
          if (seg.kind !== 'text') {
            return (
              <div key={i} id={seg.id} data-seg-id={seg.id} className={styles.gap}>
                <span className={styles.gapMark}>{seg.section} · {seg.note}</span>
              </div>
            )
          }
          const prev = i > 0 ? chapterText.segments[i - 1] : undefined
          return (
            <Fragment key={i}>
              {/* G21 版心鱼尾:仅正文段与正文段之间 1 处纹样,行款节奏 */}
              {prev?.kind === 'text' && (
                <RuleFishTail className={styles.fishTail} />
              )}
              <div
                className={seg.id === anchorSeg ? `${styles.segment} ${styles.segmentOn}` : styles.segment}
                id={seg.id}
                data-seg-id={seg.id}
            >
              <p className={styles.sectionTag}>{seg.section}</p>
              <p className={styles.text}>{annotate(seg.text ?? '', annotateOn)}</p>
              <div className={styles.segFoot}>
                {seg.relatedEntityIds?.map((id) => {
                  const e = ENTITIES.find((x) => x.id === id)
                  return e ? (
                    <Link key={id} className={styles.segLink} to={jumpToEntity(id)}>
                      异兽·{e.canonicalName}
                    </Link>
                  ) : null
                })}
                {(() => {
                  // P08:篇末总述等关联山川较多的段落,合并为单链,避免重复链接拥挤
                  const locs = (seg.relatedLocationIds ?? [])
                    .map((id) => LOCATIONS.find((l) => l.id === id))
                    .filter((l): l is (typeof LOCATIONS)[number] => Boolean(l))
                  if (locs.length === 0) return null
                  if (locs.length <= 3) {
                    return locs.map((loc) => (
                      <Link key={`l-${loc.id}`} className={styles.segLink} to="/atlas">
                        地·{loc.canonicalName}
                      </Link>
                    ))
                  }
                  return (
                    <Link className={styles.segLink} to="/atlas">
                      地·{locs[0].subClassic}山系{locs.length}座山川(详见山川图) →
                    </Link>
                  )
                })()}
                <button
                  type="button"
                  className={
                    copied === String(i)
                      ? `${styles.copy} ${styles.copyOk}`
                      : copyFailed === String(i)
                        ? `${styles.copy} ${styles.copyFail}`
                        : styles.copy
                  }
                  onClick={() => copySegment(seg, i)}
                >
                  {copied === String(i)
                    ? '✓ 已复制(含出处)'
                    : copyFailed === String(i)
                      ? '复制失败,请手动选择复制'
                      : '复制原文(含出处)'}
                </button>
              </div>
            </div>
          </Fragment>
        )
        })}
      </div>

      {/* G26:里距对照(原文照录+本站校核并置,歧义照录不裁决),挂南山经篇末;G30 增二经表 */}
      {slug === 'nanshan-jing' && (
        <>
          <DistanceTable />
          <DistanceTable classic="ns2" />
        </>
      )}

      {/* G48 卷尾水墨小景:六层内容之后、篇章导航之前的纯装饰附录——
          小尺寸装裱立轴+纸阶二档带;款识真实题名,与原文无涉不臆造关联 */}
      <div className={styles.scrollEnd}>
        <div className={styles.scrollEndMount}>
          <PaintingMount
            src={xuweiGrapes}
            alt="墨葡萄图"
            width={510}
            height={1341}
            caption="〔明〕徐渭 墨葡萄图"
            credit="维基共享资源 公有领域"
          />
        </div>
        <p className={styles.scrollEndNote}>卷尾墨迹 · 与原文无涉，仅作展卷收束。</p>
      </div>

      <nav className={styles.chapterNav} aria-label="篇章切换">
        {prev ? (
          prev.contentStatus === 'pending' ? (
            <span className={styles.navDisabled}>上一篇 · {prev.name}(待录入)</span>
          ) : (
            <Link className={styles.navLink} to={`/chapters/${prev.slug}`}>
              ← 上一篇 · {prev.name}
            </Link>
          )
        ) : (
          <span />
        )}
        <Link className={styles.navLink} to="/chapters">
          返回篇章目录
        </Link>
        {next ? (
          next.contentStatus === 'pending' ? (
            <span className={styles.navDisabled}>下一篇 · {next.name}(待录入)</span>
          ) : (
            <Link className={styles.navLink} to={`/chapters/${next.slug}`}>
              下一篇 · {next.name} →
            </Link>
          )
        ) : (
          <span />
        )}
      </nav>
    </div>
  )
}
