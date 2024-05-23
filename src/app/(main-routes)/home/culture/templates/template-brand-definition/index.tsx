import { Typography } from '@/elements'
import { Box } from '@mui/material'
import Image from 'next/image'
import TemplateHeading from '../template-heading'

const TemplateBrandDefinition = ({ data }: any) => {
  return (
    <Box>
      <Box marginBottom={'60px'}>
        <TemplateHeading title='소개합니다' subTitle='브랜드 정의' />
      </Box>
      <Image
        height={515}
        width={100}
        style={{ height: '347px', width: '100%', borderRadius: 10, objectFit: 'cover', marginBottom: '40px' }}
        src={data.imageUpload}
        alt='logo_team'
      />
      <Box sx={{ padding: '0 20px' }}>
        {/* <Box sx={{ float: 'right' }} width='40%' textAlign='left'>
          <Typography cate='caption_10' color='#292A2C' fontWeight={700}>
            {data.keySentence}
          </Typography>
          <Typography cate='caption_10' color='#292A2C' fontWeight={400}>
            {data.detail}
          </Typography>
        </Box> */}

        <Box sx={{ display: 'flex', gap: '6px', alignItems: 'start' }}>
          <Typography sx={{ lineBreak: 'anywhere' }} width={'60%'} cate='title_40' color='#292A2C' fontWeight={700}>
            {data.keySentence}
          </Typography>
          <Typography sx={{ lineBreak: 'anywhere' }} width={'40%'} cate='caption_20' color='#292A2C' fontWeight={400}>
            {data.detail}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default TemplateBrandDefinition
