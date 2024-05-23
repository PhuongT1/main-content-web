'use client'
import { useMemo, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Box, Stack, useTheme } from '@mui/material'
import { IFormValuesMarketingStrategies, IFormValuesMarketingGoals } from '@/types/advertisement-marketing.type'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import { ModalReset } from '@/components/dialog/modal-deck'
import Title from '@/components/title'
import { convertToRem } from '@/utils/convert-to-rem'
import { STEP } from '@/constants/common.constant'
import useToggle from '@/hooks/use-toggle'
import { useAdvertisementMarketingPostData, useAdvertisementMarketingData } from '../../use-advertisement-marketing'
import MarketingStrategiesWrapper from '../_marketing-strategies-wrapper'
import styles from './../../style.module.scss'

function Step_02_Edit() {
  const { palette } = useTheme()
  const form = useFormContext<IFormValuesMarketingStrategies>()
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const { handleSubmit, setValue, formState, watch, trigger } = form
  const selectedDataStrategies = watch('data') || []

  const { mutation } = useAdvertisementMarketingPostData<IFormValuesMarketingStrategies>(STEP.STEP_TWO, {
    keyListRefetchQuery: ['data-advertisement-marketing-strategies']
  })
  const { data: dataGoals } = useAdvertisementMarketingData<IFormValuesMarketingGoals>(
    STEP.STEP_ONE,
    'data-advertisement-marketing'
  )

  // =====
  useEffect(() => {
    const { selectedGoals = [] } = dataGoals?.data ?? {}
    if (selectedGoals.length !== selectedDataStrategies?.length) {
      setValue('data', Array.from({ length: selectedGoals.length || 1 }))
    }
  }, [dataGoals, selectedDataStrategies])

  const handleResetForm = () => {
    if (selectedDataStrategies && selectedDataStrategies?.length > 0) {
      const defaultValue = { strategies: [] }
      selectedDataStrategies.forEach((_, index) => setValue(`data.${index}`, defaultValue))
      trigger()
    }
    setToggleShowDialog(false)
  }
  const onSubmit = handleSubmit((data: IFormValuesMarketingStrategies) => {
    mutation(data)
  })

  const isValidMarketingStrategies = useMemo(() => {
    return (
      selectedDataStrategies?.length &&
      selectedDataStrategies.every((item) => item?.strategies?.filter(Boolean)?.length >= 1)
    )
  }, [JSON.stringify(selectedDataStrategies)])

  // =====
  return (
    <Box component={'form'} onSubmit={onSubmit} className={styles.step_content}>
      <Box sx={{ marginTop: convertToRem(52) }}>
        <Title label='마케팅 전략' subLabel='각각의 마케팅 목표에 알맞는 구체적인 마케팅 전략을 설정해보세요.' />
      </Box>

      <MarketingStrategiesWrapper form={form} data={dataGoals?.data} />

      <ModalReset open={showDialog} onCancel={toggleShowDialog} onSubmit={handleResetForm} />
      <Stack flexDirection={'row'} className={styles.btn_wrapper}>
        <RefreshButton onClick={() => setToggleShowDialog(true)} />
        <SubmitButton type='submit' disabled={formState.isSubmitting || !isValidMarketingStrategies} />
      </Stack>
    </Box>
  )
}

export default Step_02_Edit
