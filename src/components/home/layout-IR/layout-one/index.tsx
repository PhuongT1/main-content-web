import { iRPalette } from '@/atoms/home/stepper'
import { Typography } from '@/elements'
import { LayoutIRProps } from '@/types/deck.type'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, Stack, SxProps, Theme, useTheme } from '@mui/material'
import React, { CSSProperties } from 'react'
import { useRecoilValue } from 'recoil'

type ContentIRProps = {
  title?: React.ReactNode
  subTitle?: React.ReactNode
  sxTitle?: SxProps<Theme>
  sxSubTitle?: SxProps<Theme>
}

type HeaderIRProps = {
  leftItem?: ContentIRProps
  centerItem?: ContentIRProps
  rightItem?: React.ReactNode
  sxRightItem?: SxProps<Theme>
}
export interface LayoutOneProps extends LayoutIRProps {
  header?: HeaderIRProps
}

const flexItem = {
  display: 'inline-flex',
  flexDirection: 'column'
} as CSSProperties

const LayoutOneIR = ({ children, sxContainer, sxChildren, header, sxStack }: LayoutOneProps) => {
  const { primaryColor } = useRecoilValue(iRPalette)
  const {
    palette: { home }
  } = useTheme()

  return (
    <Box component={'div'} sx={{ padding: remConvert('54px'), height: '100%', ...sxContainer }}>
      <Stack
        display={'flex'}
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          ...sxStack
        }}
      >
        <Box component={'div'} sx={{ ...flexItem }}>
          <Typography
            component={'div'}
            cate='sub_title_10'
            sx={{
              color: primaryColor,
              fontSize: remConvert('18px'),
              letterSpacing: '-0.9px',
              lineHeight: '150%',
              ...header?.leftItem?.sxTitle
            }}
          >
            {header?.leftItem?.title || 'BRAND IDENTITY'}
          </Typography>
          <Typography
            component={'div'}
            cate='body_10'
            sx={{
              color: home.ir_neutral_alpha80,
              fontSize: remConvert('18px'),
              ...header?.leftItem?.sxSubTitle
            }}
          >
            {header?.leftItem?.subTitle || '브랜드 정체성'}
          </Typography>
        </Box>
        <Box component={'div'} sx={{ textAlign: 'right', ...flexItem, gap: remConvert('4px') }}>
          <Typography
            component={'div'}
            cate='sub_title_40'
            sx={{
              letterSpacing: remConvert('0.9px'),
              lineHeight: '135%',
              color: home.ir_neutral_alpha40,
              ...header?.sxRightItem
            }}
          >
            {header?.rightItem || (
              <>
                SCHUMPETER <br />
                PROGRAM
              </>
            )}
          </Typography>
        </Box>
      </Stack>
      <Box component={'div'} sx={{ ...flexItem, alignItems: 'center' }}>
        {header?.centerItem?.title && (
          <Typography
            component={'div'}
            cate='title_60_nomal'
            sx={{
              fontWeight: 700,
              color: home.ir_black,
              ...header?.centerItem?.sxTitle
            }}
          >
            {header?.centerItem?.title}
          </Typography>
        )}
        {header?.centerItem?.subTitle && (
          <Typography
            component={'div'}
            cate='body_30'
            sx={{ color: home.ir_neutral_alpha80, ...header?.centerItem?.sxSubTitle }}
          >
            {header?.centerItem?.subTitle || '우리 기업의 브랜드 정체성을 설명해주세요.'}
          </Typography>
        )}
      </Box>
      <Box component={'div'} sx={{ flex: '1 0 0', ...sxChildren }}>
        {children}
      </Box>
    </Box>
  )
}

export default LayoutOneIR
