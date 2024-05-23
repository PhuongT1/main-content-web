import { SvgComponentProps } from '@/types/types.type'
const AddDocument = ({ svgProps, pathProps }: SvgComponentProps) => (
  <svg width='13' height='14' viewBox='0 0 13 14' fill='none' xmlns='http://www.w3.org/2000/svg' {...svgProps}>
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M2.49967 0.666667C1.94739 0.666667 1.49967 1.11438 1.49967 1.66667V12.3333C1.49967 12.8856 1.94739 13.3333 2.49967 13.3333H10.4997C11.052 13.3333 11.4997 12.8856 11.4997 12.3333V4.94658C11.4997 4.65465 11.3721 4.37731 11.1505 4.18732L7.3239 0.90741C7.14266 0.752059 6.91182 0.666667 6.67311 0.666667H2.49967ZM0.833008 1.66667C0.833008 0.746193 1.5792 0 2.49967 0H6.67311C7.07096 0 7.45569 0.14232 7.75776 0.401239L11.5843 3.68115C11.9537 3.99779 12.1663 4.46004 12.1663 4.94658V12.3333C12.1663 13.2538 11.4201 14 10.4997 14H2.49967C1.5792 14 0.833008 13.2538 0.833008 12.3333V1.66667Z'
      fill='#EDEEF1'
      {...pathProps}
    />
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M6.83301 2.99984V0.666504H7.49967V2.99984C7.49967 3.55212 7.94739 3.99984 8.49967 3.99984H11.4997V4.6665H8.49967C7.5792 4.6665 6.83301 3.92031 6.83301 2.99984Z'
      fill='#EDEEF1'
      {...pathProps}
    />
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M6.16602 10.9998V5.6665H6.83268V10.9998H6.16602Z'
      fill='#EDEEF1'
      {...pathProps}
    />
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M9.16634 8.66667H3.83301V8H9.16634V8.66667Z'
      fill='#EDEEF1'
      {...pathProps}
    />
  </svg>
)
export default AddDocument
