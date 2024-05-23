'use client'
import { StepList } from '@/components/home/step'

import HomePageLayout from '@/components/home/layout'
import { DeckProject, StepProject } from '@/types/deck.type'
import { useRecoilState } from 'recoil'
import { useEffect, useState } from 'react'
import { getAllActiveStep, getSteps } from '@/services/deck.service'
import { useQuery } from '@tanstack/react-query'
import { isEmpty } from '@/utils/object'
import { Home } from '@mui/icons-material'
import SA_Step_01 from './step_01'
import { DEFAULT_STEP_SA } from '@/constants/strength-analysis.constant'
import SA_Step_02 from './step_02'
import { dataDeckActive } from '@/atoms/home/strength-analysis'
import SA_Step_03 from './step_03'

const breadcrumb = [
  { icon: <Home stroke='#ffffff' /> },
  { label: '프로젝트', title: '사회적 문제 해결을 위한 직장인 대상 해양 액티비티 선택 플랫폼' },
  { label: 'DECK', title: '강점분석' }
]

const SAPage = () => {
  const deckID: DeckProject = { deckId: DEFAULT_STEP_SA.deckId }
  const [, setDataDeckActive] = useRecoilState(dataDeckActive)

  const [active, setActive] = useState(0)

  const { data } = useQuery({
    queryKey: [`step-list-sa`, deckID],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, DeckProject] }) => getSteps(param),
    meta: {
      offLoading: true
    }
  })

  const { data: dataListActive } = useQuery({
    queryKey: ['', DEFAULT_STEP_SA],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, StepProject] }) => getAllActiveStep<any[]>(param),
    enabled: !!DEFAULT_STEP_SA?.deckId && !!DEFAULT_STEP_SA?.projectId,
    staleTime: 0
  })

  useEffect(() => {
    if (dataListActive) {
      const stepHaveData = dataListActive?.filter((step) => !isEmpty(step.data ?? {})) ?? []

      setActive(stepHaveData?.length)
    }
  }, [dataListActive])

  useEffect(() => {
    if (data) {
      setDataDeckActive(data)
    }
  }, [data])

  const steps: StepList[] = [
    {
      title: 'Step 1',
      subtTitle: '나의 강점유형',
      description: <SA_Step_01 />
    },
    {
      title: 'Step 2',
      subtTitle: '강점유형 분석',
      description: <SA_Step_02 />
    },
    {
      title: 'Step 3',
      subtTitle: '분석결과 리포트',
      description: <SA_Step_03 />
    }
  ]

  return <HomePageLayout breadcumbs={breadcrumb} title='강점분석' stepList={steps} active={active} />
}
export default SAPage
