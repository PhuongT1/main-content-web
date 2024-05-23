import { Typography } from '@/elements'
import { Box, Grid } from '@mui/material'
import TemplateHeading from '../template-heading'

const TemplateOrganizationChart = ({ data }: any) => {
  return (
    <Box>
      <Box marginBottom={'30px'}>
        <TemplateHeading title='효율적으로 구분한' subTitle='조직도' />
      </Box>
      <Box textAlign={'center'} marginBottom={'18px'}>
        <Box
          sx={{
            padding: '6px 12px',
            borderRadius: '99px',
            backgroundColor: '#3C82F9',
            display: 'inline-block'
          }}
        >
          <Typography cate='button_2_semibold' fontWeight={700}>
            One Team
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          margin: '0 36px'
        }}
      >
        <Box
          sx={{
            border: '1px dashed #3C82F9',
            width: '100%',
            height: 'auto',
            padding: '20px 24px',
            backgroundColor: 'rgba(60, 130, 249, 0.06)',
            borderRadius: '999px',
            display: 'flex',
            gap: '15px',
            justifyContent: 'space-between',
            marginBottom: '60px'
          }}
        >
          {data.organization_chart.map((value: any, index: number) => {
            return (
              <Box
                key={index}
                sx={{
                  width: '25%',
                  paddingTop: '25%',
                  boxSizing: 'border-box',
                  position: 'relative',
                  backgroundColor:
                    index === 0 ? '#EC4A0A80' : index === 1 ? '#489B1C80' : index === 2 ? '#5925DC80' : '#0691AE80',
                  borderRadius: '50%',
                  lineBreak: 'anywhere',
                  textAlign: 'center'
                }}
              >
                <Typography
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                  cate='caption_2'
                  fontWeight={700}
                >
                  {value.type}
                </Typography>
              </Box>
            )
          })}
        </Box>
      </Box>

      <Grid container rowSpacing={5} columnSpacing={2}>
        {data.organization_chart.map((value: any, index: number) => {
          return (
            <Grid key={index} item xs={6}>
              <Box
                key={index}
                sx={{
                  width: '100%',
                  borderTop: '1px solid #3C82F9',
                  paddingTop: '12px'
                }}
              >
                <Typography marginBottom={'15px'} cate='button_2_semibold' fontWeight={700} color={'#292A2C'}>
                  {value.type}
                </Typography>

                <Typography marginBottom={'15px'} cate='caption_2' fontWeight={400} color={'#292A2CCC'}>
                  {value.details}
                </Typography>
              </Box>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default TemplateOrganizationChart
