import { remConvert } from '@/utils/convert-to-rem'
import { Grid, useTheme } from '@mui/material'
import React from 'react'
import { DataCustomerIR, Purchasing } from '@/types/customer-service.type'
import ProgressBarItem from '@/components/home/progress-bar'

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

const ProcessBartem = ({ data }: DataCustomerIR<Purchasing[]>) => {
  const {
    palette: { home }
  } = useTheme()

  return (
    <Grid container display='flex' spacing={remConvert('20px')} alignItems='stretch' flexWrap={'wrap'}>
      {data?.map((item, index) => (
        <Grid key={index} item alignItems='stretch' sm={6}>
          <ProgressBarItem
            sxBox={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              padding: 0,
              alignItems: 'center',
              backgroundColor: 'transparent'
            }}
            sxTitle={{ width: '44px', fontSize: remConvert('12x'), fontWeight: 700, color: home.ir_neutral_500 }}
            title={item.title}
            value={Number(item.point) * 20}
            sx={{
              flex: '1 0 0',
              height: remConvert('3px')
            }}
          />
        </Grid>
      ))}

      {/* })} */}
    </Grid>
  )
}

export default ProcessBartem
