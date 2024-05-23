import * as React from 'react';
const VariantIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
      d="M14.375 8.222V6.444C14.375 3.99 12.416 2 10 2S5.625 3.99 5.625 6.444v1.778m4.375 4V14m-2.8 4h5.6c1.47 0 2.205 0 2.767-.29a2.647 2.647 0 0 0 1.147-1.166c.286-.57.286-1.317.286-2.81v-1.245c0-1.494 0-2.24-.286-2.81a2.646 2.646 0 0 0-1.147-1.166c-.562-.29-1.297-.29-2.767-.29H7.2c-1.47 0-2.205 0-2.767.29a2.646 2.646 0 0 0-1.147 1.165C3 10.248 3 10.995 3 12.488v1.245c0 1.494 0 2.24.286 2.811.252.502.653.91 1.147 1.165C4.995 18 5.73 18 7.2 18Z"
    />
  </svg>
);
export default VariantIcon;
