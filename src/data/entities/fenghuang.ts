import type { Entity } from '../types'

/**
 * 凤皇 —— 原文于 2026-09-20 经 ctext.org 公开文本逐字核对。
 * 重要:丹穴之山在《南山经》南次三经(天虞、祷过之后第三山),不在南次一经。
 */
export const FENGHUANG: Entity = {
  id: 'ent-fenghuang',
  slug: 'fenghuang',
  canonicalName: '凤皇',
  pinyin: 'fèng huáng',
  aliases: ['凤凰(后世通写)'],
  type: 'bird',
  summary:
    '丹穴之山的神鸟,状如鸡而五彩羽纹,纹采配德、义、礼、仁、信五字;自歌自舞,原文载其出现则天下安宁。',
  chapterIds: ['ch-nanshan'],
  locationIds: ['loc-danxue'],
  citations: [
    {
      originalText:
        '有鸟焉，其状如鸡，五采而文，名曰凤皇，首文曰德，翼文曰义，背文曰礼，膺文曰仁，腹文曰信。是鸟也，饮食自然，自歌自舞，见则天下安宁。',
      chapter: '南山经',
      section: '南次三经 · 丹穴之山',
      guoPuNotes: [
        {
          attach: '見則天下安寧',
          text: '漢時鳳鳥數出，高五六尺，五采。莊周說鳳，文字與此有異。《廣雅》云：鳳，雞頭、鷰頷、蛇頸、龜背、魚尾。雌曰凰，雄曰鳳',
        },
      ],
      sourceEdition: '通行本(郭璞注—郝懿行笺疏系统),据 ctext.org 公开电子文本逐字核对',
      publicUrl: 'https://ctext.org/shan-hai-jing/nan-shan-jing/zhs',
      verificationNote:
        '2026-09-20 经 ctext 公开文本逐字核对(原文较长,分两段连续核对后合录,拼接处为同一原文段落连续文字)。丹穴之山句「又东五百里,曰丹穴之山,其上多金玉。丹水出焉,而南流注于渤海。」同日核对。 2026-10-02 郭璞注层上线:注文 1 条逐字照录底本B原始 wikitext(存档 EDITION_EVIDENCE/wikisource-nanshan1-guopu-20261002.txt,南次三经丹穴之山段),保持繁体未转简;郭注自称「莊周說鳳,文字與此有異」,与「五采而文,首文曰德…」的图文体系差异为底本自述,照录不裁决。',
      verifiedAt: '2026-09-20',
    },
  ],
  appearanceTraits: [
    {
      kind: 'appearance',
      text: '其状如鸡,五采而文——形体如鸡,羽有五彩而带纹饰。',
      citationIndex: 0,
    },
    {
      kind: 'appearance',
      text: '首文曰德,翼文曰义,背文曰礼,膺文曰仁,腹文曰信——身上五处纹采,原文分别配以德、义、礼、仁、信五字(文字图案的具体形态原文未详)。',
      citationIndex: 0,
    },
  ],
  behaviorTraits: [
    {
      kind: 'behavior',
      text: '饮食自然,自歌自舞——饮水吃食顺乎自然,自己歌唱,自己起舞。',
      citationIndex: 0,
    },
  ],
  soundTraits: [], // 原文未载(「自歌」见行为,歌之内容/音色原文未载)
  dietTraits: [], // 原文仅言「饮食自然」,具体食性未载
  abilities: [], // 无食用佩戴等记述
  omens: [
    {
      text: '见则天下安宁——原文载此鸟出现,则天下安宁(征兆记述)。',
      citationIndex: 0,
    },
  ],
  modernExplanation:
    '凤皇见于《南山经》南次三经的丹穴之山。按原文,它形如鸡而羽有五彩纹饰,身上五处纹采配德、义、礼、仁、信五字;习性「饮食自然,自歌自舞」,出现被视为天下安宁的征兆。「凤皇」即后世通写的「凤凰」,此处保留底本用字。',
  disputedReadings: [
    '「首文曰德」等五处纹采,是文字图案还是花纹名目,原文未详,历代理解不一。',
    '「饮食自然」的「自然」,或解作顺乎本性,或解作自取自足,存在不同读法。',
    '「凤皇」与「凤凰」为用字异写,通行认识;本站以底本用字「凤皇」为主并在异名中注明。',
  ],
  relatedEntityIds: [],
  tags: ['南山经', '南次三经', '丹穴之山', '五彩', '瑞鸟'],
  recordStatus: 'verified',
  illustration: {
    kind: 'svg',
    alt: '凤皇剪影插画(据原文描述艺术演绎)',
    note: '据原文描述艺术演绎',
  },
  laterReception: [
    {
      era: '后世流变(本站编辑说明,与上方原始记载相区分)',
      text: '凤皇即后世通称的凤凰。先秦两汉以来,凤凰作为祥瑞之鸟在典籍、器物与绘画中的形象不断增衍,其「五采」「见则天下安宁」等要素与《南山经》此条有承续关系,但细节增益甚多。本站后续将以专文梳理,此处仅作提示,不展开考证。',
    },
  ],
  updatedAt: '2026-09-20',
}
