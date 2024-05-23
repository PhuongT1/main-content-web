import * as React from 'react';
const Ing = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <circle cx={12} cy={12} r={9.5} stroke="#101014" />
    <path
      fill="#101014"
      d="M8.1 13.2a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2ZM12.04 13.2a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2ZM15.98 13.2a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2Z"
    />
  </svg>
);
export default Ing;
