import * as React from 'react';
import { SVGProps } from 'react';
const DownloadCircleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="#F2F3F5"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.333 8 8 10.666m0 0L10.667 8M8 10.666V4.533c0-.927 0-1.39-.367-1.91-.244-.344-.946-.77-1.364-.827-.63-.085-.87.04-1.348.29a6.667 6.667 0 1 0 6.412.14"
    />
  </svg>
);
export default DownloadCircleIcon;
