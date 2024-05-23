import { iRPalette } from '@/atoms/home/stepper'
import { Typography } from '@/elements'
import { LayoutIRProps } from '@/types/deck.type'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, SxProps, Theme, useTheme } from '@mui/material'
import React from 'react'
import { useRecoilValue } from 'recoil'

type HeaderIRProps = {
  leftContent?: React.ReactNode
  rightContent?: React.ReactNode
  sxLeftContent?: SxProps<Theme>
  sxRightContent?: SxProps<Theme>
}

export interface LayoutThreeProps extends LayoutIRProps {
  header?: HeaderIRProps
}

const LayoutIRThree = ({ children, sxContainer, sxChildren, header }: LayoutThreeProps) => {
  const {
    palette: { home }
  } = useTheme()

  const { primaryColor } = useRecoilValue(iRPalette)

  return (
    <Box component={'div'} sx={{ height: '100%', ...sxContainer }}>
      <Box
        component={'div'}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: remConvert('0px 0px 99px 0px'),
          padding: remConvert('14px 60px 14px 40px'),
          maxWidth: `calc(100% - ${remConvert('36px')})`,
          background: primaryColor
        }}
      >
        <Typography
          cate='body_2_bold'
          sx={{
            color: home.ir_white,
            letterSpacing: '-0.9px',
            ...header?.sxLeftContent
          }}
        >
          {header?.leftContent || 'BRAND IDENTITY'}
        </Typography>
        <Typography
          cate='body_2_bold'
          sx={{ letterSpacing: '-0.9px', color: home.ir_white, ...header?.sxRightContent }}
        >
          {header?.rightContent || 'SCHUMPETER PROGRAM'}
        </Typography>
      </Box>
      <Box component={'div'} sx={{ flex: '1 0 0', ...sxChildren }}>
        {children}
      </Box>
    </Box>
  )
}

export default LayoutIRThree
