import * as React from 'react';
const DrawerOpen = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={66}
    fill="none"
    {...props}
  >
    <path fill="#000" d="m0 0 16 8v50L0 66V0Z" />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m6 37 4-4-4-4"
    />
  </svg>
);
export default DrawerOpen;
