import { SvgComponentProps } from '@/types/types.type'

const DeleteIcon = ({ rectProps, pathProps }: SvgComponentProps) => {
  return (
    <svg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect x='2.5' y='2' width='20' height='20' rx='4' fill='#191A1C' fillOpacity='0.5' {...rectProps} />
      <path
        d='M15.5 9L9.5 15M9.5 9L15.5 15'
        stroke='#EDEEF1'
        strokeLinecap='round'
        strokeLinejoin='round'
        {...pathProps}
      />
    </svg>
  )
}

export default DeleteIcon
