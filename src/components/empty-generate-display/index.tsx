import { Box, Typography, useTheme } from '@mui/material'
import styles from './empty-generate-display.module.scss'
import Image from 'next/image'
import EmptyGenerateDisplayImg from '@/assets/images/card-news/empty-card-new'
import { remConvert } from '@/utils/convert-to-rem'

interface IEmptyGenerateDisplayProps {
  title: string | React.ReactNode
}
const EmptyGenerateDisplay: React.FC<IEmptyGenerateDisplayProps> = ({ title }) => {
  const theme = useTheme()

  return (
    <Box className={styles.background} sx={{ backgroundColor: theme.palette.home.gray400 }}>
      <EmptyGenerateDisplayImg mainColor={theme.palette.home.gray200} subMainColor={theme.palette.home.gray400} />
      <Typography
        className={styles.sub_title}
        sx={{ marginTop: remConvert('20px') }}
        color={theme.palette.home.gray100}
      >
        {title}
      </Typography>
    </Box>
  )
}

export default EmptyGenerateDisplay
