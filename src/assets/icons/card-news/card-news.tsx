import { SvgComponentProps } from '@/types/types.type'
import * as React from 'react'

const CardNewsIcon = ({ pathProps, svgProps }: SvgComponentProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={13} height={18} fill='none' viewBox='0 0 13 18' {...svgProps}>
    <path
      d='M8.4724 8.39275L5.85666 10.9467L4.52836 9.6502C4.3721 9.4973 4.12183 9.49917 3.96756 9.65406C3.81342 9.80908 3.81279 10.0593 3.96632 10.215L3.97167 10.2202L5.57812 11.7888C5.73302 11.94 5.98017 11.94 6.13494 11.7888L9.02897 8.96314C9.18548 8.80924 9.18797 8.55786 9.03482 8.40085C8.88142 8.24384 8.63016 8.24035 8.4724 8.393V8.39275Z'
      fill='#191A1C'
      stroke='currentColor'
      strokeWidth='0.5'
      strokeLinejoin='round'
      {...pathProps}
    />
    <path
      d='M10.7222 2.11338H8.1609C7.87066 1.45571 7.21946 1.03125 6.50053 1.03125C5.78148 1.03125 5.13028 1.45571 4.84004 2.11338H2.27858C1.31237 2.1145 0.529441 2.89756 0.52832 3.86377V15.2184C0.529441 16.1846 1.31237 16.9676 2.27858 16.9688H10.7222C11.6884 16.9676 12.4715 16.1846 12.4726 15.2184V3.86377C12.4715 2.89756 11.6884 2.1145 10.7222 2.11338ZM5.12829 2.91026C5.3153 2.91026 5.47717 2.78014 5.51739 2.59724C5.61525 2.15173 6.02876 1.82813 6.50053 1.82813C6.97231 1.82813 7.38569 2.15173 7.48355 2.59724C7.52365 2.78014 7.68551 2.91026 7.87278 2.91026H8.66281V3.25989C8.66218 3.7862 8.23573 4.21265 7.70942 4.21328H5.29152C4.76509 4.21265 4.33863 3.7862 4.33801 3.25989V2.91026H5.12829ZM11.6757 15.2184C11.6752 15.7448 11.2487 16.1714 10.7222 16.1719H2.27858C1.75227 16.1714 1.32582 15.7448 1.3252 15.2184V3.86377C1.32582 3.33733 1.75227 2.91088 2.27858 2.91026H3.54113V3.25989C3.54225 4.2261 4.32531 5.00903 5.29152 5.01015H7.70942C8.67563 5.00903 9.45856 4.2261 9.45968 3.25989V2.91026H10.7222C11.2487 2.91088 11.6751 3.33733 11.6757 3.86377V15.2184Z'
      fill='#191A1C'
      stroke='currentColor'
      strokeWidth='0.5'
      strokeLinejoin='round'
      {...pathProps}
    />
  </svg>
)
export default CardNewsIcon
