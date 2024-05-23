import { remConvert } from '@/utils/convert-to-rem'
import { Box } from '@mui/material'
import { ReactNode } from 'react'

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return <Box sx={{ maxWidth: remConvert('1920px'), marginLeft: 'auto', marginRight: 'auto' }}>{children}</Box>
}

export default HomeLayout
