import * as React from 'react';
const Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={22}
    fill="none"
    {...props}
  >
    <path
      stroke="#101014"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m6.59 12.51 6.83 3.98m-.01-10.98L6.59 9.49M19 4a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM7 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm12 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
  </svg>
);
export default Icon;
