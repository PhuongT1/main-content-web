import { iRPalette } from '@/atoms/home/stepper'
import { Typography } from '@/elements'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, Grid, SxProps, Theme, useTheme } from '@mui/material'
import { useRecoilValue } from 'recoil'
import LayoutBox from './layout-box'
import { DataCustomerIR, Goal } from '@/types/customer-service.type'
import React from 'react'

export type PointItemProps = {
  backgroundColor?: string
  title?: React.ReactNode
  sxTitle?: SxProps<Theme>
  sxLayer?: SxProps<Theme>
} & DataCustomerIR<Goal[]>

const PointItem = ({ backgroundColor, data, title, sxTitle, sxLayer }: PointItemProps) => {
  const { primaryColor } = useRecoilValue(iRPalette)
  const {
    palette: { home }
  } = useTheme()

  return (
    <LayoutBox title={title ?? 'Goals'}>
      <Grid container rowSpacing={remConvert('6px')}>
        {data?.map((item, index) => (
          <Grid key={index} item xs={12}>
            <Box
              component={'div'}
              sx={{ display: 'flex', gap: remConvert('6px'), alignItems: 'flex-start', ...sxLayer }}
            >
              <Typography
                cate='title_3_bold'
                sx={{
                  width: remConvert('76px'),
                  backgroundColor: backgroundColor ?? primaryColor,
                  borderRadius: remConvert('2px'),
                  padding: remConvert('4px 6px'),
                  fontSize: remConvert('12px'),
                  textAlign: 'center',
                  ...sxTitle
                }}
              >
                {item.selectCategory}
              </Typography>
              <Typography
                cate='body_3'
                sx={{ flex: '1 0 0', fontSize: remConvert('12px'), color: home.ir_neutral_500 }}
              >
                {item.inputGoal}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </LayoutBox>
  )
}

export default PointItem
