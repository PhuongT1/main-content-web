import { SvgComponentProps } from '@/types/types.type'

const OtherIcon = ({ svgProps }: SvgComponentProps) => {
  return (
    <svg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg' {...svgProps}>
      <rect x='48' width='48' height='48' rx='24' transform='rotate(90 48 0)' fill='#2D68FE' />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M37.5 24C37.5 24.8284 36.8284 25.5 36 25.5L12 25.5C11.1716 25.5 10.5 24.8284 10.5 24C10.5 23.1716 11.1716 22.5 12 22.5L36 22.5C36.8284 22.5 37.5 23.1716 37.5 24Z'
        fill='white'
      />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M24 10.5C24.8284 10.5 25.5 11.1716 25.5 12L25.5 36C25.5 36.8284 24.8284 37.5 24 37.5C23.1716 37.5 22.5 36.8284 22.5 36L22.5 12C22.5 11.1716 23.1716 10.5 24 10.5Z'
        fill='white'
      />
    </svg>
  )
}

export default OtherIcon
