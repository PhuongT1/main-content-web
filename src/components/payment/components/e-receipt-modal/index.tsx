import { Box } from '@mui/material'

type TEReceiptModalProps = {
  url: string
}

const EReceiptModal = ({ url }: TEReceiptModalProps) => {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%'
      }}
      component={'iframe'}
      src={url}
    />
  )
}

export default EReceiptModal
