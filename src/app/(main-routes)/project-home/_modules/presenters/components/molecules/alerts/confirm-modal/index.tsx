'use client'
import { ReactElement } from 'react'
import { Box, useTheme } from '@mui/material'
import { convertToRem } from '@/utils/convert-to-rem'
import { Dialog } from '@/components'
import { Typography } from '@/elements'
import CloseCircleIcon from '@/assets/icons/close-circle'
import ConfirmationIcon from '@/assets/icons/dialog-icons/confirmation'
import ErrorIcon from '@/assets/icons/error'
import TrashRedIcon from '@/assets/icons/dialog-icons/trash-red'
import { TYPE_MODAL_CONFIRM } from '@/app/(main-routes)/project-home/_modules/domain'
import { useLanguage } from '@/hooks/use-language'
import * as S from './style'

interface IConfirmModal {
  open: boolean
  title: string
  description?: string | ReactElement
  onClose: () => void
  onCancel?: () => void
  cancelText?: string
  onSubmit?: () => void
  submitText?: string
  type?: TYPE_MODAL_CONFIRM
}

export const ConfirmModal = ({
  open,
  onClose,
  title,
  description,
  onCancel,
  cancelText,
  onSubmit,
  submitText,
  type = TYPE_MODAL_CONFIRM.SUCCESS
}: IConfirmModal) => {
  const { dict } = useLanguage()
  const { palette } = useTheme()

  const submitStyle = [TYPE_MODAL_CONFIRM.DELETE, TYPE_MODAL_CONFIRM.ERROR].includes(type)
    ? {
        color: palette.home.gray500,
        backgroundColor: palette.home.red500,
        borderColor: palette.home.red500,
        '&:hover': {
          backgroundColor: palette.home.red500
        }
      }
    : {}

  const renderIcon = (typeModal: TYPE_MODAL_CONFIRM) => {
    switch (typeModal) {
      case TYPE_MODAL_CONFIRM.SUCCESS:
        return <ConfirmationIcon />
      case TYPE_MODAL_CONFIRM.CAN_NOT_ACTION:
        return (
          <S.BoxIcon
            sx={{
              backgroundColor: 'rgba(68, 189, 189, 0.10)'
            }}
          >
            <CloseCircleIcon color={palette.home.mint500} />
          </S.BoxIcon>
        )
      case TYPE_MODAL_CONFIRM.DELETE:
        return <TrashRedIcon />
      case TYPE_MODAL_CONFIRM.ERROR:
        return (
          <S.BoxIcon
            sx={{
              backgroundColor: 'rgba(234, 57, 57, 0.10)'
            }}
          >
            <ErrorIcon color={palette.home.red500} />
          </S.BoxIcon>
        )

      default:
        break
    }
  }

  return (
    <Dialog
      mdFullScreen
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { maxWidth: 560, width: '100%', borderRadius: convertToRem(24) } }}
      dialogContentProps={{
        sx: {
          padding: '0 !important'
        }
      }}
    >
      <Box display='flex' flexDirection='column' maxHeight={`calc(100vh - ${convertToRem(64)})`}>
        <S.Content>
          {renderIcon(type)}
          <S.HeadModal>
            <Typography cate='title_2_semibold' color={palette.home.gray50}>
              {title}
            </Typography>
            {!!description && (
              <Typography cate='body_3' color={palette.home.gray100}>
                {description}
              </Typography>
            )}
          </S.HeadModal>
        </S.Content>

        <S.Actions>
          {onCancel && (
            <S.Button
              title={cancelText || dict.common_cancel}
              type='button'
              cate='outlined'
              customSize={'sm'}
              onClick={onCancel}
              sx={{
                color: palette.home.gray50,
                border: `1px solid ${palette.home.gray300}`,
                backgroundColor: palette.home.gray300
              }}
            />
          )}
          {onSubmit && (
            <S.Button
              title={submitText || dict.common_next}
              type='button'
              cate='primary'
              customSize={'sm'}
              onClick={onSubmit}
              sx={submitStyle}
            />
          )}
        </S.Actions>
      </Box>
    </Dialog>
  )
}

export default ConfirmModal
