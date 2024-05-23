'use client'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRecoilState } from 'recoil'
import { FormProvider, useForm } from 'react-hook-form'
import { IFormValuesMarketingPlans } from '@/types/advertisement-marketing.type'
import { completeStepSelector } from '@/atoms/home/stepper'
import { STEP } from '@/constants/common.constant'
import Step_05_Edit from './edit'
import Step_05_View from './view'

const Step_05_AdvertisementMarketing = () => {
  const [completeStep] = useRecoilState(completeStepSelector)

  const innerSchema = yup.object().shape({
    channel: yup.string().required(),
    budget: yup.string().required(),
    monthSelectedList: yup.array().min(12).max(12)
  })
  const schema = yup.object().shape({
    data: yup.array().of(innerSchema).required(),
    startMonth: yup.string(),
    unitCurrency: yup.string(),
    totalBudget: yup.string(),
    remainBudget: yup.string()
  })

  const form = useForm<IFormValuesMarketingPlans>({
    // resolver: yupResolver(schema as any),
    mode: 'onBlur'
  })

  return (
    <FormProvider {...form}>{completeStep.includes(STEP.STEP_FIVE) ? <Step_05_View /> : <Step_05_Edit />}</FormProvider>
  )
}
export default Step_05_AdvertisementMarketing
