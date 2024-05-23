'use client'
import { Box, Typography, useTheme } from '@mui/material'
import React, { FC } from 'react'
import { useFormContext } from 'react-hook-form'
import { SurveySubjective } from '@/types/survey.type'
import InputItem from '@/form/input'
import { remConvert } from '@/utils/convert-to-rem'
import { UploadAvatar } from '@/form/upload'
import SurveyCheckbox from '../../../_component/survey-checkbox'
import { FormStatus } from '@/app/(main-routes)/home/card-news/utils/common'
import styles from '../../step_01.module.scss'
import Image from 'next/image'

interface Props {
  status: FormStatus
}

const SubjectiveQuestion: FC<Props> = ({ status }) => {
  const {
    palette: { home }
  } = useTheme()
  const form = useFormContext<SurveySubjective>()
  const { control, watch } = form

  const formEdit = () => {
    return (
      <Box display={'flex'} gap={remConvert('20px')} flexDirection={'column'}>
        <InputItem
          name='title'
          control={control}
          showErrorMessage
          label='설문제목'
          maxLength={100}
          textFieldProps={{
            required: true,
            placeholder: '입력'
          }}
        />
        <InputItem
          name='imageUrl'
          control={control}
          label='이미지 첨부'
          renderInput={() => (
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='start'
              gap={2}
              flexShrink={0}
              height={120}
              width={240}
            >
              <UploadAvatar formProps={form} name={'imageUrl'} />
            </Box>
          )}
        />
        <Box display='flex' alignItems='start' gap={remConvert('12px')} sx={{ flexFlow: 'row wrap' }}>
          <InputItem
            name='configs.numericInputOnly'
            control={control}
            renderInput={({ field: { value, onChange, name } }) => (
              <SurveyCheckbox
                key={`${name}${value}`}
                label='숫자만 입력 설정'
                checkboxProps={{
                  checked: value,
                  onChange: onChange
                }}
              />
            )}
          />
          <InputItem
            name='configs.isRequired'
            control={control}
            renderInput={({ field: { value, onChange, name } }) => (
              <SurveyCheckbox
                key={`${name}${value}`}
                label='필수응답 여부'
                checkboxProps={{
                  checked: value,
                  onChange: onChange
                }}
              />
            )}
          />
        </Box>
      </Box>
    )
  }

  const formView = () => {
    return (
      <Box display={'flex'} gap={remConvert('20px')} flexDirection={'column'}>
        <InputItem
          name='title'
          control={control}
          showErrorMessage
          label='제목'
          maxLength={20}
          renderInput={({ field }) => <Typography className={styles.viewInput}>{field.value}</Typography>}
        />
        {watch('imageUrl') && (
          <InputItem
            name='imageUrl'
            control={control}
            label='이미지'
            renderInput={({ field }) => (
              <Image
                width={320}
                height={160}
                alt='avatar'
                src={field.value}
                style={{ objectFit: 'cover', borderRadius: remConvert('10px') }}
              />
            )}
          />
        )}
      </Box>
    )
  }

  return <Box>{status === FormStatus.inprogress ? formEdit() : formView()}</Box>
}
export default SubjectiveQuestion
