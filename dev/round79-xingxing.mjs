// G79:xingxing laterReception +2 条(礼记能言 claim + 广注汇证)
import fs from 'node:fs'

const p = 'D:/zcode/workspace/default/shanhai/src/data/entities/xingxing.ts'
let s = fs.readFileSync(p, 'utf8')

// 锚 = xingxing laterReception 数组闭合(从 laterReception 起第一个行首两空格 '  ],')
const iRec = s.indexOf('laterReception')
if (iRec < 0) { console.error('NO laterReception'); process.exit(1) }
const closeRel = s.indexOf('\n  ],', iRec)
if (closeRel < 0) { console.error('NO array close'); process.exit(1) }

const add = `,
    {
      era: '先秦两汉文献链(《禮記》及清·吳任臣《山海經廣注》彙證)',
      text: '狌狌在早期文献中最著名的一笔是「能言」:《禮記·曲禮上》以「鸚鵡能言,不離飛鳥;猩猩能言,不離禽獸」立人禽之辨。吳任臣《廣注》又彙錄《王會解》「都郭生生,即狌狌也」(以《逸周書·王會解》的都郭/生生為異名)与《太微經》「狌染齒于酒」等说,与本经「食之善走」的记载并存。',
      claims: [
        {
          text: '《禮記·曲禮上》以「猩猩能言」与鹦鹉对举,谓其虽能言、不離禽獸——狌狌的「能言」是早期文献链中最著名的一笔。',
          sourceTitle: '《禮記·曲禮上》(漢·戴聖編)',
          sourceUrl: 'https://zh.wikisource.org/wiki/%E7%A6%AE%E8%A8%98/%E6%9B%B2%E7%A6%AE%E4%B8%8A',
          quote: '鸚鵡能言，不離飛鳥；猩猩能言，不離禽獸。今人而無禮，雖能言，不亦禽獸之心乎！',
          archive: 'EDITION_EVIDENCE/liji-quli-shang-excerpt-20261004.txt',
          note: '《禮記》以猩猩之「能言」为人禽之辨的话头;与本经「食之善走」构成狌狌文献的两条主线(言/走)。G79 新增。',
        },
        {
          text: '吳任臣《廣注》彙錄《王會解》「都郭生生即狌狌」与《太微經》「狌染齒于酒」诸说,狌狌异名与传说并陈。',
          sourceTitle: '《山海經廣注》(四庫全書本)卷01·吳任臣案引',
          sourceUrl: 'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93%E5%BB%A3%E6%B3%A8_(%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC)/%E5%8D%B701',
          quote: '任臣案淮南萬畢術曰婦終知來狌狌知往王㑹解州靡以費費都郭生生即狌狌也太微經曰狌染齒于酒忘其努取',
          archive: 'EDITION_EVIDENCE/guangzhu-juan01-20261004.txt',
          note: '「王㑹解」即《逸周書·王會解》;汇证文字照录广注案语,本站不分拆诸引。G79 新增。',
        },
      ],
    },`

s = s.slice(0, closeRel) + add + s.slice(closeRel)

fs.writeFileSync(p, s)
console.log('OK xingxing')
