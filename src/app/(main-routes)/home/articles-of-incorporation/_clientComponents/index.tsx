'use client'
import StepItem, { StepList } from '@/components/home/step'
import { Grid } from '@mui/material'
import { memo, useEffect } from 'react'
import BasicInformationArticiesOfNcorporationEdit from './step-01/basic-infomation-edit'
import { getStep } from '@/services/step.service'
import { DECK_ID } from './constant'
import { useQuery } from '@tanstack/react-query'
import { IAriticiesOfIncorporationStep1 } from '@/types/articies-of-incorporation.type'
import { useRecoilState, useRecoilValue } from 'recoil'
import { completeStepSelector } from '@/atoms/home/stepper'
import { STEP } from '@/constants/common.constant'
import BasicInformationArticiesOfIncorporationView from './step-01/basic-information-view'
import ViewArticlesOfIncorporationPage from './step-02'
import { projectIdArticleOfIncorporation } from '@/atoms/home/articles-of-incorporation'

interface IArticlesOfNcorporationPage {
  projectId: number
}

const ArticlesOfNcorporationPage = ({ projectId }: IArticlesOfNcorporationPage) => {
  const [, setProjectId] = useRecoilState(projectIdArticleOfIncorporation)

  const { data: dataStep1, isLoading: isLoadingDataStep } = useQuery({
    queryKey: [`articles-of-incorporation-step-1`],
    queryFn: () => getStep({ projectId: projectId, deckId: DECK_ID, stepId: 1 }),
    staleTime: 0,
    meta: {
      offLoading: true
    }
  })

  const completeStep = useRecoilValue(completeStepSelector)

  const steps: StepList[] = [
    {
      title: 'Step 1',
      subtTitle: '기본 정보',
      description: !completeStep.includes(STEP.STEP_ONE) ? (
        <BasicInformationArticiesOfNcorporationEdit
          dataStep1={dataStep1?.data?.data as unknown as IAriticiesOfIncorporationStep1}
        />
      ) : (
        <BasicInformationArticiesOfIncorporationView
          dataStep1={dataStep1?.data?.data as unknown as IAriticiesOfIncorporationStep1}
        />
      )
    },
    {
      title: 'Step 2',
      subtTitle: '동업계약서',
      description: <ViewArticlesOfIncorporationPage />
    }
  ]

  useEffect(() => {
    projectId && setProjectId(Number(projectId))
  }, [projectId])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <StepItem stepList={steps} />
      </Grid>
    </Grid>
  )
}

export default memo(ArticlesOfNcorporationPage)
