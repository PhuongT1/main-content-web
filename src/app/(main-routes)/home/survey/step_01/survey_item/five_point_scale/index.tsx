'use client'
import { Box, Typography, useTheme } from '@mui/material'
import React, { FC } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { SurveyFivePointScale } from '@/types/survey.type'
import InputItem from '@/form/input'
import { remConvert } from '@/utils/convert-to-rem'
import { FormStatus } from '@/app/(main-routes)/home/card-news/utils/common'
import styles from '../../step_01.module.scss'
import CardItemSurvey from '../../../_component/card-item'
import { UploadAvatar } from '@/form/upload'
import Image from 'next/image'
import SliderItem from '@/form/slider'
import SurveyCheckbox from '../../../_component/survey-checkbox'

interface Props {
  status: FormStatus
}

const FivePointScale: FC<Props> = ({ status }) => {
  const {
    palette: { home }
  } = useTheme()
  const form = useFormContext<SurveyFivePointScale>()
  const { control, getValues } = form
  const { fields } = useFieldArray({
    control,
    name: 'options'
  })

  const renderListCard = (view?: boolean) => {
    if (view) {
      return getValues('options').map((item, index) => {
        return (
          <Box key={index} flexGrow={1} width={0}>
            <CardItemSurvey title={item.title} sxCard={{ outline: 'unset', background: home.gray300, width: 'auto' }} />
          </Box>
        )
      })
    }
    return fields.map((item, index) => (
      <InputItem
        key={item.id}
        name={`options.${index}.title`}
        control={control}
        maxLength={10}
        sxInput={{
          '& .MuiInputBase-formControl': {
            height: remConvert('37px')
          }
        }}
      />
    ))
  }

  const surveyScale = (view?: boolean) => {
    return (
      <Box
        display='flex'
        flexDirection={'column'}
        alignItems='center'
        justifyContent={'center'}
        gap={remConvert('8px')}
      >
        <Box width={'82%'} sx={{ pointerEvents: 'none' }}>
          <SliderItem
            sliderProps={{
              min: 1,
              max: 5,
              step: 1,
              marks: getValues('options')?.map((data) => ({ value: data.point }))
            }}
            valueCustom={3}
            onChangeCustom={() => {}}
            control={form.control}
            name={'options'}
          />
        </Box>
        <Box display='flex' alignItems='stretch' gap={remConvert('16px')} width={'100%'}>
          {renderListCard(view)}
        </Box>
      </Box>
    )
  }

  const formEdit = () => {
    return (
      <Box display={'flex'} gap={remConvert('20px')} flexDirection={'column'}>
        <InputItem
          name='title'
          control={control}
          label='설문제목'
          maxLength={100}
          textFieldProps={{
            required: true,
            placeholder: '입력'
          }}
        />
        <InputItem name='options' control={control} label='설문척도' renderInput={() => surveyScale()} />
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
        <InputItem name='options' control={control} label='선택버튼' renderInput={() => surveyScale(true)} />
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
export default FivePointScale
