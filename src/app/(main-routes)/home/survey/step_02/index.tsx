'use client'
import React, { FC, useRef, useState } from 'react'
import { Box, IconButton, Stack, styled, useTheme } from '@mui/material'
import { remConvert } from '@/utils/convert-to-rem'
import {
  EnumSurveyItemType,
  ItemsSurveyViewType,
  ReviewSurveyDemographic,
  ReviewSurveyFivePointScale,
  ReviewSurveyMultiChoice,
  ReviewSurveySelection,
  ReviewSurveySubjective,
  SurveyViewType
} from '@/types/survey.type'
import SurveyAnalyticsHeader from './header'
import AnalyticsMultipeChoice from './analytics-multipe-choice'
import AnalyticsSubjective from './analytics-subjective'
import AnalyticsFivePoint from './analytics-five-point-scale'
import AnalyticsSelection from './analytics-selection'
import AnalyticsDemographic from './analytics-demographic'
import { useReactToPrint } from 'react-to-print'
import moment from 'moment'
import { useMutation } from '@tanstack/react-query'
import { deleteSurvey, getSurveyExcel, setEndSurvey } from '@/services/survey.service'
import { NextDeckButton, RefreshButton } from '@/components/home/button'
import { ModalReset } from '@/components/dialog/modal-deck'
import useToggle from '@/hooks/use-toggle'

export interface PropsAnalyticsItem<T> {
  idSurvey: number
  indexSurvey: number
  itemSurvey: T
  isPDF?: boolean
}

export interface PropsSurveyAnalytics {
  dataSurvey: SurveyViewType
  refetchSurvey: () => void
  onResetSurvey: () => void
}

export interface PropsItemSurveyAnalytics extends PropsSurveyAnalytics {
  isPDF?: boolean
}

const Step_02_Survey: FC<PropsSurveyAnalytics> = (props) => {
  const {
    palette: { home }
  } = useTheme()
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const [showDialogEnd, toggleShowDialogEnd, setToggleShowDialogEnd] = useToggle()
  const { dataSurvey, refetchSurvey, onResetSurvey } = props
  const [keyReload, setKeyReload] = useState<string>('')

  const renderAnalytics = (itemSurvey: ItemsSurveyViewType, index: number, isPDF?: boolean) => {
    switch (itemSurvey.type) {
      case EnumSurveyItemType.MULTI_CHOICE:
        return (
          <AnalyticsMultipeChoice
            idSurvey={dataSurvey.id}
            indexSurvey={index}
            itemSurvey={itemSurvey as ReviewSurveyMultiChoice}
            isPDF={isPDF}
          />
        )
      case EnumSurveyItemType.SUBJECTIVE:
        return (
          <AnalyticsSubjective
            idSurvey={dataSurvey.id}
            indexSurvey={index}
            itemSurvey={itemSurvey as ReviewSurveySubjective}
            isPDF={isPDF}
          />
        )
      case EnumSurveyItemType.FIVE_POINT_SCALE:
        return (
          <AnalyticsFivePoint
            idSurvey={dataSurvey.id}
            indexSurvey={index}
            itemSurvey={itemSurvey as ReviewSurveyFivePointScale}
          />
        )
      case EnumSurveyItemType.SELECTION:
        return (
          <AnalyticsSelection
            idSurvey={dataSurvey.id}
            indexSurvey={index}
            itemSurvey={itemSurvey as ReviewSurveySelection}
          />
        )
      case EnumSurveyItemType.DEMOGRAPHIC:
        return (
          <AnalyticsDemographic
            idSurvey={dataSurvey.id}
            indexSurvey={index}
            itemSurvey={itemSurvey as ReviewSurveyDemographic}
            isPDF={isPDF}
          />
        )
      default:
        break
    }
  }
  const targetRef = useRef<HTMLDivElement>(null)

  const dowloadPDF = useReactToPrint({
    content: () => targetRef.current,
    documentTitle: `Survey_${dataSurvey.id}`,
    pageStyle: () => `
    @media print {
      html, body {
        // overflow: hidden;
        zoom: 80%;
        -webkit-print-color-adjust: exact;
      }
      .page-break {
        margin-top: 1rem;
        display: block;
        page-break-before: auto;
      }
    }
    @page {
      size: auto;
      margin-block: 20mm;
      }`
  })

  const { mutate: endSurvey } = useMutation({
    mutationFn: () => setEndSurvey(dataSurvey.id),
    onSuccess: () => {
      setToggleShowDialogEnd(false)
      refetchSurvey()
    },
    onError(error) {
      setToggleShowDialogEnd(false)
      console.log(error)
    }
  })

  const { mutate: onDowloadExcel } = useMutation({
    mutationFn: () => getSurveyExcel(dataSurvey.id),
    onError(error) {
      console.log(error)
    }
  })

  const { mutate: onDeleteSurvey } = useMutation({
    mutationFn: () => deleteSurvey(dataSurvey.id),
    onSuccess: () => {
      setToggleShowDialog(false)
      onResetSurvey()
    },
    onError(error) {
      console.log(error)
      setToggleShowDialog(false)
    }
  })

  return (
    <>
      <Box
        key={`${keyReload}_main`}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: remConvert('20px'),
          color: home.gray50,
          paddingTop: remConvert('60px'),
          position: 'relative'
        }}
      >
        <Box fontSize={remConvert('20px')} fontWeight={700}>
          설문조사 결과
        </Box>
        <SurveyAnalyticsHeader
          onReset={() => setKeyReload(moment().toISOString())}
          onDowloadExcel={() => onDowloadExcel()}
          onDowload={() => dowloadPDF()}
          onSetEnd={() => setToggleShowDialogEnd(true)}
          {...props}
        />
        {dataSurvey.items.map((_item, index) => renderAnalytics(_item, index))}
      </Box>
      <Stack direction={'row'} justifyContent={'end'} gap={remConvert('20px')} sx={{ marginTop: remConvert('44px') }}>
        <RefreshButton onClick={() => setToggleShowDialog(true)} />
        <NextDeckButton />
        <ModalReset
          title={'초기화 하시겠습니까?'}
          description={'초기화할 경우 모든 데이터가 삭제되며 복구할 수 없습니다. 진행하시겠습니까?'}
          open={showDialog}
          onCancel={toggleShowDialog}
          onSubmit={() => onDeleteSurvey()}
        />
        <ModalReset
          title={'설문조사를 종료하시겠습니까?'}
          description={
            <>
              설문조사를 종료할 경우, 결과 데이터가 모두 삭제되며 복구할 수 없습니다. <br />
              진행하시겠습니까?
            </>
          }
          open={showDialogEnd}
          onCancel={toggleShowDialogEnd}
          onSubmit={() => endSurvey()}
        />
      </Stack>
      <Box
        sx={{
          position: 'fixed',
          top: '100%',
          left: 0,
          width: '1208px',
          opacity: 0
        }}
      >
        <Box
          key={`${keyReload}_pdf`}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: remConvert('20px'),
            color: home.gray50,
            width: '100%'
          }}
          ref={targetRef}
        >
          <SurveyAnalyticsHeader isPDF={true} {...props} />
          {dataSurvey.items.map((_item, index) => renderAnalytics(_item, index, true))}
        </Box>
      </Box>
    </>
  )
}

export default Step_02_Survey

export const ContainerAnalytics = styled(Box)(
  ({
    theme: {
      palette: { home }
    }
  }) => ({
    display: 'flex',
    padding: remConvert('20px'),
    background: home.gray400,
    borderRadius: remConvert('10px'),
    gap: remConvert('10px'),
    alignItems: 'center',
    fontWeight: 600
  })
)
export const IconButtonSurvey = styled(IconButton)(
  ({
    theme: {
      palette: { home }
    }
  }) => ({
    background: home.gray300,
    padding: remConvert('16px'),
    svg: {
      width: remConvert('16px'),
      height: remConvert('16px')
    }
  })
)
