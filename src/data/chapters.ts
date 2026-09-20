import type { ChapterMeta } from './types'

/**
 * 通行本十八篇目录。
 * 篇目、次序已于 2026-09-20 依据「中国哲学书电子化计划」公开文本
 * (ctext.org/shan-hai-jing)逐条核对,与郭璞注—郝懿行笺疏系统的通行本次序一致。
 * 详见 CONTENT_SOURCES.md。
 */
export const CHAPTERS: ChapterMeta[] = [
  { id: 'ch-nanshan', slug: 'nanshan-jing', name: '南山经', order: 1, group: '山经', contentStatus: 'partial' },
  { id: 'ch-xishan', slug: 'xishan-jing', name: '西山经', order: 2, group: '山经', contentStatus: 'pending' },
  { id: 'ch-beishan', slug: 'beishan-jing', name: '北山经', order: 3, group: '山经', contentStatus: 'pending' },
  { id: 'ch-dongshan', slug: 'dongshan-jing', name: '东山经', order: 4, group: '山经', contentStatus: 'pending' },
  { id: 'ch-zhongshan', slug: 'zhongshan-jing', name: '中山经', order: 5, group: '山经', contentStatus: 'pending' },
  { id: 'ch-haiwai-nan', slug: 'haiwai-nan-jing', name: '海外南经', order: 6, group: '海外经', contentStatus: 'pending' },
  { id: 'ch-haiwai-xi', slug: 'haiwai-xi-jing', name: '海外西经', order: 7, group: '海外经', contentStatus: 'pending' },
  { id: 'ch-haiwai-bei', slug: 'haiwai-bei-jing', name: '海外北经', order: 8, group: '海外经', contentStatus: 'pending' },
  { id: 'ch-haiwai-dong', slug: 'haiwai-dong-jing', name: '海外东经', order: 9, group: '海外经', contentStatus: 'pending' },
  { id: 'ch-hainei-nan', slug: 'hainei-nan-jing', name: '海内南经', order: 10, group: '海内经', contentStatus: 'pending' },
  { id: 'ch-hainei-xi', slug: 'hainei-xi-jing', name: '海内西经', order: 11, group: '海内经', contentStatus: 'pending' },
  { id: 'ch-hainei-bei', slug: 'hainei-bei-jing', name: '海内北经', order: 12, group: '海内经', contentStatus: 'pending' },
  { id: 'ch-hainei-dong', slug: 'hainei-dong-jing', name: '海内东经', order: 13, group: '海内经', contentStatus: 'pending' },
  { id: 'ch-dahuang-dong', slug: 'dahuang-dong-jing', name: '大荒东经', order: 14, group: '大荒经', contentStatus: 'pending' },
  { id: 'ch-dahuang-nan', slug: 'dahuang-nan-jing', name: '大荒南经', order: 15, group: '大荒经', contentStatus: 'pending' },
  { id: 'ch-dahuang-xi', slug: 'dahuang-xi-jing', name: '大荒西经', order: 16, group: '大荒经', contentStatus: 'pending' },
  { id: 'ch-dahuang-bei', slug: 'dahuang-bei-jing', name: '大荒北经', order: 17, group: '大荒经', contentStatus: 'pending' },
  { id: 'ch-hainei-final', slug: 'hainei-jing', name: '海内经', order: 18, group: '海内经(终篇)', contentStatus: 'pending' },
]

/** 篇章分组及顺序(本站编辑说明,用于目录呈现)。 */
export interface ChapterGroup {
  key: ChapterMeta['group']
  /** 组内说明:结构性描述,非古籍原文;不确定处不写 */
  note: string
}

export const CHAPTER_GROUPS: ChapterGroup[] = [
  {
    key: '山经',
    note: '五篇合称《五藏山经》,分记南、西、北、东、中五方山川、草木、禽兽与祭祀之礼。',
  },
  {
    key: '海外经',
    note: '四篇按南、西、北、东方位铺叙海外之国与奇闻异物。',
  },
  {
    key: '海内经',
    note: '四篇按方位记海内之国、山川与物产。',
  },
  {
    key: '大荒经',
    note: '四篇记大荒之野四方之国、神祇与古国世系。',
  },
  {
    key: '海内经(终篇)',
    note: '末篇《海内经》与海内四经篇名相承,通行本中独立成篇,殿于全书之末。',
  },
]

export const CHAPTER_ORDER_NUMERALS = [
  '一', '二', '三', '四', '五', '六', '七', '八', '九', '十',
  '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八',
]

/** 篇名拼音(篇名汉字读音,不含异文争议)。 */
export const CHAPTER_PINYIN: Record<string, string> = {
  南山经: 'nán shān jīng',
  西山经: 'xī shān jīng',
  北山经: 'běi shān jīng',
  东山经: 'dōng shān jīng',
  中山经: 'zhōng shān jīng',
  海外南经: 'hǎi wài nán jīng',
  海外西经: 'hǎi wài xī jīng',
  海外北经: 'hǎi wài běi jīng',
  海外东经: 'hǎi wài dōng jīng',
  海内南经: 'hǎi nèi nán jīng',
  海内西经: 'hǎi nèi xī jīng',
  海内北经: 'hǎi nèi běi jīng',
  海内东经: 'hǎi nèi dōng jīng',
  大荒东经: 'dà huāng dōng jīng',
  大荒南经: 'dà huāng nán jīng',
  大荒西经: 'dà huāng xī jīng',
  大荒北经: 'dà huāng běi jīng',
  海内经: 'hǎi nèi jīng',
}
