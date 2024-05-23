'use client'

import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Stack } from '@mui/material'
import styles from './step_01.module.scss'
import BusinessIdeaSection from './business-idea-section'
import LogoConceptSection from './logo-concept-section'
import LogoTypeSection from './logo-type-section'
import LogoColorSection from './logo-color-section'
import LogoFontSection from './logo-font-section'
import { useRef, useState } from 'react'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import { useRecoilState, useRecoilValue } from 'recoil'
import { step1 } from '@/atoms/logo'
import { activeStepSelector, completeStepSelector } from '@/atoms/home/stepper'
import Step01Result from './step_01_result'
import * as _ from 'lodash'
import { Alert as AlertDialog } from '@/components/dialog'
import useToggle from '@/hooks/use-toggle'
import { StatusStep } from '@/types/step.type'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getSteps, postStep } from '@/services/step.service'
import { DeckProject } from '@/types/deck.type'

const defaultData: any = {
  ideaSection: {},
  logoConceptSection: {},
  logoTypeSection: {},
  logoColorSection: {},
  logoColorDetailSection: {},
  logoFontSection: {}
}

const Step01 = () => {
  const [data1, setDataStep1] = useRecoilState(step1)
  const [, setCompleteStep] = useRecoilState(completeStepSelector)
  const steps = useRecoilValue(completeStepSelector)
  const [, setActiveStep] = useRecoilState(activeStepSelector)

  const ideaSectionRef: any = useRef()
  const logoConceptSectionRef: any = useRef()
  const logoTypeSectionRef: any = useRef()
  const logoColorSectionRef: any = useRef()
  const logoFontSectionRef: any = useRef()

  const [data, setData] = useState<any>(data1)
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  const sendData = (type: string, values: any) => {
    let temp: any = { ...data }
    temp[type] = values
    setData(temp)
  }
  const resetData = () => {
    ideaSectionRef.current.resetIdeaSection()
    logoConceptSectionRef.current.resetLogoConceptSection()
    logoTypeSectionRef.current.resetLogoTypeSection()
    logoColorSectionRef.current.resetLogoColorSection()
    logoFontSectionRef.current.resetLogoFontSection()

    setData({ ...defaultData })
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
        if (!pre.includes(0)) {
          return [...pre, 0]
        }
        return pre
      })
      setActiveStep(1)
      setDataStep1(data.data)
    }
  })

  const onCompletedStep1 = () => {
    const check = checkResult()
    if (check) return

    const payload = {
      deckId: 6,
      projectId: 39,
      stepId: stepList?.data[0]?.id,
      playTime: 0,
      status: StatusStep.FINISHED,
      currentStep: 1,
      deletedStepActivitiesIds: [1, 2, 3],
      data: {
        ...data
      }
    }

    submitStep.mutateAsync(payload)
  }

  const checkResult = () => {
    if (
      !data.ideaSection?.title ||
      _.isEmpty(data.logoConceptSection) ||
      _.isEmpty(data.logoTypeSection) ||
      _.isEmpty(data.logoColorSection) ||
      _.isEmpty(data.logoColorDetailSection) ||
      _.isEmpty(data.logoFontSection)
    ) {
      return true
    } else {
      return false
    }
  }

  return steps.includes(0) ? (
    <Step01Result />
  ) : (
    <Box py={convertToRem(60)}>
      <BusinessIdeaSection ref={ideaSectionRef} sendData={(type: string, values: any) => sendData(type, values)} />
      <LogoConceptSection
        ref={logoConceptSectionRef}
        sendData={(type: string, values: any) => sendData(type, values)}
      />
      <LogoTypeSection ref={logoTypeSectionRef} sendData={(type: string, values: any) => sendData(type, values)} />
      <LogoColorSection ref={logoColorSectionRef} sendData={(type: string, values: any) => sendData(type, values)} />
      <LogoFontSection ref={logoFontSectionRef} sendData={(type: string, values: any) => sendData(type, values)} />
      <Stack flexDirection={'row'} className={styles.btn_active} style={{ justifyContent: 'center', gap: '20px' }}>
        <Box onClick={() => setToggleShowDialog(true)}>
          <RefreshButton />
        </Box>
        <Box
          onClick={() => {
            onCompletedStep1()
          }}
        >
          <SubmitButton disabled={checkResult()} type='submit' />
        </Box>
      </Stack>
      <AlertDialog
        description='삭제된 데이터는 복구되지 않습니다, 초기화 하시겠습니까?'
        title='입력된 데이터가 삭제됩니다'
        open={showDialog}
        onCancel={() => setToggleShowDialog(false)}
        onSubmit={() => {
          setDataStep1({ ...defaultData })
          setData({ ...defaultData })
          resetData()
          setToggleShowDialog(false)
        }}
      />
    </Box>
  )
}

export default Step01
