import { type JSX } from 'react'
import { Box, type BoxProps } from '@mui/material'
import { convertToRem } from '@/utils/convert-to-rem'

interface InvestmentProgressBarProps extends BoxProps {}

export function InvestmentProgressBar(props: InvestmentProgressBarProps): JSX.Element {
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      mt={'auto'}
      mx={-12.5}
      px={12.5}
      mb={-5}
      sx={{
        position: 'sticky',
        bottom: 0,
        width: 'calc(100% + 200px)',
        left: 0,
        right: 0,
        height: convertToRem(96),
        zIndex: 999
      }}
      color={'base_gray.200'}
      bgcolor={'home.dark_blue700'}
      {...props}
    >
      InvestmentProgressBar
    </Box>
  )
}
