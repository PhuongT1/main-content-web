import * as React from 'react';
const HomeActiveIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="url(#katm)"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.3 20.5v-6.71c0-.507 0-.761.098-.955a.903.903 0 0 1 .393-.396c.193-.099.445-.099.949-.099h2.52c.504 0 .756 0 .949.099.169.087.307.225.393.396.098.194.098.448.098.956V20.5M3 10.073l8.136-6.147c.31-.234.465-.351.635-.396.15-.04.308-.04.458 0 .17.045.325.162.635.396L21 10.073M4.8 8.713V17.6c0 1.015 0 1.523.196 1.91.173.342.448.62.787.793.385.198.889.198 1.897.198h8.64c1.008 0 1.512 0 1.897-.198.339-.174.614-.45.787-.792.196-.388.196-.896.196-1.911V8.713L13.728 4.58c-.62-.468-.93-.702-1.27-.793-.3-.08-.616-.08-.916 0-.34.09-.65.325-1.27.793L4.8 8.713Z"
    />
    <defs>
      <linearGradient
        id="katm"
        x1={10.619}
        x2={29.029}
        y1={29.921}
        y2={19.242}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00C7BE" />
        <stop offset={1} stopColor="#3182F7" />
      </linearGradient>
    </defs>
  </svg>
);
export default HomeActiveIcon;
