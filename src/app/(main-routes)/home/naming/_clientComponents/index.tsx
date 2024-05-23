'use client'
import Box from '@mui/material/Box'
import Step_Naming_1 from './step_01'
import StepItem, { StepList } from '@/components/home/step'
import Step2Naming from './step_02'
import Step3Naming from './step_03'
import { DEFAULT_STEP_NAMING, QUERY_KEY_ALL_STEP } from '@/constants/naming.constant'
import { getAllActiveStep, getSteps } from '@/services/deck.service'
import { DeckProject, DeckProjectId, StepProject } from '@/types/deck.type'
import { useQuery } from '@tanstack/react-query'
import { createContext, useEffect, useState } from 'react'
import { dataDeckActive } from '@/atoms/home/naming'
import { useRecoilState } from 'recoil'
import { ModalIR } from '@/components/dialog/modal-deck'
import useToggle from '@/hooks/use-toggle'
import Layout_IR_Naming from '../IR-deck'
import { useLanguage } from '@/hooks/use-language'

export const NamingContext = createContext<DeckProjectId>({})

const NamingPage = <T,>({ projectId }: DeckProjectId) => {
  const { dict } = useLanguage()
  console.log('dict phuong', dict)

  console.log('Phuong Naming')

  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const deckID: DeckProject = { deckId: DEFAULT_STEP_NAMING.deckId }
  const [, setDataDeckActive] = useRecoilState(dataDeckActive)
  const [active, setActive] = useState(0)

  const { data } = useQuery({
    queryKey: [`step-list-naming`, deckID],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, DeckProject] }) => getSteps(param),
    meta: {
      offLoading: true
    }
  })

  const { data: dataListActive } = useQuery({
    queryKey: [QUERY_KEY_ALL_STEP, { deckId: DEFAULT_STEP_NAMING.deckId, projectId }],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, StepProject] }) => getAllActiveStep<any[]>(param),
    enabled: !!DEFAULT_STEP_NAMING?.deckId && !!projectId,
    staleTime: 0
  })

  useEffect(() => {
    dataListActive && setActive(dataListActive?.length)
  }, [dataListActive])

  useEffect(() => {
    data && setDataDeckActive(data)
  }, [data])

  const steps: StepList[] = [
    {
      title: dict.step_1,
      subtTitle: dict.naming_step_1_title,
      description: <Step_Naming_1 />
    },
    {
      title: 'Step 2',
      subtTitle: dict.naming_step_2,
      description: <Step2Naming />
    },
    {
      title: 'Step 3',
      subtTitle: dict.naming_step_3,
      description: <Step3Naming />
    }
  ]

  const breadcrumb = [
    { icon: '' },
    { label: dict.project, title: dict.naming_breadcrumb_title },
    { label: 'DECK', title: dict.naming_title }
  ]

  return (
    <NamingContext.Provider value={{ projectId: Number(projectId) }}>
      <Box component={'div'}>
        <StepItem
          stepList={steps}
          active={active}
          breadcrumb={{
            list: breadcrumb
          }}
          pageHeader={{
            title: dict.naming_title
          }}
          onClickPreviewButton={() => {
            setToggleShowDialog(true)
          }}
        />
        <ModalIR
          open={showDialog}
          onCancel={toggleShowDialog}
          onSubmit={() => {
            setToggleShowDialog(false)
          }}
        >
          <Layout_IR_Naming />
        </ModalIR>
      </Box>
    </NamingContext.Provider>
  )
}
export default NamingPage
