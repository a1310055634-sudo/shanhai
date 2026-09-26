/**
 * 篇章原文分段数据。
 * 红线:kind='text' 的段落全部为 2026-09-20 经 ctext.org 公开文本逐字核对过的
 * 原文(与对应条目/地点的 citation 一致);其余位置一律以 kind='gap' 如实标注
 * 「待录入」,不以常识补写。详见 CONTENT_SOURCES.md。
 *
 * J02:每段增加稳定 id(用作锚点与引用,不依赖数组下标);
 * 计数改由 segmentCounts() 从数组派生,不再手填。
 */

/** 子经归属(南次一经/南次二经/南次三经)。 */
export type SubClassic = '南次一经' | '南次二经' | '南次三经'

export interface ChapterSegment {
  /** 稳定 id(J02 建立),用作锚点与引用,不得依赖数组下标 */
  id: string
  kind: 'text' | 'gap'
  /** kind='text' 时的原文(逐字核对) */
  text?: string
  /** 分段说明(如「待录入」的范围) */
  note?: string
  /** 所属子经 */
  section: SubClassic
  relatedEntityIds?: string[]
  relatedLocationIds?: string[]
}

export interface ChapterText {
  segments: ChapterSegment[]
}

/** 派生计数(J02):由 segments 实时计算,避免手填与数组不符。 */
export function segmentCounts(ct: ChapterText): { entered: number; gaps: number } {
  return {
    entered: ct.segments.filter((x) => x.kind === 'text').length,
    gaps: ct.segments.filter((x) => x.kind === 'gap').length,
  }
}

/** 南山经(含南次一经/二经/三经)——起步录入。 */
const NANSHAN: ChapterText = {
  segments: [
    {
      id: 'seg-ns1-zhaoyao-kai',
      kind: 'text',
      section: '南次一经',
      text: '南山经之首曰䧿山。其首曰招摇之山，临于西海之上，多桂，多金玉。',
      relatedLocationIds: ['loc-zhaoyao'],
    },
    {
      id: 'seg-ns1-tangting',
      kind: 'text',
      section: '南次一经',
      text: '又东三百里，曰堂庭之山，多棪木，多白猿，多水玉，多黄金。',
      relatedLocationIds: ['loc-tangting'],
    },
    {
      id: 'seg-ns1-yuanyi',
      kind: 'text',
      section: '南次一经',
      text: '又东三百八十里，曰猨翼之山，其中多怪兽，水多怪鱼，多白玉，多腹虫，多怪蛇，多怪木，不可以上。',
      relatedLocationIds: ['loc-yuanyi'],
    },
    {
      id: 'seg-ns1-chuyang-shan',
      kind: 'text',
      section: '南次一经',
      text: '又东三百七十里，曰杻阳之山，其阳多赤金，其阴多白金。',
      relatedLocationIds: ['loc-chuyang'],
    },
    {
      id: 'seg-ns1-lushu',
      kind: 'text',
      section: '南次一经',
      text: '有兽焉，其状如马而白首，其文如虎而赤尾，其音如谣，其名曰鹿蜀，佩之宜子孙。',
      relatedEntityIds: ['ent-lushu'],
      relatedLocationIds: ['loc-chuyang'],
    },
    {
      id: 'seg-ns1-gap-di',
      kind: 'gap',
      section: '南次一经',
      note: '柢山段待录入(名称「柢/祗」两源互异;里距两源一致东三百里;两源均无「曰」字——见 EDITION_AUDIT 差1/差2)',
    },
    {
      id: 'seg-ns1-danyuan',
      kind: 'text',
      section: '南次一经',
      text: '又东四百里，曰亶爰之山，多水，无草木，不可以上。有兽焉，其状如狸而有髦，其名曰类，自为牝牡，食者不妬。',
      relatedLocationIds: ['loc-danyuan'],
    },
    {
      id: 'seg-ns1-jishan',
      kind: 'text',
      section: '南次一经',
      text: '又东三百里，曰基山，其阳多玉，其阴多怪木。有兽焉，其状如羊，九尾四耳，其目在背，其名曰猼訑，佩之不畏。有鸟焉，其状如鸡而三首六目，六足三翼，其名曰𪁺𩿧，食之无卧。',
      relatedLocationIds: ['loc-jishan'],
    },
    {
      id: 'seg-ns1-qingqiu-shan',
      kind: 'text',
      section: '南次一经',
      text: '又东三百里，曰青丘之山，其阳多玉，其阴多青䨼。',
      relatedLocationIds: ['loc-qingqiu'],
    },
    {
      id: 'seg-ns1-jiuweihu',
      kind: 'text',
      section: '南次一经',
      text: '有兽焉，其状如狐而九尾，其音如婴儿，能食人，食者不蛊。',
      relatedEntityIds: ['ent-jiuweihu'],
      relatedLocationIds: ['loc-qingqiu'],
    },
    {
      id: 'seg-ns1-gap-jiwei-tongji',
      kind: 'gap',
      section: '南次一经',
      note: '箕尾之山段及篇末统计待录入',
    },
    {
      id: 'seg-ns2-gap-quanshan',
      kind: 'gap',
      section: '南次二经',
      note: '柜山以下诸段待录入',
    },
    {
      id: 'seg-ns3-gap-tianyu-daoguo',
      kind: 'gap',
      section: '南次三经',
      note: '天虞之山、祷过之山段待录入',
    },
    {
      id: 'seg-ns3-danxue-shan',
      kind: 'text',
      section: '南次三经',
      text: '又东五百里，曰丹穴之山，其上多金玉。丹水出焉，而南流注于渤海。',
      relatedLocationIds: ['loc-danxue'],
    },
    {
      id: 'seg-ns3-fenghuang',
      kind: 'text',
      section: '南次三经',
      text: '有鸟焉，其状如鸡，五采而文，名曰凤皇，首文曰德，翼文曰义，背文曰礼，膺文曰仁，腹文曰信。是鸟也，饮食自然，自歌自舞，见则天下安宁。',
      relatedEntityIds: ['ent-fenghuang'],
      relatedLocationIds: ['loc-danxue'],
    },
    {
      id: 'seg-ns3-gap-fashuang-end',
      kind: 'gap',
      section: '南次三经',
      note: '发爽之山以下诸段待录入',
    },
  ],
}

export const CHAPTER_TEXTS: Record<string, ChapterText> = {
  'nanshan-jing': NANSHAN,
}

/** 生僻字注音(读音供参考,训释见条目页;非核验内容)。 */
export const GLOSSARY: Record<string, { pinyin: string; hint?: string }> = {
  䧿: { pinyin: 'què', hint: '同「鹊」' },
  狌: { pinyin: 'xīng', hint: '狌狌' },
  禺: { pinyin: 'yú', hint: '旧注以为猿猴类,确切所指待考' },
  䨼: { pinyin: 'hù', hint: '青色矿物颜料,训释待考' },
  詨: { pinyin: 'xiào', hint: '自呼其名(旧注)' },
  橛: { pinyin: 'jué', hint: '鼓槌,训释取通行解' },
}
