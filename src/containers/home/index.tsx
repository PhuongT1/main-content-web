'use client'
import { AUTH_PATH } from '@/constants/common.constant'
import LocalStorageService from '@/services/local-storage.service'
import { Container, Typography } from '@mui/material'
import { usePathname } from 'next/navigation'

const HomeContainer = () => {
  const path = usePathname()

  if (!LocalStorageService.getAuth() || AUTH_PATH.some((i) => path.includes(i))) {
    return <></>
  } else {
    return (
      <Container>
        <Typography>Home</Typography>
      </Container>
    )
  }
}

export default HomeContainer
