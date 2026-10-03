/**
 * 难字音表数据(G35 建)。
 *
 * 分层纪律(见 GALLERY_DESIGN.md 六之一):
 *  - 本文件只承载「读音」与「读音的依据」,不动任何古籍原文:原文层仍由
 *    chapterTexts.ts / locations.ts / distances.ts 单一来源提供,本文件不复制原文。
 *  - 郭璞注音注一律逐字照录底本 B 存档
 *    (EDITION_EVIDENCE/wikisource-nanshan1-guopu-20261002.txt),保持繁体原样,
 *    并记存档行号;每条音注的逐字命中由 dev/round35-verify.mjs 程序化回查(20/20 唯一命中)。
 *  - 底本无音注者一律留白:依据行明写「无音注」及其证据(全存档出现处计数),
 *    本站标注读音同时降级标注为「通读参考·非核验内容」,不写成定论。
 *  - 本站标注读音有两个来源层,单一来源不另抄第二份:
 *      ruby    = chapterTexts.GLOSSARY(古卷阅读器逐字注音层,运行时读取)
 *      mountains = siteReadings.MOUNTAIN_READINGS(山川图山名通读层,运行时读取)
 *    两层的读音值均由程序在构建期读取原表,本文件只记「该字取自哪一层」。
 */
import { GLOSSARY } from './chapterTexts'
import { MOUNTAIN_READINGS } from './siteReadings'

/** 依据种类:音注 / 训释(无音注) / 无涉(留白)。 */
export type ReadingBasis = 'sound' | 'gloss' | 'none'

/** 读音来源层:无则本站未标注。 */
export type ReadingLayer = 'ruby' | 'mountains'

export interface ReadingEntry {
  /** 底本 B(郭璞注本)字形 */
  char: string
  /** 站内原文用字,与 B 字形不同时记(如「鸱」对「鴟」) */
  siteChar?: string
  /** 本站标注读音来源层;缺省=本站未标注 */
  layer?: ReadingLayer
  /** 山名通读层取值所用的山名(仅 layer='mountains') */
  mountainName?: string
  /** 郭璞注原文逐字片段(繁体照录);无音注则缺省 */
  quote?: string
  /** 音注所在存档行号(wikisource-nanshan1-guopu-20261002.txt) */
  line?: number
  basis: ReadingBasis
  /** 「底本无音注」的实证说明 */
  blankEvidence?: string
  /** 出现处(站内原文,单一来源转述,不复制全文) */
  where: string
  note?: string
}

/**
 * 读出的本站标注读音(运行时取原表,不在本文件重抄)。
 * 两层各自单一来源,任一表改动后本表随之变化,不会出现第三份分歧值。
 */
export function siteReadingOf(entry: ReadingEntry): string | null {
  if (entry.layer === 'ruby') return GLOSSARY[entry.char]?.pinyin ?? null
  if (entry.layer === 'mountains' && entry.mountainName) {
    return MOUNTAIN_READINGS[entry.mountainName] ?? null
  }
  return null
}

/** 本站 ruby 注音层是否收录该字(供「注音层覆盖」列)。 */
export function inRubyLayer(entry: ReadingEntry): boolean {
  return Object.prototype.hasOwnProperty.call(GLOSSARY, entry.char)
}

/** 郭璞注音注层存档坐标(全表共用,供页面生成公开对照链接)。 */
export const GUOPU_ARCHIVE = {
  file: 'EDITION_EVIDENCE/wikisource-nanshan1-guopu-20261002.txt',
  label: '中文维基文库《山海經》郭璞注本(四庫全書底本)',
  url: 'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93',
  fetchedAt: '2026-10-02',
}

/** 一、郭璞注有音注的字(直音/反切照录,不作今音折合)。 */
export const SOUND_ENTRIES: ReadingEntry[] = [
  {
    char: '禺',
    layer: 'ruby',
    quote: '禺字音遇',
    line: 12,
    basis: 'sound',
    where: '南次一经·招摇之山段「其状如禺而白耳」;南次二经·长右之山段「其状如禺而四耳」',
    note: '本站注音层标 yú,郭注音「遇」;两存照录,不裁决孰是(G35 疑12)。',
  },
  {
    char: '棪',
    quote: '其子似柰而赤，可食，音剡',
    line: 14,
    basis: 'sound',
    where: '南次一经·堂庭之山段「多棪木」',
    note: '本站注音层未收此字(古卷页该字不显注音),如实列出。',
  },
  {
    char: '杻',
    layer: 'mountains',
    mountainName: '杻阳之山',
    quote: '音紐',
    line: 18,
    basis: 'sound',
    where: '南次一经·杻阳之山「又东三百七十里，曰杻阳之山」',
    note: '本站山名通读层作 chǔ,郭注音「紐」;两存照录,不裁决(G35 疑12)。该字未收进 ruby 注音层。',
  },
  {
    char: '柢',
    quote: '音蔕',
    line: 20,
    basis: 'sound',
    where: '南次一经篇末里距表·柢山行(待核山,两源照录句)',
    note: '本站未标注此字读音;音读与「柢/祗」异文(差1)并存,柢山不设正式站。',
  },
  {
    char: '亶',
    layer: 'mountains',
    mountainName: '亶爰之山',
    quote: '亶音蟬',
    line: 22,
    basis: 'sound',
    where: '南次一经·亶爰之山「又东四百里，曰亶爰之山」',
    note: '本站山名通读层作 dǎn,郭注音「蟬」;两存照录,不裁决(G35 疑12)。该字未收进 ruby 注音层。',
  },
  {
    char: '雘',
    layer: 'ruby',
    quote: '雘，黝屬，音瓠',
    line: 26,
    basis: 'sound',
    where: '南次一经·青丘之山段(底本 B 用字,本站正文从底本 A 作「䨼」);南次二经·成山段「其下多青雘」',
    note: '本站注音层标 huò,郭注音「瓠」;两存照录(G35 疑12)。成山段底本无音注,此音注属青丘段。',
  },
  {
    char: '䨼',
    layer: 'ruby',
    quote: '雘，黝屬，音瓠',
    line: 26,
    basis: 'sound',
    where: '南次一经·青丘之山段「其阴多青䨼」(本站正文用字)',
    note: '「䨼」为底本 A 用字,底本 B 同处作「雘」并有郭璞注「雘，黝屬，音瓠」;异文与音读同源,故并录于此(见差3)。',
  },
  {
    char: '踆',
    quote: '踆，古蹲字。言臨海上音存。',
    line: 28,
    basis: 'sound',
    where: '南次一经·箕尾之山段「其尾踆于东海」',
    note: '郭注兼训释与音读(「音存」);本站未标注此字读音。',
  },
  {
    char: '汸',
    quote: '音芳',
    line: 28,
    basis: 'sound',
    where: '南次一经·箕尾之山段「汸水出焉」',
    note: '本站未标注此字读音。',
  },
  {
    char: '淯',
    quote: '音育',
    line: 28,
    basis: 'sound',
    where: '南次一经·箕尾之山段「而南流注于淯」',
    note: '本站未标注此字读音。',
  },
  {
    char: '糈',
    quote: '糈，祀神之米，名先呂反。',
    line: 30,
    basis: 'sound',
    where: '南次二经·篇末总述「糈用稌」',
    note: '郭注作反切(先呂反),本站不折合今音、不标注;直音部分「今江東音所一音壻」同在该注内。',
  },
  {
    char: '柜',
    layer: 'ruby',
    mountainName: '柜山',
    quote: '音矩',
    line: 34,
    basis: 'sound',
    where: '南次二经·柜山「南次二经之首，曰柜山」',
    note: '本站注音层与山名通读层均作 jǔ,与郭注直音字「矩」同读。',
  },
  {
    char: '鴟',
    siteChar: '鸱',
    quote: '鴟音處脂反',
    line: 34,
    basis: 'sound',
    where: '南次二经·柜山段「有鸟焉，其状如鸱而人手」(站内原文用简体「鸱」)',
    note: '繁体字形「鴟」站内仅见于郭璞注层;郭注作反切,本站不折合今音。',
  },
  {
    char: '鴸',
    layer: 'ruby',
    quote: '音株',
    line: 34,
    basis: 'sound',
    where: '南次二经·柜山段「其名曰鴸」',
    note: '本站注音层标 zhū,与郭注直音字「株」同读;该字无通行简化形,照录底本。',
  },
  {
    char: '褢',
    layer: 'ruby',
    quote: '滑懷兩音',
    line: 38,
    basis: 'sound',
    where: '南次二经·尧光之山段「其名曰猾褢」',
    note: '郭注「兩音」谓「猾」读滑、「褢」读懷;本站注音层标 huái(取「懷」一读),另一读本站不标。',
  },
  {
    char: '鮆',
    layer: 'ruby',
    quote: '一名刀魚，音祚啓反',
    line: 46,
    basis: 'sound',
    where: '南次二经·浮玉之山段「其中多鮆鱼」',
    note: '郭注作反切(祚啓反),本站不折合今音;注音层标 jì 系通行定音,非本注折合。',
  },
  {
    char: '𨴯',
    layer: 'ruby',
    quote: '音涿',
    line: 48,
    basis: 'sound',
    where: '南次二经·成山「𨴯水出焉」',
    note: '本站注音层标 zhuō,与郭注直音字「涿」同读。本字属增补平面,注音层正则须带 u 标志。',
  },
  {
    char: '砆',
    layer: 'ruby',
    quote: '砆，武大石，似玉，今長沙臨湘出之。赤地白文，色蘢葱，不分明。',
    line: 50,
    basis: 'gloss',
    where: '南次二经·会稽之山段「其下多砆石」',
    note: '郭注为训释(武大石,似玉),无音注;本站注音层标 fū 系通行定音,非本注所出。',
  },
  {
    char: '虖',
    layer: 'ruby',
    quote: '虖，音呼。',
    line: 48,
    basis: 'sound',
    where: '南次二经·成山「而南流注于虖勺」',
    note: '本站注音层标 hū,与郭注直音字「呼」同读。',
  },
  {
    char: '瞿',
    layer: 'ruby',
    mountainName: '瞿父之山',
    quote: '音劬',
    line: 42,
    basis: 'sound',
    where: '南次二经·瞿父之山「曰瞿父之山」',
    note: '本站注音层与山名通读层均作 qú,与郭注直音字「劬」同读。',
  },
  {
    char: '湨',
    layer: 'ruby',
    quote: '音鵙',
    line: 50,
    basis: 'sound',
    where: '南次二经·会稽之山段「而南流注于湨」',
    note: '本站注音层标 jú,与郭注直音字「鵙」同读。',
  },
  {
    char: '䍺',
    layer: 'ruby',
    quote: '音還，或音患',
    line: 58,
    basis: 'sound',
    where: '南次二经·洵山段「其名曰䍺」',
    note: '郭注兩音;本站注音层标 huán(取「還」一读),另一读本站不标。',
  },
  {
    char: '洵',
    layer: 'ruby',
    mountainName: '洵山',
    quote: '音詢',
    line: 58,
    basis: 'sound',
    where: '南次二经·洵山「曰洵山」;洵水出焉',
    note: '本站注音层与山名通读层均作 xún,与郭注直音字「詢」同读。',
  },
  {
    char: '閼',
    layer: 'ruby',
    quote: '音遏',
    line: 58,
    basis: 'sound',
    where: '南次二经·洵山段「南流注于阏之泽」(站内正文用简体「阏」)',
    note: '本站注音层标 è,与郭注直音字「遏」同读。',
  },
  {
    char: '枏',
    layer: 'ruby',
    quote: '今作楠，音南',
    line: 60,
    basis: 'sound',
    where: '南次二经·虖勺之山段「其上多梓枏」',
    note: '本站注音层标 nán,与郭注直音字「南」同读(郭注并记「今作楠」)。',
  },
  {
    char: '滂',
    layer: 'ruby',
    quote: '音滂沱之滂',
    line: 60,
    basis: 'sound',
    where: '南次二经·虖勺之山段「滂水出焉」',
    note: '本站注音层标 pāng 系通行定音,郭注以「滂沱」之「滂」为证,同读。',
  },
]

/** 二、郭璞注有训释、但无音注的字(读音留白)。 */
export const GLOSS_ENTRIES: ReadingEntry[] = [
  {
    char: '痹',
    layer: 'ruby',
    quote: '未詳',
    line: 34,
    basis: 'gloss',
    where: '南次二经·柜山段「其音如痹」(底本作「痺」)',
    note: '郭注仅作「未詳」,无音注;本站注音层标 bì 系通行定音,非本注所出。',
  },
  {
    char: '蝮',
    layer: 'ruby',
    quote: '蚖也。',
    line: 40,
    basis: 'gloss',
    where: '南次二经·羽山段「无草木，多蝮虫」',
    note: '郭注为训释(蚖也),无音注;本站注音层标 fù 系通行定音,非本注所出。',
  },
  {
    char: '繇',
    layer: 'ruby',
    quote: '謂作役也。或曰其繇亂',
    line: 38,
    basis: 'gloss',
    where: '南次二经·尧光之山段「见则县有大繇」',
    note: '郭注为训释(谓作役也),无音注;本站注音层标 yáo(通「徭」)系通行解,非本注所出。',
  },
  {
    char: '斲',
    layer: 'ruby',
    quote: '如人斫木聲',
    line: 38,
    basis: 'gloss',
    where: '南次二经·尧光之山段「其音如斲木」',
    note: '此注说的是「其音如斲木」的声音比拟,不是给「斲」字注音;本站注音层标 zhuó 系通行定音。',
  },
]

/** 三、底本无音注可依的字(留白;本站读音降级为通读参考)。 */
export const BLANK_ENTRIES: ReadingEntry[] = [
  {
    char: '䧿',
    layer: 'ruby',
    basis: 'none',
    blankEvidence: '底本 B 存档出现 2 处(第 12、30 行),两处均无注音。',
    where: '南次一经·经首「南山经之首曰䧿山」;篇末总述「凡䧿山之首」',
    note: '本站注音层标 què(同「鹊」);底本无音注,读音属通读参考。',
  },
  {
    char: '狌',
    layer: 'ruby',
    basis: 'none',
    blankEvidence: '底本 B 存档出现 8 处(均在第 12 行),无一处注音。',
    where: '南次一经·招摇之山段「其名曰狌狌」',
    note: '本站注音层标 xīng;底本无音注,读音属通读参考。',
  },
  {
    char: '詨',
    layer: 'ruby',
    basis: 'none',
    blankEvidence: '本站郭璞注存档只覆盖南次一经、南次二经;此字所属篇章不在存档范围内,无音注可依。',
    where: '北山经·发鸠之山段「其鸣自詨」(精卫)',
    note: '本站注音层标 xiào;底本无音注可依,读音属通读参考。',
  },
  {
    char: '橛',
    layer: 'ruby',
    basis: 'none',
    blankEvidence: '同上:此字所属篇章(大荒东经)不在本站郭注存档范围内。',
    where: '大荒东经·流波山段(夔)',
    note: '本站注音层标 jué;底本无音注可依,读音属通读参考。',
  },
  {
    char: '鬛',
    layer: 'ruby',
    basis: 'none',
    blankEvidence:
      '底本 B 存档出现 1 处(第 38 行):该处注文「滑懷兩音」系为「褢」字而设,非「鬛」之音注。',
    where: '南次二经·尧光之山段「其状如人而彘鬛」',
    note: '本站注音层标 liè(同「鬣」);底本无音注,读音属通读参考。',
  },
  {
    char: '瘗',
    layer: 'ruby',
    basis: 'none',
    blankEvidence: '底本 B 存档作「瘞」(第 30 行两处),均无注音;此处「瘞」为「半珪爲璋，瘞埋也」的训释对象。',
    where: '南次二经·篇末总述「毛用一璧瘗」',
    note: '本站注音层标 yì;底本无音注,读音属通读参考。',
  },
  {
    char: '猨',
    layer: 'mountains',
    mountainName: '猨翼之山',
    basis: 'none',
    blankEvidence: '底本 B 存档出现 1 处(第 16 行「曰猨翼之山」),该处注文为「凡言怪者…」,无音注。',
    where: '南次一经·猨翼之山「又东三百八十里，曰猨翼之山」',
    note: '本站注音层未收此字;山名通读层作 yuán,底本无音注,读音属通读参考。',
  },
]

/** 未入本表的底本音注(该段原文尚未在站内上屏,故不列行;如实登记不遗漏)。 */
export const NOT_ON_SITE = [
  { char: '鯥', quote: '音六', line: 20, reason: '柢山段「其名曰鯥」——柢山待核不设站,该段原文未上屏。' },
  { char: '菅', quote: '菅，茅屬也。音間', line: 30, reason: '南次一经篇末祠礼全句未上屏(站内仅上屏里距总述句)。' },
  ]

/** 三类合计(页面自述用;数值由数据派生,不手填)。 */
export const READING_COUNTS = {
  sound: SOUND_ENTRIES.length,
  gloss: GLOSS_ENTRIES.length,
  blank: BLANK_ENTRIES.length,
  total: SOUND_ENTRIES.length + GLOSS_ENTRIES.length + BLANK_ENTRIES.length,
  onSite: [...SOUND_ENTRIES, ...GLOSS_ENTRIES, ...BLANK_ENTRIES].filter((e) => e.basis !== 'none')
    .length,
}
