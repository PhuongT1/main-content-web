import { SvgComponentProps } from '@/types/types.type'

const BookmarkOutlineSm = ({ svgProps, pathProps }: SvgComponentProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={12} height={12} viewBox='0 0 12 12' fill='none' {...svgProps}>
    <path
      d='M2.5 3.9C2.5 3.05992 2.5 2.63988 2.66349 2.31901C2.8073 2.03677 3.03677 1.8073 3.31901 1.66349C3.63988 1.5 4.05992 1.5 4.9 1.5H7.1C7.94008 1.5 8.36012 1.5 8.68099 1.66349C8.96323 1.8073 9.1927 2.03677 9.33651 2.31901C9.5 2.63988 9.5 3.05992 9.5 3.9V10.5L6 8.5L2.5 10.5V3.9Z'
      stroke='#F7F8FA'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...pathProps}
    />
  </svg>
)
export default BookmarkOutlineSm
