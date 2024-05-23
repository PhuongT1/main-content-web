import { completeStepSelector, activeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import { dataDeckActive, projectIdPrMarketing } from '@/atoms/home/advertisement-marketing'
import { getActiveStep, getAllActiveStep, postSteps } from '@/services/deck.service'
import { StepActivity, StepProject } from '@/types/deck.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRecoilState, useRecoilValue } from 'recoil'
import { QUERY_KEY_ALL_STEP } from '@/constants/naming.constant'
import { useContext } from 'react'
import { AdvertisementMarketingPageContext } from '.'

export const useAdvertisementMarketingParams = (stepId: number) => {
  const projectId = useRecoilValue(projectIdPrMarketing)
  const deckActive = useRecoilValue(dataDeckActive)
  const params = {
    deckId: Number(deckActive[stepId]?.deckId || 0),
    stepId: Number(deckActive[stepId]?.id || 0),
    projectId
  }

  return params
}

export const useAdvertisementMarketingData = <T>(stepId: number, queryKey: string) => {
  const param = useAdvertisementMarketingParams(stepId)
  const data = useQuery({
    queryKey: [queryKey, param],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, StepProject] }) => getActiveStep<T>(param),
    enabled: !!param?.deckId && !!param?.stepId,
    meta: { offLoading: true },
    // staleTime: 0
  })
  return data
}

export const useAdvertisementMarketingPostData = <T>(stepActive: number, { keyListRefetchQuery = [] }: { keyListRefetchQuery?: string[] }) => {
  const [, setCompleteStep] = useRecoilState(completeStepSelector)
  const [, setActiveStep] = useRecoilState(activeStepSelector)
  const [, setExpandStep] = useRecoilState(expandStepSelector)
  const deckActive = useRecoilValue(dataDeckActive)
  const removeID = deckActive.filter((_item, index) => index > stepActive)
  const query = useQueryClient()
  const param = useAdvertisementMarketingParams(stepActive)

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
      keyListRefetchQuery?.length > 0 && query.invalidateQueries({ queryKey: keyListRefetchQuery })
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


export const useStepProject = (stepIndex?: number) => {
  const deckActive = useRecoilValue(dataDeckActive)
  const { projectId } = useContext(AdvertisementMarketingPageContext)
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


export const useAdvMarketingDataIR = <T>(stepId?: number) => {
  const {
    stepProject: { projectId, deckId }
  } = useStepProject()

  const { data } = useQuery({
    queryKey: [QUERY_KEY_ALL_STEP, { deckId, projectId }],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, StepProject] }) => getAllActiveStep(param),
    enabled: !!deckId && !!projectId,
    staleTime: 0
  })

  return data && stepId ? (data[stepId] as StepActivity<T>) : data as StepActivity<T>[]
}
