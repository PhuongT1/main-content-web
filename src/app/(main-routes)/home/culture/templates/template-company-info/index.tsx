import { Typography } from '@/elements'
import { Box } from '@mui/material'
import Image from 'next/image'
import TemplateHeading from '../template-heading'

const TemplateCompanyInfo = ({ data }: any) => {
  return (
    <Box>
      <Box marginBottom={'60px'}>
        <TemplateHeading title='연락은 여기로' subTitle='컴퍼니 인포' />
      </Box>

      <Image
        height={515}
        width={100}
        style={{ height: '309px', width: '100%', borderRadius: 10, objectFit: 'cover', marginBottom: '40px' }}
        src={data.imageUpload}
        alt='logo_team'
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <Typography cate='sub_title_40' color='#3C82F9' fontWeight={700}>
          {data.companyName}
        </Typography>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Typography sx={{ lineBreak: 'anywhere' }} width={'15%'} cate='caption_10' color='#292A2C' fontWeight={700}>
            NUMBER
          </Typography>
          <Typography sx={{ lineBreak: 'anywhere' }} width={'85%'} cate='caption_10' color='#292A2C' fontWeight={400}>
            {data.contact}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Typography sx={{ lineBreak: 'anywhere' }} width={'15%'} cate='caption_10' color='#292A2C' fontWeight={700}>
            E-MAIL
          </Typography>
          <Typography sx={{ lineBreak: 'anywhere' }} width={'85%'} cate='caption_10' color='#292A2C' fontWeight={400}>
            {data.email}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Typography sx={{ lineBreak: 'anywhere' }} width={'15%'} cate='caption_10' color='#292A2C' fontWeight={700}>
            ADDRESS
          </Typography>
          <Typography sx={{ lineBreak: 'anywhere' }} width={'85%'} cate='caption_10' color='#292A2C' fontWeight={400}>
            {data.address}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default TemplateCompanyInfo
