import { Typography } from '@/elements'
import { Box, Grid } from '@mui/material'
import TemplateHeading from '../template-heading'
import CircleIcon from '@/assets/icons/culture/circle-icon'

const TemplateHistory = ({ data }: any) => {
  return (
    <Box>
      <Box marginBottom={'69px'}>
        <TemplateHeading title='우리가 지나온 발걸음' subTitle='연혁' />
      </Box>
      <Box
        sx={{
          position: 'relative',
          '&:after': {
            content: '""',
            position: 'absolute',
            left: '9.5px',
            top: '10px',
            height: '80%',
            width: '1px',
            backgroundColor: '#3C82F966'
          }
        }}
      >
        {data.map((value: any, index: number) => {
          return (
            <Grid key={index} container marginBottom={'20px'}>
              <Grid xs={1}>
                <CircleIcon />
              </Grid>
              <Grid xs={11}>
                <Box sx={{ display: 'flex', gap: '16px' }}>
                  <Box
                    component={'div'}
                    sx={{
                      backgroundColor: '#3C82F91A',
                      padding: '4px 0',
                      borderRadius: '99px',
                      width: '74px',
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography sx={{ wordBreak: 'keep-all' }} cate='caption_1' fontWeight={700} color={'#3C82F9'}>
                      {value.date}
                    </Typography>
                  </Box>
                  <Typography cate='caption_1' fontWeight={400} color={'#292A2C'}>
                    {value.details}
                  </Typography>
                </Box>
              </Grid>
              {/* <Grid
                xs={8}
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Typography cate='caption_1' fontWeight={400} color={'#292A2C'}>
                  {value.details}
                </Typography>
              </Grid> */}
            </Grid>
          )
        })}
      </Box>
    </Box>
  )
}

export default TemplateHistory
