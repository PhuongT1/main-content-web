import { Typography } from '@/elements'
import { Box, Grid } from '@mui/material'
import Image from 'next/image'
import TemplateHeading from '../template-heading'
import moment from 'moment'

const TemplateStatus = ({ data }: any) => {
  return (
    <Box>
      <Box marginBottom={'145px'}>
        <TemplateHeading title='투자현황' subTitle='투자유치현황' />
      </Box>
      {data.map((value: any, index: number) => {
        return (
          <Box key={index} sx={{ paddingTop: '4px', borderTop: '2px solid #3C82F9', marginBottom: '7px' }}>
            <Grid
              container
              sx={{
                borderTop: '1px solid #3C82F966',
                borderBottom: '1px solid #3C82F966',
                padding: '4px 16px 4px 8px'
              }}
            >
              <Grid item xs={5}>
                <Typography cate='title_1_bold' color={'#3C82F933'}>
                  {value.type}
                </Typography>
              </Grid>
              <Grid display={'flex'} alignItems={'center'} item xs={4}>
                <Typography cate='title_4_chip' fontWeight={700} color={'#292A2C'}>
                  {value.amount}억원 투자 유치
                </Typography>
              </Grid>
              <Grid display={'flex'} alignItems={'center'} justifyContent={'end'} item xs={3}>
                <Typography cate='caption_1' fontWeight={700} color={'#C7CACC'}>
                  {moment(value.date).format('YYYY.MM.DD')}
                </Typography>
              </Grid>
            </Grid>

            <Grid container sx={{ padding: '12px 8px 16px 8px' }}>
              <Grid item xs={5}></Grid>
              <Grid display={'flex'} gap={'12px'} alignItems={'center'} item xs={7}>
                <Box
                  component={'div'}
                  sx={{
                    backgroundColor: '#3C82F91A',
                    padding: '4px 10px',
                    borderRadius: '99px',
                    width: 'auto'
                  }}
                >
                  <Typography sx={{ wordBreak: 'keep-all' }} cate='caption_10' fontWeight={700} color={'#3C82F9'}>
                    투자사
                  </Typography>
                </Box>
                <Typography cate='caption_1' fontWeight={400} color={'#292A2C'}>
                  {value.company}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )
      })}
    </Box>
  )
}

export default TemplateStatus
