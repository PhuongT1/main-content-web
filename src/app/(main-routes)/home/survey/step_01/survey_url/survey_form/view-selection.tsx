'use client'
import { Box } from '@mui/material'
import React, { FC } from 'react'
import { remConvert } from '@/utils/convert-to-rem'
import { ReviewSurveySelection, SurveyViewAnswersType } from '@/types/survey.type'
import { useFormContext } from 'react-hook-form'
import InputItem from '@/form/input'
import CardItemSurvey from '@/app/(main-routes)/home/survey/_component/card-item'

interface Props {
  dataSurvey: ReviewSurveySelection
  indexAnswers: number
}

const ViewSelection: FC<Props> = ({ dataSurvey, indexAnswers }) => {
  const { control } = useFormContext<SurveyViewAnswersType>()
  return (
    <InputItem
      name={`items.${indexAnswers}.answers.0`}
      control={control}
      renderInput={({ field: { value, onChange } }) => (
        <Box display='flex' alignItems='stretch' gap={remConvert('8px')} sx={{ height: '100%' }}>
          {dataSurvey.options.map(({ id, title }) => {
            return (
              <CardItemSurvey
                isActive={id === value}
                onClick={() => onChange(id)}
                key={id}
                title={title}
                sxCard={{ width: 0, flexGrow: 1, height: '100%' }}
              />
            )
          })}
        </Box>
      )}
    />
  )
}
export default ViewSelection
