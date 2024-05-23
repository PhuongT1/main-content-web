'use client'
import React, { FC } from 'react'
import { Box } from '@mui/material'
import { remConvert } from '@/utils/convert-to-rem'
import { ContainerAnalytics, PropsAnalyticsItem } from '.'
import { AnalyticSurveySubjective_Responses, ReviewSurveySubjective } from '@/types/survey.type'
import { getSurveyAnalytics } from '@/services/survey.service'
import SurveyTable, { ColumnsTableSurveyType } from '../_component/survey-table'
import { useQuery } from '@tanstack/react-query'

const AnalyticsSubjective: FC<PropsAnalyticsItem<ReviewSurveySubjective>> = ({
  idSurvey,
  itemSurvey,
  indexSurvey,
  isPDF
}) => {

  const { data } = useQuery({
    queryKey: [`get-survey-analytics`, idSurvey, itemSurvey.id],
    queryFn: () => getSurveyAnalytics<ReviewSurveySubjective, AnalyticSurveySubjective_Responses[]>(idSurvey, itemSurvey.id),
  })

  const columns: ColumnsTableSurveyType<AnalyticSurveySubjective_Responses>[] = [
    {
      title: '순번',
      key: 'no',
      width: '70px',
    },
    {
      title: '내용',
      key: 'answer',
      bodyAlign: 'left'
    },
  ];

  return (
    <ContainerAnalytics sx={{ flexDirection: 'column', alignItems: 'start', gap: remConvert('24px') }}>
      <Box>
        {indexSurvey + 1}.&nbsp;&nbsp;{itemSurvey.title}
      </Box>
      <SurveyTable columns={columns} data={data?.responses} all={isPDF} />
    </ContainerAnalytics>
  )
}

export default AnalyticsSubjective
