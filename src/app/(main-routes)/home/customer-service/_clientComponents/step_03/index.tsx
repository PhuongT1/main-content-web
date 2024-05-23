import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import React from 'react'
import { completeStepSelector } from '@/atoms/home/stepper'
import { useRecoilValue } from 'recoil'
import { yupResolver } from '@hookform/resolvers/yup'
import { STEP } from '@/constants/common.constant'
import { CustomerPurchasing } from '@/types/customer-service.type'
import { DEFAULT_CUSTOMER_PROFILE, errorMax3Message } from '@/constants/customer-service.constant'
import Step3View from './view'
import Step3Edit from './edit'

const Step3Customer = () => {
  const completeStep = useRecoilValue(completeStepSelector)
  const errorMax = errorMax3Message(5)
  const errorMaxNumber_1 = errorMax3Message(1)

  const schema = yup.object({
    selectedItem: yup.array().required(errorMax).min(1, errorMax).max(5, errorMax),
    selectList: yup.array().required(errorMax).min(1, errorMax).max(3, errorMax),
    paymentMethod: yup.array().required(errorMaxNumber_1).min(1, errorMaxNumber_1)
  })
  const form = useForm<any>({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    mode: 'onBlur',
    defaultValues: DEFAULT_CUSTOMER_PROFILE
  })

  return (
    <FormProvider {...form}>{!completeStep.includes(STEP.STEP_THREE) ? <Step3Edit /> : <Step3View />}</FormProvider>
  )
}
export default Step3Customer
