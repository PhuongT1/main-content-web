import { Typography } from '@/elements'
import { LayoutIRProps } from '@/types/deck.type'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, SxProps, Theme, useTheme } from '@mui/material'
import React from 'react'

export interface LayoutTwoProps extends LayoutIRProps {
  sxLeft?: SxProps<Theme>
}

const LayoutIRTwo = ({ children, sxContainer, sxChildren, sxLeft }: LayoutTwoProps) => {
  const {
    palette: { home }
  } = useTheme()

  return (
    <Box component={'div'} sx={{ display: 'flex', flexDirection: 'row', height: '100%', ...sxContainer }}>
      <Box
        component={'div'}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          width: remConvert('63px'),
          backgroundColor: 'rgba(41, 42, 44, 0.10)',
          ...sxLeft
        }}
      >
        <Typography
          cate='sub_title_40'
          sx={{
            color: home.ir_white,
            transform: 'rotate(-90deg) translate(15px, -120px)',
            whiteSpace: 'nowrap',
            fontWeight: 700,
            letterSpacing: remConvert('5.4px')
          }}
        >
          SCHUMPETER PROGRAM
        </Typography>
      </Box>
      <Box component={'div'} sx={{ flex: '1 0 0', ...sxChildren }}>
        {children}
      </Box>
    </Box>
  )
}

export default LayoutIRTwo
