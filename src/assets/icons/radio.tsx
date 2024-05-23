import * as React from 'react';
const RadioIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <rect width={19} height={19} x={0.5} y={0.5} stroke="#7E7E86" rx={9.5} />
  </svg>
);
export default RadioIcon;
