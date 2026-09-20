import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'shanhai:reading'
const MAX_ENTRIES = 20

export interface ReadingEntry {
  slug: string
  /** 最近一次阅读时间戳 */
  ts: number
}

/** 最近阅读(本地存储,无账号):详情页访问时记录,保留最近 20 条。 */
export function useReadingHistory() {
  const [entries, setEntries] = useState<ReadingEntry[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? (JSON.parse(raw) as ReadingEntry[]) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
    } catch {
      // 存储不可用时静默降级为会话内状态
    }
  }, [entries])

  /** 记录一次阅读(同一条目去重前移)。 */
  const record = useCallback((slug: string) => {
    setEntries((prev) => [
      { slug, ts: Date.now() },
      ...prev.filter((e) => e.slug !== slug),
    ].slice(0, MAX_ENTRIES))
  }, [])

  const clear = useCallback(() => setEntries([]), [])

  return { entries, record, clear }
}
