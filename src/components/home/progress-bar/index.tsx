import { Typography } from '@/elements'
import { remConvert } from '@/utils/convert-to-rem'
import {
  Box,
  LinearProgress,
  LinearProgressProps,
  SxProps,
  Theme,
  linearProgressClasses,
  styled,
  useTheme
} from '@mui/material'
import React from 'react'

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 12,
  borderRadius: remConvert('100px'),
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.home.gray50
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: remConvert('100px'),
    backgroundColor: theme.palette.home.blue500
  }
}))

type Props = {
  title: React.ReactNode
  sxBox?: SxProps<Theme>
  sxTitle?: SxProps<Theme>
} & Omit<LinearProgressProps, 'title'>

const ProgressBarItem = ({ title, sxBox, sxTitle, ...rest }: Props) => {
  const {
    palette: { home }
  } = useTheme()
  return (
    <Box
      component={'div'}
      sx={{
        padding: remConvert('20px 40px'),
        borderRadius: remConvert('10px'),
        backgroundColor: home.gray300,
        flex: '1 0 0',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: remConvert('12px'),
        ...sxBox
      }}
    >
      <Typography component={'div'} cate='title_50' color={home.gray50} sx={sxTitle}>
        {title}
      </Typography>
      <BorderLinearProgress variant='determinate' {...rest} />
    </Box>
  )
}

export default ProgressBarItem
