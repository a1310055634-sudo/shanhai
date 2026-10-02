import { useEffect, useRef } from 'react'
import styles from './InkReveal.module.css'

/**
 * G44 墨痕显影 InkReveal(任务书翻译规则第 8 条,用户点名效果)。
 *
 * 机制(参考站 hero 源码解剖同款):画常驻底层,canvas 纸色面纱覆于其上;
 * 鼠标沿路径每 12px 盖一枚「墨点图章」——r 8→≤128(随机 0.45 变化=笔触感),
 * 520ms easeOutCubic 扩张后 alpha=1-t² 愈合;墨点为三重正弦扰动多边形
 * (非正圆,像毛笔按出的墨渍);MAX_STAMPS 160 封顶、rAF 按需启停、DPR≤2。
 *
 * 山海版差异:
 * - 面纱色读令牌 --ink-reveal-veil(灯下=墨夜系/晴窗=宣纸系),每次全幅重涂时
 *   重读计算值→主题切换即换纱,禁止 JS 硬编码色值。
 * - 降级链:触屏与 (hover:none) 整个不初始化(CSS 亦隐藏面纱=画常显);
 *   prefers-reduced-motion 加静态半透类,不跑 rAF 不监听;
 *   JS 失败时 canvas 保持透明=画可见(fail-open 结构性质)。
 * - 装饰层:aria-hidden+pointer-events:none,监听挂在 hero 节点。
 */

const STEP = 12
const R_START = 8
const R_END = 128
const R_VARY = 0.45
const LIFETIME = 520
const MAX_STAMPS = 160

interface Stamp {
  x: number
  y: number
  born: number
  seed: number
  rmax: number
}

export default function InkReveal() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const hero = canvas?.closest('section')
    if (!canvas || !hero) return undefined
    if (!window.matchMedia('(hover: hover)').matches) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      canvas.classList.add(styles.staticVeil)
      // 静态涂纱一次(不跑 rAF 不监听):配合 CSS opacity .55 = 静态半透面纱
      const sctx = canvas.getContext('2d')
      if (!sctx) return undefined
      const paintStatic = () => {
        const r = canvas.getBoundingClientRect()
        if (!r.width || !r.height) return
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        canvas.width = Math.round(r.width * dpr)
        canvas.height = Math.round(r.height * dpr)
        canvas.style.width = `${r.width}px`
        canvas.style.height = `${r.height}px`
        sctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        sctx.globalCompositeOperation = 'source-over'
        sctx.fillStyle = `rgb(${getComputedStyle(canvas).getPropertyValue('--ink-reveal-veil').trim() || '31, 44, 38'})`
        sctx.fillRect(0, 0, r.width, r.height)
      }
      paintStatic()
      const ro = new ResizeObserver(paintStatic)
      ro.observe(canvas)
      return () => ro.disconnect()
    }
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    let w = 0
    let h = 0
    const stamps: Stamp[] = []

    const veilColor = () => {
      const raw = getComputedStyle(canvas).getPropertyValue('--ink-reveal-veil').trim()
      return raw ? `rgb(${raw})` : 'rgb(31, 44, 38)'
    }
    const repaintFull = () => {
      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 1
      ctx.fillStyle = veilColor()
      ctx.fillRect(0, 0, w, h)
    }
    const resize = () => {
      const r = canvas.getBoundingClientRect()
      if (!r.width || !r.height) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = r.width
      h = r.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      repaintFull()
    }

    const carve = (x: number, y: number, r: number, alpha: number, seed: number) => {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.beginPath()
      for (let i = 0; i <= 22; i += 1) {
        const a = (i / 22) * Math.PI * 2
        const wob =
          0.78 +
          0.14 * Math.sin(a * 3 + seed) +
          0.08 * Math.sin(a * 7 + seed * 2.1) +
          0.05 * Math.sin(a * 13 + seed * 0.7)
        const rr = r * wob
        const px = x + Math.cos(a) * rr
        const py = y + Math.sin(a) * rr
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.globalAlpha = alpha
      ctx.fill()
      ctx.globalAlpha = 1
    }

    let running = false
    const loop = () => {
      const now = performance.now()
      repaintFull()
      ctx.globalCompositeOperation = 'destination-out'
      for (let i = stamps.length - 1; i >= 0; i -= 1) {
        const t = (now - stamps[i].born) / LIFETIME
        if (t >= 1) {
          stamps.splice(i, 1)
          continue
        }
        const ease = 1 - Math.pow(1 - t, 3)
        const r = R_START + (stamps[i].rmax - R_START) * ease
        carve(stamps[i].x, stamps[i].y, r, 1 - t * t, stamps[i].seed)
      }
      if (stamps.length) {
        requestAnimationFrame(loop)
      } else {
        running = false
        repaintFull()
      }
    }
    const start = () => {
      if (!running) {
        running = true
        requestAnimationFrame(loop)
      }
    }

    let lastX: number | null = null
    let lastY: number | null = null
    const addStamp = (x: number, y: number) => {
      if (stamps.length >= MAX_STAMPS) stamps.shift()
      stamps.push({
        x,
        y,
        born: performance.now(),
        seed: Math.random() * Math.PI * 2,
        rmax: R_END * (1 - R_VARY + Math.random() * R_VARY),
      })
    }
    const stampAlong = (x: number, y: number) => {
      const lx = lastX
      const ly = lastY
      if (lx === null || ly === null) {
        addStamp(x, y)
      } else {
        const dx = x - lx
        const dy = y - ly
        const dist = Math.hypot(dx, dy)
        if (dist < STEP) return
        const n = Math.min(Math.floor(dist / STEP), 8)
        for (let i = 1; i <= n; i += 1) addStamp(lx + (dx * i) / n, ly + (dy * i) / n)
      }
      lastX = x
      lastY = y
    }
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      stampAlong(e.clientX - r.left, e.clientY - r.top)
      start()
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    hero.addEventListener('mousemove', onMove)
    return () => {
      ro.disconnect()
      hero.removeEventListener('mousemove', onMove)
    }
  }, [])

  return <canvas ref={ref} className={styles.veil} aria-hidden="true" />
}
