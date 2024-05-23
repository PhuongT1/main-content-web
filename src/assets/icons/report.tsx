import * as React from 'react';
import { SVGProps } from 'react';
const ReportIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="#F2F2F2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V4s-1 1-4 1-5-2-8-2-4 1-4 1m0 18V2"
    />
  </svg>
);
export default ReportIcon;
