'use client'
import { useEffect } from 'react'
import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useRecoilValue, useRecoilState } from 'recoil'
import { completeStepSelector } from '@/atoms/home/stepper'
import { STEP } from '@/constants/common.constant'
import { DEFAULT_STEP } from '@/constants/competitor-analysis'
import { TStepApi } from '@/types/step.type'
import {
  dataDiagramCompetitorSelector,
  dataDeckActive,
  projectIdCompanyAnalysis
} from '@/atoms/home/competitor-analysis'
import { getStep } from '@/services/step.service'
import Step_04_Edit from './edit'
import Step_04_View from './view'

const Step_04_CompetitorAnalysis = () => {
  const [projectId] = useRecoilState(projectIdCompanyAnalysis)
  const completeStep = useRecoilValue(completeStepSelector)
  const [, setDataStep4] = useRecoilState(dataDiagramCompetitorSelector)
  const [deckActive] = useRecoilState(dataDeckActive)

  const { data: dataStep, isFetching: isFetchingDataStep } = useQuery({
    queryKey: [`competitor-analysis-step-04`],
    queryFn: () => getStep({ ...DEFAULT_STEP, projectId, stepId: Number(deckActive[STEP.STEP_FOUR]?.id || 4) }),
    staleTime: 0,
    meta: { offLoading: true }
  })

  useEffect(() => {
    const data: any = (dataStep?.data as TStepApi) || {}
    if (!isFetchingDataStep && data) {
      setDataStep4(data?.data || { nodes: [], edges: [] })
    }
  }, [dataStep?.data, isFetchingDataStep])

  return <Box>{completeStep.includes(STEP.STEP_FOUR) ? <Step_04_View /> : <Step_04_Edit />}</Box>
}
export default Step_04_CompetitorAnalysis
