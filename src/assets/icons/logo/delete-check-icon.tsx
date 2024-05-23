import { SvgComponentProps } from '@/types/types.type'

const DeleteCheckIcon = ({ svgProps, rectProps, pathProps }: SvgComponentProps<2>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' viewBox='0 0 25 24' fill='none'>
      <rect x='0.5' width='24' height='24' rx='4' fill='#191A1C' />
      <rect x='1.5' y='1' width='22' height='22' rx='4' fill='#252629' />
      <path d='M16.5 8L8.5 16M8.5 8L16.5 16' stroke='#EDEEF1' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

export default DeleteCheckIcon
