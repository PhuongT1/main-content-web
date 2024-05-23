import Box from '@mui/material/Box'
import React, { useEffect } from 'react'
import { Stack, useTheme } from '@mui/material'
import { EditButton } from '@/components/home/button'
import { useFormContext } from 'react-hook-form'
import { STEP } from '@/constants/common.constant'
import { remConvert } from '@/utils/convert-to-rem'
import { CustomerProfile } from '@/types/customer-service.type'
import { useClickButtonEdit, useCustomerData } from '../../hooks/use-shareholder-list'
import { CUSTOMER_PROFILE_CUSTOMER } from '@/constants/customer-service.constant'
import SectionTitle from '@/components/home/section-title'
import Divider from '@/elements/divider'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import useToggle from '@/hooks/use-toggle'
import { useRecoilValue } from 'recoil'
import { completeStepSelector } from '@/atoms/home/stepper'

const Step2View = () => {
  const {
    palette: { home }
  } = useTheme()

  const { reset } = useFormContext<CustomerProfile>()
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const { data } = useCustomerData<CustomerProfile>(STEP.STEP_TWO, CUSTOMER_PROFILE_CUSTOMER, false)
  const { handleBtnEdit } = useClickButtonEdit(STEP.STEP_TWO)
  const completeStep = useRecoilValue(completeStepSelector)

  useEffect(() => {
    data && reset(data.data)
  }, [data])

  const handleClickEdit = () => {
    if (completeStep.includes(STEP.STEP_FOUR)) {
      return setToggleShowDialog(true)
    }
    handleBtnEdit()
  }

  return (
    <Box component={'form'}>
      <Divider customStyle={{ backgroundColor: home.gray200, marginTop: remConvert('50px') }} />
      <SectionTitle title='라이프스타일' />
      <Stack flexDirection={'row'} justifyContent={'center'} margin={remConvert('60px 0 40px')}>
        <EditButton onClick={handleClickEdit} />
      </Stack>
      <DeleteDeck open={showDialog} onCancel={toggleShowDialog} onSubmit={handleBtnEdit} />
    </Box>
  )
}
export default Step2View
