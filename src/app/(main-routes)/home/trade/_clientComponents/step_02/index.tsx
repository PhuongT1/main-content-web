import { completeStepSelector } from '@/atoms/home/stepper'
import { dataTrade } from '@/atoms/home/trade'
import { DEFAULT_STEP_NAMING } from '@/constants/naming.constant'
import { getActiveStep } from '@/services/deck.service'
import { StepActivity, StepProject } from '@/types/deck.type'
import { ITradeCopyBrandForm, TradeDeck } from '@/types/trade.type'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useRecoilState, useRecoilValue } from 'recoil'
import Step2Edit from './edit-step'
import Step2View from './view-step'
import { Box } from '@mui/material'
import { DEFAULT_STEP_TRADE } from '@/constants/trade.constant'
import { STEP } from '@/constants/common.constant'

const Step2Naming = ({ projectId }: { projectId: number }) => {
  const [completeStep, setCompleteStep] = useRecoilState(completeStepSelector)
  const [{ tradeCopyBrand }, setDataTrade] = useRecoilState(dataTrade)

  const { data } = useQuery({
    queryKey: [
      `trade-deck-step2-${projectId}`,
      {
        deckId: DEFAULT_STEP_TRADE?.deckId,
        stepId: 2,
        projectId: projectId
      }
    ],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, StepProject] }) =>
      getActiveStep<ITradeCopyBrandForm>(param),
    enabled: true
  })

  useEffect(() => {
    if (data) {
      setDataTrade((pre: any) => ({
        ...pre,
        tradeCopyBrand: { ...tradeCopyBrand, data: data?.data || {} } as StepActivity<ITradeCopyBrandForm>
      }))
      if (Object.keys(data?.data || {}).length > 0) {
        setCompleteStep((pre) => {
          if (!pre.includes(STEP.STEP_TWO)) {
            return [...pre, STEP.STEP_TWO]
          }
          return pre
        })
      }
    }
  }, [data])

  return <Box>{!completeStep.includes(1) ? <Step2Edit projectId={projectId + ''} /> : <Step2View />}</Box>
}
export default Step2Naming
