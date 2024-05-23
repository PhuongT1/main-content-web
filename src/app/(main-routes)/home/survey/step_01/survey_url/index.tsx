'use client'
import { Box, useTheme } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import {
  DEMOGRAPHIC_TYPE_ENUM,
  EnumSurveyItemType,
  ReviewSurveySelection,
  SurveyStatusEnum,
  SurveyViewAnswersType,
  SurveyViewType
} from '@/types/survey.type'
import { FormProvider, useForm } from 'react-hook-form'
import yup from '@/services/yup.service'
import { yupResolver } from '@hookform/resolvers/yup'
import SurveyURLForm from './survey_form'
import { remConvert } from '@/utils/convert-to-rem'
import ConfirmationIcon from '@/assets/icons/dialog-icons/confirmation'
import LogoKrDark from '@/assets/icons/app-icons/logo-kr-dark'
import ViewStatus from './survey_form/view-status'
import EndProgress from '@/assets/icons/survey/end-progress.tsx'
import BeforeProgress from '@/assets/icons/survey/before-progress'
import moment from 'moment-timezone'
import NewLogo from '@/assets/icons/app-icons/logo-2'
export interface PropsSurveyURL {
  id: number
  data?: SurveyViewType
  isPreview?: boolean
}

const SurveyURL: FC<PropsSurveyURL> = (props) => {
  const { data } = props
  const {
    palette: { home, mode }
  } = useTheme()
  const [isFinish, setIsFinish] = useState<boolean>(false)
  const schema = yup.object({
    items: yup.array().of(
      yup.lazy((itemYup) => {
        const isRequired = data?.items.find((item) => item.id === itemYup.id)
        if (isRequired?.configs?.isRequired || isRequired?.type === EnumSurveyItemType.DEMOGRAPHIC) {
          return yup.object({
            answers: yup
              .array()
              .required()
              .min(1)
              .test(' ', ' ', (options) => {
                if (isRequired?.type === EnumSurveyItemType.DEMOGRAPHIC) {
                  return options
                    ? !options.find((option, index) => {
                        if (isRequired.options?.[index].title === DEMOGRAPHIC_TYPE_ENUM.EDUCATION) {
                          const [education, educationStatus] = (option.answer || '').split('_')
                          return !education || !educationStatus
                        }
                        return !option.answer
                      })
                    : true
                }
                return options && isRequired?.type !== EnumSurveyItemType.MULTI_CHOICE
                  ? options.some((option) => !!option)
                  : true
              })
          })
        }
        return yup.object()
      })
    )
  })

  const form = useForm<SurveyViewAnswersType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema as yup.ObjectSchema<any>)
  })

  useEffect(() => {
    const defaultAnswers = data?.items.map((item, index) => {
      const surveyItem = data.items[index]
      if (surveyItem.type === EnumSurveyItemType.SELECTION) {
        return {
          id: item.id,
          answers: [(surveyItem as ReviewSurveySelection).options[0].id]
        }
      }
      return {
        id: item.id,
        answers: []
      }
    })
    form.reset({
      items: defaultAnswers || []
    })
  }, [data])

  const moveToLink = (url: string) => {
    const link = document.createElement('a')
    link.href = url
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  const renderBodyForm = () => {
    if (props.isPreview) {
      return <SurveyURLForm {...props} setIsFinish={() => setIsFinish(true)} />
    } else if (data?.userEnded) {
      return <ViewStatus title='이미 종료된 설문조사입니다.' subTit=' ' icon={<EndProgress />} />
    } else if (isFinish) {
      return (
        <ViewStatus
          title='결과가 제출 되었습니다.'
          subTit='슘페터에 가입하고 더 많은 콘텐츠를 경험해보세요.'
          icon={<ConfirmationIcon width={remConvert('80px')} height={remConvert('80px')} />}
        />
      )
    }
    switch (data?.status) {
      case SurveyStatusEnum.BEFORE_PROGRESS:
        return (
          <ViewStatus
            title='진행 전인 설문조사입니다.'
            subTit={`설문조사 기간 : ${moment(data.startDate).tz('Asia/Seoul').format('YYYY.MM.DD')}`}
            icon={<BeforeProgress />}
          />
        )
      case SurveyStatusEnum.IN_PROGRESS:
        return <SurveyURLForm {...props} setIsFinish={() => setIsFinish(true)} />
      default:
        return <ViewStatus title='이미 종료된 설문조사입니다.' subTit=' ' icon={<EndProgress />} />
    }
  }

  return (
    <FormProvider key={'survey_url'} {...form}>
      <Box
        display={'flex'}
        flexDirection={'column'}
        color={home.gray50}
        lineHeight={'150%'}
        maxWidth={remConvert('450px')}
        width={'100%'}
        sx={{ flexGrow: 1, wordWrap: 'break-word' }}
      >
        <Box display={'flex'} flexDirection={'column'} color={home.gray50} sx={{ flexGrow: 1 }} width={'100%'}>
          <Box
            sx={{
              padding: remConvert('12px 15px'),
              position: props.isPreview ? 'unset' : 'sticky',
              top: 0,
              background: home.gray500,
              zIndex: 100
            }}
          >
            {mode === 'dark' ? <LogoKrDark /> : <NewLogo />}
          </Box>
          {renderBodyForm()}
        </Box>
      </Box>
    </FormProvider>
  )
}
export default SurveyURL
