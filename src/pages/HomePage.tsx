import styles from './HomePage.module.css'

/**
 * 阶段 0 占位卷首:仅确认容器、字体与配色链路可用。
 * 正式首页(山海开卷首屏、今日异兽、三条探索路径等)在阶段 1/2 实现。
 */
export default function HomePage() {
  return (
    <main className={styles.page} id="main">
      <header className={styles.masthead}>
        <p className={styles.volumeMark}>卷首 · 试刊</p>
        <h1 className={styles.title}>山海万象录</h1>
        <p className={styles.subtitle}>SHAN HAI ARCHIVE</p>
      </header>
      <section className={styles.note}>
        <p>
          本站是一部可以阅读、检索和探索的《山海经》数字异闻志,正在逐卷编纂之中。
        </p>
        <p className={styles.muted}>
          当前为架构搭建阶段:图鉴、山川、古卷与谱系将随后续轮次逐层展开。
        </p>
      </section>
    </main>
  )
}
