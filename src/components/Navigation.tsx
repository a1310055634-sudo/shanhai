import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { NAV_ITEMS } from './Layout'
import styles from './Navigation.module.css'

export default function Navigation() {
  // P01:窄屏导航横向滚动——隐藏原生滚动条,以两侧渐隐提示可滑动(滑到头则该侧渐隐消失)
  const listRef = useRef<HTMLUListElement>(null)
  const [fade, setFade] = useState({ left: false, right: false })

  const updateFade = () => {
    const el = listRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setFade({ left: el.scrollLeft > 2, right: el.scrollLeft < max - 2 })
  }

  useEffect(() => {
    updateFade()
    const el = listRef.current
    if (!el) return
    el.addEventListener('scroll', updateFade, { passive: true })
    window.addEventListener('resize', updateFade)
    return () => {
      el.removeEventListener('scroll', updateFade)
      window.removeEventListener('resize', updateFade)
    }
  }, [])

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.brand} aria-label="山海万象录,返回卷首">
          <span className={styles.brandSeal} aria-hidden="true">
            山
          </span>
          <span className={styles.brandText}>
            <span className={styles.brandName}>山海万象录</span>
            <span className={styles.brandSub}>SHAN HAI ARCHIVE</span>
          </span>
        </NavLink>
        <nav
          className={`${styles.nav} ${fade.left ? styles.fadeLeft : ''} ${fade.right ? styles.fadeRight : ''}`.trim()}
          aria-label="主导航"
        >
          <ul ref={listRef} className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
