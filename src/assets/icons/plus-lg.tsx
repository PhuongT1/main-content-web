import * as React from 'react';
const PlusLgIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={33}
    height={32}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      d="M13.5 13.51v17.98c0 .282.241.51.539.51h4.922a.525.525 0 0 0 .539-.51V13.51a.525.525 0 0 0-.539-.51H14.04a.525.525 0 0 0-.539.51Z"
    />
    <path
      fill="#fff"
      d="M18.99 13H1.01a.525.525 0 0 0-.51.539v4.922c0 .298.229.539.51.539h17.98c.282 0 .51-.241.51-.539V13.54a.525.525 0 0 0-.51-.539Z"
    />
    <path
      fill="#fff"
      d="M19.088 13H31.79c.188 0 .369.079.501.218.133.14.208.33.208.527v4.51a.765.765 0 0 1-.208.527.692.692 0 0 1-.5.218H13.5v-.117L19.088 13Z"
    />
    <path
      fill="#fff"
      d="M19.5 13.107V.71a.684.684 0 0 0-.218-.503.748.748 0 0 0-.527-.208h-4.51a.763.763 0 0 0-.527.208.695.695 0 0 0-.218.503V19h.117l5.66-5.405a.726.726 0 0 0 .223-.488Z"
    />
  </svg>
);
export default PlusLgIcon;
