import { SvgComponentProps } from '@/types/types.type'

const PinIcon = ({ svgProps, pathProps }: SvgComponentProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none' {...svgProps}>
    <path
      d='M12.5 7.98866V5.00033H14.1667V3.33366C14.1667 2.89163 13.9911 2.46771 13.6785 2.15515C13.366 1.84259 12.942 1.66699 12.5 1.66699H7.5C7.05797 1.66699 6.63405 1.84259 6.32149 2.15515C6.00893 2.46771 5.83333 2.89163 5.83333 3.33366V5.00033H7.5V7.98866L5.24417 9.41116C5.16663 9.48841 5.10514 9.58024 5.06324 9.68135C5.02133 9.78247 4.99984 9.89087 5 10.0003V11.667C5 11.888 5.0878 12.1 5.24408 12.2562C5.40036 12.4125 5.61232 12.5003 5.83333 12.5003H9.16667V16.667L10 18.3337L10.8333 16.667V12.5003H14.1667C14.3877 12.5003 14.5996 12.4125 14.7559 12.2562C14.9122 12.1 15 11.888 15 11.667V10.0003C15.0002 9.89087 14.9787 9.78247 14.9368 9.68135C14.8949 9.58024 14.8334 9.48841 14.7558 9.41116L12.5 7.98866Z'
      fill='white'
      {...pathProps}
    />
  </svg>
)
export default PinIcon