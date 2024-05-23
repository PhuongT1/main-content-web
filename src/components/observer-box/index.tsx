'use client'
import { Box, CircularProgress } from '@mui/material'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

type ObserverBoxType = {
  fetchNext: () => void
  showLoading?: boolean
  haveNextPage: boolean
}

const ObserverBox = ({ haveNextPage, fetchNext, showLoading = true }: ObserverBoxType) => {
  const { ref, inView } = useInView()
  const isShowLoading = (showLoading && haveNextPage) || false

  useEffect(() => {
    if (inView && haveNextPage) {
      fetchNext()
    }
  }, [inView])

  return (
    <Box width='100%' display='flex' justifyContent={'center'} ref={ref} my={6}>
      {isShowLoading && <CircularProgress color='primary' />}
    </Box>
  )
}

export default ObserverBox
