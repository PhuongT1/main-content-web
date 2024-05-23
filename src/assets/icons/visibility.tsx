import * as React from 'react';
const Visibility = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke={props.stroke || '#9F9EA4'}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.017 10.595c-.114-.18-.17-.27-.202-.409a.977.977 0 0 1 0-.372c.032-.138.088-.228.202-.408.938-1.485 3.73-5.239 7.983-5.239 4.255 0 7.046 3.754 7.984 5.239.113.18.17.27.202.408a.976.976 0 0 1 0 .373c-.032.138-.089.228-.202.408-.938 1.485-3.73 5.239-7.984 5.239s-7.045-3.754-7.983-5.24Z"
    />
    <path
      stroke={props.stroke || '#9F9EA4'}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
    />
  </svg>
);
export default Visibility;
