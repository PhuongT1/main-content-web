'use client'
import { Box, Typography, useTheme } from '@mui/material'
import React, { FC } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { DEMOGRAPHIC_TYPE_ENUM, SurveyDemographic } from '@/types/survey.type'
import InputItem from '@/form/input'
import { remConvert } from '@/utils/convert-to-rem'
import { FormStatus } from '@/app/(main-routes)/home/card-news/utils/common'
import styles from '../../step_01.module.scss'
import CardItemSurvey from '../../../_component/card-item'
import Alert from '@/elements/alert'

interface Props {
  status: FormStatus
}

const Demographic: FC<Props> = ({ status }) => {
  const {
    palette: { home }
  } = useTheme()
  const form = useFormContext<SurveyDemographic>()
  const {
    control,
    formState: { errors }
  } = form
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options'
  })

  const renderListCard = (form: number, to: number, view?: boolean) => {
    if (view) {
      return Object.values(DEMOGRAPHIC_TYPE_ENUM)
        .slice(form, to)
        .map((item) => {
          if (fields?.map((tem) => tem.type)?.includes(item)) {
            return (
              <Box key={item} flexGrow={1} width={0}>
                <CardItemSurvey key={item} title={item} sxCard={{ outline: 'unset', background: home.gray200 }} />
              </Box>
            )
          }
        })
    }
    return Object.values(DEMOGRAPHIC_TYPE_ENUM)
      .slice(form, to)
      .map((item) => (
        <Box key={item} flexGrow={1} width={0}>
          <CardItemSurvey
            isActive={fields?.map((tem) => tem.type)?.includes(item)}
            onClick={() => {
              if (!view) {
                if (fields?.map((tem) => tem.type)?.includes(item)) {
                  remove(fields.findIndex((data) => data.type === item))
                } else append({ title: item, type: item })
              }
            }}
            title={item}
          />
        </Box>
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
          label='인구통계 항목선택 (개인정보 동의가 필요하지 않는 항목)'
          renderInput={() => (
            <Box display='flex' alignItems='stretch' gap={remConvert('8px')}>
              {renderListCard(0, 5)}
            </Box>
          )}
        />
        <InputItem
          name='options'
          control={control}
          label='인구통계 항목선택 (개인정보 동의 필요한 항목)'
          renderInput={() => (
            <Box display='flex' alignItems='stretch' gap={remConvert('8px')}>
              {renderListCard(5, 10)}
            </Box>
          )}
        />
        <Alert
          key={`${errors.options?.type}`}
          isOpen={['DOB/AGE', 'AREA/ADDRESS'].includes(errors.options?.type || '')}
          sx={{ backgroundColor: home.alpha_red_10 }}
          isHide
          color='error'
          severity='error'
          variant='filled'
        >
          {errors.options?.type === 'DOB/AGE' && '나이와 연령대 항목은 둘 중 하나 선택해야 합니다.'}
          {errors.options?.type === 'AREA/ADDRESS' && '지역와 주소 항목은 둘 중 하나 선택해야 합니다.'}
        </Alert>
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
          label={
            <Box>
              인구통계 항목선택&nbsp;
              <Box component={'span'} color={home.mint500}>
                (개인정보 동의가 필요하지 않는 항목)
              </Box>
            </Box>
          }
          renderInput={() => (
            <Box display='flex' alignItems='stretch' gap={remConvert('8px')}>
              {renderListCard(0, 5, true)}
            </Box>
          )}
        />
        <InputItem
          name='options'
          control={control}
          label={
            <Box>
              인구통계 항목선택&nbsp;
              <Box component={'span'} color={home.mint500}>
                (개인정보 동의 필요한 항목)
              </Box>
            </Box>
          }
          renderInput={() => (
            <Box display='flex' alignItems='stretch' gap={remConvert('8px')}>
              {renderListCard(5, 10, true)}
            </Box>
          )}
        />
      </Box>
    )
  }

  return <Box>{status === FormStatus.inprogress ? formEdit() : formView()}</Box>
}
export default Demographic
