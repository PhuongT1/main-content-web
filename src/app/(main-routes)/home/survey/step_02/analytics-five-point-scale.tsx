'use client'
import React, { FC, useMemo } from 'react'
import { Box, Stack, useTheme } from '@mui/material'
import { remConvert } from '@/utils/convert-to-rem'
import { ContainerAnalytics, PropsAnalyticsItem } from '.'
import { AnalyticSurveyFivePointScale, ReviewSurveyFivePointScale, SURVEY_FIVE_POINT_COLOR } from '@/types/survey.type'
import { useQuery } from '@tanstack/react-query'
import { getSurveyAnalytics } from '@/services/survey.service'
import LabelProgressBar from '../_component/label-progress-bar'
import { ResponsiveCirclePackingCanvas } from '@nivo/circle-packing'
import SurveyProgressBar from '../_component/survey-progress-bar'

const AnalyticsFivePoint: FC<PropsAnalyticsItem<ReviewSurveyFivePointScale>> = ({
  idSurvey,
  itemSurvey,
  indexSurvey
}) => {
  const theme = useTheme()
  const {
    palette: { home }
  } = theme

  const { data } = useQuery({
    queryKey: [`get-survey-analytics`, idSurvey, itemSurvey.id],
    queryFn: () => getSurveyAnalytics<AnalyticSurveyFivePointScale, null>(idSurvey, itemSurvey.id)
  })

  const dataFivePoint = useMemo(() => [...(data?.surveyItem.options || [])].reverse(), [data?.surveyItem.options])

  const renderProgressBar = () => {
    const total = dataFivePoint.reduce((acc, value) => acc + value.totalSelections, 0)
    return dataFivePoint.map((item, index) => {
      const percent = Math.round((item.totalSelections / total) * 100 * 100) / 100 || 0
      return (
        <>
          <SurveyProgressBar
            key={index}
            value={percent}
            progressColor={SURVEY_FIVE_POINT_COLOR(theme)[index]}
            rawValue={item.totalSelections}
            itemIndex={index}
            label={<LabelProgressBar label={item.title} percent={percent} />}
          />
        </>
      )
    })
  }
  return (
    <ContainerAnalytics sx={{ alignItems: 'start', gap: remConvert('24px'), breakInside: 'avoid' }}>
      <Stack width={'0'} gap={remConvert('24px')} flexGrow={1}>
        <Box>
          {indexSurvey + 1}.&nbsp;&nbsp;{itemSurvey.title}
        </Box>
        <Stack width={'100%'} gap={remConvert('12px')} flexGrow={1} paddingLeft={remConvert('20px')}>
          {renderProgressBar()}
        </Stack>
      </Stack>
      <Box sx={{ background: home.gray300, borderRadius: remConvert('10px'), padding: remConvert('20px') }}>
        <Box textAlign={'center'}>
          <Box fontSize={remConvert('24px')} color={home.mint500}>
            {data?.surveyItem.averagePoint}점
            <Box component={'span'} fontSize={remConvert('16px')} color={home.gray50}>
              / 5점
            </Box>
          </Box>
          <Box fontSize={remConvert('12px')} color={home.gray100}>
            ({data?.surveyItem.sumOfPoints}점 / {data?.surveyItem.maxSumOfPoints}점)
          </Box>
        </Box>
        <Box sx={{ width: remConvert('260px'), height: remConvert('260px') }}>
          <ResponsiveCirclePackingCanvas
            id='id'
            colorBy='id'
            data={{
              id: 1,
              name: 'root',
              children: dataFivePoint.map((item) => ({ ...item, name: item.title, value: item.totalSelections }))
            }}
            labelTextColor={home.gray50}
            label={(e) =>
              e.radius < 15
                ? `${Math.round(e.percentage * 100) / 100}%`
                : `${e.data.name}\n${Math.round(e.percentage * 100) / 100}%`
            }
            colors={[...SURVEY_FIVE_POINT_COLOR(theme)]}
            padding={10}
            leavesOnly={true}
            enableLabels={true}
            animate={false}
            tooltip={({ percentage, value }) => {
              return (
                <Box
                  fontSize={remConvert('14px')}
                  fontWeight={400}
                  sx={{ backgroundColor: home.gray500, padding: remConvert('10px'), borderRadius: remConvert('10px') }}
                >
                  {value}명<br />
                  {Math.round(percentage * 100) / 100}%
                </Box>
              )
            }}
          />
        </Box>
      </Box>
    </ContainerAnalytics>
  )
}

export default AnalyticsFivePoint
