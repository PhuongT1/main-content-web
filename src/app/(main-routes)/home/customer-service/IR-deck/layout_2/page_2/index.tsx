import { LayoutTwoIR } from '@/components/home/layout-IR'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, useTheme } from '@mui/material'
import { Typography } from '@/elements'
import { iRPalette } from '@/atoms/home/stepper'
import { useRecoilValue } from 'recoil'
import { PurchaseDesign, VirtualTargetCustomer } from '@/types/customer-service.type'
import React from 'react'
import TablePurchase from '../../component/table-purchase'
import { CustomerLayoutProps } from '../..'
import { STEP } from '@/constants/common.constant'

const PageTwoCustomerService = ({ data }: CustomerLayoutProps) => {
  const {
    palette: { home }
  } = useTheme()
  const { primaryColor } = useRecoilValue(iRPalette)

  return (
    <LayoutTwoIR
      sxContainer={{
        display: 'flex',
        background: home.ir_white
      }}
      sxChildren={{
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: 'red'
      }}
    >
      <Box
        component={'div'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          flex: '1 0 0',
          backgroundColor: 'red',
          padding: remConvert('40px')
        }}
      >
        <Box>
          <Typography
            cate='body_2_semibold'
            sx={{
              letterSpacing: '-0.9px',
              marginBottom: remConvert('6px'),
              color: primaryColor
            }}
          >
            SWOT
          </Typography>
          <Typography cate='title_60' sx={{ fontWeight: 700, color: home.ir_black, marginBottom: remConvert('80px') }}>
            SWOT 분석을 통해 효과적인 기업 경영전략을 수립해보세요.
          </Typography>
          <Box component={'div'} sx={{ flex: '1 0 0' }}>
            <TablePurchase
              chartProps={{
                isLayoutTwo: true,
                sxLabel: {
                  background: home.ir_white,
                  color: home.ir_neutral_500,
                  padding: 0,
                  minHeight: 'auto',
                  marginBottom: remConvert('-10px')
                }
              }}
              data={data && (data[STEP.STEP_FOUR]?.data as PurchaseDesign)}
              dataTargetCustomer={data && (data[STEP.STEP_ONE]?.data as VirtualTargetCustomer)}
              sxTdFirstChild={{
                backgroundColor: 'transparent'
              }}
              widthBoxFirstChild={remConvert('120px')}
              sxTdLastChild={{
                backgroundColor: 'transparent',
                '&:first-child': {
                  backgroundColor: 'transparent',
                  color: primaryColor
                }
              }}
              sxTdDescription={{
                backgroundColor: primaryColor,
                padding: remConvert('24px'),
                minHeight: remConvert('108px'),
                color: home.ir_white,
                fontSize: remConvert('16px'),
                fontWeight: 700,
                lineHeight: '150%',
                borderRadius: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 0
              }}
              sxCell={{
                backgroundColor: home.ir_white
              }}
            />
          </Box>
        </Box>
      </Box>
    </LayoutTwoIR>
  )
}

export default PageTwoCustomerService
