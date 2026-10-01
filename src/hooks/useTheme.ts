import { useCallback, useSyncExternalStore } from 'react'

/**
 * G31 主题状态:真源是 <html data-theme>——'qing'=晴窗,无属性=灯下墨夜(默认)。
 * 初始值由 index.html 内联脚本在挂载前写好(localStorage 优先,
 * 否则跟随 prefers-color-scheme);本 hook 订阅属性变化并提供切换。
 * 切换瞬间挂 html.theme-switching 压平全部过渡(切换不加动画),两帧后移除。
 */

export type ThemeMode = 'qing' | 'deng'

const STORAGE_KEY = 'shanhai-theme'

const listeners = new Set<() => void>()

// data-theme 是唯一真源(含内联脚本的初始设定),用 MutationObserver 广播
new MutationObserver(() => {
  listeners.forEach((notify) => notify())
}).observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['data-theme'],
})

function subscribe(notify: () => void) {
  listeners.add(notify)
  return () => listeners.delete(notify)
}

function getSnapshot(): ThemeMode {
  return document.documentElement.getAttribute('data-theme') === 'qing'
    ? 'qing'
    : 'deng'
}

function getServerSnapshot(): ThemeMode {
  return 'deng'
}

export function useTheme() {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const setMode = useCallback((next: ThemeMode) => {
    const root = document.documentElement
    root.classList.add('theme-switching')
    if (next === 'qing') {
      root.setAttribute('data-theme', 'qing')
    } else {
      root.removeAttribute('data-theme')
    }
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* 存储不可用时主题仅本次会话生效 */
    }
    // 双 rAF:确保禁过渡类已生效一帧后才移除,颜色瞬切无动画;
    // 后台标签 rAF 会暂停,setTimeout 100ms 兜底幂等移除
    const clear = () => root.classList.remove("theme-switching")
    requestAnimationFrame(() => {
      requestAnimationFrame(clear)
    })
    setTimeout(clear, 100)
  }, [])

  const toggle = useCallback(
    () => setMode(getSnapshot() === 'qing' ? 'deng' : 'qing'),
    [setMode],
  )

  return { mode, setMode, toggle }
}
