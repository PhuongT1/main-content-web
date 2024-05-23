import { Typography } from '@/elements'
import { Box, BoxProps, useTheme } from '@mui/material'
import styles from './section-title.module.scss'
import { remConvert } from '@/utils/convert-to-rem'

type TSectionTitleProps = {
  title?: React.ReactNode
  uptoTitle?: React.ReactNode
  subtitle?: React.ReactNode
} & Omit<BoxProps, 'title'>

const SectionTitle = ({ title, subtitle, uptoTitle, ...rest }: TSectionTitleProps) => {
  const {
    palette: { home }
  } = useTheme()

  return (
    <Box component={'div'} gap={remConvert('10px')} className={styles.box_section} {...rest}>
      {title && (
        <Typography
          color={home.gray50}
          component={'div'}
          cate='title_60'
          sx={{
            fontWeight: 700,
            gap: remConvert('10px'),
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {title}
          {uptoTitle && (
            <Typography color={home.mint500} component={'div'} cate='title_4_chip'>
              {uptoTitle}
            </Typography>
          )}
        </Typography>
      )}
      {subtitle && (
        <Typography color={home.gray100} cate='body_3'>
          {subtitle}
        </Typography>
      )}
    </Box>
  )
}
export default SectionTitle
