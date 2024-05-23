import { Stack, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import React from 'react'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import { useFormContext } from 'react-hook-form'
import { CustomerProfile } from '@/types/customer-service.type'
import AddAchievementGoal from './add-achievement-goal'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import SectionTitle from '@/components/home/section-title'
import CardLifestyle from '../../_components/card-lifestyle'
import { useCustomerPostData } from '../../use-customer'
import { STEP } from '@/constants/common.constant'
import { dropdownPain } from './customer-profile-data'
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
      <CardLifestyle />
      <AddAchievementGoal
        name='achievementGoalList'
        nameGoal='goal'
        placeholderInput='달성해야하는 목표를 적으세요. (50자 이내)'
        sectionTitle={
          <SectionTitle
            title={
              <Box display={'flex'} gap={remConvert('10px')}>
                달성 목표
                <Box component={'span'} fontSize={remConvert('16px')} color={home.mint500} fontWeight={600}>
                  (최대 5개 입력)
                </Box>
              </Box>
            }
            subtitle={'타깃고객이 무엇을 원하고 필요로 하는지를 이해하기 위해 달성 목표를 정의해보세요.'}
          />
        }
      />
      <AddAchievementGoal
        dropdown={dropdownPain}
        placeholder='페인포인트 카테고리 선택'
        name='painPointList'
        nameGoal='painPointGoal'
        sectionTitle={
          <SectionTitle
            title={
              <Box display={'flex'} gap={remConvert('10px')}>
                Pain point
                <Box component={'span'} fontSize={remConvert('16px')} color={home.mint500} fontWeight={600}>
                  (최대 5개 입력)
                </Box>
              </Box>
            }
            subtitle={'타깃고객이 일상 생활이나 특정한 상황에서 겪고 있는 불편함 또는 문제를 정리해보세요.'}
          />
        }
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
