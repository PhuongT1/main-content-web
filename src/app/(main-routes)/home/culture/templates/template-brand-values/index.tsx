import { Typography } from '@/elements'
import { Box } from '@mui/material'
import Image from 'next/image'
import TemplateHeading from '../template-heading'

const TemplateBrandValues = ({ data }: any) => {
  return (
    <Box>
      <Box marginBottom={'60px'}>
        <TemplateHeading title='다가갑니다' subTitle='브랜드 가치' />
      </Box>

      <Image
        height={515}
        width={100}
        style={{ height: 'auto', width: '100%', borderRadius: 10, objectFit: 'cover', marginBottom: '40px' }}
        src={data.imageUpload}
        alt='logo_team'
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', gap: '32px', padding: '0 20px' }}>
        {data.brand_values.map((value: any, index: number) => {
          return (
            // <Box key={index} sx={{ display: 'flex', gap: '6px', alignItems: 'start' }}>
            //   <Typography
            //     sx={{ lineBreak: 'anywhere' }}
            //     width={'60%'}
            //     cate='sub_title_30'
            //     color='#292A2C'
            //     fontWeight={700}
            //   >
            //     {value.detail}
            //   </Typography>
            //   <Typography sx={{ lineBreak: 'anywhere' }} width={'40%'} cate='caption_10' color='#292A2C' fontWeight={400}>
            //     {value.details}
            //   </Typography>
            // </Box>

            <Box key={index} sx={{ float: 'right' }} width='50%' textAlign='left'>
              <Typography cate='button_30' color='#292A2C' fontWeight={700} marginBottom={'10px'}>
                {value.detail}
              </Typography>
              <Typography cate='caption_20' color='#292A2C' fontWeight={400}>
                {value.details}
              </Typography>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default TemplateBrandValues
