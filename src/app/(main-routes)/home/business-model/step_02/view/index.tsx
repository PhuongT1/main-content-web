import { activeStepSelector, completeStepSelector } from '@/atoms/home/stepper'
import { EditButton } from '@/components/home/button'
import { STEP } from '@/constants/common.constant'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Divider, Stack } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'
import styles from '../../[projectId]/style.module.scss'
import { TBusinessModelCompositionForm } from '../../types/business-model-composition.type'
import BusinessModelComposition from '../business-model-composition'

function Step_02_View() {
  const setCompleteStep = useSetRecoilState(completeStepSelector)
  const setActiveStep = useSetRecoilState(activeStepSelector)
  const form = useFormContext<TBusinessModelCompositionForm>()

  const onRemoveCompleteStep = () => {
    setCompleteStep((pre) => {
      const removeStep = pre.filter((item) => item !== STEP.STEP_TWO)
      return removeStep
    })
    setActiveStep(STEP.STEP_TWO)
  }

  return (
    <Box component={'form'} className={styles.step_content}>
      <Divider sx={{ mt: convertToRem(52), mb: convertToRem(60), width: '100%', bgcolor: 'main_grey.gray800' }} />

      <Box>
        <Box marginBottom={convertToRem(20)} component={'h2'}>
          타깃고객 분석
        </Box>
      </Box>

      <BusinessModelComposition form={form} isViewing />

      <Stack flexDirection={'row'} className={styles.btn_wrapper}>
        <EditButton onClick={onRemoveCompleteStep} />
      </Stack>
    </Box>
  )
}

export default Step_02_View
