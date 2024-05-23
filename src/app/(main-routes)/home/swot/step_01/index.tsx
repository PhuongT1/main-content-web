'use client'
import { Stack, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import styles from './step_01.module.scss'
import React, { useEffect } from 'react'
import { Swot_Step1_Type } from '@/types/swot.type'
import { Nanum_Pen_Script } from 'next/font/google'
import { EditButton, RefreshButton, SubmitButton } from '@/components/home/button'
import BusinessIdea from './business-idea'
import BusinessObjectives from './business-objectives'
import DividerItem from '../_clientComponents/divider-item'
import HocStepSwot, { propStepComponent } from '../_clientComponents/hoc-step-swot'
import EnvironmentFactors from './environment-factors'
import { yupResolver } from '@hookform/resolvers/yup'
import { Swot_Step1_Yup } from '../constants'
import useToggle from '@/hooks/use-toggle'
import { cancelTxt, subTitleReset, submitTxt, titleReset } from '@/constants/naming.constant'
import { Alert as AlertDialog } from '@/components/dialog'
import { pretendard } from '@/utils/font'

const nanum_pen = Nanum_Pen_Script({
  adjustFontFallback: false,
  display: 'swap',
  subsets: ['latin'],
  weight: '400',
  variable: '--nanum_pen'
})

const Step_01_Swot: React.FC<propStepComponent<Swot_Step1_Type, undefined>> = ({
  isView,
  data,
  onFinish,
  showEdit
}) => {
  const {
    palette: { home }
  } = useTheme()

  const form = useForm<Swot_Step1_Type>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(Swot_Step1_Yup) as any
  })

  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = form

  const formArray = useFieldArray({
    control,
    name: 'derivationOfBusinessObjectives'
  })

  const strengthArray = useFieldArray({
    control,
    name: 'strengthArray'
  })

  const weaknessArray = useFieldArray({
    control,
    name: 'weaknessArray'
  })

  const opportunityArray = useFieldArray({
    control,
    name: 'opportunityArray'
  })

  const threatArray = useFieldArray({
    control,
    name: 'threatArray'
  })

  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  useEffect(() => {
    if (data) form.reset(data?.data, { keepDefaultValues: true })
  }, [data?.data])

  return (
    <FormProvider {...form}>
      <Box
        component='form'
        className={[styles.form_slogan, pretendard.variable].join(' ')}
        onSubmit={handleSubmit(onFinish)}
      >
        <DividerItem isView={isView} sx={{ borderColor: `${home.gray200}` }} />
        <BusinessIdea isView={isView} />
        <BusinessObjectives formArray={formArray} isView={isView} />
        <EnvironmentFactors
          strengthArray={strengthArray}
          weaknessArray={weaknessArray}
          opportunityArray={opportunityArray}
          threatArray={threatArray}
          isView={isView}
        />
        <Stack flexDirection={'row'} className={styles.btn_active}>
          {!isView ? (
            <>
              <RefreshButton onClick={toggleShowDialog} />
              <SubmitButton disabled={!isValid} type='submit' />
              <AlertDialog
                description={subTitleReset}
                title={titleReset}
                cancelTxt={cancelTxt}
                submitTxt={submitTxt}
                open={showDialog}
                onCancel={toggleShowDialog}
                onSubmit={() => {
                  formArray.remove()
                  strengthArray.remove()
                  weaknessArray.remove()
                  opportunityArray.remove()
                  threatArray.remove()
                  form.reset(undefined)
                  setToggleShowDialog(false)
                }}
              />
            </>
          ) : (
            <EditButton onClick={() => showEdit()} />
          )}
        </Stack>
      </Box>
    </FormProvider>
  )
}

export default HocStepSwot<Swot_Step1_Type, undefined>(Step_01_Swot, {
  currentStep: 0
})
