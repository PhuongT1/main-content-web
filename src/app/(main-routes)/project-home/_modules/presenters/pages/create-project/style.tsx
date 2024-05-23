import { Box, BoxProps, Skeleton, Stack, styled, useTheme } from '@mui/material'
import { convertToRem } from '@/utils/convert-to-rem'

export const ProjectName = styled(Box)<BoxProps>(({ theme }) => ({
  '.MuiTypography-root': {
    display: 'none'
  }
}))

export const SkeletonTemplate = () => {
  const { palette } = useTheme()

  return (
    <Stack flexDirection='row' gap={convertToRem(20)} flexWrap='wrap'>
      {Array.from(Array(8).keys()).map((item) => {
        return (
          <Stack
            key={item}
            width={`calc((100% - ${convertToRem(20 * 3)})/4)`}
            justifyContent='space-between'
            height={convertToRem(250)}
            padding={convertToRem(20)}
            borderRadius={convertToRem(10)}
            sx={{
              backgroundColor: palette.home.gray400
            }}
          >
            <Stack gap={convertToRem(16)}>
              <Skeleton variant='rounded' width='80%' height={24} />
              <Skeleton variant='rounded' width='60%' height={24} />
              <Skeleton variant='rounded' width='100%' height={51} />
              <Stack flexDirection='row' gap={convertToRem(10)}>
                <Skeleton variant='rounded' width='40%' height={18} />
                <Skeleton variant='rounded' width='40%' height={18} />
              </Stack>
            </Stack>
            <Skeleton variant='rounded' width='100%' height={41} sx={{ marginTop: convertToRem(10) }} />
          </Stack>
        )
      })}
    </Stack>
  )
}
