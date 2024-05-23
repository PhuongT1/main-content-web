import { Typography } from '@/elements'
import { Box } from '@mui/material'
import Image from 'next/image'
import TemplateHeading from '../template-heading'
import { InterviewImage } from '@/assets/images/culture'

const TemplateInterview = ({ data }: any) => {
  return (
    <Box>
      <Box marginBottom={'140px'}>
        <TemplateHeading title='이런 질문을 하게 됩니다' subTitle='면접가이드' />
      </Box>
      <Box display={'flex'} alignItems={'center'}>
        <Image src={InterviewImage} width={220} height={440} alt='' style={{ transform: 'translateX(-52px)' }} />
        <ul style={{ listStyleType: 'disc' }}>
          {data.map((value: string, index: number) => {
            return (
              <Typography
                sx={{
                  marginBottom: '40px'
                }}
                key={index}
                cate='caption_1'
                color='#292A2C'
                fontWeight='700'
              >
                <li>{value}</li>
              </Typography>
            )
          })}
        </ul>
      </Box>
    </Box>
  )
}

export default TemplateInterview
