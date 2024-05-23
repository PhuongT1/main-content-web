'use client'
import { Box, Stack, styled, useTheme } from '@mui/material'
import React, { FC, useState } from 'react'
import { remConvert } from '@/utils/convert-to-rem'
import { Typography } from '@/elements'
import Download02Icon from '@/assets/icons/download02'
import Button from '@/elements/button'
import IcPreviewIcon from '@/assets/icons/icPreviewIcon'
import IcEditIcon from '@/assets/icons/icEdit'
import moment from 'moment'
import DowloadPDFDeck from '../dowloadPDF'
import ModalDownLoadMultiDeck from './modal-download-multi-deck'
import useToggle from '@/hooks/use-toggle'
import {
  ProjectDeckItem,
  IDetailProject,
  PROJECT_DECK_STATUS_ENUM,
  PROJECT_STATUS_ENUM,
  PROJECT_DECK_ENUM,
  PROJECT_PATHS_ENUM
} from '@/app/(main-routes)/project-home/_modules/domain'
import ProjectTable, {
  ColumnsTableProjectType
} from '@/app/(main-routes)/project-home/_modules/presenters/components/project-table'
import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'
import { activeStepSelector, completeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import Link from 'next/link'
import { getUrlWithParams } from '../../../../utils'
import { useLanguage } from '@/hooks/use-language'

interface Props {
  dataProject: IDetailProject
  showEditDeck: boolean
  showEditIR?: boolean
  showEditProject?: boolean
}

const DeckList: FC<Props> = ({ dataProject, showEditDeck, showEditIR, showEditProject }) => {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  const router = useRouter()
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const [, setActiveStep] = useRecoilState(activeStepSelector)
  const [, setCompleteStep] = useRecoilState(completeStepSelector)
  const [, setExpandStep] = useRecoilState(expandStepSelector)
  const [listUrlDowloadPDF, setListUrlDowloadPDF] = useState<ProjectDeckItem[]>([])

  const navigateToDeck = (idDeck: number) => {
    setActiveStep(0)
    setCompleteStep([])
    setExpandStep([])
    router.push(`${PROJECT_DECK_ENUM[idDeck].link}/${dataProject.id}`)
  }

  const texPractice = (status: PROJECT_DECK_STATUS_ENUM) => {
    if (showEditDeck) {
      switch (status) {
        case PROJECT_DECK_STATUS_ENUM.COMPLETED:
          return dict.common_edit
        case PROJECT_DECK_STATUS_ENUM.WORKING:
        case PROJECT_DECK_STATUS_ENUM.UNWORKING:
          return dict.common_view
      }
    }
    return dict.common_view
  }

  const columns: ColumnsTableProjectType<ProjectDeckItem>[] = [
    {
      title: 'Deck',
      key: 'name',
      onRender: (row) => <Box fontWeight={600}>{row.name}</Box>
    },
    {
      title: 'Step',
      key: 'stepProgress',
      onRender: (row) => {
        const [curentStep, totalStep] = row.stepProgress?.split(' / ') || []
        return (
          <Stack direction={'row'} justifyContent={'center'} fontWeight={600} color={home.gray100} gap={'4px'}>
            <Box>{curentStep}</Box>
            <Box color={home.gray200}>/{totalStep}</Box>
          </Stack>
        )
      }
    },
    {
      title: dict.project_home_detail_column_last_task,
      key: 'lastWorkingDate',
      onRender: (row) => <Box color={home.gray100}>{moment(row.lastWorkingDate).format('YYYY.MM.DD')}</Box>
    },
    {
      title: dict.project_home_detail_column_situation,
      key: 'status',
      onRender: (row) => {
        switch (row.status) {
          case PROJECT_DECK_STATUS_ENUM.COMPLETED:
            return (
              <Typography cate='body_3' color={home.yellow}>
                {dict.common_complete}
              </Typography>
            )
          case PROJECT_DECK_STATUS_ENUM.WORKING:
            return (
              <Typography cate='body_3' color={home.mint500}>
                {dict.project_home_status_writing}
              </Typography>
            )
          default:
            return (
              <Typography cate='body_3' color={home.gray100}>
                {dict.project_home_status_not_in_progress}
              </Typography>
            )
        }
      }
    },
    {
      title: dict.project_home_detail_column_download,
      key: 'status',
      width: '368px',
      onRender: (row) => (
        <Stack direction={'row'} color={home.gray100} gap={remConvert('10px')}>
          <DownloadButton
            disabled={row.status !== PROJECT_DECK_STATUS_ENUM.COMPLETED || !dataProject.allowReplication}
            startIcon={<Download02Icon />}
            cate={'contained'}
            onClick={() => setListUrlDowloadPDF((prew) => [...prew, row])}
            customTitle={
              <Typography cate='caption_1' flexGrow={1}>
                {dict.project_home_download_practice_results}
              </Typography>
            }
          />
          {row.hasIRDeck && (
            <DownloadButton
              disabled={row.status !== PROJECT_DECK_STATUS_ENUM.COMPLETED || !dataProject.allowReplication}
              startIcon={<Download02Icon />}
              cate={'contained'}
              customTitle={
                <Typography cate='caption_1' flexGrow={1}>
                  {dict.project_home_ir_deck_download}
                </Typography>
              }
            />
          )}
        </Stack>
      )
    },
    {
      title: dict.project_home_detail_column_practice,
      key: 'status',
      onRender: (row) => (
        <ButtonOutlined
          cate={showEditDeck && row.status === PROJECT_DECK_STATUS_ENUM.COMPLETED ? 'contained' : 'outlined'}
          disabled={!showEditDeck && row.status === PROJECT_DECK_STATUS_ENUM.UNWORKING}
          className={row.status === PROJECT_DECK_STATUS_ENUM.COMPLETED ? 'isComplete' : ''}
          onClick={() => navigateToDeck(row.id)}
          customTitle={
            <Typography cate='sub_title_30' flexGrow={1} sx={{ textWrap: 'nowrap' }}>
              {row?.status && texPractice(row.status)}
            </Typography>
          }
        />
      )
    }
  ]

  return (
    <Stack gap={remConvert('20px')} flexGrow={1}>
      <DowloadPDFDeck
        key={listUrlDowloadPDF.length}
        dataProject={dataProject}
        listDeck={listUrlDowloadPDF}
        onAfterPrint={() => setListUrlDowloadPDF([])}
      />
      <Stack direction='row' gap={remConvert('20px')} alignItems={'center'}>
        <Typography cate='title_50' flexGrow={1} color={home.gray100}>
          {dict.project_home_deck_list}
        </Typography>
        <DowloadButtonHeader
          onClick={() => setToggleShowDialog(true)}
          startIcon={<Download02Icon />}
          cate={'outlined'}
          disabled={
            dataProject.decks.reduce((a, b) => (b.status === PROJECT_DECK_STATUS_ENUM.COMPLETED ? a + 1 : a), 0) <= 1
          }
          customTitle={
            <Typography cate='caption_20' flexGrow={1}>
              {dict.project_home_modal_download_multi_deck_title}
            </Typography>
          }
        />
        {showEditIR && (
          <DowloadButtonHeader
            startIcon={<IcPreviewIcon />}
            cate={'outlined'}
            disabled={dataProject.status !== PROJECT_STATUS_ENUM.DONE}
            customTitle={
              <Link href={`/edit-ir/${dataProject.id}`} target='_blank'>
                <Typography cate='caption_20' flexGrow={1}>
                  {dict.project_home_ir_deck_editor}
                </Typography>
              </Link>
            }
          />
        )}
        {showEditProject && (
          <DowloadButtonHeader
            startIcon={<IcEditIcon />}
            cate={'outlined'}
            onClick={() => router.push(getUrlWithParams(PROJECT_PATHS_ENUM.EDIT_PROJECT, { id: `${dataProject.id}` }))}
            customTitle={
              <Typography cate='caption_20' flexGrow={1}>
                {dict.project_home_edit_deck}
              </Typography>
            }
          />
        )}
      </Stack>
      <Stack direction='row' gap={remConvert('20px')}>
        <ProjectTable all columns={columns} data={dataProject.decks} />
      </Stack>
      <ModalDownLoadMultiDeck
        listDecksCompleted={
          dataProject.decks.filter((item) => item.status === PROJECT_DECK_STATUS_ENUM.COMPLETED) || []
        }
        open={showDialog}
        onSubmit={(data) => {
          setToggleShowDialog(false)
          setListUrlDowloadPDF(data)
        }}
        onCancel={toggleShowDialog}
      />
    </Stack>
  )
}
export default DeckList

export const DowloadButtonHeader = styled(Button)(
  ({
    theme: {
      palette: { home }
    }
  }) => ({
    padding: remConvert('10px 18px'),
    height: 'unset',
    border: `1px solid ${home.gray300}`,
    '&.Mui-disabled': {
      border: `1px solid ${home.gray300} !important`,
      background: 'unset !important',
      '>p': { color: `${home.gray200} !important` },
      'svg path': {
        fill: home.gray200,
        stroke: home.gray200
      }
    }
  })
)

export const DownloadButton = styled(Button)(
  ({
    theme: {
      palette: { home }
    }
  }) => ({
    backgroundColor: home.gray300,
    padding: remConvert('10px 18px'),
    height: 'unset',
    border: 0,
    'svg path': {
      fill: home.gray50
    },
    '&.Mui-disabled': {
      border: `1px solid ${home.gray300} !important`,
      background: 'unset !important',
      '>p': { color: `${home.gray100} !important` },
      'svg path': {
        fill: home.gray100
      }
    }
  })
)

export const ButtonOutlined = styled(Button)(
  ({
    theme: {
      palette: { home }
    }
  }) => ({
    padding: remConvert('8px 18px'),
    height: 'unset',
    borderColor: home.blue500,
    '.MuiTypography-root': {
      color: home.blue500
    },
    '&.Mui-disabled': {
      borderColor: home.gray300,
      background: 'unset !important',
      '.MuiTypography-root': {
        color: home.gray100
      }
    },
    '&.isComplete': {
      border: 0,
      backgroundColor: home.gray400,
      '.MuiTypography-root': {
        color: home.gray50
      }
    }
  })
)
