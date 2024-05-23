import { useMemo, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Box, Stack, useTheme } from '@mui/material'
import { STEP } from '@/constants/common.constant'
import { IFormValuesMarketingChannels, IFormValuesMarketingGoals } from '@/types/advertisement-marketing.type'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import { ModalReset } from '@/components/dialog/modal-deck'
import Title from '@/components/title'
import { convertToRem } from '@/utils/convert-to-rem'
import useToggle from '@/hooks/use-toggle'
import { useAdvertisementMarketingPostData, useAdvertisementMarketingData } from '../../use-advertisement-marketing'
import MarketingChannelsWrapper from '../_marketing-channels-wrapper'
import styles from './../../style.module.scss'

function Step_03_Edit() {
  const { palette } = useTheme()
  const form = useFormContext<IFormValuesMarketingChannels>()
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const { handleSubmit, setValue, formState, watch, trigger } = form
  const selectedDataChannels = watch('data') || []

  const { mutation } = useAdvertisementMarketingPostData<IFormValuesMarketingChannels>(STEP.STEP_THREE, {
    keyListRefetchQuery: ['data-advertisement-marketing-channels']
  })
  const { data: dataGoals } = useAdvertisementMarketingData<IFormValuesMarketingGoals>(
    STEP.STEP_ONE,
    'data-advertisement-marketing'
  )

  // =====
  useEffect(() => {
    const { selectedGoals = [] } = dataGoals?.data ?? {}
    if (selectedGoals.length !== selectedDataChannels?.length) {
      setValue('data', Array.from({ length: selectedGoals.length || 1 }))
    }
  }, [dataGoals, selectedDataChannels])

  const handleResetForm = () => {
    if (selectedDataChannels && selectedDataChannels?.length > 0) {
      const defaultValue = { channels: [] }
      selectedDataChannels.forEach((_, index) => setValue(`data.${index}`, defaultValue))
      trigger()
    }
    setToggleShowDialog(false)
  }
  const onSubmit = handleSubmit((data: IFormValuesMarketingChannels) => {
    mutation(data)
  })

  const isValidMarketingChannels = useMemo(() => {
    return (
      selectedDataChannels?.length && selectedDataChannels.every((item) => item?.channels?.filter(Boolean)?.length >= 1)
    )
  }, [JSON.stringify(selectedDataChannels)])

  // =====
  return (
    <Box component={'form'} onSubmit={onSubmit} className={styles.step_content}>
      <Box sx={{ marginTop: convertToRem(52) }}>
        <Title label='홍보 채널' subLabel='마케팅 전략을 수행하기 위한 홍보 채널을 선택해보세요.' />
      </Box>

      <MarketingChannelsWrapper form={form} data={dataGoals?.data} />

      <ModalReset open={showDialog} onCancel={toggleShowDialog} onSubmit={handleResetForm} />
      <Stack flexDirection={'row'} className={styles.btn_wrapper}>
        <RefreshButton onClick={() => setToggleShowDialog(true)} />
        <SubmitButton type='submit' disabled={formState.isSubmitting || !isValidMarketingChannels} />
      </Stack>
    </Box>
  )
}

export default Step_03_Edit
