'use client'
import { useEffect } from 'react'
import * as yup from 'yup'
import { useQuery } from '@tanstack/react-query'
import { useRecoilValue, useRecoilState } from 'recoil'
import { FormProvider, useForm, Resolver } from 'react-hook-form'
import { completeStepSelector } from '@/atoms/home/stepper'
import { yupResolver } from '@hookform/resolvers/yup'
import { IFormValuesStepThree } from '@/types/competitor-analysis.type'
import { TStepApi } from '@/types/step.type'
import { STEP } from '@/constants/common.constant'
import { DEFAULT_STEP } from '@/constants/competitor-analysis'
import { dataCompanyAnalyzingStep3, dataDeckActive, projectIdCompanyAnalysis } from '@/atoms/home/competitor-analysis'
import { getStep } from '@/services/step.service'
import { MAXLENGTH_INPUT } from './../_components/utils'
import Step_03_Edit from './edit'
import Step_03_View from './view'

const Step_03_CompetitorAnalysis = () => {
  const [projectId] = useRecoilState(projectIdCompanyAnalysis)
  const completeStep = useRecoilValue(completeStepSelector)
  const [, setDataStep3] = useRecoilState(dataCompanyAnalyzingStep3)
  const [deckActive] = useRecoilState(dataDeckActive)

  const innerSchema = yup.object().shape({
    type: yup.string().required(),
    name: yup.string().required(),
    data: yup.object().shape({})
  })
  const schema = yup.object().shape({
    rowList: yup.array().of(innerSchema).max(MAXLENGTH_INPUT.SELECTED_COMPARISON_COMPETITORS).required()
  })
  const form = useForm<IFormValuesStepThree>({
    resolver: yupResolver(schema) as unknown as Resolver<IFormValuesStepThree>,
    mode: 'onBlur'
  })

  const { data: dataStep, isFetching: isFetchingDataStep } = useQuery({
    queryKey: [`competitor-analysis-step-03`],
    queryFn: () => getStep({ ...DEFAULT_STEP, projectId, stepId: Number(deckActive[STEP.STEP_THREE]?.id || 3) }),
    staleTime: 0,
    meta: { offLoading: true }
  })

  useEffect(() => {
    const data = (dataStep?.data as TStepApi) || ({} as any)

    if (!isFetchingDataStep && data) {
      form.reset(data?.data || {})
      setDataStep3(data?.data || {})
    }
  }, [dataStep?.data, isFetchingDataStep])

  return (
    <FormProvider {...form}>
      {completeStep.includes(STEP.STEP_THREE) ? <Step_03_View /> : <Step_03_Edit />}
    </FormProvider>
  )
}
export default Step_03_CompetitorAnalysis
