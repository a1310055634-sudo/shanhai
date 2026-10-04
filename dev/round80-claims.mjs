// G80:蛊雕/䍺 laterReception +1 段各(广注彙證,claim 各×2)
import fs from 'node:fs'

const WIKI_J1 = 'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93%E5%BB%A3%E6%B3%A8_(%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC)/%E5%8D%B701'
const ARCH = 'EDITION_EVIDENCE/guangzhu-juan01-20261004.txt'

// ── 蛊雕 ──
{
  const p = 'D:/zcode/workspace/default/shanhai/src/data/entities/gudiao.ts'
  let s = fs.readFileSync(p, 'utf8')
  const iRec = s.indexOf('laterReception')
  const closeRel = s.indexOf('\n  ],', iRec)
  if (iRec < 0 || closeRel < 0) { console.error('GUARD gudiao locate'); process.exit(1) }
  const add = `,
    {
      era: '清·吳任臣《山海經廣注》彙證(蠱雕條案語)',
      text: '吴任臣于蛊雕条引郭璞《图赞》「纂雕有角,聲若兒號」——广注所引图赞同记异文作「纂」,与正文「蠱」并存;又引《事物紺珠》「蠱雕如豹鳥喙一角」,豹身鸟喙的兽形由此成为后世通行的蛊雕形象。《駢雅》「蠱雕如雕而戴角」则守原文「如雕」之读。',
      claims: [
        {
          text: '郭璞《山海经图赞》咏蛊雕「有角」「聲若兒號」,广注所引赞文且从异文作「纂雕」。',
          sourceTitle: '《山海經廣注》(四庫全書本)卷01·吳任臣案引',
          sourceUrl: WIKI_J1,
          quote: '圖贊曰纂雕有角聲若兒號',
          archive: ARCH,
          note: '广注案语;图赞用字从异文「纂」,与本站正文从「蠱」两存,参疑17。G80 新增。',
        },
        {
          text: '《事物紺珠》记蛊雕「如豹鳥喙一角」,豹身鸟喙之形成为后世通行的蛊雕形象,与经文「如雕而有角」已有距离。',
          sourceTitle: '《山海經廣注》(四庫全書本)卷01·吳任臣案引《事物紺珠》',
          sourceUrl: WIKI_J1,
          quote: '事物紺珠云蠱雕如豹鳥喙一角音如嬰兒',
          archive: ARCH,
          note: '吴任臣案引;「如豹鳥喙」属后世形象增益,本站照录并存于原文「如雕」读。G80 新增。',
        },
      ],
    },`
  s = s.slice(0, closeRel) + add + s.slice(closeRel)
  fs.writeFileSync(p, s)
  console.log('OK gudiao')
}

// ── 䍺 ──
{
  const p = 'D:/zcode/workspace/default/shanhai/src/data/entities/xun.ts'
  let s = fs.readFileSync(p, 'utf8')
  const iRec = s.indexOf('laterReception')
  const closeRel = s.indexOf('\n  ],', iRec)
  if (iRec < 0 || closeRel < 0) { console.error('GUARD xun locate'); process.exit(1) }
  const add = `,
    {
      era: '清·吳任臣《山海經廣注》彙證(䍺條案語)',
      text: '吴任臣于䍺条引郭璞《图赞》「有獸無口,其名曰䍺,害氣不入,厥體無間,至理之盡,出乎自然」,把「不可杀」提升到至理自然的哲学层面;又彙引《獸經》「䍺則無口」、《事物紺珠》「䍺如羊無口黑色」、孫愐《唐韻》「䍺獸名,似羊黑色,無口,不可殺也」——诸本并增「黑色」一色,为经文所未载。',
      claims: [
        {
          text: '郭璞《山海经图赞》咏䍺「害氣不入,厥體無間」,以「至理自然」解释其不可杀。',
          sourceTitle: '《山海經廣注》(四庫全書本)卷01·吳任臣案引',
          sourceUrl: WIKI_J1,
          quote: '圖贊曰有獸無口其名曰䍺害氣不入厥體無間至理之盡出乎自然',
          archive: ARCH,
          note: '广注案语;图赞之解与郭注「稟氣自然」一脉相承。G80 新增。',
        },
        {
          text: '《事物紺珠》与孫愐《唐韻》记䍺「似羊黑色,無口」,于经文的「如羊而无口」外增「黑色」之色,吴任臣并引《獸經》「䍺則無口」相证。',
          sourceTitle: '《山海經廣注》(四庫全書本)卷01·吳任臣案引《唐韻》等',
          sourceUrl: WIKI_J1,
          quote: '獸經曰蟨則比肩䍺則無口事物紺珠云䍺如羊無口黑色孫愐唐韻曰䍺獸名似羊黑色無口不可殺也',
          archive: ARCH,
          note: '吴任臣案引汇录;「黑色」为后世增益,本站照录并注明经文未载。G80 新增。',
        },
      ],
    },`
  s = s.slice(0, closeRel) + add + s.slice(closeRel)
  fs.writeFileSync(p, s)
  console.log('OK xun')
}

// ── 互见(modernExplanation 文字互见) ──
{
  const p = 'D:/zcode/workspace/default/shanhai/src/data/entities/gudiao.ts'
  let s = fs.readFileSync(p, 'utf8')
  const old = '清代以来刊本多把它画成豹身雕首的兽形,本站不采后起形象,插画与古图一依原文「如雕而有角」。'
  if (s.split(old).length - 1 !== 1) { console.error('GUARD gudiao cross-ref'); process.exit(1) }
  s = s.replace(old, '吴任臣《广注》引《事物紺珠》「如豹鳥喙一角」,豹身雕首的兽形自清代图籍已通行(见本条「后世流变」);本站插画与古图仍一依原文「如雕而有角」。洵山之䍺(见䍺条)同为「状如X而缺一常形」的南山经异兽,可参看。')
  fs.writeFileSync(p, s)
  console.log('OK gudiao cross-ref')
}
{
  const p = 'D:/zcode/workspace/default/shanhai/src/data/entities/xun.ts'
  let s = fs.readFileSync(p, 'utf8')
  const old = '无口而不可杀的组合,使它成为《南山经》中最抽象的异兽之一;其真实原型为何,本站不作推断。'
  if (s.split(old).length - 1 !== 1) { console.error('GUARD xun cross-ref'); process.exit(1) }
  s = s.replace(old, '无口而不可杀的组合,使它成为《南山经》中最抽象的异兽之一;其真实原型为何,本站不作推断。鹿吴之山的蛊雕(见蛊雕条)同以「其音如婴儿之音」著称,两兽叫声的记载在南山经中恰成一对。')
  fs.writeFileSync(p, s)
  console.log('OK xun cross-ref')
}
console.log('G80 ALL APPLIED')
