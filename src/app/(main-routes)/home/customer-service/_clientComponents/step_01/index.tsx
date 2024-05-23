import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import React from 'react'
import Step_01_Edit from './edit'
import Step_01_View from './view'
import { completeStepSelector } from '@/atoms/home/stepper'
import { useRecoilValue } from 'recoil'
import { yupResolver } from '@hookform/resolvers/yup'
import { STEP } from '@/constants/common.constant'
import { VirtualTargetCustomer } from '@/types/customer-service.type'
import { DEFAULT_TARGET_CUSTOMER } from '@/constants/customer-service.constant'
export const errorMaxMessage = '키워드는 최대 10개까지 등록 가능합니다.'

const Step1Naming = () => {
  const completeStep = useRecoilValue(completeStepSelector)

  const schema = yup.object({
    brandName: yup.string().required(' '),
    idea: yup.string().required(' '),
    customer: yup.object({
      age: yup.string().required(' '),
      path: yup.mixed().required(' '),
      name: yup.string().required(' '),
      gender: yup.string().required(' '),
      region: yup.string().required(' '),
      job: yup.string().required(' '),
      incomeLevel: yup.string().required(' '),
      familySituation: yup.string().required(' '),
      mbti: yup.string().required(' ')
    }),
    introductionCustomer: yup.object().required('')
  })

  const form = useForm<any>({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    mode: 'onBlur',
    defaultValues: DEFAULT_TARGET_CUSTOMER
  })

  return (
    <FormProvider {...form}>{!completeStep.includes(STEP.STEP_ONE) ? <Step_01_Edit /> : <Step_01_View />}</FormProvider>
  )
}
export default Step1Naming
