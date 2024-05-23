import { convertToRem } from '@/utils/convert-to-rem'
import styled from '@emotion/styled'
import { Box, BoxProps, Skeleton, Stack, useTheme } from '@mui/material'

export const TemplatesBlock = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  minHeight: convertToRem(192),
  '.template-item': {
    paddingRight: convertToRem(20)
  }
}))

export const SkeletonTemplate = () => {
  const { palette } = useTheme()

  return (
    <Stack flexDirection='row' gap={convertToRem(20)}>
      {[1, 2, 3].map((item) => {
        return (
          <Stack
            key={item}
            width='32%'
            justifyContent='space-between'
            height={convertToRem(192)}
            padding={convertToRem(20)}
            borderRadius={convertToRem(10)}
            sx={{
              backgroundColor: palette.home.gray400
            }}
          >
            <Stack gap={convertToRem(16)}>
              <Skeleton variant='rounded' width='80%' height={30} />
              <Skeleton variant='rounded' width='100%' height={20} />
            </Stack>
            <Skeleton variant='rounded' width='50%' height={44} sx={{ marginTop: convertToRem(10) }} />
          </Stack>
        )
      })}
    </Stack>
  )
}
