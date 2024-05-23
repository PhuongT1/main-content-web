import { SvgComponentProps } from '@/types/types.type'

const MentorReportIcon = ({ svgProps, pathProps }: SvgComponentProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='46' height='46' viewBox='0 0 46 46' fill='none' {...svgProps}>
    <path
      d='M5.75 17.25H40.25M17.25 17.25L17.25 40.25M14.95 5.75H31.05C34.2703 5.75 35.8805 5.75 37.1104 6.37671C38.1924 6.92798 39.072 7.80762 39.6233 8.88955C40.25 10.1195 40.25 11.7297 40.25 14.95V31.05C40.25 34.2703 40.25 35.8805 39.6233 37.1104C39.072 38.1924 38.1924 39.072 37.1104 39.6233C35.8805 40.25 34.2703 40.25 31.05 40.25H14.95C11.7297 40.25 10.1195 40.25 8.88955 39.6233C7.80762 39.072 6.92798 38.1924 6.37671 37.1104C5.75 35.8805 5.75 34.2703 5.75 31.05V14.95C5.75 11.7297 5.75 10.1195 6.37671 8.88955C6.92798 7.80762 7.80762 6.92798 8.88955 6.37671C10.1195 5.75 11.7297 5.75 14.95 5.75Z'
      stroke='#F7F8FA'
      strokeWidth='2.25'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...pathProps}
    />
    <path d='M23 24.917H33.5417' stroke='#F7F8FA' strokeWidth='2.25' strokeLinecap='round' {...pathProps} />
    <path d='M23 30.667H27.7917' stroke='#F7F8FA' strokeWidth='2.25' strokeLinecap='round' {...pathProps} />
  </svg>
)
export default MentorReportIcon
