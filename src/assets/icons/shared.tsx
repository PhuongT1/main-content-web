import React from 'react'

const SharedIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={props.width || 16}
    height={props.height || 17}
    viewBox='0 0 16 17'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <g clipPath='url(#clip0_5999_69735)'>
      <path
        d='M12.4094 5.30797H10.8081C10.4842 5.30797 10.2214 5.57042 10.2214 5.89466C10.2214 6.21891 10.4842 6.48136 10.8081 6.48136H12.4098C12.7332 6.48136 12.9965 6.74459 12.9965 7.06806V14.7405C12.9965 15.0639 12.7332 15.3272 12.4098 15.3272H3.59016C3.2667 15.3272 3.00347 15.0639 3.00347 14.7405V7.06806C3.00347 6.74459 3.2667 6.48136 3.59016 6.48136H5.19184C5.51609 6.48136 5.77854 6.21891 5.77854 5.89466C5.77854 5.57042 5.51609 5.30797 5.19184 5.30797H3.59016C2.61977 5.30797 1.83008 6.09766 1.83008 7.06806V14.7405C1.83008 15.7109 2.61977 16.5006 3.59016 16.5006H12.4098C13.3802 16.5006 14.1698 15.7109 14.1698 14.7405V7.06806C14.1695 6.09727 13.3802 5.30797 12.4094 5.30797ZM5.81218 4.12363L7.43263 2.50317V10.2272C7.43263 10.5511 7.69508 10.8139 8.01932 10.8139C8.34357 10.8139 8.60602 10.5511 8.60602 10.2272V2.50317L10.2265 4.12363C10.3411 4.23823 10.4913 4.29533 10.6415 4.29533C10.7917 4.29533 10.9419 4.23823 11.0565 4.12363C11.2857 3.89482 11.2857 3.52285 11.0565 3.29404L8.4347 0.671902C8.20511 0.442699 7.83393 0.442699 7.60473 0.671902L4.98259 3.29404C4.75339 3.52285 4.75339 3.89482 4.98259 4.12363C5.21179 4.35283 5.58297 4.35283 5.81218 4.12363Z'
        fill={props.color || '#EDEEF1'}
      />
    </g>
    <defs>
      <clipPath id='clip0_5999_69735'>
        <rect width='16' height='16' fill='white' transform='translate(0 0.5)' />
      </clipPath>
    </defs>
  </svg>
)
export default SharedIcon