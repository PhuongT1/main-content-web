import * as React from 'react';
import { SVGProps } from 'react';
const EditIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke={props.stroke || '#729AFE'}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.666 3.334h-3.5c-1.4 0-2.1 0-2.634.273a2.5 2.5 0 0 0-1.093 1.092c-.272.535-.272 1.235-.272 2.635v7c0 1.4 0 2.1.272 2.635a2.5 2.5 0 0 0 1.093 1.093c.534.272 1.234.272 2.635.272h7c1.4 0 2.1 0 2.635-.272a2.5 2.5 0 0 0 1.092-1.093c.273-.535.273-1.235.273-2.635v-3.5m-10 2.5h1.395c.408 0 .611 0 .803-.046.17-.04.333-.108.482-.2.168-.102.312-.247.6-.535l7.97-7.969a1.768 1.768 0 1 0-2.5-2.5l-7.97 7.97c-.288.287-.432.431-.535.6-.091.149-.159.311-.2.482-.046.191-.046.395-.046.803v1.395Z"
    />
  </svg>
);
export default EditIcon;
