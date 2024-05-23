import * as React from 'react';
const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke={props?.stroke || '#9F9EA4'}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m.667 3.833 6.804 4.763c.551.386.827.578 1.126.653.265.066.542.066.806 0 .3-.075.576-.267 1.127-.653l6.804-4.763M4.667 14.666h8.667c1.4 0 2.1 0 2.635-.272A2.5 2.5 0 0 0 17.06 13.3c.273-.534.273-1.235.273-2.635V5.333c0-1.4 0-2.1-.273-2.635a2.5 2.5 0 0 0-1.092-1.093c-.535-.272-1.235-.272-2.635-.272H4.667c-1.4 0-2.1 0-2.635.272A2.5 2.5 0 0 0 .939 2.698C.667 3.233.667 3.933.667 5.333v5.333c0 1.4 0 2.1.272 2.635a2.5 2.5 0 0 0 1.093 1.093c.535.272 1.235.272 2.635.272Z"
    />
  </svg>
);
export default MailIcon;
