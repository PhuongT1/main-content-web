import * as React from 'react';
const VisibilityOff = (props: React.SVGProps<SVGSVGElement>) => (
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
      d="M8.952 4.244c.34-.05.689-.077 1.048-.077 4.255 0 7.046 3.754 7.984 5.239.113.18.17.27.202.408a.976.976 0 0 1 0 .372c-.032.139-.089.23-.203.41-.25.396-.631.952-1.136 1.554M5.604 5.596c-1.802 1.222-3.025 2.92-3.586 3.808-.114.18-.171.271-.203.41a.977.977 0 0 0 0 .372c.032.139.088.229.202.408.938 1.485 3.73 5.24 7.983 5.24 1.716 0 3.193-.611 4.407-1.437M2.5 2.5l15 15M8.233 8.232a2.5 2.5 0 0 0 3.536 3.536"
    />
  </svg>
);
export default VisibilityOff;
