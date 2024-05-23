import * as React from 'react';
const UserActiveIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="url(#kicm)"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20 21c0-1.396 0-2.093-.172-2.661a4 4 0 0 0-2.667-2.667c-.568-.172-1.265-.172-2.661-.172h-5c-1.396 0-2.093 0-2.661.172a4 4 0 0 0-2.667 2.667C4 18.907 4 19.604 4 21M16.5 7.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"
    />
    <defs>
      <linearGradient
        id="kicm"
        x1={10.772}
        x2={28.451}
        y1={30.975}
        y2={22.366}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00C7BE" />
        <stop offset={1} stopColor="#3182F7" />
      </linearGradient>
    </defs>
  </svg>
);
export default UserActiveIcon;
