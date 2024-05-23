import * as React from 'react';
import { SVGProps } from 'react';
const BlogFilledIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <g strokeLinecap="round">
      <path
        stroke="url(#a)"
        strokeLinejoin="round"
        d="M3 9h18M9 9v12M7.8 3h8.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C21 5.28 21 6.12 21 7.8v8.4c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C18.72 21 17.88 21 16.2 21H7.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C3 18.72 3 17.88 3 16.2V7.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C5.28 3 6.12 3 7.8 3Z"
      />
      <path stroke="url(#b)" d="M12 13h5.5" />
      <path stroke="url(#c)" d="M12 16h2.5" />
    </g>
    <defs>
      <linearGradient
        id="a"
        x1={10.619}
        x2={29.543}
        y1={30.975}
        y2={20.607}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00C7BE" />
        <stop offset={1} stopColor="#3182F7" />
      </linearGradient>
      <linearGradient
        id="b"
        x1={14.328}
        x2={15.074}
        y1={14.554}
        y2={12.307}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00C7BE" />
        <stop offset={1} stopColor="#3182F7" />
      </linearGradient>
      <linearGradient
        id="c"
        x1={13.058}
        x2={14.246}
        y1={17.554}
        y2={15.927}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00C7BE" />
        <stop offset={1} stopColor="#3182F7" />
      </linearGradient>
    </defs>
  </svg>
);
export default BlogFilledIcon;
