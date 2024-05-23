import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import React, { useEffect } from 'react'
import { Namingkeyword } from '@/types/naming.type'
import Step_01_Edit from './edit'
import { completeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import { useRecoilState, useRecoilValue } from 'recoil'
import { yupResolver } from '@hookform/resolvers/yup'
import { dataNaming } from '@/atoms/home/naming'
import { STEP } from '@/constants/common.constant'
import { useQuery } from '@tanstack/react-query'
import { getActiveStep } from '@/services/deck.service'
import { StepProject } from '@/types/deck.type'
import { DEFAULT_STEP_NAMING } from '@/constants/naming.constant'
import { getTradeCompanies } from '@/services/trade.service'

const Step1Naming = ({ projectId }: { projectId: number }) => {
  const [{ namingKeyword }, setDataNaming] = useRecoilState(dataNaming)
  const errorMessage = '네이밍 키워드는 2개 이상 선택해야 합니다.'
  const param = {
    deckId: Number(namingKeyword?.deckId),
    stepId: Number(namingKeyword?.stepId),
    projectId: projectId
  }

  const { data } = useQuery({
    queryKey: [`trade-deck-step1-${projectId}`, param],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, StepProject] }) => getActiveStep<Namingkeyword>(param),
    enabled: !!namingKeyword?.deckId && !!namingKeyword?.stepId,
    staleTime: 0
  })

  const schema = yup.object({
    concept: yup.string().required(' '),
    industry: yup.mixed<React.Key>().required(' '),
    idea: yup.string().required(' '),
    selectedItem: yup.array().required(errorMessage).min(2, errorMessage)
  })

  const form = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {}
  })

  useEffect(() => {
    if (data?.data) {
      setDataNaming((pre) => ({ ...pre, namingKeyword: data }))
    }
  }, [data?.data])

  useEffect(() => {
    namingKeyword && form.reset(namingKeyword.data, { keepDefaultValues: true })
  }, [namingKeyword])

  return <FormProvider {...form}>{<Step_01_Edit />}</FormProvider>
}
export default Step1Naming
