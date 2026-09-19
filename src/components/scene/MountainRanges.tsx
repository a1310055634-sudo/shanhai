/** 山岭层:远山两重(岩青弱化,平滑山脊)+ 近景山脊(深墨),一次渲染便于对位。 */
export function FarRanges() {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMax slice"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      {/* 远山 · 最远一重 */}
      <path
        d="M0 646 C110 604 208 556 318 590 C430 624 512 546 636 574 C758 602 848 540 972 578 C1094 616 1196 552 1310 586 C1362 600 1408 592 1440 598 L1440 900 L0 900 Z"
        fill="#31545A"
        opacity="0.32"
      />
      {/* 远山 · 较近一重 */}
      <path
        d="M0 706 C128 654 246 610 372 646 C498 682 590 600 716 632 C842 664 930 596 1058 634 C1186 672 1288 626 1440 676 L1440 900 L0 900 Z"
        fill="#31545A"
        opacity="0.48"
      />
    </svg>
  )
}

/** 近景山脊:异兽所立之处,颜色最沉,压住画面底部。 */
export function NearRidge() {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMax slice"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <path
        d="M0 812 C160 780 320 796 500 762 C680 728 860 776 1040 758 C1220 740 1340 776 1440 794 L1440 900 L0 900 Z"
        fill="#0B100E"
      />
      <path
        d="M0 812 C160 780 320 796 500 762 C680 728 860 776 1040 758 C1220 740 1340 776 1440 794"
        fill="none"
        stroke="#587367"
        strokeWidth="1"
        opacity="0.22"
      />
    </svg>
  )
}
