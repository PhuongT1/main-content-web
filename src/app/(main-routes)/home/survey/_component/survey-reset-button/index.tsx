import React, { FC, memo } from 'react'
import { ButtonProps, useTheme } from '@mui/material'
import { RefreshButton } from '@/components/home/button'
import { ModalReset } from '@/components/dialog/modal-deck'
import useToggle from '@/hooks/use-toggle'

interface SurveyResetButton extends ButtonProps {}

const SurveyResetButton: FC<SurveyResetButton> = ({ onClick, ...props }) => {
  const {
    palette: { home }
  } = useTheme()
  const [showDialog, toggleShowDialog] = useToggle()

  return (
    <>
      <RefreshButton sx={{ background: home.gray200 }} onClick={() => toggleShowDialog()} {...props} />
      <ModalReset
        open={showDialog}
        onCancel={toggleShowDialog}
        onSubmit={(e) => {
          onClick && onClick(e)
          toggleShowDialog()
        }}
      />
    </>
  )
}

export default memo(SurveyResetButton)
