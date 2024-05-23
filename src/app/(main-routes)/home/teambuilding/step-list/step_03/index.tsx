'use client'

// mui
import { Box } from '@mui/material'

// components

// form

import { completeStepSelector } from '@/atoms/home/stepper'
import { DATE_FORMAT, STEP } from '@/constants/common.constant'
import { isEmpty } from '@/utils/object'
import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'
import { useEffect } from 'react'
import { FormProvider, UseFormProps, useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import ValidateSchemaTBuilding from '../../utils/validate'
import Step_03_Edit, { TFormValues } from './edit'
import Step_03_View from './view'
import { useTeambuildingData } from '../../use-teambuilding'
import { TEAMBUILDING_QUERY_KEY } from '@/constants/teambuilding/teambuilding.constant'

export const defaultValuesStep03 = {
  path: null,
  date: moment().format(DATE_FORMAT.DASH_REV),
  name: '',
  content: '',
  organization: [],
  workingEnv: [],
  welBenefits: []
}

function Step_TBuidling_3() {
  const completeStep = useRecoilValue(completeStepSelector)
  const { data } = useTeambuildingData<TFormValues>(STEP.STEP_THREE, TEAMBUILDING_QUERY_KEY.GET_DATA_S3)


  const formOption: UseFormProps<TFormValues> = {
    defaultValues: defaultValuesStep03,
    mode: 'all',
    resolver: yupResolver(ValidateSchemaTBuilding.step03)
  }
  const methods = useForm<TFormValues>(formOption)

  useEffect(() => {
    if (!isEmpty(data?.data ?? {})) {
      methods.reset(data?.data, { keepDefaultValues: true })
    }
  }, [data])

  return (
    <FormProvider {...methods}>
      {!completeStep.includes(STEP.STEP_THREE) ? <Step_03_Edit form={methods} /> : <Step_03_View />}
    </FormProvider>
  )
}

export default Step_TBuidling_3
