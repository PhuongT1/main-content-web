'use client'
import Box from '@mui/material/Box'
import { FC, useEffect, useMemo, useState } from 'react'
import Home from '@/assets/icons/home'
import StepItem, { StepList } from '@/components/home/step'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'
import Step_01_Survey from '../step_01'
import { DEFAULT_STEP_SURVEY } from '@/constants/survey.constant'
import Step_02_Survey from '../step_02'
import { activeStepSelector, completeStepSelector } from '@/atoms/home/stepper'
import { getSurveyWithProjectId } from '@/services/survey.service'
import Breadcrumb, { IBreadcrumbItem } from '@/components/breadcrumb'
import PageHeader from '@/components/page-header'

interface Props {
  projectId: number
}

const SurveyPage: FC<Props> = ({ projectId }) => {
  const queryClient = useQueryClient()
  const [active, setActive] = useState(0)
  const [, setActiveStep] = useRecoilState(activeStepSelector)
  const [, setCompleteStep] = useRecoilState(completeStepSelector)
  // const [, setExpandStep] = useRecoilState(expandStepSelector)

  const { data, refetch } = useQuery({
    queryKey: [`get-survey-with-project-id`, projectId],
    queryFn: () => getSurveyWithProjectId(projectId),
    retry: false
  })

  const onResetSurvey = () => {
    queryClient.setQueryData([`get-survey-with-project-id`, projectId], null)
  }

  useEffect(() => {
    if (data) {
      setCompleteStep([0])
      setActiveStep(1)
    } else {
      setCompleteStep([])
      setActive(0)
      setActiveStep(0)
    }
  }, [data])

  const steps: StepList[] = useMemo(
    () => [
      {
        title: <>Step 1</>,
        subtTitle: <>설문조사 만들기</>,
        description: <Step_01_Survey id={projectId} onCreatedSurvey={() => refetch()} />,
        isHide: !!data
      },
      {
        title: <>Step 2</>,
        subtTitle: <>설문조사 결과</>,
        description: data && (
          <Step_02_Survey dataSurvey={data} refetchSurvey={() => refetch()} onResetSurvey={() => onResetSurvey()} />
        )
      }
    ],
    [data]
  )

  const breadcrumbList: IBreadcrumbItem[] = [
    { icon: <Home stroke='#ffffff' /> },
    { label: '프로젝트', title: '사회적 문제 해결을 위한 직장인 대상 해양 액티비티 선택 플랫폼' },
    { label: 'DECK', title: '설문조사' }
  ]

  return (
    <Box component={'div'}>
      <Breadcrumb list={breadcrumbList} />
      <PageHeader title='설문조사' />
      <StepItem stepList={steps} active={active} />
    </Box>
  )
}
export default SurveyPage
