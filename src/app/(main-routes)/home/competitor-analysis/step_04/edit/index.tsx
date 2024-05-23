'use client'
import { useMemo } from 'react'
import { useRecoilState } from 'recoil'
import { useMutation } from '@tanstack/react-query'
import { Box, Stack, useTheme } from '@mui/material'
import { UseFormProps, useForm } from 'react-hook-form'
import FormProvider from '@/form/FormProvider'
import { activeStepSelector, completeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import { dataDiagramCompetitorSelector, dataDeckActive, projectIdCompanyAnalysis } from '@/atoms/home/competitor-analysis'
import { STEP } from '@/constants/common.constant'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import Title from '@/components/title'
import TipItem from '@/components/home/tip-item'
import { convertToRem } from '@/utils/convert-to-rem'
import { sendEvent } from '@/utils/events'
import { TStepPayload, StatusStep } from '@/types/step.type'
import { IFormValuesStepFour } from '@/types/competitor-analysis.type';
import { ModalReset } from '@/components/dialog/modal-deck'
import useToggle from '@/hooks/use-toggle'
import { EventNameCompetitorAnalysis, DEFAULT_STEP } from '@/constants/competitor-analysis'
import { postStep } from '@/services/step.service'
import { TIPS_STEP4 } from './../../data'
import EditorFlow from './../editor'
import styles from './../../style.module.scss'

export type TFormValues = { contents: string }
function Step_04_Edit() {
  const { palette } = useTheme()
  const [projectId] = useRecoilState(projectIdCompanyAnalysis)
  const [, setActiveStep] = useRecoilState(activeStepSelector)
  const [, setCompleteStep] = useRecoilState(completeStepSelector)
  const [, setExpandStep] = useRecoilState(expandStepSelector)
  const [diagramData] = useRecoilState(dataDiagramCompetitorSelector)
  const [deckActive] = useRecoilState(dataDeckActive)

  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  // =====
  const onlyDataDiagram = diagramData?.nodes?.map((node) => node?.data) || []
  const isValidDiagram = useMemo(() => {
    return onlyDataDiagram.length >= 4  && onlyDataDiagram.filter((data) => !data?.position).every((data) => !!data?.name)
  }, [JSON.stringify(onlyDataDiagram)])

  const handleResetForm = () => {
    sendEvent(EventNameCompetitorAnalysis.RESET_STEP4, {})
    setToggleShowDialog(false)
  }
  const handleCompleteStep = async () => {
    setCompleteStep((pre) => {
      if (!pre.includes(STEP.STEP_FOUR)) return [...pre, STEP.STEP_FOUR]
      return pre
    })
    setActiveStep((pre) => pre + 1)
    setExpandStep((pre) => [...pre, STEP.STEP_FOUR])
  }

  const submitStep = useMutation({
    mutationFn: postStep<IFormValuesStepFour>,
    onSuccess: ({}) => handleCompleteStep()
  })

  const formOption: UseFormProps<TFormValues> = { defaultValues: { contents: '' } }
  const methods = useForm<TFormValues>(formOption)
  const { handleSubmit } = methods
  const onSubmit = handleSubmit(async (values: TFormValues) => {
    const payload = {
      ...DEFAULT_STEP,
      projectId,
      stepId: Number(deckActive[STEP.STEP_FOUR]?.id || 4),
      playTime: 0,
      status: StatusStep.FINISHED,
      currentStep: STEP.STEP_FOUR,
      deletedStepActivitiesIds: [],
      data: { ...diagramData }
    }
    submitStep.mutateAsync(payload as TStepPayload<IFormValuesStepFour>)
  })

  // =====
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Box sx={{ marginTop: convertToRem(52) }}>
        <Title
          label='포지셔닝 맵'
          subLabel='작성한 상세 비교 분석을 토대로 내 기업이 경쟁력을 가지는 시장 위치를 확인하세요.'
        />
      </Box>
      <TipItem
        containerSx={{ marginBottom: convertToRem(20) }}
        content={<div className={styles.tip_content}>{TIPS_STEP4}</div>}
      />

      <Box
        display='flex'
        flexDirection='column'
        className={styles.editor_flow}
        sx={{ backgroundColor: palette.home.gray0 }}
      >
        <EditorFlow />
      </Box>

      <ModalReset open={showDialog} onCancel={toggleShowDialog} onSubmit={handleResetForm} />
      <Stack flexDirection={'row'} justifyContent={'center'} gap={'20px'} mt={convertToRem(60)}>
        <RefreshButton onClick={() => setToggleShowDialog(true)} />
        <SubmitButton type='submit' disabled={!isValidDiagram} />
      </Stack>
    </FormProvider>
  )
}

export default Step_04_Edit
