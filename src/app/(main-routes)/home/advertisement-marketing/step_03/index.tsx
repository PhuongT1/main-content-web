'use client'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRecoilState } from 'recoil'
import { FormProvider, useForm } from 'react-hook-form'
import { IFormValuesMarketingChannels } from '@/types/advertisement-marketing.type'
import { completeStepSelector } from '@/atoms/home/stepper'
import { STEP } from '@/constants/common.constant'
import Step_03_Edit from './edit'
import Step_03_View from './view'

const Step_03_AdvertisementMarketing = () => {
  const [completeStep] = useRecoilState(completeStepSelector)

  const innerSchema = yup.object().shape({
    channels: yup.array().min(1).max(3)
  })
  const schema = yup.object().shape({
    data: yup.array().of(innerSchema).max(3).required()
  })

  const form = useForm<IFormValuesMarketingChannels>({
    // resolver: yupResolver(schema as any),
    mode: 'onBlur'
  })

  return (
    <FormProvider {...form}>
      {completeStep.includes(STEP.STEP_THREE) ? <Step_03_View /> : <Step_03_Edit />}
    </FormProvider>
  )
}
export default Step_03_AdvertisementMarketing
