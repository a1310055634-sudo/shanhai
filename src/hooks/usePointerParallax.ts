import { useEffect, useRef } from 'react'

/**
 * 指针视差:把指针在元素内的相对位置写入 CSS 变量 --px / --py(-1 ~ 1),
 * 各景深层用 transform: translate3d(calc(var(--px) * Npx), …) 消费。
 * 约束(规范第十节):只写 transform;位移 ≤20px;仅在精确指针设备启用;
 * prefers-reduced-motion 时完全不启用。
 */
export function usePointerParallax<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const fine = window.matchMedia('(pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || reduced.matches) return

    let raf = 0
    let px = 0
    let py = 0

    const apply = () => {
      raf = 0
      el.style.setProperty('--px', px.toFixed(3))
      el.style.setProperty('--py', py.toFixed(3))
    }

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      px = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1))
      py = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1))
      if (!raf) raf = requestAnimationFrame(apply)
    }

    const onLeave = () => {
      px = 0
      py = 0
      if (!raf) raf = requestAnimationFrame(apply)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return ref
}
