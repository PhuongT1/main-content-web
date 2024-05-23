import * as React from 'react';
import { SVGProps } from 'react';
const HeartFilledIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="#EF2B2A"
      fillRule="evenodd"
      d="M7.996 3.944c-1.2-1.398-3.2-1.774-4.703-.494-1.503 1.28-1.715 3.42-.534 4.935.98 1.259 3.95 3.914 4.924 4.773.11.096.164.144.227.163a.303.303 0 0 0 .172 0c.063-.019.118-.067.227-.163.973-.86 3.943-3.514 4.924-4.773 1.18-1.514.995-3.668-.534-4.935-1.529-1.267-3.504-.904-4.703.494Z"
      clipRule="evenodd"
    />
  </svg>
);
export default HeartFilledIcon;
