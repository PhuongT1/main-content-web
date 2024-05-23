import CheckIcon from '@/assets/icons/check'
import { Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, BoxProps, useTheme } from '@mui/material'

import styles from '../step-list/step.module.scss'

function CircleBox({ step, activeStep, ...props }: { step: number; activeStep: number } & BoxProps) {
  const theme = useTheme()
  const currentStep = step < 10 ? `0${step + 1}` : step + 1
  const isActive = Boolean(activeStep === step)

  return (
    <Box
      style={{
        backgroundColor: isActive ? theme.palette.main.primary : theme.palette.main_grey.gray800,
        width: isActive ? convertToRem(68) : convertToRem(60),
        height: isActive ? convertToRem(68) : convertToRem(60)
      }}
      component={'div'}
      className={styles.circle_box}
      {...props}
    >
      <Box
        sx={{
          padding: isActive ? convertToRem(20) : convertToRem(12),
          color: isActive ? 'main.black' : 'main.white',
          width: convertToRem(48),
          height: convertToRem(48)
        }}
        className={styles.circle_box_inner}
      >
        <Typography color={isActive ? 'main.black' : 'main.white'} cate='title_2_semibold'>
          {currentStep}
        </Typography>

        {/* <Typography className={styles.icon_checked_box}>
          <CheckIcon svgProps={{ width: 18, height: 18 }} pathProps={{ stroke: '#2d68fe' }} />
        </Typography> */}
      </Box>
    </Box>
  )
}

export default CircleBox
