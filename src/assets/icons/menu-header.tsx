import * as React from 'react';
const MenuHeader = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="#F2F3F5"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 12h18M3 6h18M9 18h12"
    />
  </svg>
);
export default MenuHeader;
