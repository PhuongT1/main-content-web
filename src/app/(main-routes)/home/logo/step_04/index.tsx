import { Typography } from '@/elements'
import { Box, Grid, Stack, useTheme } from '@mui/material'
import styles from './step_04.module.scss'
import { DataStep1 } from '@/types/logo.type'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { step1, step2, step3, step4 } from '@/atoms/logo'
import * as _ from 'lodash'
import { useEffect, useState } from 'react'
import { convertToRem } from '@/utils/convert-to-rem'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import { activeStepSelector, completeStepSelector } from '@/atoms/home/stepper'
import CardOption from '../card-option'
import SectionTitle from '../section-title'
import RadioOutlineIcon from '@/assets/icons/radio-outline'
import RadioOutlineFilledIcon from '@/assets/icons/radio-outline-filled'
import Step04Result from './step_04_result'
import Image from 'next/image'
import { Alert as AlertDialog } from '@/components/dialog'
import useToggle from '@/hooks/use-toggle'
import { useMutation, useQuery } from '@tanstack/react-query'
import { DeckProject } from '@/types/deck.type'
import { getSteps, postStep } from '@/services/step.service'
import { StatusStep } from '@/types/step.type'

const fontWeights = {
  thin: '100',
  heavy: '900',
  black: '900',
  extraBold: '800',
  medium: '500',
  extraLight: '200',
  bold: '700',
  regular: '400',
  light: '300'
}

const Step04 = () => {
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  const data1: DataStep1 = useRecoilValue(step1)
  const [data2, setDataStep2] = useRecoilState(step2)
  const [data3, setDataStep3] = useRecoilState(step3)
  const [data4, setDataStep4] = useRecoilState(step4)
  const [, setCompleteStep] = useRecoilState(completeStepSelector)
  const setActiveStep = useSetRecoilState(activeStepSelector)
  const [cardActive, setCardActive] = useState<number>()
  const steps = useRecoilValue(completeStepSelector)

  const {
    palette: { home }
  } = useTheme()

  useEffect(() => {
    if (data3.length) {
      for (const logo of data3) {
        if (!_.isEmpty(logo.htmlSvg)) {
          const elements: any = document.getElementsByClassName(`path_${logo.htmlSvg.id}_${logo.color}`)
          for (var i = 0; i < elements.length; i++) {
            var element = elements[i]
            element.setAttribute('fill', logo.color || 'black')
            element.setAttribute('stroke', logo.color || 'black')
          }
        }
      }
    }
  }, [data3, cardActive, steps])

  const getFontWeight = (weight: string) => {
    switch (weight) {
      case 'Thin':
        return fontWeights.thin
      case 'Medium':
        return fontWeights.medium
      case 'Black':
        return fontWeights.black
      case 'ExtraLight':
        return fontWeights.extraLight
      case 'Bold':
        return fontWeights.bold
      case 'ExtraBold':
        return fontWeights.extraBold
      case 'Light':
        return fontWeights.light
      case 'Regular':
        return fontWeights.regular
      case 'Heavy':
        return fontWeights.heavy
      default:
        return ''
    }
  }

  const resetData = () => {
    setCardActive(0)
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
        if (!pre.includes(3)) {
          return [...pre, 3]
        }
        return pre
      })
      if (cardActive){
        setDataStep4(data3[cardActive - 1])

      }
      setActiveStep(4)
    }
  })
  const onCompletedStep4 = () => {
    if (!cardActive) return
    const payload = {
      deckId: 6,
      projectId: 39,
      stepId: stepList?.data[3]?.id,
      playTime: 0,
      status: StatusStep.FINISHED,
      currentStep: 4,
      deletedStepActivitiesIds: [1, 2, 3],
      data: data3[cardActive - 1]
    }

    submitStep.mutateAsync(payload)
  }

  // const onCompletedStep4 = () => {
  //   if (!cardActive) return

  //   setDataStep4(data3[cardActive - 1])

  //   setCompleteStep((pre) => {
  //     if (!pre.includes(3)) {
  //       return [...pre, 3]
  //     }

  //     return pre
  //   })

  //   setActiveStep(4)
  // }
  return steps.includes(3) ? (
    <Step04Result />
  ) : (
    <Box py={convertToRem(60)}>
      <Box sx={{ marginBottom: '20px' }}>
        <SectionTitle maintitle='최종 로고 선택' subTitle='로고 1개를 선택해주세요.' />
      </Box>
      <Box
        sx={{
          marginTop: '20px',
          padding: '20px 24px',
          borderRadius: '10px',
          backgroundColor: home.gray300
        }}
      >
        <Grid container spacing={2}>
          {data3.map((logo: any, index: number) => {
            return (
              <Grid onClick={() => setCardActive(index + 1)} key={index} item xs={3}>
                <CardOption
                  backgroundColorDefault={
                    logo.backgrounds === 1 || logo.backgrounds === 3
                      ? 'white'
                      : logo.backgrounds === 2 || logo.backgrounds === 4
                      ? 'black'
                      : 'white'
                  }
                  backgroundColorActive='white'
                  active={false}
                >
                  <Box sx={{ position: 'relative', height: '100%', minHeight: '140px' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        gap: '8px',
                        position: 'absolute',
                        top: '8px',
                        right: '8px'
                      }}
                    >
                      <Box
                        sx={{
                          width: '28px',
                          height: '28px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '50%',
                          cursor: 'pointer'
                        }}
                      >
                        {cardActive === index + 1 ? <RadioOutlineFilledIcon /> : <RadioOutlineIcon />}
                      </Box>
                    </Box>
                    <Box id={`logoDesigned${index}`} className={`${styles[logo.layout]} ${styles.symbolLayout}`}>
                      {!_.isEmpty(logo.symbol) && <Image src={logo.symbol.url} width={50} height={50} alt='' />}
                      {!_.isEmpty(logo.htmlSvg) && (
                        <div
                          className={styles.htmlSvg}
                          dangerouslySetInnerHTML={{
                            __html: logo.htmlSvg.htmlSvg
                          }}
                        />
                      )}
                      <Typography
                        sx={{ fontFamily: logo.font?.id, fontWeight: getFontWeight(logo.font?.weightActive) }}
                        component={'span'}
                        cate='sub_title_30'
                        color={logo.font?.fontColor || 'black'}
                      >
                        {data1.ideaSection.title}
                      </Typography>
                    </Box>
                  </Box>
                </CardOption>
              </Grid>
            )
          })}
        </Grid>
      </Box>
      <Stack
        flexDirection={'row'}
        className={styles.btn_active}
        style={{ justifyContent: 'center', gap: '20px', marginTop: '60px' }}
      >
        <Box onClick={() => setToggleShowDialog(true)}>
          <RefreshButton />
        </Box>
        <Box onClick={() => onCompletedStep4()}>
          <SubmitButton disabled={!cardActive} type='submit' />
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

export default Step04
