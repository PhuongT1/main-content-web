import { SvgComponentProps } from '@/types/types.type'

const TypeSlideSvg = ({ svgProps }: SvgComponentProps) => (
  <svg width='160' height='80' viewBox='0 0 160 80' fill='none' xmlns='http://www.w3.org/2000/svg' {...svgProps}>
    <rect width='160' height='80' rx='6' fill='#37393E' />
    <rect x='30' y='39' width='100' height='4' rx='2' fill='#9498A3' />
    <circle cx='80' cy='40' r='10' fill='#37393E' stroke='#9498A3' strokeWidth='2' />
    <circle cx='80' cy='40' r='6' fill='#3C82F9' />
    <circle cx='123' cy='41' r='6' fill='#37393E' stroke='#9498A3' strokeWidth='2' />
    <circle cx='37' cy='41' r='6' fill='#37393E' stroke='#9498A3' strokeWidth='2' />
  </svg>
)
export default TypeSlideSvg
