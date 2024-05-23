import { SvgComponentProps } from '@/types/types.type'
const NavigationLeftIcon = ({ pathProps, svgProps, rectProps }: SvgComponentProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={48} height={48} fill='none' {...svgProps}>
    <rect width={48} height={48} fill='#fff' rx={24} transform='matrix(-1 0 0 1 48 0)' {...rectProps} />
    <g clipPath='url(#a)'>
      <path
        fill='#1F1F29'
        d='m22.788 31 1.094-1.08-4.503-4.502h11.662v-1.563H19.379l4.503-4.489-1.094-1.093-6.364 6.363L22.788 31Z'
        {...pathProps}
      />
    </g>
    <defs>
      <clipPath id='a'>
        <path fill='#fff' d='M36 12H12v24h24z' />
      </clipPath>
    </defs>
  </svg>
)
export default NavigationLeftIcon
