import { SvgComponentProps } from '@/types/types.type'

const TypeTextSvg = ({ svgProps }: SvgComponentProps) => (
  <svg width='160' height='80' viewBox='0 0 160 80' fill='none' xmlns='http://www.w3.org/2000/svg' {...svgProps}>
    <rect width='160' height='80' rx='6' fill='#37393E' />
    <path
      d='M62.6195 27.1326V37.471H66.5456V40.1747H62.6195V53.5483H59.3564V27.1326H62.6195ZM41.7459 46.3177C48.1892 43.0856 51.6699 38.5898 52.3122 32.5608H43.1547V29.8778H55.6271C55.6064 37.6575 52.3847 44.4945 43.5794 48.8246L41.7459 46.3177ZM92.4733 37.3467V40.0193H88.5472V53.5483H85.2841V27.1326H88.5472V37.3467H92.4733ZM68.7302 47.0014V29.6913H71.9726V44.308C75.5051 44.2666 79.2551 43.9454 83.2537 43.1271L83.6059 45.8619C79.1308 46.7631 74.9043 47.0117 70.9574 47.0014H68.7302ZM114.475 27.1326V37.1706H118.556V39.8432H114.475V53.6519H111.212V27.1326H114.475ZM94.8237 47.1568V29.6291H107.213V32.2707H98.0661V44.453C102.199 44.422 105.452 44.2355 109.099 43.5829L109.471 46.328C105.359 47.0428 101.795 47.1671 96.9991 47.1568H94.8237Z'
      fill='#EDEEF1'
    />
    <line x1='121.5' y1='26' x2='121.5' y2='55' stroke='#3C82F9' strokeWidth='3' />
  </svg>
)
export default TypeTextSvg