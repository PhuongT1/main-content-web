import { iRPalette } from '@/atoms/home/stepper'
import { Typography } from '@/elements'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, Grid, useTheme } from '@mui/material'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

const SliderItem = () => {
  const { primaryColor } = useRecoilValue(iRPalette)
  const {
    palette: { home }
  } = useTheme()

  useEffect(() => {}, [])
  return (
    <Box
      component={'div'}
      sx={{ backgroundColor: home.ir_neutral_alpha4, padding: remConvert('12px'), borderRadius: remConvert('4px') }}
    >
      <Typography cate='text_12_bold'>Goals</Typography>
      <Grid container rowSpacing={remConvert('6px')}>
        <Grid item xs={12}>
          <Box component={'div'} sx={{ display: 'flex', gap: remConvert('6px'), alignItems: 'flex-start' }}>
            <Typography
              cate='title_3_bold'
              sx={{
                width: remConvert('76px'),
                backgroundColor: primaryColor,
                borderRadius: remConvert('2px'),
                padding: remConvert('2px 6px'),
                fontSize: remConvert('12px')
              }}
            >
              경제적 목표
            </Typography>
            <Typography cate='body_3' sx={{ flex: '1 0 0', fontSize: remConvert('12px'), color: home.ir_neutral_500 }}>
              당뇨가 의심되는 상황으로 규칙적인 운동과 건강한 식습관을 유지하며 스트레스를 관리하고 명상 등의 방법을
              통해 정신적으로 안정된 삶을 지향하고 있다. 최대글을 입력할 경우000
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box component={'div'} sx={{ display: 'flex', gap: remConvert('6px'), alignItems: 'flex-start' }}>
            <Typography
              cate='title_3_bold'
              sx={{
                width: remConvert('76px'),
                backgroundColor: primaryColor,
                borderRadius: remConvert('2px'),
                padding: remConvert('2px 6px'),
                fontSize: remConvert('10px')
              }}
            >
              경제적 목표
            </Typography>
            <Typography cate='body_3' sx={{ flex: '1 0 0', fontSize: remConvert('10px'), color: home.ir_neutral_500 }}>
              당뇨가 의심되는 상황으로 규칙적인 운동과 건강한 식습관을 유지하며 스트레스를 관리하고 명상 등의 방법을
              통해 정신적으로 안정된 삶을 지향하고 있다. 최대글을 입력할 경우000
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SliderItem
