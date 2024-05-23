'use client'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRecoilState } from 'recoil'
import { FormProvider, useForm } from 'react-hook-form'
import { IFormValuesPricingStrategy } from '@/types/profit-structure.type'
import { MAX_LENGTH } from '@/constants/profit-structure.constant'
import { completeStepSelector } from '@/atoms/home/stepper'
import { STEP } from '@/constants/common.constant'
import Step_02_Edit from './edit'
import Step_02_View from './view'

const Step_02_ProfitStructure = () => {
  const [completeStep] = useRecoilState(completeStepSelector)

  const schema = yup.object({
    strategyList: yup.array().min(1).max(MAX_LENGTH.PRICING_STRATEGY).required()
  })

  const form = useForm<IFormValuesPricingStrategy>({
    // resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    mode: 'onBlur'
  })

  return (
    <FormProvider {...form}>{completeStep.includes(STEP.STEP_TWO) ? <Step_02_View /> : <Step_02_Edit />}</FormProvider>
  )
}
export default Step_02_ProfitStructure
