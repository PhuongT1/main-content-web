import * as React from 'react';
const PhoneIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke={props?.stroke || '#7E7E86'}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 14.583h.008m-3.175 3.75h6.334c.933 0 1.4 0 1.756-.181.314-.16.569-.415.729-.729.181-.356.181-.823.181-1.756V4.332c0-.933 0-1.4-.181-1.756a1.667 1.667 0 0 0-.729-.729c-.356-.181-.823-.181-1.756-.181H6.833c-.933 0-1.4 0-1.756.181-.314.16-.569.415-.729.729-.181.356-.181.823-.181 1.756v11.334c0 .933 0 1.4.181 1.756.16.314.415.569.729.729.356.181.823.181 1.756.181Zm3.584-3.75a.417.417 0 1 1-.833 0 .417.417 0 0 1 .833 0Z"
    />
  </svg>
);
export default PhoneIcon;
