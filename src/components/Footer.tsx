import { Link } from 'react-router-dom'
import Rule from './common/Rule'
import { useTheme } from '../hooks/useTheme'
import styles from './Footer.module.css'

/** 页脚:站内入口 + 来源承诺摘要(完整「来源承诺」区块随首页章节实现)。 */
export default function Footer() {
  const { mode, toggle } = useTheme()
  const nextLabel = mode === 'qing' ? '灯下' : '晴窗'
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* G07 金线收头:云纹端头线替换原 border-top(接入点 3-4) */}
        <Rule kind="cloud" className={styles.topRule} />
        <div className={styles.brandCol}>
          <p className={styles.brandName}>山海万象录</p>
          <p className={styles.brandSub}>SHAN HAI ARCHIVE</p>
          <p className={styles.promise}>
            原文逐字对照所据底本录入;释义为本站以现代汉语撰写,与古籍原文明确分离;
            插画:清《古今图书集成》版画(公有领域)与原创 SVG 演绎,逐幅标注。
          </p>
        </div>
        <nav className={styles.linkCol} aria-label="页脚导航">
          <p className={styles.colTitle}>站内</p>
          <ul>
            <li>
              <Link to="/chapters">古籍篇章</Link>
            </li>
            <li>
              <Link to="/favorites">收藏</Link>
            </li>
            <li>
              <Link to="/about">资料来源与制作说明</Link>
            </li>
            {/* G27 凡例页入口 */}
            <li>
              <Link to="/how-to-read">如何读本站(凡例)</Link>
            </li>
          </ul>
        </nav>
        <div className={styles.linkCol}>
          <p className={styles.colTitle}>编纂进度</p>
          <p className={styles.progressNote}>
            本站由自动化编纂流水线逐轮构建,当前十二条条目已全部经逐字核验开放,
            山川舆图与古卷阅读同步展开;未经核验的资料一律标注存疑。
          </p>
        </div>
      </div>
      <div className={styles.colophon}>
        {/* G31 主题切换:按钮示将切往的主题;切换零动画(useTheme 压平过渡) */}
        <div className={styles.colophonInner}>
          <p className={styles.colophonText}>
            据古籍意象艺术演绎 · 内容核验状态以各条目标注为准
          </p>
          <button
            type="button"
            className={styles.themeToggle}
            onClick={toggle}
            aria-label={`切换至${nextLabel}主题`}
          >
            {mode === 'qing' ? '◑ 灯下' : '◐ 晴窗'}
          </button>
        </div>
      </div>
    </footer>
  )
}
