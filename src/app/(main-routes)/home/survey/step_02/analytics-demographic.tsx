'use client'
import {
  AnalyticSurveyDemographic,
  AnalyticSurveyDemographic_Responses,
  DEMOGRAPHIC_TYPE_ENUM,
  DEMOGRAPHIC_TYPE_ENUM_ORDER,
  REMOVE_DEMOGRAPHIC_TYPE_ENUM_ORDER,
  ReviewSurveyDemographic,
  SURVEY_AGE_ENUM,
  SURVEY_AREA_ENUM,
  SURVEY_COLOR,
  SURVEY_EDUCATION_ENUM,
  SURVEY_GENDER_COLOR,
  SURVEY_GENDER_ENUM
} from '@/types/survey.type'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, Grid, useTheme } from '@mui/material'
import { FC, useMemo } from 'react'
import { ContainerAnalytics, PropsAnalyticsItem } from '.'

import CustomDoughnutChart from '@/components/home/chart/custom-doughnut-chart'
import { getSurveyAnalytics } from '@/services/survey.service'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import SurveyTable, { ColumnsTableSurveyType } from '../_component/survey-table'

const AnalyticsDemographic: FC<PropsAnalyticsItem<ReviewSurveyDemographic>> = ({ idSurvey, itemSurvey, isPDF }) => {
  const theme = useTheme()
  const {
    palette: { home }
  } = theme
  const { data } = useQuery({
    queryKey: [`get-survey-analytics`, idSurvey, itemSurvey.id],
    queryFn: () =>
      getSurveyAnalytics<AnalyticSurveyDemographic, AnalyticSurveyDemographic_Responses[]>(idSurvey, itemSurvey.id)
  })

  const renderDoughnutChart = (type: DEMOGRAPHIC_TYPE_ENUM) => {
    const dataChart = data?.surveyItem.options.find((item) => item.type === type)?.answers || []
    let labels: string[] = []
    let backgroundColor = SURVEY_COLOR(theme)
    let xs = 6
    switch (type) {
      case DEMOGRAPHIC_TYPE_ENUM.GENDER:
        labels = Object.values(SURVEY_GENDER_ENUM)
        backgroundColor = SURVEY_GENDER_COLOR(theme)
        xs = 3
        break
      case DEMOGRAPHIC_TYPE_ENUM.AGE:
        labels = Object.values(SURVEY_AGE_ENUM)
        xs = 4
        break
      case DEMOGRAPHIC_TYPE_ENUM.EDUCATION:
        labels = Object.values(SURVEY_EDUCATION_ENUM)
        xs = 12
        break
      case DEMOGRAPHIC_TYPE_ENUM.AREA:
        labels = Object.values(SURVEY_AREA_ENUM)
        break
      default:
        break
    }
    return (
      <Box
        sx={{
          background: home.gray300,
          borderRadius: remConvert('10px'),
          height: '100%',
          padding: remConvert('10px 20px 20px')
        }}
      >
        <Box
          sx={{
            borderRadius: remConvert('99px'),
            background: home.gray50,
            color: home.gray400,
            width: 'fit-content',
            padding: remConvert('2px 12px'),
            marginBottom: remConvert('8px')
          }}
        >
          {type}
        </Box>
        <CustomDoughnutChart
          labels={labels.map((item) => item) || []}
          data={Object.values(labels).map(
            (item) =>
              dataChart.find((dataItem) => {
                const [checkValue] = (dataItem.answer || '').split('_')
                return checkValue === item
              })?.total || 0
          )}
          xs={xs}
          backgroundColor={backgroundColor}
          sxLegend={{
            justifyContent: type == DEMOGRAPHIC_TYPE_ENUM.AREA ? 'start' : 'center'
          }}
          options={{ aspectRatio: 2 }}
        />
      </Box>
    )
  }

  const columns: ColumnsTableSurveyType<AnalyticSurveyDemographic_Responses>[] = useMemo(() => {
    const sortedOptions = (
      data?.surveyItem.options.sort((a, b) => {
        return DEMOGRAPHIC_TYPE_ENUM_ORDER.indexOf(a.type) - DEMOGRAPHIC_TYPE_ENUM_ORDER.indexOf(b.type)
      }) || []
    ).filter((item) => !REMOVE_DEMOGRAPHIC_TYPE_ENUM_ORDER.includes(item.type))

    return [
      {
        title: '순번',
        key: 'no',
        width: '70px'
      },
      ...sortedOptions.map(
        (item) =>
          ({
            title: item.title,
            key: item.title,
            onRender: (row) => {
              switch (item.type) {
                case DEMOGRAPHIC_TYPE_ENUM.DOB:
                  return (
                    <Box sx={{ textWrap: 'nowrap' }}>{moment(row[DEMOGRAPHIC_TYPE_ENUM.DOB]).format('YYYY년')}</Box>
                  )
                case DEMOGRAPHIC_TYPE_ENUM.EDUCATION:
                  return <>{row[DEMOGRAPHIC_TYPE_ENUM.EDUCATION]?.replaceAll('_', ' ')}</>
                case DEMOGRAPHIC_TYPE_ENUM.GENDER:
                  return <Box sx={{ textWrap: 'nowrap' }}>{row[item.type]}</Box>
                default:
                  return <Box>{row[item.type]}</Box>
              }
            }
          } as ColumnsTableSurveyType<AnalyticSurveyDemographic_Responses>)
      )
    ]
  }, [data?.surveyItem.options])

  return (
    <ContainerAnalytics sx={{ alignItems: 'start', flexDirection: 'column', gap: remConvert('24px') }}>
      <Grid container spacing={remConvert('30px')} sx={{ breakInside: 'avoid' }}>
        <Grid item xs={3}>
          {renderDoughnutChart(DEMOGRAPHIC_TYPE_ENUM.GENDER)}
        </Grid>
        <Grid item xs={3}>
          {renderDoughnutChart(DEMOGRAPHIC_TYPE_ENUM.AGE)}
        </Grid>
        <Grid item xs={3}>
          {renderDoughnutChart(DEMOGRAPHIC_TYPE_ENUM.EDUCATION)}
        </Grid>
        <Grid item xs={3}>
          {renderDoughnutChart(DEMOGRAPHIC_TYPE_ENUM.AREA)}
        </Grid>
      </Grid>
      <SurveyTable columns={columns} data={data?.responses} all={isPDF} />
    </ContainerAnalytics>
  )
}

export default AnalyticsDemographic
