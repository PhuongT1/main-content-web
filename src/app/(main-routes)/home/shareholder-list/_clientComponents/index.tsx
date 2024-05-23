'use client'
import Box from '@mui/material/Box'
import StepItem, { StepList } from '@/components/home/step'
import { createContext, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import Step2Shareholder from './step_02'
import StepShareholder from './step_01'
import PageHeader from '@/components/page-header'
import Breadcrumb from '@/components/breadcrumb'
import { deckCompleteList, deckList } from '@/atoms/home/customer'
import { useCompleteStepList, useStepList } from './hooks/use-shareholder-list'
import { DeckProjectId } from '@/types/deck.type'

export const ProjectIdContext = createContext<DeckProjectId>({})

const ShareholderListPage = ({ projectId }: DeckProjectId) => {
  const [, setDeckList] = useRecoilState(deckList)
  const [, setCompleteList] = useRecoilState(deckCompleteList)

  const { data } = useStepList()
  const { data: completedStep } = useCompleteStepList(projectId as number)

  useEffect(() => {
    data && setDeckList(data)
  }, [data])

  useEffect(() => {
    completedStep && setCompleteList(completedStep)
  }, [completedStep])

  const steps: StepList[] = [
    {
      title: 'Step 1',
      subtTitle: '기본 정보',
      description: <StepShareholder />
    },
    {
      title: 'Step 2',
      subtTitle: '주주명부',
      description: <Step2Shareholder />
    }
  ]

  const breadcrumb = [
    { icon: '' },
    { label: '프로젝트', title: '사회적 문제 해결을 위한 직장인 대상 해양 액티비티 선택 플랫폼' },
    { label: 'DECK', title: '주주명부' }
  ]

  return (
    <Box component={'div'}>
      <ProjectIdContext.Provider value={{ projectId }}>
        <Breadcrumb list={breadcrumb} />
        <PageHeader title='주주명부' />
        {completedStep && <StepItem stepList={steps} active={completedStep?.length} />}
      </ProjectIdContext.Provider>
    </Box>
  )
}

export default ShareholderListPage
