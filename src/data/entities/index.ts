import type { Entity } from '../types'
import { XINGXING } from './xingxing'
import { LUSHU } from './lushu'
import { FENGHUANG } from './fenghuang'
import { JIUWEIHU } from './jiuweihu'
import { DIJIANG } from './dijiang'
import { JINGWEI } from './jingwei'
import { LUWU } from './luwu'
import { YINGZHAO } from './yingzhao'
import { WENYAOYU } from './wenyaoyu'
import { ZHUYIN } from './zhuyin'
import { YINGLONG } from './yinglong'
import { KUI } from './kui'
import { CHANGYOU } from './changyou'
import { HUAHUAI } from './huahuai'
import { ZHI } from './zhi'

/** 全部条目。只有 recordStatus === 'verified' 的条目可进入推荐/探索/题库。 */
export const ENTITIES: Entity[] = [
  XINGXING,
  LUSHU,
  FENGHUANG,
  JIUWEIHU,
  DIJIANG,
  JINGWEI,
  LUWU,
  YINGZHAO,
  WENYAOYU,
  ZHUYIN,
  YINGLONG,
  KUI,
  CHANGYOU,
  HUAHUAI,
  ZHI,
]

export function getEntity(slug: string): Entity | undefined {
  return ENTITIES.find((e) => e.slug === slug)
}

export function getVerifiedEntities(): Entity[] {
  return ENTITIES.filter((e) => e.recordStatus === 'verified')
}

export const ENTITY_TYPE_LABELS: Record<Entity['type'], string> = {
  beast: '异兽',
  bird: '鸟类',
  aquatic: '水族',
  deity: '神祇',
  figure: '人物',
  nation: '国族',
  plant: '植物',
  mineral: '矿物',
  artifact: '器物',
  terrain: '山川水系',
}

export const RECORD_STATUS_LABELS: Record<Entity['recordStatus'], string> = {
  verified: '已核验',
  variant: '存在异文',
  unverified: '待考证',
}
