import { SvgComponentProps } from '@/types/types.type'
const SwitchAdminIcon = ({ svgProps, pathProps }: SvgComponentProps<2>) => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...svgProps}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M11.77 21.54C13.7028 21.54 15.5921 20.9668 17.199 19.8928C18.8058 18.8188 20.0581 17.2922 20.7973 15.5063C21.5364 13.7205 21.7293 11.7558 21.3515 9.86034C20.9737 7.96488 20.0423 6.22386 18.6749 4.8579C17.3075 3.49194 15.5657 2.56236 13.6699 2.18651C11.774 1.81067 9.80931 2.00557 8.02425 2.74657C6.23919 3.48758 4.71402 4.74137 3.64168 6.34936C2.56934 7.95734 1.99803 9.84727 2.00001 11.78C2.00266 14.3695 3.03316 16.8518 4.8651 18.6819C6.69705 20.5119 9.18057 21.54 11.77 21.54Z'
      stroke='#F7F8FA'
      strokeMiterlimit='10'
      {...pathProps?.[0]}
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M15.49 11.7786C15.49 12.309 15.2792 12.8176 14.9042 13.1926C14.5291 13.5677 14.0204 13.7786 13.49 13.7786H9.48996V12.4285L6.76996 14.4285L9.48996 16.4285V15.0884H13.49C13.9334 15.0884 14.3724 15.001 14.7819 14.8311C15.1914 14.6611 15.5634 14.4119 15.8764 14.0979C16.1895 13.7839 16.4375 13.4112 16.6063 13.0012C16.7751 12.5912 16.8613 12.1519 16.86 11.7085L15.49 11.7786ZM8.04996 11.7786C8.04996 11.2481 8.26068 10.7393 8.63575 10.3643C9.01082 9.98919 9.51952 9.77856 10.05 9.77856H14.11V11.1484L16.8 9.14844L14.11 7.14844V8.48853H10.08C9.18527 8.49117 8.32811 8.84835 7.6964 9.48193C7.06469 10.1155 6.70996 10.9737 6.70996 11.8684L8.04996 11.7786Z'
      fill='#F7F8FA'
      {...pathProps?.[1]}
    />
  </svg>
)
export default SwitchAdminIcon