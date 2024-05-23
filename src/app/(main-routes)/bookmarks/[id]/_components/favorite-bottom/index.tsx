'use client'
import { BookMarkIcon, HeartIcon } from '@/assets/icons'
import { GraySolidIconButton, Typography } from '@/elements'
import { Box, useTheme } from '@mui/material'

const FavoriteBottom = () => {
  const theme = useTheme()
  return (
    <Box display={'flex'} justifyContent={'space-between'}>
      <Box display={'flex'} gap={0.5} alignItems={'center'}>
        <HeartIcon svgProps={{ height: 16, width: 16 }} pathProps={{ stroke: theme.palette.main_grey.gray50 }} />
        <Typography plainColor='main_grey.gray200' cate='caption_10'>
          4,100 · 1일전
        </Typography>
      </Box>
      <Box>
        <GraySolidIconButton btnSize='p8'>
          <BookMarkIcon
            pathProps={{ fill: theme.palette.main_primary.blue500, stroke: theme.palette.main_primary.blue500 }}
          />
        </GraySolidIconButton>
      </Box>
    </Box>
  )
}

export default FavoriteBottom
