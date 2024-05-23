import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import React from 'react'
import Step_01_Edit from './edit'
import Step_01_View from './view'
import { completeStepSelector } from '@/atoms/home/stepper'
import { useRecoilValue } from 'recoil'
import { yupResolver } from '@hookform/resolvers/yup'
import { STEP } from '@/constants/common.constant'
export const errorMaxMessage = '키워드는 최대 10개까지 등록 가능합니다.'

const Step1ShareholderList = () => {
  const completeStep = useRecoilValue(completeStepSelector)

  const schema = yup.object({
    type: yup.string().required(),
    businessNname: yup.string().required(''),
    representativeName: yup.string().required(''),
    date: yup.string(),
    officeLocation: yup.string().required(''),
    detailedAddress: yup.string().required(''),
    contactInformation: yup.string()
  })

  const form = useForm({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    mode: 'onBlur'
  })

  return (
    <FormProvider {...form}>{!completeStep.includes(STEP.STEP_ONE) ? <Step_01_Edit /> : <Step_01_View />}</FormProvider>
  )
}
export default Step1ShareholderList
