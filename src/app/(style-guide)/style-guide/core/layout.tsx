'use client'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme()

  return (
    <Box
      component={'div'}
      sx={{
        backgroundColor: theme.palette.home.gray50
      }}
      display={'flex'}
      minHeight='100vh'
      padding='20px'
    >
      {children}
    </Box>
  )
}

export default Layout
