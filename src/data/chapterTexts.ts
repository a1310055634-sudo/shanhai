/**
 * 篇章原文分段数据。
 * 红线:kind='text' 的段落全部为经 EDITION_AUDIT 全流程逐字核对过的原文,来源
 * 逐段可溯——南次一经/南次三经各段 2026-09-20 起经 ctext.org 公开文本逐字核对;
 * 南次二经柜山/长右三段(G28)、尧光/猾褢/羽山三段(G29)2026-10-02 经中文维基文库
 * 两源(B1 页面×B2 四库本郭璞注)逐字一致录入,底本A(ctext)反爬不可达、回核挂账。
 * 其余位置一律以 kind='gap' 如实标注「待录入」,不以常识补写。详见 CONTENT_SOURCES.md。
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
      id: 'seg-ns1-jiwei',
      kind: 'text',
      section: '南次一经',
      text: '又东三百五十里，曰箕尾之山，其尾踆于东海，多沙石。汸水出焉，而南流注于淯，其中多白玉。',
      relatedLocationIds: ['loc-jiwei'],
    },
    {
      id: 'seg-ns1-tongji',
      kind: 'text',
      section: '南次一经',
      text: '凡䧿山之首，自招摇之山，以至箕尾之山，凡十山，二千九百五十里。',
      relatedLocationIds: [
        'loc-zhaoyao',
        'loc-tangting',
        'loc-yuanyi',
        'loc-chuyang',
        'loc-danyuan',
        'loc-jishan',
        'loc-qingqiu',
        'loc-jiwei',
      ],
    },
    {
      id: 'seg-ns1-tongji-note',
      kind: 'gap',
      section: '南次一经',
      note: '篇末计数存疑:篇末原文作「凡十山,二千九百五十里」(底本A/B一致),但两本逐段实列均为九山(招摇、堂庭、猨翼、杻阳、柢[祗]、亶爰、基、青丘、箕尾);本站按逐段里距相加校核得二千七百里,与篇末相差二百五十里。第十山所指、脱简抑或计数口径之别,文献未明,本站不作推断——山名清单与篇末计数照录原文,读者知其存疑即可。(出处:底本A ctext zhs、底本B 中文维基文库郭璞注本,2026-09-27;详见 EDITION_AUDIT.md 差6/差7)',
    },
    {
      // G28:柜山段(2026-10-02 经底本B1×B2两源逐字一致录入,底本A回核挂账,
      // 相关地点 recordStatus 同步为 unverified;详见 EDITION_AUDIT.md 三之补5)。
      id: 'seg-ns2-guishan',
      kind: 'text',
      section: '南次二经',
      text: '南次二经之首，曰柜山，西临流黄，北望诸毗，东望长右。英水出焉，西南流注于赤水，其中多白玉，多丹粟。有兽焉，其状如豚，有距，其音如狗吠，其名曰狸力，见则其县多土功。有鸟焉，其状如鸱而人手。其音如痹，其名曰鴸，名自号也，见则其县多放士。',
      relatedLocationIds: ['loc-guishan'],
    },
    {
      id: 'seg-ns2-changyou-shan',
      kind: 'text',
      section: '南次二经',
      text: '东南四百五十里曰长右之山，无草木，多水。',
      relatedLocationIds: ['loc-changyou'],
    },
    {
      id: 'seg-ns2-changyou',
      kind: 'text',
      section: '南次二经',
      text: '有兽焉，其状如禺而四耳，其名长右，其音如吟，见则郡县大水。',
      relatedEntityIds: ['ent-changyou'],
      relatedLocationIds: ['loc-changyou'],
    },
    {
      // G29:尧光之山山段(2026-10-02 经底本B1×B2两源逐字一致录入,底本A回核挂账,
      // recordStatus 同步 unverified;详见 EDITION_AUDIT.md 三之补6)。
      id: 'seg-ns2-yaoguang-shan',
      kind: 'text',
      section: '南次二经',
      text: '又东三百四十里，曰尧光之山，其阳多玉，其阴多金。',
      relatedLocationIds: ['loc-yaoguang'],
    },
    {
      id: 'seg-ns2-huahuai',
      kind: 'text',
      section: '南次二经',
      text: '有兽焉，其状如人而彘鬛，穴居而冬蛰，其名曰猾褢，其音如斲木，见则县有大繇。',
      relatedEntityIds: ['ent-huahuai'],
      relatedLocationIds: ['loc-yaoguang'],
    },
    {
      id: 'seg-ns2-yushan',
      kind: 'text',
      section: '南次二经',
      text: '又东三百五十里，曰羽山，其下多水，其上多雨，无草木，多蝮虫。',
      relatedLocationIds: ['loc-yushan'],
    },
    {
      // G71:瞿父之山段(2026-10-04 经底本B1×B2两源逐字一致录入,底本A回核挂账,
      // recordStatus 同步 unverified;详见 EDITION_AUDIT.md 三之补8)。
      id: 'seg-ns2-qufu-shan',
      kind: 'text',
      section: '南次二经',
      text: '又东三百七十里，曰瞿父之山，无草木，多金玉。',
      relatedLocationIds: ['loc-qufu'],
    },
    {
      // G71:句余之山段(同上;「餘」简体转换作「余」,一对多入 AUDIT 转写表)。
      id: 'seg-ns2-juyu-shan',
      kind: 'text',
      section: '南次二经',
      text: '又东四百里，曰句余之山，无草木，多金玉。',
      relatedLocationIds: ['loc-juyu'],
    },
    {
      // G30:浮玉之山山段(2026-10-02 经底本B1×B2两源逐字一致录入,底本A回核挂账,
      // recordStatus 同步 unverified;详见 EDITION_AUDIT.md 三之补7)。兽「彘」句
      // 与水句依长右/堯光先例拆段。
      id: 'seg-ns2-fuyu-shan',
      kind: 'text',
      section: '南次二经',
      text: '又东五百里，曰浮玉之山，北望具区，东望诸毗。',
      relatedLocationIds: ['loc-fuyu'],
    },
    {
      id: 'seg-ns2-zhi',
      kind: 'text',
      section: '南次二经',
      text: '有兽焉，其状如虎而牛尾，其音如吠犬，其名曰彘，是食人。',
      relatedEntityIds: ['ent-zhi'],
      relatedLocationIds: ['loc-fuyu'],
    },
    {
      id: 'seg-ns2-fuyu-shui',
      kind: 'text',
      section: '南次二经',
      text: '苕水出于其阴，北流注于具区。其中多鮆鱼。',
      relatedLocationIds: ['loc-fuyu'],
    },
    {
      id: 'seg-ns2-chengshan',
      kind: 'text',
      section: '南次二经',
      text: '又东五百里，曰成山，四方而三坛，其上多金玉，其下多青雘。𨴯水出焉，而南流注于虖勺，其中多黄金。',
      relatedLocationIds: ['loc-chengshan'],
    },
    {
      // G71:会稽之山段(2026-10-04 经底本B1×B2两源逐字一致录入,底本A回核挂账;
      // 详见 EDITION_AUDIT.md 三之补8)。异文「勺一作多」登记疑13(variants),
      // 正文从两源共用作「勺」。
      id: 'seg-ns2-kuaiji-shan',
      kind: 'text',
      section: '南次二经',
      text: '又东五百里，曰会稽之山，四方，其上多金玉，其下多砆石。勺水出焉，而南流注于湨。',
      relatedLocationIds: ['loc-kuaiji'],
    },
    {
      // G72:夷山段(2026-10-04 经底本B1 存档 L10×B2 第52行两源净化正文逐字一致
      // 录入,底本A回核挂账;无郭注)。湨水承会稽之山「注于湨」(湨=泽),照录不注。
      id: 'seg-ns2-yishan',
      kind: 'text',
      section: '南次二经',
      text: '又东五百里，曰夷山。无草木，多沙石，湨水出焉，而南流注于列涂。',
      relatedLocationIds: ['loc-yishan'],
    },
    {
      // G72:僕勾之山段(同上,B1 L11×B2 第54行)。异文「勾一作夕」登记疑14
      // (variants),正文从两源共用作「勾」;「僕」简体作「仆」。
      id: 'seg-ns2-pugou-shan',
      kind: 'text',
      section: '南次二经',
      text: '又东五百里，曰仆勾之山，其上多金玉，其下多草木，无鸟兽，无水。',
      relatedLocationIds: ['loc-pugou'],
    },
    {
      id: 'seg-ns2-gap-xian-end',
      kind: 'gap',
      section: '南次二经',
      note: '咸陰之山里距两源互异(B1「四百里」/B2「五百里」),正文两源不一致未录,待底本A回核裁决(疑15);洵山以下五山待录入(G73—G74);不凑数;核不动不上线',
    },
    {
      // G30:二经篇末总述(底本B1工作稿存档×B2第68行两源一致;祠礼句照录,
      // 郭注「稻穬也」不上屏——segment 层无注层机制,与一经篇末同款,如实记档)。
      id: 'seg-ns2-tongji',
      kind: 'text',
      section: '南次二经',
      text: '凡南次二经之首，自柜山至于漆吴之山，凡十七山，七千二百里。其神状皆龙身而鸟首。其祠：毛用一璧瘗，糈用稌。',
      relatedLocationIds: [
        'loc-guishan',
        'loc-changyou',
        'loc-yaoguang',
        'loc-yushan',
        'loc-fuyu',
        'loc-chengshan',
      ],
    },
    {
      id: 'seg-ns2-tongji-note',
      kind: 'gap',
      section: '南次二经',
      note: '篇末「凡十七山,七千二百里」:本站已录六山(自柜山至成山),瞿父、句餘与会稽以下九山未核不上线;逐段相加与篇末合计之对照见篇末里距对照存疑区,歧义照录不裁决',
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
  湨: { pinyin: 'jú', hint: '水名,郭注「音鵙」' },
  砆: { pinyin: 'fū', hint: '似玉之石,郭注「武大石」' },
  狌: { pinyin: 'xīng', hint: '狌狌' },
  禺: { pinyin: 'yú', hint: '旧注以为猿猴类,确切所指待考' },
  䨼: { pinyin: 'hù', hint: '青色矿物颜料,训释待考' },
  詨: { pinyin: 'xiào', hint: '自呼其名(旧注)' },
  橛: { pinyin: 'jué', hint: '鼓槌,训释取通行解' },
  柜: { pinyin: 'jǔ', hint: '山名用字,郭璞注「音矩」,此处不读「guì」' },
  鴸: { pinyin: 'zhū', hint: '鸟名用字,郭璞注「音株」;字无通行简化形,照录底本' },
  痹: { pinyin: 'bì', hint: '底本作「痺」,义为痹症;郭璞注「未詳」' },
  鬛: { pinyin: 'liè', hint: '同「鬣」,兽颈部长毛;底本作「鬛」照录,不作异体改字' },
  褢: { pinyin: 'huái', hint: '兽名用字(猾褢),郭璞注「滑懷兩音」;「褢」为「懷」古字,照录底本' },
  斲: { pinyin: 'zhuó', hint: '同「斫」,砍削;郭璞注「如人斫木聲」' },
  繇: { pinyin: 'yáo', hint: '此处通「徭」(徭役),郭璞注「謂作役也」' },
  蝮: { pinyin: 'fù', hint: '毒蛇名;郭璞注「蚖也」' },
  鮆: { pinyin: 'jì', hint: '鱼名,即刀鱼;郭璞注「音祚啓反」' },
  虖: { pinyin: 'hū', hint: '水名用字(虖勺),郭璞注「音呼」' },
  𨴯: { pinyin: 'zhuō', hint: '水名用字(𨴯水),郭璞注「音涿」' },
  雘: { pinyin: 'huò', hint: '青雘,矿物颜料;与青丘之山「䨼」相类,底本二经用「雘」照录;底本无音注,音从通行定音' },
  瘗: { pinyin: 'yì', hint: '埋祭品;底本作「瘞」转简照录;底本无音注,音从通行定音' },
}
