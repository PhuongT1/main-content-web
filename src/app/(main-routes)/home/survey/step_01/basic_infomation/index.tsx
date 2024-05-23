'use client'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import React, { FC, useMemo, useState } from 'react'
import { FormStatus } from '../../../card-news/utils/common'
import CompleteFormAccordion from '@/components/complete-form-accordion'
import RangeDatepicker from '@/elements/v2/range-date-picker'
import { useForm, useFormContext } from 'react-hook-form'
import { DateRange } from '@/libs/mui-daterange-picker/src'
import { BasicInformationType, BasicInformationYup, SurveyItemType } from '@/types/survey.type'
import moment from 'moment'
import InputItem from '@/form/input'
import { remConvert } from '@/utils/convert-to-rem'
import { UploadAvatar } from '@/form/upload'
import { PrimaryTextarea } from '@/elements'
import { DeleteButton, EditButton, SubmitButton } from '@/components/home/button'
import styles from '../step_01.module.scss'
import Image from 'next/image'
import { yupResolver } from '@hookform/resolvers/yup'
import { getTimeDiff } from '../../_component/commonFunction'
import SurveyResetButton from '../../_component/survey-reset-button'

const BasicInfomation: FC = () => {
  const {
    palette: { home }
  } = useTheme()
  const formParent = useFormContext<SurveyItemType>()
  const form = useForm<any>({
    resolver: yupResolver(BasicInformationYup),
    mode: 'onBlur',
    reValidateMode: 'onChange'
  })
  const { setValue, getValues, control, watch, handleSubmit, reset, clearErrors } = form

  const [status, setStatus] = useState<FormStatus>(FormStatus.inprogress)
  const [isExpanded, setIsExpanded] = useState<boolean>(true)

  const handleChangeDate = (dateRange: DateRange) => {
    setValue('startDate', moment(dateRange.startDate).toISOString())
    setValue('endDate', moment(dateRange.endDate).toISOString())
  }

  const dataRangeDatepicker = useMemo(() => {
    const startDate = watch('startDate') || undefined
    const endDate = watch('endDate') || undefined
    clearErrors('startDate')
    return {
      startDate: startDate ? moment(startDate).toDate() : undefined,
      endDate: endDate ? moment(endDate).toDate() : undefined
    }
  }, [watch('startDate'), watch('endDate')])

  const onFinish = (data: BasicInformationType) => {
    formParent.setValue('basicInformation', data, { shouldValidate: true })
    setStatus(FormStatus.completed)
    setIsExpanded(false)
  }

  const formEdit = () => {
    return (
      <Box display={'flex'} gap={remConvert('20px')} flexDirection={'column'}>
        <Box display={'flex'} gap={remConvert('20px')} sx={{ marginBottom: remConvert('16px') }}>
          <Box display={'flex'} flexGrow={1} gap={remConvert('16px')} flexDirection={'column'}>
            <InputItem
              name='title'
              control={control}
              showErrorMessage
              label='제목'
              maxLength={30}
              textFieldProps={{
                required: true,
                placeholder: '제목을 입력해주세요.'
              }}
            />
            <InputItem
              name='startDate'
              control={control}
              label={'기간'}
              required={true}
              textFieldProps={{ required: true }}
              renderInput={({ field, fieldState: { error } }) => (
                <RangeDatepicker
                  {...field}
                  showIcon
                  minDate={moment().startOf('day').toISOString()}
                  value={dataRangeDatepicker}
                  onChange={handleChangeDate}
                  placeholder={`기간`}
                  containerSx={{
                    '.MuiInputBase-root': {
                      borderColor: `${error ? '#f44336' : home.gray200} !important`,
                      background: `${home.gray300} !important`
                    }
                  }}
                />
              )}
            />
          </Box>
          <Box>
            <InputItem
              name='imageUrl'
              control={control}
              textFieldProps={{ required: true }}
              renderInput={({ field: { value, onChange } }) => (
                <Box
                  display='flex'
                  justifyContent='space-between'
                  alignItems='start'
                  gap={2}
                  flexShrink={0}
                  height={196}
                  width={240}
                >
                  <UploadAvatar formProps={form} name={'imageUrl'} />
                </Box>
              )}
            />
          </Box>
        </Box>
        <InputItem
          name='description'
          control={control}
          showErrorMessage
          label='설명'
          maxLength={20}
          textFieldProps={{ required: true }}
          renderInput={({ field, fieldState: { error } }) => (
            <PrimaryTextarea
              {...field}
              onChange={(e) => {
                if (e.target.value.length > 500) return
                field.onChange(e)
              }}
              value={field.value || ''}
              maxLength={500}
              placeholder='설문조사와 관련되어 응답자에게 전달하고 싶은 메시지를 적어주세요.'
              sx={{
                background: home.gray300,
                width: '100%',
                borderColor: `${error ? '#f44336' : home.gray200} !important`,
                boxShadow: 'unset !important'
              }}
            />
          )}
        />
        <Stack flexDirection={'row'} gap={remConvert('20px')}>
          <SurveyResetButton
            sx={{ background: home.gray200 }}
            onClick={() =>
              reset(
                {
                  title: '',
                  imageUrl: '',
                  description: '',
                  startDate: '',
                  endDate: ''
                },
                { keepDefaultValues: true }
              )
            }
          />
          <SubmitButton type='submit' sx={{ flexGrow: 1, '.MuiButton-startIcon': { display: 'none' } }}>
            설문조사에 추가
          </SubmitButton>
        </Stack>
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
          name='startDate'
          control={control}
          label={'기간'}
          renderInput={() => {
            const data = getValues()
            return <Typography className={styles.viewInput}>{getTimeDiff(data.startDate, data.endDate)}</Typography>
          }}
        />
        <InputItem
          name='description'
          control={control}
          label='설명'
          renderInput={({ field }) => <Typography className={styles.viewInput}>{field.value}</Typography>}
        />
        <InputItem
          name='imageUrl'
          label='이미지'
          control={control}
          renderInput={({ field: { value } }) => (
            <Image
              style={{
                objectFit: 'cover',
                borderRadius: remConvert('10px')
              }}
              width='320'
              height='160'
              src={value}
              alt='imageUrl'
            />
          )}
        />
        <Stack flexDirection={'row'} gap={remConvert('20px')}>
          <EditButton sx={{ flexGrow: 1 }} onClick={() => setStatus(FormStatus.inprogress)} />
          <DeleteButton sx={{ flexGrow: 1, visibility: 'hidden' }}>설문조사에 추가</DeleteButton>
        </Stack>
      </Box>
    )
  }
  return (
    <Box component='form' onSubmit={handleSubmit(onFinish)}>
      <CompleteFormAccordion
        expanded={isExpanded}
        onChange={(e, value) => setIsExpanded(value)}
        title={'설문조사 기본 정보'}
        subTitle={'설문조사 진행과 관련된 기본적인 사항을 정합니다.'}
        status={status}
        sx={{
          '.MuiAccordionSummary-content': {
            margin: remConvert('16px 0'),
            lineHeight: '150%',
            '&.Mui-expanded': {
              marginBottom: remConvert('10px')
            }
          },
          '.MuiAccordionDetails-root': {
            gap: remConvert('20px'),
            paddingTop: 0,
            '>.MuiTypography-body1': {
              fontSize: remConvert('14px')
            }
          }
        }}
      >
        {status === FormStatus.inprogress ? formEdit() : formView()}
      </CompleteFormAccordion>
    </Box>
  )
}
export default BasicInfomation
