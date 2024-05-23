import Box from '@mui/material/Box'
import React, { useEffect } from 'react'
import { Stack, useTheme } from '@mui/material'
import { EditButton } from '@/components/home/button'
import { useFormContext } from 'react-hook-form'
import { STEP } from '@/constants/common.constant'
import { PurchaseDesign, VirtualTargetCustomer } from '@/types/customer-service.type'
import { useClickButtonEdit, useCustomerData } from '../../use-customer'
import { VIRTUAL_TARGET_CUSTOMER } from '@/constants/customer-service.constant'
import { remConvert } from '@/utils/convert-to-rem'
import Divider from '@/elements/divider'
import SelectAnalyzeSolve from './select-analyze-solve'
import TablePurchase from '../../_components/table-purchase'
import ReachStrategy from '../../_components/reach-strategy'

const Step4View = () => {
  const {
    palette: { home }
  } = useTheme()

  const { reset } = useFormContext<PurchaseDesign>()
  const { data } = useCustomerData<PurchaseDesign>(STEP.STEP_FOUR, VIRTUAL_TARGET_CUSTOMER, false)

  const { handleBtnEdit } = useClickButtonEdit(STEP.STEP_FOUR)

  useEffect(() => {
    data && reset(data.data)
  }, [data])

  return (
    <Box component={'form'}>
      <Divider customStyle={{ backgroundColor: home.gray200, marginTop: remConvert('50px') }} />
      <SelectAnalyzeSolve />
      <TablePurchase isView />
      <ReachStrategy isView />
      <Stack flexDirection={'row'} justifyContent={'center'} mt={remConvert('60px')}>
        <EditButton onClick={handleBtnEdit} />
      </Stack>
    </Box>
  )
}

export default Step4View
