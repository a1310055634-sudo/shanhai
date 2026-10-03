import jiuweihuScan from '../../assets/classic-art/jiuweihu-jiangyingke.jpg'
import lushuJiangScan from '../../assets/classic-art/lushu-jiangyingke.jpg'
import lushuWangScan from '../../assets/classic-art/lushu-wangfu.jpg'
import huahuaiScan from '../../assets/classic-art/huahuai-jiangyingke.jpg'
import changyouScan from '../../assets/classic-art/changyou-jiangyingke.jpg'
import jingweiScan from '../../assets/classic-art/jingwei-sancaituhui.jpg'

/**
 * G61 古图原件映射(四阶「古图×站内转描」并陈线)。
 * 刻本纸张扫描件,来源与许可逐幅档案:ART_PROVENANCE「刻本扫描原件」章 S1—S5(全 PD)。
 * 侦察依据:CLASSIC_ART_RECON.md(G59)。
 * 注意:本映射刻意放在组件目录而非 src/data——四阶硬红线「美术轮禁改 src/data/*」,
 * 数据归档调整留内容轮(G81 凡例/三页联动如需)再议。
 */
export interface ClassicScan {
  slug: string
  src: string
  width: number
  height: number
  /** 款识主体:刻本名 · 朝代版次 */
  edition: string
  /** 藏所(不知则「藏所待考」) */
  credit: string
  /** 装裱 object-position(如 fol7b 左缘溢入需偏右) */
  objectPosition?: string
}

export const CLASSIC_SCANS: ClassicScan[] = [
  {
    slug: 'jiuweihu',
    src: jiuweihuScan,
    width: 541,
    height: 625,
    edition: '蒋应镐山海经(图)绘像 · 明崇祯刊本',
    credit: '藏所待考',
  },
  {
    slug: 'lushu',
    src: lushuJiangScan,
    width: 1039,
    height: 865,
    edition: '蒋应镐山海经(图)绘像 · 明崇祯刊本',
    credit: '藏所待考',
  },
  {
    slug: 'lushu',
    src: lushuWangScan,
    width: 607,
    height: 559,
    edition: '汪绂山海经存 · 清光绪二十一年石印本',
    credit: '藏所待考',
  },
  {
    slug: 'huahuai',
    src: huahuaiScan,
    width: 1144,
    height: 576,
    edition: '蒋应镐山海经(图)绘像 · 明崇祯刊本',
    credit: '藏所待考',
    objectPosition: '72% 50%',
  },
  {
    slug: 'changyou',
    src: changyouScan,
    width: 601,
    height: 574,
    edition: '蒋应镐山海经(图)绘像 · 明崇祯刊本',
    credit: '藏所待考',
  },
  {
    // G62:三才图会矢量化件(非纸张扫描),Chrome 栅格化 1010×1400——款识如实注「矢量化件」
    slug: 'jingwei',
    src: jingweiScan,
    width: 1010,
    height: 1400,
    edition: '三才图会 · 明万历成书 · 矢量化件',
    credit: '藏所待考',
  },
]

export function classicScansFor(slug: string): ClassicScan[] {
  return CLASSIC_SCANS.filter((s) => s.slug === slug)
}
