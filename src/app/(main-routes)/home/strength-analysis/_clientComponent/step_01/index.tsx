import { completeStepSelector } from '@/atoms/home/stepper'
import { STEP } from '@/constants/common.constant'
import { TFormValuesType } from '@/types/strength-analysis.type'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import SA_Step_01_Edit from './edit'
import SA_Step_01_View from './view'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSAData } from '../use-sa'

export const MAX_TYPES = 10

export const defaultValuesTypes = {
  strengthList: [],
  weaknessList: []
}

const SA_Step_01 = () => {
  const { data } = useSAData<TFormValuesType>(STEP.STEP_ONE, 'query-key-sa')

  const complete = useRecoilValue(completeStepSelector)

  const schema = yup.object({
    strengthList: yup.array().min(1, '어울리는 장점유형 10개를 선택해야 합니다').max(MAX_TYPES, ' ').required(' '),
    weaknessList: yup.array().min(1, '어울리는 장점유형 10개를 선택해야 합니다').required(' ')
  })
  const form = useForm<any>({
    defaultValues: {
      strengthList: [],
      weaknessList: []
    },
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    mode: 'onBlur'
  })

  useEffect(() => {
    if (data?.data) {
      form.reset(data.data, { keepDefaultValues: false })
    }
  }, [data?.data])
  return (
    <FormProvider {...form}>
      {!complete.includes(STEP.STEP_ONE) ? <SA_Step_01_Edit /> : <SA_Step_01_View />}
    </FormProvider>
  )
}

export default SA_Step_01
