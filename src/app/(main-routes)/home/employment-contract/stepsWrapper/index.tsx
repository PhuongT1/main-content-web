'use client'
import React from 'react'
import Step01 from '../step_01'
import { Box } from '@mui/material'
import Breadcrumb from '@/components/breadcrumb'
import PageHeader from '@/components/page-header'
import StepItem, { StepList } from '@/components/home/step'
import Home from '@/assets/icons/home'

interface StepsWrapperProps {
  projectId: number
}
const breadcrumb = [
  { icon: <Home stroke='#ffffff' /> },
  { label: '프로젝트', title: '사회적 문제 해결을 위한 직장인 대상 해양 액티비티 선택 플랫폼' },
  { label: 'DECK', title: '근로계약' }
]

const StepsWrapper: React.FC<StepsWrapperProps> = ({ projectId }) => {
  const steps: StepList[] = [
    {
      title: 'Step 1',
      subtTitle: '근로계약서',
      description: <Step01 projectId={projectId} />
    }
  ]

  return (
    <Box component={'div'}>
      <Breadcrumb list={breadcrumb} />
      <PageHeader title='근로계약' />
      <StepItem stepList={steps} />
    </Box>
  )
}

export default StepsWrapper
