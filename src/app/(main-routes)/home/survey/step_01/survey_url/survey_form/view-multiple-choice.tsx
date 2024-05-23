'use client'
import { Box, Card, useTheme } from '@mui/material'
import React, { FC } from 'react'
import { remConvert } from '@/utils/convert-to-rem'
import { ReviewSurveyMultiChoice, SurveyViewAnswersType } from '@/types/survey.type'
import ImageSurveyReView from '@/app/(main-routes)/home/survey/_component/image-survey-review'
import styles from '@/app/(main-routes)/home/survey/step_01/step_01.module.scss'
import { useFormContext } from 'react-hook-form'
import InputItem from '@/form/input'

interface Props {
  dataSurvey: ReviewSurveyMultiChoice
  indexAnswers: number
}

const ViewMultipleChoise: FC<Props> = ({ dataSurvey, indexAnswers }) => {
  const {
    palette: { home }
  } = useTheme()
  const { control } = useFormContext<SurveyViewAnswersType>()
  const sxCard = {
    '&.active': {
      color: home.yellow
    },
    boxShadow: 'none',
    background: 'unset',
    height: '100%'
  }
  return (
    <>
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={remConvert('10px')}
        sx={{ paddingInline: remConvert('20px') }}
      >
        <Box component={'ul'} className={styles.viewUl} sx={{ li: { gap: remConvert('10px') } }}>
          {dataSurvey.options.map((item, index) => (
            <InputItem
              key={index}
              name={`items.${indexAnswers}.answers`}
              control={control}
              renderInput={({ field: { value, onChange } }) => (
                <Card
                  className={[value?.find((checkItem) => checkItem === item.id) ? 'active' : ''].join(' ')}
                  sx={sxCard}
                  onClick={() => {
                    if (dataSurvey.configs.allowMultiSelection) {
                      onChange(
                        value.find((key) => item.id === key)
                          ? value.filter((key) => key !== item.id)
                          : [...value, item.id]
                      )
                    } else onChange([item.id])
                  }}
                >
                  <Box display={'flex'} flexDirection={'column'} gap={remConvert('10px')}>
                    <Box component={'li'} sx={{ '::before': { content: `'${index + 1}'` } }}>
                      {item.title}
                    </Box>
                    {item.imageUrl && (
                      <ImageSurveyReView
                        alt='viewMultipleChoise'
                        src={item.imageUrl}
                        style={{ borderRadius: remConvert('6px'), objectFit: 'cover' }}
                      />
                    )}
                  </Box>
                </Card>
              )}
            />
          ))}
          {dataSurvey.configs.allowAddOption && (
            <InputItem
              name={`items.${indexAnswers}.answers`}
              control={control}
              renderInput={({ field: { value, onChange } }) => {
                const keyIndex = value?.findIndex((key) => typeof key === 'string')
                const isActive = value?.some((key) => typeof key === 'string')
                return (
                  <Card
                    className={[isActive ? 'active' : ''].join(' ')}
                    sx={sxCard}
                    onClick={() => {
                      if (dataSurvey.configs.allowMultiSelection) {
                        onChange(isActive ? value.filter((key) => typeof key !== 'string') : [...value, ''])
                      } else onChange([''])
                    }}
                  >
                    <Box display={'flex'} flexDirection={'column'} gap={remConvert('10px')}>
                      <Box component={'li'} sx={{ '::before': { content: `'${dataSurvey.options.length + 1}'` } }}>
                        기타
                      </Box>
                      {isActive && (
                        <Box onClick={(e) => e.stopPropagation()}>
                          <InputItem
                            name={`items.${indexAnswers}.answers.${keyIndex}`}
                            textFieldProps={{
                              placeholder: '내용을 입력해주세요.'
                            }}
                            control={control}
                          />
                        </Box>
                      )}
                    </Box>
                  </Card>
                )
              }}
            />
          )}
        </Box>
      </Box>
    </>
  )
}
export default ViewMultipleChoise
