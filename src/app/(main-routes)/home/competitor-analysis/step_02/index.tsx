'use client'
import React, { useEffect } from 'react'
import * as yup from 'yup'
import { useQuery } from '@tanstack/react-query'
import { useRecoilValue, useRecoilState } from 'recoil'
import { FormProvider, useForm } from 'react-hook-form'
import { completeStepSelector } from '@/atoms/home/stepper'
import { yupResolver } from '@hookform/resolvers/yup'
import { IFormValuesStepTwo } from '@/types/competitor-analysis.type'
import { TStepApi } from '@/types/step.type'
import { DEFAULT_STEP } from '@/constants/competitor-analysis'
import { dataCompanyAnalyzingStep2, dataDeckActive, projectIdCompanyAnalysis } from '@/atoms/home/competitor-analysis'
import { getStep } from '@/services/step.service'
import { STEP } from '@/constants/common.constant'
import Step_02_Edit from './edit'
import Step_02_View from './view'

const Step_02_CompetitorAnalysis = () => {
  const [projectId] = useRecoilState(projectIdCompanyAnalysis)
  const completeStep = useRecoilValue(completeStepSelector)
  const [, setDataStep2] = useRecoilState(dataCompanyAnalyzingStep2)
  const [deckActive] = useRecoilState(dataDeckActive)

  const innerSchema = yup.object().shape({
    age: yup.string().required(),
    gender: yup.string().required(),
    job: yup.string().required(),
    differentCharacteristics: yup.array().min(3).max(3)
  })
  const schema = yup.object().shape({
    data: yup.array().of(innerSchema).max(5).required()
  })

  const form = useForm<IFormValuesStepTwo>({
    resolver: yupResolver(schema) as any,
    mode: 'onBlur'
  })

  const { data: dataStep, isFetching: isFetchingDataStep } = useQuery({
    queryKey: [`competitor-analysis-step-02`],
    queryFn: () => getStep({ ...DEFAULT_STEP, projectId, stepId: Number(deckActive[STEP.STEP_TWO]?.id || 2) }),
    staleTime: 0,
    meta: { offLoading: true }
  })

  useEffect(() => {
    const data: any = (dataStep?.data as TStepApi) || {}

    if (!isFetchingDataStep && data) {
      form.reset(data?.data || {})
      setDataStep2(data?.data || {})
    }
  }, [dataStep?.data, isFetchingDataStep])

  return (
    <FormProvider {...form}>{completeStep.includes(STEP.STEP_TWO) ? <Step_02_View /> : <Step_02_Edit />}</FormProvider>
  )
}
export default Step_02_CompetitorAnalysis
