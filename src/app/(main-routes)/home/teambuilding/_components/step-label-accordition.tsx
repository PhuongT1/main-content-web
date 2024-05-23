import ChevronDownIcon from '@/assets/icons/chevrons/chevron-down'
import { Typography } from '@/elements'
import { Box, StepLabel } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

//css
import styles from '../step-list/step.module.scss'

function StepLabelAccodtion({
  title,
  subtitle,
  index,
  setStep
}: {
  title: string
  subtitle: string
  index: number
  setStep: Dispatch<SetStateAction<number>>
}) {
  return (
    <StepLabel sx={{ marginBottom: '20px', p: 0 }} onClick={() => setStep(index)} icon={<></>}>
      <Box className={styles.step_label_box} component={'div'}>
        <Box display='inline-flex' flexDirection={'column'} justifyContent='center' alignItems='start' gap={1.5}>
          <Typography className={styles.label_title}>{title}</Typography>
          <Typography cate='title_60'>{subtitle}</Typography>
        </Box>
        <Box component={'div'}>
          <Box component={'div'} className={styles.flex_between} gap={0.5}>
            열기
            <Typography display={'flex'} alignItems={'center'} textAlign={'center'}>
              <ChevronDownIcon stroke='white' />
            </Typography>
          </Box>
        </Box>
      </Box>
    </StepLabel>
  )
}

export default StepLabelAccodtion
