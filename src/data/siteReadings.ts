/**
 * 站内通读参考读音(G35 从 AtlasPage 抽出为单一来源)。
 *
 * 说明层:本站标注读音分两层——ruby 注音层(chapterTexts.GLOSSARY,古卷阅读器
 * 逐字注音)与本通读层(山川图山名读音)。两层均为「读音供参考,以旧注通读为准;
 * 非核验内容」:底本有郭璞注音注者,音表并列照录(见 data/readings.ts);
 * 底本无音注者一律留白,本层读音同时降级标注,不写成定论。
 *
 * 抽出原因:难字音表页(G35)须与山川图取同一份读音,避免第二份分歧值。
 */
export const MOUNTAIN_READINGS: Record<string, string> = {
  招摇之山: 'zhāo yáo zhī shān',
  堂庭之山: 'táng tíng zhī shān',
  猨翼之山: 'yuán yì zhī shān',
  亶爰之山: 'dǎn yuán zhī shān',
  基山: 'jī shān',
  杻阳之山: 'chǔ yáng zhī shān',
  青丘之山: 'qīng qiū zhī shān',
  丹穴之山: 'dān xué zhī shān',
  天山: 'tiān shān',
  泰器之山: 'tài qì zhī shān',
  槐江之山: 'huái jiāng zhī shān',
  昆仑之丘: 'kūn lún zhī qiū',
  发鸠之山: 'fā jiū zhī shān',
  锺山: 'zhōng shān',
  凶犁土丘: 'xiōng lí tǔ qiū',
  流波山: 'liú bō shān',
  柜山: 'jǔ shān',
  长右之山: 'cháng yòu zhī shān',
  尧光之山: 'yáo guāng zhī shān',
  羽山: 'yǔ shān',
  浮玉之山: 'fú yù zhī shān',
  成山: 'chéng shān',
  瞿父之山: 'qú fù zhī shān',
  句余之山: 'jù yú zhī shān',
  会稽之山: 'kuài jī zhī shān',
  夷山: 'yí shān',
  仆勾之山: 'pú gōu zhī shān',
  洵山: 'xún shān',
  虖勺之山: 'hū sháo zhī shān',
  区吴之山: 'ōu wú zhī shān',
  鹿吴之山: 'lù wú zhī shān',
  漆吴之山: 'qī wú zhī shān',
}
