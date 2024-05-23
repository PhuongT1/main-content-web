'use client'
import { useMediaQuery, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Image from 'next/image'
import bg_layer_lg1 from '../../public/images/bg-layer-lg1.png'
import bg_layer_lg2 from '../../public/images/bg-layer-lg2.png'
import styles from './styles.module.scss'

const NonAuthWrapper = ({ children }: any) => {
  const match = useMediaQuery('(max-width: 768px)')
  const theme = useTheme()

  return (
    <Box
      className={styles.nonauth_wrapper}
      position={'relative'}
      sx={{
        backgroundColor: match ? theme.palette.main.black : theme.palette.main.gray90
      }}
    >
      {!match ? (
        <>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0
            }}
          >
            <Image src={bg_layer_lg1} alt='top-bg-img' width={500} height={500} priority />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: -50,
              right: 0
            }}
          >
            <Image src={bg_layer_lg2} alt='bottom-bg-img' width={500} height={500} />
          </Box>
        </>
      ) : null}
      {children}
    </Box>
  )
}

export default NonAuthWrapper
