import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import SectionHeading from '../components/SectionHeading'
import CitationBlock from '../components/CitationBlock'
import EmptyState from '../components/EmptyState'
import { ENTITIES, ENTITY_TYPE_LABELS, RECORD_STATUS_LABELS, getVerifiedEntities, getEntity } from '../data/entities'
import { getLocation } from '../data/locations'
import { CHAPTERS } from '../data/chapters'
import { useReadingHistory } from '../hooks/useReadingHistory'
import { findStationByEntity } from '../data/journey'
import { LOCATIONS as ALL_LOCATIONS } from '../data/locations'
import BeastArtwork from '../components/art/BeastArtwork'
import { classicScansFor } from '../components/art/classicScans'
import PaintingMount from '../components/PaintingMount'
import { classicArtFor } from '../data/classicArt'
import type { Entity, Trait } from '../data/types'
import styles from './EntityDetailPage.module.css'

/** 篇章 id → 篇名(统一从已核验数据解析,不得硬编码)。 */
function chapterName(id: string): string {
  return CHAPTERS.find((c) => c.id === id)?.name ?? id
}

/** 形貌档案分区(规范第六节第 4 条);kind → 展示名。 */
const TRAIT_SECTIONS: Array<{ kinds: Trait['kind'][]; label: string }> = [
  { kinds: ['appearance'], label: '整体形态与部位' },
  { kinds: ['behavior'], label: '行动方式' },
  { kinds: ['sound'], label: '声音' },
  { kinds: ['diet'], label: '食性' },
]

export default function EntityDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const entity = slug ? getEntity(slug) : undefined
  const { record } = useReadingHistory()

  useEffect(() => {
    if (entity) record(entity.slug)
  }, [entity, record])

  if (!entity) {
    return (
      <div className={styles.page}>
        <EmptyState
          title="此条尚未收录"
          description="图鉴中没有找到对应的条目。它可能尚未录入,或名称有误。"
          action={{ to: '/catalog', label: '返回图鉴' }}
        />
      </div>
    )
  }

  const index = ENTITIES.findIndex((e) => e.id === entity.id)
  const prev = index > 0 ? ENTITIES[index - 1] : undefined
  const next = index >= 0 && index < ENTITIES.length - 1 ? ENTITIES[index + 1] : undefined
  const locations = entity.locationIds
    .map((id) => getLocation(id))
    .filter((l): l is NonNullable<typeof l> => Boolean(l))
  const journeyStop = findStationByEntity(entity.id)

  // 关联漫游(规范第六节第 9 条):只推荐有真实交集的条目
  const sameChapter = ENTITIES.filter(
    (e) => e.id !== entity.id && e.chapterIds.some((c) => entity.chapterIds.includes(c)),
  )
  const sameLocation = ENTITIES.filter(
    (e) => e.id !== entity.id && e.locationIds.some((l) => entity.locationIds.includes(l)),
  )
  const similarTags = ENTITIES.filter(
    (e) => e.id !== entity.id && e.tags.some((t) => entity.tags.includes(t)),
  )
  const rollRandom = () => {
    const pool = getVerifiedEntities()
    navigate(`/catalog/${pool[Math.floor(Math.random() * pool.length)].slug}`)
  }

  return (
    <div className={styles.page}>
      {/* 条目首屏:图像欣赏 + 文本信息 */}
      <header className={styles.hero}>
        <div className={styles.heroInfo}>
          <p className={styles.kicker}>
            <span className={styles.seal} aria-hidden="true">
              {entity.canonicalName.slice(0, 1)}
            </span>
            <span>
              {ENTITY_TYPE_LABELS[entity.type]} · {RECORD_STATUS_LABELS[entity.recordStatus]}
            </span>
          </p>
          <h1 className={styles.name}>{entity.canonicalName}</h1>
          <p className={styles.pinyin}>{entity.pinyin}</p>
          {entity.aliases.length > 0 && (
            <p className={styles.aliases}>异名:{entity.aliases.join('、')}</p>
          )}
          <p className={styles.summary}>{entity.summary}</p>
          <p className={styles.chapterLine}>
            出自《山海经·{entity.chapterIds.map(chapterName).join('、')}》
          </p>
        </div>
        <div className={styles.heroArt}>
          {/* G61 古图×站内转描并陈:刻本原件装裱主位(PaintingMount,款识=刻本名·版次+藏所),
              站内转描版画降副位(artPanel+来源签)。双图 aria 各述(古图 alt/转描面 aria-hidden+地脚出处)。
              图 lazy+显式宽高防 CLS;InkReveal 不接入词条页(G49 设计内)。 */}
          {classicScansFor(entity.slug).length > 0 && (
            <div className={styles.classicMounts} role="group" aria-label="刻本古图原件">
              {classicScansFor(entity.slug).map((scan) => (
                <PaintingMount
                  key={scan.src}
                  src={scan.src}
                  alt={`${entity.canonicalName}——${scan.edition}木刻插图`}
                  width={scan.width}
                  height={scan.height}
                  caption={scan.edition}
                  credit={scan.credit}
                  loading="lazy"
                  objectPosition={scan.objectPosition}
                />
              ))}
            </div>
          )}
          <figure className={styles.artMount}>
            <div className={styles.artPanel} aria-hidden="true">
              <BeastArtwork slug={entity.slug} name={entity.canonicalName} variant="detail" />
            </div>
            {/* G61 副位签:站内转描来源注记(仅 12 条转描版画词条;3 条原创 SVG 演绎词条不带此签) */}
            {classicArtFor(entity.slug) && (
              <span className={styles.artPanelTag}>站内转描 · 据古今图书集成</span>
            )}
            {/* G22 出处改地脚:不再是浮在画面上的灰底条(修 G01 缺口#4 文字挤压) */}
            <figcaption className={styles.artNote}>
              {(() => {
                const ca = classicArtFor(entity.slug)
                return ca?.sourceUrl ? (
                  <a
                    href={ca.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="查看版画来源(维基共享资源文件页,新窗打开)"
                  >
                    {ca.source} · Commons 文件页 ↗
                  </a>
                ) : (
                  '据原文描述艺术演绎'
                )
              })()}
            </figcaption>
          </figure>
        </div>
      </header>

      {/* 轻量页内目录(V10) */}
      <nav className={styles.toc} aria-label="页内目录">
        <a className={styles.tocItem} href="#sec-citations">原文证据</a>
        <a className={styles.tocItem} href="#sec-explain">本站释义</a>
        <a className={styles.tocItem} href="#sec-traits">形貌档案</a>
        <a className={styles.tocItem} href="#sec-abilities">能力与征兆</a>
        <a className={styles.tocItem} href="#sec-location">地域关系</a>
        {entity.laterReception && entity.laterReception.length > 0 && (
          <a className={styles.tocItem} href="#sec-reception">后世流变</a>
        )}
      </nav>

      {/* 原文证据 */}
      <section className={styles.section} aria-labelledby="sec-citations">
        <SectionHeading index="考" title="原文证据" subtitle="YUAN WEN ZHENG JU" />
        <div className={styles.citationList} id="sec-citations">
          {entity.citations.map((c, i) => (
            <CitationBlock key={i} citation={c} anchor={`cite-${i}`} />
          ))}
        </div>
      </section>

      {/* 本站释义 */}
      <section className={styles.section} aria-labelledby="sec-explain">
        <SectionHeading
          index="释"
          title="本站释义"
          subtitle="BEN ZHAN SHI YI"
          note="以下为本站以现代汉语撰写的理解,不代表学术定论;不确定处均用限定词标出。"
        />
        <div id="sec-explain">
          <p className={styles.explain}>{entity.modernExplanation}</p>
          {entity.disputedReadings.length > 0 && (
            <div className={styles.disputed}>
              <p className={styles.disputedTitle}>异文与存疑</p>
              <ul>
                {entity.disputedReadings.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* 形貌档案 */}
      <section className={styles.section} aria-labelledby="sec-traits">
        <SectionHeading
          index="形"
          title="形貌档案"
          subtitle="XING MAO DANG AN"
          note="仅收录原文可确认的信息,每项可回看对应原文;原文没有记载的,如实标注「原文未载」。"
        />
        <div className={styles.traitTable} id="sec-traits">
          {TRAIT_SECTIONS.map(({ kinds, label }) => {
            const traits: Trait[] = entity[`${kinds[0]}Traits` as keyof Entity] as Trait[]
            return (
              <div key={label} className={styles.traitRow}>
                <p className={styles.traitKind}>{label}</p>
                {traits.length > 0 ? (
                  <ul className={styles.traitList}>
                    {traits.map((t, i) => (
                      <li key={i}>
                        <span>{t.text}</span>
                        <a className={styles.backLink} href={`#cite-${t.citationIndex}`}>
                          回看原文
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={styles.notRecorded}>原文未载</p>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* 能力与征兆 */}
      <section className={styles.section} aria-labelledby="sec-abilities">
        <SectionHeading
          index="效"
          title="能力与征兆"
          subtitle="NENG LI YU ZHENG ZHAO"
          note="只呈现原文记述;不含任何后世文艺或网络设定。"
        />
        <div className={styles.twoCol} id="sec-abilities">
          <div className={styles.col}>
            <p className={styles.colTitle}>能力与记述</p>
            {entity.abilities.length > 0 ? (
              <ul className={styles.noteList}>
                {entity.abilities.map((a, i) => (
                  <li key={i}>
                    <span>{a.text}</span>
                    <a className={styles.backLink} href={`#cite-${a.citationIndex}`}>
                      回看原文
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.notRecorded}>原文未载</p>
            )}
          </div>
          <div className={styles.col}>
            <p className={styles.colTitle}>出现之征</p>
            {entity.omens.length > 0 ? (
              <ul className={styles.noteList}>
                {entity.omens.map((o, i) => (
                  <li key={i}>
                    <span>{o.text}</span>
                    <a className={styles.backLink} href={`#cite-${o.citationIndex}`}>
                      回看原文
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.notRecorded}>原文未载</p>
            )}
          </div>
        </div>
      </section>

      {/* 后世流变:与原始记载明显分隔(规范第六节第 8 条) */}
      {entity.laterReception && entity.laterReception.length > 0 && (
        <section className={styles.section} aria-labelledby="sec-reception">
          <div className={styles.receptionFrame} id="sec-reception">
            {/* G22 三级层级:标题(后世流变)/正文(条目)/出处(层级注记,置于地脚) */}
            <SectionHeading index="流" title="后世流变" subtitle="HOU SHI LIU BIAN" />
            {entity.laterReception.map((r, i) => (
              <div key={i} className={styles.receptionItem}>
                <p className={styles.receptionText}>{r.text}</p>
                {/* G36 逐句可溯:每条 claim 附篇名+链接+照录引文+项目存档 */}
                {r.claims && r.claims.length > 0 && (
                  <ul className={styles.claimList}>
                    {r.claims.map((c, j) => (
                      <li key={j} className={styles.claim} data-claim={c.sourceTitle}>
                        <p className={styles.claimText}>{c.text}</p>
                        <p className={styles.claimQuote} data-quote={c.quote}>
                          「{c.quote}」
                        </p>
                        <p className={styles.claimSource}>
                          <span className={styles.receptionSourceLabel}>所据</span>
                          {c.sourceTitle}
                          <a
                            className={styles.claimLink}
                            href={c.sourceUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            公开对照 ↗
                          </a>
                        </p>
                        <p className={styles.claimArchive}>
                          存档 {c.archive}
                          {c.note ? ` · ${c.note}` : ''}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
                <p className={styles.receptionSource}>
                  <span className={styles.receptionSourceLabel}>出处</span>
                  {r.era}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 地域关系 */}
      <section className={styles.section} aria-labelledby="sec-location">
        <SectionHeading
          index="地"
          title="地域关系"
          subtitle="DI YU GUAN XI"
          note="以下为古籍内部的叙事关系;概念地图坐标与本站呈现用,非现实地理定位。"
        />
        <div className={styles.locationList} id="sec-location">
          {locations.map((loc) => {
            const others = ENTITIES.filter(
              (e) => e.id !== entity.id && e.locationIds.includes(loc.id),
            )
            return (
              <div key={loc.id} className={styles.locationCard}>
                <p className={styles.locationName}>{loc.canonicalName}</p>
                <p className={styles.locationMeta}>
                  《{chapterName(loc.chapterId)}》·
                  原文顺序第 {loc.sourceOrder ?? '?'} 山
                  {loc.sourceDirection && ` · ${loc.sourceDirection}`}
                  {loc.sourceDistance && ` ${loc.sourceDistance}`}
                </p>
                <p className={styles.locationNote}>
                  概念地图:{loc.mapPosition.region}(坐标仅为本站呈现用)
                </p>
                {loc.citations[0] && (
                  <blockquote className={styles.locationCite}>
                    {loc.citations[0].originalText}
                  </blockquote>
                )}
                <p className={styles.locationOthers}>
                  {others.length > 0
                    ? `同地其他条目:${others.map((o) => o.canonicalName).join('、')}`
                    : '暂无同地其他条目'}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* 相关探索:关联漫游 */}
      <nav className={styles.related} aria-label="相关探索">
        <div className={styles.relatedGroups}>
          {sameChapter.length > 0 && (
            <div className={styles.relatedGroup}>
              <p className={styles.relatedLabel}>同篇章</p>
              <div className={styles.relatedLinks}>
                {sameChapter.map((e) => (
                  <Link key={e.id} className={styles.chipLink} to={`/catalog/${e.slug}`}>
                    <span className={styles.chipThumb} aria-hidden="true">
                      <BeastArtwork slug={e.slug} name={e.canonicalName} variant="card" />
                    </span>
                    {e.canonicalName}
                  </Link>
                ))}
              </div>
            </div>
          )}
          {sameLocation.length > 0 && (
            <div className={styles.relatedGroup}>
              <p className={styles.relatedLabel}>同地域</p>
              <div className={styles.relatedLinks}>
                {sameLocation.map((e) => (
                  <Link key={e.id} className={styles.chipLink} to={`/catalog/${e.slug}`}>
                    <span className={styles.chipThumb} aria-hidden="true">
                      <BeastArtwork slug={e.slug} name={e.canonicalName} variant="card" />
                    </span>
                    {e.canonicalName}
                  </Link>
                ))}
              </div>
            </div>
          )}
          {similarTags.length > 0 && (
            <div className={styles.relatedGroup}>
              <p className={styles.relatedLabel}>相似特征</p>
              <div className={styles.relatedLinks}>
                {similarTags.map((e) => (
                  <Link key={e.id} className={styles.chipLink} to={`/catalog/${e.slug}`}>
                    <span className={styles.chipThumb} aria-hidden="true">
                      <BeastArtwork slug={e.slug} name={e.canonicalName} variant="card" />
                    </span>
                    {e.canonicalName}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className={styles.relatedRow}>
          {prev ? (
            <Link className={styles.relatedLink} to={`/catalog/${prev.slug}`}>
              ← 上一篇 · {prev.canonicalName}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link className={styles.relatedLink} to={`/catalog/${next.slug}`}>
              下一篇 · {next.canonicalName} →
            </Link>
          ) : (
            <span />
          )}
        </div>
        <div className={styles.relatedRow}>
          <Link className={styles.relatedLink} to="/catalog">
            返回图鉴
          </Link>
          {journeyStop && (
            <Link
              className={styles.relatedLink}
              to={`/journeys/nanci-yi?station=${journeyStop.station.locationId}`}
            >
              山海行旅 · 返回
              {ALL_LOCATIONS.find((l) => l.id === journeyStop.station.locationId)?.canonicalName} →
            </Link>
          )}
          <button type="button" className={styles.randomBtn} onClick={rollRandom}>
            随机翻一卷
          </button>
        </div>
      </nav>
    </div>
  )
}
