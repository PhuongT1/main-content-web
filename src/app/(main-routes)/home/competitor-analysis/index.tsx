'use client'
import {
  dataCompanyAnalyzingStep1,
  dataCompanyAnalyzingStep2,
  dataDeckActive,
  projectIdCompanyAnalysis
} from '@/atoms/home/competitor-analysis'
import StepItem, { StepList } from '@/components/home/step'
import PageHeader from '@/components/page-header'
import Breadcrumb, { IBreadcrumbItem } from '@/components/breadcrumb'
import Home from '@/assets/icons/home'
import { DEFAULT_STEP } from '@/constants/competitor-analysis'
import { STEP } from '@/constants/common.constant'
import { getAllActiveStep, getSteps } from '@/services/deck.service'
import { IFormValuesStepOne, IFormValuesStepTwo } from '@/types/competitor-analysis.type'
import { StepProject, DeckProject } from '@/types/deck.type'
import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import Step_01_CompetitorAnalysis from './step_01'
import Step_02_CompetitorAnalysis from './step_02'
import Step_03_CompetitorAnalysis from './step_03'
import Step_04_CompetitorAnalysis from './step_04'

interface ICompetitorAnalysisPage {
  projectId: number
}
const CompetitorAnalysisPage = ({ projectId }: ICompetitorAnalysisPage) => {
  const [active, setActive] = useState(0)
  const [, setDataStep1] = useRecoilState(dataCompanyAnalyzingStep1)
  const [, setDataStep2] = useRecoilState(dataCompanyAnalyzingStep2)
  const [, setProjectId] = useRecoilState(projectIdCompanyAnalysis)
  const [deckActive, setDataDeckActive] = useRecoilState(dataDeckActive)

  const steps: StepList[] = [
    {
      title: 'Step 1',
      subtTitle: '경쟁사',
      description: <Step_01_CompetitorAnalysis />
    },
    {
      title: 'Step 2',
      subtTitle: '경쟁사 분석',
      description: <Step_02_CompetitorAnalysis />
    },
    {
      title: 'Step 3',
      subtTitle: '경쟁사 비교',
      description: <Step_03_CompetitorAnalysis />
    },
    {
      title: 'Step 4',
      subtTitle: '포지셔닝 맵',
      description: <Step_04_CompetitorAnalysis />
    }
  ]

  const breadcrumbList: IBreadcrumbItem[] = [
    { icon: <Home stroke='#ffffff' /> },
    { label: '프로젝트', title: '사회적 문제 해결을 위한 직장인 대상 해양 액티비티 선택 플랫폼' },
    { label: 'DECK', title: '경쟁사 분석' }
  ]

  // =====
  useEffect(() => {
    projectId && setProjectId(Number(projectId))
  }, [projectId])

  // set step id
  const { data: dataListStep } = useQuery({
    queryKey: [`step-list-competitor-analysis`, { deckId: DEFAULT_STEP.deckId }],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, DeckProject] }) => getSteps(param),
    meta: { offLoading: true }
  })
  useEffect(() => {
    dataListStep && setDataDeckActive(dataListStep)
  }, [dataListStep])

  // set active current step
  const { data: dataListActive = [] } = useQuery({
    queryKey: ['step-data-competitor-analysis', { deckId: DEFAULT_STEP.deckId, projectId }],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, StepProject] }) => getAllActiveStep<any[]>(param),
    enabled: !!DEFAULT_STEP?.deckId && !!projectId,
    staleTime: 0
  })
  useEffect(() => {
    if (deckActive.length === 0) return
    const stepOneId = deckActive[STEP.STEP_ONE]?.id || 1
    const stepTwoId = deckActive[STEP.STEP_TWO]?.id || 2
    const stepFourId = deckActive[STEP.STEP_FOUR]?.id || 4

    const filteredDataListActive = dataListActive.filter((data: any) => {
      if (data?.stepId === stepFourId && dataListActive.length < 4) return false
      if (data?.stepId === stepTwoId) setDataStep2(data?.data as unknown as IFormValuesStepTwo)
      if (data?.stepId === stepOneId) {
        setDataStep1(data?.data as unknown as IFormValuesStepOne)
        if (!data?.data?.industry) return false
      }
      return true
    })

    setActive(filteredDataListActive.length || 0)
  }, [dataListActive, deckActive])

  // =====
  return (
    <Box component={'div'}>
      <Breadcrumb list={breadcrumbList} />
      <PageHeader title='경쟁사 분석' />

      <StepItem stepList={steps} active={active} />
    </Box>
  )
}
export default CompetitorAnalysisPage
