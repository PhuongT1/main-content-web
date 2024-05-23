import { iRPalette } from '@/atoms/home/stepper'
import { Typography } from '@/elements'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, useTheme } from '@mui/material'
import { useRecoilValue } from 'recoil'
import LayoutBox from './layout-box'
import { getColorAlpha } from '@/utils/styles'
import { DataCustomerIR, Purchasing } from '@/types/customer-service.type'
import React from 'react'

export type PointItemProps<T = Purchasing> = {
  backgroundColor?: string
  title?: React.ReactNode
  keyTitle?: keyof T
} & DataCustomerIR<T[]>

const ButtonItemList = <T,>({ backgroundColor, data, title, keyTitle }: PointItemProps<T>) => {
  const { primaryColor } = useRecoilValue(iRPalette)
  const {
    palette: { home }
  } = useTheme()

  return (
    <LayoutBox title={title ?? 'Goals'} sx={{ display: 'flex', gap: remConvert('12px') }}>
      <Box
        component={'div'}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: remConvert('6px')
        }}
      >
        {data?.map((item, index) => (
          <Typography
            key={index}
            cate='body_10'
            sx={{
              fontWeight: '150%',
              color: home.ir_black,
              backgroundColor: backgroundColor ?? getColorAlpha(primaryColor, home.ir_alpha20),
              padding: remConvert('4px 8px'),
              borderRadius: remConvert('100px')
            }}
          >
            {item && keyTitle && (item[keyTitle] as React.ReactNode)}
          </Typography>
        ))}
      </Box>
    </LayoutBox>
  )
}
export default ButtonItemList
