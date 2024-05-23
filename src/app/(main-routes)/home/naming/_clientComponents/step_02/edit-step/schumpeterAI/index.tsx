import { Typography } from '@/elements'
import { Box, useTheme } from '@mui/material'
import styles from './schumpeterAI.module.scss'
import { CreateButton } from '@/components/home/button'
import { useLanguage } from '@/hooks/use-language'

export interface SchumpeterAIProps {
  onClick?: () => void
  title?: string
}

const SchumpeterAI = ({ onClick }: SchumpeterAIProps) => {
  const {
    palette: { home }
  } = useTheme()

  const { dict } = useLanguage()

  return (
    <Box className={styles.layer_box}>
      <Typography className={styles.title} fontWeight={600}>
        {dict.naming_step_2_AI_title}
      </Typography>
      <Typography color={home.gray100} className={styles.sub_title}>
        {dict.naming_step_2_AI_sub_title}
      </Typography>
      <CreateButton onClick={() => onClick && onClick()} />
    </Box>
  )
}

export default SchumpeterAI
