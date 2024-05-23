'use client'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Box, Stack } from '@mui/material'
import { IFormValuesMarketingPlans } from '@/types/advertisement-marketing.type'
import { STEP } from '@/constants/common.constant'
import { EventNameTBuidlding } from '@/constants/teambuilding/teambuilding.constant'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import { ModalReset } from '@/components/dialog/modal-deck'
import Title from '@/components/title'
import { convertToRem } from '@/utils/convert-to-rem'
import { listenEvent } from '@/utils/events'
import useToggle from '@/hooks/use-toggle'
import ErrorMessage from '@/form/ErrorMessage'
import { useAdvertisementMarketingPostData } from '../../use-advertisement-marketing'
import { useGetDefaultValue } from './useValue'
import MarketingPlanFilter from './../_marketing-plan-filter'
import MarketingPlanTable from './../_marketing-plan-table'
import styles from './../../style.module.scss'

function Step_05_Edit() {
  const [messageAlert, setMessageAlert] = useState('')
  const defaultValuesForm: IFormValuesMarketingPlans = useGetDefaultValue()

  const form = useFormContext<IFormValuesMarketingPlans>()
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const { handleSubmit, reset, formState, setValue, getValues, watch } = form
  const channelListWatcher = watch('data')
  const totalBudget = getValues('totalBudget')
  const remainBudget = getValues('remainBudget')
  const isEditingForm = Boolean(remainBudget === '0' && totalBudget !== '0')

  const { mutation } = useAdvertisementMarketingPostData<IFormValuesMarketingPlans>(STEP.STEP_FIVE, {
    keyListRefetchQuery: ['data-advertisement-marketing-plans']
  })

  // =====
  useEffect(() => {
    listenEvent(EventNameTBuidlding.CLEAR_ERROR_MSG, () => {
      setMessageAlert('')
    })
  }, [])

  useEffect(() => {
    if (!isEditingForm && defaultValuesForm) {
      setValue('startMonth', defaultValuesForm?.startMonth || 1)
      setValue('unitCurrency', defaultValuesForm?.unitCurrency || '원')
      setValue('totalBudget', defaultValuesForm?.totalBudget || '0')
      setValue('remainBudget', defaultValuesForm?.totalBudget || '0')
      setValue('data', defaultValuesForm?.data || [])
    }
  }, [JSON.stringify(defaultValuesForm)])

  const handleResetForm = () => {
    const { data = [] } = defaultValuesForm || {}
    if (data && data?.length > 0) {
      data.forEach((_, index) => {
        setValue(`data.${index}.budget`, '')
        setValue(`data.${index}.monthSelectedList`, Array(12).fill(''))
      })
    }

    reset(defaultValuesForm)
    setValue('startMonth', 0)
    setToggleShowDialog(false)
  }
  const onSubmit = handleSubmit((data: IFormValuesMarketingPlans) => {
    const remainBudgetNumber = parseFloat(data?.remainBudget?.replace(/,/g, ''))
    if (remainBudgetNumber < 0) {
      setMessageAlert('총 예산을 초과했습니다. 배정예산을 조정해주세요.')
      return
    }
    if (remainBudgetNumber > 0) {
      setMessageAlert('남은 예산을 모두 소진해주세요.')
      return
    }

    const startMonth = typeof data?.startMonth === 'string' ? parseInt(data?.startMonth, 10) : data?.startMonth
    mutation({ ...data, startMonth })
  })

  const isValidForm = () => {
    let isValid = true

    if (!channelListWatcher || channelListWatcher.length === 0) {
      isValid = false
    } else {
      for (const channel of channelListWatcher) {
        const checkValueBoxColors = channel?.monthSelectedList?.some((color) => !!color)
        if (!checkValueBoxColors) {
          isValid = false
          break
        }
      }
    }

    return isValid
  }

  // =====
  return (
    <Box component={'form'} onSubmit={onSubmit} className={styles.step_content}>
      <Box sx={{ marginTop: convertToRem(52) }}>
        <Title
          label='홍보마케팅 실행 계획 수립'
          subLabel='마케팅 목표를 달성하기 위한 월별 홍보마케팅 실행 계획을 수립해보세요.'
        />
      </Box>

      <MarketingPlanFilter />
      <MarketingPlanTable />

      {messageAlert && (
        <Box component={'div'} sx={{ mt: convertToRem(20) }}>
          <ErrorMessage message={messageAlert} />
        </Box>
      )}

      <ModalReset open={showDialog} onCancel={toggleShowDialog} onSubmit={handleResetForm} />
      <Stack flexDirection={'row'} className={styles.btn_wrapper}>
        <RefreshButton onClick={() => setToggleShowDialog(true)} />
        <SubmitButton type='submit' disabled={formState.isSubmitting || !formState.isValid || !isValidForm()} />
      </Stack>
    </Box>
  )
}

export default Step_05_Edit
