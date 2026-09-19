/** 水纹层:山脚海面细线波纹,极低透明度。 */
export default function WaterRipples() {
  const lines = [
    { y: 702, dash: '140 220', o: 0.2 },
    { y: 718, dash: '90 160', o: 0.16 },
    { y: 734, dash: '160 200', o: 0.13 },
    { y: 748, dash: '100 180', o: 0.1 },
    { y: 762, dash: '130 210', o: 0.08 },
  ]
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMax slice"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      {lines.map((l, i) => (
        <line
          key={l.y}
          x1={i % 2 ? -60 : 40}
          y1={l.y}
          x2={i % 2 ? 1400 : 1520}
          y2={l.y}
          stroke="#587367"
          strokeWidth="1.4"
          strokeDasharray={l.dash}
          opacity={l.o}
        />
      ))}
    </svg>
  )
}
