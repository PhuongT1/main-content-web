import { Typography } from '@/elements'
import { KeyStrengthType, TTypesSA } from '@/types/strength-analysis.type'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, Stack, SxProps, Theme, useTheme } from '@mui/material'
import React from 'react'
import DotList from '../dot'
import { STRENGTH_TYPE } from '@/constants/strength-analysis.constant'

type Props = {
  item: TTypesSA
  color?: string
  isActive?: boolean
  sxBox?: SxProps<Theme>
}

const ChipSA = ({ item, color, isActive, sxBox }: Props) => {
  const {
    palette: { home }
  } = useTheme()

  const currentColor = isActive ? home.gray50 : color || home.gray100
  return (
    <Box
      sx={{
        padding: remConvert('8px 14px'),
        border: isActive ? `1px solid ${home.purple}` : 'none',
        backgroundColor: isActive ? home.alpha_purple_10 : home.gray400,
        borderRadius: remConvert('10px'),
        ...sxBox
      }}
      key={item.strengthType}
    >
      <Box component={'div'} display={'flex'} flexDirection={'column'} gap={remConvert('4px')}>
        <DotList number={Number(item.star)} color={currentColor} />
        <Typography cate='sub_title_30' color={currentColor}>
          {item.strengthType}
        </Typography>
      </Box>
    </Box>
  )
}

export default ChipSA

export const LabelKeyword = (item: TTypesSA, type: KeyStrengthType) => {
  const {
    palette: { home }
  } = useTheme()

  const isStrengthType = type === STRENGTH_TYPE.strength

  if (!item) return <></>
  return (
    <Stack direction={'row'} spacing={remConvert('5px')}>
      {item.keyword.split(',').map((kw) => (
        <Box
          key={kw}
          sx={{
            display: 'inline-block',
            padding: remConvert('0 5px'),
            backgroundColor: isStrengthType ? home.purple : home.gray300,
            borderRadius: remConvert('5px'),
            color: isStrengthType ? home.gray400 : home.gray50,
            fontWeight: 400,
            fontSize: remConvert('14px'),
            lineHeight: '150%'
          }}
          component={'div'}
        >
          {kw}
        </Box>
      ))}
    </Stack>
  )
}
