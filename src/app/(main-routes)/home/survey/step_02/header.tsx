'use client'
import React, { FC, useMemo } from 'react'
import { Box, Button, IconButton, SvgIcon, useTheme } from '@mui/material'
import { remConvert } from '@/utils/convert-to-rem'
import RefreshIcon from '@/assets/icons/refresh'
import { CalendarIcon } from '@/assets/icons'
import SettingSmIcon from '@/assets/icons/header-menu-icons/setting-sm'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import AddDocument from '@/assets/icons/survey/add-document'
import DownloadDocument from '@/assets/icons/survey/dowload-document'
import { ContentCopy, PowerSettingsNew } from '@mui/icons-material'
import UserIcon from '@/assets/icons/survey/user'
import ChatIcon from '@/assets/icons/survey/chat'
import { ContainerAnalytics, IconButtonSurvey, PropsItemSurveyAnalytics } from '.'
import moment from 'moment'
import { getTimeDiff } from '../_component/commonFunction'
import { SurveyStatusEnum } from '@/types/survey.type'
import ModalChagePeriod from './modal-chage-period'
import { useDialog } from '@/hooks/use-dialog'

interface Props extends PropsItemSurveyAnalytics {
  onDowloadExcel?: () => void
  onDowload?: () => void
  onReset?: () => void
  onSetEnd?: () => void
}

const SurveyAnalyticsHeader: FC<Props> = ({ isPDF, dataSurvey, onDowloadExcel, onDowload, onReset, onSetEnd }) => {
  const {
    palette: { home }
  } = useTheme()

  const [, copy] = useCopyToClipboard()
  const { open: openChangePeriod, onClose: onCloseChangePeriod, onOpen: onOpenChangePeriod } = useDialog()
  const surveyURL = useMemo(() => `${window.location.origin}/share/survey/${dataSurvey.id}`, [dataSurvey.id])
  const renderStatus = useMemo(() => {
    if (dataSurvey.userEnded) {
      return '종료'
    }
    switch (dataSurvey.status) {
      case SurveyStatusEnum.BEFORE_PROGRESS:
        return '진행 예정'
      case SurveyStatusEnum.IN_PROGRESS:
        return '진행중'
      case SurveyStatusEnum.ENDED:
        return '종료'
    }
  }, [dataSurvey.status, dataSurvey.userEnded])
  return (
    <>
      <ContainerAnalytics sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: remConvert('10px') }}>
          <Box fontSize={remConvert('20px')} fontWeight={600}>
            {dataSurvey.title}
          </Box>
          {moment().diff(dataSurvey.createdAt, 'days') <= 2 && (
            <Box
              sx={{
                padding: remConvert('2px 16px'),
                borderRadius: remConvert('100px'),
                border: `1px solid ${home.yellow}`,
                color: home.yellow,
                fontSize: remConvert('16px'),
                fontWeight: 400,
                lineHeight: '120%'
              }}
            >
              New
            </Box>
          )}
          <Box color={home.mint500} fontWeight={400}>
            {renderStatus}
          </Box>
        </Box>
        <Box sx={{ display: isPDF ? 'none' : 'flex', alignItems: 'center', gap: remConvert('10px') }}>
          <IconButtonSurvey onClick={() => onReset && onReset()}>
            <RefreshIcon pathProps={{ stroke: home.gray50 }} />
          </IconButtonSurvey>
          <IconButtonSurvey onClick={() => onDowloadExcel && onDowloadExcel()}>
            <AddDocument pathProps={{ fill: home.gray50 }} />
          </IconButtonSurvey>
          <IconButtonSurvey onClick={() => onDowload && onDowload()}>
            <DownloadDocument pathProps={{ fill: home.gray50 }} />
          </IconButtonSurvey>
          <IconButtonSurvey onClick={() => onSetEnd && onSetEnd()}>
            <PowerSettingsNew />
          </IconButtonSurvey>
        </Box>
      </ContainerAnalytics>
      <Box
        sx={{
          display: 'flex',
          gap: remConvert('10px')
        }}
      >
        <ContainerAnalytics sx={{ gap: remConvert('24px') }}>
          설문기간
          <Box display={'flex'} alignItems={'center'} gap={remConvert('13px')}>
            <Box display={'inline-flex'}>
              <CalendarIcon pathProps={{ stroke: home.blue500 }} />
            </Box>
            <Box>{getTimeDiff(dataSurvey.startDate, dataSurvey.endDate, true)}</Box>
          </Box>
          <IconButton onClick={() => onOpenChangePeriod()}>
            <SettingSmIcon gProps={{ stroke: home.gray50 }} />
          </IconButton>
          <ModalChagePeriod
            title={'선택'}
            dataSurvey={dataSurvey}
            onReset={onReset}
            open={openChangePeriod}
            onCancel={() => onCloseChangePeriod()}
            paperSx={{ width: 'auto', maxWidth: 'unset' }}
          />
        </ContainerAnalytics>
        <ContainerAnalytics sx={{ gap: remConvert('24px') }}>
          응답자수
          <Box display={'flex'} alignItems={'center'} gap={remConvert('13px')}>
            <Box display={'inline-flex'}>
              <UserIcon />
            </Box>
            <Box>{dataSurvey.totalRespondents}명</Box>
          </Box>
        </ContainerAnalytics>
        <ContainerAnalytics sx={{ gap: remConvert('24px'), flexGrow: 1, width: 0 }}>
          설문링크
          <Box display={'flex'} alignItems={'center'} gap={remConvert('13px')} sx={{ flexGrow: 1, width: 0 }}>
            <SvgIcon sx={{ width: remConvert('17px'), height: remConvert('17px'), color: home.blue500 }}>
              <ContentCopy />
            </SvgIcon>
            <Box
              component={'a'}
              sx={{
                color: home.blue500,
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                textDecorationLine: 'underline'
              }}
              target='_blank'
              href={surveyURL}
            >
              {surveyURL}
            </Box>
          </Box>
          <Button
            sx={{
              padding: remConvert('9px 12px'),
              borderRadius: remConvert('8px'),
              border: `1px solid ${home.gray200}`,
              fontSize: remConvert('14px'),
              color: home.gray50,
              background: home.gray300
            }}
            onClick={() => copy(surveyURL)}
          >
            링크 복사
          </Button>
        </ContainerAnalytics>
      </Box>
      <ContainerAnalytics sx={{ alignItems: 'start', gap: remConvert('24px'), marginBottom: remConvert('20px') }}>
        <Box sx={{ whiteSpace: 'nowrap' }}>설문내용</Box>
        <Box display={'flex'} gap={remConvert('13px')}>
          <Box display={'inline-flex'}>
            <ChatIcon />
          </Box>
          <Box>{dataSurvey.description}</Box>
        </Box>
      </ContainerAnalytics>
    </>
  )
}

export default SurveyAnalyticsHeader
