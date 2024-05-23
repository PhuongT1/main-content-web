import { ResponsiveBox, Typography } from '@/elements'
import { Box } from '@mui/material'
import { ReactNode } from 'react'

type TopTitle = {
  icon: ReactNode
  title: string
  subTitle1: string
  subTitle2: string
}

const TopTitle = ({ icon, title, subTitle1, subTitle2 }: TopTitle) => {
  return (
    <ResponsiveBox
      display={'flex'}
      gap={2}
      breakpoints={{ md: { gap: 1 } }}
      flexDirection={'column'}
      alignItems={'center'}
      textAlign={'center'}
    >
      {icon}
      <Typography cate='title_2_bold' breakpoints={{ md: 'title_60' }} plainColor='main_grey.gray950'>
        {title}
      </Typography>
      <Box>
        <Typography cate='sub_title_20' plainColor='main_grey.gray950'>
          {subTitle1}
        </Typography>
        <Typography cate='sub_title_20' plainColor='main_grey.gray950'>
          {subTitle2}
        </Typography>
      </Box>
    </ResponsiveBox>
  )
}

export default TopTitle
