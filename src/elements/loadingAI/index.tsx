import { Box, useTheme } from '@mui/material'
import styles from './Loading.module.scss'

interface LoadingAIProps {
  children?: React.ReactNode
  isLoading?: boolean
}

const LoadingAI = ({ children, isLoading }: LoadingAIProps) => {
  const {
    palette: { home }
  } = useTheme()

  return (
    <Box sx={{ pointerEvents: `${isLoading ? 'none' : 'all'}` }} className={styles.wrapperLoading}>
      <Box
        className={styles.loadIcon}
        sx={{
          display: `${!isLoading && 'none'}`,
          span: {
            background: home.gray50
          }
        }}
      >
        <Box component={'span'}></Box>
        <Box component={'span'}></Box>
        <Box component={'span'}></Box>
      </Box>
      {children}
    </Box>
  )
}

export default LoadingAI
