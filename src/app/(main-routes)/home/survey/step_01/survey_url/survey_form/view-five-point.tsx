'use client'
import { Box, useTheme } from '@mui/material'
import React, { FC } from 'react'
import { remConvert } from '@/utils/convert-to-rem'
import { ReviewSurveyFivePointScale, SurveyViewAnswersType } from '@/types/survey.type'
import { useFormContext } from 'react-hook-form'
import InputItem from '@/form/input'
import RadioSlider from '@/form/radio-slider'

interface Props {
  dataSurvey: ReviewSurveyFivePointScale
  indexAnswers: number
}

const ViewFivePoint: FC<Props> = ({ dataSurvey, indexAnswers }) => {
  const {
    palette: { home }
  } = useTheme()
  const { control } = useFormContext<SurveyViewAnswersType>()
  return (
    <Box
      display={'flex'}
      alignItems={'end'}
      flexDirection={'column'}
      sx={{ padding: remConvert('45px 8px 10px'), background: home.gray300, borderRadius: remConvert('10px') }}
    >
      <InputItem
        sxBox={{ width: '100%' }}
        name={`items.${indexAnswers}.answers.0`}
        control={control}
        renderInput={({ field: { value, onChange, ref } }) => (
          <RadioSlider
            ref={ref}
            value={(value || '') as React.Key}
            onChange={(event) => onChange(parseInt(event.target.value))}
            listData={dataSurvey.options?.map((data) => ({ value: data.id, label: data.title }))}
          />
        )}
      />
    </Box>
  )
}
export default ViewFivePoint
