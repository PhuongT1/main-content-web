import { Stack } from '@mui/material'
import Box from '@mui/material/Box'
import React, { useEffect } from 'react'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import { useFormContext } from 'react-hook-form'
import { PurchaseDesign } from '@/types/customer-service.type'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import { useCustomerData, useCustomerPostData } from '../../use-customer'
import { STEP } from '@/constants/common.constant'
import { ModalReset } from '@/components/dialog/modal-deck'
import useToggle from '@/hooks/use-toggle'
import AnalyzeSolve from './analyze-solve'
import TablePurchase from '../../_components/table-purchase'
import { TipJourneyMap } from './tip-journey-map'
import ReachStrategy from '../../_components/reach-strategy'
import { VIRTUAL_TARGET_CUSTOMER, defaultValuesDesign } from '@/constants/customer-service.constant'

const Step4Edit = () => {
  const {
    formState: { isValid },
    handleSubmit,
    reset
  } = useFormContext<PurchaseDesign>()

  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const { mutation } = useCustomerPostData<PurchaseDesign>(STEP.STEP_FOUR)
  const { data } = useCustomerData<PurchaseDesign>(STEP.STEP_FOUR, VIRTUAL_TARGET_CUSTOMER, false)

  useEffect(() => {
    if (data) {
      if (Object.keys(data?.data || {}).length > 0) reset(data.data)
      else reset(defaultValuesDesign)
    }
  }, [data])

  const handleCompleteStep = (data: PurchaseDesign) => mutation(data)

  const preventEnterKeySubmission = (e: React.KeyboardEvent<HTMLFormElement>) => {
    const { target, key } = e
    if (key === 'Enter' && target instanceof HTMLInputElement) {
      e.preventDefault()
    }
  }

  const handleResetForm = () => {
    reset(defaultValuesDesign)
    setToggleShowDialog(false)
  }

  return (
    <Box
      component={'form'}
      sx={{ marginTop: convertToRem(52) }}
      onKeyDown={preventEnterKeySubmission}
      onSubmit={handleSubmit(handleCompleteStep)}
    >
      <AnalyzeSolve />
      <TablePurchase />
      <TipJourneyMap />
      <ReachStrategy />
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

export default Step4Edit
