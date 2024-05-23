import { Box, BoxProps, useTheme } from '@mui/material'

type SectionBox = BoxProps

const SectionBox = ({ sx, children, ...rest }: BoxProps) => {
  const theme = useTheme()
  return (
    <Box sx={{ borderRadius: 4, backgroundColor: theme.palette.main_grey.gray800, ...sx }} {...rest}>
      {children}
    </Box>
  )
}

export default SectionBox
