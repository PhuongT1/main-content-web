import { SvgComponentProps } from '@/types/types.type'
const BulletDotIcon = ({ svgProps, pathProps }: SvgComponentProps) => (
  <svg
    width={svgProps?.width || 48}
    height={svgProps?.height || 48}
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
    {...svgProps}
  >
    <path d='M12 10a2 2 0 1 0 0 4 2 2 0 1 0 0-4z' fill='#C3C3C5' {...pathProps} />
  </svg>
)
export default BulletDotIcon
