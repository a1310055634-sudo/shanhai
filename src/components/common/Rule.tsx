import styles from './Rule.module.css'

export type RuleOrnament = 'cloud' | 'meander' | 'fangsheng'

/**
 * G07 端头纹样(原创声明):三枚小 SVG 均为本项目参照传统公共形制
 * (如意云拱/雷纹回字/方胜双菱)自绘的 path,无外部素材来源;
 * 形制本身属公有领域,本实现不受版权约束。出处记录:
 * GALLERY_DESIGN.md §3.2。
 */
const ORNAMENT_PATHS: Record<RuleOrnament, string> = {
  /* 云纹:底横线 + 双拱相连的如意云勾 */
  cloud: 'M2 12.5 H14 M4.5 12.5 C4.5 9 7.5 9 8.5 10.5 C9.5 8 12.5 8.5 12.5 12.5',
  /* 回纹:雷纹单元,一笔方螺旋 */
  meander: 'M2.5 13.5 V2.5 H13.5 V10 H6.5 V6 H10',
  /* 方胜:两菱相扣(两个旋转 45° 的方形交叠) */
  fangsheng:
    'M6.2 1.8 L10.6 6.2 L6.2 10.6 L1.8 6.2 Z M9.8 5.4 L14.2 9.8 L9.8 14.2 L5.4 9.8 Z',
}

/** 单枚端头纹样(供轨道端点等只需一处纹样的落点使用)。 */
export function RuleOrnamentIcon({
  kind,
  className,
}: {
  kind: RuleOrnament
  className?: string
}) {
  return (
    <svg
      className={className ?? styles.icon}
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={ORNAMENT_PATHS[kind]}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

interface RuleProps {
  kind?: RuleOrnament
  className?: string
}

/**
 * 金线收头:纹样—线—纹样的对称分隔线。
 * 视觉重量刻意低于正文(13px 纹样 + 1px 细线 + 旧金),只做节奏收束。
 */
export default function Rule({ kind = 'cloud', className }: RuleProps) {
  return (
    <div className={className ? `${styles.rule} ${className}` : styles.rule} aria-hidden="true">
      <RuleOrnamentIcon kind={kind} />
      <span className={styles.line} />
      <RuleOrnamentIcon kind={kind} />
    </div>
  )
}
