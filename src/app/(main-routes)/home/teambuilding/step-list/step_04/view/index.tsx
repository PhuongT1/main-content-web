'use client'
import { EditButton } from '@/components/home/button'
import { Box, Stack, useTheme } from '@mui/material'
import React from 'react'
import DiagramsView from './diagram-view'
import { STEP } from '@/constants/common.constant'
import SectionTitle from '@/components/home/section-title'
import { ReactFlowProvider } from 'reactflow'
import styles from '../editor/editor.module.scss'
import { useLanguage } from '@/hooks/use-language'
import { useRemoveCompletedStep } from '../../../use-teambuilding'

function Step_04_View() {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  const { handleRemoveCompleteStep } = useRemoveCompletedStep(STEP.STEP_FOUR)

  return (
    <Box display={'flex'} flexDirection={'column'}>
      <SectionTitle title={dict.teambuilding_4_title} subtitle={dict.teambuilding_4_sub_title} />
      <ReactFlowProvider>
        <Box component={'div'} className={styles.editor_container}>
          <DiagramsView />
        </Box>
      </ReactFlowProvider>
      <Stack display={'flex'} justifyContent={'center'} flexDirection={'row'} mt={'40px'}>
        <EditButton onClick={handleRemoveCompleteStep} />
      </Stack>
    </Box>
  )
}

export default Step_04_View
