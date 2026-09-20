/**
 * 正式插画公共底座(V02 起):背景渐变、淡墨晕染、地线由 ArtCanvas 统一承担,
 * 各正式插画只负责主体绘制,保证全站笔触与材质一致。
 * 依统一规则:线描 #D9D6C9/#B18B56;晕染 #587367/#31545A;矿物点染每幅 ≤3 处。
 */
export function ArtCanvas({
  id,
  mistA = 'rgba(88, 115, 103, 0.18)',
  mistB = 'rgba(88, 115, 103, 0.10)',
  groundLine = '#587367',
  groundY = 246,
}: {
  id: string
  mistA?: string
  mistB?: string
  groundLine?: string
  groundY?: number
}) {
  return (
    <>
      <defs>
        <linearGradient id={`ac-bg-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#131d18" />
          <stop offset="100%" stopColor="#0d1311" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#ac-bg-${id})`} />
      {/* 淡墨晕染 */}
      <ellipse cx="205" cy="190" rx="235" ry="74" fill={mistA} />
      <ellipse cx="160" cy="232" rx="185" ry="56" fill={mistB} />
      {/* 地线 */}
      <path
        d={`M-10 ${groundY} C80 ${groundY - 18} 170 ${groundY - 8} 260 ${groundY - 20} C330 ${groundY - 30} 380 ${groundY - 18} 410 ${groundY - 22}`}
        fill="none"
        stroke={groundLine}
        strokeWidth="1.2"
        opacity="0.45"
      />
    </>
  )
}
