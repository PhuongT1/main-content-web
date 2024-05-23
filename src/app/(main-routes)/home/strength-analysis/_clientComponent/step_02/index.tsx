import { completeStepSelector } from '@/atoms/home/stepper'
import { STEP } from '@/constants/common.constant'
import { TFormValuesRangeType, TFormValuesType } from '@/types/strength-analysis.type'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import SA_Step_02_Edit from './edit'
import SA_Step_02_View from './view'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSAData } from '../use-sa'

export const MAX_TYPES = 10

export const commonListSAType = [
  {
    id: 0,
    uuid: '',
    star: '0',
    strengthType: '',
    url: '',
    keyword: '',
    description: '',
    talentType: ''
  }
]

export const defaultValuesTypes: TFormValuesRangeType = {
  strength: [
    [...commonListSAType],
    [...commonListSAType, ...commonListSAType],
    [...commonListSAType, ...commonListSAType, ...commonListSAType]
  ],
  weakness: [
    [...commonListSAType],
    [...commonListSAType, ...commonListSAType],
    [...commonListSAType, ...commonListSAType, ...commonListSAType]
  ]
}

const SA_Step_02 = () => {
  const { data } = useSAData<TFormValuesRangeType>(STEP.STEP_TWO, 'query-key-sa-step-02')

  const complete = useRecoilValue(completeStepSelector)

  const commonSchema = yup
    .array()
    .of(
      yup
        .array()
        .of(
          yup.object({
            id: yup.number().min(1).required(''),
            strengthType: yup.string().required(''),
            keyword: yup.string().required(''),
            star: yup.string().required(''),
            description: yup.string().required(''),
            url: yup.string().required(''),
            talentType: yup.string().required(''),
            uuid: yup.string()
          })
        )
        .required()
    )
    .required()

  const schema = yup.object({
    strength: commonSchema,
    weakness: commonSchema
  })
  const form = useForm<any>({
    defaultValues: defaultValuesTypes,
    resolver: yupResolver(schema),
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
      {!complete.includes(STEP.STEP_TWO) ? <SA_Step_02_Edit /> : <SA_Step_02_View />}
    </FormProvider>
  )
}

export default SA_Step_02
