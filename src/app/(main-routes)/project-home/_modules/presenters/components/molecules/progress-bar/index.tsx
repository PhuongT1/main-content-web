import { Box, linearProgressClasses, useTheme } from '@mui/material'
import { RequireChildren } from '@/types/types.type'
import { convertToRem } from '@/utils/convert-to-rem'
import * as S from './style'

interface IProgressBar extends RequireChildren {
  progress: number
}

export const ProgressBar = ({ children, progress }: IProgressBar) => {
  const { palette } = useTheme()

  return (
    <Box display='flex' flexDirection='column' gap={convertToRem(10)}>
      {children}
      <S.Progress
        variant='determinate'
        value={Math.min(progress, 100)}
        sx={{
          [`& .${linearProgressClasses.bar}`]: {
            backgroundColor: progress >= 100 ? palette.home.blue500 : palette.home.mint500
          }
        }}
      />
    </Box>
  )
}
