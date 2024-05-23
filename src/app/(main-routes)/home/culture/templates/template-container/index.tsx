import { Box, BoxProps } from '@mui/material'
import TemplateFooter from '../template-footer'

const TemplateContainer = ({ sx, children }: BoxProps) => {
  return (
    <Box
      sx={{
        padding: '80px 40px 40px 40px',
        boxSizing: 'border-box',
        backgroundColor: 'white',
        borderRadius: '10px',
        height: '842px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        whiteSpace: 'pre-line',

        ...sx
      }}
    >
      {children}
    </Box>
  )
}

export default TemplateContainer
