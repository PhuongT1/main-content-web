import Box from '@mui/material/Box'

const SimpleWrapper = ({ children }: { children: React.ReactNode }) => {
  return <Box component={'div'}>{children}</Box>
}

export default SimpleWrapper
