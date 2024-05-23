'use client'

import { EditButton, RefreshButton, SubmitButton } from '@/components/home/button'
import useToggle from '@/hooks/use-toggle'
import { getSloganConcept } from '@/services/slogan.service'
import { Slogan_Step1_Type, Slogan_Step1_Yup } from '@/types/slogan.type'
import { yupResolver } from '@hookform/resolvers/yup'
import { Stack, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import DividerItem from '../_component/divider-item'
import HocStepSlogan, { propStepComponent } from '../_component/hoc-step-slogan'
import BusinessIdea from './businessIdea'
import ReferenceSlogan from './referenceSlogan'
import SloganConcept from './sloganConcept'
import styles from './step_01.module.scss'
import { nanum_pen } from '@/utils/font'
import { ModalReset } from '@/components/dialog/modal-deck'

const Step_01_Slogan: React.FC<propStepComponent<Slogan_Step1_Type, undefined>> = ({
  isView,
  data,
  onFinish,
  showEdit
}) => {
  const {
    palette: { home }
  } = useTheme()
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const { data: sloganConcept } = useQuery({
    queryKey: ['slogan-concept'],
    queryFn: () => getSloganConcept()
  })

  const form = useForm<any>({
    resolver: yupResolver(Slogan_Step1_Yup),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      referenceSloganAI: [],
      referenceSlogan: []
    }
  })

  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = form

  const formArray = useFieldArray({
    control,
    name: 'referenceSlogan'
  })

  const formAI = useFieldArray({
    control,
    name: 'referenceSloganAI'
  })

  useEffect(() => {
    if (data) form.reset(data?.data, { keepDefaultValues: true })
  }, [data?.data])

  return (
    <FormProvider {...form}>
      <Box
        component='form'
        className={[styles.form_slogan, nanum_pen.variable].join(' ')}
        onSubmit={handleSubmit(onFinish)}
      >
        <DividerItem isView={isView} />
        <BusinessIdea isView={isView} />
        <SloganConcept sloganConcept={sloganConcept} isView={isView} />
        <ReferenceSlogan formArray={formArray} formAI={formAI} sloganConcept={sloganConcept} isView={isView} />
        <Stack flexDirection={'row'} className={styles.btn_active}>
          {!isView ? (
            <>
              <RefreshButton onClick={toggleShowDialog} />
              <SubmitButton disabled={!isValid} type='submit' />
              <ModalReset
                open={showDialog}
                onCancel={toggleShowDialog}
                onSubmit={() => {
                  formArray.remove()
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

export default HocStepSlogan<Slogan_Step1_Type, undefined>(Step_01_Slogan, {
  currentStep: 0
})
