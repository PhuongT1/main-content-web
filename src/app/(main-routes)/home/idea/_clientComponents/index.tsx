'use client'
import { StepList } from '@/components/home/step'

import HomePageLayout from '@/components/home/layout'
import Idia_Step_01 from './step_01'
import Idia_Step_02 from './step_02'
import Idia_Step_03 from './step_03'
import { DeckProject, DeckProjectId, StepActivity, StepProject } from '@/types/deck.type'
import { DEFAULT_STEP_IDEA } from '@/constants/idea.constant'
import { useRecoilState } from 'recoil'
import { dataDeckActive, dataIdea } from '@/atoms/home/idea'
import { createContext, useEffect, useState } from 'react'
import { getAllActiveStep, getSteps } from '@/services/deck.service'
import { useQuery } from '@tanstack/react-query'
import { isEmpty } from '@/utils/object'
import { Home } from '@mui/icons-material'
import { ModalIR } from '@/components/dialog/modal-deck'
import Layout_IR_Idea from '../IR-deck'
import useToggle from '@/hooks/use-toggle'
import { useLanguage } from '@/hooks/use-language'

export const IdeaProjectContext = createContext<DeckProjectId>({})
  
  const IdeaPage = ({ projectId }: DeckProjectId) => {
    const  { dict } = useLanguage()
    const breadcrumb = [
      { icon: <Home stroke='#ffffff' /> },
      { label: dict.project, title: dict.naming_breadcrumb_title },
      { label: 'DECK', title: dict.idea_4_basic_operation }
    ]
    const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const deckID: DeckProject = { deckId: DEFAULT_STEP_IDEA.deckId }
  const [, setDataIdea] = useRecoilState(dataIdea)
  const [, setDataDeckActive] = useRecoilState(dataDeckActive)

  const [active, setActive] = useState(0)

  const { data } = useQuery({
    queryKey: [`step-list-idea-${projectId}`, deckID],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, DeckProject] }) => getSteps(param),
    meta: {
      offLoading: true
    }
  })

  const { data: dataListActive } = useQuery({
    queryKey: ['', { deckId: DEFAULT_STEP_IDEA.deckId, projectId }],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, StepProject] }) => getAllActiveStep<any[]>(param),
    enabled: !!DEFAULT_STEP_IDEA?.deckId && !!projectId,
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
      setDataIdea({
        Idea: { deckId: data[0].deckId, stepId: data[0].id } as StepActivity<any>,
        CreateIdea: { deckId: data[1].deckId, stepId: data[1].id } as StepActivity<any>,
        ChoiceIdea: { deckId: data[2].deckId, stepId: data[2].id } as StepActivity<any>
      })
    }
  }, [data])

  const steps: StepList[] = [
    {
      title: dict.step_1,
      subtTitle: dict.idea,
      description: <Idia_Step_01 />
    },
    {
      title: dict.step_2,
      subtTitle: dict.idea_generation,
      description: <Idia_Step_02 />
    },
    {
      title: dict.step_3,
      subtTitle: dict.idea_selection,
      description: <Idia_Step_03 />
    }
  ]

  return (
    <IdeaProjectContext.Provider value={{ projectId }}>
      <HomePageLayout
        breadcumbs={breadcrumb}
        title={dict.idea_4_basic_operation}
        stepList={steps}
        active={active}
        onClickPreviewButton={toggleShowDialog}
      />
      <ModalIR
        open={showDialog}
        onCancel={toggleShowDialog}
        onSubmit={() => {
          setToggleShowDialog(false)
        }}
      >
        <Layout_IR_Idea />
      </ModalIR>
    </IdeaProjectContext.Provider>
  )
}
export default IdeaPage
