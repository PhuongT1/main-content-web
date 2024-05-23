'use client'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRecoilState } from 'recoil'
import { FormProvider, useForm } from 'react-hook-form'
import { IFormValuesMarketingStrategies } from '@/types/advertisement-marketing.type'
import { completeStepSelector } from '@/atoms/home/stepper'
import { STEP } from '@/constants/common.constant'
import Step_02_Edit from './edit'
import Step_02_View from './view'

const Step_02_AdvertisementMarketing = () => {
  const [completeStep] = useRecoilState(completeStepSelector)

  const innerSchema = yup.object().shape({
    strategies: yup.array().min(1).max(3).required()
  })
  const schema = yup.object().shape({
    data: yup.array().of(innerSchema).max(3).required()
  })

  const form = useForm<IFormValuesMarketingStrategies>({
    // resolver: yupResolver(schema),
    mode: 'onBlur'
  })

  return (
    <FormProvider {...form}>{completeStep.includes(STEP.STEP_TWO) ? <Step_02_View /> : <Step_02_Edit />}</FormProvider>
  )
}
export default Step_02_AdvertisementMarketing
