import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'shanhai:favorites'

/** 收藏(本地存储,无账号):保存条目 id 列表。 */
export function useFavorites() {
  const [ids, setIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? (JSON.parse(raw) as string[]) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
      // 存储不可用(隐私模式等)时静默降级为会话内状态
    }
  }, [ids])

  const toggle = useCallback((id: string) => {
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }, [])

  const isFavorite = useCallback((id: string) => ids.includes(id), [ids])

  return { ids, toggle, isFavorite }
}
