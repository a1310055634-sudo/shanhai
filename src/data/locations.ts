import type { Location } from './types'

/**
 * 山川地域数据(首批:南山经前段两座已核验之山)。
 * 原文均于 2026-09-20 经 ctext.org 公开文本逐字核对;详见 CONTENT_SOURCES.md。
 * mapPosition 为概念地图坐标(古籍叙事关系),与现实经纬度无关。
 * 地点链条(前后山)将随山川轮补全,暂缺字段不标「原文未载」。
 */
export const LOCATIONS: Location[] = [
  {
    id: 'loc-zhaoyao',
    canonicalName: '招摇之山',
    aliases: ['䧿山之首'],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    sourceOrder: 1,
    sourceDirection: undefined,
    sourceDistance: undefined,
    relatedEntityIds: ['ent-xingxing'],
    citations: [
      {
        originalText: '南山经之首曰䧿山。其首曰招摇之山，临于西海之上，多桂，多金玉。',
        chapter: '南山经',
        section: '开篇',
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/nan-shan-jing/zhs',
        variantText: '「䧿」与「鹊」为异体字关系,山名写法存在异文;本站以底本用字「䧿」为准并注明。',
        verificationNote: '2026-09-20 经 ctext 公开文本逐字核对(开篇句)。',
        verifiedAt: '2026-09-20',
      },
    ],
    mapPosition: { x: 12, y: 62, region: '南山经' },
    modernHypotheses: [], // 现代地理比附暂不录入(待专门考证轮)
    recordStatus: 'verified',
  },
  {
    id: 'loc-chuyang',
    canonicalName: '杻阳之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    sourceOrder: 4,
    sourceDirection: '又东',
    sourceDistance: '三百七十里',
    relatedEntityIds: ['ent-lushu'],
    citations: [
      {
        originalText: '又东三百七十里，曰杻阳之山，其阳多赤金，其阴多白金。',
        chapter: '南山经',
        section: '南次一经第四山',
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/nan-shan-jing/zhs',
        verificationNote:
          '2026-09-20 经 ctext 公开文本逐字核对;其前一山为猨翼之山(「又东三百八十里,曰猨翼之山」),地点链条待山川轮补全。',
        verifiedAt: '2026-09-20',
      },
    ],
    mapPosition: { x: 24, y: 66, region: '南山经' },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    id: 'loc-qingqiu',
    canonicalName: '青丘之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    sourceOrder: 8,
    sourceDirection: '又东',
    sourceDistance: '三百里',
    relatedEntityIds: ['ent-jiuweihu'],
    citations: [
      {
        originalText: '又东三百里，曰青丘之山，其阳多玉，其阴多青䨼。',
        chapter: '南山经',
        section: '南次一经第八山',
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/nan-shan-jing/zhs',
        verificationNote:
          '2026-09-20 经 ctext 公开文本逐字核对。「青䨼」之「䨼」为生僻字,本站保留底本原字,释义后续补充。山序按南次一经:招摇、堂庭、猨翼、杻阳、祗山、亶爰、基山之后即青丘。',
        verifiedAt: '2026-09-20',
      },
    ],
    mapPosition: { x: 46, y: 72, region: '南山经' },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    id: 'loc-danxue',
    canonicalName: '丹穴之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    sourceOrder: 3,
    sourceDirection: '又东',
    sourceDistance: '五百里',
    relatedEntityIds: ['ent-fenghuang'],
    citations: [
      {
        originalText: '又东五百里，曰丹穴之山，其上多金玉。丹水出焉，而南流注于渤海。',
        chapter: '南山经',
        section: '南次三经第三山',
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/nan-shan-jing/zhs',
        verificationNote:
          '2026-09-20 经 ctext 公开文本逐字核对。丹穴之山属南次三经(天虞、祷过之后第三山),不在南次一经;sourceOrder 为所在子经内的次序。',
        verifiedAt: '2026-09-20',
      },
    ],
    mapPosition: { x: 78, y: 80, region: '南山经' },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    id: 'loc-tianshan',
    canonicalName: '天山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-xishan',
    sourceOrder: undefined,
    sourceDirection: '又西',
    sourceDistance: '三百五十里',
    relatedEntityIds: ['ent-dijiang'],
    citations: [
      {
        originalText: '又西三百五十里，曰天山，多金玉，有青雄黄。英水出焉，而西南流注于汤谷。',
        chapter: '西山经',
        section: '天山',
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/xi-shan-jing/zhs',
        verificationNote:
          '2026-09-20 经 ctext 公开文本逐字核对。其前一山为騩山(「又西一百九十里,曰騩山」);所在子经与整链次序待山川轮核定,故 sourceOrder 暂缺。',
        verifiedAt: '2026-09-20',
      },
    ],
    mapPosition: { x: 62, y: 22, region: '西山经' },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    id: 'loc-fajiu',
    canonicalName: '发鸠之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-beishan',
    sourceOrder: undefined,
    sourceDirection: '又北',
    sourceDistance: '二百里',
    relatedEntityIds: ['ent-jingwei'],
    citations: [
      {
        originalText: '又北二百里，曰发鸠之山，其上多柘木。',
        chapter: '北山经',
        section: '发鸠之山',
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/bei-shan-jing/zhs',
        verificationNote:
          '2026-09-20 经 ctext 公开文本逐字核对。《北山经》之首为单狐之山(同日核对);发鸠之山所在子经与次序待山川轮核定,故 sourceOrder 暂缺。',
        verifiedAt: '2026-09-20',
      },
    ],
    mapPosition: { x: 24, y: 12, region: '北山经' },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    id: 'loc-taiqi',
    canonicalName: '泰器之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-xishan',
    sourceOrder: undefined,
    sourceDirection: '又西',
    sourceDistance: '百八十里',
    relatedEntityIds: ['ent-wenyaoyu'],
    citations: [
      {
        originalText: '又西百八十里，曰泰器之山。观水出焉，西流注于流沙。',
        chapter: '西山经',
        section: '泰器之山',
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/xi-shan-jing/zhs',
        verificationNote:
          '2026-09-20 经 ctext 公开文本逐字核对。其前一山为锺山;所在子经与整链次序待山川轮核定。',
        verifiedAt: '2026-09-20',
      },
    ],
    mapPosition: { x: 55, y: 30, region: '西山经' },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    id: 'loc-huaijiang',
    canonicalName: '槐江之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-xishan',
    sourceOrder: undefined,
    sourceDirection: '又西',
    sourceDistance: '三百二十里',
    relatedEntityIds: ['ent-yingzhao'],
    citations: [
      {
        originalText: '又西三百二十里，曰槐江之山。丘时之水出焉，而北流注于泑水。',
        chapter: '西山经',
        section: '槐江之山',
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/xi-shan-jing/zhs',
        verificationNote:
          '2026-09-20 经 ctext 公开文本逐字核对。其前一山为泰器之山;由此「西南四百里」即昆仑之丘(同日核对)。',
        verifiedAt: '2026-09-20',
      },
    ],
    mapPosition: { x: 60, y: 26, region: '西山经' },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    id: 'loc-kunlun',
    canonicalName: '昆仑之丘',
    aliases: ['帝之下都'],
    type: 'mountain',
    chapterId: 'ch-xishan',
    sourceOrder: undefined,
    sourceDirection: '西南',
    sourceDistance: '四百里',
    relatedEntityIds: ['ent-luwu'],
    citations: [
      {
        originalText: '西南四百里，曰昆仑之丘，是实惟帝之下都，神陆吾司之。',
        chapter: '西山经',
        section: '昆仑之丘',
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/xi-shan-jing/zhs',
        verificationNote:
          '2026-09-20 经 ctext 公开文本逐字核对。注意行文为「西南四百里」(自槐江之山而至),非「又西」;「帝之下都」取旧注通识并已标注。',
        verifiedAt: '2026-09-20',
      },
    ],
    mapPosition: { x: 56, y: 22, region: '西山经' },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
]

export function getLocation(id: string): Location | undefined {
  return LOCATIONS.find((l) => l.id === id)
}
