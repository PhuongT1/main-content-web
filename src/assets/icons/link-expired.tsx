import * as React from 'react';
const LinkExpiredIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={50}
    fill="none"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18 6.333V1.667m14 42v4.666M6.333 18H1.667m42 14h4.666M8.466 8.467l-3.3-3.3m36.367 36.367 3.3 3.3M25 38.198l-4.95 4.95a9.333 9.333 0 0 1-13.2-13.2L11.8 25m26.4 0 4.949-4.95a9.333 9.333 0 1 0-13.2-13.199L25 11.801"
    />
  </svg>
);
export default LinkExpiredIcon;
