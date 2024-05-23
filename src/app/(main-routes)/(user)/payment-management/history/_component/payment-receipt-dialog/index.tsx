import { PrimaryButton, Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { Dialog, DialogContent, DialogProps, useMediaQuery, useTheme } from '@mui/material'

type CustomDialogProps = DialogProps & {
  receiptUrl: string
  onCancel?: () => void
  onCSubmit?: () => void
}

const PaymentReceiptDialog = ({ receiptUrl, onCancel, onCSubmit, ...props }: CustomDialogProps) => {
  const theme = useTheme()
  const mdDown = useMediaQuery('(max-width: 768px)')

  const handleClose = (event: React.MouseEvent<HTMLElement>, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick' && props.disableEscapeKeyDown) {
      event.preventDefault()
      return
    }
    onCancel?.()
  }

  return (
    <Dialog
      onClose={handleClose}
      {...props}
      sx={{
        '& .MuiPaper-root': {
          display: 'flex',
          justifyContent: 'center',
          margin: 'auto 16px',
          backgroundImage: 'none',
          backgroundColor: theme.palette.main_grey.gray800,
          borderRadius: convertToRem(12),
          maxWidth: convertToRem(560),
          width: '100%'
        }
      }}
    >
      <DialogContent
        sx={{
          paddingY: convertToRem(32),
          paddingX: { md: convertToRem(32), sm: convertToRem(20) },
          width: '100%',
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'center'
        }}
      >
        <iframe src={receiptUrl} width={'100%'} loading='lazy' style={{ flex: 1, borderRadius: convertToRem(12) }} />
        <PrimaryButton
          fullWidth={mdDown}
          btnSize='xs-np'
          sx={{
            width: convertToRem(120)
          }}
          onClick={() => {
            onCancel?.()
          }}
        >
          <Typography cate='body_3_semibold'>확인</Typography>
        </PrimaryButton>
      </DialogContent>
    </Dialog>
  )
}

export default PaymentReceiptDialog
