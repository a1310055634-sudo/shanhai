// G79:jiuweihu laterReception +2 条(瑞应链/史志链)——重写版
import fs from 'node:fs'

const path79 = 'D:/zcode/workspace/default/shanhai/src/data/entities/jiuweihu.ts'
let src = fs.readFileSync(path79, 'utf8')

const iRec = src.indexOf('laterReception')
if (iRec < 0) { console.error('NO laterReception'); process.exit(1) }
const closeRel = src.indexOf('\n  ],', iRec)
if (closeRel < 0) { console.error('NO array close'); process.exit(1) }

const add = `,
    {
      era: '漢代讖緯與史志符瑞系統(吳任臣《山海經廣注》卷一彙引)',
      text: '九尾狐在漢代讖緯與史志中是系統性的祥瑞:吳任臣《廣注》彙引《孝經援神契》「德至鳥獸,則狐九尾」、《春秋運斗樞》「璣星得,則狐九尾」、《孫氏瑞應圖》「王者不傾于色,則九尾狐至」諸說,又歷數《古今注》章帝時白狐九尾見信都、《魏略》文帝受禪郡國奏九尾狐見于譙、《北史》天平八年光州獲九尾狐等史事——瑞應敘事自西漢讖緯貫穿至北朝史志。',
      claims: [
        {
          text: '漢代緯書《孝經援神契》以「狐九尾」為「德至鳥獸」的太平之應,九尾之數被賦予德化意義。',
          sourceTitle: '《山海經廣注》(四庫全書本)卷01·吳任臣案引《孝經援神契》',
          sourceUrl: 'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93%E5%BB%A3%E6%B3%A8_(%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC)/%E5%8D%B701',
          quote: '孝經援神契徳至鳥獸則狐九尾',
          archive: 'EDITION_EVIDENCE/guangzhu-juan01-20261004.txt',
          note: '吳任臣案引;與《吳越春秋》塗山歌(見上條)同為漢代九尾狐祥瑞敘事的兩大源頭(緯書系/史事系)。G79 新增。',
        },
        {
          text: '自東漢《古今注》記章帝時「白狐九尾見信都」,至《魏略》《北史》符瑞志歷歷記載九尾狐之見,九尾狐作為王朝符瑞進入正史書寫。',
          sourceTitle: '《山海經廣注》(四庫全書本)卷01·吳任臣案引《古今注》等',
          sourceUrl: 'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%B6%93%E5%BB%A3%E6%B3%A8_(%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC)/%E5%8D%B701',
          quote: '古今注章帝時白狐九尾見信都魏畧云文帝欲受禪郡國奏九尾狐見于譙陳宋符瑞志黄初元年九尾狐又見甄城北史天平八年光州獲九尾狐以獻',
          archive: 'EDITION_EVIDENCE/guangzhu-juan01-20261004.txt',
          note: '吳任臣案引連珠式彙錄;引文自「古今注」至「以獻」為四書連錄,本站不分拆。G79 新增。',
        },
      ],
    },`

src = src.slice(0, closeRel) + add + src.slice(closeRel)

const dAnchor = '  disputedReadings: ['
if (src.split(dAnchor).length - 1 !== 1) { console.error('GUARD disputed'); process.exit(1) }
const dAdd = `  disputedReadings: [
    '「食者不蠱」郭注兩說:郭璞注「噉其肉令人不逄妖邪之氣」,又存「或曰蠱,蠱毒」一說——「不蠱」究竟是「不逢妖邪」還是「不中蠱毒」,郭注已兩說並存,本站照錄不裁決。(G79 登記)`
src = src.replace(dAnchor, dAdd)

fs.writeFileSync(path79, src)
console.log('OK jiuweihu')
