import { SvgComponentProps } from '@/types/types.type'
const CloseCircleMdIcon = ({ svgProps, pathProps }: SvgComponentProps) => (
  <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg' {...svgProps}>
    <path
      d='M20.0013 12.0013L12.0013 20.0013M12.0013 12.0013L20.0013 20.0013M29.3346 16.0013C29.3346 23.3651 23.3651 29.3346 16.0013 29.3346C8.6375 29.3346 2.66797 23.3651 2.66797 16.0013C2.66797 8.6375 8.6375 2.66797 16.0013 2.66797C23.3651 2.66797 29.3346 8.6375 29.3346 16.0013Z'
      stroke='black'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...pathProps}
    />
  </svg>
)
export default CloseCircleMdIcon
