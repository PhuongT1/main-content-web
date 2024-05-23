'use client'
import { Box, useTheme } from '@mui/material'
import React, { FC } from 'react'
import SurveyURL from '@/app/(main-routes)/home/survey/step_01/survey_url'
import { useQuery } from '@tanstack/react-query'
import { getSurveyWithId } from '@/services/survey.service'
import { remConvert } from '@/utils/convert-to-rem'

interface Props {
  id: number
}

const SurveyRequest: FC<Props> = ({ id }) => {
  const {
    palette: { home }
  } = useTheme()

  const { data } = useQuery({
    queryKey: ['get-survey-with-id', id],
    queryFn: () => getSurveyWithId(id)
  })

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      sx={{
        background: home.gray200,
        minHeight: '100svh'
      }}
    >
      <Box
        sx={{ background: home.gray500 }}
        display={'flex'}
        flexDirection={'column'}
        flexGrow={1}
        maxWidth={remConvert('450px')}
        width={'100%'}
      >
        <SurveyURL id={id} data={data} />
      </Box>
    </Box>
  )
}
export default SurveyRequest
