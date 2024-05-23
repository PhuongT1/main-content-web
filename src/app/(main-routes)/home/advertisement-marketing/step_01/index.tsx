'use client'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRecoilState } from 'recoil'
import { FormProvider, useForm } from 'react-hook-form'
import { IFormValuesMarketingGoals } from '@/types/advertisement-marketing.type'
import { completeStepSelector } from '@/atoms/home/stepper'
import { STEP } from '@/constants/common.constant'
import { MAX_LENGTH } from '@/constants/advertisement-marketing.constant'
import Step_01_Edit from './edit'
import Step_01_View from './view'

const Step_01_AdvertisementMarketing = () => {
  const [completeStep] = useRecoilState(completeStepSelector)

  const schema = yup.object({
    title: yup.string().max(MAX_LENGTH.TITLE).required(),
    idea: yup.string().max(MAX_LENGTH.IDEA).required(),
    selectedGoals: yup.array().max(MAX_LENGTH.GOALS)
  })

  const form = useForm<any>({
    resolver: yupResolver(schema as any),
    mode: 'onBlur'
  })

  return (
    <FormProvider {...form}>{completeStep.includes(STEP.STEP_ONE) ? <Step_01_View /> : <Step_01_Edit />}</FormProvider>
  )
}
export default Step_01_AdvertisementMarketing
