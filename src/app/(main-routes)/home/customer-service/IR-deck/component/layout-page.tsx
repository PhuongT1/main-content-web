import { Box, SxProps, Theme } from '@mui/material'
import { remConvert } from '@/utils/convert-to-rem'
import React from 'react'

export interface LayoutPageProps {
  children?: React.ReactNode
  sx?: SxProps<Theme>
}

const LayoutPage = ({ children, sx }: LayoutPageProps) => {
  return (
    <Box component='div' sx={{ display: 'flex', gap: remConvert('4px'), flexDirection: 'column', ...sx }}>
      {children && children}
    </Box>
  )
}

export default LayoutPage
