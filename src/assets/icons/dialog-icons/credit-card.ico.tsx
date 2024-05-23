import { SvgComponentProps } from '@/types/types.type'

const CreditCardIcon = ({ svgProps, pathProps, rectProps }: SvgComponentProps) => (
  <svg width='52' height='52' viewBox='0 0 52 52' fill='none' xmlns='http://www.w3.org/2000/svg' {...svgProps}>
    <rect width='52' height='52' rx='26' fill='#FF3932' fillOpacity='0.16' {...rectProps} />
    <path
      d='M36 24H16M25 28H20M16 22.2L16 29.8C16 30.9201 16 31.4802 16.218 31.908C16.4097 32.2843 16.7157 32.5903 17.092 32.782C17.5198 33 18.0799 33 19.2 33L32.8 33C33.9201 33 34.4802 33 34.908 32.782C35.2843 32.5903 35.5903 32.2843 35.782 31.908C36 31.4802 36 30.9201 36 29.8V22.2C36 21.0799 36 20.5198 35.782 20.092C35.5903 19.7157 35.2843 19.4097 34.908 19.218C34.4802 19 33.9201 19 32.8 19L19.2 19C18.0799 19 17.5198 19 17.092 19.218C16.7157 19.4097 16.4097 19.7157 16.218 20.092C16 20.5198 16 21.0799 16 22.2Z'
      stroke='#FF3932'
      strokeWidth='1.6'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...pathProps}
    />
  </svg>
)
export default CreditCardIcon
