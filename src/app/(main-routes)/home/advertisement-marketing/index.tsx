'use client'
import { createContext, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { useQuery } from '@tanstack/react-query'
import { Box } from '@mui/material'
import { DeckProject, DeckProjectId, StepProject } from '@/types/deck.type'
import { getAllActiveStep, getSteps } from '@/services/deck.service'
import { dataDeckActive, projectIdPrMarketing } from '@/atoms/home/advertisement-marketing'
import { DEFAULT_STEP } from '@/constants/advertisement-marketing.constant'
import StepItem, { StepList } from '@/components/home/step'
import PageHeader from '@/components/page-header'
import Breadcrumb, { IBreadcrumbItem } from '@/components/breadcrumb'
import Home from '@/assets/icons/home'
import Step_01_AdvertisementMarketing from './step_01'
import Step_02_AdvertisementMarketing from './step_02'
import Step_03_AdvertisementMarketing from './step_03'
import Step_04_AdvertisementMarketing from './step_04'
import Step_05_AdvertisementMarketing from './step_05'
import { ModalIR } from '@/components/dialog/modal-deck'
import useToggle from '@/hooks/use-toggle'
import Layout_IR_AdvMarketing from './IR-deck'

interface IAdvertisementMarketingPage {
  projectId: number
}

export const AdvertisementMarketingPageContext = createContext<DeckProjectId>({})

const AdvertisementMarketingPage = ({ projectId }: IAdvertisementMarketingPage) => {
  const deckID: DeckProject = { deckId: DEFAULT_STEP.deckId }
  const [, setDataDeckActive] = useRecoilState(dataDeckActive)
  const [, setProjectId] = useRecoilState(projectIdPrMarketing)

  const [showDialog, toggleShowDialog, setToggle] = useToggle()

  // =====
  useEffect(() => {
    projectId && setProjectId(Number(projectId))
  }, [projectId])

  const { data } = useQuery({
    queryKey: [`step-list-advertisement-marketing`, deckID],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, DeckProject] }) => getSteps(param),
    meta: { offLoading: true }
  })
  useEffect(() => {
    data && setDataDeckActive(data)
  }, [data])

  const { data: dataListActive } = useQuery({
    queryKey: ['', { deckId: DEFAULT_STEP.deckId, projectId }],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, StepProject] }) => getAllActiveStep(param),
    enabled: !!DEFAULT_STEP?.deckId && !!projectId
  })

  const steps: StepList[] = [
    {
      title: 'Step 1',
      subtTitle: '마케팅 목표',
      description: <Step_01_AdvertisementMarketing />
    },
    {
      title: 'Step 2',
      subtTitle: '마케팅 전략',
      description: <Step_02_AdvertisementMarketing />
    },
    {
      title: 'Step 3',
      subtTitle: '마케팅 홍보 채널',
      description: <Step_03_AdvertisementMarketing />
    },
    {
      title: 'Step 4',
      subtTitle: '마케팅 KPI',
      description: <Step_04_AdvertisementMarketing />
    },
    {
      title: 'Step 5',
      subtTitle: '홍보마케팅 계획',
      description: <Step_05_AdvertisementMarketing />
    }
  ]

  const breadcrumbList: IBreadcrumbItem[] = [
    { icon: <Home stroke='#ffffff' /> },
    { label: '프로젝트', title: '사회적 문제 해결을 위한 직장인 대상 해양 액티비티 선택 플랫폼' },
    { label: 'DECK', title: '홍보마케팅' }
  ]

  // =====
  return (
    <AdvertisementMarketingPageContext.Provider value={{ projectId }}>
      <Box component={'div'}>
        <StepItem
          onClickPreviewButton={toggleShowDialog}
          breadcrumb={{ list: breadcrumbList }}
          pageHeader={{ title: '홍보마케팅' }}
          stepList={steps}
          active={dataListActive?.length}
        />
      </Box>
      <ModalIR
        open={showDialog}
        onCancel={toggleShowDialog}
        onSubmit={() => {
          setToggle(false)
        }}
      >
        <Layout_IR_AdvMarketing />
      </ModalIR>
    </AdvertisementMarketingPageContext.Provider>
  )
}
export default AdvertisementMarketingPage
