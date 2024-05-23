'use client'
import { Typography } from '@/elements'
import { Box, CircularProgress, CircularProgressProps } from '@mui/material'
import { useEffect, useState } from 'react'

type TCircularDeterminateProps = {
  second: number
  size?: number
  onTimeout?: () => void
} & Omit<CircularProgressProps, 'size'>

const CircularDeterminate = ({ second, size = 50, sx, onTimeout, ...rest }: TCircularDeterminateProps) => {
  const [secondCountdown, setSecondCountDown] = useState(second)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      // Kiểm tra trước khi cập nhật giá trị
      if (secondCountdown > 0) {
        setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 100 / second))
        setSecondCountDown((pre) => pre - 1)
      } else {
        onTimeout?.()
        clearInterval(timer)
      }
      console.log('countdown is running')
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [secondCountdown])

  return (
    <Box position={'relative'}>
      <CircularProgress
        sx={{
          width: `${size}px !important`,
          height: `${size}px !important`,
          ...sx
        }}
        variant='determinate'
        value={progress}
        {...rest}
      />
      <Typography
        top={0}
        right={0}
        left={0}
        bottom={0}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        position={'absolute'}
      >
        {secondCountdown}
      </Typography>
    </Box>
  )
}

export default CircularDeterminate
