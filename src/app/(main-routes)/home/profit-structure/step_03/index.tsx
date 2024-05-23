'use client'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRecoilState } from 'recoil'
import { FormProvider, useForm } from 'react-hook-form'
import { IFormValuesSalesAnalysis } from '@/types/profit-structure.type'
import { MAX_LENGTH } from '@/constants/profit-structure.constant'
import { completeStepSelector } from '@/atoms/home/stepper'
import { STEP } from '@/constants/common.constant'
import Step_03_Edit from './edit'
import Step_03_View from './view'

const Step_03_ProfitStructure = () => {
  const [completeStep] = useRecoilState(completeStepSelector)

  const schemaExpectedSales = yup.object().shape({
    unit: yup.string().required(),
    quantity: yup.string().required()
  })
  const schemaAnnualSalesGoals = yup.object().shape({
    sale: yup.string().required(),
    desc: yup.string().required(),
    color: yup.string().required()
  })
  const schema = yup.object({
    currency: yup.string().required(),
    expectedSales: yup.array().of(schemaExpectedSales).max(MAX_LENGTH.REVENUE_GENERATION_STRUCTURE).required(),
    startYear: yup.number().required(),
    annualSalesGoals: yup.array().of(schemaAnnualSalesGoals).max(MAX_LENGTH.ANNUAL_SALES_GOALS).required()
  })

  const form = useForm<IFormValuesSalesAnalysis>({
    // resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    mode: 'onBlur'
  })

  return (
    <FormProvider {...form}>
      {completeStep.includes(STEP.STEP_THREE) ? <Step_03_View /> : <Step_03_Edit />}
    </FormProvider>
  )
}
export default Step_03_ProfitStructure
