import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { completeStepSelector } from '@/atoms/home/stepper'
import { useRecoilValue } from 'recoil'
import { yupResolver } from '@hookform/resolvers/yup'
import { STEP } from '@/constants/common.constant'
import { CustomerProfile } from '@/types/customer-service.type'
import { errorMax3Message } from '@/constants/customer-service.constant'
import Step2View from './view'
import Step2Edit from './edit'

const Step2Customer = () => {
  const completeStep = useRecoilValue(completeStepSelector)
  const errorMax = errorMax3Message(3)
  const schema = yup.object({
    selectList: yup.array().required(errorMax).min(1, errorMax).max(3, errorMax),
    achievementGoalList: yup.array().required(errorMax3Message(5)).min(1, errorMax3Message(5)),
    painPointList: yup.array().required(errorMax3Message(5)).min(1, errorMax3Message(5))
  })

  const form = useForm<CustomerProfile>({
    // resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    mode: 'onBlur'
  })

  return <FormProvider {...form}>{!completeStep.includes(STEP.STEP_TWO) ? <Step2Edit /> : <Step2View />}</FormProvider>
}
export default Step2Customer
