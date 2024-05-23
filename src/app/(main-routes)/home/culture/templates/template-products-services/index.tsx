import { Typography } from '@/elements'
import { Box, useTheme } from '@mui/material'
import Image from 'next/image'
import TemplateHeading from '../template-heading'

const TemplateProductsServices = ({ data }: any) => {
  return (
    <Box>
      <Box marginBottom={'123px'}>
        <TemplateHeading title='경험해보세요' subTitle='우리의 제품/서비스' />
      </Box>

      <Box sx={{ borderTop: '1px solid #292A2C66' }}>
        {data.products_services.map((value: any, index: number) => {
          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                gap: '28px',
                alignItems: 'center',
                padding: '16px 8px',
                borderBottom: '1px solid #292A2C66'
              }}
            >
              <Image
                height={128}
                width={192}
                style={{ minWidth: '192px', borderRadius: 8, objectFit: 'cover' }}
                src={value.imageUpload}
                alt='logo_team'
              />
              <Box>
                <Typography
                  sx={{ lineBreak: 'anywhere' }}
                  cate='button_40'
                  color='#292A2C'
                  fontWeight={700}
                  marginBottom='12px'
                >
                  {value.name}
                </Typography>
                <Typography sx={{ lineBreak: 'anywhere' }} cate='caption_20' color='#292A2C' fontWeight={400}>
                  {value.details}
                </Typography>
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default TemplateProductsServices
