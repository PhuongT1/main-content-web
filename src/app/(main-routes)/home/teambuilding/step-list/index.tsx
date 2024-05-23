'use client'

import { Grid } from '@mui/material'

import Step_TBuidling_1 from './step_01'
import Step_TBuidling_2 from './step_02'

//css
import { dataDeckActive } from '@/atoms/home/teambuilding'
import { createContext, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import Step_TBuidling_3 from './step_03'
import Step_TBuidling_4 from './step_04'
import StepLabel from './step_04/step-label'
import { useQuery } from '@tanstack/react-query'
import { getAllActiveStep, getSteps } from '@/services/deck.service'
import { DeckProject, DeckProjectId, StepProject } from '@/types/deck.type'
import { TEAMBUILDING_QUERY_KEY } from '@/constants/teambuilding/teambuilding.constant'
import Home from '@/assets/icons/home'
import HomePageLayout from '@/components/home/layout'
import Layout_IR_Teambuilding from '../IR-deck'
import { ModalIR } from '@/components/dialog/modal-deck'
import useToggle from '@/hooks/use-toggle'
import { useLanguage } from '@/hooks/use-language'
// ----------------------------------------------------------------------

export const TeambuildingProjectContext = createContext<DeckProjectId>({})

export enum StepPosition {
  Step01 = 1,
  Step02 = 2,
  Step03 = 3,
  Step04 = 4
}

export const TeambuldingEnumId = {
  StepPosition,
  DeckId: 1
}

function StepList({ projectId }: DeckProjectId) {
  const { dict } = useLanguage()
  const deckID: DeckProject = { deckId: TeambuldingEnumId.DeckId }
  const [, setDataDeckActive] = useRecoilState(dataDeckActive)

  const [active, setActive] = useState(0)
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  const breadcrumb = [
    { icon: <Home stroke='#ffffff' /> },
    { label: dict.project, title: dict.naming_breadcrumb_title },
    { label: 'DECK', title: dict.idea_4_basic_operation }
  ]

  const defaultSteps = [
    {
      title: 'Step 1',
      subtTitle: dict.teambuilding_ceo,
      description: <Step_TBuidling_1 />
    },
    {
      title: 'Step 2',
      subtTitle: dict.teambuilding_members,
      description: <Step_TBuidling_2 />
    },
    {
      title: 'Step 3',
      subtTitle: dict.teambuilding_company,
      description: <Step_TBuidling_3 />
    },
    {
      title: 'Step 4',
      subtTitle: <StepLabel />,
      description: <Step_TBuidling_4 />
    }
  ]

  const { data } = useQuery({
    queryKey: [`step-list-teambuilding-${projectId}`, deckID],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, DeckProject] }) => getSteps(param),
    meta: {
      offLoading: true
    }
  })

  const { data: dataListActive } = useQuery({
    queryKey: [TEAMBUILDING_QUERY_KEY.TEAM_BUILDING_ALL_ACTIVE_STEP, { projectId, deckId: TeambuldingEnumId.DeckId }],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, StepProject] }) => getAllActiveStep<unknown[]>(param),
    enabled: !!projectId && !!TeambuldingEnumId.DeckId,
    staleTime: 0
  })

  useEffect(() => {
    dataListActive && setActive(dataListActive?.length)
  }, [dataListActive])

  useEffect(() => {
    data && setDataDeckActive(data)
  }, [data])

  return (
    <TeambuildingProjectContext.Provider value={{ projectId }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {data && (
            <HomePageLayout
              breadcumbs={breadcrumb}
              title={dict.teambuilding}
              stepList={defaultSteps}
              active={active}
              onClickPreviewButton={toggleShowDialog}
            />
          )}
        </Grid>
        <ModalIR
          open={showDialog}
          onCancel={toggleShowDialog}
          onSubmit={() => {
            setToggleShowDialog(false)
          }}
        >
          <Layout_IR_Teambuilding />
        </ModalIR>
      </Grid>
    </TeambuildingProjectContext.Provider>
  )
}

export default StepList
