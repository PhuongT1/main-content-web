import * as React from 'react'
import { SvgComponentProps } from '@/types/types.type'

const XCircleIcon = ({ pathProps, svgProps }: SvgComponentProps) => (
	<svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 32 32" fill="none" {...svgProps}>
		<path
			d="M20.0003 12.0013L12.0003 20.0013M12.0003 12.0013L20.0003 20.0013M29.3337 16.0013C29.3337 23.3651 23.3641 29.3346 16.0003 29.3346C8.63653 29.3346 2.66699 23.3651 2.66699 16.0013C2.66699 8.6375 8.63653 2.66797 16.0003 2.66797C23.3641 2.66797 29.3337 8.6375 29.3337 16.0013Z"
			stroke="black"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...pathProps}
		/>
	</svg>
)
export default XCircleIcon
