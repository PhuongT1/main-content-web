import { SvgComponentProps } from '@/types/types.type'

const InformationIcon = ({ svgProps }: SvgComponentProps) => {
  return (
    <svg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg' {...svgProps}>
      <rect width='48' height='48' rx='24' fill='#EBAE12' />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M10.1484 17.7002C10.1484 17.0098 10.7081 16.4502 11.3984 16.4502H35.5484C36.1584 16.4502 36.7434 16.6925 37.1748 17.1238C37.6061 17.5552 37.8484 18.1402 37.8484 18.7502V33.567C37.8484 34.146 37.6184 34.7013 37.209 35.1108C36.7996 35.5202 36.2443 35.7502 35.6652 35.7502H12.3671L12.3637 35.7502C11.7767 35.7486 11.2141 35.5147 10.799 35.0996C10.3839 34.6845 10.15 34.122 10.1484 33.5349L10.1484 33.5316V17.7002ZM12.6484 18.9502V33.2502H35.3484V18.9502H12.6484Z'
        fill='white'
      />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M12.6484 14.75V17.7C12.6484 18.3904 12.0888 18.95 11.3984 18.95C10.7081 18.95 10.1484 18.3904 10.1484 17.7V14.55C10.1484 13.94 10.3908 13.355 10.8221 12.9237C11.2534 12.4923 11.8384 12.25 12.4484 12.25H19.364C19.9732 12.2503 20.558 12.4922 20.989 12.9228L24.8823 16.8161C25.3705 17.3043 25.3705 18.0957 24.8823 18.5839C24.3942 19.072 23.6027 19.072 23.1146 18.5839L19.2807 14.75H12.6484Z'
        fill='white'
      />
    </svg>
  )
}

export default InformationIcon