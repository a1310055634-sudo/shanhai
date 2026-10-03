import type { Location } from './types'

/**
 * 山川地域数据(首批:南山经前段两座已核验之山)。
 * 原文核验来源逐条见各 citation:南次一经等 2026-09-20 起经 ctext.org 公开文本
 * 逐字核对;南次二经柜山/长右之山(G28)、尧光之山/羽山(G29)因底本A(ctext)反爬
 * 不可达,2026-10-02 经中文维基文库两源(B1 页面×B2 四库本郭璞注)逐字对照一致后
 * 录入,A 侧回核挂账(recordStatus 暂为 unverified)。详见 CONTENT_SOURCES.md 与
 * EDITION_AUDIT.md。
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
    subClassic: '南次一经',
    sourceOrder: 1,
    sourceDirection: undefined,
    sourceDistance: undefined,
    relatedEntityIds: ['ent-xingxing'],
    citations: [
      {
        originalText: '南山经之首曰䧿山。其首曰招摇之山，临于西海之上，多桂，多金玉。',
        chapter: '南山经',
        section: '开篇',
        guoPuNotes: [
          {
            attach: '臨於西海之上',
            text: '在蜀，伏山山南之西頭，濱西海也。',
          },
          {
            attach: '多桂',
            text: '桂葉似枇杷，長二尺餘，廣數寸，味辛白花，叢生山峯。冬夏常青，間無雜木。《呂氏春秋》曰：「招搖之桂」',
          },
        ],
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/nan-shan-jing/zhs',
        variantText: '「䧿」与「鹊」为异体字关系,山名写法存在异文;本站以底本用字「䧿」为准并注明。',
        verificationNote: '2026-09-20 经 ctext 公开文本逐字核对(开篇句)。2026-09-27 复核:与底本A(ctext zhs)逐字一致,并与底本B(中文维基文库郭璞注本)对照相符。 2026-10-02 郭璞注层上线:注文 2 条逐字照录底本B原始 wikitext(存档 EDITION_EVIDENCE/wikisource-nanshan1-guopu-20261002.txt),保持繁体未转简;郭注「在蜀,伏山山南之西頭」为晋人地理比附,照录不代表本站采信。',
        verifiedAt: '2026-09-20',
      },
    ],
    mapPosition: { x: 12, y: 70, region: '南山经' },
    modernHypotheses: [], // 现代地理比附暂不录入(待专门考证轮)
    recordStatus: 'verified',
  },
  {
    id: 'loc-tangting',
    canonicalName: '堂庭之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次一经',
    sourceOrder: 2,
    sourceDirection: '又东',
    sourceDistance: '三百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东三百里，曰堂庭之山，多棪木，多白猿，多水玉，多黄金。',
        chapter: '南山经',
        section: '南次一经第二山',
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/nan-shan-jing/zhs',
        variantText:
          '「堂」:底本B(中文维基文库郭璞注本,2026-09-27)页面自带异文标注「堂一作常」。两具名电子本正文均作「堂」,「常」为彼本注记异文,本站从底本A「堂」。',
        verificationNote:
          '2026-09-27 建站核验:底本A(ctext zhs,存档 EDITION_EVIDENCE/ctext-nanci1-20260927.txt)与底本B(中文维基文库郭璞注本)逐字对照一致(「常」异文除外,已标注)。',
        verifiedAt: '2026-09-27',
      },
    ],
    mapPosition: { x: 20, y: 72, region: '南山经' },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    id: 'loc-yuanyi',
    canonicalName: '猨翼之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次一经',
    sourceOrder: 3,
    sourceDirection: '又东',
    sourceDistance: '三百八十里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东三百八十里，曰猨翼之山，其中多怪兽，水多怪鱼，多白玉，多腹虫，多怪蛇，多怪木，不可以上。',
        chapter: '南山经',
        section: '南次一经第三山',
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/nan-shan-jing/zhs',
        verificationNote:
          '2026-09-27 建站核验:底本A(ctext zhs)与底本B(中文维基文库郭璞注本)逐字对照一致。A/B 段内均作「猨翼」;「多白猿」之「猿」为兽名用字,与山名「猨」不同处,不构成山名异文。',
        verifiedAt: '2026-09-27',
      },
    ],
    mapPosition: { x: 27, y: 74, region: '南山经' },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    id: 'loc-chuyang',
    canonicalName: '杻阳之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次一经',
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
          '2026-09-20 经 ctext 公开文本逐字核对;其前一山为猨翼之山(「又东三百八十里,曰猨翼之山」),地点链条待山川轮补全。 2026-09-27 复核:与底本A(ctext zhs,存档 EDITION_EVIDENCE/ctext-nanci1-20260927.txt)逐字一致,并与底本B(中文维基文库郭璞注本)对照相符。',
        verifiedAt: '2026-09-20',
      },
    ],
    mapPosition: { x: 35, y: 77, region: '南山经' },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    id: 'loc-danyuan',
    canonicalName: '亶爰之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次一经',
    sourceOrder: 6,
    sourceDirection: '又东',
    sourceDistance: '四百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东四百里，曰亶爰之山，多水，无草木，不可以上。有兽焉，其状如狸而有髦，其名曰类，自为牝牡，食者不妬。',
        chapter: '南山经',
        section: '南次一经第六山',
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/nan-shan-jing/zhs',
        verificationNote:
          '2026-09-27 建站核验:底本A(ctext zhs,存档 EDITION_EVIDENCE/ctext-nanci1-20260927.txt)与底本B(中文维基文库郭璞注本)逐字对照一致,山名与里距(又东四百里)两源相同。郭璞注「類」等注文未录入。',
        verifiedAt: '2026-09-27',
      },
    ],
    mapPosition: { x: 42, y: 79, region: '南山经' },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    id: 'loc-jishan',
    canonicalName: '基山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次一经',
    sourceOrder: 7,
    sourceDirection: '又东',
    sourceDistance: '三百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东三百里，曰基山，其阳多玉，其阴多怪木。有兽焉，其状如羊，九尾四耳，其目在背，其名曰猼訑，佩之不畏。有鸟焉，其状如鸡而三首六目，六足三翼，其名曰𪁺𩿧，食之无卧。',
        chapter: '南山经',
        section: '南次一经第七山',
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/nan-shan-jing/zhs',
        verificationNote:
          '2026-09-27 建站核验:底本A与底本B(中文维基文库郭璞注本)逐字对照一致。段内猼訑、𪁺𩿧(音博宜?)为随文异兽名,不另建条目;B本「三首六目、六足三翼」用顿号,本站从A逗号(标点整理已录 EDITION_AUDIT)。',
        verifiedAt: '2026-09-27',
      },
    ],
    mapPosition: { x: 50, y: 81, region: '南山经' },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    id: 'loc-qingqiu',
    canonicalName: '青丘之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次一经',
    sourceOrder: 8,
    sourceDirection: '又东',
    sourceDistance: '三百里',
    relatedEntityIds: ['ent-jiuweihu'],
    citations: [
      {
        originalText: '又东三百里，曰青丘之山，其阳多玉，其阴多青䨼。',
        chapter: '南山经',
        section: '南次一经第八山',
        guoPuNotes: [
          {
            attach: '青丘',
            text: '亦有青丘國在海外水經云。即《上林賦》云：「秋田於青丘」',
          },
          {
            attach: '其陰多青雘',
            text: '雘，黝屬，音瓠',
          },
        ],
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/nan-shan-jing/zhs',
        verificationNote:
          '2026-09-20 经 ctext 公开文本逐字核对。「青䨼」之「䨼」为生僻字,本站保留底本原字,释义后续补充。山序按南次一经:招摇、堂庭、猨翼、杻阳、祗山(底本A用字;底本B维基文库作「柢山」,见 EDITION_AUDIT 差1)、亶爰、基山之后即青丘。2026-09-27 复核:与底本A(ctext zhs)逐字一致,并与底本B(中文维基文库郭璞注本)对照相符。 2026-10-02 郭璞注层上线:注文 2 条逐字照录底本B原始 wikitext(存档 EDITION_EVIDENCE/wikisource-nanshan1-guopu-20261002.txt),保持繁体未转简;注 attach「其陰多青雘」照录底本B用字「雘」,与本站正文从底本A「䨼」的取舍(见 variantText)分属两层,不改注。',
        variantText:
          '「青䨼」:底本B(中文维基文库郭璞注本,2026-09-27)作「青雘」,并附郭璞注「雘,黝屬,音瓠」。两具名电子本用字互异,本站从底本A原字「䨼」(EDITION_AUDIT.md 差3)。',
        verifiedAt: '2026-09-20',
      },
    ],
    mapPosition: { x: 58, y: 84, region: '南山经' },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    id: 'loc-jiwei',
    canonicalName: '箕尾之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次一经',
    sourceOrder: 9,
    sourceDirection: '又东',
    sourceDistance: '三百五十里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东三百五十里，曰箕尾之山，其尾踆于东海，多沙石。汸水出焉，而南流注于淯，其中多白玉。',
        chapter: '南山经',
        section: '南次一经第九山(末山)',
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/nan-shan-jing/zhs',
        verificationNote:
          '2026-09-27 建站核验:底本A(ctext zhs,存档 EDITION_EVIDENCE/ctext-nanci1-20260927.txt)与底本B(中文维基文库郭璞注本)逐字对照一致。篇末紧接「凡䧿山之首…凡十山,二千九百五十里」总述(另段独立收录,计数存疑见 EDITION_AUDIT 差6/差7)。',
        verifiedAt: '2026-09-27',
      },
    ],
    mapPosition: { x: 67, y: 87, region: '南山经' },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    id: 'loc-danxue',
    canonicalName: '丹穴之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次三经',
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
    mapPosition: { x: 70, y: 80, region: "南山经" },
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
    mapPosition: { x: 66, y: 19, region: "西山经" },
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
    mapPosition: { x: 66.5, y: 32, region: "西山经" },
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
    mapPosition: { x: 61.5, y: 24.5, region: "西山经" },
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
    mapPosition: { x: 53.5, y: 18.5, region: "西山经" },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    id: 'loc-zhongshan-sh',
    canonicalName: '锺山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-haiwai-bei',
    sourceOrder: undefined,
    sourceDirection: undefined,
    sourceDistance: undefined,
    relatedEntityIds: ['ent-zhuyin'],
    citations: [
      {
        originalText:
          '锺山之神，名曰烛阴，视为昼，暝为夜，吹为冬，呼为夏，不饮，不食，不息，息为风，身长千里。在无𦜹之东。其为物，人面蛇身，赤色，居锺山下。',
        chapter: '海外北经',
        section: '锺山',
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/hai-wai-bei-jing/zhs',
        verificationNote:
          '2026-09-20 经 ctext 公开文本逐字核对。底本用字「锺」(非钟/鍾)、「暝」照录;与西山经之锺山是否一山,属考证问题,本站暂分立两条、互不合并。',
        verifiedAt: '2026-09-20',
      },
    ],
    mapPosition: { x: 40, y: 8, region: '海外北经' },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    id: 'loc-xionglitu',
    canonicalName: '凶犁土丘',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-dahuang-dong',
    sourceOrder: undefined,
    sourceDirection: '大荒东北隅中',
    sourceDistance: undefined,
    relatedEntityIds: ['ent-yinglong'],
    citations: [
      {
        originalText: '大荒东北隅中，有山名曰凶犁土丘。',
        chapter: '大荒东经',
        section: '凶犁土丘',
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/da-huang-dong-jing/zhs',
        verificationNote: '2026-09-20 经 ctext 公开文本逐字核对。',
        verifiedAt: '2026-09-20',
      },
    ],
    mapPosition: { x: 85, y: 6, region: '大荒东经' },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    id: 'loc-liubo',
    canonicalName: '流波山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-dahuang-dong',
    sourceOrder: undefined,
    sourceDirection: '东海中',
    sourceDistance: '入海七千里',
    relatedEntityIds: ['ent-kui'],
    citations: [
      {
        originalText: '东海中有流波山，入海七千里。',
        chapter: '大荒东经',
        section: '流波山',
        sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
        publicUrl: 'https://ctext.org/shan-hai-jing/da-huang-dong-jing/zhs',
        verificationNote: '2026-09-20 经 ctext 公开文本逐字核对。',
        verifiedAt: '2026-09-20',
      },
    ],
    mapPosition: { x: 92, y: 50, region: '大荒东经' },
    modernHypotheses: [],
    recordStatus: 'verified',
  },
  {
    // G28:南次二经第一山。底本A(ctext)2026-10-02 反爬不可达,经底本B1(中文维基文库
    // 页面)×B2(四库本郭璞注)两源逐字一致后录入;用字简体转换表与疑点挂账见
    // EDITION_AUDIT.md 三之补5、EDITION_EVIDENCE/DRAFT-nanci2-workfile-20261002.md。
    id: 'loc-guishan',
    canonicalName: '柜山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次二经',
    sourceOrder: 1,
    sourceDirection: undefined,
    sourceDistance: undefined,
    nextLocationId: 'loc-changyou',
    relatedEntityIds: [],
    citations: [
      {
        originalText:
          '南次二经之首，曰柜山，西临流黄，北望诸毗，东望长右。英水出焉，西南流注于赤水，其中多白玉，多丹粟。有兽焉，其状如豚，有距，其音如狗吠，其名曰狸力，见则其县多土功。有鸟焉，其状如鸱而人手。其音如痹，其名曰鴸，名自号也，见则其县多放士。',
        chapter: '南山经',
        section: '南次二经第一山',
        guoPuNotes: [
          {
            attach: '柜山',
            text: '音矩',
          },
          {
            attach: '西临流黄，北望诸毗，东望长右',
            text: '皆山名',
          },
          {
            attach: '多白玉',
            text: '尸子曰：水方折者有玉，貢折者有珠',
          },
          {
            attach: '其状如鸱而人手',
            text: '其腳如人手，鴟音處脂反',
          },
          {
            attach: '其音如痹',
            text: '未詳',
          },
          {
            attach: '其名曰鴸',
            text: '音株',
          },
        ],
        sourceEdition:
          '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)与维基文库四库本郭璞注(B2)两源逐字核对;底本A(ctext.org)2026-10-02 反爬不可达,恢复后回核',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText:
          '「放士」之「放」:底本B1页面自带异文标注「放一作效」,底本B2四库本郭璞注同记此异文(放/效),两源正文均作「放」。本站从B1正文用字「放」并标注;底本A待回核。',
        verificationNote:
          '2026-10-02 建站核验(G28):底本B1(中文维基文库《山海經/南山經》,自带郭注夹注)与底本B2(维基文库四库本郭璞注,存档 EDITION_EVIDENCE/wikisource-nanshan1-guopu-20261002.txt 第34行)净化正文逐字一致。上屏为简体逐字转换(仅繁简对应,无异文性改字;逐字对照表见 EDITION_AUDIT.md 三之补5);篇名《》书名号为底本B页面所加,体例从底本A(一经正文无书名号)去《》录正文。底本A(ctext zhs)当日实测不可达(反爬拦截页),A×B 回核挂账(DRAFT-nanci2 疑点清单)。郭璞注「尸子曰:水方折者有玉,貢折者有珠」之「貢」疑为「員」形讹,注文照录未改;注「細丹砂如」文意未足疑有脱文,不上屏,存档可查。',
        verifiedAt: '2026-10-02',
      },
    ],
    mapPosition: { x: 14, y: 86, region: '南山经' },
    modernHypotheses: [],
    recordStatus: 'unverified',
  },
  {
    // G28:南次二经第二山,兽「长右」因山得名(郭注)。核验与挂账同 loc-guishan。
    id: 'loc-changyou',
    canonicalName: '长右之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次二经',
    sourceOrder: 2,
    previousLocationId: 'loc-guishan',
    nextLocationId: 'loc-yaoguang',
    sourceDirection: '东南',
    sourceDistance: '四百五十里',
    relatedEntityIds: ['ent-changyou'],
    citations: [
      {
        originalText: '东南四百五十里曰长右之山，无草木，多水。',
        chapter: '南山经',
        section: '南次二经第二山',
        sourceEdition:
          '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)与维基文库四库本郭璞注(B2)两源逐字核对;底本A(ctext.org)2026-10-02 反爬不可达,恢复后回核',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText:
          '「东南四百五十里」无「又」字:底本B1/B2均作「東南四百五十里曰長右之山」,与南次一经「又东……」体例不同,两源一致,照录不补;有无「又」待底本A回核(DRAFT-nanci2 疑点3)。',
        verificationNote:
          '2026-10-02 建站核验(G28):底本B1与底本B2(存档 EDITION_EVIDENCE/wikisource-nanshan1-guopu-20261002.txt 第36行)净化正文逐字一致;上屏简体逐字转换(对照表见 EDITION_AUDIT.md 三之补5)。底本A(ctext zhs)当日实测不可达(反爬拦截页),A×B 回核挂账。兽「长右」段另立引文,见 ent-changyou。',
        verifiedAt: '2026-10-02',
      },
    ],
    mapPosition: { x: 24, y: 87.5, region: '南山经' },
    modernHypotheses: [],
    recordStatus: 'unverified',
  },
  {
    // G29:南次二经第三山。兽「猾褢」另立词条(ent-huahuai)。核验路径同 loc-guishan:
    // 底本A(ctext)2026-10-02 复测仍反爬不可达,经底本B1(维基文库页面存档 L03)×
    // B2(四库本郭璞注,存档第38行)两源净化正文逐字一致后录入。
    id: 'loc-yaoguang',
    canonicalName: '尧光之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次二经',
    sourceOrder: 3,
    previousLocationId: 'loc-changyou',
    nextLocationId: 'loc-yushan',
    sourceDirection: '又东',
    sourceDistance: '三百四十里',
    relatedEntityIds: ['ent-huahuai'],
    citations: [
      {
        originalText: '又东三百四十里，曰尧光之山，其阳多玉，其阴多金。',
        chapter: '南山经',
        section: '南次二经第三山',
        sourceEdition:
          '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)与维基文库四库本郭璞注(B2)两源逐字核对;底本A(ctext.org)2026-10-02 复测反爬不可达,恢复后回核',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        verificationNote:
          '2026-10-02 建站核验(G29):底本B1(维基文库页面,存档 EDITION_EVIDENCE/wikisource-nanshan1-b1-20261002.txt 第L03行)与底本B2(四库本郭璞注,存档 wikisource-nanshan1-guopu-20261002.txt 第38行)净化正文逐字一致(61字符/汉字51);上屏为简体逐字转换(仅繁简对应,无异文性改字;对照表见 EDITION_AUDIT.md 三之补6)。兽「猾褢」句另立引文,见 ent-huahuai。底本A(ctext zhs)当日复测不可达(反爬拦截页),A×B 回核挂账(DRAFT-nanci2 疑点清单)。',
        verifiedAt: '2026-10-02',
      },
    ],
    mapPosition: { x: 34, y: 86, region: '南山经' },
    modernHypotheses: [],
    recordStatus: 'unverified',
  },
  {
    // G29:南次二经第四山。郭注含郭璞自注里距疑点「計此道里不相應,似非也」,
    // 照录上屏(注层),非本站校勘意见;「柷」疑「祝」形讹照录未改(疑点9)。
    id: 'loc-yushan',
    canonicalName: '羽山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次二经',
    sourceOrder: 4,
    previousLocationId: 'loc-yaoguang',
    nextLocationId: 'loc-qufu', // G71:瞿父之山建站,羽山不再直连浮玉
    sourceDirection: '又东',
    sourceDistance: '三百五十里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东三百五十里，曰羽山，其下多水，其上多雨，无草木，多蝮虫。',
        chapter: '南山经',
        section: '南次二经第四山',
        guoPuNotes: [
          {
            attach: '羽山',
            text: '今東海柷其縣西南，有羽山，即鯀所殛處。計此道里不相應，似非也',
          },
          {
            attach: '多蝮虫',
            text: '蚖也。',
          },
        ],
        sourceEdition:
          '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)与维基文库四库本郭璞注(B2)两源逐字核对;底本A(ctext.org)2026-10-02 复测反爬不可达,恢复后回核',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText:
          '郭注「今東海柷其縣西南」之「柷」:底本B1/B2均作「柷」,疑为「祝」形讹(汉代东海郡有祝其县,郭注所指当即祝其县)。注文照录未校改;郭注「計此道里不相應,似非也」系郭璞自注此山道里与实地方位不合,为注文内容本身,照录上屏,非本站校勘意见(DRAFT-nanci2 疑点9)。',
        verificationNote:
          '2026-10-02 建站核验(G29):底本B1(维基文库页面,存档 EDITION_EVIDENCE/wikisource-nanshan1-b1-20261002.txt 第L04行)与底本B2(四库本郭璞注,存档 wikisource-nanshan1-guopu-20261002.txt 第40行)净化正文逐字一致(30字符/汉字24);上屏为简体逐字转换(对照表见 EDITION_AUDIT.md 三之补6),注文保持繁体未转简。底本A(ctext zhs)当日复测不可达(反爬拦截页),A×B 回核挂账。',
        verifiedAt: '2026-10-02',
      },
    ],
    mapPosition: { x: 44, y: 87.5, region: '南山经' },
    modernHypotheses: [],
    recordStatus: 'unverified',
  },
  {
    // G71:南次二经第五山(2026-10-04 经底本B1 存档 L05×B2 第42行两源净化正文
    // 逐字一致后录入,底本A回核挂账;郭注仅音注「音劬」一条)。文句极简
    // (「无草木,多金玉」),不立词条。
    id: 'loc-qufu',
    canonicalName: '瞿父之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次二经',
    sourceOrder: 5,
    previousLocationId: 'loc-yushan',
    nextLocationId: 'loc-juyu',
    sourceDirection: '又东',
    sourceDistance: '三百七十里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东三百七十里，曰瞿父之山，无草木，多金玉。',
        chapter: '南山经',
        section: '南次二经第五山',
        guoPuNotes: [
          {
            attach: '瞿父之山',
            text: '音劬',
          },
        ],
        sourceEdition:
          '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)与维基文库四库本郭璞注(B2)两源逐字核对;底本A(ctext.org)2026-10-04 复测反爬不可达,恢复后回核',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        verificationNote:
          '2026-10-04 建站核验(G71):底本B1(维基文库页面,存档 EDITION_EVIDENCE/wikisource-nanshan1-b1-20261002.txt 第L05行)与底本B2(四库本郭璞注,存档 wikisource-nanshan1-guopu-20261002.txt 第42行)净化正文逐字一致;上屏为简体逐字转换(对照表见 EDITION_AUDIT.md 三之补8),注文保持繁体未转简。底本A(ctext zhs)当日复测不可达(反爬拦截页),A×B 回核挂账。',
        verifiedAt: '2026-10-04',
      },
    ],
    mapPosition: { x: 45.8, y: 84.2, region: '南山经' }, // G71:羽山/句余之间下行避让(标签零重叠实测裁决)
    modernHypotheses: [],
    recordStatus: 'unverified',
  },
  {
    // G71:南次二经第六山(核验路径同 loc-qufu:B1 L06×B2 第44行)。
    // 「餘」简体转写作「余」(一对多,入 AUDIT 三之补8 转写表)。
    id: 'loc-juyu',
    canonicalName: '句余之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次二经',
    sourceOrder: 6,
    previousLocationId: 'loc-qufu',
    nextLocationId: 'loc-fuyu',
    sourceDirection: '又东',
    sourceDistance: '四百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东四百里，曰句余之山，无草木，多金玉。',
        chapter: '南山经',
        section: '南次二经第六山',
        guoPuNotes: [
          {
            attach: '句餘之山',
            text: '今在會稽餘姚縣南，章句縣北，故此二縣因此爲名云。見《張氏地理志》',
          },
        ],
        sourceEdition:
          '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)与维基文库四库本郭璞注(B2)两源逐字核对;底本A(ctext.org)2026-10-04 复测反爬不可达,恢复后回核',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        verificationNote:
          '2026-10-04 建站核验(G71):底本B1(存档 L06行)与底本B2(存档 第44行)净化正文逐字一致;上屏为简体逐字转换(「餘」→「余」一对多,对照表见 EDITION_AUDIT.md 三之补8),注文保持繁体未转简。底本A(ctext zhs)当日复测不可达(反爬拦截页),A×B 回核挂账。',
        verifiedAt: '2026-10-04',
      },
    ],
    mapPosition: { x: 49.5, y: 87.6, region: '南山经' }, // G71:锯齿上行(零重叠实测裁决)
    modernHypotheses: [],
    recordStatus: 'unverified',
  },
  {
    // G30:南次二经第七山(第五/六山瞿父、句余 G71 已补录,链路经二山相连)。
    // 兽「彘」另立词条(ent-zhi)。核验路径同 loc-guishan:底本A(ctext)2026-10-02
    // 复测仍反爬不可达,经底本B1(存档 L07)×B2(存档第46行)两源净化正文逐字一致后录入。
    id: 'loc-fuyu',
    canonicalName: '浮玉之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次二经',
    sourceOrder: 7,
    previousLocationId: 'loc-juyu', // G71:瞿父/句余插站,羽山直连改经二山
    nextLocationId: 'loc-chengshan',
    sourceDirection: '又东',
    sourceDistance: '五百里',
    relatedEntityIds: ['ent-zhi'],
    citations: [
      {
        originalText:
          '又东五百里，曰浮玉之山，北望具区，东望诸毗。有兽焉，其状如虎而牛尾，其音如吠犬，其名曰彘，是食人。苕水出于其阴，北流注于具区。其中多鮆鱼。',
        chapter: '南山经',
        section: '南次二经第七山',
        guoPuNotes: [
          {
            attach: '北望具区',
            text: '具區，今吳縣西南太湖也。《尚書》謂之震澤',
          },
          {
            attach: '东望诸毗',
            text: '水名',
          },
          {
            attach: '其中多鮆鱼',
            text: '鮆魚，狹薄而長頭。大者尺餘，太湖中今饒之。一名刀魚，音祚啓反',
          },
        ],
        sourceEdition:
          '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)与维基文库四库本郭璞注(B2)两源逐字核对;底本A(ctext.org)2026-10-02 复测反爬不可达,恢复后回核',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        verificationNote:
          '2026-10-02 建站核验(G30):底本B1(维基文库页面,存档 EDITION_EVIDENCE/wikisource-nanshan1-b1-20261002.txt 第L07行)与底本B2(四库本郭璞注,存档 wikisource-nanshan1-guopu-20261002.txt 第46行)净化正文逐字一致(断言脚本实测);上屏为简体逐字转换(仅繁简对应,无异文性改字;对照表见 EDITION_AUDIT.md 三之补7),注文保持繁体未转简。兽「彘」句另立引文,见 ent-zhi。底本A(ctext zhs)当日复测不可达(反爬拦截页),A×B 回核挂账(DRAFT-nanci2 疑点清单)。',
        verifiedAt: '2026-10-02',
      },
    ],
    mapPosition: { x: 57.2, y: 89.5, region: '南山经' }, // G71:二经尾列下移避让一经尾部青丘/箕尾(坐标经两轮实测标定)
    modernHypotheses: [],
    recordStatus: 'unverified',
  },
  {
    // G30:南次二经第八山。水名「虖勺」两处底本自带异文(勺一作多/一作流注于西,
    // 两源同记)照录 variantText(疑点10/11);「𨴯」「雘」等生僻字 GLOSSARY 注音。
    id: 'loc-chengshan',
    canonicalName: '成山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次二经',
    sourceOrder: 8,
    previousLocationId: 'loc-fuyu',
    nextLocationId: 'loc-kuaiji', // G71:会稽之山建站
    sourceDirection: '又东',
    sourceDistance: '五百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText:
          '又东五百里，曰成山，四方而三坛，其上多金玉，其下多青雘。𨴯水出焉，而南流注于虖勺，其中多黄金。',
        chapter: '南山经',
        section: '南次二经第八山',
        guoPuNotes: [
          {
            attach: '四方而三坛',
            text: '形如人築，壇相累也。成亦重耳',
          },
          {
            attach: '𨴯水出焉',
            text: '音涿',
          },
          {
            attach: '虖勺',
            text: '虖，音呼。',
          },
          {
            attach: '其中多黄金',
            text: '今永昌郡，水出金如糠在沙中。尸子曰：清水出黃金、玉英',
          },
        ],
        sourceEdition:
          '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)与维基文库四库本郭璞注(B2)两源逐字核对;底本A(ctext.org)2026-10-02 复测反爬不可达,恢复后回核',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText:
          '两处底本自带异文,两源同记,照录不裁决:①水名「虖勺」之「勺」——底本B1页面注记「勺一作多」,底本B2四库本以{{另|勺|多}}模板同记此异文,两源正文均作「勺」,本站从「勺」并标注;②「南流注于」下——两源均夹注「一作流注于西」,另一版本于水名前多一「西」字。均待底本A回核(DRAFT-nanci2 疑点10/11)。',
        verificationNote:
          '2026-10-02 建站核验(G30):底本B1(维基文库页面,存档 EDITION_EVIDENCE/wikisource-nanshan1-b1-20261002.txt 第L08行,剥〈〉夹注与「一作「多」」页面注记)与底本B2(四库本郭璞注,存档 wikisource-nanshan1-guopu-20261002.txt 第48行,剥{{*|}}夹注、{{另|}}模板取正字)净化正文逐字一致(断言脚本实测);上屏为简体逐字转换(对照表见 EDITION_AUDIT.md 三之补7),注文保持繁体未转简。底本A(ctext zhs)当日复测不可达(反爬拦截页),A×B 回核挂账。',
        verifiedAt: '2026-10-02',
      },
    ],
    mapPosition: { x: 62.4, y: 89.5, region: '南山经' }, // G71:二经尾列下移(同上)
    modernHypotheses: [],
    recordStatus: 'unverified',
  },
  {
    // G71:南次二经第九山(2026-10-04 经底本B1 存档 L09×B2 第50行两源净化正文
    // 逐字一致后录入,底本A回核挂账)。郭注三条(禹冢及井/砆石/音鵙);
    // 底本自带异文「勺一作多」登记疑13(variants),正文从两源共用作「勺」。
    id: 'loc-kuaiji',
    canonicalName: '会稽之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次二经',
    sourceOrder: 9,
    previousLocationId: 'loc-chengshan',
    nextLocationId: 'loc-yishan', // G72:夷山建站
    sourceDirection: '又东',
    sourceDistance: '五百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东五百里，曰会稽之山，四方，其上多金玉，其下多砆石。勺水出焉，而南流注于湨。',
        chapter: '南山经',
        section: '南次二经第九山',
        guoPuNotes: [
          {
            attach: '會稽之山',
            text: '今在會稽郡山陰縣南，上有禹冢及井',
          },
          {
            attach: '其下多砆石',
            text: '砆，武大石，似玉，今長沙臨湘出之。赤地白文，色蘢葱，不分明。',
          },
          {
            attach: '注於湨',
            text: '音鵙',
          },
        ],
        sourceEdition:
          '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)与维基文库四库本郭璞注(B2)两源逐字核对;底本A(ctext.org)2026-10-04 复测反爬不可达,恢复后回核',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText:
          '「勺水出焉」之「勺」:底本B1页面自带异文标注「勺一作多」,底本B2四库本郭璞注同记{{另|勺|多}};两源正文均作「勺」。本站从两源正文用字「勺」,异文登记疑13;与成山「虖勺一作多」(疑10)为两处独立异文。底本A待回核。',
        verificationNote:
          '2026-10-04 建站核验(G71):底本B1(存档 L09行,剥〈〉夹注与「勺一作「多」」页面注记)与底本B2(存档 第50行,剥{{*|}}与{{另|}}模板)净化正文逐字一致;上屏为简体逐字转换(會→会/於→于,对照表见 EDITION_AUDIT.md 三之补8),注文保持繁体未转简。音注「音鵙」上屏注层;「湨」「砆」入 GLOSSARY 注音。底本A(ctext zhs)当日复测不可达(反爬拦截页),A×B 回核挂账。',
        verifiedAt: '2026-10-04',
      },
    ],
    mapPosition: { x: 69.5, y: 91, region: '南山经' }, // G72:右移避让夷山(两轮实测标定同法)
    modernHypotheses: [],
    recordStatus: 'unverified',
  },
  {
    // G72:南次二经第十山(2026-10-04 经底本B1 存档 L10×B2 第52行两源净化正文
    // 逐字一致后录入,底本A回核挂账;无郭注)。湨水上承会稽「注于湨」。
    id: 'loc-yishan',
    canonicalName: '夷山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次二经',
    sourceOrder: 10,
    previousLocationId: 'loc-kuaiji',
    nextLocationId: 'loc-pugou',
    sourceDirection: '又东',
    sourceDistance: '五百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东五百里，曰夷山。无草木，多沙石，湨水出焉，而南流注于列涂。',
        chapter: '南山经',
        section: '南次二经第十山',
        sourceEdition:
          '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)与维基文库四库本郭璞注(B2)两源逐字核对;底本A(ctext.org)2026-10-04 复测软拦截页(200 但正文零命中),恢复后回核',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        verificationNote:
          '2026-10-04 建站核验(G72):底本B1(存档 L10行)与底本B2(存档 第52行)净化正文逐字一致;上屏为简体逐字转换(塗→涂,对照表见 EDITION_AUDIT.md 三之补9);本山无郭璞注。底本A(ctext zhs)2026-10-04 复测 200 但正文零命中(软拦截),A×B 回核挂账。',
        verifiedAt: '2026-10-04',
      },
    ],
    mapPosition: { x: 75.5, y: 89.5, region: '南山经' }, // G72:尾列续排(实测二轮:75.5 避会稽右缘)
    modernHypotheses: [],
    recordStatus: 'unverified',
  },
  {
    // G72:南次二经第十一山(核验路径同 loc-yishan:B1 L11×B2 第54行)。
    // 异文「勾一作夕」两源同记,登记疑14;「僕」简体作「仆」。
    id: 'loc-pugou',
    canonicalName: '仆勾之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次二经',
    sourceOrder: 11,
    previousLocationId: 'loc-yishan',
    nextLocationId: 'loc-xunshan', // G73:洵山建站
    sourceDirection: '又东',
    sourceDistance: '五百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东五百里，曰仆勾之山，其上多金玉，其下多草木，无鸟兽，无水。',
        chapter: '南山经',
        section: '南次二经第十一山',
        sourceEdition:
          '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)与维基文库四库本郭璞注(B2)两源逐字核对;底本A(ctext.org)2026-10-04 复测软拦截页(200 但正文零命中),恢复后回核',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText:
          '「僕勾」之「勾」:底本B1页面自带异文标注「僕勾一作「夕」」;底本B2四库本郭璞注同记{{另|勾|夕}}(存档第 54 行)。两源正文均作「勾」。本站从两源正文用字「勾」,异文登记疑14。底本A待回核。',
        verificationNote:
          '2026-10-04 建站核验(G72):底本B1(存档 L11行)与底本B2(存档 第54行)净化正文逐字一致;上屏为简体逐字转换(僕→仆/鳥獸→鸟兽,对照表见 EDITION_AUDIT.md 三之补9)。底本A(ctext zhs)2026-10-04 复测软拦截页,A×B 回核挂账。',
        verifiedAt: '2026-10-04',
      },
    ],
    mapPosition: { x: 77, y: 92.6, region: '南山经' }, // G72:尾列末位(y 三档错行,实测裁决)
    modernHypotheses: [],
    recordStatus: 'unverified',
  },
  {
    // G73:南次二经第十二山(2026-10-04 经底本B1 存档 L13×B2 第58行两源净化正文
    // 逐字一致后录入,底本A回核挂账)。异文「洵一作旬」两源同记=疑16。
    // 兽「䍺」句照录(词条候选留 G75,relatedEntityIds 暂缺如实);郭注 5 条上屏。
    id: 'loc-xunshan',
    canonicalName: '洵山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次二经',
    sourceOrder: 12,
    previousLocationId: 'loc-pugou',
    nextLocationId: 'loc-hushao',
    sourceDirection: '又东',
    sourceDistance: '四百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东四百里，曰洵山，其阳多金，其阴多玉。有兽焉，其状如羊而无口，不可杀也，其名曰䍺。洵水出焉，而南流注于阏之泽，其中多芘蠃。',
        chapter: '南山经',
        section: '南次二经第十二山',
        guoPuNotes: [
          {
            attach: '不可杀也',
            text: '稟氣自然',
          },
          {
            attach: '其名曰䍺',
            text: '音還，或音患',
          },
          {
            attach: '洵水出焉',
            text: '音詢',
          },
          {
            attach: '閼之澤',
            text: '音遏',
          },
          {
            attach: '芘蠃',
            text: '紫色螺也',
          },
        ],
        sourceEdition:
          '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)与维基文库四库本郭璞注(B2)两源逐字核对;底本A(ctext.org)2026-10-04 复测软拦截页(200 但正文零命中),恢复后回核',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        variantText:
          '「洵山」之「洵」:底本B1页面自带异文标注「洵一作「旬」山」;底本B2四库本郭璞注同记{{另|洵|旬}}(存档第 58 行)。两源正文均作「洵」。本站从两源正文用字「洵」,异文登记疑16。底本A待回核。',
        verificationNote:
          '2026-10-04 建站核验(G73):底本B1(存档 L13行)与底本B2(存档 第58行)净化正文逐字一致;上屏为简体逐字转换(東→东/無→无/狀→状/陰→阴/殺→杀/閼→阏/澤→泽,对照表见 EDITION_AUDIT.md 三之补10),注文保持繁体未转简。兽「䍺」句照录,词条候选留 G75。底本A(ctext zhs)2026-10-04 复测软拦截页,A×B 回核挂账。',
        verifiedAt: '2026-10-04',
      },
    ],
    mapPosition: { x: 81.5, y: 89.5, region: '南山经' }, // G73:尾列续排(线性标定预解+实测裁决)
    modernHypotheses: [],
    recordStatus: 'unverified',
  },
  {
    // G73:南次二经第十三山(核验路径同 loc-xunshan:B1 L14×B2 第60行)。
    // 郭注 3 条(梓枏/荊杞/滂水)上屏注层;「虖」GLOSSARY 已收(hū)。
    id: 'loc-hushao',
    canonicalName: '虖勺之山',
    aliases: [],
    type: 'mountain',
    chapterId: 'ch-nanshan',
    subClassic: '南次二经',
    sourceOrder: 13,
    previousLocationId: 'loc-xunshan',
    sourceDirection: '又东',
    sourceDistance: '四百里',
    relatedEntityIds: [],
    citations: [
      {
        originalText: '又东四百里，曰虖勺之山，其上多梓枏，其下多荆杞。滂水出焉，而东流注于海。',
        chapter: '南山经',
        section: '南次二经第十三山',
        guoPuNotes: [
          {
            attach: '梓枏',
            text: '梓，山楸也。枏，大木葉，似桑，今作楠，音南。《爾雅》以爲柟',
          },
          {
            attach: '荊杞',
            text: '杞，枸杞也，子赤',
          },
          {
            attach: '滂水出焉',
            text: '音滂沱之滂',
          },
        ],
        sourceEdition:
          '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)与维基文库四库本郭璞注(B2)两源逐字核对;底本A(ctext.org)2026-10-04 复测软拦截页(200 但正文零命中),恢复后回核',
        publicUrl:
          'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
        verificationNote:
          '2026-10-04 建站核验(G73):底本B1(存档 L14行)与底本B2(存档 第60行)净化正文逐字一致;上屏为简体逐字转换(東→东/荊→荆,对照表见 EDITION_AUDIT.md 三之补10),注文保持繁体未转简。「虖」字 GLOSSARY 已收(hū)。底本A(ctext zhs)2026-10-04 复测软拦截页,A×B 回核挂账。',
        verifiedAt: '2026-10-04',
      },
    ],
    mapPosition: { x: 86, y: 91, region: '南山经' }, // G73:尾列续排(实测裁决)
    modernHypotheses: [],
    recordStatus: 'unverified',
  },
]

export function getLocation(id: string): Location | undefined {
  return LOCATIONS.find((l) => l.id === id)
}
