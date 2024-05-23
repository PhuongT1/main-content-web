import { Box, BoxProps, Skeleton, Stack, styled, useTheme } from '@mui/material'
import { convertToRem } from '@/utils/convert-to-rem'

export const Form = styled('form')(({ theme }) => ({
  display: 'block'
}))

export const ProjectName = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: convertToRem(8),
  '.error-message': {
    display: 'none'
  }
}))

export const Content = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: convertToRem(20),
  flex: 1,
  padding: `${convertToRem(32)} ${convertToRem(40)}`,
  borderTop: `1px solid ${theme.palette.home.gray200}`,
  borderBottom: `1px solid ${theme.palette.home.gray200}`,
  overflow: 'hidden',
  overflowY: 'auto'
}))

export const Actions = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: convertToRem(12),
  justifyContent: 'flex-end',
  padding: convertToRem(32)
}))

export const SkeletonTemplate = () => {
  const { palette } = useTheme()

  return (
    <Stack flexDirection='row' gap={convertToRem(20)} flexWrap='wrap'>
      {Array.from(Array(4).keys()).map((item) => {
        return (
          <Stack
            key={item}
            width={`calc((100% - ${convertToRem(24)})/2)`}
            height={convertToRem(175)}
            justifyContent='space-between'
            padding={convertToRem(24)}
            borderRadius={convertToRem(10)}
            sx={{
              backgroundColor: palette.home.gray300
            }}
          >
            <Stack flexDirection='row' gap={convertToRem(6)}>
              <Skeleton variant='circular' width='20px' height='20px' />
              <Skeleton variant='rounded' width='40%' height={22} />
            </Stack>
            <Skeleton variant='rounded' width='100%' height={50} />
            <Stack flexDirection='row' gap={convertToRem(10)}>
              <Skeleton variant='rounded' width='30%' height={18} />
              <Skeleton variant='rounded' width='30%' height={18} />
            </Stack>
          </Stack>
        )
      })}
    </Stack>
  )
}
