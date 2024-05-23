import { RequireChildren } from '@/types/types.type'
import { Box, SxProps } from '@mui/material'

type RegisterGuidelineProps = {
  sx?: SxProps
} & RequireChildren

const RegisterGuideline = ({ children, sx }: RegisterGuidelineProps) => {
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      flexDirection={'column'}
      justifyContent={'center'}
      gap={1}
      borderRadius={'9999px'}
      border={1}
      borderColor={'main_grey.gray600'}
      boxShadow={'0px 0px 6px rgba(65, 145, 206, 0.83)'}
      sx={{
        bgcolor: 'main_grey.gray800',
        height: {
          md: 173,
          xs: 110
        },
        width: {
          md: 173,
          xs: 110
        },
        ...sx
      }}
    >
      {children}
    </Box>
  )
}

export default RegisterGuideline
