'use client'

import { useEffect } from 'react'
// components
import Step_02_View from './view'
import Step_02_Edit from './edit'
import { defaultValuesStep01 } from '../step_01'

// form
import { FormProvider, UseFormReturn, useForm } from 'react-hook-form'

// recoil
import { useRecoilValue } from 'recoil'
import { completeStepSelector } from '@/atoms/home/stepper'

// constant
import { TFormValue, TFormValuesStepOnceAndSecond } from '@/types/teambuilding/index.type'
import { yupResolver } from '@hookform/resolvers/yup'
import ValidateSchemaTBuilding from '../../utils/validate'
import { STEP } from '@/constants/common.constant'
import { isEmpty } from '@/utils/object'
import { TEAMBUILDING_QUERY_KEY } from '@/constants/teambuilding/teambuilding.constant'
import { useTeambuildingData } from '../../use-teambuilding'

function Step_TBuidling_2() {
  const completeStep = useRecoilValue(completeStepSelector)

  const { data } = useTeambuildingData<TFormValue[]>(STEP.STEP_TWO, TEAMBUILDING_QUERY_KEY.GET_DATA_S2)

  useEffect(() => {
    if (data?.data && !isEmpty(data?.data ?? {})) {
      methods.reset({ data: data?.data }, { keepDefaultValues: true })
    }
  }, [data?.data])
  const methods: UseFormReturn<any> = useForm<any>({
    defaultValues: defaultValuesStep01,
    mode: 'all',
    reValidateMode: 'onBlur',
    resolver: yupResolver(ValidateSchemaTBuilding.step01)
  })

  return (
    <FormProvider {...methods}>
      {!completeStep.includes(STEP.STEP_TWO) ? <Step_02_Edit /> : <Step_02_View />}
    </FormProvider>
  )
}

export default Step_TBuidling_2
