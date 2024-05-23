import { activeStepSelector, completeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { ComponentType, useMemo } from 'react'
import { useRecoilState } from 'recoil'
import { SloganAtom } from '../slogan-atom'
import { StepActivity, StepProject } from '@/types/deck.type'
import { getActiveStep, postSteps } from '@/services/deck.service'
import useToggle from '@/hooks/use-toggle'
import { DeleteDeck } from '@/components/dialog/delete-deck'

export interface PropvVariable {
  currentStep: number
}

export interface propStepComponent<T, T2 = undefined> {
  isView: boolean
  data: StepActivity<T> | undefined
  prewStep: StepActivity<T2> | undefined
  showEdit: () => void
  onFinish: (data: T) => void
}

function HocStepSlogan<T, T2>(WrappedComponent: ComponentType<propStepComponent<T, T2>>, variable: PropvVariable) {
  const EnhancedComponent = ({ ...props }: {projectId: number}) => {
    const {projectId} = props
    const { currentStep } = variable
    const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
    const [, setActiveStep] = useRecoilState(activeStepSelector)
    const [completeStep, setCompleteStep] = useRecoilState(completeStepSelector)
    const [, setExpandStep] = useRecoilState(expandStepSelector)
    const [sloganStep] = useRecoilState(SloganAtom)
    const isView = useMemo(() => completeStep.includes(currentStep), [completeStep])

    const { data } = useQuery({
      queryKey: [
        'get-data-slogan',
        {
          deckId: Number(sloganStep[currentStep]?.deckId),
          stepId: Number(sloganStep[currentStep]?.stepId),
          projectId
        }
      ],
      queryFn: ({ queryKey: [, param] }: { queryKey: [string, StepProject] }) => getActiveStep<T>(param),
      enabled: !!sloganStep[currentStep]?.deckId && !!sloganStep[currentStep]?.stepId,
      staleTime: 0
    })

    const { data: dataPrewStep } = useQuery({
      queryKey: [
        'get-data-slogan',
        {
          deckId: Number(sloganStep[currentStep - 1]?.deckId),
          stepId: Number(sloganStep[currentStep - 1]?.stepId),
          projectId
        }
      ],
      queryFn: ({ queryKey: [, param] }: { queryKey: [string, StepProject] }) => getActiveStep<T2>(param),
      enabled: !!sloganStep[currentStep - 1]?.deckId && !!sloganStep[currentStep - 1]?.stepId,
      staleTime: 0
    })

    const { mutate } = useMutation({
      mutationFn: postSteps<T>,
      onSuccess: () => {
        sloganStep.length === currentStep + 1 && setExpandStep((pre) => [...pre, currentStep])
        setActiveStep((pre) => pre + 1)
        setCompleteStep((pre) => {
          return [...pre, currentStep].filter((item) => item !== currentStep + 1)
        })
      }
    })

    const onFinish = (data: T) => {
      mutate({
        projectId,
        deckId: Number(sloganStep[currentStep].deckId),
        stepId: Number(sloganStep[currentStep].stepId),
        status: 'FINISHED',
        data: data,
        playTime: 0,
        deletedStepActivitiesIds: sloganStep.slice(currentStep + 1).map((item) => Number(item.stepId))
      })
      return
    }

    const handleRemoveCompleteStep = () => {
      setCompleteStep((prew) => {
        const removeStep = prew.filter((item) => item < currentStep)
        return removeStep
      })
      setExpandStep((prew) => {
        const removeStep = prew.filter((item) => item < currentStep)
        return removeStep
      })
      setToggleShowDialog(false)
      setActiveStep(currentStep)
    }

    const showEdit = () => {
      if (currentStep + 1 < sloganStep.length) {
        setToggleShowDialog(true)
      } else handleRemoveCompleteStep()
    }

    return (
      <>
        <WrappedComponent
          {...props}
          isView={isView}
          data={data}
          prewStep={dataPrewStep}
          onFinish={onFinish}
          showEdit={showEdit}
        />
        <DeleteDeck open={showDialog} onCancel={toggleShowDialog} onSubmit={handleRemoveCompleteStep} />
      </>
    )
  }
  return EnhancedComponent
}

export default HocStepSlogan
