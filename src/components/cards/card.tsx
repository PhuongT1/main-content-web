import { RequireChildren } from '@/types/types.type'
import { Box, SxProps } from '@mui/material'

type CardProps = {
  sx?: SxProps
} & RequireChildren

const Card = ({ children, sx }: CardProps) => {
  return <Box sx={{ borderRadius: 4, bgcolor: 'main_grey.gray800', p: 4, ...sx }}>{children}</Box>
}

export { Card }
