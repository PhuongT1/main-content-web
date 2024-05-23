import { Typography } from '@/elements'
import Box from '@mui/material/Box'
import styles from '../../step_02/step_02.module.scss'
import { convertToRem } from '@/utils/styles'

type TTypeFactor = 'Strength' | 'Weakness' | 'Opportunity' | 'Threat'
type TFactorBoxProps = {
  title: string
  subTitle: string
  type: TTypeFactor
}

const TitleFactor = ({ title, subTitle, type }: TFactorBoxProps) => {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        align: 'center',
        gap: convertToRem(10),
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}
    >
      <Typography component='span' cate='subtitle_1_semibold' plainColor='home.gray50' sx={{ whiteSpace: 'nowrap' }}>
        {title}
      </Typography>
      <Typography component='span' cate='body_3' className={styles[type]}>
        {subTitle}
      </Typography>
    </Box>
  )
}

export default TitleFactor
