import { completeStepSelector, activeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import { deckList, deckCompleteList, projectIdProfitStructure } from '@/atoms/home/profit-structure'
import { DEFAULT_STEP } from '@/constants/profit-structure.constant'
import { getActiveStep, getAllActiveStep, getSteps, postSteps } from '@/services/deck.service'
import { DeckProject, StepProject } from '@/types/deck.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRecoilState, useRecoilValue } from 'recoil'

// ====
export const useActiveStep = (stepItem: number) => {
  const deckItemList = useRecoilValue(deckList)
  return deckItemList.find((item) => item.position - 1 === stepItem)
}

export const useStepList = () => {
  return useQuery({
    queryKey: [`step-list-profit-structure`, { deckId: DEFAULT_STEP.deckId }],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, DeckProject] }) => getSteps(param),
    meta: { offLoading: true }
  })
}

export const useCompleteStepList = () => {
  const projectId = useRecoilValue(projectIdProfitStructure)
  return useQuery({
    queryKey: ['active-step-profit-structure', { deckId: DEFAULT_STEP.deckId, projectId }],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, StepProject] }) => getAllActiveStep(param),
    enabled: !!DEFAULT_STEP?.deckId && !!projectId
  })
}

// ====
export const useProfitStructureParams = (stepId: number) => {
  const projectId = useRecoilValue(projectIdProfitStructure)
  const stepItem = useActiveStep(stepId)
  const params = {
    deckId: Number(stepItem?.deckId),
    stepId: Number(stepItem?.id),
    projectId
  }

  return params
}

export const useProfitStructureData = <T>(stepId: number, queryKey: string, offLoading = false) => {
  const param = useProfitStructureParams(stepId)
  const data = useQuery({
    queryKey: [queryKey, param],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, StepProject] }) => getActiveStep<T>(param),
    enabled: !!param?.deckId && !!param?.stepId,
    meta: { offLoading },
  })

  return data
}

export const useProfitStructurePostData = <T>(stepActive: number, { keyListRefetchQuery = [], removeIdList }: { keyListRefetchQuery?: string[], removeIdList?: number[] | undefined }) => {
  const [completeStep, setCompleteStep] = useRecoilState(completeStepSelector)
  const [, setActiveStep] = useRecoilState(activeStepSelector)
  const [, setExpandStep] = useRecoilState(expandStepSelector)

  const deckActive = useRecoilValue(deckList)
  const param = useProfitStructureParams(stepActive)
  const query = useQueryClient()

  const handleNextActive = () => {
    let isHaveActive = false
    const slicedArray = deckActive.slice(stepActive)
    slicedArray.some((item) => {
      const stepItem = item.position - 1
      if (!completeStep.includes(stepItem) && stepItem !== stepActive) {
        isHaveActive = true
        setActiveStep(stepItem)
        return true
      }
    })

    if (!isHaveActive) {
      setActiveStep(deckActive.length + 1)
    }

    if (stepActive === deckActive.length - 1 || !isHaveActive) setExpandStep((pre) => [...pre, stepActive])
  }

  const { mutate, ...rest } = useMutation({
    mutationFn: postSteps<T>,
    onSuccess: () => {
      handleNextActive()
      setCompleteStep((pre) => {
        if (!pre.includes(stepActive)) {
          return [...pre, stepActive]
        }
        return pre
      })
      keyListRefetchQuery?.length > 0 && query.invalidateQueries({ queryKey: keyListRefetchQuery })
    }
  })

  const mutation = (data: T) => {
    mutate({
      ...param,
      status: 'FINISHED',
      data,
      playTime: 0,
      deletedStepActivitiesIds: removeIdList || deckActive?.filter((_item, index) => index > stepActive)?.map((item) => item.id) || []
    })
  }

  return {
    ...rest,
    mutation
  }
}

// ====
export const useClickButtonEdit = (stepId: number) => {
  const completeList = useRecoilValue(deckCompleteList)
  const deckItemList = useRecoilValue(deckList)
  const [, setCompleteStep] = useRecoilState(completeStepSelector)
  const [, setExpandStep] = useRecoilState(expandStepSelector)
  const [activeStep, setActiveStep] = useRecoilState(activeStepSelector)

  const handleBtnEdit = () => {
    const deckActive = deckItemList.find((item) => item.position - 1 === activeStep)
    const isComplete = completeList.findIndex(
      (item) => item.deckId === deckActive?.deckId && item.stepId === deckActive.id
    )

    setCompleteStep((pre) => {
      const newComplete = pre.filter((item) => item !== stepId)
      return isComplete === -1 ? newComplete : [...newComplete, activeStep]
    })
    setExpandStep((pre) => pre.filter((item) => item !== stepId))
    setActiveStep(stepId)
  }

  return {
    handleBtnEdit
  }
}
