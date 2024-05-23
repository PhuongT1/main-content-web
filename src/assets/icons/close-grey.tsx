import { SvgComponentProps } from '@/types/types.type'

const CloseGreyIcon = ({ svgProps, pathProps }: SvgComponentProps<2>) => {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...svgProps}>
      <path d='M18 6L6 18' stroke='#757575' strokeLinecap='round' strokeLinejoin='round' {...pathProps?.[0]} />
      <path d='M6 6L18 18' stroke='#757575' strokeLinecap='round' strokeLinejoin='round' {...pathProps?.[1]} />
    </svg>
  )
}

export default CloseGreyIcon
