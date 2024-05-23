import { SvgComponentProps } from '@/types/types.type'

const ExceedingIcon = ({ svgProps, pathProps, rectProps }: SvgComponentProps) => (
  <svg width='52' height='52' viewBox='0 0 52 52' fill='none' xmlns='http://www.w3.org/2000/svg' {...svgProps}>
    <rect width='52' height='52' rx='26' fill='#FF3932' fillOpacity='0.12' {...rectProps} />
    <path
      d='M35 26.0138V21.3333C35 19.4665 35 18.5331 34.673 17.82C34.3854 17.1928 33.9265 16.6829 33.362 16.3633C32.7202 16 31.8802 16 30.2 16H21.8C20.1198 16 19.2798 16 18.638 16.3633C18.0735 16.6829 17.6146 17.1928 17.327 17.82C17 18.5331 17 19.4665 17 21.3333V30.6667C17 32.5335 17 33.4669 17.327 34.18C17.6146 34.8072 18.0735 35.3171 18.638 35.6367C19.2798 36 20.1198 36 21.8 36H25.0314'
      stroke='#FF3932'
      strokeWidth='1.6'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...pathProps}
    />
    <path d='M21.2578 20.582H30.7404' stroke='#FF3932' strokeWidth='1.6' strokeLinecap='round' {...pathProps} />
    <path d='M21.2578 24.5079H30.7378' stroke='#FF3932' strokeWidth='1.6' strokeLinecap='round' {...pathProps} />
    <path d='M21.2578 28.5078H23.7487' stroke='#FF3932' strokeWidth='1.6' strokeLinecap='round' {...pathProps} />
    <path
      d='M35.0004 36.1792C35.0004 35.6623 35.0004 35.4039 34.9366 35.1936C34.793 34.7201 34.4224 34.3495 33.9489 34.2059C33.7386 34.1421 33.4802 34.1421 32.9633 34.1421H31.1114C30.5945 34.1421 30.336 34.1421 30.1257 34.2059C29.6522 34.3495 29.2817 34.7201 29.138 35.1936C29.0742 35.4039 29.0742 35.6623 29.0742 36.1792M33.787 30.3738C33.787 31.2943 33.0408 32.0405 32.1203 32.0405C31.1998 32.0405 30.4535 31.2943 30.4535 30.3738C30.4535 29.4533 31.1998 28.707 32.1203 28.707C33.0408 28.707 33.787 29.4533 33.787 30.3738Z'
      stroke='#FF3932'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...pathProps}
    />
  </svg>
)
export default ExceedingIcon
