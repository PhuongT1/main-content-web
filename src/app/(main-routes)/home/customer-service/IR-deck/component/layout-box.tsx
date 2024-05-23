import { Typography } from '@/elements'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, SxProps, Theme, useTheme } from '@mui/material'
import React from 'react'

export interface LayoutBoxProps {
  title?: React.ReactNode
  children?: React.ReactNode
  sx?: SxProps<Theme>
}
const LayoutBox = ({ title, children, sx }: LayoutBoxProps) => {
  const {
    palette: { home }
  } = useTheme()

  return (
    <Box
      component={'div'}
      sx={{
        backgroundColor: home.ir_neutral_alpha4,
        padding: remConvert('12px'),
        borderRadius: remConvert('4px'),
        ...sx
      }}
    >
      <Typography
        cate='text_12_bold'
        sx={{ letterSpacing: '-0.24px', color: home.ir_neutral_500, marginBottom: remConvert('6px') }}
      >
        {title}
      </Typography>
      {children && children}
    </Box>
  )
}
export default LayoutBox
