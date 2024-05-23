'use client'
import XCircleIcon from '@/assets/icons/dialog-icons/x-circle'
import { IconButton, Typography, WhiteInput } from '@/elements'
import { PrimaryButton } from '@/elements/v2/button'
import { useThemeMode } from '@/hooks/use-theme-mode'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Dialog, DialogContent, Stack, useTheme } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { SharePopupProps } from './share-popup.type'
import styles from './styles.module.scss'

const SharePopup = ({ title, type = 'default', url, onSubmit, onCancel, onClose, ...props }: SharePopupProps) => {
  const theme = useTheme()
  const { themeMode } = useThemeMode()
  // const [copiedText, copy] = useCopyToClipboard()

  const handleClose = (event: React.MouseEvent<HTMLElement>, reason: 'backdropClick' | 'escapeKeyDown') => {
    event.stopPropagation()
    if (reason === 'backdropClick' && props.disableEscapeKeyDown) {
      event.preventDefault()
      return
    } else {
      if (onCancel) {
        onCancel(event)
      } else if (onSubmit) {
        onSubmit(event)
      }
    }
  }
  return (
    <Dialog
      onClose={handleClose}
      {...props}
      classes={{
        paper: styles.popup_paper,
        container: styles.popup_container,
        root: styles.popup_root
      }}
      sx={{
        '& .MuiDialog-paper': {
          maxWidth: 'unset',
          backgroundImage: 'none',
          width: convertToRem(560),
          borderRadius: 5
        }
      }}
      onClick={(event) => {
        event.stopPropagation()
      }}
    >
      <DialogContent
        className={`${styles.popup_wrapper}`}
        sx={{
          bgcolor: 'popup.general.background.color'
        }}
      >
        <Box className={`${styles.content_wrapper}`}>
          <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
            <Typography cate='title_3_semibold' plainColor={'popup.title'} className={`${styles.title}`}>
              공유하기
            </Typography>
            <IconButton onClick={onCancel}>
              <XCircleIcon
                pathProps={{
                  stroke: theme.palette.popup.title
                }}
              />
            </IconButton>
          </Stack>

          <Box mt={3} width={'100%'}>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'} width={'100%'} gap={2}>
              <WhiteInput
                readOnly
                fullWidth
                placeholder='youtube url'
                value={url}
                sx={{
                  padding: '1rem !important',
                  fieldset: {
                    padding: '0 !important'
                  },
                  '.MuiInputAdornment-root': {
                    display: 'none'
                  },
                  '.MuiInputBase-input': {
                    overflow: 'auto',
                    width: '100%',
                    height: '100% !important'
                  }
                }}
              />
              <CopyToClipboard
                text={url}
                onCopy={() => {
                  enqueueSnackbar('링크가 복사 되었습니다.', { variant: 'success' })
                }}
              >
                <PrimaryButton
                  btnSize='sm-np'
                  sx={{
                    width: convertToRem(120)
                  }}
                >
                  <Typography cate='button_30'>복사</Typography>
                </PrimaryButton>
              </CopyToClipboard>
            </Stack>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default SharePopup
