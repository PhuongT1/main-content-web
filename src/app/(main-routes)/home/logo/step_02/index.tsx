import { Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Stack, useTheme } from '@mui/material'
import GenerateAi from '../generate-ai'
import { useEffect, useRef, useState } from 'react'
import Symbols from './symbols'
import styles from './step_02.module.scss'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import { useRecoilState, useRecoilValue } from 'recoil'
import { step2 } from '@/atoms/logo'
import { activeStepSelector, completeStepSelector } from '@/atoms/home/stepper'
import Step02Result from './step_02_result'
import { Alert as AlertDialog } from '@/components/dialog'
import useToggle from '@/hooks/use-toggle'
import LoadingAI from '@/elements/loadingAI'
import { remConvert } from '@/utils/convert-to-rem'
import { useMutation, useQuery } from '@tanstack/react-query'
import { DeckProject } from '@/types/deck.type'
import { getSteps, postStep } from '@/services/step.service'
import { StatusStep } from '@/types/step.type'

const Step02 = () => {
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  const [generateAi, setGenerateAi] = useState<boolean>(false)
  const data: any = useRecoilValue(step2)
  const symbolsRef: any = useRef()
  const [, setCompleteStep] = useRecoilState(completeStepSelector)
  const [activeStep, setActiveStep] = useRecoilState(activeStepSelector)
  const steps = useRecoilValue(completeStepSelector)
  const {
    palette: { home }
  } = useTheme()

  useEffect(() => {
    if (data.length) {
      onGenerateAi()
    }
  }, [data])

  const onGenerateAi = () => {
    setGenerateAi(true)
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
        if (!pre.includes(1)) {
          return [...pre, 1]
        }
        return pre
      })
      setActiveStep(2)
    }
  })
  const onCompletedStep2 = () => {
    if (!data.length) return
    const payload = {
      deckId: 6,
      projectId: 39,
      stepId: stepList?.data[1]?.id,
      playTime: 0,
      status: StatusStep.FINISHED,
      currentStep: 2,
      deletedStepActivitiesIds: [1, 2, 3],
      data: data
    }

    submitStep.mutateAsync(payload)
  }
  return steps.includes(1) ? (
    <Step02Result />
  ) : (
    <Box py={convertToRem(60)}>
      <Box sx={{ marginBottom: '20px' }}>
        <Typography sx={{ marginRight: '10px' }} component={'span'} cate='title_60' color={home.gray50}>
          레퍼런스 로고
        </Typography>
        <Typography component={'span'} cate='sub_title_30' color={home.mint500}>
          (최대 10개 선택)
        </Typography>
        <Typography sx={{ marginTop: '10px' }} cate='body_30' color={home.gray100}>
          슘페터 AI가 생성한 로고 후보군 중에서 로고 디자인에 참고할만한 로고를 선택해 보세요.
        </Typography>
      </Box>
      {/* {generateAi ? (
        <Symbols ref={symbolsRef} />
      ) : (
        <LoadingAI isLoading={generateAi}>
          <Box component={'div'} sx={{ backgroundColor: '#191A1C', width: '100%', borderRadius: remConvert('10px') }}>
            <SchumpeterAI
              onClick={() => {
                onGenerateAi()
              }}
            />
          </Box>
        </LoadingAI>
      )} */}
      <Symbols ref={symbolsRef} />
      <Stack
        flexDirection={'row'}
        className={styles.btn_active}
        style={{ justifyContent: 'center', gap: '20px', marginTop: '60px' }}
      >
        <Box onClick={() => setToggleShowDialog(true)}>
          <RefreshButton />
        </Box>
        <Box
          onClick={() => {
            onCompletedStep2()
          }}
        >
          <SubmitButton disabled={!data?.length} type='submit' />
        </Box>
      </Stack>
      <AlertDialog
        description='삭제된 데이터는 복구되지 않습니다, 초기화 하시겠습니까?'
        title='입력된 데이터가 삭제됩니다'
        open={showDialog}
        onCancel={() => setToggleShowDialog(false)}
        onSubmit={() => {
          setToggleShowDialog(false)
          symbolsRef.current.resetSymbols()
        }}
      />
    </Box>
  )
}

export default Step02
