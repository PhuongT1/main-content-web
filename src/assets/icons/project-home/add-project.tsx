import { SvgComponentProps } from '@/types/types.type'

const AddProjectIcon = ({ svgProps }: SvgComponentProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={svgProps?.width || 63}
      height={svgProps?.height || 73}
      viewBox='0 0 63 73'
      fill='none'
      {...svgProps}
    >
      <path
        d='M54.5586 45.0036V17.1024C54.5586 17.0582 54.5561 17.0141 54.5512 16.9712C54.5291 16.7959 54.3119 15.2266 53.1828 14.1599L40.4879 2.15468C39.3588 1.08682 37.7008 0.880212 37.5167 0.86048C37.4701 0.855837 37.4234 0.853516 37.3768 0.853516H6.69496C3.31137 0.853516 0.558594 3.457 0.558594 6.65709V60.0499C0.558594 63.25 3.31137 65.8535 6.69496 65.8535C6.69496 65.8535 35.8667 65.8535 54.5586 65.8535C54.5586 57.9224 54.5586 54.7091 54.5586 45.0036Z'
        fill='url(#paint0_linear_4715_26424)'
      />
      <path
        d='M53.1481 13.9917L40.7368 2.27184C39.6328 1.22926 38.0117 1.02755 37.8317 1.00828C37.4933 0.96862 37.1525 1.07288 36.8969 1.28933C36.6413 1.50464 36.4961 1.81175 36.4961 2.13472V12.3338C36.4961 15.4582 39.1876 18 42.496 18H53.2957C53.6377 18 53.9629 17.8617 54.1909 17.6215C54.4189 17.3801 54.5269 17.0594 54.4885 16.7387C54.4657 16.5653 54.2521 15.0343 53.1481 13.9917Z'
        fill='url(#paint1_linear_4715_26424)'
      />
      <path
        d='M48.4414 72.1465C56.1734 72.1465 62.4414 65.8785 62.4414 58.1465C62.4414 50.4145 56.1734 44.1465 48.4414 44.1465C40.7094 44.1465 34.4414 50.4145 34.4414 58.1465C34.4414 65.8785 40.7094 72.1465 48.4414 72.1465Z'
        fill='#3C82F9'
      />
      <path
        d='M48.4961 63V53M43.4961 58H53.4961'
        stroke='#EDEEF1'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <defs>
        <linearGradient
          id='paint0_linear_4715_26424'
          x1='3.37273'
          y1='65.1107'
          x2='52.3263'
          y2='13.3499'
          gradientUnits='userSpaceOnUse'
        >
          <stop stop-color='#B3D8F4' />
          <stop offset='1' stop-color='#D1E7F8' />
        </linearGradient>
        <linearGradient
          id='paint1_linear_4715_26424'
          x1='36.4961'
          y1='9.50014'
          x2='54.4961'
          y2='9.50014'
          gradientUnits='userSpaceOnUse'
        >
          <stop stop-color='#44BDBD' />
          <stop offset='1' stop-color='#3182F7' />
          <stop offset='1' stop-color='#3C82F9' />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default AddProjectIcon
