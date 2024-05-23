'use client'
import React, { FC } from 'react'
import { Box, useTheme } from '@mui/material'
import { remConvert } from '@/utils/convert-to-rem'
import { ContainerAnalytics, PropsAnalyticsItem } from '.'
import { AnalyticSurveySelection, ReviewSurveySelection, SURVEY_SELECTION_COLOR } from '@/types/survey.type'
import { getSurveyAnalytics } from '@/services/survey.service'
import { useQuery } from '@tanstack/react-query'
import LabelProgressBar from '../_component/label-progress-bar'
import CustomProgressBar from '@/elements/custom-progress-bar'

const AnalyticsSelection: FC<PropsAnalyticsItem<ReviewSurveySelection>> = ({ idSurvey, itemSurvey, indexSurvey }) => {
  const theme = useTheme()
  const {
    palette: { home }
  } = theme

  const { data } = useQuery({
    queryKey: [`get-survey-analytics`, idSurvey, itemSurvey.id],
    queryFn: () => getSurveyAnalytics<AnalyticSurveySelection, null>(idSurvey, itemSurvey.id)
  })

  return (
    <ContainerAnalytics
      sx={{ flexDirection: 'column', alignItems: 'start', gap: remConvert('24px'), breakInside: 'avoid' }}
    >
      <Box>
        {indexSurvey + 1}.&nbsp;&nbsp;{itemSurvey.title}
      </Box>
      <Box width={'100%'} sx={{ paddingInline: remConvert('20xp') }}>
        <Box display={'flex'} width={'100%'} borderRadius={remConvert('10px')} overflow={'hidden'}>
          {data?.surveyItem.options.map((item, index) => {
            return (
              <CustomProgressBar
                key={index}
                sxBox={{
                  width: `${item.percentOfSelections}%`,
                  '.MuiLinearProgress-root,.MuiLinearProgress-bar': {
                    borderRadius: `0 !important;`
                  },
                  '>:last-child': {
                    justifyContent: 'start',
                    gap: remConvert('24px')
                  }
                }}
                value={100}
                progressColor={SURVEY_SELECTION_COLOR(theme)[index]}
                rawValue={item.totalSelections}
                itemIndex={index}
                label={
                  <LabelProgressBar
                    label={item.title === 'etc' ? '기타' : item.title}
                    colorPercent={index + 1 === data.surveyItem.options.length ? home.red900 : undefined}
                    percent={item.percentOfSelections}
                  />
                }
              />
            )
          })}
        </Box>
      </Box>
    </ContainerAnalytics>
  )
}

export default AnalyticsSelection
