import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import React from 'react'
import { NamingCandidates } from '@/types/naming.type'
import Step2Edit from './edit-step'
import Step2View from './view-step'
import { completeStepSelector } from '@/atoms/home/stepper'
import { useRecoilValue } from 'recoil'
import { yupResolver } from '@hookform/resolvers/yup'
import { useLanguage } from '@/hooks/use-language'
export const messageMax = '네이밍 후보군은 최대 10개까지 선택 가능합니다.'

const Step2Naming = () => {
  const { dict } = useLanguage()
  const messageMin = dict.naming_step_2_error
  const completeStep = useRecoilValue(completeStepSelector)

  const schema = yup.object({
    selectedItem: yup.array().required(messageMin).min(2, messageMin).max(10, messageMax)
  })

  const form = useForm<NamingCandidates>({
    // resolver: yupResolver(schema),
    reValidateMode: 'onBlur',
    mode: 'onBlur',
    defaultValues: {
      selectedItem: []
    }
  })

  return <FormProvider {...form}>{!completeStep.includes(1) ? <Step2Edit /> : <Step2View />}</FormProvider>
}
export default Step2Naming
