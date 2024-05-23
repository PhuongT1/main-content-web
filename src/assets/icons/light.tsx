import * as React from 'react';
const LightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <rect width={36} height={36} fill="#fff" rx={18} />
    <g clipPath="url(#a)">
      <path
        stroke="#9F9EA4"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 11.333v1.334m0 10.666v1.334M12.667 18h-1.333m2.876-3.79-.943-.944m8.524.943.943-.942m-8.524 8.526-.943.943m8.524-.943.943.943M24.667 18h-1.334"
      />
      <path
        fill="#9F9EA4"
        d="M18 21.333a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M10 10h16v16H10z" />
      </clipPath>
    </defs>
  </svg>
);
export default LightIcon;
