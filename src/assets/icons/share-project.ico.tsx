import { SvgComponentProps } from '@/types/types.type'
const ShareProjectIcon = ({ svgProps, pathProps }: SvgComponentProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={17} height={16} viewBox='0 0 17 16' fill='none' {...svgProps}>
    <path
      d='M6.22667 9.00659L10.78 11.6599M10.7733 4.33992L6.22667 6.99325M14.5 3.33325C14.5 4.43782 13.6046 5.33325 12.5 5.33325C11.3954 5.33325 10.5 4.43782 10.5 3.33325C10.5 2.22868 11.3954 1.33325 12.5 1.33325C13.6046 1.33325 14.5 2.22868 14.5 3.33325ZM6.5 7.99992C6.5 9.10449 5.60457 9.99992 4.5 9.99992C3.39543 9.99992 2.5 9.10449 2.5 7.99992C2.5 6.89535 3.39543 5.99992 4.5 5.99992C5.60457 5.99992 6.5 6.89535 6.5 7.99992ZM14.5 12.6666C14.5 13.7712 13.6046 14.6666 12.5 14.6666C11.3954 14.6666 10.5 13.7712 10.5 12.6666C10.5 11.562 11.3954 10.6666 12.5 10.6666C13.6046 10.6666 14.5 11.562 14.5 12.6666Z'
      stroke='#EDEEF1'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...pathProps}
    />
  </svg>
)
export default ShareProjectIcon
