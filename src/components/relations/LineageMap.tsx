import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CHAPTERS } from '../../data/chapters'
import { ENTITIES, ENTITY_TYPE_LABELS, RECORD_STATUS_LABELS } from '../../data/entities'
import { LOCATIONS } from '../../data/locations'
import type { ChapterMeta, Entity, Location } from '../../data/types'
import styles from './LineageMap.module.css'

/**
 * 谱系三方关系图(G33):异兽—山川—篇章。
 * 语言与 ConceptMap 同族:宣纸底/朱砂点(条目)/旧金签(篇章)/墨字标签(山川)。
 * 数据全部由 CHAPTERS/LOCATIONS/ENTITIES 派生,不维护第三份关系数据;
 * 只画数据字段可核对的归属与栖居关系,不虚构血缘或敌对连线。
 */

type Selection = { kind: 'entity' | 'location' | 'chapter'; id: string } | null

const X_CHAPTER = 96 // 篇章签中心
const X_ENTITY = 470 // 条目列
const X_LOCATION = 868 // 山川列
const ROW_GAP = 30
const GROUP_GAP = 50
const TOP_Y = 82
const SIGN_W = 132

/** 南山经组内按子经排序(一经→二经→三经);其余篇章保持录入顺序 */
const SUB_CLASSIC_ORDER: Record<string, number> = {
  南次一经: 1,
  南次二经: 2,
  南次三经: 3,
}

interface ChapterGroup {
  chapter: ChapterMeta
  rows: Location[]
}

const chapterById = new Map(CHAPTERS.map((c) => [c.id, c]))

const GROUPS: ChapterGroup[] = CHAPTERS.filter((c) => LOCATIONS.some((l) => l.chapterId === c.id))
  .sort((a, b) => a.order - b.order)
  .map((chapter) => ({
    chapter,
    rows: LOCATIONS.filter((l) => l.chapterId === chapter.id)
      .slice()
      .sort(
        (a, b) =>
          (SUB_CLASSIC_ORDER[a.subClassic ?? ''] ?? 0) - (SUB_CLASSIC_ORDER[b.subClassic ?? ''] ?? 0) ||
          LOCATIONS.indexOf(a) - LOCATIONS.indexOf(b),
      ),
  }))

const LOC_Y = new Map<string, number>()
let cursor = TOP_Y
for (const group of GROUPS) {
  group.rows.forEach((loc, i) => LOC_Y.set(loc.id, cursor + i * ROW_GAP))
  cursor += group.rows.length * ROW_GAP + GROUP_GAP
}
export const LINEAGE_VIEW_H = cursor - GROUP_GAP + 58

/** 条目行:y 与其栖居山川同行,连线严格水平 */
interface EntityRow {
  entity: Entity
  y: number
  loc: Location
}

const ENTITY_ROWS: EntityRow[] = ENTITIES.flatMap((entity) => {
  const loc = LOCATIONS.find((l) => entity.locationIds.includes(l.id))
  return loc && LOC_Y.has(loc.id) ? [{ entity, loc, y: LOC_Y.get(loc.id)! }] : []
})

const RELATED_ENTITIES = new Map<string, Entity[]>(
  LOCATIONS.map((loc) => [loc.id, ENTITIES.filter((e) => e.locationIds.includes(loc.id))]),
)

function chapterY(group: ChapterGroup) {
  const ys = group.rows.map((l) => LOC_Y.get(l.id) ?? 0)
  return (Math.min(...ys) + Math.max(...ys)) / 2
}

/** G33 谱系三方关系图:异兽(朱砂点)—山川(墨点)—篇章(旧金签) */
export default function LineageMap() {
  const [selected, setSelected] = useState<Selection>(null)

  const isEntityActive = (id: string) => selected?.kind === 'entity' && selected.id === id
  const isLocActive = (id: string) => selected?.kind === 'location' && selected.id === id
  const isChapterActive = (id: string) => selected?.kind === 'chapter' && selected.id === id
  /** 选中山川/条目时,高亮该山的归属线与栖居线 */
  const locHighlighted = (locId: string) =>
    isLocActive(locId) ||
    (selected?.kind === 'entity' && ENTITY_ROWS.some((r) => r.entity.id === selected.id && r.loc.id === locId))

  const activate = (next: NonNullable<Selection>) => setSelected((prev) => (prev && prev.kind === next.kind && prev.id === next.id ? null : next))

  return (
    <div className={styles.mapWrap} onKeyDown={(e) => e.key === 'Escape' && setSelected(null)}>
      <svg
        viewBox={`0 0 1000 ${LINEAGE_VIEW_H}`}
        preserveAspectRatio="xMidYMid meet"
        className={styles.map}
        role="group"
        aria-label={`谱系三方关系图:${GROUPS.length}个篇章、${LOCATIONS.length}座山川与${ENTITY_ROWS.length}个条目的归属与栖居关系`}
      >
        {/* 宣纸底纹:淡墨等高线(与山川图同族语言,G13) */}
        <g fill="none" stroke="var(--paper-ink)" strokeWidth="1">
          <path d="M-20 180 C160 140 340 190 520 156 C700 122 860 172 1020 142" opacity="0.1" />
          <path d="M-20 420 C200 384 380 428 560 398 C740 368 900 414 1020 386" opacity="0.07" />
          <path d="M-20 660 C220 624 400 668 580 640 C760 610 920 654 1020 628" opacity="0.05" />
          <path d="M-20 880 C240 846 420 888 600 862 C780 834 940 876 1020 852" opacity="0.04" />
        </g>
        <ellipse cx="500" cy="500" rx="470" ry="150" fill="rgba(38, 48, 43, 0.025)" />

        {/* 列首题识(墨字,宣纸晕防压线) */}
        {[
          { label: '篇章', x: X_CHAPTER },
          { label: '条目', x: X_ENTITY },
          { label: '山川', x: X_LOCATION },
        ].map((col) => (
          <text
            key={col.label}
            x={col.x}
            y={34}
            textAnchor="middle"
            fill="var(--paper-muted)"
            fontSize="14"
            letterSpacing="6"
            fontFamily="var(--font-serif)"
          >
            {col.label}
          </text>
        ))}

        {/* 篇章归属线(淡金长虚线,签右端→山川左缘,底层) */}
        {GROUPS.map((group) =>
          group.rows.map((loc) => {
            const y = LOC_Y.get(loc.id) ?? 0
            const active = locHighlighted(loc.id)
            return (
              <line
                key={`belong-${loc.id}`}
                x1={X_CHAPTER + SIGN_W / 2 + 6}
                y1={chapterY(group)}
                x2={X_LOCATION - 9}
                y2={y}
                stroke="var(--old-gold)"
                strokeWidth={active ? 1.8 : 1.1}
                strokeDasharray="3 6"
                opacity={active ? 0.85 : 0.3}
              />
            )
          }),
        )}

        {/* 栖居线(旧金实线=已核验条目;虚线=待考证条目),水平 */}
        {ENTITY_ROWS.map(({ entity, loc, y }) => {
          const active = isEntityActive(entity.id) || isLocActive(loc.id)
          return (
            <line
              key={`dwell-${entity.id}`}
              x1={X_ENTITY + 9}
              y1={y}
              x2={X_LOCATION - 9}
              y2={y}
              stroke="var(--old-gold)"
              strokeWidth={active ? 2 : 1.4}
              strokeDasharray={entity.recordStatus === 'unverified' ? '5 4' : undefined}
              opacity={active ? 0.95 : 0.75}
            />
          )
        })}

        {/* 篇章旧金签 */}
        {GROUPS.map((group) => {
          const y = chapterY(group)
          const active = isChapterActive(group.chapter.id)
          const beastCount = ENTITY_ROWS.filter((r) => r.entity.chapterIds.includes(group.chapter.id)).length
          return (
            <g
              key={group.chapter.id}
              role="button"
              tabIndex={0}
              aria-pressed={active}
              aria-label={`篇章${group.chapter.name},收录山川${group.rows.length}座、条目${beastCount}个`}
              className={styles.node}
              onClick={() => activate({ kind: 'chapter', id: group.chapter.id })}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  activate({ kind: 'chapter', id: group.chapter.id })
                }
              }}
            >
              {/* 透明命中区:44px 触控 */}
              <rect x={X_CHAPTER - SIGN_W / 2} y={y - 22} width={SIGN_W} height={44} fill="transparent" />
              <rect
                x={X_CHAPTER - SIGN_W / 2}
                y={y - 13}
                width={SIGN_W}
                height={26}
                fill="var(--surface-paper)"
                stroke={active ? 'var(--cinnabar)' : 'var(--old-gold)'}
                strokeWidth={active ? 1.8 : 1.2}
              />
              <text
                x={X_CHAPTER}
                y={y + 5.5}
                textAnchor="middle"
                fill="var(--paper-ink)"
                fontSize="14"
                letterSpacing="3"
                fontFamily="var(--font-serif)"
              >
                {group.chapter.name}
              </text>
              <text
                x={X_CHAPTER}
                y={y + 30}
                textAnchor="middle"
                fill="var(--paper-muted)"
                fontSize="10.5"
                letterSpacing="1"
              >
                {`${group.rows.length}山 · ${beastCount}目`}
              </text>
            </g>
          )
        })}

        {/* 山川节点(墨点;未关联条目的山淡墨) */}
        {LOCATIONS.map((loc) => {
          const y = LOC_Y.get(loc.id) ?? 0
          const active = isLocActive(loc.id)
          const hasEntity = (RELATED_ENTITIES.get(loc.id)?.length ?? 0) > 0
          return (
            <g
              key={loc.id}
              role="button"
              tabIndex={0}
              aria-pressed={active}
              aria-label={`山川${loc.canonicalName}${loc.subClassic ? `,属${loc.subClassic}` : ''}${hasEntity ? ',有已录条目' : ',暂无已录条目'}`}
              className={styles.node}
              onClick={() => activate({ kind: 'location', id: loc.id })}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  activate({ kind: 'location', id: loc.id })
                }
              }}
            >
              <title>{loc.canonicalName}</title>
              {/* 透明命中区:r32,390 档横滚后 ≥44px(与山川图同口径) */}
              <circle cx={X_LOCATION} cy={y} r="32" fill="transparent" stroke="none" />
              <circle
                cx={X_LOCATION}
                cy={y}
                r={active ? 7.5 : 5.5}
                fill="var(--paper-ink)"
                fillOpacity={hasEntity ? 0.82 : 0.4}
                stroke={active ? 'var(--old-gold)' : 'var(--surface-paper)'}
                strokeWidth={active ? 2 : 1}
                className={styles.nodeDot}
              />
              <text
                x={X_LOCATION + 14}
                y={y + 4.5}
                textAnchor="start"
                fill="var(--paper-ink)"
                fillOpacity={hasEntity ? 1 : 0.68}
                fontSize="13"
                fontFamily="var(--font-serif)"
                className={styles.nodeLabel}
              >
                {loc.canonicalName}
              </text>
            </g>
          )
        })}

        {/* 条目节点(朱砂点;待考证条目空心) */}
        {ENTITY_ROWS.map(({ entity, y }) => {
          const active = isEntityActive(entity.id)
          const unverified = entity.recordStatus === 'unverified'
          return (
            <g
              key={entity.id}
              role="button"
              tabIndex={0}
              aria-pressed={active}
              aria-label={`条目${entity.canonicalName},${ENTITY_TYPE_LABELS[entity.type]},${RECORD_STATUS_LABELS[entity.recordStatus]}`}
              className={styles.node}
              onClick={() => activate({ kind: 'entity', id: entity.id })}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  activate({ kind: 'entity', id: entity.id })
                }
              }}
            >
              <title>{entity.canonicalName}</title>
              <circle cx={X_ENTITY} cy={y} r="32" fill="transparent" stroke="none" />
              <circle
                cx={X_ENTITY}
                cy={y}
                r={active ? 8 : 6}
                fill={unverified ? 'var(--surface-paper)' : 'var(--cinnabar)'}
                stroke={active ? 'var(--old-gold)' : 'var(--cinnabar)'}
                strokeWidth={active ? 2 : unverified ? 1.4 : 1}
                className={styles.nodeDot}
              />
              <text
                x={X_ENTITY - 14}
                y={y + 4.5}
                textAnchor="end"
                fill="var(--paper-ink)"
                fillOpacity={unverified ? 0.75 : 1}
                fontSize="13"
                fontFamily="var(--font-serif)"
                className={styles.nodeLabel}
              >
                {entity.canonicalName}
              </text>
            </g>
          )
        })}
      </svg>

      {/* 选中节点信息面板(aria-live 感知切换) */}
      <div aria-live="polite">
        {selected && (
          <aside className={styles.panel} aria-label="选中节点信息">
            {selected.kind === 'entity' &&
            (() => {
              const row = ENTITY_ROWS.find((r) => r.entity.id === selected.id)
              if (!row) return null
              const { entity, loc } = row
              const chapter = chapterById.get(entity.chapterIds[0])
              return (
                <>
                  <p className={styles.panelName}>
                    {entity.canonicalName}
                    <span className={styles.panelAlias}>{entity.pinyin}</span>
                  </p>
                  <p className={styles.panelMeta}>
                    {`${ENTITY_TYPE_LABELS[entity.type]} · ${RECORD_STATUS_LABELS[entity.recordStatus]} · 栖居${loc.canonicalName}${chapter ? ` · 见${chapter.name}` : ''}`}
                  </p>
                  <Link className={styles.panelLink} to={`/catalog/${entity.slug}`}>
                    查看条目:{entity.canonicalName} →
                  </Link>
                </>
              )
            })()}
            {selected.kind === 'location' &&
            (() => {
              const loc = LOCATIONS.find((l) => l.id === selected.id)
              if (!loc) return null
              const chapter = chapterById.get(loc.chapterId)
              const related = RELATED_ENTITIES.get(loc.id) ?? []
              return (
                <>
                  <p className={styles.panelName}>{loc.canonicalName}</p>
                  <p className={styles.panelMeta}>
                    {chapter ? `${chapter.name}${loc.subClassic ? ` · ${loc.subClassic}` : ''}` : ''}
                    {loc.sourceDirection || loc.sourceDistance
                      ? ` · ${loc.sourceDirection ?? ''}${loc.sourceDistance ?? ''}`
                      : ''}
                  </p>
                  {related.length > 0 ? (
                    related.map((entity) => (
                      <Link key={entity.id} className={styles.panelLink} to={`/catalog/${entity.slug}`}>
                        查看关联条目:{entity.canonicalName} →
                      </Link>
                    ))
                  ) : (
                    <p className={styles.panelMeta}>此山暂无已录条目,原文与核验见古卷。</p>
                  )}
                </>
              )
            })()}
            {selected.kind === 'chapter' &&
            (() => {
              const group = GROUPS.find((g) => g.chapter.id === selected.id)
              if (!group) return null
              const beastCount = ENTITY_ROWS.filter((r) => r.entity.chapterIds.includes(group.chapter.id)).length
              return (
                <>
                  <p className={styles.panelName}>{group.chapter.name}</p>
                  <p className={styles.panelMeta}>
                    {`收录山川${group.rows.length}座 · 已录条目${beastCount}个 · 通行本第${group.chapter.order}篇`}
                  </p>
                  <Link className={styles.panelLink} to={`/chapters/${group.chapter.slug}`}>
                    阅读本篇 →
                  </Link>
                </>
              )
            })()}
            <button type="button" className={styles.panelClose} onClick={() => setSelected(null)}>
              收起
            </button>
          </aside>
        )}
      </div>

      {/* 图例 */}
      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={styles.legendBeast} /> 条目(空心=待考证)
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendLoc} /> 山川(淡=暂无已录条目)
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendSign}>签</span> 篇章
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendSolid} /> 栖居(已核验)
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendDash} /> 栖居(待考证)
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendBelong} /> 篇章归属
        </span>
        <span className={styles.legendItem}>点选节点查看详情,Esc 或「收起」关闭</span>
      </div>

      <p className={styles.disclaimer}>
        三方关系只呈现本站已录入数据可回溯的两类连接:条目栖居山川、山川归属篇章。
        不虚构血缘、敌对或后世传说谱系;山川未录条目不代表原文无载,只代表尚未录入。
      </p>
    </div>
  )
}
