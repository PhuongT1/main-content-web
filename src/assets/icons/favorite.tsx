import { SVGProps } from 'react';
const FavoriteIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="m12.94 3.26 2.22 4.5 5 .73a1.32 1.32 0 0 1 .73 2.25l-3.59 3.5.85 4.94a1.32 1.32 0 0 1-1.92 1.39l-4.44-2.33-4.44 2.33a1.32 1.32 0 0 1-1.92-1.39l.85-4.94-3.59-3.5a1.32 1.32 0 0 1 .73-2.25l5-.73 2.22-4.5a1.31 1.31 0 0 1 2.3 0Z"
    />
  </svg>
);
export default FavoriteIcon;
