import { useTheme } from '@mui/material'
import * as React from 'react'
import { SVGProps } from 'react'

const DeletePartner = (props: SVGProps<SVGSVGElement>) => {
  const {
    palette: { home }
  } = useTheme()
  
  return (
    <svg width={24} height={24} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <rect width={24} height={24} rx={4} fill={home.gray400} />
      <path d='M16 8L8 16M8 8L16 16' stroke={home.gray50} strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}
export default DeletePartner
