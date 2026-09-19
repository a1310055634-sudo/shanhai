/** 星空层:散点星辰 + 一组细线星宿 + 月轮。纯装饰。 */
export default function StarField() {
  const stars: Array<{ x: number; y: number; r: number; o: number; tw?: boolean }> = [
    { x: 92, y: 96, r: 1.4, o: 0.7, tw: true },
    { x: 210, y: 52, r: 1, o: 0.45 },
    { x: 305, y: 140, r: 1.2, o: 0.55, tw: true },
    { x: 420, y: 76, r: 0.9, o: 0.4 },
    { x: 520, y: 178, r: 1.3, o: 0.6 },
    { x: 610, y: 60, r: 1, o: 0.45, tw: true },
    { x: 700, y: 130, r: 1.5, o: 0.7 },
    { x: 790, y: 44, r: 0.9, o: 0.35 },
    { x: 880, y: 112, r: 1.2, o: 0.55, tw: true },
    { x: 975, y: 70, r: 1, o: 0.45 },
    { x: 1065, y: 156, r: 1.4, o: 0.6 },
    { x: 1150, y: 88, r: 0.9, o: 0.4, tw: true },
    { x: 1240, y: 148, r: 1.2, o: 0.5 },
    { x: 1330, y: 66, r: 1.1, o: 0.5 },
    { x: 1400, y: 180, r: 1, o: 0.4, tw: true },
    { x: 150, y: 220, r: 0.8, o: 0.3 },
    { x: 480, y: 250, r: 0.9, o: 0.3 },
    { x: 840, y: 236, r: 0.8, o: 0.3 },
    { x: 1180, y: 244, r: 0.9, o: 0.3 },
  ]

  // 一组星宿连线(虚构构图,非真实星图)
  const constellation = '140,300 260,262 388,300 512,252 640,286'
  const [cx, cy] = [1200, 170]

  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <defs>
        <radialGradient id="moonHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F3EEE2" stopOpacity="0.32" />
          <stop offset="45%" stopColor="#F3EEE2" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#F3EEE2" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 月轮 */}
      <circle cx={cx} cy={cy} r="150" fill="url(#moonHalo)" />
      <circle cx={cx} cy={cy} r="46" fill="#E8E0CD" opacity="0.16" />
      <circle cx={cx} cy={cy} r="34" fill="#E8E0CD" opacity="0.22" />

      {stars.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill="#F3EEE2"
          opacity={s.o}
          className={s.tw ? 'twinkle' : undefined}
        />
      ))}

      {/* 星宿连线 */}
      <polyline
        points={constellation}
        fill="none"
        stroke="#B18B56"
        strokeWidth="0.7"
        opacity="0.28"
      />
      {constellation.split(' ').map((p) => {
        const [x, y] = p.split(',').map(Number)
        return <circle key={p} cx={x} cy={y} r="2" fill="#B18B56" opacity="0.5" />
      })}
    </svg>
  )
}
