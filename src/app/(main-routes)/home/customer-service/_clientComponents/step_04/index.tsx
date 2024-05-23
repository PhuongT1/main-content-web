import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import React from 'react'
import { completeStepSelector } from '@/atoms/home/stepper'
import { useRecoilValue } from 'recoil'
import { yupResolver } from '@hookform/resolvers/yup'
import { STEP } from '@/constants/common.constant'
import { PurchaseDesign } from '@/types/customer-service.type'
import Step4Edit from './edit'
import { defaultValuesDesign } from '@/constants/customer-service.constant'
import Step4View from './view'

const Step4Customer = () => {
  const completeStep = useRecoilValue(completeStepSelector)

  const schema = yup.object({
    solve: yup
      .object({
        selectCategory: yup.string().required(' '),
        inputGoal: yup.string().required(' ')
      })
      .required(' '),
    purchaseCustomer: yup
      .array(
        yup.object({
          title: yup.string().required(' '),
          motivation: yup.string().required(' '),
          quest: yup.string().required(' '),
          experience: yup.string().required(' '),
          attainment: yup.string().required(' '),
          feedback: yup.string().required(' ')
        })
      )
      .required(''),
    reachStrategy: yup.string().required(' ')
  })

  const form = useForm<any>({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    mode: 'onBlur',
    defaultValues: defaultValuesDesign
  })

  return <FormProvider {...form}>{!completeStep.includes(STEP.STEP_FOUR) ? <Step4Edit /> : <Step4View />}</FormProvider>
}
export default Step4Customer
