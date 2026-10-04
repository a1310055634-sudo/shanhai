import type { Entity } from '../types'

/**
 * 应龙 —— 原文于 2026-09-20 经 ctext.org 公开文本逐字核对。
 * 所在:大荒东经·凶犁土丘(大荒东北隅)。
 */
export const YINGLONG: Entity = {
  id: 'ent-yinglong',
  slug: 'yinglong',
  canonicalName: '应龙',
  pinyin: 'yìng lóng',
  aliases: [],
  type: 'deity',
  summary:
    '居于南极的神龙:原文记其杀蚩尤与夸父后不得复上天空,人间因此屡有旱灾;作应龙之形,乃得大雨。',
  chapterIds: ['ch-dahuang-dong'],
  locationIds: ['loc-xionglitu'],
  citations: [
    {
      originalText:
        '大荒东北隅中，有山名曰凶犁土丘。应龙处南极，杀蚩尤与夸父，不得复上。故下数旱，旱而为应龙之状，乃得大雨。',
      chapter: '大荒东经',
      section: '凶犁土丘',
      sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
      publicUrl: 'https://ctext.org/shan-hai-jing/da-huang-dong-jing/zhs',
      verificationNote:
        '2026-09-20 经 ctext 公开文本逐字核对。应龙另有见于《大荒北经》的记载,本条只录《大荒东经》,两处关系待山川/谱系轮核对。',
      verifiedAt: '2026-09-20',
    },
  ],
  appearanceTraits: [], // 形貌原文未详(「应龙之状」的具体样子原文未描述)
  behaviorTraits: [
    {
      kind: 'behavior',
      text: '杀蚩尤与夸父,不得复上——原文记其诛杀蚩尤与夸父后,不能再返天上(此为原文叙事,照录;相关人物条目待人物类内容轮录入)。',
      citationIndex: 0,
    },
  ],
  soundTraits: [], // 原文未载
  dietTraits: [], // 原文未载
  abilities: [
    {
      text: '旱而为应龙之状,乃得大雨——天旱时扮作应龙之形,便可求得大雨(求雨记述)。',
      citationIndex: 0,
    },
  ],
  omens: [], // 原文未载(「故下数旱」为其离开之后果,见释义)
  modernExplanation:
    '应龙见于《大荒东经》。原文记述:它住在南极,曾杀蚩尤与夸父,因此不能再返天上;人间于是屡有旱灾,天旱时人们作出应龙之形,便能得到大雨。原文未描述其形貌(后世「有翼之龙」的印象多来自本条与其他篇章的合读,本站不混入)。「旱而为应龙之状」是古代求雨习俗的早期记述。',
  disputedReadings: [
    '应龙究竟属神还是属兽、龙形有无翼,本篇原文未详;本站按「有神」类归入神祇,此分类为本站索引。',
    '《大荒北经》别见应龙记载,与《大荒东经》本条的关系待核对后一并呈现。',
    '凶犁土丘的现代地理比附,无从稽考,本站暂不录入。',
  ],
  // G80 互链:吴粲《赤牍》云「應龍以屈伸為神,鳳皇以嘉鳴為貴」,两兽并举(广注卷14存档在案)
  relatedEntityIds: ['ent-fenghuang'],
  tags: ['大荒东经', '凶犁土丘', '杀蚩尤与夸父', '司雨'],
  recordStatus: 'verified',
  illustration: {
    kind: 'svg',
    alt: '应龙剪影插画(据原文描述艺术演绎)',
    note: '据原文描述艺术演绎',
  },
  laterReception: [
    {
      era: '后世流变(本站编辑说明,与上方原始记载相区分)',
      text: '应龙「助战诛蚩尤」与「司雨」的记述,成为后世有翼神龙形象的源头之一,在画像石、青铜纹样与小说演义中多有演绎。这些形象增益与《大荒东经》短短数十字的原文相去甚远,本站后续将以专文梳理。',
    },
    {
      era: '清·吳任臣《山海經廣注》引《楚辭》等',
      text: '应龙「殺蚩尤與夸父,不得復上,故下數旱」,郭注谓「應龍遂住地下,故上無復下雨」;吴任臣《广注》并引《楚辞·天問》「應龍何畫?河海何歷?」、《述異記》「龍千年為應龍」诸说,把应龙杀伐、致雨的双重叙述串为一系。',
      claims: [
        {
          text: '《楚辞·天問》「應龍何畫?河海何歷?」之问,王逸系之于应龙以尾画地导流的传说,与经文应龙杀蚩尤的叙述同属一系。',
          sourceTitle: '《山海經廣注》(四庫全書本)卷14·吳任臣案引',
          sourceUrl:
            'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93%E5%BB%A3%E6%B3%A8_(%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC)/%E5%8D%B714',
          quote: '楚辭云應龍何畫河海何厯漢周憬碑應龍之畫謂此',
          archive: 'EDITION_EVIDENCE/guangzhu-juan14-20261004.txt',
          note: '吴任臣案引;「應龍何畫」的「畫」通「划」,指以尾划地成江河(王逸说)。',
        },
        {
          text: '《述異記》有「龍千年為應龍」之说,应龙被视为龙之寿者,吴任臣引之以释其名。',
          sourceTitle: '《山海經廣注》(四庫全書本)卷14·吳任臣案引',
          sourceUrl:
            'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93%E5%BB%A3%E6%B3%A8_(%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC)/%E5%8D%B714',
          quote: '又虬龍千年謂之應龍述異記亦云龍千年為應龍',
          archive: 'EDITION_EVIDENCE/guangzhu-juan14-20261004.txt',
          note: '吴任臣案引;梁任昉《述異记》题名,内容为龙龄分级传说。',
        },
      ],
    },
  ],
  updatedAt: '2026-09-20',
}
