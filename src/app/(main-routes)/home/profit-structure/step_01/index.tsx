'use client'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRecoilState } from 'recoil'
import { FormProvider, useForm } from 'react-hook-form'
import { IFormValuesProfitGenerationStructure } from '@/types/profit-structure.type'
import { MAX_LENGTH } from '@/constants/profit-structure.constant'
import { completeStepSelector } from '@/atoms/home/stepper'
import { STEP } from '@/constants/common.constant'
import Step_01_Edit from './edit'
import Step_01_View from './view'

const Step_01_ProfitStructure = () => {
  const [completeStep] = useRecoilState(completeStepSelector)

  const schema = yup.object({
    brand: yup.string().max(MAX_LENGTH.BRAND).required(),
    idea: yup.string().max(MAX_LENGTH.IDEA).required(),
    profitStructureList: yup.array().min(1).max(MAX_LENGTH.REVENUE_GENERATION_STRUCTURE).required()
  })

  const form = useForm<IFormValuesProfitGenerationStructure>({
    // resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    mode: 'onBlur'
  })

  return (
    <FormProvider {...form}>{completeStep.includes(STEP.STEP_ONE) ? <Step_01_View /> : <Step_01_Edit />}</FormProvider>
  )
}
export default Step_01_ProfitStructure
