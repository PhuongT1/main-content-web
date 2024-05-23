const SlidersIcon = ({ fill = '#757575' }: { fill: string }) => {
  return (
    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_205_15657)">
        <path d="M10.5 10.5L7 10.5" stroke={fill} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 10.5L1.5 10.5" stroke={fill} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10.5 6.5L6 6.5" stroke={fill} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 6.5L1.5 6.5" stroke={fill} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10.5 2.5L8 2.5" stroke={fill} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 2.5L1.5 2.5" stroke={fill} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 12L7 9" stroke={fill} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 8L4 5" stroke={fill} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 4L8 1" stroke={fill} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_205_15657">
          <rect width="12" height="12" fill="white" transform="translate(0 12.5) rotate(-90)" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default SlidersIcon
