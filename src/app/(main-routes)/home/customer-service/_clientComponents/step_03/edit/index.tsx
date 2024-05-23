import { Stack, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import React from 'react'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import { useFormContext } from 'react-hook-form'
import { CustomerProfile } from '@/types/customer-service.type'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import SectionTitle from '@/components/home/section-title'
import { useCustomerPostData } from '../../use-customer'
import { STEP } from '@/constants/common.constant'
import { ModalReset } from '@/components/dialog/modal-deck'
import useToggle from '@/hooks/use-toggle'
import { DEFAULT_CUSTOMER_PROFILE } from '@/constants/customer-service.constant'
import CardLifestyle from '../../_components/card-lifestyle'
import CardSlider from './card-slider'
import TabBrand from './tabs'
import PaymentMethod from '../../_components/payment-method'

const Step3Edit = () => {
  const {
    palette: { home }
  } = useTheme()

  const {
    formState: { isValid },
    reset,
    handleSubmit
  } = useFormContext<CustomerProfile>()

  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const { mutation } = useCustomerPostData<CustomerProfile>(STEP.STEP_THREE)

  const handleCompleteStep = (data: CustomerProfile) => mutation(data)

  const preventEnterKeySubmission = (e: React.KeyboardEvent<HTMLFormElement>) => {
    const { target, key } = e
    if (key === 'Enter' && target instanceof HTMLInputElement) {
      e.preventDefault()
    }
  }

  const handleResetForm = () => {
    setToggleShowDialog(false)
    reset(DEFAULT_CUSTOMER_PROFILE)
  }

  return (
    <Box
      component={'form'}
      sx={{ marginTop: convertToRem(52) }}
      onKeyDown={preventEnterKeySubmission}
      onSubmit={handleSubmit(handleCompleteStep)}
    >
      <SectionTitle title='구매동기' subtitle='타깃고객이 구매 결정에 미치는 영향력 정도를 평가해 보세요.' />
      <CardSlider />
      <SectionTitle title='구매방식' subtitle='타깃고객이 구매 결정에 미치는 영향력 정도를 평가해 보세요.' />
      <CardLifestyle type='PURCHASER_METHOD' />
      <SectionTitle
        title={
          <Box component={'div'} display={'flex'} gap={remConvert('10px')}>
            선호브랜드
            <Box component={'span'} color={home.mint500} fontSize={remConvert('16px')} fontWeight={600}>
              (최대 5개 선택)
            </Box>
          </Box>
        }
        subtitle='타깃고객이 구매 결정에 미치는 영향력 정도를 평가해 보세요.'
      />
      <TabBrand />
      <PaymentMethod
        sectionTitle={
          <SectionTitle
            title='결제방식'
            subtitle='타깃 고객이 제품 또는 서비스를 구매할 때 선호하는 결제 방식을 선택해 보세요.'
          />
        }
      />
      <SectionTitle
        title='채널 영향력'
        subtitle='타깃 고객이 제품 또는 서비스 정보를 얻거나 구매 결정에 영향을 받는 주요 채널을 선택해 보세요.'
      />
      <CardSlider name='channelInfluence' />
      <ModalReset open={showDialog} onCancel={toggleShowDialog} onSubmit={handleResetForm} />
      <Stack
        flexDirection={'row'}
        direction={'row'}
        justifyContent={'center'}
        mt={remConvert('60px')}
        gap={remConvert('20px')}
      >
        <RefreshButton onClick={() => setToggleShowDialog(true)} />
        <SubmitButton type='submit' disabled={!isValid} />
      </Stack>
    </Box>
  )
}

export default Step3Edit
