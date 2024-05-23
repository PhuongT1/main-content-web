import { SvgComponentProps } from '@/types/types.type'
const PasswordIcon = ({ svgProps, pathProps }: SvgComponentProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={17} height={21} fill='none' {...svgProps}>
    <rect width={16} height={13.082} x={0.5} y={7.418} stroke='#000' rx={1.5} />
    <path stroke='#000' d='M10.93 13.013a2.431 2.431 0 1 1-4.861.001 2.431 2.431 0 0 1 4.862 0Z' />
    <path fill='#101014' d='M8.103 18.14a.5.5 0 1 0 1 0h-1Zm0-2.603v2.602h1v-2.602h-1Z' />
    <path
      fill='#000'
      fillRule='evenodd'
      d='M13.572 7.809V5.165C13.572 2.32 11.307 0 8.509 0 5.712 0 3.43 2.32 3.43 5.165v2.644H4.55V5.165c0-2.129 1.848-4.013 3.96-4.013 2.11 0 3.934 1.867 3.934 4.013v2.644h1.128Z'
      clipRule='evenodd'
      {...pathProps}
    />
  </svg>
)
export default PasswordIcon
