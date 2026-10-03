/**
 * 古籍版画插图清单(2026-09-25 应用户要求以古籍原图替换自绘演绎):
 * 十二条目主体插图采用清《古今图书集成》(1726 年成书)禽虫典/神异典木刻版画,
 * 取自维基共享资源的公有领域(Public Domain)扫描矢量件,来源明确、画风统一。
 * 旧「据原文描述艺术演绎」原创 SVG 全部保留为兜底(经典版画缺失时自动回退)。
 */
import xingxing from '../assets/classic/xingxing.svg'
import lushu from '../assets/classic/lushu.svg'
import fenghuang from '../assets/classic/fenghuang.svg'
import jiuweihu from '../assets/classic/jiuweihu.svg'
import dijiang from '../assets/classic/dijiang.svg'
import jingwei from '../assets/classic/jingwei.svg'
import luwu from '../assets/classic/luwu.svg'
import yingzhao from '../assets/classic/yingzhao.svg'
import wenyaoyu from '../assets/classic/wenyaoyu.svg'
import zhuyin from '../assets/classic/zhuyin.svg'
import yinglong from '../assets/classic/yinglong.svg'
import kui from '../assets/classic/kui.svg'

export interface ClassicArt {
  src: string
  /** G57:固有画幅(取自 SVG viewBox 取整),供 img 显式宽高防 CLS */
  width: number
  height: number
  /** 出处短标(卡片等窄处用) */
  note: string
  /** 完整出处(详情页用) */
  source: string
  /** Commons File 页面(详情页可点击出处) */
  sourceUrl: string
  /** 数字处理说明(矢量化方式) */
  provenance: string
}

const CLASSIC_ART: Record<string, ClassicArt> = {
  xingxing: {
    src: xingxing,
    width: 1320,
    height: 1663,
    note: '《古今图书集成》版画',
    source: '清《古今图书集成·禽虫典》版画(公有领域)',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Imperial_Encyclopaedia_-_Animal_Kingdom_-_pic207_-_%E7%8C%A9%E7%8C%A9%E5%9C%96.svg',
    provenance: 'potrace 自动矢量化(原件为维基共享资源《古今图书集成》扫描插图)',
  },
  lushu: {
    src: lushu,
    width: 1520,
    height: 1332,
    note: '《古今图书集成》版画',
    source: '清《古今图书集成·禽虫典》版画(公有领域)',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Imperial_Encyclopaedia_-_Animal_Kingdom_-_pic234_-_%E9%B9%BF%E8%9C%80%E5%9C%96.svg',
    provenance: 'potrace 自动矢量化(原件为维基共享资源《古今图书集成》扫描插图)',
  },
  fenghuang: {
    src: fenghuang,
    width: 1663,
    height: 2495,
    note: '《古今图书集成》版画',
    source: '清《古今图书集成·禽虫典》版画(公有领域)',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Imperial_Encyclopaedia_-_Animal_Kingdom_-_pic001_-_%E9%B3%B3%E5%87%B0%E5%9C%96.svg',
    provenance: 'potrace 自动矢量化(原件为维基共享资源《古今图书集成》扫描插图)',
  },
  jiuweihu: {
    src: jiuweihu,
    width: 1607,
    height: 2439,
    note: '《古今图书集成》版画',
    source: '清《古今图书集成·禽虫典》版画(公有领域)',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Imperial_Encyclopaedia_-_Animal_Kingdom_-_pic176_-_%E4%B9%9D%E5%B0%BE%E7%8B%90%E5%9C%96.svg',
    provenance: 'potrace 自动矢量化(原件为维基共享资源《古今图书集成》扫描插图)',
  },
  dijiang: {
    src: dijiang,
    width: 1689,
    height: 2507,
    note: '《古今图书集成》版画',
    source: '清《古今图书集成·神异典》版画(公有领域)',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Imperial_Encyclopaedia_-_Spirits_and_the_Supernatural_-_pic19_-_%E5%B8%9D%E6%B1%9F%E7%A5%9E%E5%9C%96.svg',
    provenance: 'potrace 自动矢量化(原件为维基共享资源《古今图书集成》扫描插图)',
  },
  jingwei: {
    src: jingwei,
    width: 1488,
    height: 1682,
    note: '《古今图书集成》版画',
    source: '清《古今图书集成·禽虫典》版画(公有领域)',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Imperial_Encyclopaedia_-_Animal_Kingdom_-_pic130_-_%E7%B2%BE%E8%A1%9B%E5%9C%96.svg',
    provenance: 'potrace 自动矢量化(原件为维基共享资源《古今图书集成》扫描插图)',
  },
  luwu: {
    src: luwu,
    width: 1670,
    height: 2463,
    note: '《古今图书集成》版画',
    source: '清《古今图书集成·神异典》版画(公有领域)',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Imperial_Encyclopaedia_-_Spirits_and_the_Supernatural_-_pic16_-_%E9%99%B8%E5%90%BE%E7%A5%9E%E5%9C%96.svg',
    provenance: 'potrace 自动矢量化(原件为维基共享资源《古今图书集成》扫描插图)',
  },
  yingzhao: {
    src: yingzhao,
    width: 1689,
    height: 2495,
    note: '《古今图书集成》版画',
    source: '清《古今图书集成·神异典》版画(公有领域)',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Imperial_Encyclopaedia_-_Spirits_and_the_Supernatural_-_pic14_-_%E8%8B%B1%E6%8B%9B%E7%A5%9E%E5%9C%96.svg',
    provenance: 'potrace 自动矢量化(原件为维基共享资源《古今图书集成》扫描插图)',
  },
  wenyaoyu: {
    src: wenyaoyu,
    width: 1628,
    height: 2310,
    note: '《古今图书集成》版画',
    source: '清《古今图书集成·禽虫典》版画(公有领域)',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Imperial_Encyclopaedia_-_Animal_Kingdom_-_pic390_-_%E6%96%87%E9%B0%A9%E9%AD%9A%E5%9C%96.svg',
    provenance: 'potrace 自动矢量化(原件为维基共享资源《古今图书集成》扫描插图)',
  },
  zhuyin: {
    src: zhuyin,
    width: 1670,
    height: 2501,
    note: '《古今图书集成》版画',
    source: '清《古今图书集成·神异典》版画(公有领域)',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Imperial_Encyclopaedia_-_Spirits_and_the_Supernatural_-_pic45_-_%E7%87%AD%E9%99%B0%E7%A5%9E%E5%9C%96.svg',
    provenance: 'potrace 自动矢量化(原件为维基共享资源《古今图书集成》扫描插图)',
  },
  yinglong: {
    src: yinglong,
    width: 1637,
    height: 2410,
    note: '《古今图书集成》版画',
    source: '清《古今图书集成·禽虫典》版画(公有领域)',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Imperial_Encyclopaedia_-_Animal_Kingdom_-_pic342_-_%E6%87%89%E9%BE%8D%E5%9C%96.svg',
    provenance: 'potrace 自动矢量化(原件为维基共享资源《古今图书集成》扫描插图)',
  },
  kui: {
    src: kui,
    width: 1245,
    height: 1414,
    note: '《古今图书集成》版画',
    source: '清《古今图书集成·禽虫典》版画(公有领域)',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Imperial_Encyclopaedia_-_Animal_Kingdom_-_pic317_-_%E5%A4%94%E5%9C%96.svg',
    provenance: 'potrace 自动矢量化(原件为维基共享资源《古今图书集成》扫描插图)',
  },
}

/** 有古籍版画则返回清单,否则 undefined(调用方回退到原创 SVG 演绎)。 */
export function classicArtFor(slug: string): ClassicArt | undefined {
  return CLASSIC_ART[slug]
}
