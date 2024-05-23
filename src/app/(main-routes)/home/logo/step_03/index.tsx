import { activeStepSelector, completeStepSelector } from '@/atoms/home/stepper'
import { Box, Stack, useTheme } from '@mui/material'
import { useRecoilState, useRecoilValue } from 'recoil'
import Step03Result from './step_03_result'
import { convertToRem } from '@/utils/convert-to-rem'
import SectionTitle from '../section-title'
import LogoDesignSection from './logo-design-section'
import LogoDesigned from './logo-designed'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import styles from './step_03.module.scss'
import { step3 } from '@/atoms/logo'
import { Alert as AlertDialog } from '@/components/dialog'
import useToggle from '@/hooks/use-toggle'
import { useMutation, useQuery } from '@tanstack/react-query'
import { DeckProject } from '@/types/deck.type'
import { getSteps, postStep } from '@/services/step.service'
import { StatusStep } from '@/types/step.type'

const Step03 = () => {
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  const [, setCompleteStep] = useRecoilState(completeStepSelector)
  const [activeStep, setActiveStep] = useRecoilState(activeStepSelector)
  const steps = useRecoilValue(completeStepSelector)
  const [data3, setDataStep3] = useRecoilState(step3)

  const {
    palette: { home }
  } = useTheme()

  const resetData = () => {
    setDataStep3([])
  }


  const { data: stepList }: any = useQuery({
    queryKey: [`step-list-advertisement-marketing`, {deckId: 6}],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, DeckProject] }) => getSteps(param),
    meta: { offLoading: true }
  })
  const submitStep = useMutation({
    mutationFn: postStep<any>,
    onSuccess: ({ data }) => {
      setCompleteStep((pre) => {
        if (!pre.includes(2)) {
          return [...pre, 2]
        }
        return pre
      })
      setActiveStep(3)
    }
  })
  const onCompletedStep3 = () => {
    if (!data3.length) return
    const payload = {
      deckId: 6,
      projectId: 39,
      stepId: stepList?.data[2]?.id,
      playTime: 0,
      status: StatusStep.FINISHED,
      currentStep: 3,
      deletedStepActivitiesIds: [1, 2, 3],
      data: data3
    }

    submitStep.mutateAsync(payload)
  }

  // const onCompletedStep3 = () => {
  //   if (!data3.length) return
  //   setCompleteStep((pre) => {
  //     if (!pre.includes(2)) {
  //       return [...pre, 2]
  //     }

  //     return pre
  //   })
  //   setActiveStep(3)
  // }

  return steps.includes(2) ? (
    <Step03Result />
  ) : (
    <Box py={convertToRem(60)}>
      <SectionTitle
        maintitle='로고 디자인'
        subTitle='레퍼런스 로고를 선택한 뒤 편집 기능을 통해 로고를 디자인해보세요.'
      />
      <LogoDesignSection />
      <LogoDesigned />
      <Stack
        flexDirection={'row'}
        className={styles.btn_active}
        style={{ justifyContent: 'center', gap: '20px', marginTop: '60px' }}
      >
        <Box onClick={() => setToggleShowDialog(true)}>
          <RefreshButton />
        </Box>
        <Box onClick={() => onCompletedStep3()}>
          <SubmitButton disabled={!data3.length} type='submit' />
        </Box>
      </Stack>
      <AlertDialog
        description='삭제된 데이터는 복구되지 않습니다, 초기화 하시겠습니까?'
        title='입력된 데이터가 삭제됩니다'
        open={showDialog}
        onCancel={() => setToggleShowDialog(false)}
        onSubmit={() => {
          setToggleShowDialog(false)
          resetData()
        }}
      />
    </Box>
  )
}

export default Step03
