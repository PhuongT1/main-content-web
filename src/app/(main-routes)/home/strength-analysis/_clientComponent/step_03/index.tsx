import { completeStepSelector } from '@/atoms/home/stepper'
import { STEP } from '@/constants/common.constant'
import { TFormValuesRangeType } from '@/types/strength-analysis.type'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSAData } from '../use-sa'
import SA_Step_03_Edit from './edit'
import SA_Step_03_View from './view'

const SA_Step_03 = () => {
  const { data } = useSAData<TFormValuesRangeType>(STEP.STEP_THREE, 'query-key-sa-step-03')

  const complete = useRecoilValue(completeStepSelector)

  const form = useForm({
    defaultValues: {},
    reValidateMode: 'onSubmit',
    mode: 'onSubmit'
  })

  useEffect(() => {
    if (data?.data) {
      form.reset(data.data, { keepDefaultValues: false })
    }
  }, [data?.data])
  return (
    <FormProvider {...form}>
      {!complete.includes(STEP.STEP_THREE) ? <SA_Step_03_Edit /> : <SA_Step_03_View />}
    </FormProvider>
  )
}

export default SA_Step_03
