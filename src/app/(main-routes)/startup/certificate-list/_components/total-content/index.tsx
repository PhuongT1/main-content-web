'use client'
import { Typography } from '@/elements'
import { Stack } from '@mui/material'

type props = {
  count: number
}

const TotalContent = ({ count }: props) => {
  return (
    <Stack direction={'row'} gap={1.25} alignItems={'center'}>
      <Typography cate='title_60' plainColor='main_grey.gray50'>
        {count}
      </Typography>
      <Typography cate='body_30' plainColor='main_grey.gray50'>
        개의 자료가 있습니다.
      </Typography>
    </Stack>
  )
}

export default TotalContent
