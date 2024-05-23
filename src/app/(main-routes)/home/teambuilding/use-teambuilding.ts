import { useQuery } from '@tanstack/react-query'
import { TeambuildingProjectContext, TeambuldingEnumId } from './step-list'
import { StepProject } from '@/types/deck.type'
import { useRecoilState, useRecoilValue } from 'recoil'
import { getActiveStep } from '@/services/deck.service'
import { dataDeckActive } from '@/atoms/home/teambuilding'
import { useContext } from 'react'
import { activeStepSelector, completeStepSelector, expandStepSelector } from '@/atoms/home/stepper'

export const useStepProject = (stepIndex?: number) => {
  const deckActive = useRecoilValue(dataDeckActive)
  const { projectId } = useContext(TeambuildingProjectContext)
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

export const useRemoveCompletedStep = (stepIndex: number) => {
  const [completeStep, setCompleteStep] = useRecoilState(completeStepSelector)
  const [, setActiveStep] = useRecoilState(activeStepSelector)
  const [expandStep, setExpandStep] = useRecoilState(expandStepSelector)

  const handleRemoveCompleteStep = () => {
    const checkIndex = expandStep.find((x) => !completeStep.includes(x)) ?? -1

    setCompleteStep((pre) => {
      const removeStep = pre.filter((item) => item !== stepIndex)
      if (checkIndex >= 0) {
        return [...removeStep, checkIndex]
      }
      return removeStep
    })

    setActiveStep(stepIndex)
  }
  return { handleRemoveCompleteStep }
}

export const useTeambuildingData = <T>(stepId: number, queryKey: string) => {
  const { stepProject: param } = useStepProject(stepId)

  const data = useQuery({
    queryKey: [queryKey, param],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, StepProject] }) => getActiveStep<T>(param),
    enabled: !!param?.deckId && !!param?.stepId,
    staleTime: 0
  })
  return data
}
