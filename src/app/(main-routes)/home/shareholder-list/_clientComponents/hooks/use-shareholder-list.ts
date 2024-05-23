import { deckCompleteList, deckList, toggleChangData } from '@/atoms/home/customer'
import { completeStepSelector, activeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import { STEP } from '@/constants/common.constant'
import { CUSTOMER_ACTIVE_STEP, DEFAULT_STEP_CUSTOMER_SERVICE } from '@/constants/customer-service.constant'
import { DEFAULT_STEP_SHAREHOLDER_LIST } from '@/constants/shareholder-list.constant'
import { getActiveStep, getAllActiveStep, getSteps, postSteps } from '@/services/deck.service'
import { DeckProject, StepProject } from '@/types/deck.type'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ProjectIdContext } from '..'

export const useActiveStep = (stepItem: number) => {
  const deckItemList = useRecoilValue(deckList)
  return deckItemList.find((item) => item.position - 1 === stepItem)
}

export const useStepList = () => {
  const deckID: DeckProject = { deckId: DEFAULT_STEP_SHAREHOLDER_LIST.deckId }

  return useQuery({
    queryKey: [`step-list-customer`, deckID],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, DeckProject] }) => getSteps(param),
    meta: {
      offLoading: true
    }
  })
}

export const useCompleteStepList = (projectId: number) => {
  const queryKeys = {
    deckId: DEFAULT_STEP_SHAREHOLDER_LIST.deckId,
    projectId: projectId,
  }
  return  useQuery({
    queryKey: [CUSTOMER_ACTIVE_STEP, queryKeys],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, StepProject] }) => getAllActiveStep(param),
    enabled: !!queryKeys?.deckId && !!projectId
  })
}


export const useCustomerData = <T = unknown>(step: number, queryKey: string, offLoading = false) => {
  const stepItem = useActiveStep(step)
  const [togleChangData, setToggleChangData] = useRecoilState(toggleChangData)
  const {projectId} = useContext(ProjectIdContext)
  const param = {
    deckId: Number(stepItem?.deckId),
    stepId: Number(stepItem?.id),
    projectId,
  }

  const data = useQuery({
    queryKey: [queryKey, param],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, StepProject] }) => getActiveStep<T>(param),
    enabled: !!param?.deckId && !!param?.stepId,
    meta: {
      offLoading
    },
    staleTime: 0
  })

  useEffect(() => {
    data.data?.data && setToggleChangData(!togleChangData)
  }, [data.data?.data])

  return data
}

export const useCustomerPostData = <T = unknown>(stepActive: number) => {
  const deckActive = useRecoilValue(deckList)
  const [completeStep, setCompleteStep] = useRecoilState(completeStepSelector)
  const [, setActiveStep] = useRecoilState(activeStepSelector)
  const [, setExpandStep] = useRecoilState(expandStepSelector)
  const {projectId} = useContext(ProjectIdContext)

  const stepItem = useActiveStep(stepActive)
  const isStep2 = stepActive === STEP.STEP_TWO

  const param = {
    deckId: Number(stepItem?.deckId),
    stepId: Number(stepItem?.id),
    projectId,
  }
  
  const handleNextActive = () => {
    let isHaveActive: boolean = false
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
          const preComplete = isStep2 ? pre.filter(item=> item !== STEP.STEP_FOUR) : pre
          return [...preComplete, stepActive]
        }
        return pre
      })
     
    }
  })

  const mutation = (data: T) => {
    const removeID = isStep2 ? [deckActive[STEP.STEP_FOUR].id] : []
    mutate({
      ...param,
      status: 'FINISHED',
      data,
      playTime: 0,
      deletedStepActivitiesIds: removeID
    })
  }

  return {
    ...rest,
    mutation
  }
}

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