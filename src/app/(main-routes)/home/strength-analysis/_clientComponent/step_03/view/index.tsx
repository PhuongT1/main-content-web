import { activeStepSelector, completeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import { STEP } from '@/constants/common.constant'
import useToggle from '@/hooks/use-toggle'
import { TFormValuesRangeType } from '@/types/strength-analysis.type'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, Divider } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useRecoilState } from 'recoil'

const SA_Step_03_View = () => {
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

  return (
    <Box component={'div'} display={'flex'} flexDirection={'column'} gap={remConvert('60px')}>
      <Divider flexItem sx={{ mt: remConvert('52px') }} />
      SDFSDF
    </Box>
  )
}

export default SA_Step_03_View
