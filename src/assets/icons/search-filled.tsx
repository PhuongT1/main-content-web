import * as React from 'react';
const SearchFilledIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <rect width={36} height={36} fill="#2D68FE" rx={18} />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.667}
      d="m25.5 25.5-3.625-3.625m1.958-4.708a6.667 6.667 0 1 1-13.333 0 6.667 6.667 0 0 1 13.333 0Z"
    />
  </svg>
);
export default SearchFilledIcon;
