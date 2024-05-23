import { Box, CircularProgress } from '@mui/material'
import styles from './Loading.module.scss'

interface LoadingProps {
  type?: 'normal' | 'standard'
  size?: 'small' | 'medium'
  children?: React.ReactNode
  isLoading?: boolean
}

const Loading = ({ type = 'standard', size = 'small', children, isLoading }: LoadingProps) => {
  return (
    <>
      {isLoading && (
        <Box className={styles['wrapper-loading']}>
          <CircularProgress
            className={type === 'normal' ? styles.loading_normal : styles.loading_standard}
            size={size === 'small' ? 20 : 30}
          />
          {children}
        </Box>
      )}
      {!isLoading && <>{children}</>}
    </>
  )
}

export default Loading
