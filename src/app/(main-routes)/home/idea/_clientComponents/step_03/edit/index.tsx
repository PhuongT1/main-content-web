import SectionTitle from '@/components/home/section-title'
import { Box, useTheme } from '@mui/material'
import React from 'react'
import CardList from '../components/card-list'
import BenefitAI from './benefit-ai'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import { STEP } from '@/constants/common.constant'
import { TWriteIdea } from '@/types/idea.type'
import { useIdeaPostData } from '../../use-idea'
import { useFormContext } from 'react-hook-form'
import useToggle from '@/hooks/use-toggle'
import { ModalReset } from '@/components/dialog/modal-deck'
import { defaultValuesStepWriteIdea } from '..'
import { sendEvent } from '@/utils/events'
import { EVentIdea } from '@/constants/idea.constant'
import RefreshIcon from '@/assets/icons/refresh'
import CheckedboxIcon from '@/assets/icons/checkbox/check'

const Step_03_Edit = () => {
  const {
    handleSubmit,
    reset,
    watch,
    formState: { isValid, isSubmitting }
  } = useFormContext<TWriteIdea>()
  const {
    palette: { home }
  } = useTheme()
  const selectedMode = watch('selectedMethod')
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const { mutation } = useIdeaPostData<TWriteIdea>(STEP.STEP_THREE)

  const handleResetForm = () => {
    setToggleShowDialog(false)
    reset(defaultValuesStepWriteIdea)

    sendEvent(EVentIdea.RESET_STEP_03, {})
  }

  const preventEnterKeySubmission = (e: React.KeyboardEvent<HTMLFormElement>) => {
    const { target, key } = e
    if (key === 'Enter' && target instanceof HTMLInputElement) {
      e.preventDefault()
    }
  }

  const onSubmit = (values: TWriteIdea) => {
    mutation(values)
  }
  return (
    <Box id='find-idea' onKeyDown={preventEnterKeySubmission} onSubmit={handleSubmit(onSubmit)} component={'form'}>
      <CardList />
      <BenefitAI />
      <ModalReset open={showDialog} onCancel={toggleShowDialog} onSubmit={handleResetForm} />
      <Box mt={'60px'} display='flex' justifyContent='center' alignItems='center' gap={2} width='100%'>
        <RefreshButton
          disabled={!selectedMode.type}
          onClick={toggleShowDialog}
          sx={{
            backgroundColor: home.gray300,
            color: home.gray50
          }}
          startIcon={<RefreshIcon pathProps={{ stroke: home.gray50 }} />}
        />
        <SubmitButton
          disabled={!isValid || isSubmitting}
          type='submit'
          sx={{
            backgroundColor: home.blue500,
            color: home.gray500
          }}
          startIcon={<CheckedboxIcon width={20} height={20} stroke={home.gray500} />}
        />
      </Box>
    </Box>
  )
}

export default Step_03_Edit
