import { LayoutOneIR } from '@/components/home/layout-IR'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, useTheme } from '@mui/material'
import { Typography } from '@/elements'
import { getColorAlpha } from '@/utils/styles'
import { iRPalette } from '@/atoms/home/stepper'
import { useRecoilValue } from 'recoil'
import { DataCustomerIR, PurchaseDesign } from '@/types/customer-service.type'
import React from 'react'
import TablePurchase from '../../component/table-purchase'
import TriangleIconNew from '@/assets/icons/customer/icon_ir/triangle'
import PersonItem from '../../component/person-item'

const PageTwoCustomerService = ({ data }: DataCustomerIR<PurchaseDesign>) => {
  const {
    palette: { home }
  } = useTheme()

  const { primaryColor } = useRecoilValue(iRPalette)

  return (
    <LayoutOneIR
      sxContainer={{
        paddingBottom: remConvert('100px'),
        display: 'flex',
        flexDirection: 'column',
        background: home.ir_white
      }}
      sxChildren={{
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: 'red'
      }}
      header={{
        leftItem: {
          title: 'PERSONA',
          subTitle: '고객 페르소나'
        },
        centerItem: {
          title: '고객 페르소나',
          subTitle: '가상의 타깃고객을 설정하여 사용자 경험 과정을 분석해보세요.',
          sxSubTitle: {
            marginBottom: remConvert('50px')
          }
        }
      }}
    >
      <Box
        component={'div'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          flex: '1 0 0',
          paddingTop: remConvert('30px')
        }}
      >
        <Box sx={{ display: 'flex', flex: '1 0 0', gap: remConvert('8px'), alignItems: 'center' }}>
          <Box
            component={'div'}
            sx={{
              width: remConvert('187px'),
              display: 'flex',
              flexDirection: 'column',
              gap: remConvert('8px'),
              height: 1
            }}
          >
            <Typography
              cate='text_12_bold'
              sx={{
                color: home.ir_white,
                backgroundColor: getColorAlpha(primaryColor, home.ir_alpha80),
                padding: remConvert('10px'),
                borderRadius: remConvert('4px'),
                position: 'relative'
              }}
            >
              직장 분위기가 나와 맞지 않아서 이직을 하고 싶은데 이직하고자 하는 회사의 분위기를 먼저 알 수 없을까?
              <Box
                component={'span'}
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: `translate(-50%, ${remConvert('11px')})`
                }}
              >
                <TriangleIconNew pathProps={{ fill: getColorAlpha(primaryColor, home.ir_alpha80), fillOpacity: 1 }} />
              </Box>
            </Typography>
            <PersonItem />
          </Box>
          <Box component={'div'} sx={{ flex: '1 0 0' }}>
            <TablePurchase data={data} />
          </Box>
        </Box>
      </Box>
    </LayoutOneIR>
  )
}

export default PageTwoCustomerService
