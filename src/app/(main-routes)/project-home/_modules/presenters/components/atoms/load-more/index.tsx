'use-client'
import { convertToRem } from '@/utils/convert-to-rem'
import { CircularProgress, Stack } from '@mui/material'
import { FC, useEffect, useRef, useState } from 'react'

interface Props {
  loading?: boolean
  getNextPage: () => Promise<void>
}

export const LoadMoreInfinite: FC<Props> = ({ loading, getNextPage }) => {
  const divRef = useRef<HTMLDivElement>(null)
  const [isDivVisible, setIsDivVisible] = useState<boolean>(false)

  useEffect(() => {
    const handleDivVisibilityCheck = () => {
      const divElement = divRef.current
      if (!divElement) return
      const bounding = divElement.getBoundingClientRect()
      setIsDivVisible(bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight))
    }
    window.addEventListener('scroll', handleDivVisibilityCheck)
    return () => {
      window.removeEventListener('scroll', handleDivVisibilityCheck)
    }
  }, [])

  useEffect(() => {
    isDivVisible && getNextPage()
  }, [isDivVisible])

  return (
    <Stack
      ref={divRef}
      flexDirection='row'
      width={'100%'}
      gap={convertToRem(6)}
      alignItems='center'
      justifyContent={'center'}
    >
      {loading && <CircularProgress />}
    </Stack>
  )
}
