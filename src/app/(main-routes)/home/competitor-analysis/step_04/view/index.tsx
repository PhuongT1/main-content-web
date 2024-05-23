import React from 'react'
import { useSetRecoilState } from 'recoil'
import { Box, Stack, Divider, useTheme } from '@mui/material'
import { activeStepSelector, completeStepSelector } from '@/atoms/home/stepper'
import { EditButton } from '@/components/home/button'
import { STEP } from '@/constants/common.constant'
import { convertToRem } from '@/utils/convert-to-rem'
import DiagramsView from './../editor/view'
import styles from './../../style.module.scss'

function Step_04_View() {
  const { palette } = useTheme()
  const setCompleteStep = useSetRecoilState(completeStepSelector)
  const setActiveStep = useSetRecoilState(activeStepSelector)

  const handleRemoveCompleteStep = () => {
    setCompleteStep((pre) => pre.filter((item) => item < STEP.STEP_FOUR))
    setActiveStep(STEP.STEP_FOUR)
  }

  return (
    <Box component={'form'} className={styles.step_content}>
      <Divider sx={{ mt: convertToRem(52), mb: convertToRem(60), width: '100%', bgcolor: 'main_grey.gray800' }} />

      <Box sx={{ marginTop: convertToRem(60) }}>
        <Box marginBottom={convertToRem(20)} component={'h2'}>
          포지셔닝 맵
        </Box>
      </Box>

      <Box
        display='flex'
        flexDirection='column'
        className={styles.editor_flow}
        sx={{
          backgroundColor: palette.home.gray0,
          input: { pointerEvents: 'none' },
          '.custom-drag-logo': { pointerEvents: 'none', border: 'none' }
        }}
      >
        <DiagramsView />
      </Box>

      <Stack flexDirection={'row'} className={styles.btn_wrapper}>
        <EditButton onClick={handleRemoveCompleteStep} />
      </Stack>
    </Box>
  )
}

export default Step_04_View
