import * as React from 'react'

const ChevronUpAccordion = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width='17' height='17' viewBox='0 0 17 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M12.5 10.5L8.5 6.5L4.5 10.5'
      stroke={props.stroke ?? '#EDEEF1'}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)
export default ChevronUpAccordion
