import { Typography } from '@/elements'
import { Box } from '@mui/material'
import { FC } from 'react'

export interface Props {
  title: string
  subTitle: string
}

const TemplateHeading: FC<Props> = ({ title, subTitle }) => {
  return (
    <Box>
      <Typography cate='body_10' color='#3C82F9' fontWeight='700' marginBottom='4px'>
        {title}
      </Typography>
      <Typography cate='sub_title_40' color='#292A2C' fontWeight='700'>
        {subTitle}
      </Typography>
    </Box>
  )
}

export default TemplateHeading
