import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LOCATIONS } from '../../data/locations'
import { ENTITIES } from '../../data/entities'
import { DOUBTS } from '../../data/variants'
import { SOUND_ENTRIES } from '../../data/readings'
import { CHAPTERS } from '../../data/chapters'
import styles from './SearchOverlay.module.css'

/** G95 全站搜索:Ctrl+K / 页脚「全站检索」入口。
 *  索引全部运行时从既有数据源派生(无第二份数据,红线 9);
 *  键盘全流程:Ctrl+K 开 → 输入过滤 → ↑↓ 选 → Enter 跳 → Esc 关,焦点归还。 */

interface Hit {
  label: string
  sub: string
  to: string
}

const CHAPTER_SLUG = new Map(CHAPTERS.map((c) => [c.id, c.slug]))

interface Group {
  key: string
  title: string
  hits: Hit[]
}

function buildIndex(): Group[] {
  const mountains: Hit[] = LOCATIONS.map((l) => ({
    label: l.canonicalName,
    sub: l.subClassic ?? l.chapterId,
    to: `/chapters/${CHAPTER_SLUG.get(l.chapterId) ?? ''}`,
  }))
  const entities: Hit[] = ENTITIES.map((e) => ({
    label: `${e.canonicalName}(${e.pinyin})`,
    sub: e.tags.slice(0, 2).join(' · ') || e.pinyin,
    to: `/catalog/${e.slug}`,
  }))
  const doubts: Hit[] = DOUBTS.map((d) => ({
    label: `${d.id} · ${d.topic}`,
    sub: '异文校勘',
    to: '/variants',
  }))
  const readings: Hit[] = SOUND_ENTRIES.map((s) => ({
    label: `${s.char} — ${s.where}`,
    sub: '难字音表',
    to: '/readings',
  }))
  return [
    { key: 'mountain', title: '山川', hits: mountains },
    { key: 'entity', title: '词条', hits: entities },
    { key: 'doubt', title: '异文', hits: doubts },
    { key: 'reading', title: '音表', hits: readings },
  ]
}

const GROUP_LIMIT = 6

export default function SearchOverlay() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const lastFocused = useRef<HTMLElement | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  const index = useMemo(buildIndex, [])

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return index
      .map((g) => ({
        ...g,
        hits: g.hits.filter((h) => `${h.label} ${h.sub}`.toLowerCase().includes(q)).slice(0, GROUP_LIMIT),
      }))
      .filter((g) => g.hits.length > 0)
  }, [index, query])

  const flat = useMemo(() => groups.flatMap((g) => g.hits.map((h) => ({ ...h, group: g.title }))), [groups])

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
    setActive(0)
    // 焦点归还
    if (lastFocused.current && document.contains(lastFocused.current)) {
      lastFocused.current.focus()
    } else {
      document.body.focus()
    }
    lastFocused.current = null
  }, [])

  const openOverlay = useCallback(() => {
    lastFocused.current = document.activeElement as HTMLElement | null
    setOpen(true)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault()
        if (open) close()
        else openOverlay()
      } else if (e.key === 'Escape' && open) {
        close()
      }
    }
    const onOpenEvent = () => openOverlay()
    window.addEventListener('keydown', onKey)
    window.addEventListener('shanhai:search-open', onOpenEvent as EventListener)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('shanhai:search-open', onOpenEvent as EventListener)
    }
  }, [open, close, openOverlay])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    setActive(0)
  }, [query])

  const pick = (hit: Hit) => {
    close()
    navigate(hit.to)
  }

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => (flat.length ? (i + 1) % flat.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => (flat.length ? (i - 1 + flat.length) % flat.length : 0))
    } else if (e.key === 'Tab') {
      // G97 焦点陷阱:浮层内可聚焦元素仅输入框+结果项,Tab 循环不穿透背景页
      e.preventDefault()
      if (flat.length) setActive((i) => (i + 1) % flat.length)
      inputRef.current?.focus()
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const hit = flat[active]
      if (hit) pick(hit)
    }
  }

  let cursor = -1

  return (
    <>
      {open && (
        <div
          className={styles.veil}
          onClick={close}
          data-search-veil=""
        >
          <div
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-label="全站检索"
            ref={dialogRef}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              ref={inputRef}
              className={styles.input}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onInputKey}
              placeholder="检索山川、词条、异文、音表……"
              aria-label="检索山海经内容"
              role="combobox"
              aria-expanded={flat.length > 0}
              aria-controls="shanhai-search-listbox"
              aria-activedescendant={flat.length ? `shanhai-search-opt-${active}` : undefined}
            />
            {query.trim() === '' && (
              <p className={styles.hint}>
                输入关键词过滤;↑↓ 选择,Enter 跳转,Esc 关闭。索引由山川、词条、异文、音表数据实时派生。
              </p>
            )}
            {query.trim() !== '' && flat.length === 0 && (
              <p className={styles.empty}>山海茫茫,未检索到「{query.trim()}」相关条目。</p>
            )}
            <div className={styles.results} id="shanhai-search-listbox" role="listbox" aria-label="检索结果">
              {groups.map((g) => (
                <div key={g.key} className={styles.group}>
                  <p className={styles.groupTitle}>
                    {g.title} · {g.hits.length}
                  </p>
                  <ul>
                    {g.hits.map((h) => {
                      cursor += 1
                      const idx = cursor
                      return (
                        <li key={h.to + h.label}>
                          <button
                            type="button"
                            id={`shanhai-search-opt-${idx}`}
                            role="option"
                            aria-selected={idx === active}
                            className={`${styles.hit} ${idx === active ? styles.hitActive : ''}`}
                            onClick={() => pick(h)}
                            onMouseEnter={() => setActive(idx)}
                          >
                            <span className={styles.hitLabel}>{h.label}</span>
                            <span className={styles.hitSub}>{h.sub}</span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/** 页脚入口触发函数(供 Footer 调用)。 */
export function openSearch() {
  window.dispatchEvent(new CustomEvent('shanhai:search-open'))
}
