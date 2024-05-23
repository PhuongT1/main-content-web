'use client'
import { Box, Typography, useTheme } from '@mui/material'
import React, { FC } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { SurveySelection } from '@/types/survey.type'
import InputItem from '@/form/input'
import { remConvert } from '@/utils/convert-to-rem'
import { FormStatus } from '@/app/(main-routes)/home/card-news/utils/common'
import styles from '../../step_01.module.scss'
import CardItemSurvey from '../../../_component/card-item'
import { UploadAvatar } from '@/form/upload'
import { PlusButton } from '@/components/home/button'
import Image from 'next/image'

interface Props {
  status: FormStatus
}

const SelectionSurvey: FC<Props> = ({ status }) => {
  const {
    palette: { home }
  } = useTheme()
  const form = useFormContext<SurveySelection>()
  const { control, getValues } = form
  const { fields, append } = useFieldArray({
    control,
    name: 'options'
  })

  const renderListCard = (view?: boolean) => {
    if (view) {
      return getValues('options').map((item, index) => {
        return (
          <CardItemSurvey
            key={index}
            title={item.title}
            sxCard={{ outline: 'unset', background: home.gray200, width: 'auto', minWidth: remConvert('100px') }}
          />
        )
      })
    }
    return fields.map((item, index) => (
      <InputItem
        key={item.id}
        name={`options.${index}.title`}
        control={control}
        maxLength={10}
        textFieldProps={{
          placeholder: '내용'
        }}
        sxInput={{
          '& .MuiInputBase-formControl': {
            width: remConvert('160px'),
            input: {
              textAlign: 'center'
            }
          }
        }}
      />
    ))
  }

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
          name='options'
          control={control}
          label='선택버튼'
          renderInput={() => (
            <Box display='flex' alignItems='start' gap={remConvert('8px')}>
              {renderListCard()}
              {/* <PlusButton
                disabled={fields.length >= 3}
                sx={{
                  padding: remConvert('16px 18px'),
                  minWidth: remConvert('120px'),
                  border: `1px solid ${home.gray200}`,
                  background: home.gray300
                }}
                onClick={() => append({ title: '' })}
              /> */}
            </Box>
          )}
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
        <InputItem
          name='options'
          control={control}
          label='선택버튼'
          renderInput={() => (
            <Box display='flex' alignItems='start' gap={remConvert('8px')}>
              {renderListCard(true)}
            </Box>
          )}
        />
        {getValues('imageUrl') && (
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
export default SelectionSurvey
