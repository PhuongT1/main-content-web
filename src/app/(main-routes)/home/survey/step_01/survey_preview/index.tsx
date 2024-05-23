'use client'
import { Box, useTheme } from '@mui/material'
import React, { FC } from 'react'
import StatusBar from '@/assets/icons/survey/status-bar'
import NavBar from '@/assets/icons/survey/nav-bar'
import { remConvert } from '@/utils/convert-to-rem'
import { SurveyViewType } from '@/types/survey.type'
import SurveyURL from '../survey_url'

interface Props {
  data?: SurveyViewType
}

const SurveyPreview: FC<Props> = ({ data }) => {
  const {
    palette: { home }
  } = useTheme()

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      sx={{ borderRadius: remConvert('10px'), overflow: 'hidden', border: `2px solid ${home.gray300}` }}
    >
      <StatusBar />
      <SurveyURL id={1} data={data} isPreview />
      <NavBar />
    </Box>
  )
}
export default SurveyPreview
