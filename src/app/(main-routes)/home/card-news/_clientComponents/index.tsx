'use client'
import Home from '@/assets/icons/home'
import { allCardData, dataDeckActive } from '@/atoms/home/card-news'
import Breadcrumb from '@/components/breadcrumb'
import StepItem, { StepList } from '@/components/home/step'
import PageHeader from '@/components/page-header'
import { getSteps } from '@/services/step.service'
import { DeckProject, DeckProjectId } from '@/types/deck.type'
import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { createContext, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { useGetData } from '../hooks/useCardNews'
import { DEFAULT_STEP } from '../utils/common'
import CardNewsStep1 from './step_01'

const breadcrumb = [
  { icon: <Home stroke='#ffffff' /> },
  { label: '프로젝트', title: '사회적 문제 해결을 위한 직장인 대상 해양 액티비티 선택 플랫폼' },
  { label: 'DECK', title: '카드뉴스' }
]
interface CardNewsContext {
  expandKey: string
  setExpandKey: (key: string) => void
}
export const CardNewsContext = createContext<CardNewsContext>({} as CardNewsContext)

const CardNewsPage = ({ projectId }: DeckProjectId) => {
  const deckID: DeckProject = { deckId: DEFAULT_STEP.deckId }
  const [, setDataDeckActive] = useRecoilState(dataDeckActive)
  const { data: allData, refetch } = useGetData(projectId as number)
  const [, setAllData] = useRecoilState(allCardData)
  const [expandKey, setExpandKey] = useState('')

  const { data } = useQuery({
    queryKey: [`step-list-idea`, deckID],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, DeckProject] }) => getSteps(param)
  })

  useEffect(() => {
    const stepDeck = data?.data[0]
    if (stepDeck) {
      setDataDeckActive({
        deckId: stepDeck?.deckId,
        stepId: stepDeck?.id
      })
      refetch()
    }
  }, [data])

  useEffect(() => {
    if (allData) {
      setAllData(allData?.data as any)
    }
  }, [allData])

  const steps: StepList[] = [
    {
      title: 'Step 1',
      subtTitle: '카드뉴스',
      description: <CardNewsStep1 projectId={projectId} />
    }
  ]

  return (
    <CardNewsContext.Provider
      value={{
        expandKey: expandKey,
        setExpandKey: setExpandKey
      }}
    >
      <Box component={'div'}>
        <Breadcrumb list={breadcrumb} />
        <PageHeader title='리스트 카드뉴스' />
        <StepItem stepList={steps} />
      </Box>
    </CardNewsContext.Provider>
  )
}
export default CardNewsPage
