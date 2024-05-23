import * as React from 'react';
import { SVGProps } from 'react';
const YoutubeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    {...props}
  >
    <rect width={40} height={40} fill="#000" fillOpacity={0.5} rx={20} />
    <path fill="#fff" d="m15.6 26.78 11.44-6.857-11.44-6.857v13.715Z" />
  </svg>
);
export default YoutubeIcon;
