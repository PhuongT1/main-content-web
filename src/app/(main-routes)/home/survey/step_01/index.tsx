'use client'
import { Stack, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { FormProvider, Resolver, useFieldArray, useForm } from 'react-hook-form'
import React, { FC, useMemo, useState } from 'react'
import { remConvert } from '@/utils/convert-to-rem'
import FormDivider from '@/components/form-divider'
import { SurveyItemType, SurveyItems, SurveySchema, SurveyViewType } from '@/types/survey.type'
import BasicInfomation from './basic_infomation'
import { EditButton, MoreButton, SubmitButton } from '@/components/home/button'
import { getTimeDiff } from '../_component/commonFunction'
import SurveyItem from './survey_item'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { yupResolver } from '@hookform/resolvers/yup'
import SurveyPreview from './survey_preview'
import moment from 'moment'
import { ModalConfirm, ModalReset } from '@/components/dialog/modal-deck'
import useToggle from '@/hooks/use-toggle'
import DownloadIcon from '@/assets/icons/download'
import ErrorMessage from '@/form/ErrorMessage'
import { useMutation } from '@tanstack/react-query'
import { addSurveyItem, createrSurveyBasicInformation } from '@/services/survey.service'

interface Props {
  id: number
  onCreatedSurvey: () => void
}

const Step_01_Survey: FC<Props> = ({ id, onCreatedSurvey }) => {
  const {
    palette: { home }
  } = useTheme()
  const [timeReset, setTimeReset] = useState<string>('')
  const [showDialog, toggleShowDialog] = useToggle()
  const [showDialogConfirm, toggleShowDialogConfirm] = useToggle()
  const [isErrorMax, setErrorMax] = useState<Boolean>(false)
  const overQuantity = () => {
    if (isErrorMax) return
    setErrorMax(true)
    setTimeout(() => {
      setErrorMax(false)
    }, 4000)
  }

  const form = useForm<SurveyItemType>({
    resolver: yupResolver(SurveySchema) as any as Resolver<SurveyItemType, any>,
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      basicInformation: {},
      surveyItems: []
    }
  })

  const {
    control,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { isValid }
  } = form

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'surveyItems'
  })

  const { basicInformation } = watch()

  function dragEndEvent(e: DragEndEvent) {
    const { over, active } = e
    move(active.data.current?.sortable.index, over?.data.current?.sortable.index)
  }

  const dataReview: SurveyViewType | undefined = useMemo(() => {
    const data = watch()
    if (data) {
      return {
        id: 1,
        ...data.basicInformation,
        items: data.surveyItems?.map((data, index) => ({
          id: index + 1,
          ...data,
          options: data?.options ? data.options.map((keyOption, index) => ({ ...keyOption, id: index + 1 })) : null
        }))
      } as SurveyViewType
    }
  }, [watch()])

  const { mutate: createItems } = useMutation({
    mutationFn: ({ id, form }: { id: number; form: SurveyItems[] }) => addSurveyItem(id, form),
    onSuccess: () => onCreatedSurvey(),
    onError(error) {
      console.log(error)
    }
  })

  const { mutate } = useMutation({
    mutationFn: ({ id, form }: { id: number; form: SurveyItemType }) =>
      createrSurveyBasicInformation(id, form.basicInformation),
    onSuccess: (data, variables) => {
      createItems({ id: data.id, form: variables.form.surveyItems })
    },
    onError(error) {
      console.log({ error })
    }
  })

  const onFinish = (data: SurveyItemType) => {
    toggleShowDialogConfirm()
    mutate({ id, form: data })
  }

  return (
    <FormProvider {...form}>
      <Box component={'div'} display={'flex'} gap={remConvert('40px')} paddingTop={remConvert('60px')}>
        <Box
          component={'div'}
          display={'flex'}
          flexDirection={'column'}
          gap={remConvert('28px')}
          sx={{ width: remConvert('400px') }}
        >
          <Box
            component={'h3'}
            sx={{
              padding: remConvert('20px 10px'),
              background: home.gray400,
              borderRadius: remConvert('10px'),
              textAlign: 'center',
              fontSize: remConvert('20px')
            }}
          >
            설문조사 미리보기
          </Box>
          <SurveyPreview data={dataReview} />
        </Box>
        <Box component={'div'} flexGrow={1} display={'flex'} flexDirection={'column'} gap={remConvert('40px')}>
          <Box
            component={'div'}
            display={'flex'}
            flexDirection={'column'}
            sx={{
              padding: remConvert('20px'),
              background: home.gray400,
              borderRadius: remConvert('10px')
            }}
            gap={remConvert('20px')}
          >
            <Box display={'flex'} flexDirection={'column'} gap={remConvert('5px')}>
              <Box
                component={'h4'}
                textAlign={'center'}
                sx={{
                  fontSize: remConvert('20px'),
                  fontWeight: 600
                }}
              >
                {basicInformation?.title || '제목이 입력됩니다.'}
              </Box>
              <Box
                component={'p'}
                textAlign={'center'}
                sx={{
                  fontSize: remConvert('16px'),
                  fontWeight: 400,
                  color: home.gray100
                }}
              >
                {getTimeDiff(basicInformation?.startDate, basicInformation?.endDate) || '기간이 입력됩니다.'}
              </Box>
            </Box>
            <FormDivider />
            <BasicInfomation key={timeReset} />
            <DndContext onDragEnd={dragEndEvent}>
              <SortableContext items={fields}>
                {fields.map((data, index) => (
                  <SurveyItem
                    id={data.id}
                    key={data.id}
                    onChangeSurvey={(data) => setValue(`surveyItems.${index}`, data, { shouldValidate: true })}
                    onDelete={() => remove(index)}
                  />
                ))}
              </SortableContext>
              <MoreButton
                disabled={!basicInformation?.title || (!isValid && fields.length > 0)}
                title='설문문항 추가'
                sx={{
                  width: '0',
                  marginInline: 'auto',
                  border: `1px solid ${home.blue500} !important`,
                  color: `${home.blue500} !important`,
                  '&.MuiButton-root.Mui-disabled': {
                    opacity: '50%'
                  }
                }}
                svgComponentProps={{ pathProps: { stroke: home.blue500 } }}
                onClick={() => {
                  if (fields.length < 9) return append({} as SurveyItems)
                  else {
                    overQuantity()
                  }
                }}
              >
                설문문항 추가
              </MoreButton>
            </DndContext>
            {isErrorMax && <ErrorMessage message={'설문문항은 최대 10개까지 추가 가능합니다.'} />}
          </Box>
          <Stack flexDirection={'row'} gap={remConvert('20px')}>
            <EditButton
              sx={{ flexGrow: 1, background: home.gray400 }}
              title='설문조사 전체 초기화'
              onClick={() => toggleShowDialog()}
            />
            <SubmitButton
              type='submit'
              disabled={!isValid}
              sx={{ flexGrow: 1 }}
              startIcon={<DownloadIcon pathProps={{ stroke: home.gray500 }} />}
              onClick={toggleShowDialogConfirm}
            >
              설문조사 생성하기
            </SubmitButton>
          </Stack>
        </Box>
        <ModalConfirm
          open={showDialogConfirm}
          onCancel={toggleShowDialogConfirm}
          onSubmit={(e) => handleSubmit(onFinish)(e)}
        />
        <ModalReset
          open={showDialog}
          onCancel={toggleShowDialog}
          onSubmit={() => {
            setTimeReset(moment().toISOString())
            reset({ basicInformation: undefined, surveyItems: [] }, { keepDefaultValues: true })
            toggleShowDialog()
          }}
        />
      </Box>
    </FormProvider>
  )
}

export default Step_01_Survey
