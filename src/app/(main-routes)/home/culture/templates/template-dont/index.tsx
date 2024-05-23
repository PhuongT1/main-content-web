import { Typography } from '@/elements'
import { Box, Grid } from '@mui/material'
import TemplateHeading from '../template-heading'
import BlueCheckedIcon from '@/assets/icons/culture/blue-checked-icon'

const TemplateDont = ({ data }: any) => {
  return (
    <Box>
      <Box marginBottom={'108px'}>
        <TemplateHeading title='멀리해요' subTitle={"Don't"} />
      </Box>
      <Box sx={{ width: '100%', display: 'flex', gap: '11px' }}>
        <Box sx={{ width: '50%' }}>
          <Box sx={{ borderTop: '2px solid #EA3939', marginBottom: '4px' }}></Box>
          <Box sx={{ borderTop: '1px solid #EA393966' }}></Box>
        </Box>
        <Box sx={{ width: '50%' }}>
          <Box sx={{ borderTop: '2px solid #EA3939', marginBottom: '4px' }}></Box>
          <Box sx={{ borderTop: '1px solid #EA393966' }}></Box>
        </Box>
      </Box>

      <Grid container columnSpacing={1.4}>
        {data.dont.map((value: any, index: number) => {
          return (
            <Grid key={index} item xs={6}>
              <Box
                sx={{
                  padding: '24px 12px',
                  borderTop: index > 1 ? '1px dashed #EA3939' : ''
                }}
              >
                <BlueCheckedIcon rectProps={{ fill: '#EA3939' }} />
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
          <Box sx={{ borderTop: '1px solid #EA393966', marginBottom: '4px' }}></Box>
          <Box sx={{ borderTop: '2px solid #EA3939' }}></Box>
        </Box>
        <Box sx={{ width: '50%' }}>
          <Box sx={{ borderTop: '1px solid #EA393966', marginBottom: '4px' }}></Box>
          <Box sx={{ borderTop: '2px solid #EA3939' }}></Box>
        </Box>
      </Box>
    </Box>
  )
}

export default TemplateDont
