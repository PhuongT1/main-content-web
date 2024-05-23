'use client'
import { Box, Button, useTheme } from '@mui/material'
import React, { FC } from 'react'
import { remConvert } from '@/utils/convert-to-rem'
import { SurveyViewType } from '@/types/survey.type'
import SurveyContener from './survey-contener'
import ImageIcon from '@/assets/icons/image'
import CalendarIcon from '@/assets/icons/calendar'
import { getTimeDiff } from '@/app/(main-routes)/home/survey/_component/commonFunction'
import ImageSurveyReView from '@/app/(main-routes)/home/survey/_component/image-survey-review'

interface Props {
  data?: SurveyViewType
}

const ViewBasicInformation: FC<Props> = ({ data }) => {
  const {
    palette: { home }
  } = useTheme()
  return (
    <SurveyContener title={data?.title || 'Default title'}>
      {data?.imageUrl ? (
        <ImageSurveyReView alt='preview-survey' src={data.imageUrl} />
      ) : (
        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={remConvert('16px')}
          alignItems={'center'}
          justifyContent={'center'}
          width={'100%'}
          height={262}
          style={{
            borderRadius: remConvert('10px'),
            border: `2px solid ${home.gray200}`,
            background: home.gray300,
            color: home.gray200,
            fontWeight: 600
          }}
        >
          <ImageIcon pathProps={{ fill: home.gray200 }} />
          이미지 선택
        </Box>
      )}
      {data?.description ? (
        <Box fontWeight={400}>{data.description}</Box>
      ) : (
        <Box color={home.gray100} fontWeight={400} lineHeight={'150%'}>
          the message you would like to convey to respondents regarding the survey.
        </Box>
      )}
      <Button
        style={{
          backgroundColor: home.alpha_blue_10,
          color: home.blue500,
          padding: remConvert('5px 15px'),
          borderRadius: remConvert('10px'),
          justifyContent: 'start'
        }}
        disabled
        startIcon={<CalendarIcon pathProps={{ stroke: home.blue500 }} />}
      >
        {getTimeDiff(data?.startDate, data?.endDate, true) || 'YYYY. MM. DD ~ YYYY. MM. DD'}
      </Button>
    </SurveyContener>
  )
}
export default ViewBasicInformation
