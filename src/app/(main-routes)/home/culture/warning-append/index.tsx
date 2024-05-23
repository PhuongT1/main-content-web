import WarningIcon from '@/assets/icons/culture/warning-icon'
import { Typography } from '@/elements'
import { Alert, Box } from '@mui/material'
import { FC } from 'react'
export interface Props {
  text: string
}
const WarningAppend: FC<Props> = ({ text }) => {
  return (
    <Box
      sx={{
        padding: '16px 20px',
        backgroundColor: 'rgba(248, 186, 26, 0.10)',
        borderRadius: '8px',
        marginTop: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}
    >
      <Box sx={{ width: '20px', height: '20px' }}>
        <WarningIcon />
      </Box>
      <Typography cate='title_4_chip' fontWeight={'400'} color={'#EDEEF1'}>
        {text}
      </Typography>
    </Box>
  )
}

export default WarningAppend
