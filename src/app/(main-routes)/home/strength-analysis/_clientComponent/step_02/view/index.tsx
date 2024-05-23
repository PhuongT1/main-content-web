import { activeStepSelector, completeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import { EditButton } from '@/components/home/button'
import { STEP } from '@/constants/common.constant'
import useToggle from '@/hooks/use-toggle'
import { TFormValuesRangeType } from '@/types/strength-analysis.type'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, Divider, Stack } from '@mui/material'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import RangeSection from '../edit/components/range-section'
import { Typography } from '@/elements'
import { STRENGTH_TYPE } from '@/constants/strength-analysis.constant'

const SA_Step_02_View = () => {
  const { watch } = useFormContext<TFormValuesRangeType>()

  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  const [, setCompleteStep] = useRecoilState(completeStepSelector)
  const [, setExpandStep] = useRecoilState(expandStepSelector)
  const [, setActiveStep] = useRecoilState(activeStepSelector)

  const handleRemoveCompleteStep = () => {
    setToggleShowDialog(false)
    setCompleteStep((pre) => pre.filter((item) => item < STEP.STEP_TWO))
    setExpandStep((pre) => pre.filter((item) => item < STEP.STEP_TWO))
    setActiveStep(STEP.STEP_TWO)
  }

  const strengthList = watch('strength')
  const weaknessList = watch('weakness')

  return (
    <Box component={'div'} display={'flex'} flexDirection={'column'} gap={remConvert('60px')}>
      <Divider flexItem sx={{ mt: remConvert('52px') }} />
      <Box component={'div'} display={'flex'} flexDirection={'column'} gap={remConvert('20px')}>
        <Typography cate='title_60' fontWeight={700}>
          어울리는 유형 분류
        </Typography>
        <RangeSection isView type={STRENGTH_TYPE.strength} selectActiveList={strengthList} />
      </Box>
      <Box component={'div'} display={'flex'} flexDirection={'column'} gap={remConvert('20px')}>
        <Typography cate='title_60' fontWeight={700}>
          어울리는 않는 유형 분류
        </Typography>
        <RangeSection isView type={STRENGTH_TYPE.weakness} selectActiveList={weaknessList} />
      </Box>
      <DeleteDeck open={showDialog} onCancel={toggleShowDialog} onSubmit={handleRemoveCompleteStep} />
      <Stack display={'flex'} justifyContent={'center'} textAlign={'center'} flexDirection={'row'}>
        <EditButton onClick={toggleShowDialog} />
      </Stack>
    </Box>
  )
}

export default SA_Step_02_View
