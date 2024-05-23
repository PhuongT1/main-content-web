import { SvgComponentProps } from '@/types/types.type'

const ImageTrashIcon = ({ svgProps, rectProps, pathProps }: SvgComponentProps<2>) => {
  return (
    <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg' {...svgProps}>
      <rect x='0.5' y='0.5' width='31' height='31' rx='15.5' fill='#9F9EA4' {...rectProps?.[0]} />
      <rect x='0.5' y='0.5' width='31' height='31' rx='15.5' stroke='white' {...rectProps?.[1]} />
      <path
        d='M14 10H18M10 12H22M20.6667 12L20.1991 19.0129C20.129 20.065 20.0939 20.5911 19.8667 20.99C19.6666 21.3412 19.3648 21.6235 19.0011 21.7998C18.588 22 18.0607 22 17.0062 22H14.9938C13.9393 22 13.412 22 12.9989 21.7998C12.6352 21.6235 12.3334 21.3412 12.1333 20.99C11.9061 20.5911 11.871 20.065 11.8009 19.0129L11.3333 12M14.6667 15V18.3333M17.3333 15V18.3333'
        stroke='white'
        strokeLinecap='round'
        strokeLinejoin='round'
        {...pathProps?.[0]}
      />
    </svg>
  )
}

export default ImageTrashIcon
