'use client'
import { useFormContext } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import { useMutation } from '@tanstack/react-query'
import { activeStepSelector, completeStepSelector } from '@/atoms/home/stepper'
import { dataCompanyAnalyzingStep1, dataDeckActive, projectIdCompanyAnalysis } from '@/atoms/home/competitor-analysis'
import { Box, Stack } from '@mui/material'
import { IFormValuesStepOne } from '@/types/competitor-analysis.type'
import { postStep } from '@/services/step.service'
import { TStepPayload, StatusStep } from '@/types/step.type'
import { STEP } from '@/constants/common.constant'
import { DEFAULT_STEP } from '@/constants/competitor-analysis'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import InputWrapper from '@/components/input-wrapper'
import { ModalReset } from '@/components/dialog/modal-deck'
import useToggle from '@/hooks/use-toggle'
import CompetitorSelection from '../competitor-selection'
import { MAXLENGTH_INPUT } from '../../_components/utils'
import { DATA_MY_COMPANY } from './../../data'
import styles from './../../style.module.scss'

function Step_01_Edit() {
  const [projectId] = useRecoilState(projectIdCompanyAnalysis)
  const [, setActiveStep] = useRecoilState(activeStepSelector)
  const [dataStep1, setDataStep1] = useRecoilState(dataCompanyAnalyzingStep1)
  const [, setCompleteStep] = useRecoilState(completeStepSelector)
  const [deckActive] = useRecoilState(dataDeckActive)
  const form = useFormContext<IFormValuesStepOne>()
  const { handleSubmit, reset, control, formState, watch } = form
  const selectedCompetitors = watch('selectedCompetitors')

  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  // =====
  const submitStep = useMutation({
    mutationFn: postStep<IFormValuesStepOne>,
    onSuccess: ({ data }) => {
      setDataStep1(data?.data)
      handleCompleteStep()
    }
  })

  const handleResetForm = () => {
    const defaultValue = { industry: '', idea: '', selectedCompetitors: [] }
    reset(defaultValue)
    setToggleShowDialog(false)
  }
  const handleCompleteStep = async () => {
    setCompleteStep((prev) => {
      if (!prev.includes(STEP.STEP_ONE)) {
        return [STEP.STEP_ONE]
      }
      return prev
    })
    setActiveStep((pre) => pre + 1)
  }

  const onSubmit = handleSubmit((data: IFormValuesStepOne) => {
    const payload = {
      ...DEFAULT_STEP,
      projectId, 
      stepId: Number(deckActive[STEP.STEP_ONE]?.id || 1),
      playTime: 0,
      status: StatusStep.FINISHED,
      currentStep: STEP.STEP_ONE,
      deletedStepActivitiesIds: [deckActive[STEP.STEP_TWO]?.id, deckActive[STEP.STEP_THREE]?.id],
      data: {
        ...data,
        myCompany: { ...DATA_MY_COMPANY, name: data?.industry || '', description: data?.idea || '' },
        addedCompanies: dataStep1?.addedCompanies || []
      }
    }

    submitStep.mutateAsync(payload as TStepPayload<IFormValuesStepOne>)
  })

  // =====
  return (
    <Box component={'form'} onSubmit={onSubmit} className={styles.step_content}>
      <InputWrapper
        title='사업 아이디어'
        subTitle='사업 아이디어를 간략하게 정리해보세요.'
        items={[
          {
            name: 'industry',
            label: '회사명',
            column: 3,
            placeholder: '브랜드명 입력',
            propsInput: { control },
            textFieldProps: { inputProps: { maxLength: MAXLENGTH_INPUT.INDUSTRY } }
          },
          {
            name: 'idea',
            label: '아이디어',
            column: 9,
            placeholder: '사회적 문제 해결을 위한 직장인 대상 해양 액티비티 선택 플랫폼',
            propsInput: { control },
            textFieldProps: { inputProps: { maxLength: MAXLENGTH_INPUT.IDEA } }
          }
        ]}
      />

      <CompetitorSelection form={form} data={dataStep1} />

      <ModalReset open={showDialog} onCancel={toggleShowDialog} onSubmit={handleResetForm} />
      <Stack flexDirection={'row'} className={styles.btn_wrapper}>
        <RefreshButton onClick={() => setToggleShowDialog(true)} />
        <SubmitButton
          type='submit'
          disabled={formState.isSubmitting || !(formState.isValid && selectedCompetitors?.length > 0)}
        />
      </Stack>
    </Box>
  )
}

export default Step_01_Edit
