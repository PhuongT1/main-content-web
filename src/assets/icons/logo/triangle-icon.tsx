import { SvgComponentProps } from '@/types/types.type'

const TriangleIcon = ({ svgProps, rectProps }: SvgComponentProps) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='33' height='32' viewBox='0 0 33 32' fill='none' {...svgProps}>
      <path
        d='M15.634 8.5C16.0189 7.83333 16.9811 7.83333 17.366 8.5L23.4282 19C23.8131 19.6667 23.332 20.5 22.5622 20.5H10.4378C9.66802 20.5 9.1869 19.6667 9.5718 19L15.634 8.5Z'
        {...rectProps}
      />
    </svg>
  )
}

export default TriangleIcon
