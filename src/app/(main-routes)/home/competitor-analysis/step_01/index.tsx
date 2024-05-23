'use client'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import * as yup from 'yup'
import { FormProvider, useForm } from 'react-hook-form'
import { completeStepSelector } from '@/atoms/home/stepper'
import { dataCompanyAnalyzingStep1 } from '@/atoms/home/competitor-analysis'
import { yupResolver } from '@hookform/resolvers/yup'
import { IFormValuesStepOne } from '@/types/competitor-analysis.type'
import { STEP } from '@/constants/common.constant'
import { MAXLENGTH_INPUT } from '../_components/utils'
import Step_01_Edit from './edit'
import Step_01_View from './view'

const Step_01_CompetitorAnalysis = () => {
  const [completeStep] = useRecoilState(completeStepSelector)
  const [dataStep1] = useRecoilState(dataCompanyAnalyzingStep1)

  const schema = yup.object({
    industry: yup.string().max(MAXLENGTH_INPUT.INDUSTRY).required(),
    idea: yup.string().max(MAXLENGTH_INPUT.IDEA).required(),
    selectedCompetitors: yup.array().max(MAXLENGTH_INPUT.SELECTED_COMPETITORS)
  })

  const form = useForm<IFormValuesStepOne>({
    // resolver: yupResolver(schema as any),
    mode: 'onBlur'
  })

  useEffect(() => {
    if (dataStep1) {
      form.reset(dataStep1)
    }
  }, [dataStep1])

  return (
    <FormProvider {...form}>{completeStep.includes(STEP.STEP_ONE) ? <Step_01_View /> : <Step_01_Edit />}</FormProvider>
  )
}
export default Step_01_CompetitorAnalysis
