import { SVGProps } from 'react'

interface ICardType extends SVGProps<SVGSVGElement> {
  colorCircle1?: string
  colorCircle1Line?: string
  colorCircle2?: string
  colorCircle3?: string
  colorText?: string
}
const CardType06 = ({ colorCircle1, colorCircle1Line, colorCircle2, colorCircle3, colorText, ...rest }: ICardType) => (
  <svg width='300' height='180' viewBox='0 0 300 180' fill='none' xmlns='http://www.w3.org/2000/svg' {...rest}>
    <rect x='0.5' width='180' height='180' rx='10' fill={colorCircle1 || '#252629'} />
    <rect x='48.5' y='48' width='120' height='120' rx='10' fill={colorCircle2 || '#EDEEF1'} />
    <rect x='84.5' y='84' width='72' height='72' rx='10' fill={colorCircle3 || '#3C82F9'} />
    <path
      d='M204.833 46C204.833 47.4728 206.027 48.6667 207.5 48.6667C208.973 48.6667 210.167 47.4728 210.167 46C210.167 44.5272 208.973 43.3333 207.5 43.3333C206.027 43.3333 204.833 44.5272 204.833 46ZM240.833 46C240.833 47.4728 242.027 48.6667 243.5 48.6667C244.973 48.6667 246.167 47.4728 246.167 46C246.167 44.5272 244.973 43.3333 243.5 43.3333C242.027 43.3333 240.833 44.5272 240.833 46ZM207.5 46.5H243.5V45.5H207.5V46.5Z'
      fill={colorCircle1Line || '#252629'}
    />
    <path
      d='M264.156 42.3906V40.6875H273.172V42.3906H269.688V52H267.656V42.3906H264.156ZM274.828 52H272.656L276.641 40.6875H279.141L283.141 52H280.969L280.023 49.2031H275.766L274.828 52ZM276.312 47.5625H279.477L277.938 43H277.844L276.312 47.5625ZM284.484 40.6875H286.984L290.344 48.9062H290.484L293.844 40.6875H296.344V52H294.391V44.2188H294.281L291.141 51.9688H289.688L286.547 44.1875H286.453V52H284.484V40.6875Z'
      fill={colorText || '#EDEEF1'}
    />
    <path
      d='M204.833 90C204.833 91.4728 206.027 92.6667 207.5 92.6667C208.973 92.6667 210.167 91.4728 210.167 90C210.167 88.5272 208.973 87.3333 207.5 87.3333C206.027 87.3333 204.833 88.5272 204.833 90ZM240.833 90C240.833 91.4728 242.027 92.6667 243.5 92.6667C244.973 92.6667 246.167 91.4728 246.167 90C246.167 88.5272 244.973 87.3333 243.5 87.3333C242.027 87.3333 240.833 88.5272 240.833 90ZM207.5 90.5H243.5V89.5H207.5V90.5Z'
      fill={colorCircle2 || '#EDEEF1'}
    />
    <path
      d='M270.789 87.7969C270.688 86.8203 269.867 86.2578 268.648 86.2656C267.359 86.2578 266.594 86.8828 266.586 87.7344C266.578 88.6875 267.586 89.0781 268.523 89.2969L269.586 89.5781C271.273 89.9688 272.898 90.8594 272.898 92.8281C272.898 94.8125 271.328 96.1719 268.617 96.1719C265.984 96.1719 264.312 94.9062 264.227 92.6719H266.227C266.32 93.8516 267.312 94.4297 268.602 94.4375C269.938 94.4297 270.859 93.7812 270.867 92.8125C270.859 91.9219 270.047 91.5469 268.82 91.2344L267.539 90.9062C265.68 90.4219 264.523 89.4844 264.523 87.8594C264.523 85.8594 266.297 84.5312 268.68 84.5312C271.078 84.5312 272.711 85.8828 272.742 87.7969H270.789ZM275.852 96H273.68L277.664 84.6875H280.164L284.164 96H281.992L281.047 93.2031H276.789L275.852 96ZM277.336 91.5625H280.5L278.961 87H278.867L277.336 91.5625ZM285.508 84.6875H288.008L291.367 92.9062H291.508L294.867 84.6875H297.367V96H295.414V88.2188H295.305L292.164 95.9688H290.711L287.57 88.1875H287.477V96H285.508V84.6875Z'
      fill={colorText || '#EDEEF1'}
    />
    <path
      d='M204.833 134C204.833 135.473 206.027 136.667 207.5 136.667C208.973 136.667 210.167 135.473 210.167 134C210.167 132.527 208.973 131.333 207.5 131.333C206.027 131.333 204.833 132.527 204.833 134ZM240.833 134C240.833 135.473 242.027 136.667 243.5 136.667C244.973 136.667 246.167 135.473 246.167 134C246.167 132.527 244.973 131.333 243.5 131.333C242.027 131.333 240.833 132.527 240.833 134ZM207.5 134.5H243.5V133.5H207.5V134.5Z'
      fill={colorCircle3 || '#3C82F9'}
    />
    <path
      d='M270.797 131.797C270.695 130.82 269.875 130.258 268.656 130.266C267.367 130.258 266.602 130.883 266.594 131.734C266.586 132.688 267.594 133.078 268.531 133.297L269.594 133.578C271.281 133.969 272.906 134.859 272.906 136.828C272.906 138.812 271.336 140.172 268.625 140.172C265.992 140.172 264.32 138.906 264.234 136.672H266.234C266.328 137.852 267.32 138.43 268.609 138.438C269.945 138.43 270.867 137.781 270.875 136.812C270.867 135.922 270.055 135.547 268.828 135.234L267.547 134.906C265.688 134.422 264.531 133.484 264.531 131.859C264.531 129.859 266.305 128.531 268.688 128.531C271.086 128.531 272.719 129.883 272.75 131.797H270.797ZM284.688 134.344C284.695 138 282.461 140.156 279.5 140.156C276.523 140.156 274.305 137.992 274.312 134.344C274.305 130.688 276.523 128.531 279.5 128.531C282.461 128.531 284.695 130.688 284.688 134.344ZM276.359 134.344C276.352 136.93 277.656 138.328 279.5 138.328C281.352 138.328 282.648 136.93 282.641 134.344C282.648 131.758 281.352 130.359 279.5 130.359C277.656 130.359 276.352 131.758 276.359 134.344ZM286.5 128.688H289L292.359 136.906H292.5L295.859 128.688H298.359V140H296.406V132.219H296.297L293.156 139.969H291.703L288.562 132.188H288.469V140H286.5V128.688Z'
      fill={colorText || '#EDEEF1'}
    />
  </svg>
)

export default CardType06
