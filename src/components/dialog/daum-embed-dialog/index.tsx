import { convertToRem } from '@/utils/convert-to-rem'
import { Dialog, DialogContent, DialogProps } from '@mui/material'
import DaumPostcodeEmbed from 'react-daum-postcode'

export default function DaumEmbedDialog({
  handleClose,
  handleComplete,
  ...rest
}: DialogProps & { handleClose: () => void; handleComplete: (data: any) => void }) {
  return (
    <Dialog
      onClose={handleClose}
      {...rest}
      sx={{
        '& .MuiPaper-root': {
          backgroundImage: 'none',
          maxWidth: 'unset',
          width: convertToRem(1200),
          borderRadius: convertToRem(16)
        }
      }}
    >
      <DialogContent
        sx={{
          padding: 0,
          borderRadius: 0
        }}
      >
        <DaumPostcodeEmbed
          style={{
            width: '100%',
            height: '60vh'
          }}
          onClose={handleClose}
          onComplete={handleComplete}
        />
      </DialogContent>
    </Dialog>
  )
}
