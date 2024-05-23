import * as React from 'react';
const Admin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="#fff"
      strokeMiterlimit={10}
      d="M11.77 21.54a9.77 9.77 0 1 0 0-19.54 9.77 9.77 0 0 0 0 19.54Z"
      clipRule="evenodd"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M15.49 11.78a2 2 0 0 1-2 2h-4v-1.35l-2.72 2 2.72 2v-1.34h4a3.37 3.37 0 0 0 3.37-3.38l-1.37.07Zm-7.44 0a2 2 0 0 1 2-2h4.06v1.37l2.69-2-2.69-2v1.34h-4.03a3.38 3.38 0 0 0-3.37 3.38l1.34-.09Z"
      clipRule="evenodd"
    />
  </svg>
);
export default Admin;
