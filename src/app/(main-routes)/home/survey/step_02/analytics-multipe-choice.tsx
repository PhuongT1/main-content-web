'use client'
import React, { FC } from 'react'
import { Box, Stack, useTheme } from '@mui/material'
import { remConvert } from '@/utils/convert-to-rem'
import { ContainerAnalytics, PropsAnalyticsItem } from '.'
import {
  AnalyticSurveyMultiChoice,
  AnalyticSurveyMultiChoice_Responses,
  ReviewSurveyMultiChoice,
  SURVEY_COLOR
} from '@/types/survey.type'
import { useQuery } from '@tanstack/react-query'
import { getSurveyAnalytics } from '@/services/survey.service'
import Image from 'next/image'
import LabelProgressBar from '../_component/label-progress-bar'
import DoughnutChart from '@/components/home/chart/doughnut-chart'
import SurveyProgressBar from '../_component/survey-progress-bar'
import SurveyTable, { ColumnsTableSurveyType } from '../_component/survey-table'

const AnalyticsMultipeChoice: FC<PropsAnalyticsItem<ReviewSurveyMultiChoice>> = ({
  idSurvey,
  itemSurvey,
  indexSurvey,
  isPDF
}) => {
  const theme = useTheme()
  const {
    palette: { home }
  } = theme

  const { data } = useQuery({
    queryKey: [`get-survey-analytics`, idSurvey, itemSurvey.id],
    queryFn: () =>
      getSurveyAnalytics<AnalyticSurveyMultiChoice, AnalyticSurveyMultiChoice_Responses[]>(idSurvey, itemSurvey.id)
  })

  const columns: ColumnsTableSurveyType<AnalyticSurveyMultiChoice_Responses>[] = [
    {
      title: '순번',
      key: 'no',
      width: '70px'
    },
    {
      title: '내용',
      key: 'title',
      bodyAlign: 'left'
    }
  ]

  const renderProgressBar = () => {
    if (!data) return
    const total = data?.surveyItem.options.reduce((acc, value) => acc + value.totalSelections, 0)
    return data?.surveyItem.options.map((item, index) => {
      const percent = Math.round((item.totalSelections / total) * 100 * 100) / 100 || 0
      return (
        <>
          <SurveyProgressBar
            key={index}
            value={percent}
            progressColor={SURVEY_COLOR(theme)[index]}
            rawValue={item.totalSelections}
            itemIndex={index}
            label={
              <LabelProgressBar
                order={index + 1}
                label={item.title === 'etc' ? '기타' : item.title}
                percent={percent}
              />
            }
          />
          {item.imageUrl && (
            <Image
              width={200}
              height={100}
              alt='avatar'
              src={item.imageUrl}
              style={{ borderRadius: remConvert('6px'), objectFit: 'cover' }}
            />
          )}
        </>
      )
    })
  }

  return (
    <>
      <ContainerAnalytics sx={{ alignItems: 'start', gap: remConvert('24px'), breakInside: 'avoid' }}>
        <Stack width={0} gap={remConvert('24px')} flexGrow={1}>
          <Box>
            {indexSurvey + 1}.&nbsp;&nbsp;{itemSurvey.title}
          </Box>
          <Stack width={'100%'} gap={remConvert('12px')} flexGrow={1} paddingLeft={remConvert('20px')}>
            {renderProgressBar()}
          </Stack>
        </Stack>
        <Box
          sx={{
            background: home.gray300,
            borderRadius: remConvert('10px'),
            padding: remConvert('20px'),
            maxWidth: remConvert('300px')
          }}
        >
          <DoughnutChart
            labels={
              data?.surveyItem.options.map((item, index) => (item.title === 'etc' ? '기타' : `${index + 1}번 문항`)) ||
              []
            }
            data={data?.surveyItem.options.map((item) => item.totalSelections)}
            backgroundColor={SURVEY_COLOR(theme)}
          />
        </Box>
      </ContainerAnalytics>
      <ContainerAnalytics sx={{ alignItems: 'start', flexDirection: 'column', gap: remConvert('24px') }}>
        <Box>기타</Box>
        <SurveyTable columns={columns} data={data?.responses} all={isPDF} />
      </ContainerAnalytics>
    </>
  )
}

export default AnalyticsMultipeChoice
