import * as React from 'react'

const IcCheck = ({ width, height, color, stroke }: React.SVGProps<SVGSVGElement>) => (
  <svg width={width || '16'} height={height || '17'} viewBox='0 0 16 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M5.60101 12.8394C5.09011 12.2317 4.67741 11.6374 4.27876 11.0617C3.91448 10.5383 3.59861 9.97904 3.33554 9.39158C3.17088 9.03513 3.098 8.6742 3.45466 8.44214C4.4768 7.77716 4.68627 8.4121 5.24184 9.14883C5.57115 9.58538 6.05676 10.3052 6.36102 10.7601C6.65165 11.1944 7.00596 10.4105 7.14741 10.1893C7.65012 9.40315 8.95672 7.47855 9.49666 6.76714C10.0093 6.09179 11.6638 4.19982 11.9722 3.8989C12.2347 3.64266 12.789 3.08065 13.1618 3.39069C13.5535 3.71645 13.7448 4.33567 13.4695 4.7383C12.99 5.43925 12.2368 6.10605 11.7157 6.77348C10.6607 8.12452 9.66196 9.58083 8.70325 11.0309C8.37748 11.5236 7.92008 12.3489 7.63611 12.8833C7.10492 13.883 6.63835 14.0732 5.60101 12.8394Z'
      fill={color || stroke || '#9498A3'}
    />
  </svg>
)

export default IcCheck
