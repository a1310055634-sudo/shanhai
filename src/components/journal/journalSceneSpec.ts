/**
 * R07 九境场景参数表:每站的场景色调与层次微调。
 * warmth 0=招摇冷调(西海),渐增至青丘暖调(九尾狐高潮),箕尾回落。
 * 这些是**纯视觉参数**,不含内容事实;改此表不影响任何古籍文本。
 */
export interface SceneSpec {
  warmth: number
  farOpacity: number
  midOpacity: number
  nearOpacity: number
  /** 山脊轮廓:rolling=平缓曲线 / jagged=险峻尖峰 / stubborn=低平宽远 */
  profile: 'rolling' | 'jagged' | 'stubborn'
  /** 雾密度 0—1 */
  mistDensity: number
  /** 展品显现:版画从侧栏小卡升为满幅中心展台(仅主高潮站) */
  exhibitCenter?: boolean
}

/** 按山序索引(1—9),柢山(5)为留白位(降透明度模拟雾)。 */
export const SCENE_SPECS: Record<number, SceneSpec> = {
  1: { warmth: 0.0, farOpacity: 1, midOpacity: 1, nearOpacity: 1, profile: 'rolling', mistDensity: 0.4 },
  2: { warmth: 0.15, farOpacity: 0.95, midOpacity: 0.95, nearOpacity: 1, profile: 'rolling', mistDensity: 0.8 },
  3: { warmth: 0.3, farOpacity: 0.9, midOpacity: 0.9, nearOpacity: 1, profile: 'jagged', mistDensity: 0.3 },
  4: { warmth: 0.5, farOpacity: 1, midOpacity: 1, nearOpacity: 1, profile: 'stubborn', mistDensity: 0.5 },
  5: { warmth: 0.4, farOpacity: 0.5, midOpacity: 0.5, nearOpacity: 0.6, profile: 'rolling', mistDensity: 0.9 },
  6: { warmth: 0.55, farOpacity: 0.9, midOpacity: 0.9, nearOpacity: 1, profile: 'stubborn', mistDensity: 0.7 },
  7: { warmth: 0.7, farOpacity: 1, midOpacity: 1, nearOpacity: 1, profile: 'jagged', mistDensity: 0.5 },
  8: { warmth: 0.85, farOpacity: 1, midOpacity: 1, nearOpacity: 1, profile: 'rolling', mistDensity: 0.5, exhibitCenter: true },
  9: { warmth: 0.6, farOpacity: 0.9, midOpacity: 0.9, nearOpacity: 0.95, profile: 'stubborn', mistDensity: 0.6 },
}

export function sceneSpecFor(order: number | undefined): SceneSpec {
  if (order === undefined) return SCENE_SPECS[1]!
  return SCENE_SPECS[order] ?? SCENE_SPECS[1]!
}
