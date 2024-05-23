import SectionTitle from '@/components/home/section-title'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, Grid, useTheme } from '@mui/material'

import MainSlide from './main-slide'
import ListSlide from './thumb-slide'

const SA_Step_03_Edit = () => {
  const theme = useTheme()
  const {
    palette: { home, sub },
    breakpoints
  } = theme

  return (
    <Box component={'div'} display={'flex'} flexDirection={'column'} gap={remConvert('20px')}>
      <SectionTitle title='분석결과 리포트 미리보기' subtitle='장점유형 분석결과를 확인해보세요' />
      <Box
        component={'div'}
        position={'relative'}
        sx={{
          padding: remConvert('50px 70px'),
          backgroundColor: home.gray400,
          borderRadius: remConvert('10px')
        }}
      >
        <Grid container spacing={remConvert('40px')}>
          <Grid
            item
            sx={{
              [breakpoints.up(1600)]: {
                flexBasis: 'calc((100% / 5) * 4)',
                maxWidth: 'calc((100% / 5) * 4)'
              },
              [breakpoints.down(1500)]: {
                flexBasis: 'calc((100% / 5) * 3.5)',
                maxWidth: 'calc((100% / 5) * 3.5)'
              }
            }}
          >
            <Box component={'div'} width={1}>
              <MainSlide />
            </Box>
          </Grid>
          <Grid
            item
            sx={{
              [breakpoints.up(1600)]: {
                flexBasis: 'calc((100% / 5))',
                maxWidth: 'calc((100% / 5))'
              },
              [breakpoints.down(1500)]: {
                flexBasis: 'calc((100% / 5) * 1.5)',
                maxWidth: 'calc((100% / 5) * 1.5)'
              }
            }}
          >
            <ListSlide />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default SA_Step_03_Edit
