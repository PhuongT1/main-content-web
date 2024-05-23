import * as React from "react"
import { SVGProps } from "react"
const BookmarkFilled = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#2D68FE"
      stroke="#2D68FE"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.167 6.5c0-1.4 0-2.1.272-2.635a2.5 2.5 0 0 1 1.093-1.093C6.067 2.5 6.767 2.5 8.167 2.5h3.667c1.4 0 2.1 0 2.635.272a2.5 2.5 0 0 1 1.092 1.093c.273.535.273 1.235.273 2.635v11L10 14.167 4.167 17.5v-11Z"
    />
  </svg>
)
export default BookmarkFilled
