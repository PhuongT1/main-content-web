import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'
import { Box, Stack, Divider } from '@mui/material'
import { EditButton } from '@/components/home/button'
import { STEP } from '@/constants/common.constant'
import { activeStepSelector, completeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import { useAdvertisementMarketingData } from '../../use-advertisement-marketing'
import { IFormValuesMarketingPlans } from '@/types/advertisement-marketing.type'
import { convertToRem } from '@/utils/convert-to-rem'
import MarketingPlanTable from './../_marketing-plan-table'
import styles from './../../style.module.scss'

function Step_05_View() {
  const [isLoading, setIsLoading] = useState(true)
  const setCompleteStep = useSetRecoilState(completeStepSelector)
  const setExpandStep = useSetRecoilState(expandStepSelector)
  const setActiveStep = useSetRecoilState(activeStepSelector)
  const form = useFormContext<IFormValuesMarketingPlans>()
  const { reset } = form

  const { data: dataPlans } = useAdvertisementMarketingData<IFormValuesMarketingPlans>(
    STEP.STEP_FIVE,
    'data-advertisement-marketing-plans'
  )

  // =====
  useEffect(() => {
    dataPlans?.data && reset(dataPlans.data)
    setIsLoading(false)
  }, [dataPlans?.data])

  const handleRemoveCompleteStep = () => {
    setCompleteStep((pre) => pre.filter((item) => item < STEP.STEP_FIVE))
    setExpandStep((pre) => pre.filter((item) => item < STEP.STEP_FIVE))
    setActiveStep(STEP.STEP_FIVE)
  }

  // =====
  return (
    <Box component={'form'} className={styles.step_content}>
      <Divider sx={{ mt: convertToRem(52), mb: convertToRem(60), width: '100%', bgcolor: 'main_grey.gray800' }} />

      <Box marginBottom={convertToRem(20)} component={'h2'}>
        홍보마케팅 실행 계획 수립
      </Box>
      {!isLoading && <MarketingPlanTable isView />}

      <Stack flexDirection={'row'} className={styles.btn_wrapper}>
        <EditButton onClick={handleRemoveCompleteStep} />
      </Stack>
    </Box>
  )
}

export default Step_05_View
