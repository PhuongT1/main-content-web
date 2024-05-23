import * as React from 'react';
const SwitchThemeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <g clipRule="evenodd">
      <path
        stroke="#fff"
        strokeMiterlimit={10}
        d="M8.828 16.155a7.327 7.327 0 1 0 0-14.654 7.327 7.327 0 0 0 0 14.654Z"
      />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M11.617 8.835a1.5 1.5 0 0 1-1.5 1.5h-3V9.322l-2.04 1.5 2.04 1.5v-1.005h3a2.527 2.527 0 0 0 2.528-2.535l-1.028.053Zm-5.58 0a1.5 1.5 0 0 1 1.5-1.5h3.045v1.027l2.018-1.5-2.018-1.5v1.005H7.56a2.535 2.535 0 0 0-2.528 2.535l1.005-.067Z"
      />
    </g>
  </svg>
);
export default SwitchThemeIcon;
