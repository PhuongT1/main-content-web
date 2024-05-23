'use client'
import Box from '@mui/material/Box'
import Step_Naming_1 from './step_01'
import StepItem, { StepList } from '@/components/home/step'
import { Suspense, createContext, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import Step2Customer from './step_02'
import Step3Customer from './step_03'
import Step4Customer from './step_04'
import PageHeader from '@/components/page-header'
import Breadcrumb from '@/components/breadcrumb'
import { deckCompleteList, deckList } from '@/atoms/home/customer'
import { useCompleteStepList, useStepList } from './use-customer'
import { ModalIR } from '@/components/dialog/modal-deck'
import useToggle from '@/hooks/use-toggle'
import Layout_IR_Customer from '../IR-deck'
import { DeckProjectId } from '@/types/deck.type'
// import LoadingPhuong from '../[projectId]/loading-1'
// import GlobalLoading from '@/layouts/loading'

export const CustomerServicePageContext = createContext<DeckProjectId>({})

const CustomerServicePage = <T,>({ projectId }: DeckProjectId) => {
  const [, setDeckList] = useRecoilState(deckList)
  const [, setCompleteList] = useRecoilState(deckCompleteList)

  const { data } = useStepList()
  const { data: completedStep } = useCompleteStepList({ projectId })
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  useEffect(() => {
    data && setDeckList(data)
  }, [data])

  useEffect(() => {
    completedStep && setCompleteList(completedStep)
  }, [completedStep])

  const steps: StepList[] = [
    {
      title: 'Step 1',
      subtTitle: '가상의 타깃고객',
      description: <Step_Naming_1 />
    },
    {
      title: 'Step 2',
      subtTitle: '타깃고객 프로파일',
      description: <Step2Customer />
    },
    {
      title: 'Step 3',
      subtTitle: '타깃고객 구매행동 및 패턴',
      description: <Step3Customer />
    },
    {
      title: 'Step 4',
      subtTitle: '구매여정 디자인',
      description: <Step4Customer />
    }
  ]

  const breadcrumb = [
    { icon: '' },
    { label: '프로젝트', title: '사회적 문제 해결을 위한 직장인 대상 해양 액티비티 선택 플랫폼' },
    { label: 'DECK', title: '고객 페르소나' }
  ]

  return (
    <CustomerServicePageContext.Provider value={{ projectId: Number(projectId) }}>
      <Box component={'div'}>
        <Breadcrumb list={breadcrumb} />
        <PageHeader title='고객 페르소나' />
        {completedStep && (
          <StepItem
            stepList={steps}
            active={completedStep?.length}
            onClickPreviewButton={() => {
              setToggleShowDialog(true)
            }}
          />
        )}
        <ModalIR
          open={showDialog}
          onCancel={toggleShowDialog}
          onSubmit={() => {
            setToggleShowDialog(false)
          }}
        >
          <Layout_IR_Customer />
        </ModalIR>
      </Box>
      {/* <GlobalLoading /> */}
    </CustomerServicePageContext.Provider>
  )
}

export default CustomerServicePage
