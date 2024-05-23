'use client'

// mui
import { Box } from '@mui/material'

// components

// form

import { completeStepSelector } from '@/atoms/home/stepper'
import { STEP } from '@/constants/common.constant'
import { TFormValue, TFormValuesStepOnceAndSecond } from '@/types/teambuilding/index.type'
import { isEmpty } from '@/utils/object'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { FormProvider, UseFormReturn, useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import ValidateSchemaTBuilding from '../../utils/validate'
import Step_01_Edit from './edit'
import Step_01_View from './view'
import { useTeambuildingData } from '../../use-teambuilding'
import { TEAMBUILDING_QUERY_KEY } from '@/constants/teambuilding/teambuilding.constant'

export const initValues = {
  isManualDomain: false,
  isEmailRequired: false,
  path: '',
  name: '',
  age: 0,
  role: '',
  content: '',
  manualDomain: '',
  domain: '',
  email: '',
  description: '',
  eduandexp: []
}

export const defaultValuesStep01 = {
  data: [initValues]
}

function Step_TBuidling_1() {
  const completeStep = useRecoilValue(completeStepSelector)

  const { data } = useTeambuildingData<TFormValue[]>(STEP.STEP_ONE, TEAMBUILDING_QUERY_KEY.GET_DATA_S1)

  const methods: UseFormReturn<TFormValuesStepOnceAndSecond> = useForm<TFormValuesStepOnceAndSecond>({
    defaultValues: defaultValuesStep01,
    mode: 'all',
    reValidateMode: 'onChange'
    // resolver: yupResolver(ValidateSchemaTBuilding.step01)
  })

  useEffect(() => {
    if (!isEmpty(data?.data ?? {})) {
      methods.reset({ data: data?.data }, { keepDefaultValues: false })
    }
  }, [data?.data])

  return (
    <FormProvider {...methods}>
      {!completeStep.includes(STEP.STEP_ONE) ? <Step_01_Edit /> : <Step_01_View form={methods} />}
    </FormProvider>
  )
}

export default Step_TBuidling_1
