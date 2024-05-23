import { deckCompleteList, deckList, toggleChangData } from '@/atoms/home/customer'
import { completeStepSelector, activeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import { STEP } from '@/constants/common.constant'
import { CUSTOMER_ACTIVE_STEP, DEFAULT_STEP_CUSTOMER_SERVICE } from '@/constants/customer-service.constant'
import { getActiveStep, getAllActiveStep, getSteps, postSteps } from '@/services/deck.service'
import { DeckProject, DeckProjectId, StepProject } from '@/types/deck.type'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { CustomerServicePageContext } from '.'

export const useProjectId = () => {
  const projectId = useContext(CustomerServicePageContext)
  return projectId
}

export const useActiveStep = (stepIndex?: number) => {
  const deckItemList = useRecoilValue(deckList)
  return deckItemList.find((item) => item.position - 1 === Number(stepIndex ?? 0))
}

export const useStepProject = (stepIndex?: number) => {
  const { projectId } = useProjectId()
  const step = useActiveStep(Number(stepIndex ?? 0))
  const stepDeck = {
    deckId: Number(step?.deckId),
    stepId: Number(step?.id)
  }
  const stepProject = {
    ...stepDeck,
    projectId : Number(projectId)
  }

  return {
    stepProject,
    stepDeck
  }
}

export const useStepList = () => {
  const deckProject: DeckProject = { deckId: DEFAULT_STEP_CUSTOMER_SERVICE.deckId }

  return useQuery({
    queryKey: [`step-list-customer`, deckProject],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, DeckProject] }) => getSteps(param),
    meta: {
      offLoading: true
    }
  })
}

export const useCompleteStepList = ({ projectId }: DeckProjectId) => {
  const deckItem = DEFAULT_STEP_CUSTOMER_SERVICE
  const { projectId: projectIdDeck } = useProjectId()
  const projectIdItem = projectId ?? projectIdDeck
  const {
    stepDeck: { deckId },
  } = useStepProject()

  return useQuery({
    queryKey: [CUSTOMER_ACTIVE_STEP, { deckId: deckItem.deckId, projectId: projectIdItem}],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, StepProject] }) => getAllActiveStep(param),
    enabled: !!deckId && !!projectIdItem
  })
}

export const useCustomerData = <T = unknown>(step: number, queryKey: string, offLoading = false) => {
  const [togleChangData, setToggleChangData] = useRecoilState(toggleChangData)
  const {
    stepProject
  } = useStepProject(step)

  const data = useQuery({
    queryKey: [queryKey, stepProject],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, StepProject] }) => getActiveStep<T>(param),
    enabled: !!stepProject?.deckId && !!stepProject?.stepId,
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

  const stepItem = useActiveStep(stepActive)
  const isStep2 = stepActive === STEP.STEP_TWO
  const {
    stepProject
  } = useStepProject(stepActive)

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
          const preComplete = isStep2 ? pre.filter((item) => item !== STEP.STEP_FOUR) : pre
          return [...preComplete, stepActive]
        }
        return pre
      })
    }
  })

  const mutation = (data: T) => {
    const removeID = isStep2 ? [deckActive[STEP.STEP_FOUR].id] : []
    mutate({
      ...stepProject,
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

const getElementPosition = (className: string, isRight?: boolean) => {
  const element = document.querySelector(`.${className}`)
  var rect = element?.getBoundingClientRect()
  const height = Number(rect?.bottom) - Number(rect?.top)
  return [Number(isRight ? rect?.right : rect?.left) + window.scrollX, Number(rect?.top) + window.scrollY + height / 2]
}

export const getPositionIcon = (classNameFirst: string, classNameLast: string) => {
  const [x2, y2] = getElementPosition(classNameFirst, true)
  const [x1, y1] = getElementPosition(classNameLast)

  const width = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
  const top = (y1 + y2) / 2
  const angle = Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI)

  return {
    width,
    top,
    left: x2,
    angle
  }
}
