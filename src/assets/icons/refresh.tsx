import { SvgComponentProps } from '@/types/types.type'
const RefreshIcon = ({ svgProps, pathProps }: SvgComponentProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='21' height='20' viewBox='0 0 21 20' fill='none' {...svgProps}>
    <path
      d='M17.5827 8.51819C17.5827 8.51819 16.0877 6.49465 14.8732 5.28726C13.6587 4.07987 11.9804 3.33301 10.1265 3.33301C6.42042 3.33301 3.41602 6.31778 3.41602 9.99967C3.41602 13.6816 6.42042 16.6663 10.1265 16.6663C13.1859 16.6663 15.767 14.6325 16.5748 11.8515M17.5827 8.51819V4.90708M17.5827 8.51819H13.9423'
      stroke='#EDEEF1'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...pathProps}
    />
  </svg>
)
export default RefreshIcon
