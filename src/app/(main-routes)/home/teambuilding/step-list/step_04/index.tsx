'use client'

// mui
import { Box, useTheme } from '@mui/material'

// components

// form

import { completeStepSelector } from '@/atoms/home/stepper'
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil'

import Step_04_Edit from './edit'
import Step_04_View from './view'
import { STEP } from '@/constants/common.constant'
import { TeambuldingEnumId } from '..'
import { getStep, getStepData } from '@/atoms/home/teambuilding'
import { useStepProject } from '../../use-teambuilding'

function Step_TBuidling_4() {
  const [completeStep, setCompleted] = useRecoilState(completeStepSelector)
  const { stepProject } = useStepProject(STEP.STEP_FOUR)
  const step = useRecoilValue(
    getStep({ position: TeambuldingEnumId.StepPosition.Step04, deckId: TeambuldingEnumId.DeckId })
  )
  const { contents: dataStep04 = [] } = useRecoilValueLoadable(
    getStepData({
      deckId: TeambuldingEnumId.DeckId,
      position: STEP.STEP_FOUR,
      stepId: step?.id,
      projectId: Number(stepProject.projectId || 0)
    })
  )

  return <Box>{!completeStep.includes(STEP.STEP_FOUR) ? <Step_04_Edit /> : <Step_04_View />}</Box>
}

export default Step_TBuidling_4
