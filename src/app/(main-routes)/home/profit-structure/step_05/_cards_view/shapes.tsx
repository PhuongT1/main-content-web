import { CSSProperties } from 'react'
import { Box, SxProps, useTheme } from '@mui/material'
import { remConvert } from '@/utils/convert-to-rem'
import { Typography } from '@/elements'

export const ShapeCircle = ({ size, color, sxBox }: { size: string; color: string; sxBox?: SxProps }) => {
  return (
    <Box
      marginBottom={remConvert('8px')}
      width={remConvert(size)}
      height={remConvert(size)}
      borderRadius='100%'
      position='relative'
      bgcolor={color}
      sx={{ ...sxBox }}
    />
  )
}

interface IShapeSquare {
  size: string
  color: string
  text?: string
  sxBox?: SxProps
}
export const ShapeSquare = ({ size, color, text, sxBox }: IShapeSquare) => {
  const { palette } = useTheme()
  return (
    <Box position={'relative'} sx={{ ...sxBox }}>
      {text && (
        <Typography position={'absolute'} cate='title_3_bold' color={palette.home.gray50}>
          {text}
        </Typography>
      )}
      <Box width={size} height={size} bgcolor={color} borderRadius={remConvert('10px')} />
    </Box>
  )
}

interface IShapeTriangle {
  size: string
  color: string
  text?: string
  sxBox?: SxProps
}
export const ShapeTriangle = ({ size, color, text, sxBox }: IShapeTriangle) => {
  const { palette } = useTheme()
  return (
    <Box position={'relative'} sx={{ ...sxBox }}>
      {text && (
        <Typography position={'absolute'} cate='title_3_bold' color={palette.home.gray50}>
          {text}
        </Typography>
      )}
      <svg width={size} height={size} viewBox='0 0 283 282' fill='none'>
        <path
          d='M127.947 8.10503C133.343 -2.68566 148.729 -2.72177 154.175 8.04347L217.312 132.85L280.536 260.819C285.355 270.575 278.257 282 267.375 282H14.7509C3.83891 282 -3.25826 270.517 1.62175 260.757L127.947 8.10503Z'
          fill={color}
        />
      </svg>
    </Box>
  )
}

type TTypeDotLine = 'vertical' | 'horizontal'
export const DotLine = ({ type = 'vertical', sxBox }: { type?: TTypeDotLine; sxBox?: SxProps }) => {
  const { palette } = useTheme()
  const isVertical = Boolean(type === 'vertical')
  const commonStyles = {
    content: '""',
    position: 'absolute',
    width: '5px',
    height: '5px',
    borderRadius: '100%',
    background: isVertical ? palette.home.gray50 : palette.home.gray100
  }
  const horizontalStyles = {
    '&:before': { ...commonStyles, top: '-2px', left: '0' },
    '&:after': { ...commonStyles, top: '-2px', right: '0' }
  } as Record<string, CSSProperties>
  const verticalStyles = {
    '&:before': { ...commonStyles, left: '-2px', top: '-1px' },
    '&:after': { ...commonStyles, left: '-2px', bottom: '-1px' }
  } as Record<string, CSSProperties>

  return (
    <Box
      mt='10px'
      position='relative'
      width={isVertical ? '1px' : '100%'}
      height={isVertical ? '44px' : '1px'}
      bgcolor={isVertical ? palette.home.gray50 : palette.home.gray100}
      sx={{
        ...(isVertical ? verticalStyles : horizontalStyles),
        ...sxBox
      }}
    />
  )
}
