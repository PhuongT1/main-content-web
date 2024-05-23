import { Typography } from '@/elements'
import { Box, Grid } from '@mui/material'
import TemplateHeading from '../template-heading'

const TemplateRankAndSystem = ({ data }: any) => {
  return (
    <Box>
      <Box marginBottom={'69px'}>
        <TemplateHeading title='각자의 역할은 명확히' subTitle='직급과 체계' />
      </Box>
      <Box sx={{ padding: '4px 0', borderTop: '2px solid #3C82F9', borderBottom: '2px solid #3C82F9' }}>
        <Box
          sx={{
            borderBottom: '1px solid #3C82F966',
            borderTop: '1px solid #3C82F966'
          }}
        >
          {data.rank_and_system.map((value: any, index: number) => {
            return (
              <Box
                key={index}
                sx={{
                  position: 'relative',
                  padding: '32px 40px',
                  borderBottom: '1px dashed #3C82F966',
                  '&:last-child': {
                    borderBottom: '0px'
                  }
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    backgroundColor: '#3C82F9',
                    padding: '2px 4px',
                    borderBottomLeftRadius: '4px',
                    borderBottomRightRadius: '4px'
                  }}
                >
                  <Typography cate='caption_2' fontWeight={700} color={'#FFFFFF'}>
                    0{index + 1}
                  </Typography>
                </Box>
                <Grid container spacing={5}>
                  <Grid item xs={3}>
                    <Typography cate='button_2_semibold' fontWeight={700} color={'#292A2C'}>
                      {value.type}
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography cate='caption_2' fontWeight={400} color={'#292A2C'}>
                      {value.details}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}

export default TemplateRankAndSystem
