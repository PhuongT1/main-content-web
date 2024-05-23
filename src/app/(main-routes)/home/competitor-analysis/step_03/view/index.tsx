import { useMemo } from 'react'
import { useSetRecoilState, useRecoilState } from 'recoil'
import { Box, Stack, Divider } from '@mui/material'
import { activeStepSelector, completeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import { dataCompanyAnalyzingStep3, dataCompanyAnalyzingStep1 } from '@/atoms/home/competitor-analysis'
import { EditButton } from '@/components/home/button'
import { STEP } from '@/constants/common.constant'
import { convertToRem } from '@/utils/convert-to-rem'
import TableComparisonView from '../../_components/table_comparison_view'
import styles from './../../style.module.scss'

function Step_03_View() {
  const setCompleteStep = useSetRecoilState(completeStepSelector)
  const setActiveStep = useSetRecoilState(activeStepSelector)
  const setExpandStep = useSetRecoilState(expandStepSelector)
  const [dataStep3] = useRecoilState(dataCompanyAnalyzingStep3)
  const [dataStep1] = useRecoilState(dataCompanyAnalyzingStep1)

  const selectedCompetitor = useMemo(() => {
    return [dataStep1?.myCompany, ...(dataStep1?.selectedCompetitors || [])]?.filter(Boolean) || []
  }, [dataStep1])

  const handleRemoveCompleteStep = () => {
    setCompleteStep((pre) => pre.filter((item) => item < STEP.STEP_THREE))
    setExpandStep((pre) => pre.filter((item) => item < STEP.STEP_TWO))
    setActiveStep(STEP.STEP_THREE)
  }

  return (
    <Box component={'form'} className={styles.step_content}>
      <Divider sx={{ mt: convertToRem(52), mb: convertToRem(60), width: '100%', bgcolor: 'main_grey.gray800' }} />

      <Box marginBottom={convertToRem(60)}>
        <Box marginBottom={convertToRem(20)} component={'h2'}>
          경쟁사 비교분석
        </Box>

        <TableComparisonView
          data={dataStep3}
          headers={['구 분', ...(selectedCompetitor?.map((item) => item?.name || '') ?? [])]}
        />
      </Box>

      <Stack flexDirection={'row'} className={styles.btn_wrapper}>
        <EditButton onClick={handleRemoveCompleteStep} />
      </Stack>
    </Box>
  )
}

export default Step_03_View
