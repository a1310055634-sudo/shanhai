import type { Entity } from '../types'

/**
 * 䍺 —— G75 建条(2026-10-04)。底本A(ctext)软拦截(200 但正文零命中),用字经
 * 中文维基文库两个具名来源(B1《山海經/南山經》页面文本 × B2 四库本郭璞注)逐字
 * 对照一致后录入;A 侧恢复后回核。详见 EDITION_AUDIT.md 三之补10。
 * 异文「洵一作旬」两源同记,登记疑16(variants)。
 * 配图:画心=原创 SVG 演绎(registry/xun.tsx,羊形无口;ART 台账已登记);
 * 词条页主位无刻本原件(维基共享暂无䍺合规图,「待补古图」如实)。
 */
export const XUN: Entity = {
  id: 'ent-xun',
  slug: 'xun',
  canonicalName: '䍺',
  pinyin: 'huán',
  aliases: [],
  type: 'beast',
  summary:
    '洵山的异兽,形状像羊却没有嘴,不可杀;郭璞注「稟氣自然」,谓其禀受自然之气如此。',
  chapterIds: ['ch-nanshan'],
  locationIds: ['loc-xunshan'],
  citations: [
    {
      originalText: '有兽焉，其状如羊而无口，不可杀也，其名曰䍺。洵水出焉，而南流注于阏之泽，其中多芘蠃。',
      chapter: '南山经',
      section: '南次二经第十二山(洵山)',
      guoPuNotes: [
        {
          attach: '不可杀也',
          text: '稟氣自然',
        },
        {
          attach: '其名曰䍺',
          text: '音還，或音患',
        },
      ],
      sourceEdition:
        '通行本(郭璞注系统),据中文维基文库《山海經/南山經》页面文本(B1)与维基文库四库本郭璞注(B2)两源逐字核对;底本A(ctext.org)2026-10-04 复测软拦截页(200 但正文零命中),恢复后回核',
      publicUrl:
        'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E5%8D%97%E5%B1%B1%E7%B6%93',
      variantText:
        '「洵山」之「洵」:底本B1页面自带异文标注「洵一作「旬」山」;底本B2四库本郭璞注同记{{另|洵|旬}}(存档第 58 行)。两源正文均作「洵」。本站从两源正文用字「洵」,异文登记疑16;底本A待回核。兽名「䍺」两源同形照录。',
      verificationNote:
        '2026-10-04 建条核验(G75):底本B1(存档 EDITION_EVIDENCE/wikisource-nanshan1-b1-20261002.txt 第L13行)与底本B2(存档 wikisource-nanshan1-guopu-20261002.txt 第58行)本句净化正文逐字一致;上屏为简体逐字转换(東→东/無→无/狀→状/陰→阴/殺→杀/閼→阏/澤→泽,对照表见 EDITION_AUDIT.md 三之补10),注文保持繁体未转简。「䍺」无通行简化形,照录底本;郭注「音還,或音患」兩音,注音层取 huán(另一读不标)。底本A(ctext zhs)2026-10-04 复测 200 但正文零命中(软拦截页),A×B 回核挂账,见疑16。',
      verifiedAt: '2026-10-04',
    },
  ],
  appearanceTraits: [
    {
      kind: 'appearance',
      text: '其状如羊而无口——形状像普通的羊,却没有嘴。「无口」是本条最醒目的形貌特征。',
      citationIndex: 0,
    },
  ],
  behaviorTraits: [],
  soundTraits: [], // 原文未载(无口之兽,原文亦未记其音)
  dietTraits: [],
  abilities: [
    {
      text: '不可杀也——无法把它杀死。郭璞注「稟氣自然」,谓其禀受自然之气而生,故不惧刀兵。',
      citationIndex: 0,
    },
  ],
  omens: [], // 原文未载
  modernExplanation:
    '䍺见于《南山经》南次二经的洵山。按原文,它形状像羊却没有嘴,而且「不可杀」——郭璞解释为「稟氣自然」,说它禀受自然之气而生,所以不惧杀伤。它的名字郭璞注「音還,或音患」,两读并存。无口而不可杀的组合,使它成为《南山经》中最抽象的异兽之一;其真实原型为何,本站不作推断。「洵」字底本自带异文「一作旬」(疑16),本站从两源共用作「洵」。',
  disputedReadings: [
    '「洵山」之「洵」:底本B1/B2均作「洵」,页面自带异文「一作旬」(疑16);本站照录底本用字。',
    '郭注「音還,或音患」:兩读并存,本站注音层取 huán(「還」),「患」读不标,两存照录不裁决。',
    '底本A(ctext)2026-10-04 复测软拦截页(200 但正文零命中),本条用字以中文维基文库两源(B1×B2)逐字对照为据,A 恢复后回核;在此之前本条核验状态保持「待考证」。',
  ],
  relatedEntityIds: [],
  tags: ['南山经', '洵山', '如羊', '无口', '不可杀', '稟氣自然'],
  recordStatus: 'unverified',
  illustration: {
    kind: 'svg',
    alt: '䍺原创插画:羊形立兽,身覆短鬃,闭目无口,静立如凝(据原文描述艺术演绎)',
    note: 'G75 原创演绎(registry/xun.tsx);刻本原件维基共享暂无,「待补古图」如实',
  },
  updatedAt: '2026-10-04',
}
