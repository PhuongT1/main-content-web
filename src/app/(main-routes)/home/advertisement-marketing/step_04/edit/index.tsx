import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { Box, Stack } from '@mui/material'
import { STEP } from '@/constants/common.constant'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import { ModalReset } from '@/components/dialog/modal-deck'
import Title from '@/components/title'
import { convertToRem } from '@/utils/convert-to-rem'
import useToggle from '@/hooks/use-toggle'
import { useAdvertisementMarketingPostData, useAdvertisementMarketingData } from '../../use-advertisement-marketing'
import { IFormValuesMarketingKpiList, IFormValuesMarketingGoals } from '@/types/advertisement-marketing.type'
import MarketingKpiListWrapper from '../_marketing-kpi-list-wrapper'
import styles from './../../style.module.scss'

function Step_04_Edit() {
  const form = useFormContext<IFormValuesMarketingKpiList>()
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const { handleSubmit, setValue, formState, watch, trigger } = form
  const selectedDataKpiList = watch('data') || []

  const { mutation } = useAdvertisementMarketingPostData<IFormValuesMarketingKpiList>(STEP.STEP_FOUR, {
    keyListRefetchQuery: ['data-advertisement-marketing-kpiList']
  })
  const { data: dataGoals } = useAdvertisementMarketingData<IFormValuesMarketingGoals>(
    STEP.STEP_ONE,
    'data-advertisement-marketing'
  )

  // =====
  const handleResetForm = () => {
    if (selectedDataKpiList && selectedDataKpiList?.length > 0) {
      const defaultValue = { title: '', description: '', budget: '', unitCurrency: '원' }
      selectedDataKpiList.forEach((_, index) => setValue(`data.${index}`, defaultValue))
      trigger()
    }
    setToggleShowDialog(false)
  }
  const onSubmit = handleSubmit((data: IFormValuesMarketingKpiList) => {
    mutation(data)
  })

  const isValidMarketingKpiList = useMemo(() => {
    return (
      selectedDataKpiList?.length &&
      selectedDataKpiList.every((kpi) => !!kpi?.title && !!kpi?.description && !!kpi?.budget)
    )
  }, [JSON.stringify(selectedDataKpiList)])

  // =====
  return (
    <Box component={'form'} onSubmit={onSubmit} className={styles.step_content}>
      <Box sx={{ marginTop: convertToRem(52) }}>
        <Title label='마케팅 목표별 KPI' subLabel='마케팅 전략 구체화하기 위해 측정 가능한 KPI를 설정해보세요.' />
      </Box>

      <MarketingKpiListWrapper form={form} data={dataGoals?.data} />

      <ModalReset open={showDialog} onCancel={toggleShowDialog} onSubmit={handleResetForm} />
      <Stack flexDirection={'row'} className={styles.btn_wrapper}>
        <RefreshButton onClick={() => setToggleShowDialog(true)} />
        <SubmitButton type='submit' disabled={formState.isSubmitting || !isValidMarketingKpiList} />
      </Stack>
    </Box>
  )
}

export default Step_04_Edit
