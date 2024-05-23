import { Typography } from '@/elements'
import { Box, Grid } from '@mui/material'
import Image from 'next/image'
import TemplateHeading from '../template-heading'
import BlueCheckedIcon from '@/assets/icons/culture/blue-checked-icon'

const TemplateTendencies = ({ data }: any) => {
  return (
    <Box>
      <Box marginBottom={'108px'}>
        <TemplateHeading title='우리는 대부분' subTitle='우리 구성원의 성향' />
      </Box>
      <Box sx={{ width: '100%', display: 'flex', gap: '11px' }}>
        <Box sx={{ width: '50%' }}>
          <Box sx={{ borderTop: '2px solid #3C82F9', marginBottom: '4px' }}></Box>
          <Box sx={{ borderTop: '1px solid #3C82F966' }}></Box>
        </Box>
        <Box sx={{ width: '50%' }}>
          <Box sx={{ borderTop: '2px solid #3C82F9', marginBottom: '4px' }}></Box>
          <Box sx={{ borderTop: '1px solid #3C82F966' }}></Box>
        </Box>
      </Box>

      <Grid container columnSpacing={1.4}>
        {data.tendencies.map((value: any, index: number) => {
          return (
            <Grid key={index} item xs={6}>
              <Box
                sx={{
                  padding: '24px 12px',
                  borderTop: index > 1 ? '1px dashed #3C82F9' : ''
                }}
              >
                <BlueCheckedIcon />
                <Typography cate='button_2_semibold' fontWeight={700} margin={'12px 0 8px 0'} color={'#292A2C'}>
                  {value.type}
                </Typography>
                <Typography cate='caption_2' fontWeight={400} color={'#292A2CCC'}>
                  {value.details}
                </Typography>
              </Box>
            </Grid>
          )
        })}
      </Grid>

      <Box sx={{ width: '100%', display: 'flex', gap: '11px' }}>
        <Box sx={{ width: '50%' }}>
          <Box sx={{ borderTop: '1px solid #3C82F966', marginBottom: '4px' }}></Box>

          <Box sx={{ borderTop: '2px solid #3C82F9' }}></Box>
        </Box>
        <Box sx={{ width: '50%' }}>
          <Box sx={{ borderTop: '1px solid #3C82F966', marginBottom: '4px' }}></Box>

          <Box sx={{ borderTop: '2px solid #3C82F9' }}></Box>
        </Box>
      </Box>
    </Box>
  )
}

export default TemplateTendencies
