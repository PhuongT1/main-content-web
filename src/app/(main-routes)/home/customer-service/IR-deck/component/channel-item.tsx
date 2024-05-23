import { Typography } from '@/elements'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, Grid, useTheme } from '@mui/material'
import React from 'react'
import { DataCustomerIR, Purchasing } from '@/types/customer-service.type'
import { iRPalette } from '@/atoms/home/stepper'
import { useRecoilValue } from 'recoil'

export type ColumnGrid = {
  label: string
  labelFullWidth?: boolean
  content?: string
  column?: number
  isTitlePersion?: boolean
}

export type PersonItemProps = {
  layoutOne?: boolean
}

const ChannelItem = ({ data }: DataCustomerIR<Purchasing[]>) => {
  const {
    palette: { home }
  } = useTheme()
  const { primaryColor } = useRecoilValue(iRPalette)

  return (
    <Grid
      container
      display='flex'
      spacing={remConvert('10px')}
      rowGap={remConvert('6px')}
      alignItems='stretch'
      flexWrap={'wrap'}
    >
      {data?.map((item, index) => (
        <Grid key={index} item alignItems='stretch' sm={6}>
          <Box component={'div'} sx={{ display: 'flex', gap: remConvert('4px'), alignItems: 'center' }}>
            <Typography
              cate='body_2_bold'
              sx={{ fontSize: remConvert('12px'), color: home.ir_neutral_500, width: remConvert('70px') }}
            >
              {item.title}
            </Typography>
            <Box component={'p'} sx={{ display: 'flex', flex: '1 0 0', justifyContent: 'space-between' }}>
              {Array.from({ length: 10 }, (_, index) => (
                <Box
                  key={index}
                  component={'span'}
                  sx={{
                    width: remConvert('6px'),
                    height: remConvert('6px'),
                    borderRadius: '50%',
                    backgroundColor: index < Number(item.point) * 2 ? primaryColor : home.ir_neutral_alpha20,
                    display: 'inline'
                  }}
                ></Box>
              ))}
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}

export default ChannelItem
