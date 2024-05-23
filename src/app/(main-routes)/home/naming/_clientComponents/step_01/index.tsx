import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import React, { useEffect } from 'react'
import { Namingkeyword } from '@/types/naming.type'
import Step_01_Edit from './edit'
import Step_01_View from './view'
import { completeStepSelector } from '@/atoms/home/stepper'
import { useRecoilValue } from 'recoil'
import { yupResolver } from '@hookform/resolvers/yup'
import { STEP } from '@/constants/common.constant'
import { QUERY_KEY_KEYWORD } from '@/constants/naming.constant'
import { useNamingData } from '../../hooks/use-naming'
import { useLanguage } from '@/hooks/use-language'
export const errorMaxMessage = '키워드는 최대 10개까지 등록 가능합니다.'

const Step1Naming = () => {
  const { dict } = useLanguage()
  const completeStep = useRecoilValue(completeStepSelector)
  const errorMessage = dict.naming_step_1_error
  const { data } = useNamingData<Namingkeyword>(STEP.STEP_ONE, QUERY_KEY_KEYWORD)

  const schema = yup.object({
    concept: yup.string().required(' '),
    industry: yup.mixed<React.Key>().required(' '),
    idea: yup.string().required(' '),
    selectedItem: yup.array().required(errorMessage).min(2, errorMessage).max(10, errorMaxMessage)
  })

  const form = useForm<Namingkeyword>({
    // resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    mode: 'onBlur',
    defaultValues: {
      industry: '',
      idea: '',
      sourceLang: 'ko',
      targetLang: 'en',
      selectedItem: []
    }
  })

  useEffect(() => {
    if (data?.data) {
      form.reset(data.data, { keepDefaultValues: true })
    }
  }, [data?.data])

  console.log('Phuong Tran oi Step 01')

  return (
    <>
      <div>Phuong Tran Step 01</div>
      <FormProvider {...form}>
        {!completeStep.includes(STEP.STEP_ONE) ? <Step_01_Edit /> : <Step_01_View />}
      </FormProvider>
    </>
  )
}
export default Step1Naming
