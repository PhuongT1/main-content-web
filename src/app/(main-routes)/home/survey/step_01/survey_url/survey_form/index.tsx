'use client'
import { Box, useTheme } from '@mui/material'
import React, { FC, useState } from 'react'
import { remConvert } from '@/utils/convert-to-rem'
import { SubmitButton } from '@/components/home/button'
import {
  EnumSurveyItemType,
  ItemsSurveyViewType,
  ReviewSurveyDemographic,
  ReviewSurveyFivePointScale,
  ReviewSurveyMultiChoice,
  ReviewSurveySelection,
  ReviewSurveySubjective,
  SurveyViewAnswersType
} from '@/types/survey.type'
import SurveyContener from './survey-contener'
import ViewBasicInformation from './view-basic-information'
import { useFormContext } from 'react-hook-form'
import ViewMultipleChoise from './view-multiple-choice'
import ViewSubjective from './view-subjective'
import ViewFivePoint from './view-five-point'
import ViewSelection from './view-selection'
import ImageSurveyReView from '@/app/(main-routes)/home/survey/_component/image-survey-review'
import ViewDemographics from './view-demographics'
import { Checkbox } from '@/elements'
import ErrorMessage from '@/form/ErrorMessage'
import { ExceedingAlert } from '@/components'
import { useDialog } from '@/hooks/use-dialog'
import moment from 'moment'
import { useMutation } from '@tanstack/react-query'
import { postRespondSurvey } from '@/services/survey.service'
import { PropsSurveyURL } from '..'

interface Props extends PropsSurveyURL {
  setIsFinish: () => void
}

const SurveyURLForm: FC<Props> = ({ id, data, isPreview, setIsFinish }) => {
  const {
    palette: { home }
  } = useTheme()

  const form = useFormContext<SurveyViewAnswersType>()

  const {
    handleSubmit,
    formState: { errors }
  } = form

  const { onOpen: onOpenExceeding, open: openExceeding, onClose: onCloseExceeding } = useDialog()
  const [agreeInfomation, setAgreeInfomation] = useState<boolean>(false)
  const [timeSubmit, setTimeSubmit] = useState<string>('false')

  const { mutate } = useMutation({
    mutationFn: (form: SurveyViewAnswersType) => postRespondSurvey(id, form),
    onSuccess: () => setIsFinish(),
    onError(error) {
      console.log({ error })
    }
  })

  const renderItems = (data: ItemsSurveyViewType, index: number) => {
    switch (data.type) {
      case EnumSurveyItemType.MULTI_CHOICE:
        return <ViewMultipleChoise dataSurvey={data as ReviewSurveyMultiChoice} indexAnswers={index} />
      case EnumSurveyItemType.SUBJECTIVE:
        return <ViewSubjective dataSurvey={data as ReviewSurveySubjective} indexAnswers={index} />
      case EnumSurveyItemType.FIVE_POINT_SCALE:
        return <ViewFivePoint dataSurvey={data as ReviewSurveyFivePointScale} indexAnswers={index} />
      case EnumSurveyItemType.SELECTION:
        return <ViewSelection dataSurvey={data as ReviewSurveySelection} indexAnswers={index} />
      case EnumSurveyItemType.DEMOGRAPHIC:
        return <ViewDemographics dataSurvey={data as ReviewSurveyDemographic} indexAnswers={index} />
      default:
        break
    }
  }

  const onFinish = (dataAnswers: SurveyViewAnswersType) => {
    if (data?.items.find((value) => value.type === EnumSurveyItemType.DEMOGRAPHIC) && !agreeInfomation) {
      onOpenExceeding()
    } else mutate(dataAnswers)
  }

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setTimeSubmit(moment().toISOString())
    return handleSubmit(onFinish)(e)
  }

  return (
    <>
      <Box
        component='form'
        onSubmit={formSubmit}
        display={'flex'}
        flexGrow={1}
        gap={remConvert('20px')}
        flexDirection={'column'}
        padding={remConvert('20px')}
        sx={{ backgroundColor: home.gray500 }}
      >
        <Box
          sx={{
            fontSize: remConvert('24px'),
            fontWeight: 600
          }}
        >
          설문조사
        </Box>
        <ViewBasicInformation data={data} />
        <Box
          component={'ul'}
          display={'flex'}
          gap={remConvert('20px')}
          flexDirection={'column'}
          sx={{ listStylePosition: 'inside', listStyleType: 'decimal' }}
        >
          {data?.items.map((item, index) => {
            if (item.title) {
              return (
                <SurveyContener
                  key={index}
                  title={
                    <Box component={'li'}>
                      <Box
                        component={'span'}
                        sx={{
                          display: item.configs?.isRequired ? '' : 'none',
                          color: home.yellow,
                          background: home.alpha_yellow_10,
                          border: `1px solid ${home.yellow}`,
                          borderRadius: remConvert('99px'),
                          fontWeight: 400,
                          padding: remConvert('1px 6px'),
                          fontSize: remConvert('12px'),
                          marginRight: remConvert('10px'),
                          transform: 'translate(-50%, 0%)'
                        }}
                      >
                        필수
                      </Box>
                      {item.title}
                    </Box>
                  }
                >
                  {item.imageUrl && (
                    <ImageSurveyReView
                      alt='viewMultipleChoise'
                      src={item.imageUrl}
                      style={{ borderRadius: remConvert('6px'), objectFit: 'cover' }}
                    />
                  )}
                  {renderItems(item, index)}
                  {!!errors.items?.[index] && (
                    <ErrorMessage key={timeSubmit} isHide message={'필수항목이 선택되지 않았습니다'} />
                  )}
                  {item.type === EnumSurveyItemType.DEMOGRAPHIC && (
                    <Box
                      display={'flex'}
                      flexDirection={'column'}
                      gap={remConvert('12px')}
                      sx={{
                        padding: remConvert('12px 16px'),
                        background: home.alpha_blue_10,
                        border: `1px solid ${home.blue500}`,
                        borderRadius: remConvert('8px')
                      }}
                    >
                      위 개인정보의 수집 및 이용목적은 설문조사 통계를 위해서만 활용됩니다. 성명, 소속, 이메일, 주소 및
                      연락처 정보는 보유기간(90일)이 지난 후에 지체없이 자동으로 파기합니다. 귀하는 이에 대한 동의를
                      거부할 수 있습니다. 다만, 동의가 없을 경우에는 경품 선정 등이 취소됩니다. 개인정보 활용에
                      동의합니다
                      <Box
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'end'}
                        sx={{ margin: remConvert('-9px') }}
                      >
                        개인정보 활용에 동의합니다
                        <Checkbox checked={agreeInfomation} onChange={() => setAgreeInfomation(!agreeInfomation)} />
                      </Box>
                    </Box>
                  )}
                </SurveyContener>
              )
            }
          })}
        </Box>
        <SubmitButton
          disabled={isPreview}
          type='submit'
          sx={{ marginTop: 'auto', '.MuiButton-startIcon': { display: 'none' } }}
        >
          설문조사 완료하기
        </SubmitButton>
      </Box>
      <ExceedingAlert
        title='현재 접수 인원이 초과되었습니다.'
        description='신청 대기로 접수하시겠습니까?'
        onCancel={onCloseExceeding}
        onSubmit={() => {
          onCloseExceeding()
          handleSubmit(onFinish)
        }}
        open={openExceeding}
        submitTxt='대기 접수하기'
        cancelTxt='취소'
      />
    </>
  )
}
export default SurveyURLForm
