'use client'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRecoilState } from 'recoil'
import { FormProvider, useForm } from 'react-hook-form'
import { IFormValuesMarketingKpiList } from '@/types/advertisement-marketing.type'
import { completeStepSelector } from '@/atoms/home/stepper'
import { STEP } from '@/constants/common.constant'
import Step_04_Edit from './edit'
import Step_04_View from './view'

const Step_04_AdvertisementMarketing = () => {
  const [completeStep] = useRecoilState(completeStepSelector)

  const innerSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    budget: yup.string().required()
  })
  const schema = yup.object().shape({
    data: yup.array().of(innerSchema).max(3).required(),
    unitCurrency: yup.string().required()
  })

  const form = useForm<IFormValuesMarketingKpiList>({
    // resolver: yupResolver(schema),
    mode: 'onBlur'
  })

  return (
    <FormProvider {...form}>{completeStep.includes(STEP.STEP_FOUR) ? <Step_04_View /> : <Step_04_Edit />}</FormProvider>
  )
}
export default Step_04_AdvertisementMarketing
