'use client'
import { AlertProps } from '..'
import { useTheme } from '@mui/material'
import TrashRedIcon from '@/assets/icons/dialog-icons/trash-red'
import { ModalNotification } from '../modal-deck'
import { useLanguage } from '@/hooks/use-language'

const DeleteDeck = ({
  title = '',
  description = '',
  submitTxt = '',
  cancelTxt = '',
  onCancel,
  onSubmit,
  ...rest
}: AlertProps) => {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()

  return (
    <ModalNotification
      icon={<TrashRedIcon pathProps={{ fill: home.red500 }} />}
      title={title || dict.modal_delete_deck_title}
      description={description || dict.modal_delete_deck_description}
      sxButtonSubmit={{
        bgcolor: home.red500,
        '&:hover': {
          bgcolor: home.red500
        }
      }}
      onCancel={onCancel}
      onSubmit={onSubmit}
      submitTxt={submitTxt || dict.common_check}
      cancelTxt={cancelTxt || dict.common_cancel}
      {...rest}
    />
  )
}

export { DeleteDeck }
