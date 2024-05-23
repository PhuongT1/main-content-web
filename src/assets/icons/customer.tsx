import * as React from 'react';
const Customer = (props: React.SVGProps<SVGSVGElement>) => (
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
      d="M7.5 9.5h.01m4.49 0h.01m4.49 0h.01M7 17v2.335c0 .533 0 .8.11.937a.5.5 0 0 0 .39.188c.176 0 .384-.167.8-.5l2.385-1.908c.487-.39.731-.585 1.002-.724.241-.122.497-.212.762-.267.299-.061.61-.061 1.235-.061H16.2c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C21 14.72 21 13.88 21 12.2V6.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C18.72 2 17.88 2 16.2 2H7.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C3 4.28 3 5.12 3 6.8V13c0 .93 0 1.395.102 1.777a3 3 0 0 0 2.122 2.12C5.605 17 6.07 17 7 17Zm1-7.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm4.5 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm4.5 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
    />
    <path
      fill="#101014"
      stroke={props.stroke || '#101014'}
      strokeMiterlimit={10}
      d="M18.04 18.78a3.362 3.362 0 0 1-4.75-.15 3.38 3.38 0 0 1 .15-4.75 3.362 3.362 0 0 1 5.53 3.39 3.3 3.3 0 0 1-.93 1.51Z"
    />
    <path
      stroke={props.stroke || '#101014'}
      strokeLinecap="round"
      strokeMiterlimit={10}
      d="m19.8 20.65-1.74-1.85"
    />
  </svg>
);
export default Customer;
