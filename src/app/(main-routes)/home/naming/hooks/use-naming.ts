import { dataDeckActive } from '@/atoms/home/naming'
import { completeStepSelector, activeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import { QUERY_KEY_ALL_STEP } from '@/constants/naming.constant'
import { getActiveStep, getAllActiveStep, postSteps } from '@/services/deck.service'
import { StepActivity, StepProject } from '@/types/deck.type'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useLanguage } from '@/hooks/use-language'
import { CartItemNamingProps, DataCartItem, NamingTab } from '@/types/naming.type'
import { getIndustry } from '@/services/naming.service'
import { dataCart } from '../_clientComponents/step-data'
import { NamingContext } from '../_clientComponents'

export const useProjectId = () => {
  const projectId = useContext(NamingContext)
  return projectId
}

export const useStepProject = (stepIndex?: number) => {
  const { projectId }= useProjectId()
  const deckActive = useRecoilValue(dataDeckActive)
  const stepDeck = {
    deckId: Number(deckActive[stepIndex || 0]?.deckId),
    stepId: Number(deckActive[stepIndex || 0]?.id)
  }
  const stepProject = {
    ...stepDeck,
    projectId
  }

  return {
    stepProject,
    stepDeck
  }
}

export const useNamingData = <T>(stepId: number, queryKey: string) => {
  const { stepProject: param } = useStepProject(stepId)

  const data = useQuery({
    queryKey: [queryKey, param],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, StepProject] }) => getActiveStep<T>(param),
    enabled: !!param?.deckId && !!param?.stepId,
    staleTime: 0
  })

  return data
}

export const useNamingDataIR = <T>(stepId?: number) => {
  const {
    stepProject: { projectId, deckId }
  } = useStepProject()

  const { data } = useQuery({
    queryKey: [QUERY_KEY_ALL_STEP, { deckId, projectId }],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, StepProject] }) => getAllActiveStep(param),
    enabled: !!deckId && !!projectId,
    staleTime: 0
  })
  const indexData = stepId ?? Number(data?.length) - 1

  return data && (data[indexData] as StepActivity<T>)
}

export const useNamingPostData = <T>(stepActive: number) => {
  const { stepProject: param } = useStepProject(stepActive)

  const [, setCompleteStep] = useRecoilState(completeStepSelector)
  const [, setActiveStep] = useRecoilState(activeStepSelector)
  const [, setExpandStep] = useRecoilState(expandStepSelector)
  const deckActive = useRecoilValue(dataDeckActive)

  const removeID = deckActive.filter((_item, index) => index > stepActive)

  const { mutate, ...rest } = useMutation({
    mutationFn: postSteps<T>,
    onSuccess: () => {
      setCompleteStep((pre) => {
        if (!pre.includes(stepActive)) {
          return [...pre, stepActive]
        }
        return pre
      })
      setActiveStep((pre) => pre + 1)
      stepActive === deckActive.length - 1 && setExpandStep((pre) => [...pre, stepActive])
    }
  })

  const mutation = (data: T) => {
    mutate({
      ...param,
      status: 'FINISHED',
      data,
      playTime: 0,
      deletedStepActivitiesIds: removeID.map((item) => item.id)
    })
  }

  return {
    ...rest,
    mutation
  }
}

export const useGetIndustry = () => {
  return useQuery({
    queryKey: ['naimng-industry'],
    queryFn: () => getIndustry(),
    meta: {
      offLoading: true
    }
  })
}

export const useGetValue = () => {
  const useIndustry = useGetIndustry()
  const { data: dataIndustry } = useIndustry

  const useLang = useLanguage()
  const { getValueLanguage, getFieldLanguage } = useLang

  const getValueIndustry = (industry?: React.Key) => {
    const data = findData<NamingTab>(dataIndustry, industry)
    return data && getValueLanguage(data)
  }

  const getValueConcept = (keyConcept = 'concept_0') => {
    const data = dataCart[keyConcept]
    return (data && data[getFieldLanguage<DataCartItem>()]) || ({ title: '', subTitle: '' } as CartItemNamingProps)
  }

  return {
    useIndustry,
    useLang,
    getValueIndustry,
    getValueConcept
  }
}

export const findData = <T extends { id: React.Key }>(data?: T[], value?: React.Key, name?: keyof T) => {
  return data?.find((item) => item[name ?? 'id'] === Number(value))
}
