'use client'
import Box from '@mui/material/Box'
import { FC, useEffect, useState } from 'react'
import Home from '@/assets/icons/home'
import StepItem, { StepList } from '@/components/home/step'
import Step_01_Slogan from '../step_01'
import Step_02_Slogan from '../step_02'
import Step_03_Slogan from '../step_03'
import Step_04_Slogan from '../step_04'
import { DEFAULT_STEP_SLOGAN } from '@/constants/slogan.constant'
import { useQuery } from '@tanstack/react-query'
import { DeckProject, StepProject } from '@/types/deck.type'
import { useRecoilState } from 'recoil'
import { SloganAtom, SloganAtomType } from '../slogan-atom'
import { getAllActiveStep, getSteps } from '@/services/deck.service'
import Breadcrumb, { IBreadcrumbItem } from '@/components/breadcrumb'
import PageHeader from '@/components/page-header'
import { ModalIR } from '@/components/dialog/modal-deck'
import useToggle from '@/hooks/use-toggle'
import Layout_IR_Slogan from '../IR-deck'

interface Props {
  projectId: number
}
const SloganPage: FC<Props> = ({ projectId }) => {
  const [, setSloganStep] = useRecoilState(SloganAtom)
  const [active, setActive] = useState(0)
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle() // Toggle show dialog IR.

  const { data } = useQuery({
    queryKey: [`step-list-slogan`, { deckId: DEFAULT_STEP_SLOGAN.deckId }],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, DeckProject] }) => getSteps(param)
  })

  useEffect(() => {
    if (data) {
      setSloganStep(data.map((item) => ({ deckId: item.deckId, stepId: item.id })) as SloganAtomType)
    }
  }, [data])

  const { data: dataListActive } = useQuery({
    queryKey: ['step-list-slogan-active', { deckId: DEFAULT_STEP_SLOGAN.deckId, projectId }],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, StepProject] }) => getAllActiveStep<any[]>(param),
    staleTime: 0
  })

  useEffect(() => {
    dataListActive && setActive(dataListActive?.length)
  }, [dataListActive])

  const steps: StepList[] = [
    {
      title: <>Step 1</>,
      subtTitle: <>슬로건</>,
      description: <Step_01_Slogan projectId={projectId} />
    },
    {
      title: <>Step 2</>,
      subtTitle: <>슬로건 개발</>,
      description: <Step_02_Slogan projectId={projectId} />
    },
    {
      title: <>Step 3</>,
      subtTitle: <>슬로건 분석</>,
      description: <Step_03_Slogan projectId={projectId} />
    },
    {
      title: <>Step 4</>,
      subtTitle: <>브랜드 슬로건</>,
      description: <Step_04_Slogan projectId={projectId} />
    }
  ]

  const breadcrumbList: IBreadcrumbItem[] = [
    { icon: <Home stroke='#ffffff' /> },
    { label: '프로젝트', title: '사회적 문제 해결을 위한 직장인 대상 해양 액티비티 선택 플랫폼' },
    { label: 'DECK', title: '슬로건' }
  ]

  return (
    <Box component={'div'}>
      <Breadcrumb list={breadcrumbList} />
      <PageHeader title='슬로건' />
      <StepItem
        stepList={steps}
        active={active}
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
        <Layout_IR_Slogan id={projectId} />
      </ModalIR>
    </Box>
  )
}
export default SloganPage
