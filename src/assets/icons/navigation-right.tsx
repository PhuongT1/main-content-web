import { SvgComponentProps } from '@/types/types.type'
const NavigationRightIcon = ({ pathProps, svgProps, rectProps }: SvgComponentProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={48} height={48} fill='none' {...svgProps}>
    <rect width={48} height={48} fill='#fff' rx={24} {...rectProps} />
    <g clipPath='url(#a)'>
      <path
        fill='#1F1F29'
        d='m25.212 31-1.094-1.08 4.503-4.502H16.959v-1.563h11.662l-4.503-4.489 1.094-1.093 6.364 6.363L25.212 31Z'
        {...pathProps}
      />
    </g>
    <defs>
      <clipPath id='a'>
        <path fill='#fff' d='M12 12h24v24H12z' />
      </clipPath>
    </defs>
  </svg>
)
export default NavigationRightIcon
