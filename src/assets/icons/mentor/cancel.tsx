import { SvgComponentProps } from '@/types/types.type'

const MentorCancelIcon = ({ svgProps, pathProps }: SvgComponentProps) => (
  <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg' {...svgProps}>
    <path d='M11 9H21' stroke='white' strokeWidth='1.33333' strokeLinecap='round' />
    <path d='M11 13H18' stroke='white' strokeWidth='1.33333' strokeLinecap='round' />
    <path d='M11 17H17' stroke='white' strokeWidth='1.33333' strokeLinecap='round' />
    <rect x='6.5' y='3.5' width='19' height='24' rx='3.5' stroke='white' />
    <circle cx='23.5' cy='24.5' r='5' fill='#1F1F29' stroke='white' />
    <g clipPath='url(#clip0_2173_2908)'>
      <path
        d='M25.25 22.75L21.75 26.25M21.75 22.75L25.25 26.25'
        stroke='white'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
    <defs>
      <clipPath id='clip0_2173_2908'>
        <rect width='7' height='7' fill='white' transform='translate(20 21)' />
      </clipPath>
    </defs>
  </svg>
)
export default MentorCancelIcon
