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
}> = [
  { from: 'loc-taiqi', to: 'loc-huaijiang', label: '又西三百二十里' },
  { from: 'loc-huaijiang', to: 'loc-kunlun', label: '西南四百里' },
]

const REGION_LABELS: Array<{ region: string; x: number; y: number }> = [
  { region: '北山经', x: 150, y: 52 },
  { region: '海外北经', x: 420, y: 40 },
  { region: '西山经', x: 555, y: 96 },
  { region: '大荒东经', x: 845, y: 210 },
  { region: '南山经', x: 235, y: 588 },
]

const REGION_FILLS: Record<string, string> = {
  南山经: 'rgba(88, 115, 103, 0.14)',
  西山经: 'rgba(88, 115, 103, 0.11)',
  北山经: 'rgba(88, 115, 103, 0.09)',
  海外北经: 'rgba(88, 115, 103, 0.08)',
  大荒东经: 'rgba(88, 115, 103, 0.12)',
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
        {/* 等高线底纹(装饰) */}
        <g fill="none" stroke="#31545A" strokeWidth="1">
          <path d="M-20 140 C160 96 340 150 520 112 C700 76 860 128 1020 96" opacity="0.16" />
          <path d="M-20 210 C180 170 360 216 540 184 C720 152 880 200 1020 172" opacity="0.13" />
          <path d="M-20 330 C200 292 380 338 560 306 C740 274 900 320 1020 292" opacity="0.1" />
          <path d="M-20 470 C220 430 400 478 580 448 C760 418 920 462 1020 436" opacity="0.08" />
          <path d="M-20 560 C240 522 420 566 600 538 C780 510 940 552 1020 528" opacity="0.06" />
        </g>
        {/* 雾层(装饰) */}
        <ellipse cx="500" cy="330" rx="470" ry="130" fill="#D9D6C9" opacity="0.025" />
        <ellipse cx="260" cy="520" rx="220" ry="80" fill="#D9D6C9" opacity="0.03" />

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
              stroke={z.region === '南山经' ? '#B18B56' : '#587367'}
              strokeOpacity={z.region === '南山经' ? 0.55 : 0.25}
              strokeWidth={z.region === '南山经' ? 1.4 : 1}
              strokeDasharray={z.region === '南山经' ? undefined : '4 5'}
            />
          </g>
        ))}
        {/* E13:南次一经主线标识 + 图内行旅入口 */}
        <g className={styles.journeyBadge}>
          <rect x="44" y="376" rx="3" width="150" height="22" fill="rgba(19,28,24,0.85)" stroke="#B18B56" strokeOpacity="0.6" />
          <text x="119" y="391" textAnchor="middle" fill="#F3EEE2" fontSize="12" letterSpacing="2" fontFamily="var(--font-serif)">
            南次一经 · 行旅已开通
          </text>
        </g>
        <a href="/journeys/nanci-yi" className={styles.mapJourneyLink}>
          <text x="638" y="391" textAnchor="end" fill="#B18B56" fontSize="12.5" letterSpacing="1.5" fontFamily="var(--font-serif)">
            进入山海行旅 →
          </text>
        </a>
        {REGION_LABELS.map((r) => (
          <text
            key={r.region}
            x={r.x}
            y={r.y}
            textAnchor="middle"
            fill="#B18B56"
            fontSize="15"
            letterSpacing="4"
            fontFamily="var(--font-serif)"
          >
            {r.region}
          </text>
        ))}

        {/* 已核验相邻链条 */}
        {VERIFIED_LINKS.map((link) => {
          const a = pos(link.from)
          const b = pos(link.to)
          return (
            <g key={`${link.from}-${link.to}`}>
              <line
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="#B18B56"
                strokeWidth="1.2"
                strokeDasharray="5 4"
                opacity="0.7"
              />
              <text
                x={(a.x + b.x) / 2}
                y={(a.y + b.y) / 2 + 18}
                textAnchor="middle"
                fill="#B18B56"
                fontSize="11"
                opacity="0.85"
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
          const nodeBody = (
            <>
              <circle cx={p.x} cy={p.y} r="13" fill="transparent" stroke="none" />
              <circle
                cx={p.x}
                cy={p.y}
                r={isSelected ? 8 : 6}
                fill={isSelected ? '#B18B56' : '#587367'}
                stroke={isSelected ? '#A74738' : '#F3EEE2'}
                strokeWidth={isSelected ? 2 : 1}
                className={styles.nodeDot}
              />
              <text
                x={p.x}
                y={p.y + 22}
                textAnchor="middle"
                fill={isSelected ? '#F3EEE2' : '#D9D6C9'}
                fontSize="13"
                className={styles.nodeLabel}
              >
                {loc.canonicalName}
              </text>
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
            <span className={styles.legendDot} /> 已核验地点
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendLine} aria-hidden="true" /> 已核验路线(附原文里距)
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendDash} aria-hidden="true" /> 待补资料(未录入山段)
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
