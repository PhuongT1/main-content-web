import * as React from 'react';
const Add = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <circle cx={12} cy={12} r={9.5} stroke={props.stroke || '#101014'} />
    <path
      stroke={props.stroke || '#101014'}
      strokeLinecap="round"
      d="M9 12h6M12 9v6"
    />
  </svg>
);
export default Add;
