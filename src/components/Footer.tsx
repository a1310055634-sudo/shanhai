import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

/** 页脚:站内入口 + 来源承诺摘要(完整「来源承诺」区块随首页章节实现)。 */
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <p className={styles.brandName}>山海万象录</p>
          <p className={styles.brandSub}>SHAN HAI ARCHIVE</p>
          <p className={styles.promise}>
            原文逐字对照所据底本录入;释义为本站以现代汉语撰写,与古籍原文明确分离;
            全部插画为据原文描述的艺术演绎。
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
          </ul>
        </nav>
        <div className={styles.linkCol}>
          <p className={styles.colTitle}>编纂进度</p>
          <p className={styles.progressNote}>
            本站由自动化编纂流水线逐轮构建,当前十二卷条目已全部经逐字核验开放,
            山川舆图与古卷阅读同步展开;未经核验的资料一律标注存疑。
          </p>
        </div>
      </div>
      <div className={styles.colophon}>
        <p>据古籍意象艺术演绎 · 内容核验状态以各条目标注为准</p>
      </div>
    </footer>
  )
}
