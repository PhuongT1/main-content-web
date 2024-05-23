import { ReactNode } from 'react'
import { Box, Modal as MuiModal, Typography, useTheme } from '@mui/material'
import Button from '@/elements/button'
import { convertToRem } from '@/utils/convert-to-rem'
import styles from './style.module.scss'

interface IButton {
  isShow?: boolean
  text?: string
  isDisabled?: boolean
}
interface IModal {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  children: ReactNode
  sxBox?: any
  sxModal?: any
  btnClose?: IButton
  btnConfirm?: IButton
  title?: string
  subTitle?: string
}

const BtnDefaultValue: IButton = { isShow: true, isDisabled: false }
const Modal = ({
  open,
  onClose,
  onConfirm,
  children,
  sxBox,
  sxModal,
  btnClose = BtnDefaultValue,
  btnConfirm = BtnDefaultValue,
  title,
  subTitle
}: IModal) => {
  const {
    palette: { home }
  } = useTheme()

  return (
    <MuiModal
      open={open}
      onClose={onClose}
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
      className={styles.wrapper_modal}
      sx={sxModal}
    >
      <Box className={styles.wrapper_box} sx={sxBox}>
        {title && (
          <Box className={styles.wrapper_title}>
            <Typography
              variant='h2'
              sx={{
                color: home.gray50,
                fontWeight: 700,
                fontSize: convertToRem(28),
                lineHeight: convertToRem(33)
              }}
            >
              {title}
            </Typography>
            {subTitle && (
              <Typography
                mt={0.75}
                sx={{
                  color: '#7E7E86',
                  fontWeight: 400,
                  fontSize: convertToRem(14),
                  lineHeight: convertToRem(21),
                  whiteSpace: 'pre-line'
                }}
              >
                {subTitle}
              </Typography>
            )}
          </Box>
        )}

        <Box className={styles.wrapper_content}>{children}</Box>

        <Box className={styles.wrapper_button}>
          {btnClose?.isShow && (
            <Button
              className={styles.button_outline}
              onClick={onClose}
              title={btnClose?.text || '취소'}
              cate='outlined'
            />
          )}
          {btnConfirm?.isShow && (
            <Button
              className={styles.button_primary}
              onClick={onConfirm}
              title={btnConfirm?.text || '추가하기'}
              cate='primary'
              disabled={btnConfirm?.isDisabled}
            />
          )}
        </Box>
      </Box>
    </MuiModal>
  )
}

export default Modal
