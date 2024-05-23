import * as React from 'react';
const CheckOutlineIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <path
      stroke={props?.stroke || '#fff'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11.666 3.5 5.25 9.917 2.333 7"
    />
  </svg>
);
export default CheckOutlineIcon;
