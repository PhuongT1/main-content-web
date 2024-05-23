import { LayoutTwoIR } from '@/components/home/layout-IR'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, Grid, useTheme } from '@mui/material'
import { iRPalette } from '@/atoms/home/stepper'
import { useRecoilValue } from 'recoil'
import {
  CustomerProfile,
  CustomerPurchasing,
  LiftStyle,
  Purchasing,
  VirtualTargetCustomer
} from '@/types/customer-service.type'
import React from 'react'
import PointItem from '../../component/point-item'
import PersonItem from '../../component/person-item'
import ButtonItemList from '../../component/button-item-list'
import ProcessBartem from '../../component/progress-bar-item'
import LayoutBox from '../../component/layout-box'
import ChannelItem from '../../component/channel-item'
import BrandItemList from '../../component/brand-item-list'
import { STEP } from '@/constants/common.constant'
import { StepActivity } from '@/types/deck.type'
import { useParams } from 'next/navigation'
import { Typography } from '@/elements'
import { CustomerLayoutProps } from '../..'

const PageOneCustomerService = ({ data }: CustomerLayoutProps) => {
  const {
    palette: { home }
  } = useTheme()

  const params = useParams()
  console.log({ params })

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
          backgroundColor: 'red'
        }}
      >
        <Box sx={{ display: 'flex', flex: '1 0 0' }}>
          <Box
            component={'div'}
            sx={{
              width: remConvert('218px'),
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Box
              component={'div'}
              sx={{
                width: '100%',
                height: remConvert('290px'),
                background: `url(${
                  (data && (data[STEP.STEP_ONE] as StepActivity<VirtualTargetCustomer>))?.data.customer.path
                }) center/cover no-repeat`
              }}
            ></Box>

            <PersonItem layoutOne isHiddenImage sxBox={{ flex: '1 0 0', borderRadius: 0 }} />
          </Box>
          <Box component={'div'} sx={{ flex: '1 0 0', padding: remConvert('40px') }}>
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
            <Typography
              cate='title_60'
              sx={{ fontWeight: 700, color: home.ir_black, marginBottom: remConvert('80px') }}
            >
              SWOT 분석을 통해 효과적인 기업 경영전략을 수립해보세요.
            </Typography>
            <Grid container spacing={remConvert('8px')}>
              <Grid item xs={6}>
                <Grid container spacing={remConvert('8px')}>
                  <Grid item xs={12}>
                    <PointItem
                      sxTitle={{ borderRadius: remConvert('99px'), width: 'auto' }}
                      sxLayer={{ flexDirection: 'column' }}
                      data={data && (data[STEP.STEP_TWO] as StepActivity<CustomerProfile>)?.data.achievementGoalList}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <PointItem
                      sxTitle={{ display: 'inline-block', borderRadius: remConvert('99px'), width: 'auto' }}
                      title='Pain point'
                      data={data && (data[STEP.STEP_TWO] as StepActivity<CustomerProfile>)?.data.painPointList}
                      backgroundColor={home.ir_other_red_500}
                      sxLayer={{ flexDirection: 'column' }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={remConvert('8px')}>
                  <Grid item xs={12}>
                    <LayoutBox title='구매 동기'>
                      <ProcessBartem
                        data={data && (data[STEP.STEP_THREE] as StepActivity<CustomerPurchasing>)?.data.purchaseMethod}
                      />
                    </LayoutBox>
                  </Grid>
                  <Grid item xs={12}>
                    <ButtonItemList<Purchasing>
                      title='구매 방식'
                      data={data && (data[STEP.STEP_THREE] as StepActivity<CustomerPurchasing>).data.purchaseMethod}
                      keyTitle='title'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <BrandItemList
                      data={data && (data[STEP.STEP_THREE] as StepActivity<CustomerPurchasing>).data.selectedItem}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ButtonItemList<LiftStyle>
                      title='결제 방식'
                      backgroundColor={home.ir_neutral_alpha6}
                      data={data && (data[STEP.STEP_THREE] as StepActivity<CustomerPurchasing>).data.paymentMethod}
                      keyTitle={'name'}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <LayoutBox title='채널 영향력'>
                      <ChannelItem
                        data={data && (data[STEP.STEP_THREE] as StepActivity<CustomerPurchasing>).data.channelInfluence}
                      />
                    </LayoutBox>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </LayoutTwoIR>
  )
}

export default PageOneCustomerService
