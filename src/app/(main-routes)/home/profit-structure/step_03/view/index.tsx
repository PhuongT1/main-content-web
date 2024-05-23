import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Box, Stack, Divider, useTheme } from '@mui/material'
import { EditButton } from '@/components/home/button'
import SectionTitle from '@/components/home/section-title'
import { STEP } from '@/constants/common.constant'
import { IFormValuesSalesAnalysis } from '@/types/profit-structure.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { useLanguage } from '@/hooks/use-language'
import { useProfitStructureData, useClickButtonEdit } from '../../use-profit-structure'
import TableExpectedSales from './../_expected-sales/table'
import ChartAnnualSales from './../_annual-sales/chart'
import styles from './../../style.module.scss'

function Step_03_View() {
  const { palette } = useTheme()
  const { dict } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const { reset } = useFormContext<IFormValuesSalesAnalysis>()

  const { data } = useProfitStructureData<IFormValuesSalesAnalysis>(STEP.STEP_THREE, 'data-profit-sales-analysis')
  const { handleBtnEdit } = useClickButtonEdit(STEP.STEP_THREE)

  // =====
  useEffect(() => {
    data?.data && reset(data.data)
    setIsLoading(false)
  }, [data?.data])

  // =====
  return (
    <Box component={'form'} className={styles.step_content}>
      <Divider sx={{ mt: convertToRem(52), mb: convertToRem(60), width: '100%', borderColor: palette.home.gray200 }} />

      <SectionTitle title={dict.profit_step3_title2} />
      <TableExpectedSales isView />

      <SectionTitle title={dict.profit_step3_title3} />
      {!isLoading && <ChartAnnualSales isView />}

      <Stack flexDirection={'row'} className={styles.btn_wrapper}>
        <EditButton onClick={handleBtnEdit} />
      </Stack>
    </Box>
  )
}

export default Step_03_View
