import Box from '@mui/material/Box'
import React, { useEffect } from 'react'
import { Grid, Stack, useTheme } from '@mui/material'
import SectionTitle from '@/components/home/section-title'
import ProgressBarPurchase from './progress-bar-purchase'
import { remConvert } from '@/utils/convert-to-rem'
import RenderLifestyle from '../../_components/render-lifestyle'
import { STEP } from '@/constants/common.constant'
import { CUSTOMER_PROFILE_CUSTOMER } from '@/constants/customer-service.constant'
import { CustomerPurchasing } from '@/types/customer-service.type'
import { useClickButtonEdit, useCustomerData } from '../../use-customer'
import { EditButton } from '@/components/home/button'
import { useFormContext } from 'react-hook-form'
import CardMultiple from '../../_components/card-multiple'
import Divider from '@/elements/divider'

const Step3View = () => {
  const {
    palette: { home }
  } = useTheme()

  const { reset } = useFormContext<CustomerPurchasing>()
  const { data } = useCustomerData<CustomerPurchasing>(STEP.STEP_THREE, CUSTOMER_PROFILE_CUSTOMER, false)
  const { handleBtnEdit } = useClickButtonEdit(STEP.STEP_THREE)

  useEffect(() => {
    data && reset(data.data)
  }, [data])

  return (
    <Box component={'form'}>
      <Divider customStyle={{ backgroundColor: home.gray200, marginTop: remConvert('50px') }} />
      <SectionTitle title='구매동기' />
      <ProgressBarPurchase data={data?.data.purchaseMethod} />
      <SectionTitle title='구매방식' />
      <Grid container display='flex' wrap='wrap' spacing={remConvert('20px')} alignItems='stretch'>
        {data?.data.selectList?.map((item, index) => (
          <RenderLifestyle key={index} item={item} />
        ))}
      </Grid>
      <SectionTitle title='선호브랜드' />
      <CardMultiple
        sxCard={{ backgroundColor: home.gray300 }}
        height={'auto'}
        dataList={data?.data.selectedItem}
        isHiddenIconDelete
      />
      <SectionTitle title='결제방식' />
      <CardMultiple
        sxCard={{ backgroundColor: home.gray300 }}
        height={'auto'}
        dataList={data?.data.paymentMethod}
        isHiddenIconDelete
        isView
        isTitle
      />
      <SectionTitle title='채널 영향력' />
      <ProgressBarPurchase data={data?.data.channelInfluence} />
      <Stack flexDirection={'row'} justifyContent={'center'} margin={remConvert('60px 0 20px')}>
        <EditButton onClick={handleBtnEdit} />
      </Stack>
    </Box>
  )
}
export default Step3View
