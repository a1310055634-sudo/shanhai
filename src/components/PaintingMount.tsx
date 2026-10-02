import type { ReactNode } from 'react'
import styles from './PaintingMount.module.css'

/**
 * G41 画卷装裱:绫边复用 G22 语言(6px 岩青绫带 + 内衬 1px 旧金界栏线 + 方角),
 * 诗塘四周 16px 宣纸留白;款识置于画下(figure 直系 figcaption),画上永不压正文。
 * children 为「画上浮卡」槽位(界栏卡/数据卡),使用方保证不放入正文文字层。
 * 灯下=挂轴模式(silk 带墨色投影,画是暗室中被灯照亮的实物);
 * 晴窗=平铺模式(去投影,html[data-theme='qing'] 覆写),色值全走令牌。
 */
interface PaintingMountProps {
  src: string
  alt: string
  width: number
  height: number
  caption: string
  credit?: string
  loading?: 'lazy' | 'eager'
  children?: ReactNode
}

export default function PaintingMount({
  src,
  alt,
  width,
  height,
  caption,
  credit,
  loading = 'lazy',
  children,
}: PaintingMountProps) {
  return (
    <figure className={styles.mount}>
      <div className={styles.silk}>
        <div className={styles.soup}>
          <img
            className={styles.painting}
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
          />
          {children ? <div className={styles.floatSlot}>{children}</div> : null}
        </div>
      </div>
      <figcaption className={styles.caption}>
        <span className={styles.captionTitle}>{caption}</span>
        {credit ? <span className={styles.captionCredit}>{credit}</span> : null}
      </figcaption>
    </figure>
  )
}
