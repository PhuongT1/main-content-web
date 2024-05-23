'use client'
import { Typography } from '@/elements'
import { ColorPalette } from '@/themes/get-design-tokens'
import { BorderStyles, OptionalChildren } from '@/types/types.type'
import { getBorderStyles } from '@/utils/styles'
import { Box, LinearProgress, SxProps } from '@mui/material'

type LinearBarProps = {
  max?: number
  value: number
  lineBg?: ColorPalette
  barBg?: ColorPalette
  showValueTxt?: boolean
  sx?: SxProps
  lineBorderStyle?: BorderStyles
} & OptionalChildren

const LinearBar = ({
  max = 1,
  value = 1,
  lineBg = 'main_grey.gray700',
  barBg,
  sx,
  showValueTxt = true,
  lineBorderStyle = 'rounded-8',
  children
}: LinearBarProps) => {
  const calcValue = (value / max) * 100
  const borderValue = getBorderStyles(lineBorderStyle)
  return (
    <Box position={'relative'}>
      <LinearProgress
        sx={{
          height: 48,
          borderRadius: borderValue,
          bgcolor: lineBg,
          '.MuiLinearProgress-bar': {
            borderRadius: 2,
            bgcolor: barBg
          },
          ...sx
        }}
        variant='determinate'
        value={calcValue}
      />
      {children && (
        <Box position={'absolute'} top={14} left={16}>
          {children}
        </Box>
      )}
      {showValueTxt && (
        <Typography top={12} right={16} position={'absolute'} cate='sub_title_30' plainColor='main_grey.gray100'>
          {value}
        </Typography>
      )}
    </Box>
  )
}

export default LinearBar
