import { SvgComponentProps } from '@/types/types.type'

const HeartIcon = ({ svgProps, pathProps }: SvgComponentProps) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...svgProps}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7.99589 3.9454C6.79628 2.54739 4.79585 2.17133 3.29282 3.45149C1.78979 4.73165 1.57818 6.87201 2.75852 8.38606C3.73989 9.64489 6.70986 12.2999 7.68326 13.1592C7.79216 13.2553 7.84661 13.3034 7.91013 13.3223C7.96556 13.3388 8.02622 13.3388 8.08165 13.3223C8.14517 13.3034 8.19962 13.2553 8.30852 13.1592C9.28192 12.2999 12.2519 9.64489 13.2333 8.38606C14.4136 6.87201 14.2278 4.71818 12.699 3.45149C11.1701 2.1848 9.1955 2.54739 7.99589 3.9454Z'
        stroke='white'
        strokeLinecap='round'
        strokeLinejoin='round'
        {...pathProps}
      />
    </svg>
  )
}

export default HeartIcon
