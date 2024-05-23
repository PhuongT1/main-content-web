import { SVGProps } from 'react';
const MenuIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      d="M13.5 5.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM13.5 11.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM13.5 17.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z"
    />
  </svg>
);
export default MenuIcon;
