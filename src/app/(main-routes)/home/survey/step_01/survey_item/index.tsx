'use client'
import { Box, FormControlLabel, IconButton, Radio, RadioGroup, Stack, useTheme } from '@mui/material'
import React, { FC, useMemo, useState } from 'react'
import { FormStatus } from '../../../card-news/utils/common'
import CompleteFormAccordion from '@/components/complete-form-accordion'
import { FormProvider, useForm } from 'react-hook-form'
import {
  EnumSurveyItemType,
  SurveyDemographicSchema,
  SurveyItems,
  SurveyMultiChoiceSchema,
  SurveySelectionSchema,
  SurveySubjectiveSchema
} from '@/types/survey.type'
import InputItem from '@/form/input'
import { remConvert } from '@/utils/convert-to-rem'
import { DeleteButton, EditButton, SubmitButton } from '@/components/home/button'
import MultiChoice from './multiple_choice'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import SubjectiveQuestion from './subjective_question'
import Demographic from './demographic'
import SelectionSurvey from './selection'
import FivePointScale from './five_point_scale'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import ParkIcon from '@/assets/icons/park'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import SurveyResetButton from '../../_component/survey-reset-button'

interface Props {
  id: string
  onChangeSurvey: (data: SurveyItems) => void
  onDelete: () => void
}

const SurveyItem: FC<Props> = ({ onChangeSurvey, onDelete, id }) => {
  const {
    palette: { home }
  } = useTheme()
  const [yupResolverType, setYupResolverType] = useState<yup.ObjectSchema<any>>(SurveyMultiChoiceSchema)
  const [status, setStatus] = useState<FormStatus>(FormStatus.inprogress)
  const [selectType, setSelectType] = useState<EnumSurveyItemType>()
  const [isExpanded, setIsExpanded] = useState<boolean>(true)
  const form = useForm<SurveyItems>({
    resolver: yupResolver(yupResolverType),
    mode: 'onBlur',
    reValidateMode: 'onChange'
  })

  const {
    control,
    reset,
    handleSubmit,
    watch,
    getValues,
    clearErrors,
    formState: { isDirty }
  } = form

  const onReset = (typeEdit?: EnumSurveyItemType) => {
    const type = typeEdit || getValues('type')
    clearErrors()
    if (type) {
      switch (type) {
        case EnumSurveyItemType.MULTI_CHOICE:
          setYupResolverType(SurveyMultiChoiceSchema)
          return reset({
            type,
            title: '',
            imageUrl: '',
            options: [],
            configs: {
              allowMultiSelection: false,
              allowAddOption: false,
              isRequired: false
            }
          })
        case EnumSurveyItemType.SUBJECTIVE:
          setYupResolverType(SurveySubjectiveSchema)
          return reset({
            type,
            title: '',
            imageUrl: '',
            options: null,
            configs: {
              numericInputOnly: false,
              isRequired: false
            }
          })
        case EnumSurveyItemType.FIVE_POINT_SCALE:
          setYupResolverType(SurveySelectionSchema)
          return reset({
            type,
            title: '',
            imageUrl: '',
            configs: { isRequired: false },
            options: [
              { point: 1, title: '매우불만족' },
              { point: 2, title: '불만족' },
              { point: 3, title: '보통' },
              { point: 4, title: '만족' },
              { point: 5, title: '매우만족' }
            ]
          })
        case EnumSurveyItemType.SELECTION:
          setYupResolverType(SurveySelectionSchema)
          return reset({
            type,
            title: '',
            imageUrl: '',
            configs: null,
            options: [{ title: '있다' }, { title: '없다' }]
          })
        case EnumSurveyItemType.DEMOGRAPHIC:
          setYupResolverType(SurveyDemographicSchema)
          return reset({
            type,
            title: '',
            imageUrl: '',
            configs: null,
            options: []
          })
        default:
          return reset({ type, options: null }, { keepDefaultValues: true })
      }
    } else {
      return reset({ type, options: null }, { keepDefaultValues: true })
    }
  }

  const onFinish = (data: SurveyItems) => {
    onChangeSurvey(data)
    setStatus(FormStatus.completed)
    setIsExpanded(false)
  }

  const formWithType = useMemo(() => {
    const type = watch('type')
    switch (type) {
      case EnumSurveyItemType.MULTI_CHOICE:
        return <MultiChoice status={status} />
      case EnumSurveyItemType.SUBJECTIVE:
        return <SubjectiveQuestion status={status} />
      case EnumSurveyItemType.FIVE_POINT_SCALE:
        return <FivePointScale status={status} />
      case EnumSurveyItemType.SELECTION:
        return <SelectionSurvey status={status} />
      case EnumSurveyItemType.DEMOGRAPHIC:
        return <Demographic status={status} />
      default:
        break
    }
  }, [watch('type'), status])

  const title = useMemo(() => {
    switch (status) {
      case FormStatus.completed:
        return getValues('title')
      default:
        return 'ㅣ설문문항 추가'
    }
  }, [status])

  const subTitle = useMemo(() => {
    switch (status) {
      case FormStatus.completed:
        return '설문조사 진행과 관련된 기본적인 사항을 정합니다.'
      default:
        return '설문구조를 선택하고 설문문항을 설계해보세요.'
    }
  }, [status])

  const { setNodeRef, listeners, transform, transition, attributes } = useSortable({ id })
  const stylesSort = {
    transform: CSS.Translate.toString(transform),
    transition
  }

  return (
    <Box ref={setNodeRef} component='form' onSubmit={handleSubmit(onFinish)} style={stylesSort}>
      <CompleteFormAccordion
        expanded={isExpanded}
        onChange={(e, value) => setIsExpanded(value)}
        startIcon={
          status === FormStatus.completed && (
            <IconButton {...attributes} {...listeners} sx={{ margin: remConvert('-10px') }}>
              <ParkIcon pathProps={{ fill: home.gray50, stroke: home.gray50 }} />
            </IconButton>
          )
        }
        title={title}
        subTitle={subTitle}
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
              fontSize: remConvert('14px'),
              paddingLeft: status === FormStatus.completed ? remConvert('23px') : 0
            }
          }
        }}
      >
        <Box display={'flex'} gap={remConvert('24px')} flexDirection={'column'}>
          {status === FormStatus.inprogress && (
            <Box
              sx={{
                background: home.alpha_blue_10,
                border: `1px solid ${home.blue500}`,
                borderRadius: remConvert('9px'),
                padding: remConvert('20px')
              }}
            >
              <InputItem
                name='type'
                control={control}
                label={'설문구조 선택'}
                renderInput={({ field }) => (
                  <RadioGroup
                    key={field.value}
                    {...field}
                    onChange={(e) => {
                      isDirty
                        ? setSelectType(e.target.value as EnumSurveyItemType)
                        : onReset(e.target.value as EnumSurveyItemType)
                    }}
                    row
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='row-radio-buttons-group'
                  >
                    {Object.values(EnumSurveyItemType).map((value, index) => (
                      <FormControlLabel key={value} value={value} control={<Radio />} label={value} />
                    ))}
                  </RadioGroup>
                )}
              />
            </Box>
          )}
          <FormProvider key={'surveyItem'} {...form}>
            {formWithType}
          </FormProvider>
          {status === FormStatus.inprogress ? (
            <Stack flexDirection={'row'} gap={remConvert('20px')}>
              <SurveyResetButton sx={{ background: home.gray200 }} onClick={() => onReset()} />
              <SubmitButton type='submit' sx={{ flexGrow: 1, '.MuiButton-startIcon': { display: 'none' } }}>
                설문조사에 추가
              </SubmitButton>
            </Stack>
          ) : (
            <Stack flexDirection={'row'} gap={remConvert('20px')}>
              <EditButton
                sx={{ flexGrow: 1, background: home.gray200 }}
                onClick={() => setStatus(FormStatus.inprogress)}
              />
              <DeleteButton sx={{ flexGrow: 1 }} onClick={() => onDelete()}>
                삭제하기
              </DeleteButton>
            </Stack>
          )}
        </Box>
      </CompleteFormAccordion>
      <DeleteDeck
        title='입력한 데이터가 모두 삭제됩니다.'
        description={
          <>
            작성중인 상태에서 다른 구조로 변경할 경우,
            <br /> 현재 입력한 데이터가 모두 삭제됩니다.
            <br /> 변경하시겠습니까?
          </>
        }
        open={!!selectType}
        onCancel={() => setSelectType(undefined)}
        onSubmit={() => {
          onReset(selectType)
          setSelectType(undefined)
        }}
        containerSx={{
          '>.MuiStack-root': {
            border: 'unset'
          }
        }}
      />
    </Box>
  )
}
export default SurveyItem
