import { DotIcon } from '@/assets/icons'
import { activeStepSelector, completeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import { EditButton } from '@/components/home/button'
import { STEP } from '@/constants/common.constant'
import useToggle from '@/hooks/use-toggle'
import { TFormValuesType } from '@/types/strength-analysis.type'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, Divider, Stack } from '@mui/material'
import React, { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import StrenghtList from './strength-list'
import WeaknessList from './weakness-list'

const SA_Step_01_View = () => {
  const { watch } = useFormContext<TFormValuesType>()

  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  const [, setCompleteStep] = useRecoilState(completeStepSelector)
  const [, setExpandStep] = useRecoilState(expandStepSelector)
  const [, setActiveStep] = useRecoilState(activeStepSelector)

  const handleRemoveCompleteStep = () => {
    setToggleShowDialog(false)
    setCompleteStep((pre) => pre.filter((item) => item < STEP.STEP_ONE))
    setExpandStep((pre) => pre.filter((item) => item < STEP.STEP_ONE))
    setActiveStep(STEP.STEP_ONE)
  }

  const strengthList = watch('strengthList')
  const weaknessList = watch('weaknessList')

  return (
    <Box component={'div'} display={'flex'} flexDirection={'column'} gap={remConvert('60px')}>
      <Divider flexItem sx={{ mt: remConvert('52px') }} />
      <StrenghtList list={strengthList ?? []} />
      <WeaknessList list={weaknessList ?? []} />
      <DeleteDeck open={showDialog} onCancel={toggleShowDialog} onSubmit={handleRemoveCompleteStep} />
      <Stack display={'flex'} justifyContent={'center'} textAlign={'center'} flexDirection={'row'}>
        <EditButton onClick={toggleShowDialog} />
      </Stack>
    </Box>
  )
}

export default SA_Step_01_View
