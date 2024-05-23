'use client'
import * as yup from 'yup'
import { useRecoilState } from 'recoil'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { IFormValuesTamSamSom } from '@/types/profit-structure.type'
import { MAX_LENGTH } from '@/constants/profit-structure.constant'
import { STEP } from '@/constants/common.constant'
import { completeStepSelector } from '@/atoms/home/stepper'
import Step_05_Edit from './edit'
import Step_05_View from './view'

const Step_05_ProfitStructure = () => {
  const [completeStep] = useRecoilState(completeStepSelector)

  const schema = yup.object({
    type: yup.string().required(),
    data: yup
      .array()
      .of(
        yup.object().shape({
          marketCate: yup.string().required(),
          marketSize: yup.string().required(),
          calculationBasis: yup.string().required()
        })
      )
      .max(MAX_LENGTH.TAM_SAM_SOM)
      .required()
  })

  const form = useForm<IFormValuesTamSamSom>({
    // resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    mode: 'onBlur'
  })

  return (
    <FormProvider {...form}>{completeStep.includes(STEP.STEP_FIVE) ? <Step_05_View /> : <Step_05_Edit />}</FormProvider>
  )
}
export default Step_05_ProfitStructure
