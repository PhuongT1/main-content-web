import { Stack, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import React from 'react'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import { useFormContext } from 'react-hook-form'
import { CustomerProfile } from '@/types/customer-service.type'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import SectionTitle from '@/components/home/section-title'
import { useCustomerPostData } from '../../hooks/use-shareholder-list'
import { STEP } from '@/constants/common.constant'
import { ModalReset } from '@/components/dialog/modal-deck'
import useToggle from '@/hooks/use-toggle'
import { DEFAULT_CUSTOMER_PROFILE } from '@/constants/customer-service.constant'

const Step2Edit = () => {
  const {
    palette: { home }
  } = useTheme()

  const {
    formState: { isValid },
    reset,
    handleSubmit
  } = useFormContext<CustomerProfile>()

  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const { mutation } = useCustomerPostData<CustomerProfile>(STEP.STEP_TWO)

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
      <SectionTitle
        title={
          <Box component={'div'} display={'flex'} gap={remConvert('10px')}>
            라이프스타일
            <Box component={'span'} color={home.mint500} fontWeight={600} fontSize={remConvert('16px')}>
              (최대 3개 선택)
            </Box>
          </Box>
        }
        subtitle='타깃고객의 라이프스타일을 구체화하고 그들의 삶의 방식 및 가치관을 이해하기 위해 라이프스타일을 선택해보세요.'
      />
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

export default Step2Edit
