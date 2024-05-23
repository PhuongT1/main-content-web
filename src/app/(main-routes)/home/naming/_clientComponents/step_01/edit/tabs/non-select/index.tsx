import IdeaIcon from '@/assets/icons/naming/idea-icon'
import { Typography } from '@/elements'
import { Box, useTheme } from '@mui/material'
import styles from './non-select.module.scss'
import { useLanguage } from '@/hooks/use-language'

const NonSelect = () => {
  const {
    palette: { home }
  } = useTheme()

  const { dict } = useLanguage()

  return (
    <Box className={styles.layer_box} sx={{ backgroundColor: home.gray400 }}>
      <IdeaIcon />
      <Typography sx={{ color: home.gray100 }} className={styles.sub_title}>
        {dict.naming_step_1_tab_default}
      </Typography>
    </Box>
  )
}

export default NonSelect
