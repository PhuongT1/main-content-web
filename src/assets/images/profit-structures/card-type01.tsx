import { SVGProps } from 'react'

interface ICardType extends SVGProps<SVGSVGElement> {
  colorCircle1?: string
  colorCircle2?: string
  colorCircle3?: string
  colorText?: string
}
const CardType01 = ({ colorCircle1, colorCircle2, colorCircle3, colorText, ...rest }: ICardType) => (
  <svg width='331' height='184' viewBox='0 0 331 184' fill='none' xmlns='http://www.w3.org/2000/svg' {...rest}>
    <circle cx='75.5' cy='75' r='75' fill={colorCircle1 || '#252629'} />
    <circle cx='210.5' cy='100' r='50' fill={colorCircle2 || '#EDEEF1'} />
    <circle cx='300.5' cy='120' r='30' fill={colorCircle3 || '#3C82F9'} />
    <path
      d='M58.1562 168.391V166.688H67.1719V168.391H63.6875V178H61.6562V168.391H58.1562ZM68.8281 178H66.6562L70.6406 166.688H73.1406L77.1406 178H74.9688L74.0234 175.203H69.7656L68.8281 178ZM70.3125 173.562H73.4766L71.9375 169H71.8438L70.3125 173.562ZM78.4844 166.688H80.9844L84.3438 174.906H84.4844L87.8438 166.688H90.3438V178H88.3906V170.219H88.2812L85.1406 177.969H83.6875L80.5469 170.188H80.4531V178H78.4844V166.688Z'
      fill={colorText || '#EDEEF1'}
    />
    <path
      d='M199.789 169.797C199.688 168.82 198.867 168.258 197.648 168.266C196.359 168.258 195.594 168.883 195.586 169.734C195.578 170.688 196.586 171.078 197.523 171.297L198.586 171.578C200.273 171.969 201.898 172.859 201.898 174.828C201.898 176.812 200.328 178.172 197.617 178.172C194.984 178.172 193.312 176.906 193.227 174.672H195.227C195.32 175.852 196.312 176.43 197.602 176.438C198.938 176.43 199.859 175.781 199.867 174.812C199.859 173.922 199.047 173.547 197.82 173.234L196.539 172.906C194.68 172.422 193.523 171.484 193.523 169.859C193.523 167.859 195.297 166.531 197.68 166.531C200.078 166.531 201.711 167.883 201.742 169.797H199.789ZM204.852 178H202.68L206.664 166.688H209.164L213.164 178H210.992L210.047 175.203H205.789L204.852 178ZM206.336 173.562H209.5L207.961 169H207.867L206.336 173.562ZM214.508 166.688H217.008L220.367 174.906H220.508L223.867 166.688H226.367V178H224.414V170.219H224.305L221.164 177.969H219.711L216.57 170.188H216.477V178H214.508V166.688Z'
      fill={colorText || '#EDEEF1'}
    />
    <path
      d='M288.797 169.797C288.695 168.82 287.875 168.258 286.656 168.266C285.367 168.258 284.602 168.883 284.594 169.734C284.586 170.688 285.594 171.078 286.531 171.297L287.594 171.578C289.281 171.969 290.906 172.859 290.906 174.828C290.906 176.812 289.336 178.172 286.625 178.172C283.992 178.172 282.32 176.906 282.234 174.672H284.234C284.328 175.852 285.32 176.43 286.609 176.438C287.945 176.43 288.867 175.781 288.875 174.812C288.867 173.922 288.055 173.547 286.828 173.234L285.547 172.906C283.688 172.422 282.531 171.484 282.531 169.859C282.531 167.859 284.305 166.531 286.688 166.531C289.086 166.531 290.719 167.883 290.75 169.797H288.797ZM302.688 172.344C302.695 176 300.461 178.156 297.5 178.156C294.523 178.156 292.305 175.992 292.312 172.344C292.305 168.688 294.523 166.531 297.5 166.531C300.461 166.531 302.695 168.688 302.688 172.344ZM294.359 172.344C294.352 174.93 295.656 176.328 297.5 176.328C299.352 176.328 300.648 174.93 300.641 172.344C300.648 169.758 299.352 168.359 297.5 168.359C295.656 168.359 294.352 169.758 294.359 172.344ZM304.5 166.688H307L310.359 174.906H310.5L313.859 166.688H316.359V178H314.406V170.219H314.297L311.156 177.969H309.703L306.562 170.188H306.469V178H304.5V166.688Z'
      fill={colorText || '#EDEEF1'}
    />
  </svg>
)

export default CardType01
