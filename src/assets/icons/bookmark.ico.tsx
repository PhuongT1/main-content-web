import { SvgComponentProps } from '@/types/types.type'
const BookMarkIcon = ({ svgProps, pathProps }: SvgComponentProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={16} height={17} fill='none' {...svgProps}>
    <path
      stroke='#F2F3F5'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M3.334 5.888c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.875c.428-.217.988-.217 2.108-.217h2.933c1.12 0 1.68 0 2.108.217a2 2 0 0 1 .874.875c.218.427.218.987.218 2.108v8.8L8.001 12.02l-4.667 2.666v-8.8Z'
      {...pathProps}
    />
  </svg>
)
export default BookMarkIcon
