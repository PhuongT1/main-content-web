import { SvgComponentProps } from '@/types/types.type'

const BookmarkUncheckIcon = ({ svgProps, pathProps }: SvgComponentProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={16} height={16} viewBox='0 0 16 16' fill='none' {...svgProps}>
    <path
      d='M3.3335 5.2C3.3335 4.0799 3.3335 3.51984 3.55148 3.09202C3.74323 2.71569 4.04919 2.40973 4.42552 2.21799C4.85334 2 5.41339 2 6.5335 2H9.46683C10.5869 2 11.147 2 11.5748 2.21799C11.9511 2.40973 12.2571 2.71569 12.4488 3.09202C12.6668 3.51984 12.6668 4.0799 12.6668 5.2V14L8.00016 11.3333L3.3335 14V5.2Z'
      stroke='#F7F8FA'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...pathProps}
    />
  </svg>
)
export default BookmarkUncheckIcon
