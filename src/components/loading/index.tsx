'use client'
import { loadingAtom } from '@/atoms/loading'
import { Backdrop, CircularProgress } from '@mui/material'
import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import { useRecoilValue } from 'recoil'

const LoadingComponent = ({ open }: { open?: boolean }) => {
  const loading = useRecoilValue(loadingAtom)

  const isFetching = useIsFetching({
    predicate: (mutation) => {
      return !mutation.meta?.offLoading
    }
  })
  const isMutating = useIsMutating({
    predicate: (mutation) => {
      return !mutation.meta?.offLoading
    }
  })

  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => {
          return theme.zIndex.drawer + 1000
        }
      }}
      open={loading || isFetching > 0 || isMutating > 0 || !!open}
    >
      <CircularProgress color='inherit' />
    </Backdrop>
  )
}

export default LoadingComponent
