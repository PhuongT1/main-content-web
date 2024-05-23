'use client'
import MenuIcon from '@/assets/icons/team-building/menu'
import Breadcrumb from '@/components/breadcrumb'
import StepItem, { StepList } from '@/components/home/step'
import PageHeader from '@/components/page-header'
import { getAllActiveStep } from '@/services/deck.service'
import { StepProject } from '@/types/deck.type'
import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { DEFAULT_STEP_BUSINESS_MODEL } from '../constants/business.constant'
import Step_01_BusinessModel from '../step_01'
import Step_02_BusinessModel from '../step_02'

const BusinessModel = ({ projectId }: { projectId: number }) => {
  console.log('projectId', projectId)
  const [active, setActive] = useState(0)

  const steps: StepList[] = [
    {
      title: 'Step 1',
      subtTitle: '비즈니스 모델 캔버스',
      description: <Step_01_BusinessModel {...{ projectId }} />
    },
    {
      title: 'Step 2',
      subtTitle: '비즈니스 모델',
      description: <Step_02_BusinessModel {...{ projectId }} />
    }
  ]

  const { data: dataListActive } = useQuery({
    queryKey: ['', { ...DEFAULT_STEP_BUSINESS_MODEL, projectId }],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, StepProject] }) => getAllActiveStep<any[]>(param),
    enabled: !!DEFAULT_STEP_BUSINESS_MODEL?.deckId && !!projectId,
    staleTime: 0
  })

  useEffect(() => {
    dataListActive && setActive(dataListActive?.length)
  }, [dataListActive])

  return (
    <Box component={'div'}>
      <Breadcrumb list={[{ icon: <MenuIcon /> }, { label: '리스트', title: '리스트' }]} />
      <PageHeader title='비즈니스 모델' />
      <StepItem stepList={steps} active={active} />
    </Box>
  )
}
export default BusinessModel
