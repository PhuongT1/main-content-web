import Typography from '@/elements/typography'
import { useThemeMode } from '@/hooks/use-theme-mode'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Dialog, DialogContent, Stack, useMediaQuery, useTheme } from '@mui/material'
import { GrayButton, PrimaryButton } from '../v2/button'
import styles from './alert-popup.module.scss'
import { AlertPopupProps } from './alert-popup.type'
import { THEME_MODE } from '@/constants/common.constant'

export default function AlertPopup({
  title,
  description,
  onSubmit,
  onCancel,
  submitTitle,
  cancelTitle,
  type = 'default',
  onClose,
  icon,
  active = false,
  ...props
}: AlertPopupProps & { active?: boolean }) {
  const theme = useTheme()
  const { themeMode } = useThemeMode()
  const smSize = useMediaQuery(theme.breakpoints.down(575))
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
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: '#FFFFFF40'
          }
        }
      }}
      sx={{
        '& .MuiDialog-paper': {
          maxWidth: convertToRem(560),
          backgroundImage: 'none',
          backgroundColor: themeMode === THEME_MODE.DARK ? theme.palette.home.gray500 : theme.palette.main.white,
          borderRadius: convertToRem(24)
        }
      }}
    >
      <DialogContent
        className={`${styles.popup_wrapper}`}
        sx={{
          padding: convertToRem(32)
        }}
      >
        <div className={`${styles.content_wrapper}`}>
          <Box
            sx={{
              marginBottom: convertToRem(18)
            }}
          >
            {icon}
          </Box>
          <Typography
            cate={smSize ? 'subtitle_1_semibold' : 'title_2_bold'}
            color={themeMode === THEME_MODE.DARK ? theme.palette.main.gray10 : theme.palette.main.gray90}
            className={`${styles.title}`}
          >
            {title}
          </Typography>
          <Typography
            cate='body_3'
            color={themeMode === THEME_MODE.DARK ? theme.palette.main.gray10 : theme.palette.main.gray40}
            className={`${styles.description}`}
          >
            {description}
          </Typography>
        </div>
        <Box
          sx={{
            height: convertToRem(40)
          }}
        />
        <Stack
          direction={'row'}
          gap={1}
          justifyContent={{ md: 'flex-end', sm: 'center' }}
          className={`${styles.action_wrapper}`}
        >
          {(cancelTitle !== undefined || onCancel !== undefined) && (
            <GrayButton
              btnSize='sm-np'
              onClick={onCancel}
              disableElevation
              sx={{
                minWidth: convertToRem(120),
                flex: { sm: 1, md: 'unset' },
                backgroundColor: theme.palette.home.gray300,
                '&:hover': {
                  backgroundColor: theme.palette.home.gray200
                }
              }}
            >
              <Typography
                cate='button_2_semibold'
                color={themeMode === THEME_MODE.DARK ? theme.palette.main.gray40 : theme.palette.main.gray40}
              >
                {cancelTitle || '확인'}
              </Typography>
            </GrayButton>
          )}
          {(submitTitle !== undefined || onSubmit !== undefined) && (
            <PrimaryButton
              btnSize='sm-np'
              onClick={onSubmit}
              sx={{
                minWidth: convertToRem(120),
                flex: { sm: 2, md: 'unset' }
              }}
            >
              <Typography
                cate='button_2_semibold'
                color={themeMode === THEME_MODE.DARK ? theme.palette.main.white : theme.palette.main.white}
              >
                {submitTitle || '확인'}
              </Typography>
            </PrimaryButton>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
