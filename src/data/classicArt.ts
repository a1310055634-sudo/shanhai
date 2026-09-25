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
  /** 出处短标(卡片等窄处用) */
  note: string
  /** 完整出处(详情页用) */
  source: string
}

const CLASSIC_ART: Record<string, ClassicArt> = {
  xingxing: { src: xingxing, note: '《古今图书集成》版画', source: '清《古今图书集成·禽虫典》版画(公有领域)' },
  lushu: { src: lushu, note: '《古今图书集成》版画', source: '清《古今图书集成·禽虫典》版画(公有领域)' },
  fenghuang: { src: fenghuang, note: '《古今图书集成》版画', source: '清《古今图书集成·禽虫典》版画(公有领域)' },
  jiuweihu: { src: jiuweihu, note: '《古今图书集成》版画', source: '清《古今图书集成·禽虫典》版画(公有领域)' },
  dijiang: { src: dijiang, note: '《古今图书集成》版画', source: '清《古今图书集成·神异典》版画(公有领域)' },
  jingwei: { src: jingwei, note: '《古今图书集成》版画', source: '清《古今图书集成·禽虫典》版画(公有领域)' },
  luwu: { src: luwu, note: '《古今图书集成》版画', source: '清《古今图书集成·神异典》版画(公有领域)' },
  yingzhao: { src: yingzhao, note: '《古今图书集成》版画', source: '清《古今图书集成·神异典》版画(公有领域)' },
  wenyaoyu: { src: wenyaoyu, note: '《古今图书集成》版画', source: '清《古今图书集成·禽虫典》版画(公有领域)' },
  zhuyin: { src: zhuyin, note: '《古今图书集成》版画', source: '清《古今图书集成·神异典》版画(公有领域)' },
  yinglong: { src: yinglong, note: '《古今图书集成》版画', source: '清《古今图书集成·禽虫典》版画(公有领域)' },
  kui: { src: kui, note: '《古今图书集成》版画', source: '清《古今图书集成·禽虫典》版画(公有领域)' },
}

/** 有古籍版画则返回清单,否则 undefined(调用方回退到原创 SVG 演绎)。 */
export function classicArtFor(slug: string): ClassicArt | undefined {
  return CLASSIC_ART[slug]
}
