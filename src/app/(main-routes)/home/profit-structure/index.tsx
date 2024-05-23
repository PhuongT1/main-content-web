'use client'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { Box } from '@mui/material'
import { deckCompleteList, deckList, projectIdProfitStructure } from '@/atoms/home/profit-structure'
import { useCompleteStepList, useStepList } from './use-profit-structure'
import { useLanguage } from '@/hooks/use-language'
import StepItem, { StepList } from '@/components/home/step'
import PageHeader from '@/components/page-header'
import Breadcrumb, { IBreadcrumbItem } from '@/components/breadcrumb'
import Home from '@/assets/icons/home'
import Step_01_ProfitStructure from './step_01'
import Step_02_ProfitStructure from './step_02'
import Step_03_ProfitStructure from './step_03'
import Step_04_ProfitStructure from './step_04'
import Step_05_ProfitStructure from './step_05'

interface IProfitStructurePage {
  projectId: number
}
const ProfitStructurePage = ({ projectId }: IProfitStructurePage) => {
  const { dict } = useLanguage()
  const [, setDeckList] = useRecoilState(deckList)
  const [, setCompleteList] = useRecoilState(deckCompleteList)
  const [, setProjectId] = useRecoilState(projectIdProfitStructure)
  const { data } = useStepList()
  const { data: completedStep } = useCompleteStepList()

  // =====
  useEffect(() => {
    projectId && setProjectId(Number(projectId))
  }, [projectId])

  useEffect(() => {
    data && setDeckList(data)
  }, [data])

  useEffect(() => {
    completedStep && setCompleteList(completedStep)
  }, [completedStep])

  const steps: StepList[] = [
    {
      title: 'Step 1',
      subtTitle: dict.profit_step1_title1,
      description: <Step_01_ProfitStructure />
    },
    {
      title: 'Step 2',
      subtTitle: dict.profit_step2_title1,
      description: <Step_02_ProfitStructure />
    },
    {
      title: 'Step 3',
      subtTitle: dict.profit_step3_title1,
      description: <Step_03_ProfitStructure />
    },
    {
      title: 'Step 4',
      subtTitle: dict.profit_step4_title1,
      description: <Step_04_ProfitStructure />
    },
    {
      title: 'Step 5',
      subtTitle: dict.profit_step5_title1,
      description: <Step_05_ProfitStructure />
    }
  ]

  const breadcrumbList: IBreadcrumbItem[] = [
    { icon: <Home stroke='#ffffff' /> },
    { label: dict.project, title: dict.profit_breadcrumb_title1 },
    { label: 'DECK', title: dict.profit_breadcrumb_title2 }
  ]

  // =====
  return (
    <Box component={'div'}>
      <Breadcrumb list={breadcrumbList} />
      <PageHeader title={dict.profit_breadcrumb_title2} />
      {completedStep && <StepItem stepList={steps} active={completedStep?.length} />}
    </Box>
  )
}
export default ProfitStructurePage
