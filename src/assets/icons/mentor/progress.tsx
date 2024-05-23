import { SvgComponentProps } from '@/types/types.type'

const MentorProgressIcon = ({ svgProps, pathProps }: SvgComponentProps) => (
  <svg width='46' height='46' viewBox='0 0 46 46' fill='none' xmlns='http://www.w3.org/2000/svg' {...svgProps}>
    <path
      d='M15.334 22.8398L28.7507 22.8398'
      stroke='#F7F8FA'
      strokeWidth='2.25'
      strokeLinecap='round'
      {...pathProps}
    />
    <path
      d='M24.2793 17.25L28.7515 22.8403L24.2793 28.4306'
      stroke='#F7F8FA'
      strokeWidth='2.25'
      strokeLinecap='round'
      {...pathProps}
    />
    <rect x='4.95898' y='6.875' width='36.0833' height='32.25' rx='1.875' stroke='#F7F8FA' strokeWidth='2.25' />
  </svg>
)
export default MentorProgressIcon
