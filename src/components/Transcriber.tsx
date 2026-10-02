import { useEffect, useRef, useState } from 'react'
import styles from './Transcriber.module.css'

/**
 * G43 誊抄机:引言逐字显形 + 墨点光标,像朱笔誊抄入卷。
 *
 * 翻译规则第 2 条落地(参考站实测:hero 55ms/字、区块 130ms/字、打前量宽防跳版):
 * - 速度走令牌 --duration-char(70ms,hero 级快档);闪烁走 --duration-caret。
 * - 防 CLS:打字前先以隐藏副本量取整句最终高度,给容器预锁 min-height——
 *   打字中途行数增长不再推移下方内容(参考站为居中单行故锁宽;本站引言左对齐
 *   且窄屏会自然折行,锁高是等效且更稳的形态,宽度恒等断言仍成立)。
 * - prefers-reduced-motion:直出全文,不跑计时器,不渲染光标(JS 侧判断;
 *   base.css 全局压平兜底 CSS 动画)。
 * - 无障碍:根节点 aria-label=全文,内部逐字 span 与光标均 aria-hidden;
 *   组件不可聚焦,不影响键盘焦点环。
 */
interface TranscriberProps {
  text: string
}

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Transcriber({ text }: TranscriberProps) {
  const [reduce] = useState(prefersReduced)
  const [count, setCount] = useState(reduce ? text.length : 0)
  const [done, setDone] = useState(reduce)
  const rootRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (reduce) return undefined
    // 防跳版:量隐藏副本的最终高度,预锁容器 min-height
    const root = rootRef.current
    const ghost = root?.querySelector<HTMLSpanElement>(`.${styles.ghost}`)
    if (root && ghost) {
      root.style.minHeight = `${ghost.offsetHeight}px`
    }
    const readChar = () => {
      if (!root) return 70
      const raw = getComputedStyle(root).getPropertyValue('--duration-char')
      const n = parseFloat(raw)
      return Number.isFinite(n) && n >= 20 ? n : 70
    }
    let i = 0
    const tick = () => {
      i += 1
      setCount(i)
      if (i < text.length) {
        timer = window.setTimeout(tick, readChar())
      } else {
        setDone(true)
      }
    }
    let timer = window.setTimeout(tick, readChar())
    return () => window.clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (reduce) {
    return (
      <span className={styles.root} data-transcriber="done" aria-label={text}>
        {text}
      </span>
    )
  }

  return (
    <span className={styles.root} ref={rootRef} data-transcriber={done ? 'done' : 'typing'} aria-label={text}>
      {/* 隐藏量宽副本:占定最终高度,不参与绘制 */}
      <span className={styles.ghost} aria-hidden="true">
        {text}
      </span>
      <span className={styles.typed} aria-hidden="true">
        {text.slice(0, count)}
        {!done && <span className={styles.caret} aria-hidden="true" />}
      </span>
    </span>
  )
}
