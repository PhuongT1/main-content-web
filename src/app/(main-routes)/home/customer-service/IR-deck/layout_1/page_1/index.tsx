import { LayoutOneIR } from '@/components/home/layout-IR'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, Grid, useTheme } from '@mui/material'
import { Typography } from '@/elements'
import { getColorAlpha } from '@/utils/styles'
import { iRPalette } from '@/atoms/home/stepper'
import { useRecoilValue } from 'recoil'
import { CustomerProfile, CustomerPurchasing, LiftStyle, Purchasing } from '@/types/customer-service.type'
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
import { CustomerLayoutProps } from '../..'

const PageOneCustomerService = ({ data }: CustomerLayoutProps) => {
  const {
    palette: { home }
  } = useTheme()

  const { primaryColor } = useRecoilValue(iRPalette)

  return (
    <LayoutOneIR
      sxContainer={{
        display: 'flex',
        flexDirection: 'column',
        background: home.ir_white
      }}
      sxChildren={{
        display: 'flex',
        justifyContent: 'flex-end',
        paddingTop: remConvert('30px')
      }}
      header={{
        leftItem: {
          title: 'PERSONA',
          subTitle: '고객 페르소나'
        },
        centerItem: {
          title: '고객 페르소나',
          subTitle: '가상의 타깃고객을 설정하여 사용자 경험 과정을 분석해보세요.'
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
          backgroundColor: 'red'
        }}
      >
        <Box sx={{ display: 'flex', flex: '1 0 0', gap: remConvert('8px'), alignItems: 'center' }}>
          <Box
            component={'div'}
            sx={{
              width: remConvert('200px')
            }}
          >
            <Typography
              cate='text_12_bold'
              sx={{
                color: home.ir_white,
                backgroundColor: getColorAlpha(primaryColor, home.ir_alpha80),
                padding: remConvert('2px 4px'),
                borderRadius: remConvert('2px 2px 0px 0px'),
                fontSize: remConvert('8px'),
                marginLeft: remConvert('12px'),
                display: 'inline-block'
              }}
            >
              고객 페르소나
            </Typography>
            <PersonItem layoutOne />
          </Box>
          <Box component={'div'} sx={{ flex: '1 0 0' }}>
            <Grid container spacing={remConvert('8px')}>
              <Grid item xs={6}>
                <Grid container spacing={remConvert('8px')}>
                  <Grid item xs={12}>
                    <PointItem
                      data={data && (data[STEP.STEP_TWO] as StepActivity<CustomerProfile>)?.data.achievementGoalList}
                    />
                  </Grid>
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
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={remConvert('8px')}>
                  <Grid item xs={12}>
                    <PointItem
                      sxTitle={{ width: remConvert('130px') }}
                      title='Pain point'
                      data={data && (data[STEP.STEP_TWO] as StepActivity<CustomerProfile>)?.data.painPointList}
                      backgroundColor={home.ir_other_red_500}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <LayoutBox title='채널 영향력'>
                      <ChannelItem
                        data={data && (data[STEP.STEP_THREE] as StepActivity<CustomerPurchasing>).data.channelInfluence}
                      />
                    </LayoutBox>
                  </Grid>
                  <Grid item xs={12}>
                    <ButtonItemList<LiftStyle>
                      title='결제 방식'
                      backgroundColor={home.ir_neutral_alpha6}
                      data={data && (data[STEP.STEP_THREE] as StepActivity<CustomerPurchasing>).data.paymentMethod}
                      keyTitle={'name'}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </LayoutOneIR>
  )
}
export default PageOneCustomerService
