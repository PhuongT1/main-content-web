import * as React from 'react';
const SunIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke={props.stroke || '#101014'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 2v2m0 16v2M4 12H2m4.314-5.686L4.9 4.9m12.786 1.414L19.1 4.9M6.314 17.69 4.9 19.104m12.786-1.414 1.414 1.414M22 12h-2"
    />
    <path
      fill={props.stroke || '#101014'}
      d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
    />
  </svg>
);
export default SunIcon;
