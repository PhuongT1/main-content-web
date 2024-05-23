import { SvgComponentProps } from '@/types/types.type'

const ReportIcon = ({ svgProps, pathProps }: SvgComponentProps) => {
  return (
    <svg width='20' height='21' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg' {...svgProps}>
      <path
        d='M3.33325 13.2702C3.33325 13.2702 4.16659 12.4369 6.66659 12.4369C9.16659 12.4369 10.8333 14.1036 13.3333 14.1036C15.8333 14.1036 16.6666 13.2702 16.6666 13.2702V4.10356C16.6666 4.10356 15.8333 4.93689 13.3333 4.93689C10.8333 4.93689 9.16659 3.27022 6.66659 3.27022C4.16659 3.27022 3.33325 4.10356 3.33325 4.10356M3.33325 19.1036L3.33325 2.43689'
        stroke='#F7F8FA'
        strokeLinecap='round'
        strokeLinejoin='round'
        {...pathProps}
      />
    </svg>
  )
}

export default ReportIcon
