import { TeambuildingProjectContext } from '@/app/(main-routes)/home/teambuilding/step-list'
import { activeStepSelector, completeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import { dataTeamBuildingSelector } from '@/atoms/home/teambuilding'
import { STEP } from '@/constants/common.constant'
import { getStep, postStep } from '@/services/step.service'
import { StepQuery, TStepPayload } from '@/types/step.type'
import { requestIdleCallbackCustom } from '@/utils/events'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { useRecoilState, useRecoilStateLoadable } from 'recoil'

export const useStepApi = <T extends object>(query: StepQuery) => {
  const [completeStep, setCompleteStep] = useRecoilState(completeStepSelector)
  const [, setActiveStep] = useRecoilState(activeStepSelector)
  const [, setDataTeambuilding] = useRecoilStateLoadable(dataTeamBuildingSelector)
  const [expandStep, setExpandStep] = useRecoilState(expandStepSelector)
  const { projectId } = useContext(TeambuildingProjectContext)

  const mCreate = useMutation({
    mutationKey: [`create_step_${projectId}`],
    mutationFn: (data: TStepPayload<T>) => postStep({ ...data, projectId: projectId ? +projectId : 0 }),
    onSuccess(data, variables, context) {
      // set CompleteStep but remove completed of next steps

      requestIdleCallbackCustom(
        () => {
          setCompleteStep((pre) => {
            if (!pre.includes(variables.currentStep)) {
              if (pre.some((step) => step > variables.currentStep)) {
                return [...pre, variables.currentStep]
              }
              const filterStep = pre.filter((step) => step < variables.currentStep)
              return [...filterStep, variables.currentStep]
            }
            return pre
          })
        },
        { timeout: 200 }
      )

      if (completeStep.some((step) => step > variables.currentStep)) {
        setActiveStep(5)
        !expandStep.includes(variables.currentStep) && setExpandStep((pre) => [...pre, variables.currentStep])
      } else {
        setActiveStep((prev) => prev + 1)
      }

      // switch (variables.currentStep) {
      //   case STEP.STEP_ONE:
      //     setDataTeambuilding((pre) => ({
      //       step01: data?.data?.data,
      //       step02: [],
      //       step03: {},
      //       step04: {}
      //     }))

      //     break
      //   case STEP.STEP_TWO:
      //     setDataTeambuilding((pre) => ({
      //       ...pre,
      //       step02: data?.data?.data,
      //       step03: {},
      //       step04: {}
      //     }))

      //     break
      //   case STEP.STEP_THREE:
      //     setDataTeambuilding((pre) => ({
      //       ...pre,
      //       step03: data?.data?.data,
      //       step04: {}
      //     }))
      //     break
      //   case STEP.STEP_FOUR:
      //     setDataTeambuilding((pre) => ({
      //       ...pre,
      //       step04: data?.data?.data
      //     }))
      //     setExpandStep((prev) => [...prev, variables.currentStep])
      //     break

      //   default:
      //     break
      // }
      setTimeout(() => {
        typeof variables.fnCallback === 'function' && variables.fnCallback()
      }, 500)
    },
    onError(error, variables, context) {}
  })

  const mResetStep = useMutation({
    mutationKey: ['reset_step'],
    mutationFn: (data: TStepPayload<T>) => postStep({ ...data, data: {} }),
    onSuccess(data, variables, context) {
      // set CompleteStep but remove completed of next steps

      switch (variables.currentStep) {
        case STEP.STEP_ONE:
          setDataTeambuilding((pre) => ({
            step01: data?.data?.data,
            step02: [],
            step03: {},
            step04: {}
          }))

          break
        case STEP.STEP_TWO:
          setDataTeambuilding((pre) => ({
            ...pre,
            step02: data?.data?.data,
            step03: {},
            step04: {}
          }))

          break
        case STEP.STEP_THREE:
          setDataTeambuilding((pre) => ({
            ...pre,
            step03: data?.data?.data,
            step04: {}
          }))
          break
        case STEP.STEP_FOUR:
          // expandStep.includes(variables.currentStep) && setActiveStep(variables.currentStep)
          setActiveStep((prev) => prev + 1)

          setDataTeambuilding((pre) => ({
            ...pre,
            step04: data?.data?.data
          }))
          break

        default:
          break
      }
      setTimeout(() => {
        typeof variables.fnCallback === 'function' && variables.fnCallback()
      }, 500)
    },
    onError(error, variables, context) {}
  })

  const qGetCurrentStep = useQuery({
    queryKey: [`active_step_${query.stepId}`],

    enabled: Object.keys(query).length > 0,
    queryFn: () => getStep(query)
  })

  return { mCreate, qGetCurrentStep, mResetStep }
}
