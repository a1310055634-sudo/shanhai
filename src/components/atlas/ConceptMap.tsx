import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LOCATIONS } from '../../data/locations'
import { ENTITIES } from '../../data/entities'
import styles from './ConceptMap.module.css'

/**
 * 古籍内部叙事概念地图(规范第七节):
 * 分区 + 山川节点 + 已核验的相邻链条;坐标为本站概念坐标,非现实经纬度。
 * 只绘制已逐字核验的相邻关系(泰器—槐江—昆仑),不虚构连线。
 */
export const VERIFIED_LINKS: Array<{
  from: string
  to: string
  label: string
  /** 里距注相对线段中点的纵向偏移;默认 +18(线下方),拥挤处可移至线上方 */
  labelDy?: number
  /** 里距注相对线段中点的横向偏移(G13 西山经三角区避让节点标签) */
  labelDx?: number
}> = [
  { from: 'loc-taiqi', to: 'loc-huaijiang', label: '又西三百二十里' },
  { from: 'loc-huaijiang', to: 'loc-kunlun', label: '西南四百里', labelDx: 14, labelDy: -11 },
]

const REGION_LABELS: Array<{ region: string; x: number; y: number }> = [
  { region: '北山经', x: 150, y: 52 },
  { region: '海外北经', x: 420, y: 40 },
  { region: '西山经', x: 555, y: 96 },
  { region: '大荒东经', x: 845, y: 210 },
  { region: '南山经', x: 235, y: 588 },
]

const REGION_FILLS: Record<string, string> = {
  南山经: 'rgba(38, 48, 43, 0.05)',
  西山经: 'rgba(38, 48, 43, 0.04)',
  北山经: 'rgba(38, 48, 43, 0.035)',
  海外北经: 'rgba(38, 48, 43, 0.03)',
  大荒东经: 'rgba(38, 48, 43, 0.045)',
}

export default function ConceptMap({ mode = 'link' }: { mode?: 'link' | 'select' }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const pos = (id: string) => {
    const loc = LOCATIONS.find((l) => l.id === id)!
    return { x: loc.mapPosition.x * 10, y: loc.mapPosition.y * 6.2, loc }
  }

  return (
    <div className={styles.mapWrap}>
      <svg
        viewBox="0 0 1000 620"
        preserveAspectRatio="xMidYMid meet"
        className={styles.map}
        role="img"
        aria-label={`山海经古籍内部叙事概念地图:${LOCATIONS.length}座已核验山川节点的分区示意`}
      >
        {/* G50 山川图晕染:feTurbulence 程序化淡墨晕染(原创滤镜 1 处,记 DESIGN 纹样台账;
            墨云噪点染色置于等高线之下,位图不进图内;seed 定数保证双主题渲染一致) */}
        <defs>
          <filter id="inkWash" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.011 0.017" numOctaves="3" seed="7" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.10  0 0 0 0 0.12  0 0 0 0 0.11  0 0 0 0.42 0"
            />
          </filter>
        </defs>
        <rect width="1000" height="620" filter="url(#inkWash)" opacity="0.42" aria-hidden="true" />
        {/* G64 古地图界栏双线边框(纹样 +1,记 DESIGN 台账):外粗内细,色走边框令牌 */}
        <rect x="1" y="1" width="998" height="618" fill="none" stroke="var(--border-strong)" strokeWidth="1.5" aria-hidden="true" />
        <rect x="7" y="7" width="986" height="606" fill="none" stroke="var(--border-normal)" strokeWidth="0.75" aria-hidden="true" />
        {/* 等高线底纹(G13 宣纸化:青绿→墨线) */}
        <g fill="none" stroke="var(--paper-ink)" strokeWidth="1">
          <path d="M-20 140 C160 96 340 150 520 112 C700 76 860 128 1020 96" opacity="0.12" />
          <path d="M-20 210 C180 170 360 216 540 184 C720 152 880 200 1020 172" opacity="0.1" />
          <path d="M-20 330 C200 292 380 338 560 306 C740 274 900 320 1020 292" opacity="0.08" />
          <path d="M-20 470 C220 430 400 478 580 448 C760 418 920 462 1020 436" opacity="0.06" />
          <path d="M-20 560 C240 522 420 566 600 538 C780 510 940 552 1020 528" opacity="0.05" />
        </g>
        {/* 雾层(装饰,宣纸上以淡墨代月白) */}
        <ellipse cx="500" cy="330" rx="470" ry="130" fill="rgba(38, 48, 43, 0.03)" />
        <ellipse cx="260" cy="520" rx="220" ry="80" fill="rgba(38, 48, 43, 0.035)" />

        {/* 分区 */}
        {(
          [
            { region: '南山经', x: 30, y: 360, w: 700, h: 240 },
            { region: '西山经', x: 520, y: 100, w: 190, h: 130 },
            { region: '北山经', x: 60, y: 40, w: 190, h: 90 },
            { region: '海外北经', x: 330, y: 26, w: 180, h: 80 },
            { region: '大荒东经', x: 760, y: 20, w: 210, h: 400 },
          ] as const
        ).map((z) => (
          <g key={z.region}>
            <rect
              x={z.x}
              y={z.y}
              width={z.w}
              height={z.h}
              rx="8"
              fill={REGION_FILLS[z.region]}
              stroke={z.region === '南山经' ? 'var(--old-gold)' : 'rgba(38, 48, 43, 0.3)'}
              strokeOpacity={z.region === '南山经' ? 0.55 : 1}
              strokeWidth={z.region === '南山经' ? 1.4 : 1}
              strokeDasharray={z.region === '南山经' ? undefined : '4 5'}
            />
          </g>
        ))}
        {/* E13:南次一经主线标识 + 图内行旅入口(G13 宣纸签化) */}
        <g className={styles.journeyBadge}>
          <rect x="44" y="376" rx="0" width="150" height="22" fill="var(--surface-paper)" stroke="var(--border-normal)" />
          <text x="119" y="391" textAnchor="middle" fill="var(--paper-ink)" fontSize="12" letterSpacing="2" fontFamily="var(--font-serif)">
            南次一经 · 行旅已开通
          </text>
        </g>
        <a href="/journeys/nanci-yi" className={styles.mapJourneyLink}>
          {/* G37:SVG 文本命中区仅 14px 高。舆图在 390 档以 min-width 760 呈现(viewBox 宽 1000,
              缩放 0.76),故 44 CSS px 命中高度需 44/0.76 ≈ 58 用户单位;x 取文本实际跨度,
              避免覆盖邻近节点命中区(重叠检测见 dev/round37-browser.mjs)。 */}
          <rect x="548" y="366" width="96" height="58" fill="transparent" />
          <text x="638" y="391" textAnchor="end" fill="var(--paper-ink)" fontSize="12.5" letterSpacing="1.5" fontFamily="var(--font-serif)">
            进入山海行旅 →
          </text>
        </a>
        {REGION_LABELS.map((r) => (
          <text
            key={r.region}
            x={r.x}
            y={r.y}
            textAnchor="middle"
            fill="var(--paper-muted)"
            fontSize="15"
            letterSpacing="4"
            fontFamily="var(--font-serif)"
          >
            {r.region}
          </text>
        ))}

        {/* 已核验相邻链条(旧金线+墨字里距注,宣纸晕防压线) */}
        {VERIFIED_LINKS.map((link) => {
          const a = pos(link.from)
          const b = pos(link.to)
          const labelDy = link.labelDy ?? 18
          const labelDx = link.labelDx ?? 0
          return (
            <g key={`${link.from}-${link.to}`}>
              <line
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="var(--old-gold)"
                strokeWidth="1.4"
                strokeDasharray="5 4"
                opacity="0.8"
              />
              <text
                x={(a.x + b.x) / 2 + labelDx}
                y={(a.y + b.y) / 2 + labelDy}
                textAnchor="middle"
                fill="var(--paper-muted)"
                fontSize="11"
                stroke="var(--surface-paper)"
                strokeWidth="3"
                paintOrder="stroke"
              >
                {link.label}
              </text>
            </g>
          )
        })}

        {/* 山川节点:link 模式直达关联条目;select 模式点选展示信息面板 */}
        {LOCATIONS.map((loc) => {
          const p = { x: loc.mapPosition.x * 10, y: loc.mapPosition.y * 6.2 }
          const entity = ENTITIES.find((e) => loc.relatedEntityIds.includes(e.id))
          const isSelected = mode === 'select' && selectedId === loc.id
          const isVerified = loc.recordStatus === 'verified'
          const nodeBody = (
            <>
              {/* 透明命中区:r32 使 390(×0.76≈48px)与 768(×0.69≈44px)档触控达标 */}
              <circle cx={p.x} cy={p.y} r="32" fill="transparent" stroke="none" />
              {/* G64 印章化两态:朱砂方印=已核验 / 虚线墨圈=待考证(同 12px 足迹,标签零重叠不受扰;
                  空心虚线在双主题底上均可见——paper-muted 为 G32 实测对比度令牌) */}
              {isVerified ? (
                <rect
                  x={p.x - 6}
                  y={p.y - 6}
                  width="12"
                  height="12"
                  fill="var(--cinnabar)"
                  stroke={isSelected ? 'var(--old-gold)' : 'var(--surface-paper)'}
                  strokeWidth={isSelected ? 2 : 1}
                  className={styles.nodeDot}
                />
              ) : (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isSelected ? 6.5 : 5}
                  fill="none"
                  stroke={isSelected ? 'var(--old-gold)' : 'var(--paper-muted)'}
                  strokeWidth={isSelected ? 2 : 1.5}
                  strokeDasharray="3 2"
                  className={styles.nodeDot}
                />
              )}
              <text
                x={p.x}
                y={p.y + 22}
                textAnchor="middle"
                fill="var(--paper-ink)"
                fontSize="13"
                className={styles.nodeLabel}
              >
                {loc.canonicalName}
              </text>
              {isSelected && (
                <line
                  x1={p.x - 16}
                  y1={p.y + 30}
                  x2={p.x + 16}
                  y2={p.y + 30}
                  stroke="var(--old-gold)"
                  strokeWidth="1.5"
                />
              )}
            </>
          )
          return (
            <g key={loc.id} className={styles.node}>
              <title>{loc.canonicalName}</title>
              {mode === 'link' && entity ? (
                <a href={`/catalog/${entity.slug}`}>{nodeBody}</a>
              ) : (
                <g
                  role="button"
                  tabIndex={0}
                  aria-label={`查看${loc.canonicalName}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedId(isSelected ? null : loc.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setSelectedId(isSelected ? null : loc.id)
                    }
                  }}
                >
                  {nodeBody}
                </g>
              )}
            </g>
          )
        })}
        {/* G64 图例(svg 内,link/select 两模式均可见):印/圈两态说明,楷体小字走令牌 */}
        <text
          x="20"
          y="608"
          textAnchor="start"
          fill="var(--paper-muted)"
          fontSize="11.5"
          letterSpacing="1.5"
          fontFamily="var(--font-title)"
        >
          朱砂方印 = 已核验 · 虚线墨圈 = 待考证
        </text>
      </svg>
      {mode === 'select' && selectedId && (
        (() => {
          const loc = LOCATIONS.find((l) => l.id === selectedId)
          if (!loc) return null
          const entity = ENTITIES.find((e) => loc.relatedEntityIds.includes(e.id))
          return (
            <aside className={styles.panel} aria-label="选中地点信息">
              <p className={styles.panelName}>{loc.canonicalName}</p>
              <p className={styles.panelMeta}>
                {loc.sourceDirection && `${loc.sourceDirection} `}
                {loc.sourceDistance}
                {loc.citations[0]?.chapter && ` · ${loc.citations[0].chapter}`}
              </p>
              {loc.citations[0] && (
                <blockquote className={styles.panelCite}>
                  {loc.citations[0].originalText}
                </blockquote>
              )}
              {entity && (
                <Link className={styles.panelLink} to={`/catalog/${entity.slug}`}>
                  查看关联条目:{entity.canonicalName} →
                </Link>
              )}
            </aside>
          )
        })()
      )}
      {mode === 'select' && (
        <div className={styles.legend}>
          <span className={styles.legendItem}>
            <span className={styles.legendDot} /> 朱砂方印 = 已核验地点
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendRing} aria-hidden="true" /> 虚线墨圈 = 待考证地点
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendLine} aria-hidden="true" /> 已核验路线(附原文里距)
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendDash} aria-hidden="true" /> 待补路线(未录入山段)
          </span>
          <span className={styles.legendItem}>点击节点查看详情</span>
        </div>
      )}
      <p className={styles.disclaimer}>
        《山海经》地理与现实地理的对应关系存在诸多争议。本图用于呈现古籍内部的叙事关系,并非现代地理定位。
      </p>
    </div>
  )
}
