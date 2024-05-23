import { Typography } from '@/elements'
import { Box, Grid } from '@mui/material'
import TemplateHeading from '../template-heading'
import { Dot, RecruitmentProcessImage } from '@/assets/images/culture'
import Image from 'next/image'

const TemplateRecruitmentProcess = ({ data }: any) => {
  return (
    <Box>
      <Box marginBottom={'40px'}>
        <TemplateHeading title='다가갑니다' subTitle='브랜드 가치' />
      </Box>
      <Box>
        <Image
          src={RecruitmentProcessImage}
          width={100}
          height={206}
          alt=''
          style={{ width: '100%', marginBottom: '32px' }}
        />
        <Box
          sx={{
            position: 'relative',
            padding: '0 20px',
            '&:after': {
              content: '""',
              position: 'absolute',
              left: '40px',
              top: '50%',
              transform: 'translateY(-50%)',
              height: '80%',
              width: '1px',
              borderLeft: '1px dashed #3C82F9'
            }
          }}
        >
          {data.recruitment_process.map((value: any, index: number) => {
            return (
              <Grid
                marginBottom={'32px'}
                sx={{
                  '&:last-child': {
                    marginBottom: 0
                  }
                }}
                key={index}
                container
              >
                <Grid item xs={5} sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <Box sx={{ position: 'relative', height: '40px', width: '40px' }}>
                    <Typography
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                      }}
                      cate='caption_2'
                      fontWeight={700}
                      color={'#FFFFFF'}
                    >
                      {index + 1}
                    </Typography>
                    <Image src={Dot} width={40} height={40} alt='' />
                  </Box>
                  <Typography cate='button_2_semibold' fontWeight={700} color={'#292A2C'}>
                    {value.type}
                  </Typography>
                </Grid>
                <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={7}>
                  <Typography cate='caption_2' fontWeight={400} color={'#292A2C'}>
                    {value.details}
                  </Typography>
                </Grid>
              </Grid>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}

export default TemplateRecruitmentProcess
