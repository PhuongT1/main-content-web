import * as React from 'react';
const DarkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <rect width={36} height={36} fill="#1F1F29" rx={18} />
    <path
      fill="#9F9EA4"
      d="M23.4 18.834a4.57 4.57 0 1 1-6.233-6.234 5.714 5.714 0 1 0 6.233 6.234ZM21.6 12l.37.741c.16.319.24.478.346.616.095.123.204.233.327.327.138.106.297.186.616.345L24 14.4l-.741.37c-.319.16-.478.24-.616.346a1.798 1.798 0 0 0-.327.327c-.106.138-.186.297-.345.616l-.37.741-.371-.741c-.16-.319-.24-.478-.346-.616a1.798 1.798 0 0 0-.326-.327c-.139-.106-.298-.186-.616-.345L19.2 14.4l.742-.37c.318-.16.477-.24.616-.346.122-.094.232-.204.326-.327.107-.138.186-.297.346-.616L21.6 12Z"
    />
  </svg>
);
export default DarkIcon;