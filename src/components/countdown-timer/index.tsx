import { Typography } from '@/elements'
import { useTheme } from '@mui/material'

const CountDownTimer = ({ count }: { count: number }) => {
  const theme = useTheme()
  // Convert seconds to minutes and seconds
  const minutes = Math.floor(count / 60)
  const seconds = count % 60

  return (
    <Typography cate='body_3' color={theme.palette.main.gray10}>
      {`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
    </Typography>
  )
}

export default CountDownTimer
