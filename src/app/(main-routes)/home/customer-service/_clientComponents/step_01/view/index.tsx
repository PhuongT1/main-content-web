import Box from '@mui/material/Box'
import React, { useEffect } from 'react'
import InputItem from '@/form/input'
import { Grid, Stack, useTheme } from '@mui/material'
import styles from './view.module.scss'
import { ButtonItem, EditButton } from '@/components/home/button'
import { useFormContext } from 'react-hook-form'
import { STEP } from '@/constants/common.constant'
import { VirtualTargetCustomer } from '@/types/customer-service.type'
import InfoVirtualTargetCustomer from './info-person-item'
import { useClickButtonEdit, useCustomerData } from '../../use-customer'
import { VIRTUAL_TARGET_CUSTOMER } from '@/constants/customer-service.constant'
import CardItem from '@/components/home/card-item'
import SectionTitle from '@/components/home/section-title'
import { remConvert } from '@/utils/convert-to-rem'
import Divider from '@/elements/divider'
import { Typography } from '@/elements'

const Step1View = () => {
  const {
    palette: { home }
  } = useTheme()

  const { control, reset } = useFormContext<VirtualTargetCustomer>()

  const { data } = useCustomerData<VirtualTargetCustomer>(STEP.STEP_ONE, VIRTUAL_TARGET_CUSTOMER, false)
  const { handleBtnEdit } = useClickButtonEdit(STEP.STEP_ONE)

  useEffect(() => {
    data && reset(data.data)
  }, [data])

  return (
    <Box component={'form'}>
      <Divider customStyle={{ backgroundColor: home.gray200, marginTop: remConvert('50px') }} />
      <SectionTitle title='사업 아이디어' />
      <Grid container gap={'20px'}>
        <Grid item flex={'200px 0 0'}>
          <InputItem
            showErrorMessage
            maxLength={20}
            control={control}
            label='브랜드명'
            name={'brandName'}
            textFieldProps={{
              placeholder: '브랜드명 입력',
              InputProps: {
                readOnly: true
              }
            }}
          />
        </Grid>
        <Grid item flex={'1 0 0'}>
          <InputItem
            showErrorMessage
            maxLength={50}
            control={control}
            label='아이디어'
            name={'idea'}
            textFieldProps={{
              placeholder: '사회적 문제 해결을 위한 직장인 대상 해양 액티비티 선택 플랫폼',
              InputProps: {
                readOnly: true
              }
            }}
          />
        </Grid>
      </Grid>
      <SectionTitle title='가상의 타깃고객 프로필' />
      <InfoVirtualTargetCustomer item={data?.data.customer} index={0} markTitle={''} />
      <SectionTitle title='가상의 타깃고객 소개글' />
      <Box component={'div'} sx={{ backgroundColor: home.gray300 }} className={styles.business_idea}>
        <Grid item xs={16}>
          <CardItem
            cardItem={{
              title: (
                <Typography
                  cate='button_40'
                  sx={{
                    fontSize: remConvert('20px'),
                    color: home.gray50
                  }}
                >
                  “ {data?.data.introductionCustomer.title?.kr} “
                </Typography>
              ),
              subTitle: (
                <Typography
                  cate='button_30'
                  sx={{
                    lineHeight: '150%',
                    color: home.gray50
                  }}
                >
                  {data?.data.introductionCustomer.content?.kr}
                </Typography>
              )
            }}
            icon='checked'
            sxCard={{
              backgroundColor: home.gray200
            }}
          />
        </Grid>
      </Box>
      <Stack flexDirection={'row'} className={styles.btn_edit}>
        <Box component={'a'} onClick={() => {}}></Box>
        <ButtonItem
          onClick={() => {
            console.log('Phuong oi phuong')
          }}
        >
          gfhgjghj
        </ButtonItem>
      </Stack>
    </Box>
  )
}
export default Step1View
