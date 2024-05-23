import { Box } from '@mui/material'
import TemplateHeading from '../template-heading'
import Image from 'next/image'
import { Avatar, Dot } from '@/assets/images/culture'
import { Typography } from '@/elements'

const TemplateKeyCustomerSettings = ({ data }: any) => {
  return (
    <Box>
      <Box marginBottom={'135px'}>
        <TemplateHeading title='함께합니다' subTitle='주요 고객 설정' />
      </Box>
      <Box sx={{ padding: '4px 0', borderTop: '2px solid #3C82F9', borderBottom: '2px solid #3C82F9' }}>
        <Box
          sx={{
            padding: '24px 8px',
            borderBottom: '1px solid #3C82F966',
            borderTop: '1px solid #3C82F966',
            display: 'flex',
            gap: '40px'
          }}
        >
          <Box sx={{ width: '45%', display: 'flex', alignItems: 'center', gap: '20px', maxHeight: '48px' }}>
            <Image src={Avatar} width={48} height={48} alt='' />
            <Typography cate='body_3_semibold' fontWeight='700' color='#3C82F9'>
              고객 페르소나
            </Typography>
          </Box>
          <Box sx={{ width: '55%', display: 'flex', gap: '20px' }}>
            <Box sx={{ display: 'flex', gap: '8px', flexDirection: 'column', padding: '14px' }}>
              <Box sx={{ display: 'flex', gap: '8px' }}>
                <Typography cate='caption_2' fontWeight='700' color='#292A2C'>
                  성별
                </Typography>
                <Typography cate='caption_2' fontWeight='400' color='#292A2C'>
                  {data.gender}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '8px' }}>
                <Typography cate='caption_2' fontWeight='700' color='#292A2C'>
                  지역
                </Typography>
                <Typography cate='caption_2' fontWeight='400' color='#292A2C'>
                  {data.region}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '8px' }}>
                <Typography cate='caption_2' fontWeight='700' color='#292A2C'>
                  직장
                </Typography>
                <Typography cate='caption_2' fontWeight='400' color='#292A2C'>
                  {data.job}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: '8px', flexDirection: 'column', padding: '14px' }}>
              <Box sx={{ display: 'flex', gap: '8px' }}>
                <Typography cate='caption_2' fontWeight='700' color='#292A2C'>
                  나이
                </Typography>
                <Typography cate='caption_2' fontWeight='400' color='#292A2C'>
                  {data.age}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '8px' }}>
                <Typography cate='caption_2' fontWeight='700' color='#292A2C'>
                  가구
                </Typography>
                <Typography cate='caption_2' fontWeight='400' color='#292A2C'>
                  {data.furniture}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '8px' }}>
                <Typography cate='caption_2' fontWeight='700' color='#292A2C'>
                  소득
                </Typography>
                <Typography cate='caption_2' fontWeight='400' color='#292A2C'>
                  {data.income}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ padding: '24px 8px', borderBottom: '1px solid #3C82F966', display: 'flex', gap: '40px' }}>
          <Box sx={{ width: '45%', display: 'flex', alignItems: 'center', gap: '20px', maxHeight: '48px' }}>
            <Image src={Dot} width={48} height={48} alt='' />
            <Typography cate='body_3_semibold' fontWeight='700' color='#3C82F9'>
              Main Target
            </Typography>
          </Box>
          <Box sx={{ width: '55%', display: 'flex', gap: '20px' }}>
            <Box sx={{ display: 'flex', gap: '8px', flexDirection: 'column', padding: '16px' }}>
              <Typography cate='caption_2' fontWeight='700' color='#292A2C'>
                {data.business_main}
              </Typography>
              <Typography cate='caption_2' fontWeight='700' color='#292A2C'>
                {data.target_main}
              </Typography>
              <Typography cate='caption_2' fontWeight='400' color='#292A2C'>
                {data.details_main}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ padding: '24px 8px', borderBottom: '1px solid #3C82F966', display: 'flex', gap: '40px' }}>
          <Box sx={{ width: '45%', display: 'flex', alignItems: 'center', gap: '20px', maxHeight: '48px' }}>
            <Image src={Dot} width={48} height={48} alt='' />
            <Typography cate='body_3_semibold' fontWeight='700' color='#3C82F9'>
              Second Target
            </Typography>
          </Box>
          <Box sx={{ width: '55%', display: 'flex', gap: '20px' }}>
            <Box sx={{ display: 'flex', gap: '8px', flexDirection: 'column', padding: '16px' }}>
              <Typography cate='caption_2' fontWeight='700' color='#292A2C'>
                {data.business_second}
              </Typography>
              <Typography cate='caption_2' fontWeight='700' color='#292A2C'>
                {data.target_second}
              </Typography>
              <Typography cate='caption_2' fontWeight='400' color='#292A2C'>
                {data.details_second}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default TemplateKeyCustomerSettings
