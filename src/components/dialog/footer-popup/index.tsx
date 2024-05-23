import CloseCircleIcon from '@/assets/icons/close-circle'
import { Typography } from '@/elements'
import { SecondaryOutlinedChip } from '@/elements/v2/chip'
import { getTextStyles } from '@/themes/get-design-tokens'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Dialog, DialogContent, IconButton, Stack, useTheme } from '@mui/material'
import TermContent from './components/term-content'
import { CATE, FooterPopupProps } from './footer-popup.type'
import styles from './styles.module.scss'
import PrivacyContent from './components/privacy-content'
import PaymentContent from './components/payment-content'

const cateType = [
  {
    label: '이용약관',
    value: CATE.TERM
  },
  {
    label: '개인정보 처리 방침',
    value: CATE.PRIVACY
  },
  {
    label: '결제 및 환불 정책',
    value: CATE.PAYMENT
  }
]

const FooterPopup = ({
  title,
  description,
  cate,
  onSubmit,
  onCancel,
  submitTitle,
  cancelTitle,
  type = 'dark',
  onClose,
  setCate,
  ...props
}: FooterPopupProps) => {
  const theme = useTheme()

  const handleClose = (event: React.MouseEvent<HTMLElement>, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick' && props.disableEscapeKeyDown) {
      event.preventDefault()
      return
    } else {
      if (onCancel) {
        onCancel()
      } else if (onSubmit) {
        onSubmit()
      }
    }
  }

  const handleChangeCate = (val: CATE) => {
    setCate && setCate(val)
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
          maxWidth: convertToRem(824),
          backgroundImage: 'none'
        }
      }}
    >
      <DialogContent className={`${styles.popup_wrapper} ${type === 'dark' ? styles.dark : styles.light}`}>
        <div className={`${styles.content_wrapper}`}>
          <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
            <Stack direction={'row'} alignItems={'center'} gap={1} width={{ md: 'auto', sm: '100%' }}>
              {cateType.map(({ label, value }, idx) => (
                <SecondaryOutlinedChip
                  key={`type-${idx}`}
                  chipHeight={33}
                  sx={{
                    minWidth: convertToRem(81),
                    borderRadius: convertToRem(1000)
                  }}
                  clickable
                  active={cate === value}
                  label={
                    <Typography plainColor='main.white' cate='button_20'>
                      {label}
                    </Typography>
                  }
                  onClick={() => handleChangeCate(value)}
                />
              ))}
            </Stack>
            <IconButton onClick={() => onCancel?.()}>
              <CloseCircleIcon width={32} height={32} stroke={theme.palette.main_grey.gray100} />
            </IconButton>
          </Stack>
          <Box
            my={4}
            sx={{
              height: convertToRem(560),
              width: '100%',
              padding: '1rem',
              overflow: 'auto',
              ...getTextStyles(14, 150, 400, 0),
              color: theme.palette.main_grey.gray100,
              img: {
                maxWidth: '100%'
              }
            }}
          >
            {cate === CATE.TERM && <TermContent />}
            {cate === CATE.PRIVACY && <PrivacyContent />}
            {cate === CATE.PAYMENT && <PaymentContent />}
          </Box>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default FooterPopup
