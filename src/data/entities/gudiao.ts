import type { Entity } from '../types'

/**
 * 蛊雕 —— G75 建条(2026-10-04)。底本A(ctext)软拦截(200 但正文零命中),用字经
 * 中文维基文库两个具名来源(B1《山海經/南山經》页面文本 × B2 四库本郭璞注)逐字
 * 对照一致后录入;A 侧恢复后回核。详见 EDITION_AUDIT.md 三之补11。
 * 异文「蠱一作纂」两源同记,登记疑17(variants)。
 * 配图:词条页主位=《南山經-蠱雕.svg》分册古图栅格件(古今图书集成·禽虫典矢量化
 * 同族,S8,classicScans 通道);画心未注册正式插画,水墨底座过渡如实。
 */
export const GUDIAO: Entity = {
  id: 'ent-gudiao',
  slug: 'gudiao',
  canonicalName: '蛊雕',
  pinyin: 'gǔ diāo',
  aliases: ['蠱雕(底本用字)'],
  type: 'beast',
  summary:
    '鹿吴之山泽更之水中的异兽,名叫蛊雕,形状像雕而有角,鸣声如婴儿啼哭,是会吃人的猛兽。',
  chapterIds: ['ch-nanshan'],
  locationIds: ['loc-luwu'],
  citations: [
    {
      originalText: '水有兽焉，名曰蛊雕，其状如雕而有角，其音如婴儿之音，是食人。',
      chapter: '南山经',
      section: '南次二经第十五山(鹿吴之山)',
      sourceEdition:
        '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)与维基文库四库本郭璞注(B2)两源逐字核对;底本A(ctext.org)2026-10-04 复测软拦截页(200 但正文零命中),恢复后回核',
      publicUrl:
        'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
      variantText:
        '「蛊雕」之「蛊」:底本B1页面自带异文标注「名曰蛊一作「纂」雕」;底本B2四库本郭璞注同记{{另|蠱|纂}}(存档第 64 行)。两源正文均作「蠱」。本站从两源正文用字「蠱」(简体「蛊」),异文登记疑17;底本A待回核。',
      verificationNote:
        '2026-10-04 建条核验(G75):底本B1(存档 EDITION_EVIDENCE/wikisource-nanshan1-b1-20261002.txt 第L16行)与底本B2(存档 wikisource-nanshan1-guopu-20261002.txt 第64行)本句净化正文逐字一致;上屏为简体逐字转换(吳→吴/澤→泽/蠱→蛊/嬰兒→婴儿,对照表见 EDITION_AUDIT.md 三之补11)。本山无郭璞注,注层如实空缺。底本A(ctext zhs)2026-10-04 复测 200 但正文零命中(软拦截页),A×B 回核挂账,登记疑17。',
      verifiedAt: '2026-10-04',
    },
  ],
  appearanceTraits: [
    {
      kind: 'appearance',
      text: '其状如雕而有角——身体像雕(猛禽),头上长有角。',
      citationIndex: 0,
    },
  ],
  soundTraits: [
    {
      kind: 'sound',
      text: '其音如婴儿之音——鸣声如同婴儿啼哭。',
      citationIndex: 0,
    },
  ],
  behaviorTraits: [],
  dietTraits: [
    {
      kind: 'diet',
      text: '是食人——会吃人。',
      citationIndex: 0,
    },
  ],
  abilities: [], // 原文未载
  omens: [], // 原文未载
  modernExplanation:
    '蛊雕见于《南山经》南次二经的鹿吴之山,住在泽更之水一带。按原文,它形状像雕而头上长角,叫声像婴儿啼哭,是吃人的猛兽。「蛊雕」之名,底本自带异文「一作纂」(疑17),本站从两源共用作「蛊」。其原型或与某种大型猛禽相关,本站不作推断。清代以来刊本多把它画成豹身雕首的兽形,本站不采后起形象,插画与古图一依原文「如雕而有角」。',
  disputedReadings: [
    '「蛊雕」之「蛊」:底本B1/B2均作「蠱」,页面自带异文「一作纂」(疑17);本站照录底本用字(简体「蛊」)。',
    '「其音如婴儿之音」:两源均重「音」字,照录不省;有读本断句作「其音如婴儿」,本站不采省文。',
    '底本A(ctext)2026-10-04 复测软拦截页(200 但正文零命中),本条用字以中文维基文库两源(B1×B2)逐字对照为据,A 恢复后回核;在此之前本条核验状态保持「待考证」。',
  ],
  relatedEntityIds: [],
  tags: ['南山经', '鹿吴之山', '如雕', '有角', '婴儿之音', '食人'],
  recordStatus: 'unverified',
  illustration: {
    kind: 'svg',
    alt: '蛊雕水墨底座过渡插画(画心未注册正式插画;分册古图见词条页主位)',
    note: '画心未注册正式插画,渲染统一水墨底座过渡层;《古今图书集成》禽虫典分册古图(S8)在词条页主位并陈',
  },
  updatedAt: '2026-10-04',
}
