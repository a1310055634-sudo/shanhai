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
  /** jagged 专用:峰谷高差系数(1=基准 66px,>1 更险)与峰密度系数(1=基准 20 峰位) */
  jaggedAmp?: number
  jaggedSteps?: number
  /** 雾密度 0—1 */
  mistDensity: number
  /** 展品显现:版画从侧栏小卡升为满幅中心展台(仅主高潮站) */
  exhibitCenter?: boolean
}

/**
 * 按山序索引(1—9),柢山(5)为留白位(降透明度模拟雾)。
 * G23 压饱和:warmth 曲线整体 ×0.7(峰值 0.85→0.595),次序与冷调锚点(招摇 0)不变;
 * 猨翼(3)峰形调更险(amp×1.3/steps×1.2)且雾再降(0.3→0.2),柢山雾感占位保持。
 * G25 意象复核:九站「原文依据→画面元素」对照表见 GALLERY_DESIGN.md 三之补;
 * 堂庭(2)雾 0.8→0.45——原文「多棪木多白猿多水玉多黄金」无水雾意象,且 0.8 打断
 * 「多水→浓雾」规律(柢 0.9/亶爰 0.7);其余八站参数不动。
 */
export const SCENE_SPECS: Record<number, SceneSpec> = {
  1: { warmth: 0.0, farOpacity: 1, midOpacity: 1, nearOpacity: 1, profile: 'rolling', mistDensity: 0.4 },
  2: { warmth: 0.105, farOpacity: 0.95, midOpacity: 0.95, nearOpacity: 1, profile: 'rolling', mistDensity: 0.45 },
  3: { warmth: 0.21, farOpacity: 0.9, midOpacity: 0.9, nearOpacity: 1, profile: 'jagged', jaggedAmp: 1.3, jaggedSteps: 1.2, mistDensity: 0.2 },
  4: { warmth: 0.35, farOpacity: 1, midOpacity: 1, nearOpacity: 1, profile: 'stubborn', mistDensity: 0.5 },
  5: { warmth: 0.28, farOpacity: 0.5, midOpacity: 0.5, nearOpacity: 0.6, profile: 'rolling', mistDensity: 0.9 },
  6: { warmth: 0.385, farOpacity: 0.9, midOpacity: 0.9, nearOpacity: 1, profile: 'stubborn', mistDensity: 0.7 },
  7: { warmth: 0.49, farOpacity: 1, midOpacity: 1, nearOpacity: 1, profile: 'jagged', mistDensity: 0.5 },
  8: { warmth: 0.595, farOpacity: 1, midOpacity: 1, nearOpacity: 1, profile: 'rolling', mistDensity: 0.5, exhibitCenter: true },
  9: { warmth: 0.42, farOpacity: 0.9, midOpacity: 0.9, nearOpacity: 0.8, profile: 'stubborn', mistDensity: 0.6 },
}

export function sceneSpecFor(order: number | undefined): SceneSpec {
  if (order === undefined) return SCENE_SPECS[1]!
  return SCENE_SPECS[order] ?? SCENE_SPECS[1]!
}
