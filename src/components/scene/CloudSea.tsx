/** 云海层:数条柔和雾带,缓慢漂移(仅 transform,80s 量级)。 */
export default function CloudSea() {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMax slice"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <defs>
        <filter id="cloudBlur" x="-20%" y="-60%" width="140%" height="220%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>
      <g filter="url(#cloudBlur)">
        <g className="drift-slow">
          <rect x="-60" y="560" width="900" height="42" rx="21" fill="#D9D6C9" opacity="0.05" />
          <rect x="420" y="606" width="1100" height="52" rx="26" fill="#D9D6C9" opacity="0.04" />
        </g>
        <g className="drift-slower">
          <rect x="240" y="652" width="1200" height="60" rx="30" fill="#D9D6C9" opacity="0.055" />
          <rect x="-140" y="700" width="1000" height="56" rx="28" fill="#D9D6C9" opacity="0.045" />
        </g>
        <g className="drift-slow">
          <rect x="620" y="740" width="940" height="64" rx="32" fill="#D9D6C9" opacity="0.05" />
          <rect x="-80" y="780" width="820" height="60" rx="30" fill="#D9D6C9" opacity="0.04" />
        </g>
      </g>
    </svg>
  )
}
