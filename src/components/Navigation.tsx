import { NavLink } from 'react-router-dom'
import { NAV_ITEMS } from './Layout'
import styles from './Navigation.module.css'

export default function Navigation() {
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
        <nav className={styles.nav} aria-label="主导航">
          <ul className={styles.navList}>
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
