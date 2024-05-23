'use client'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import Home from '@/assets/icons/home'
import StepItem, { StepList } from '@/components/home/step'
import Step_01_Swot from '../../step_01'
import Step_02_Swot from '../../step_02'
import Step_03_Swot from '../../step_03'
import { useQuery } from '@tanstack/react-query'
import { DeckProject, StepProject } from '@/types/deck.type'
import { useRecoilState } from 'recoil'
import { SloganAtom, SloganAtomType } from '../../swot-atom'
import { getAllActiveStep, getSteps } from '@/services/deck.service'
import { DEFAULT_STEP_SWOT } from '@/constants/swot.constant'
import PageHeader from '@/components/page-header'
import Breadcrumb, { IBreadcrumbItem } from '@/components/breadcrumb'
import useToggle from '@/hooks/use-toggle'
import { ModalIR } from '@/components/dialog/modal-deck'
import Layout_IR_Swot from '../../IR-deck'
import { useLanguage } from '@/hooks/use-language'

interface Props {
  projectId: number
}

const SwotPage = ({ projectId }: Props) => {
  const [, setSloganStep] = useRecoilState(SloganAtom)
  const [active, setActive] = useState(0)
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  const { data } = useQuery({
    queryKey: [`step-list-swot`, { deckId: DEFAULT_STEP_SWOT.deckId }],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, DeckProject] }) => getSteps(param)
  })

  const { dict } = useLanguage()

  useEffect(() => {
    if (data) {
      setSloganStep(data.map((item: any) => ({ deckId: item.deckId, stepId: item.id })) as SloganAtomType)
    }
  }, [data])

  const { data: dataListActive } = useQuery({
    queryKey: ['step-list-swot-active', { deckId: DEFAULT_STEP_SWOT.deckId, projectId }],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, StepProject] }) => getAllActiveStep<any[]>(param),
    enabled: !!DEFAULT_STEP_SWOT?.deckId && !!projectId,
    staleTime: 0
  })

  useEffect(() => {
    dataListActive && setActive(dataListActive?.length)
  }, [dataListActive])

  const steps: StepList[] = [
    {
      title: <>Step 1</>,
      subtTitle: <>{dict.swot_internal_environmental}</>,
      description: <Step_01_Swot projectId={projectId} />
    },
    {
      title: <>Step 2</>,
      subtTitle: <>{dict.swot_analysis}</>,
      description: <Step_02_Swot projectId={projectId} />
    },
    {
      title: <>Step 3</>,
      subtTitle: <>{dict.swot_strategy}</>,
      description: <Step_03_Swot projectId={projectId} />
    }
  ]

  const breadcrumbList: IBreadcrumbItem[] = [
    { icon: <Home stroke='#ffffff' /> },
    { label: '프로젝트', title: '사회적 문제 해결을 위한 직장인 대상 해양 액티비티 선택 플랫폼' },
    { label: 'DECK', title: 'SWOT 분석' }
  ]


  return (
    <Box>
      <Breadcrumb list={breadcrumbList} />
      <PageHeader title={dict.swot_analysis} />
      <StepItem stepList={steps} active={active} onClickPreviewButton={toggleShowDialog} />
      <ModalIR
        open={showDialog}
        onCancel={toggleShowDialog}
        onSubmit={() => {
          setToggleShowDialog(false)
        }}
      >
        <Layout_IR_Swot data={dataListActive} />
      </ModalIR>
    </Box>
  )
}
export default SwotPage
