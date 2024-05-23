import { Typography } from '@/elements'
import { Box } from '@mui/material'
import Image from 'next/image'
import TemplateHeading from '../template-heading'

const TemplateSlogan = ({ data }: any) => {
  return (
    <Box>
      <Box marginBottom={'166px'}>
        <TemplateHeading title='우리는 한마디로' subTitle='슬로건' />
      </Box>
      <Box>
        <Typography
          sx={{ lineBreak: 'anywhere' }}
          cate='sub_title_40'
          fontSize={'32px'}
          color='#292A2C'
          fontWeight={700}
        >
          {data}
        </Typography>
      </Box>
    </Box>
  )
}

export default TemplateSlogan
