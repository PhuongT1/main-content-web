import * as React from 'react';
const ListIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <circle cx={12} cy={12} r={9.5} stroke="#101014" />
    <path stroke="#101014" strokeLinecap="round" d="M8 9h8M8 12h8M8 15h8" />
  </svg>
);
export default ListIcon;
