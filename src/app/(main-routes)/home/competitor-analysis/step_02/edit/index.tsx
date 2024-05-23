'use client'
import { useMemo, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useSetRecoilState, useRecoilState } from 'recoil'
import { activeStepSelector, completeStepSelector } from '@/atoms/home/stepper'
import { dataCompanyAnalyzingStep2, dataDeckActive, projectIdCompanyAnalysis } from '@/atoms/home/competitor-analysis'
import { Box, Stack } from '@mui/material'
import { IFormValuesStepTwo } from '@/types/competitor-analysis.type'
import { TStepPayload, StatusStep } from '@/types/step.type'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import Title from '@/components/title'
import TipItem from '@/components/home/tip-item'
import { convertToRem } from '@/utils/convert-to-rem'
import { STEP } from '@/constants/common.constant'
import { postStep } from '@/services/step.service'
import { DEFAULT_STEP } from '@/constants/competitor-analysis'
import { ModalReset } from '@/components/dialog/modal-deck'
import useToggle from '@/hooks/use-toggle'
import { MAXLENGTH_INPUT } from '../../_components/utils'
import CompetitorAnalyzingCardWrapper from '../competitor-card-wrapper'
import { TIPS } from './../data'
import styles from './../../style.module.scss'

function Step_02_Edit() {
  const [projectId] = useRecoilState(projectIdCompanyAnalysis)
  const setDataStep2 = useSetRecoilState(dataCompanyAnalyzingStep2)
  const setActiveStep = useSetRecoilState(activeStepSelector)
  const setCompleteStep = useSetRecoilState(completeStepSelector)
  const [deckActive] = useRecoilState(dataDeckActive)
  const form = useFormContext<IFormValuesStepTwo>()
  const { handleSubmit, setValue, watch, formState, trigger } = form

  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  const selectedCompetitors = watch(`data`) || []
  const isValidCompetitorsCharacteristic = useMemo(() => {
    return selectedCompetitors.every(
      (item) => item?.differentCharacteristics?.filter(Boolean)?.length >= MAXLENGTH_INPUT.SELECTED_CHARACTERISTICS
    )
  }, [JSON.stringify(selectedCompetitors)])

  useEffect(() => {
    // only trigger when user edit
    if (selectedCompetitors?.length > 0) {
      trigger()
    }
  }, [])

  const handleResetForm = () => {
    if (selectedCompetitors && selectedCompetitors?.length > 0) {
      const defaultValue = { age: '', job: '', gender: '', differentCharacteristics: [] }
      selectedCompetitors.forEach((_, index) => setValue(`data.${index}`, defaultValue))
      form.trigger()
    }
    setToggleShowDialog(false)
  }
  const handleCompleteStep = async () => {
    setCompleteStep((pre) => {
      if (!pre.includes(STEP.STEP_TWO)) {
        return [...pre, STEP.STEP_TWO]
      }
      return pre
    })
    setActiveStep((pre) => pre + 1)
  }

  const submitStep = useMutation({
    mutationFn: postStep<IFormValuesStepTwo>,
    onSuccess: ({ data }) => {
      setDataStep2(data?.data)
      handleCompleteStep()
    }
  })
  const onSubmit = handleSubmit((values: IFormValuesStepTwo) => {
    const payload = {
      ...DEFAULT_STEP,
      projectId,
      stepId: Number(deckActive[STEP.STEP_TWO]?.id || 2),
      playTime: 0,
      status: StatusStep.FINISHED,
      currentStep: STEP.STEP_TWO,
      deletedStepActivitiesIds: [deckActive[STEP.STEP_THREE]?.id],
      data: { ...values }
    }
    submitStep.mutateAsync(payload as TStepPayload<IFormValuesStepTwo>)
  })

  return (
    <Box component={'form'} onSubmit={onSubmit} className={styles.step_content}>
      <Box sx={{ marginTop: convertToRem(52) }}>
        <Title label='타깃고객 분석' subLabel='우리기업과 경쟁기업의 타깃고객을 설정해보고 비교해보세요.' />
      </Box>
      <CompetitorAnalyzingCardWrapper type='SELECT' form={form} />

      <Box sx={{ marginTop: convertToRem(52) }}>
        <Title label='차별화특성 분석' subLabel='우리기업과 경쟁기업의 차별화특성을 설정해보고 비교해보세요.' />
      </Box>
      <TipItem content={<div className={styles.tip_content}>{TIPS}</div>} />
      <CompetitorAnalyzingCardWrapper type='CHECKBOX' form={form} sxCard={{ marginTop: convertToRem(8) }} />

      <ModalReset open={showDialog} onCancel={toggleShowDialog} onSubmit={handleResetForm} />
      <Stack flexDirection={'row'} className={styles.btn_wrapper}>
        <RefreshButton onClick={() => setToggleShowDialog(true)} />
        <SubmitButton
          type='submit'
          disabled={formState.isSubmitting || !(formState.isValid && isValidCompetitorsCharacteristic)}
        />
      </Stack>
    </Box>
  )
}

export default Step_02_Edit
