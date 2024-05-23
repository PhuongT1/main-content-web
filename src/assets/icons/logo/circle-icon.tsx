import { SvgComponentProps } from '@/types/types.type'

const CircleIcon = ({ svgProps, rectProps }: any) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='33' height='32' viewBox='0 0 33 32' fill='none' {...svgProps}>
      <circle cx='16.5' cy='16' r='8' {...rectProps} />

      <path d='M15.634 9.5C16.0189 8.83333 16.9811 8.83333 17.366 9.5L22.5622 18.5C22.9471 19.1667 22.466 20 21.6962 20H11.3038C10.534 20 10.0529 19.1667 10.4378 18.5L15.634 9.5Z' />
    </svg>
  )
}

export default CircleIcon
