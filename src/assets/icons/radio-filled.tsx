import * as React from 'react';
const RadioFilledIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <circle cx={10} cy={10} r={7} fill="#2D68FE" />
    <rect width={19} height={19} x={0.5} y={0.5} stroke="#2D68FE" rx={9.5} />
  </svg>
);
export default RadioFilledIcon;
