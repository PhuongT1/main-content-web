'use client'
import { useTheme } from '@mui/material'
import React, { FC } from 'react'
import { ReviewSurveySubjective, SurveyViewAnswersType } from '@/types/survey.type'
import { useFormContext } from 'react-hook-form'
import InputItem from '@/form/input'
import { PrimaryTextarea } from '@/elements'

interface Props {
  dataSurvey: ReviewSurveySubjective
  indexAnswers: number
}

const ViewSubjective: FC<Props> = ({ dataSurvey, indexAnswers }) => {
  const {
    palette: { home }
  } = useTheme()
  const { control } = useFormContext<SurveyViewAnswersType>()
  return (
    <>
      <InputItem
        name={`items.${indexAnswers}.answers.0`}
        control={control}
        renderInput={({ field, fieldState: { error } }) => (
          <PrimaryTextarea
            {...field}
            onChange={(event) => {
              if (dataSurvey.configs.numericInputOnly) {
                const input = event.target
                const inputValue = input.value.trim()
                if (/^\d+$/.test(inputValue)) {
                  input.value = inputValue
                } else {
                  input.value = inputValue.replace(/\D/g, '')
                }
              }
              if (event.target.value.length > 500) return
              field.onChange(event)
            }}
            value={(field.value as string) || ''}
            maxLength={500}
            placeholder={dataSurvey.configs.numericInputOnly ? '숫자만 입력해주세요' : '내용을 입력해주세요.'}
            sx={{
              background: home.gray300,
              width: '100%',
              borderColor: `${error ? '#f44336' : home.gray200} !important`
            }}
          />
        )}
      />
    </>
  )
}
export default ViewSubjective
