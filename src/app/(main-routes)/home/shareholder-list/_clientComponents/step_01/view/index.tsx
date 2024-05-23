import Box from '@mui/material/Box'
import React, { useEffect } from 'react'
import { Stack, useTheme } from '@mui/material'
import styles from './view.module.scss'
import { EditButton } from '@/components/home/button'
import { useFormContext } from 'react-hook-form'
import { STEP } from '@/constants/common.constant'
import { VirtualTargetCustomer } from '@/types/customer-service.type'
import { useClickButtonEdit, useCustomerData } from '../../hooks/use-shareholder-list'
import { VIRTUAL_TARGET_CUSTOMER } from '@/constants/customer-service.constant'
import SectionTitle from '@/components/home/section-title'
import { remConvert } from '@/utils/convert-to-rem'
import Divider from '@/elements/divider'
import { BasicInformation } from '@/types/shareholder-list.type'

const Step1View = () => {
  const {
    palette: { home }
  } = useTheme()

  const { reset } = useFormContext<BasicInformation>()

  const { data } = useCustomerData<BasicInformation>(STEP.STEP_ONE, VIRTUAL_TARGET_CUSTOMER, false)
  const { handleBtnEdit } = useClickButtonEdit(STEP.STEP_ONE)

  useEffect(() => {
    data && reset(data.data)
  }, [data])

  return (
    <Box component={'form'}>
      <Divider customStyle={{ backgroundColor: home.gray200, marginTop: remConvert('50px') }} />
      <SectionTitle title='사업 아이디어' />
      <Stack flexDirection={'row'} className={styles.btn_edit}>
        <EditButton onClick={handleBtnEdit} />
      </Stack>
    </Box>
  )
}
export default Step1View
